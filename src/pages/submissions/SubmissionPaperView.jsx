import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { submissionService, BASE_URL } from '../../services/api';
import { Download, Printer, X } from 'lucide-react';

export default function SubmissionPaperView() {
    const { submissionId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const printRef = useRef();

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

    const handlePrint = () => window.print();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-slate-400 italic text-lg">
            Loading paper...
        </div>
    );

    if (!data) return (
        <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-bold">
            Paper not found.
        </div>
    );

    const { submission, submission_files, contributors, funders } = data;
    const pdfFile = submission_files?.find(f =>
        f.file_type === 'application/pdf' || f.file_name?.endsWith('.pdf')
    );
    const pdfUrl = pdfFile
        ? `${BASE_URL}/${pdfFile.file_path.replace(/\\/g, '/')}`
        : null;

    const authorNames = contributors?.map(c => c.name).join(', ') || 'Unknown Author';
    const publishedDate = new Date(submission.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const journalName = submission.journal_id
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Toolbar - hidden on print */}
            <div className="no-print fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-semibold text-sm truncate max-w-[400px]">{submission.title}</span>
                </div>
                <div className="flex items-center gap-3">
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            download={`${submission.title}.pdf`}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </a>
                    )}
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button
                        onClick={() => window.close()}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Paper Template */}
            <div className="pt-16 pb-16 flex justify-center">
                <div
                    ref={printRef}
                    className="bg-white w-full max-w-[900px] mx-4 md:mx-auto shadow-2xl print:shadow-none print:mx-0 print:max-w-full"
                    style={{ minHeight: '297mm', fontFamily: "'Times New Roman', Times, serif" }}
                >
                    {/* Journal Header */}
                    <div className="border-b-2 border-slate-900 px-16 pt-12 pb-6">
                        <div className="flex items-start justify-between gap-8">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 mb-1">
                                    Jadetimes Journals
                                </p>
                                <p className="text-sm font-semibold text-slate-800">{journalName}</p>
                                <p className="text-[11px] text-slate-500 mt-1">
                                    Published: {publishedDate} &nbsp;|&nbsp; Open Access
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] text-slate-500">ISSN: 3066-9421</p>
                                <p className="text-[11px] text-slate-500">jadetimesjournals.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-16 py-10">
                        {/* Article Type */}
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-700 mb-4">
                            {submission.section || 'Original Research Article'}
                        </p>

                        {/* Title */}
                        <h1 className="text-3xl font-bold leading-tight text-slate-900 mb-8" style={{ fontFamily: "'Times New Roman', serif" }}>
                            {submission.title}
                        </h1>

                        {/* Authors */}
                        <div className="mb-6">
                            <p className="text-base font-bold text-slate-800">{authorNames}</p>
                            {contributors?.map((c, i) => c.affiliation && (
                                <p key={i} className="text-[12px] text-slate-500 italic mt-1">
                                    {c.name} — {c.affiliation}
                                </p>
                            ))}
                        </div>

                        {/* Meta line */}
                        <div className="border-t border-b border-slate-200 py-3 mb-10 flex flex-wrap gap-6 text-[11px] text-slate-500">
                            <span>Received: {publishedDate}</span>
                            <span>Published: {publishedDate}</span>
                            <span>Status: <strong className="text-emerald-700 uppercase">{submission.status}</strong></span>
                        </div>

                        {/* Abstract */}
                        <section className="mb-10">
                            <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                Abstract
                            </h2>
                            <p className="text-[14px] leading-relaxed text-slate-700 text-justify">
                                {submission.abstract || 'No abstract provided.'}
                            </p>
                        </section>

                        {/* Keywords */}
                        {submission.keywords && (
                            <section className="mb-10">
                                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                    Keywords
                                </h2>
                                <p className="text-[13px] text-slate-600 italic">
                                    {submission.keywords}
                                </p>
                            </section>
                        )}

                        {/* Subjects */}
                        {submission.subjects && (
                            <section className="mb-10">
                                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                    Subject Areas
                                </h2>
                                <p className="text-[13px] text-slate-600">{submission.subjects}</p>
                            </section>
                        )}

                        {/* Comments for Editor (shown as Introduction note) */}
                        {submission.comments_for_editor && (
                            <section className="mb-10">
                                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                    Author's Note
                                </h2>
                                <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
                                    {submission.comments_for_editor}
                                </p>
                            </section>
                        )}

                        {/* Funding */}
                        {funders && funders.length > 0 && (
                            <section className="mb-10">
                                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-3 border-b border-slate-200 pb-2">
                                    Funding
                                </h2>
                                <ul className="space-y-1">
                                    {funders.map((f, i) => (
                                        <li key={i} className="text-[13px] text-slate-600">
                                            {f.name}{f.grant_number ? ` (Grant: ${f.grant_number})` : ''}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Uploaded PDF Embed */}
                        {pdfUrl && (
                            <section className="mb-10">
                                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-slate-900 mb-4 border-b border-slate-200 pb-2">
                                    Full Text (Uploaded Manuscript)
                                </h2>
                                <div className="no-print bg-slate-50 border border-slate-200 rounded-lg overflow-hidden" style={{ height: '700px' }}>
                                    <iframe
                                        src={`${pdfUrl}#view=FitH`}
                                        className="w-full h-full"
                                        title="Research Paper"
                                        frameBorder="0"
                                    />
                                </div>
                                <p className="print-only text-[12px] text-slate-500 italic mt-2">
                                    Full manuscript available at: {pdfUrl}
                                </p>
                            </section>
                        )}

                        {/* Footer */}
                        <div className="border-t-2 border-slate-900 pt-6 mt-10">
                            <div className="flex justify-between items-end text-[10px] text-slate-400">
                                <div>
                                    <p className="font-bold text-slate-600">Jadetimes Journals</p>
                                    <p>© {new Date().getFullYear()} Jadetimes Media. All rights reserved.</p>
                                </div>
                                <div className="text-right">
                                    <p>Open Access Article</p>
                                    <p>jadetimesjournals.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print styles */}
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    body { background: white; }
                }
                .print-only { display: none; }
            `}</style>
        </div>
    );
}
