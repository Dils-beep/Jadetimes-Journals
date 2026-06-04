import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { JOURNALS } from '../../data/journals';
import { ARTICLES } from '../../data/articles';
import { ChevronLeft, BookOpen, Clock, ChevronRight } from 'lucide-react';

export default function JournalArticles() {
  const { id } = useParams();
  const journalId = id || "journal-of-universal-studies";
  const journal = JOURNALS.find(j => j.id === journalId);

  // Filter articles for this journal
  // Note: some articles might use journal title instead of ID, handle both
  const journalArticles = ARTICLES.filter(a =>
    a.journalId === journalId ||
    a.journal === journal?.title ||
    (journalId === "journal-of-universal-studies" && (a.journal?.includes("Universal Studies") || a.journalTitle?.includes("Universal Studies")))
  );

  if (!journal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Journal Not Found</h2>
        <Link to="/journals" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link to={`/journals/${journal.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Journal
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif">Articles</h1>
              <p className="text-xl text-slate-600 mt-2 font-light">
                Explore the latest research published in {journal.title}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">{journalArticles.length} Published Articles</h2>
          <div className="flex gap-4">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Most Recent First</option>
              <option>Most Viewed</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="space-y-8 max-w-5xl">
          {journalArticles.length > 0 ? (
            journalArticles.map((article) => (
              <Link
                key={article.id}
                to={article.journalId === "journal-of-universal-studies" || article.journalTitle?.includes("Universal Studies") ? `/journal-of-universal-studies/articles/${article.id}` : `/articles/${article.id}`}
                className="block group"
              >
                <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all group-hover:border-blue-100 group-hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {article.kind}
                    </span>
                    <span className="flex items-center text-slate-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.published}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-blue-600 text-xs font-semibold">{article.section}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {article.authors.map(a => a.name).join(', ')}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-6">
                      <span className="text-slate-400 text-xs">
                        <span className="text-slate-900 font-bold">{article.metrics?.views || 0}</span> Views
                      </span>
                      <span className="text-slate-400 text-xs">
                        <span className="text-slate-900 font-bold">0</span> Citations
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                      Read Article <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-xl">No articles have been published in this journal yet.</p>
              <Link to={`/submit-research/${journalId}`} className="inline-block mt-8 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                Be the first to submit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
