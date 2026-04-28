import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { JOURNALS } from '../../data/journals';
import { ChevronLeft, Info, Search, ShieldCheck, FileText, Globe } from 'lucide-react';

export default function JournalAbout() {
  const { id } = useParams();
  const journalId = id || "journal-of-universal-studies";
  const journal = JOURNALS.find(j => j.id === journalId);

  if (!journal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Journal Not Found</h2>
        <p className="text-gray-600 mb-8">The journal you are looking for doesn't exist.</p>
        <Link to="/journals" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          Back to Journals
        </Link>
      </div>
    );
  }

  const sections = [
    {
      title: "Mission & Objective",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      content: `The mission of ${journal.title} is to provide a world-class platform for the dissemination of high-quality, peer-reviewed research. We aim to foster a global community of scholars dedicated to advancing knowledge in ${journal.category} and related fields. Our objective is to facilitate the exchange of innovative ideas and research findings that address critical societal challenges.`
    },
    {
      title: "Scope of the Journal",
      icon: <Search className="w-6 h-6 text-blue-600" />,
      content: `${journal.title} covers a broad spectrum of topics within ${journal.category}. We welcome original research articles, comprehensive reviews, and short communications that contribute significant new insights to the field. Areas of interest include, but are not limited to: ${journal.blurb}.`
    },
    {
      title: "Open Access Policy",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      content: "We are committed to the principle of open access. All articles published in our journal are immediately and permanently available online for anyone to read, download, and share, free of charge. This policy ensures the widest possible reach and impact for our authors' work."
    },
    {
      title: "Editorial Excellence",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      content: `Under the leadership of ${journal.fieldEditor} and our distinguished editorial board, we maintain the highest standards of academic integrity. Every submission undergoes a rigorous double-blind peer-review process to ensure scientific excellence and relevance.`
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <Link to={`/journals/${journal.id}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Journal
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">About the Journal</h1>
          <p className="text-xl text-slate-300 max-w-3xl font-light">
            Learn more about the mission, scope, and policies of {journal.title}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            {sections.map((section, index) => (
              <section key={index} className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-serif">{section.title}</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed pl-1">
                  {section.content}
                </p>
                {index < sections.length - 1 && <div className="h-px bg-slate-100 w-full mt-8" />}
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Quick Info
              </h3>
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Journal ID</dt>
                  <dd className="text-slate-900 font-medium">{journal.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Impact Factor</dt>
                  <dd className="text-slate-900 font-medium">{journal.impact || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">ISSN (Online)</dt>
                  <dd className="text-slate-900 font-medium">Pending</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Publication Frequency</dt>
                  <dd className="text-slate-900 font-medium">Continuous/Semi-Annual</dd>
                </div>
              </dl>
              
              <div className="mt-10 pt-8 border-t border-slate-200">
                <Link to={`/submit-research/${journal.id}`} className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Submit to this Journal
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">Contact Editorial Office</h3>
              <p className="text-slate-600 mb-6">
                Have questions about your submission or our policies? We're here to help.
              </p>
              <Link to="/contact" className="text-blue-600 font-bold hover:underline">
                Visit Help Center &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}