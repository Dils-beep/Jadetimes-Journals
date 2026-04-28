import React, { useState, useMemo } from 'react';
import { ARTICLES } from '../data/articles';
import ArticleCard from '../features/articles/ArticleCard';
import { Search, Filter, BookOpen, Clock, ChevronDown } from 'lucide-react';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('All Sections');

  // Extract unique sections from articles
  const sections = useMemo(() => {
    const s = new Set(ARTICLES.map(a => a.section));
    return ['All Sections', ...Array.from(s).sort()];
  }, []);

  // Filter articles based on search and section
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (article.abstract && article.abstract.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSection = selectedSection === 'All Sections' || article.section === selectedSection;
      
      return matchesSearch && matchesSection;
    });
  }, [searchQuery, selectedSection]);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-slate-900 overflow-hidden relative py-20 md:py-32">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-blue-500/5 -skew-x-12 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
              Research <span className="text-blue-400">Database</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Explore the complete archive of peer-reviewed articles across all Jadetimes Journals.
            </p>
            
            {/* Search Bar */}
            <div className="relative group max-w-2xl">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or keywords..."
                className="w-full bg-white/10 border border-white/20 text-white pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Filters and Stats */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Found
            </h2>
            <p className="text-slate-500 text-sm">Showing the latest research updates</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-100 transition-colors"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="flex justify-center mb-4 text-slate-300">
              <Search className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {setSearchQuery(''); setSelectedSection('All Sections');}}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}