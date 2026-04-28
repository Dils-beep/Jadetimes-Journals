import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { JOURNALS } from '../../data/journals';
import { EDITORIAL_BOARD } from '../../data/editorialBoard';
import { Linkedin } from 'lucide-react';

export default function JournalEditors() {
  const { id } = useParams();
  const journalId = id || "journal-of-universal-studies";
  const journal = JOURNALS.find(j => j.id === journalId);

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
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Centered Header Section */}
      <div className="pt-20 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
            Editorial Board
          </h1>
          <p className="text-xl text-[#334155] font-semibold">
            Jadetimes Journal of Universal Studies
          </p>
        </div>
      </div>

      {/* Grid of Board Members */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {EDITORIAL_BOARD.map((editor) => (
            <div 
              key={editor.id} 
              className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-6 relative">
                <img 
                  src={editor.image} 
                  alt={editor.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {editor.name}
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-6">
                {editor.title}
              </p>
              <a 
                href={editor.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm py-2 px-4 bg-blue-50 rounded-lg transition-colors"
              >
                <div className="bg-blue-600 p-0.5 rounded-sm">
                  <Linkedin className="w-3 h-3 text-white fill-current" />
                </div>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
