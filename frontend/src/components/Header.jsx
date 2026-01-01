import { useState, useEffect } from 'react';

const Header = ({ onAddTask, onToggleFocusMode, isFocusMode, onSearch, onSort, sortOrder }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('xoro-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('xoro-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('xoro-theme', 'light');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
      onSearch('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title - Left Side */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Logo */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                <img src="/logo.svg" alt="XORO Logo" className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight truncate">
                  XORO
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal -mt-1 hidden sm:block">
                  eXperience-Oriented Workflow Organizer
                </p>
              </div>
            </div>
            
            {/* Search Bar - Mobile Optimized */}
            <div className="flex items-center gap-2 flex-shrink-0 sm:hidden">
              {isSearchOpen && (
                <div className="relative animate-in slide-in-from-right-2 fade-in-0 duration-200">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={handleKeyPress}
                    placeholder="Search..."
                    className="w-32 px-2 py-1 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    autoFocus
                  />
                </div>
              )}
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    setTimeout(() => document.querySelector('input[type="text"]')?.focus(), 100);
                  } else {
                    setSearchQuery('');
                    onSearch('');
                  }
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isSearchOpen 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title="Search tasks (Ctrl+K)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {isSearchOpen && (
              <div className="relative animate-in slide-in-from-right-2 fade-in-0 duration-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleKeyPress}
                  placeholder="Search tasks..."
                  className="w-48 lg:w-64 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                  autoFocus
                />
              </div>
            )}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  setTimeout(() => document.querySelector('input[type="text"]')?.focus(), 100);
                } else {
                  setSearchQuery('');
                  onSearch('');
                }
              }}
              className={`p-2 rounded-lg transition-colors ${
                isSearchOpen 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title="Search tasks (Ctrl+K)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          {/* Right Side Controls - Desktop */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Sort Dropdown */}
            <div className="relative group">
              <button
                onClick={onSort}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
                title="Sort tasks"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18"></path>
                  <path d="M7 12h10"></path>
                  <path d="M10 18h4"></path>
                </svg>
                <span className="hidden lg:inline">
                  {sortOrder === 'date' ? 'Date' : sortOrder === 'updated' ? 'Updated' : 'Default'}
                </span>
              </button>
            </div>

            {/* Focus Mode Toggle */}
            <button
              onClick={onToggleFocusMode}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                isFocusMode 
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title={isFocusMode ? 'Show Done column' : 'Hide Done column (Focus mode)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-yellow-500' 
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            {/* Add Task Button */}
            <button
              onClick={onAddTask}
              className="btn-primary flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            {/* Add Task Button - Mobile Only */}
            <button
              onClick={onAddTask}
              className="btn-primary flex items-center gap-1 px-2 py-1.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className={`p-1.5 rounded-lg transition-colors ${
                isMobileMenuOpen
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
              title="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 space-y-2">
              {/* Sort Option */}
              <button
                onClick={() => {
                  onSort();
                  closeMobileMenu();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18"></path>
                  <path d="M7 12h10"></path>
                  <path d="M10 18h4"></path>
                </svg>
                <span>Sort: {sortOrder === 'date' ? 'Date' : sortOrder === 'updated' ? 'Updated' : 'Default'}</span>
              </button>

              {/* Focus Mode Toggle */}
              <button
                onClick={() => {
                  onToggleFocusMode();
                  closeMobileMenu();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isFocusMode 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' 
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>{isFocusMode ? 'Show Done Column' : 'Hide Done Column'}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => {
                  toggleDarkMode();
                  closeMobileMenu();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-yellow-500' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isDarkMode ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
