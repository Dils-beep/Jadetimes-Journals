import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

export default function ArticleCard({ article }) {
  if (!article) return null;

  // Determine the link based on the journal
  const isUniversalStudies = article.journalId === "journal-of-universal-studies" || 
                             (article.journalTitle && article.journalTitle.includes("Universal Studies")) ||
                             (article.journal && article.journal.includes("Universal Studies"));
                             
  const articleLink = isUniversalStudies
    ? `/journal-of-universal-studies/articles/${article.id}`
    : `/articles/${article.id}`;

  return (
    <Link to={articleLink} className="group block h-full">
      <article className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:border-blue-100 group-hover:-translate-y-1 h-full flex flex-col items-start text-left">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {article.kind && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {article.kind}
            </span>
          )}
          <span className="flex items-center text-slate-400 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {article.published || article.date}
          </span>
          {article.section && (
            <>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-blue-600 text-xs font-semibold">{article.section}</span>
            </>
          )}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 font-serif leading-tight group-hover:text-blue-600 transition-colors flex-grow">
          {article.title}
        </h3>
        
        {article.authors && (
          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
            {Array.isArray(article.authors) ? article.authors.map(a => a.name).join(', ') : article.authors}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto w-full">
          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-xs">
              <span className="text-slate-900 font-bold">{article.metrics?.views || article.views || 0}</span> Views
            </span>
            <span className="text-slate-400 text-xs">
              <span className="text-slate-900 font-bold">0</span> Citations
            </span>
          </div>
          <span className="text-blue-600 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
            Read Article <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}