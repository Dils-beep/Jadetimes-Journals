import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { journalService, submissionService } from '../../services/api';
import { UNIVERSAL_STUDIES_DATA } from '../../data/journalUniversalStudies';
import { ChevronRight, FileText, User, Quote, BookOpen, Star } from 'lucide-react';
import UniversalStudiesDetail from './UniversalStudiesDetail';

export default function JournalDetail({ journalId: propJournalId }) {
    const { id } = useParams();
    const journalId = propJournalId || id;

    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Most recent');
    const [acceptedPapers, setAcceptedPapers] = useState([]);

    useEffect(() => {
        if (journalId === "journal-of-universal-studies" || journalId === "universal-studies") {
            setLoading(false);
            return;
        }

        const fetchJournal = async () => {
            try {
                setLoading(true);
                const [data, papersData] = await Promise.all([
                    journalService.getById(journalId),
                    submissionService.getAcceptedByJournal(journalId).catch(() => [])
                ]);
                setJournal(data);
                setAcceptedPapers(papersData);
            } catch (error) {
                console.error('Error fetching journal:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJournal();
    }, [journalId]);

    if (journalId === "journal-of-universal-studies" || journalId === "universal-studies") {
        return <UniversalStudiesDetail journalId={journalId} />;
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center italic text-slate-400">Loading journal data...</div>;
    }

    if (!journal) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Journal Not Found</h2>
                <Link to="/journals" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                    Back to Journals
                </Link>
            </div>
        );
    }

    // Parse Editorial Board if it's a string (MySQL JSON returns string in some cases)
    const editorialBoard = typeof journal.editorial_board === 'string'
        ? JSON.parse(journal.editorial_board)
        : (journal.editorial_board || []);

    // Split scope text into array if it's a list (newline separated)
    const areasCovered = journal.scope_text
        ? journal.scope_text.split('\n').filter(line => line.trim() !== '')
        : [];

    return (
        <div className="bg-white min-h-screen animate-in fade-in duration-700">
            {/* 1. HERO SECTION */}
            <div
                className="relative bg-[#0b1120] text-white overflow-hidden py-16 md:py-24"
                style={{
                    backgroundImage: `linear-gradient(rgba(11, 17, 32, 0.85), rgba(11, 17, 32, 0.85)), url(${journal.image_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 relative z-10">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight">
                            {journal.title}
                        </h1>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start text-slate-300 text-sm font-medium uppercase tracking-widest">
                            <p>{journal.category}</p>
                            {journal.impact_factor && <p className="text-emerald-400">Impact Factor: {journal.impact_factor}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20 text-center sm:text-left min-w-[140px]">
                            <span className="text-3xl font-bold block sm:inline">2024</span>
                            <span className="text-[10px] uppercase tracking-widest sm:ml-2 opacity-70 block sm:inline">Active</span>
                        </div>
                        <Link
                            to={`/submit-research/${journal.journal_id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
                        >
                            Submit Your Research <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. ABOUT THE JOURNAL SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex items-center gap-3 mb-12">
                    <BookOpen className="text-blue-600" />
                    <h2 className="text-4xl font-bold text-gray-900 font-serif underline decoration-blue-500/30 underline-offset-8">About the Journal</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-4">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-blue-100/50 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src={journal.image_url || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800'}
                                alt="Journal Cover"
                                className="relative w-full rounded-xl shadow-2xl border border-gray-200 transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-8 space-y-10">
                        <p className="text-gray-600 text-xl leading-relaxed font-light">
                            {journal.about_text || journal.description}
                        </p>

                        {areasCovered.length > 0 && (
                            <div className="bg-slate-50 rounded-3xl p-10 border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Scope & Areas Covered</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                    {areasCovered.map((area, idx) => (
                                        <li key={idx} className="flex items-start text-gray-700 text-[15px] group">
                                            <span className="text-blue-500 mr-3 mt-1 text-lg leading-none group-hover:scale-125 transition-transform">•</span>
                                            <span className="leading-snug">{area}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="p-8 border-l-4 border-emerald-500 bg-emerald-50/30 rounded-r-2xl">
                            <h4 className="font-bold text-emerald-800 text-sm mb-2 uppercase tracking-widest">Editor in Chief</h4>
                            <p className="text-slate-700 font-medium italic text-lg">"{journal.editor_in_chief || 'To be announced'}"</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RECENTLY ACCEPTED PAPERS */}
            {acceptedPapers && acceptedPapers.length > 0 && (
                <section className="bg-white py-24 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center gap-3 mb-12">
                            <FileText className="text-blue-600" />
                            <h2 className="text-4xl font-bold text-gray-900 font-serif underline decoration-blue-500/30 underline-offset-8">Recently Accepted Papers</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {acceptedPapers.slice(0, 4).map((paper) => (
                                <Link key={paper.id} to={`/submissions/${paper.id}`} className="block group">
                                    <article className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl transition-all group-hover:border-blue-200 group-hover:-translate-y-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                Accepted Submission
                                            </span>
                                            {paper.status === 'pending' && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                    Under Review
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {paper.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                                            {paper.abstract}
                                        </p>
                                        <div className="text-blue-600 font-bold flex items-center text-sm">
                                            View Abstract & Download <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                        {acceptedPapers.length > 4 && (
                            <div className="mt-12 text-center">
                                <Link to={`/journals/${journal.journal_id}/articles`} className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-3 rounded-full font-bold transition-colors">
                                    View All Articles <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. EDITORIAL BOARD */}
            {editorialBoard.length > 0 && (
                <section className="bg-slate-50 py-24 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 font-serif">Editorial Board</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {editorialBoard.map((member, idx) => (
                                <div key={idx} className="text-center group p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all duration-300">
                                    <div className="w-24 h-24 mx-auto mb-6 relative">
                                        {member.image ? (
                                            <img src={member.image} className="w-full h-full rounded-full object-cover shadow-md border-2 border-white" alt={member.name} />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{member.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium mb-4">{member.role}</p>
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 text-xs font-bold hover:underline">LinkedIn Profile</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. CALL TO ACTION */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif leading-tight">Ready to publish your <br />research in this journal?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">We welcome high-quality research papers, reviews, and case studies. Our peer-review process ensures academic excellence.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/publishing/author-guidelines" className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">Author Guidelines</Link>
                        <Link to={`/submit-research/${journal.journal_id}`} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">Submit Now</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}