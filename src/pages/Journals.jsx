import React, { useState, useEffect } from 'react';
import { journalService } from '../services/api';
import { JOURNALS } from '../data/journals'; // Import original data
import JournalCard from '../features/journals/JournalCard';

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const data = await journalService.getAll();
      
      // Merge DB data with Static data (Fallbacks)
      const mappedData = data.map(dbJ => {
        const staticJ = JOURNALS.find(sj => sj.id === dbJ.journal_id);
        
        return {
          id: dbJ.journal_id,
          image: dbJ.image_url || staticJ?.image || '/placeholder-journal.jpg',
          title: dbJ.title || staticJ?.title,
          blurb: dbJ.description || staticJ?.blurb,
          fieldEditor: dbJ.editor_in_chief || staticJ?.fieldEditor,
          org: dbJ.category || staticJ?.org,
          sections: staticJ?.sections || 0,
          articles: staticJ?.articles || 0
        };
      });
      setJournals(mappedData);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

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
            {journals.map((journal) => (
              <JournalCard key={journal.id} j={journal} />
            ))}
          </div>
        </div>
        
        {!loading && journals.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">No journals found in the catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}