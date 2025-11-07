/*
  Usage:
    node tools/import_csv_to_mock.js "C:\\Users\\karti\\Downloads\\TwExtract-goreunit-20251105_192441.csv"

  This script:
    - parses a CSV exported from TwExtract (columns: id, tweetText, tweetURL, ...)
    - extracts relevant OSINT fields
    - maps each row to our mock event schema used by index.html
    - merges into mockData.json (appends new items; avoids duplicate id collisions)
*/

const fs = require('fs');
const path = require('path');

function readFileUtf8(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeFileUtf8(p, data) {
  fs.writeFileSync(p, data, 'utf8');
}

// Minimal CSV parser that handles quoted fields with commas and newlines
function parseCsv(content) {
  const rows = [];
  let i = 0;
  const n = content.length;
  let field = '';
  let row = [];
  let inQuotes = false;

  while (i < n) {
    const ch = content[i];
    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') { // escaped quote
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === ',') {
        row.push(field);
        field = '';
        i++;
        continue;
      }
      if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
        i++;
        continue;
      }
      if (ch === '\r') { // handle CRLF
        i++;
        continue;
      }
      field += ch;
      i++;
    }
  }
  // last field
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function toIso(timestamp) {
  // CSV is like: 2025-11-05 16:49:55
  if (!timestamp) return new Date().toISOString();
  const t = timestamp.replace(' ', 'T');
  return /Z$/.test(t) ? t : `${t}Z`;
}

function deriveCategory(text) {
  const t = (text || '').toLowerCase();
  if (/(navy|air force|army|missile|radar|sonar|exercise|patrol|drdo|iaf|bsf|coast guard)/.test(t)) return 'Defense';
  if (/(cyber|hack|malware|framework|command|intel|intelligence|fusion|signal)/.test(t)) return 'Intelligence';
  if (/(border|security|awacs|surveillance|threat)/.test(t)) return 'Security';
  if (/(tunnel|road|infrastructure|bridge)/.test(t)) return 'Infrastructure';
  if (/(satellite|space|isro|technology|tracking)/.test(t)) return 'Technology';
  return 'Security';
}

function deriveCredibility(retweets, likes) {
  const r = Number(retweets) || 0;
  const l = Number(likes) || 0;
  const score = Math.max(0.3, Math.min(0.95, (r * 0.003 + l * 0.0008) + 0.55));
  const level = score >= 0.8 ? 'High' : score >= 0.6 ? 'Medium' : 'Low';
  return { score, level };
}

function buildHeadline(text) {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= 120) return clean;
  return clean.slice(0, 117) + '...';
}

function transformRow(h, row) {
  const idx = (name) => h.indexOf(name);
  const tweetId = row[idx('id')];
  const text = row[idx('tweetText')] || '';
  const url = row[idx('tweetURL')] || '';
  const author = row[idx('tweetAuthor')] || row[idx('handle')] || 'Unknown';
  const handle = row[idx('handle')] || '';
  const retweets = row[idx('retweetCount')] || '0';
  const replies = row[idx('replyCount')] || '0';
  const quotes = row[idx('quoteCount')] || '0';
  const likes = row[idx('likeCount')] || '0';
  const createdAt = row[idx('createdAt')] || '';

  const { score, level } = deriveCredibility(retweets, likes);

  return {
    // id will be assigned later to avoid NaN from very large tweet IDs
    id: null,
    _tweetId: String(tweetId || ''),
    headline: buildHeadline(text),
    sourceName: author,
    sourceHandle: handle,
    sourceAvatar: '',
    isVerified: false,
    text,
    timestamp: toIso(createdAt),
    verifiedCount: Number(retweets) || 0,
    crowdCount: (Number(replies) || 0) + (Number(quotes) || 0),
    sourceLink: url,
    credibilityScore: Number(score.toFixed(2)),
    credibilityLevel: level,
    gptExplanation: '',
    region: 'National',
    category: deriveCategory(text)
  };
}

function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error('Please provide path to CSV file.');
    process.exit(1);
  }
  const workspaceMock = path.resolve(process.cwd(), 'mockData.json');
  const csvContent = readFileUtf8(csvPath);
  const rows = parseCsv(csvContent);
  if (rows.length === 0) {
    console.error('CSV appears empty.');
    process.exit(1);
  }
  const header = rows[0];
  const dataRows = rows.slice(1).filter(r => r && r.length === header.length);

  // Transform and lightly filter OSINT relevance: keep rows with certain keywords
  const relevant = dataRows.filter(r => {
    const text = (r[header.indexOf('tweetText')] || '').toLowerCase();
    return /(army|navy|air force|iaf|drdo|isro|border|security|surveillance|radar|missile|exercise|attack|encounter|awacs|kashmir|ladakh|coast|patrol|intel|intelligence)/.test(text);
  });

  const newItems = relevant.map(r => transformRow(header, r));

  let existing = JSON.parse(readFileUtf8(workspaceMock));
  // Drop any previously imported bad entries (id === null)
  existing = existing.filter(e => e && e.id !== null && e.id !== undefined);

  // Deduplicate by tweet URL or _tweetId if present
  const existingLinks = new Set(existing.map(e => e.sourceLink).filter(Boolean));
  const existingTweetIds = new Set(existing.map(e => e._tweetId).filter(Boolean));
  const deduped = newItems.filter(item => {
    return !existingLinks.has(item.sourceLink) && !existingTweetIds.has(item._tweetId);
  });

  // Assign sequential ids starting from current max id
  const maxExistingId = existing.reduce((m, e) => (typeof e.id === 'number' && e.id > m ? e.id : m), 0);
  let nextId = maxExistingId + 1;
  for (const item of deduped) {
    item.id = nextId++;
    delete item._tweetId;
  }

  const merged = [...deduped, ...existing];
  writeFileUtf8(workspaceMock, JSON.stringify(merged, null, 2));

  console.log(`Imported ${deduped.length} items (from ${newItems.length} relevant), mockData.json now has ${merged.length} items.`);
}

main();


