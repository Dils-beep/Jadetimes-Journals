import React, { useState } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import { JOURNALS } from '../../data/journals';
import { UNIVERSAL_STUDIES_DATA } from '../../data/journalUniversalStudies';
import { EDITORIAL_BOARD } from '../../data/editorialBoard';
import { ChevronRight, FileText, Search } from 'lucide-react';

export default function JournalDetail({ journalId: propJournalId }) {
  const { id } = useParams();
  const journalId = propJournalId || id;
  const journal = JOURNALS.find(j => j.id === journalId);
  const data = UNIVERSAL_STUDIES_DATA; // Content for Universal Studies
  const [activeTab, setActiveTab] = useState('Most recent');

  if (!journal || (journalId !== "journal-of-universal-studies" && journalId !== "universal-studies")) {
    // Fallback or handle other journals if needed, but the focus is on Universal Studies
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Journal Not Found</h2>
        <Link to="/journals" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          Back to Journals
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* 1. HERO SECTION */}
      <div 
        className="relative bg-[#0b1120] text-white overflow-hidden py-16 md:py-24"
        style={{ 
          backgroundImage: `linear-gradient(rgba(11, 17, 32, 0.75), rgba(11, 17, 32, 0.75)), url(${data.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
              {data.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start text-slate-300 text-sm font-medium">
              <p>{data.metadata.volume}, {data.metadata.issue}, {data.metadata.date}</p>
              <p>ISSN: {data.metadata.issn}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20 text-center sm:text-left min-w-[140px]">
              <span className="text-3xl font-bold block sm:inline">{data.metadata.citations}</span>
              <span className="text-[10px] uppercase tracking-widest sm:ml-2 opacity-70 block sm:inline">Citations</span>
            </div>
            <Link 
              to="/submit-research/journal-of-universal-studies"
              className="bg-[#10b981] hover:bg-[#059669] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
            >
              Submit <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>


      {/* 2. ABOUT THE JOURNAL SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 font-serif underline decoration-blue-500/30 underline-offset-8">About the Journal</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={data.cover} 
                alt="Journal Cover" 
                className="relative w-full rounded-xl shadow-2xl border border-gray-200 transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-10">
            <p className="text-gray-600 text-xl leading-relaxed font-light">
              {data.about.description}
            </p>
            
            <div className="bg-slate-50 rounded-3xl p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Areas Covered</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {data.about.areasCovered.map((area, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 text-[15px] group">
                    <span className="text-blue-500 mr-3 mt-1 text-lg leading-none group-hover:scale-125 transition-transform">ΓÇó</span> 
                    <span className="leading-snug">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-gray-500 italic text-lg border-l-4 border-blue-500 pl-8 py-2">
              {data.about.supportingText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. RESEARCH INTEGRITY FEATURE BLOCK */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 font-serif">Research Integrity</h2>
          <p className="text-blue-200 text-lg font-medium italic opacity-80">Our research integrity experts safeguard the quality of your journal.</p>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {data.researchIntegrity.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.link}
                className="group flex flex-col bg-white/5 hover:bg-white/10 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCOPE OF THE JOURNAL */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 md:p-20 shadow-xl shadow-slate-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 font-serif">{data.scope.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              {data.scope.description.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                    <FileText size={18} />
                  </span>
                  Methodological Approaches
                </h3>
                <ul className="space-y-4">
                  {data.scope.methodologicalApproaches.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-base font-medium group">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 group-hover:scale-150 transition-transform" /> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-400 italic leading-relaxed">
                  <strong className="text-slate-500 not-italic mr-1">Note:</strong> 
                  individual main themes are shown to focus relative sociological inquiry, promote international scholarly dialogue, and support evidence-based social studies in educational social phenomena at local, national, regional, or global levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL BOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif">Editorial Board</h2>
          <Link to="/journal-of-universal-studies/editors" className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors">
            See all <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {EDITORIAL_BOARD.slice(0, 4).map((member) => (
            <div key={member.id} className="text-center group p-10 rounded-[2.5rem] bg-white border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300">
              <div className="w-28 h-28 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-opacity" />
                <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover shadow-md border-4 border-white group-hover:border-blue-100 transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{member.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-4">{member.title}</p>
              <div className="h-px w-10 bg-slate-200 mx-auto mb-4" />
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">Jadetimes Journal of Universal Studies</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ARTICLES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif">Articles</h2>
          <Link to="/journal-of-universal-studies/articles" className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors">
            See all (6) <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-8 border-b border-slate-100 mb-16 text-sm font-black text-slate-300">
          {['Most recent', 'Most viewed', 'Most cited'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-6 border-b-4 transition-all uppercase tracking-widest ${activeTab === tab ? 'text-gray-900 border-blue-600' : 'border-transparent hover:text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.articles.map((article) => (
            <div key={article.id} className="flex flex-col bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-300 group">
              <div className="mb-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{article.type}</span>
                <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide opacity-70">{article.metadata}</p>
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] leading-[1.6] mb-6 flex-grow group-hover:text-blue-600 transition-colors line-clamp-4">
                {article.title}
              </h3>
              <div className="mt-auto space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{article.authors}</p>
                <div className="pt-6 border-t border-slate-50 space-y-3">
                  <p className="text-[10px] text-slate-400 font-bold italic tracking-tight opacity-50">Jadetimes Journal of Universal Studies</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-medium">doi: 10.3066/jjus...</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-1 rounded">{article.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VOLUMES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-y border-slate-100 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-serif">Volumes</h2>
          <Link to="/journal-of-universal-studies/articles" className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors">
            See all <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.volumes.map((vol) => (
            <Link 
              key={vol.id} 
              to={vol.link}
              className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
            >
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{vol.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Open Access Journal Archive</p>
              </div>
              <ChevronRight className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
