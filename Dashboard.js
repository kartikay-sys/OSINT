import React, { useState } from 'react';
import ExampleEventCards from './ExampleEventCards';

export default function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Future: Lift these to context or URL params
  const [sourceFilter, setSourceFilter] = useState('All sources');
  const [credibilityFilter, setCredibilityFilter] = useState('All credibility');
  const [dateFilter, setDateFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const toggleSidebar = () => setIsMobileSidebarOpen((v) => !v);
  const closeSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="bg-gray-100 text-slate-900 min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-slate-900 font-bold text-sm sm:text-base">OSINT Misinformation Verification</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                title="Refresh feed"
                onClick={() => { /* Future: trigger reload */ }}
              >
                ⟳ <span className="hidden lg:inline">Refresh</span>
              </button>
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="peer w-48 lg:w-64 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 shadow-inner" />
            </div>
            <button
              id="hamburgerBtn"
              type="button"
              className="inline-flex sm:hidden items-center justify-center rounded-md p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Open sidebar"
              aria-expanded={isMobileSidebarOpen}
              onClick={toggleSidebar}
            >
              {isMobileSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Shell Layout */}
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_340px] gap-4 lg:gap-6 py-4">

            {/* Left Sidebar - Mobile Drawer */}
            <aside className="sm:contents">
              <div className="sm:hidden">
                {isMobileSidebarOpen && (
                  <div className="fixed inset-y-14 left-0 right-0 z-30">
                    <div className="absolute inset-0 bg-slate-900/40" onClick={closeSidebar} />
                    <div className="relative bg-white w-full max-w-xs h-full shadow-xl p-4 overflow-y-auto">
                      <nav className="space-y-1">
                        <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>🏠</span> Dashboard</a>
                        <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>📰</span> Events</a>
                        <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>👥</span> Crowd Submissions</a>
                        <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>📊</span> Reports</a>
                        <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>⚙️</span> Settings</a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>

              {/* Left Sidebar - Desktop */}
              <div className="hidden sm:block sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                  <nav className="space-y-1">
                    <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>🏠</span> Dashboard</a>
                    <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>📰</span> Events</a>
                    <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>👥</span> Crowd Submissions</a>
                    <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>📊</span> Reports</a>
                    <a className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition" href="#"><span>⚙️</span> Settings</a>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="min-w-0">
              {/* Toolbar / Filters */}
              <div className="mb-3 sm:mb-4 bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                    >
                      <option>All sources</option>
                      <option>Trusted only</option>
                      <option>Crowd only</option>
                    </select>
                    <select
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={credibilityFilter}
                      onChange={(e) => setCredibilityFilter(e.target.value)}
                    >
                      <option>All credibility</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                    <input
                      type="date"
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search events..."
                        className="w-48 md:w-64 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
                      title="Apply filters"
                      onClick={() => { /* Future: apply filters to feed */ }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Feed (render demo cards for now) */}
              <div className="space-y-3 sm:space-y-4">
                <ExampleEventCards />
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="min-w-0">
              <div className="space-y-4 lg:sticky lg:top-16 lg:self-start">
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Map</h3>
                  <div className="rounded-lg bg-slate-100 border border-slate-200 h-48 sm:h-64 flex items-center justify-center text-slate-500 text-sm">Map will load here.</div>
                </section>
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Top Contributors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-700">@analyst_alpha</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">Karma +10</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-700">@mapper_beta</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">Karma +7</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-700">@validator_gamma</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">Karma +5</span>
                    </li>
                  </ul>
                </section>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}









