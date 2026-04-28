import React from 'react';
import { JOURNALS } from '../data/journals';
import JournalCard from '../features/journals/JournalCard';

export default function Journals() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Journals Catalog</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Discover a world of research. Explore our diverse collection of peer-reviewed journals published by Jadetimes Journals.
          </p>
        </div>

        <div className="max-w-4xl">
          <div className="flex flex-col">
            {JOURNALS.map((journal) => (
              <JournalCard key={journal.id} j={journal} />
            ))}
          </div>
        </div>
        
        {JOURNALS.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">No journals found in the catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}