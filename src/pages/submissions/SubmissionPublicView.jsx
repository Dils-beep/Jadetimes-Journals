import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { submissionService, BASE_URL } from '../../services/api';
import { BookOpen, Download, ChevronLeft, User, Calendar, Tag, FileText } from 'lucide-react';

export default function SubmissionPublicView() {
    const { submissionId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await submissionService.getPublicById(submissionId);
                setData(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [submissionId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-slate-400 italic">
            Loading article...
        </div>
    );

    if (!data) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
        </div>
    );

    const { submission, submission_files, contributors } = data;
    const pdfFile = submission_files?.find(f => f.file_type === 'application/pdf' || f.file_name?.endsWith('.pdf'));
    const pdfUrl = pdfFile ? `${BASE_URL}/${pdfFile.file_path.replace(/\\/g, '/')}` : null;

    const handleViewPaper = () => {
        if (pdfUrl) {
            window.open(`/paper-view/${submissionId}`, '_blank');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0b1120] via-[#0f2040] to-[#0b1120] text-white py-20 md:py-28">
                <div className="max-w-5xl mx-auto px-6">
                    <Link
                        to={`/journals/${submission.journal_id}`}
                        className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Journal
                    </Link>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-blue-600/30 border border-blue-500/40 text-blue-200 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                            {submission.section || 'Original Research'}
                        </span>
                        <span className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                            Open Access
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-8">
                        {submission.title}
                    </h1>

                    {/* Authors */}
                    {contributors && contributors.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-300 text-sm">
                            {contributors.map((c, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 text-blue-400" />
                                    <span className={c.is_primary ? 'font-semibold text-white' : ''}>{c.name}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-6 mt-8 text-slate-400 text-xs font-medium">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(submission.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5" />
                            {submission.journal_id?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Abstract */}
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 font-serif mb-5 pb-3 border-b border-slate-100">Abstract</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {submission.abstract || 'No abstract provided.'}
                        </p>
                    </section>

                    {submission.keywords && (
                        <section>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-blue-600" /> Keywords
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {submission.keywords.split(',').map((kw, i) => (
                                    <span key={i} className="bg-slate-100 text-slate-700 text-sm px-4 py-1.5 rounded-full font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default">
                                        {kw.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    {/* Download Card */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="text-lg font-bold mb-2">Full Article</h3>
                        <p className="text-slate-400 text-sm mb-6">Read the complete research paper</p>
                        {pdfUrl ? (
                            <button
                                onClick={handleViewPaper}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
                            >
                                <Download className="w-4 h-4" /> Download / Read
                            </button>
                        ) : (
                            <p className="text-slate-500 text-sm italic">Full text not yet available</p>
                        )}
                    </div>

                    {/* Article Info */}
                    <div className="bg-slate-50 rounded-3xl p-7 space-y-4">
                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Article Info</h4>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-slate-500 text-xs">Status</p>
                                <p className="font-bold text-emerald-600 capitalize">{submission.status}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">Section</p>
                                <p className="font-semibold text-gray-800">{submission.section || '—'}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 text-xs">Submitted</p>
                                <p className="font-semibold text-gray-800">
                                    {new Date(submission.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Authors List */}
                    {contributors && contributors.length > 0 && (
                        <div className="bg-slate-50 rounded-3xl p-7 space-y-4">
                            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">Authors</h4>
                            <ul className="space-y-3">
                                {contributors.map((c, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                                            {c.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                                            {c.affiliation && <p className="text-xs text-slate-500">{c.affiliation}</p>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
