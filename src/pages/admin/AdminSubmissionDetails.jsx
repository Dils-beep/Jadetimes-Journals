import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    CheckCircle,
    XCircle,
    Trash2,
    Download,
    FileText,
    User,
    Mail,
    Briefcase,
    Calendar,
    Tag,
    Info,
    DollarSign,
    MessageSquare,
    Globe,
    Users,
    ShieldCheck
} from 'lucide-react';
import { submissionService, BASE_URL } from '../../services/api';

const AdminSubmissionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                setLoading(true);
                const data = await submissionService.getById(id);
                setSubmission(data);
            } catch (error) {
                console.error("Failed to fetch submission details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmission();
    }, [id]);

    const handleUpdateStatus = async (newStatus, customFeedback = '') => {
        try {
            await submissionService.updateStatus(id, newStatus, customFeedback);
            setSubmission(prev => ({
                ...prev,
                submission: { ...prev.submission, status: newStatus, feedback: customFeedback }
            }));
            if (newStatus === 'rejected') {
                setRejectModalOpen(false);
                setFeedback('');
            }
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
            try {
                await submissionService.delete(id);
                navigate('/admin/submissions');
            } catch (error) {
                console.error("Failed to delete submission:", error);
                alert("Failed to delete submission.");
            }
        }
    };

    if (loading) return null;
    if (!submission || !submission.submission) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-4">
                    <FileText size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Submission not found</h2>
                <p className="text-slate-500 mt-2 mb-8">The submission ID you are looking for does not exist.</p>
                <Link to="/admin/submissions" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                    Back to Submissions
                </Link>
            </div>
        );
    }

    const { submission: subDetails, contributors, submission_files: files, funders } = submission;

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                <Icon size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">{title}</h3>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Top Navigation & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button onClick={() => navigate('/admin/submissions')} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors uppercase tracking-widest">
                    <ChevronLeft size={20} /> Back to Submissions
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleUpdateStatus('accepted')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${subDetails.status === 'accepted'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                            : 'bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50'
                            }`}
                    >
                        <CheckCircle size={16} /> {subDetails.status === 'accepted' ? 'Accepted' : 'Accept'}
                    </button>
                    <button
                        onClick={() => setRejectModalOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${subDetails.status === 'rejected'
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                            : 'bg-white text-rose-600 border border-rose-100 hover:bg-rose-50'
                            }`}
                    >
                        <XCircle size={16} /> {subDetails.status === 'rejected' ? 'Rejected' : 'Reject'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest bg-white text-slate-400 border border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-bold"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>

            {/* Main Content Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                        {/* Title & Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${subDetails.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                                    subDetails.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                                        'bg-amber-50 text-amber-600'
                                    }`}>
                                    {subDetails.status || 'pending'}
                                </span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subDetails.section}</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">{subDetails.title}</h1>
                            <div className="flex items-center gap-4 mt-6 text-slate-500 text-sm">
                                <div className="flex items-center gap-1.5"><Calendar size={16} /> Submitted on {new Date(subDetails.created_at).toLocaleDateString()}</div>
                                <div className="flex items-center gap-1.5"><Tag size={16} /> {subDetails.keywords || 'No keywords'}</div>
                            </div>
                        </div>

                        <hr className="border-slate-50" />

                        {/* Abstract */}
                        <div>
                            <SectionHeader icon={FileText} title="Abstract" />
                            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                                {subDetails.abstract}
                            </div>
                        </div>

                        {/* Competing Interests */}
                        <div>
                            <SectionHeader icon={Info} title="Competing Interests" />
                            <p className="text-slate-600 text-sm italic leading-relaxed pl-4 border-l-2 border-slate-200">
                                {subDetails.competing_interests || 'None reported.'}
                            </p>
                        </div>
                    </div>

                    {/* Files Section */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Download} title="Uploaded Files" />
                        <div className="space-y-3 mt-6">
                            {files?.length === 0 ? (
                                <p className="text-slate-400 italic text-sm">No files uploaded.</p>
                            ) : (
                                files?.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 group transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{file.file_name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{file.file_type || 'Document'}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={`${BASE_URL}/${file.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            <Download size={20} />
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Editor Comments */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={MessageSquare} title="Comments for the Editor" />
                        <div className="bg-blue-50/30 p-6 rounded-xl border border-blue-100 text-slate-700 leading-relaxed text-sm whitespace-pre-wrap mt-6">
                            {subDetails.comments_for_editor || 'No comments provided for the editors.'}
                        </div>
                    </div>
                </div>

                {/* Right Column: Metadata & Contributors */}
                <div className="space-y-6">
                    {/* Contributors */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <SectionHeader icon={Users} title="Contributors" />
                        <div className="space-y-5 mt-6">
                            {contributors?.map((person, idx) => (
                                <div key={idx} className="relative pl-6 pt-1">
                                    <div className="absolute top-0 left-0 w-0.5 h-full bg-slate-100"></div>
                                    <div className={`absolute top-2 -left-1 w-2.5 h-2.5 rounded-full border-2 border-white ${person.is_primary ? 'bg-blue-600' : 'bg-slate-300'}`}></div>

                                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                        {person.name}
                                        {person.is_primary && <span className="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase">Primary</span>}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5"><Mail size={12} className="text-slate-400" /> {person.email}</p>
                                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5"><Briefcase size={12} className="text-slate-400" /> {person.affiliation}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{person.role || 'Author'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
                        <SectionHeader icon={Globe} title="Submission Data" />
                        <div className="space-y-6 mt-6">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Submission ID</p>
                                <p className="font-mono text-xs text-blue-400">{subDetails.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Submitted By</p>
                                <p className="text-sm font-medium">{contributors?.[0]?.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Subjects</p>
                                <p className="text-sm font-medium">{subDetails.subjects || 'General'}</p>
                            </div>

                            {funders?.length > 0 && (
                                <div className="pt-4 border-t border-slate-800">
                                    <SectionHeader icon={DollarSign} title="Funders" />
                                    <div className="space-y-3 mt-4">
                                        {funders.map((f, i) => (
                                            <div key={i} className="bg-slate-800/50 p-3 rounded-xl">
                                                <p className="text-xs font-bold text-slate-100">{f.name}</p>
                                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Grant: {f.grant_number || 'N/A'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Breadcrumb-like Data */}
                            <div className="pt-4 border-t border-slate-800">
                                <SectionHeader icon={ShieldCheck} title="Confirmation" />
                                <div className={`mt-4 p-3 rounded-xl border ${subDetails.checklist_agreed ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                    <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        {subDetails.checklist_agreed ? <CheckCircle size={14} /> : <Info size={14} />}
                                        Copyright {subDetails.checklist_agreed ? 'Confirmed' : 'Pending'}
                                    </p>
                                    <p className="text-[10px] mt-1 leading-relaxed opacity-80">
                                        {subDetails.checklist_agreed
                                            ? 'The author has agreed to the copyright terms and Creative Commons license.'
                                            : 'The author has not yet completed the copyright confirmation.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <XCircle size={20} className="text-rose-500" />
                                Reject Submission
                            </h3>
                            <button onClick={() => setRejectModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-600 mb-4">Please provide feedback to the author explaining why this submission is being rejected or what changes are required for re-submission.</p>
                            <textarea
                                rows={5}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Enter feedback for the author..."
                                className="w-full p-3 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm"
                            ></textarea>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setRejectModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button onClick={() => handleUpdateStatus('rejected', feedback)} disabled={!feedback.trim()} className="px-5 py-2 text-sm font-bold bg-rose-500 text-white hover:bg-rose-600 disabled:bg-rose-300 rounded-xl transition-colors shadow-lg shadow-rose-200">Confirm Rejection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSubmissionDetails;
