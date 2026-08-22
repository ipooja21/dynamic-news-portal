import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import BreakingNews from './components/BreakingNews';
import HeroNews from './components/HeroNews';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import NewsGrid from './components/NewsGrid';
import TrendingSidebar from './components/TrendingSidebar';
import SkeletonLoader from './components/SkeletonLoader';
import DrawerMenu from './components/DrawerMenu';
import SubscribeModal from './components/SubscribeModal';
import Footer from './components/Footer';
import { fetchNewsFromGoogleSheet } from './services/newsService';
import { AlertTriangle, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Theme state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('newshub_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Data fetching state
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataSource, setDataSource] = useState('');

  // UI state
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync Dark Mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('newshub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('newshub_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Fetch news data
  const loadNews = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetchNewsFromGoogleSheet();
      if (res.articles && res.articles.length > 0) {
        setArticles(res.articles);
        setDataSource(res.source);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error('Failed to load news:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Synchronize category tabs and filter chips
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setActiveFilter(category);
    setVisibleCount(12);
  };

  const handleSelectFilter = (filter) => {
    setActiveFilter(filter);
    setActiveCategory(filter);
    setVisibleCount(12);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setActiveFilter('All');
    setSearchTerm('');
    setVisibleCount(12);
  };

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts = { All: articles.length, Latest: Math.min(15, articles.length), Today: 0 };
    articles.forEach((art) => {
      if (art.category) {
        counts[art.category] = (counts[art.category] || 0) + 1;
      }
      if (art.date && (art.date.includes('22 Aug') || art.date.includes('Today'))) {
        counts.Today += 1;
      }
    });
    return counts;
  }, [articles]);

  // Filter and search articles dynamically
  const filteredArticles = useMemo(() => {
    let list = [...articles];

    // 1. Search Query Filter (matches title OR description)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (art) =>
          (art.title && art.title.toLowerCase().includes(q)) ||
          (art.description && art.description.toLowerCase().includes(q)) ||
          (art.category && art.category.toLowerCase().includes(q))
      );
    }

    // 2. Category / Pill Filter
    const active = (activeFilter || activeCategory || 'All').toLowerCase();
    if (active === 'all') {
      // return all
    } else if (active === 'latest') {
      list = list.slice(0, 20);
    } else if (active === 'today') {
      list = list.filter((art) => art.date && (art.date.includes('22 Aug') || art.date.includes('Today')));
    } else if (active === 'trending') {
      list = list.filter((art) => art.isBreaking || ['Sports', 'World', 'India'].includes(art.category));
    } else {
      list = list.filter(
        (art) => art.category && art.category.toLowerCase() === active
      );
    }

    return list;
  }, [articles, searchTerm, activeFilter, activeCategory]);

  // Hero Lead article (Prioritize rich premier lead story with description & image)
  const heroArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    const richStory = filteredArticles.find(
      (art) => art.description && art.description.length > 20 && art.image && art.title.length > 15
    );
    return richStory || filteredArticles[0];
  }, [filteredArticles]);

  // News grid articles (excluding hero article when in All/default view to avoid repeating it)
  const gridArticles = useMemo(() => {
    if (filteredArticles.length <= 1) return filteredArticles;
    if (!searchTerm.trim() && (activeFilter === 'All' || activeFilter === 'all') && heroArticle) {
      return filteredArticles.filter((art) => art.id !== heroArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, searchTerm, activeFilter, heroArticle]);

  // Trending articles for sidebar (top 5 prioritized items)
  const trendingArticles = useMemo(() => {
    return articles.slice(0, 5);
  }, [articles]);

  // Load More handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const hasMore = visibleCount < gridArticles.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* 1. HEADER (Sticky top) */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalArticlesCount={articles.length}
      />

      {/* 2. CATEGORY NAVIGATION */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. BREAKING NEWS TICKER */}
      <BreakingNews articles={articles} />

      {/* MAIN CONTAINER (Max-width ~1400px) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Search Bar Panel (Collapsible or Triggered) */}
        <SearchBar
          isOpen={isSearchOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resultsCount={filteredArticles.length}
          totalCount={articles.length}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* LOADING STATE: Skeletons */}
        {isLoading && <SkeletonLoader />}

        {/* ERROR STATE: "Unable to load news right now." + "Try Again" */}
        {!isLoading && isError && (
          <div className="my-16 p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-lg max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Unable to load news right now.
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              There was a connection issue fetching the latest live dispatch from Google Sheets. Please check your connection and try again.
            </p>
            <button
              onClick={loadNews}
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* CONTENT LOADED STATE */}
        {!isLoading && !isError && (
          <>
            {/* 4. HERO SECTION (Only shown in 'All' or lead view when no search query is active) */}
            {!searchTerm.trim() && (activeFilter === 'All' || activeFilter === 'all') && heroArticle && (
              <HeroNews article={heroArticle} />
            )}

            {/* 5. FILTER CHIPS */}
            <FilterChips
              activeFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
              counts={categoryCounts}
            />

            {/* Search active results feedback header */}
            {searchTerm.trim() && (
              <div className="my-4 p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/60 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Search results for: <span className="text-rose-600 dark:text-rose-400 font-bold">"{searchTerm}"</span>
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
                </div>
              </div>
            )}

            {/* TWO COLUMN EDITORIAL LAYOUT: (Main News Grid 8-9 cols + Trending Sidebar 3-4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
              
              {/* LEFT: MAIN NEWS GRID (8 cols on desktop) */}
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                    {searchTerm ? 'Search Results' : activeFilter === 'All' ? 'Top Stories & Reports' : `${activeFilter} Stories`}
                  </h2>
                  <span className="text-xs font-semibold text-slate-400">
                    {gridArticles.length} {gridArticles.length === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>

                <NewsGrid
                  articles={gridArticles}
                  visibleCount={visibleCount}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                  searchTerm={searchTerm}
                  activeFilter={activeFilter}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* RIGHT: TRENDING SIDEBAR (4 cols on desktop, moves below on mobile) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <TrendingSidebar
                  trendingArticles={trendingArticles}
                  onOpenSubscribe={() => setIsSubscribeOpen(true)}
                />
              </div>

            </div>
          </>
        )}

      </main>

      {/* 6. FOOTER */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 7. SLIDE-OUT DRAWER MENU */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* 8. SUBSCRIBE MODAL */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

    </div>
  );
}
