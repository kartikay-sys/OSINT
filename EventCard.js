import React from 'react';
import PropTypes from 'prop-types';

const VERIFIED_CHECK_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-blue-500"
    aria-hidden="true"
  >
    <path d="M9 12.75 7.5 11.25a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l6-6a.75.75 0 1 0-1.06-1.06L9 12.75Z" />
    <path fillRule="evenodd" d="M12 1.5a3.75 3.75 0 0 1 3.3 2.03 3.75 3.75 0 0 1 4.17 4.17A3.75 3.75 0 0 1 21 12a3.75 3.75 0 0 1-1.53 3.05 3.75 3.75 0 0 1-4.17 4.17A3.75 3.75 0 0 1 12 22.5a3.75 3.75 0 0 1-3.3-2.03 3.75 3.75 0 0 1-4.17-4.17A3.75 3.75 0 0 1 3 12c0-1.25.62-2.44 1.53-3.2a3.75 3.75 0 0 1 4.17-4.17A3.75 3.75 0 0 1 12 1.5Zm0 1.5a2.25 2.25 0 0 0-1.98 1.23.75.75 0 0 1-.85.39 2.25 2.25 0 0 0-2.69 2.69.75.75 0 0 1-.39.85A2.25 2.25 0 0 0 4.5 12c0 .76.37 1.49.99 1.93.32.23.45.66.29 1.03a2.25 2.25 0 0 0 2.69 2.69.75.75 0 0 1 1.03.29A2.25 2.25 0 0 0 12 19.5c.76 0 1.49-.37 1.93-.99.23-.32.66-.45 1.03-.29a2.25 2.25 0 0 0 2.69-2.69.75.75 0 0 1 .29-1.03A2.25 2.25 0 0 0 19.5 12a2.25 2.25 0 0 0-1.23-1.98.75.75 0 0 1-.39-.85 2.25 2.25 0 0 0-2.69-2.69.75.75 0 0 1-.85-.39A2.25 2.25 0 0 0 12 3Z" clipRule="evenodd" />
  </svg>
);

const LINK_ICON_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M14 3a5 5 0 0 1 3.536 8.536l-1.415 1.415a1 1 0 1 1-1.414-1.414l1.415-1.415a3 3 0 1 0-4.243-4.243L10.05 7.707A1 1 0 0 1 8.636 6.293L10.464 4.464A5 5 0 0 1 14 3Zm-4 18a5 5 0 0 1-3.536-8.536l1.415-1.415a1 1 0 1 1 1.414 1.414l-1.415 1.415a3 3 0 1 0 4.243 4.243l1.829-1.829A1 1 0 1 1 15.414 18l-1.828 1.828A4.98 4.98 0 0 1 10 21Z" />
    <path d="M9 15a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
  </svg>
);

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#e5e7eb"/><circle cx="32" cy="24" r="14" fill="#9ca3af"/><path d="M10 56c0-10.493 9.178-19 22-19s22 8.507 22 19" fill="#9ca3af"/></svg>`
  );

function getCredibilityClasses(credibilityLevel) {
  switch ((credibilityLevel || '').toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-800 ring-1 ring-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200';
    case 'low':
      return 'bg-red-100 text-red-800 ring-1 ring-red-200';
    default:
      return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
  }
}

export default function EventCard({
  headline,
  sourceName,
  sourceAvatar,
  isVerified,
  text,
  timestamp,
  verifiedCount,
  crowdCount,
  sourceLink,
  credibilityScore,
  credibilityLevel,
  gptExplanation,
  onSave,
  onViewMap,
  onExport,
}) {
  const credibilityClasses = getCredibilityClasses(credibilityLevel);
  const safeAvatar = sourceAvatar || DEFAULT_AVATAR;

  const handleSave = () => {
    if (onSave) onSave();
    // eslint-disable-next-line no-console
    console.log('Save to My Feeds clicked');
  };

  const handleViewMap = () => {
    if (onViewMap) onViewMap();
    // eslint-disable-next-line no-console
    console.log('View on Map clicked');
  };

  const handleExport = () => {
    if (onExport) onExport();
    // eslint-disable-next-line no-console
    console.log('Export Report clicked');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-sm ring-1 ring-black/5 p-4 sm:p-5 space-y-4">
      {/* Headline */}
      {headline ? (
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-snug">
          {headline}
        </h3>
      ) : null}

      {/* Embedded Source (Tweet-like) */}
      <div className="rounded-lg border border-gray-200 dark:border-neutral-800 p-4">
        <div className="flex items-start gap-3">
          <img
            src={safeAvatar}
            alt={`${sourceName || 'Source'} avatar`}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-black/5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {sourceName || 'Unknown Source'}
              </span>
              {isVerified ? (
                <span className="inline-flex items-center" title="Verified source">
                  {VERIFIED_CHECK_SVG}
                </span>
              ) : null}
              {timestamp ? (
                <span className="text-gray-500 dark:text-gray-400 text-sm">· {timestamp}</span>
              ) : null}
            </div>
            {text ? (
              <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-line">
                {text}
              </p>
            ) : null}

            <div className="mt-3 flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center gap-1" title="Verified count">
                  <span role="img" aria-label="verified">✅</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{Number(verifiedCount || 0).toLocaleString()}</span>
                </div>
                <div className="inline-flex items-center gap-1" title="Crowd submissions">
                  <span role="img" aria-label="crowd submissions">🗨</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{Number(crowdCount || 0).toLocaleString()}</span>
                </div>
                {sourceLink ? (
                  <a
                    className="inline-flex items-center gap-1 hover:text-blue-600 hover:underline"
                    href={sourceLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    title="Open original source"
                  >
                    {LINK_ICON_SVG}
                    <span className="hidden sm:inline">Source</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credibility */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${credibilityClasses}`}>
            {credibilityLevel || 'Unknown'}
          </span>
          {typeof credibilityScore === 'number' ? (
            <span className="text-sm text-gray-600 dark:text-gray-300">Score: <span className="font-semibold">{credibilityScore.toFixed(2)}</span></span>
          ) : null}
        </div>
        {gptExplanation ? (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {gptExplanation}
          </p>
        ) : null}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span role="img" aria-label="save">🔖</span>
          Save to My Feeds
        </button>
        <button
          type="button"
          onClick={handleViewMap}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span role="img" aria-label="map">🗺</span>
          View on Map
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span role="img" aria-label="export">📄</span>
          Export Report (PDF/JSON)
        </button>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  headline: PropTypes.string,
  sourceName: PropTypes.string,
  sourceAvatar: PropTypes.string,
  isVerified: PropTypes.bool,
  text: PropTypes.string,
  timestamp: PropTypes.string,
  verifiedCount: PropTypes.number,
  crowdCount: PropTypes.number,
  sourceLink: PropTypes.string,
  credibilityScore: PropTypes.number,
  credibilityLevel: PropTypes.string,
  gptExplanation: PropTypes.string,
  onSave: PropTypes.func,
  onViewMap: PropTypes.func,
  onExport: PropTypes.func,
};

EventCard.defaultProps = {
  headline: '',
  sourceName: 'Unknown Source',
  sourceAvatar: DEFAULT_AVATAR,
  isVerified: false,
  text: '',
  timestamp: '',
  verifiedCount: 0,
  crowdCount: 0,
  sourceLink: '',
  credibilityScore: undefined,
  credibilityLevel: 'Medium',
  gptExplanation: '',
  onSave: undefined,
  onViewMap: undefined,
  onExport: undefined,
};



