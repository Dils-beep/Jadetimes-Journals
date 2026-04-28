import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    CheckCircle,
    XCircle,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Users,
    FileText
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { submissionService } from '../../services/api';

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                const data = await submissionService.getAll();
                setSubmissions(data);
            } catch (error) {
                console.error("Failed to fetch submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();

        const urlStatus = searchParams.get('status');
        if (urlStatus) {
            setStatusFilter(urlStatus);
        }
    }, [searchParams]);

    useEffect(() => {
        let result = [...submissions];

        // Search filter
        if (searchTerm) {
            result = result.filter(sub =>
                sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.contributors?.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(sub => (sub.status || 'pending') === statusFilter);
        }

        // Default sort (newest first)
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFilteredSubmissions(result);
    }, [submissions, searchTerm, statusFilter]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
            try {
                await submissionService.delete(id);
                setSubmissions(prev => prev.filter(s => s.id !== id));
            } catch (error) {
                console.error("Failed to delete submission:", error);
                alert("Failed to delete submission.");
            }
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await submissionService.updateStatus(id, newStatus);
            setSubmissions(prev => prev.map(s => {
                if (s.id === id) return { ...s, status: newStatus };
                return s;
            }));
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update status.");
        }
    };

    if (loading) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Submissions Management</h1>
                    <p className="text-slate-500 mt-1">Review, accept, or reject journal article submissions.</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, ID, or author..."
                        className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 rounded-xl pl-10 pr-4 py-2 text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 shrink-0">
                    {['all', 'pending', 'accepted', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${statusFilter === status
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Submission ID</th>
                                <th className="px-6 py-4">Article Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="max-w-xs mx-auto space-y-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                                <FileText size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">No matching submissions found.</p>
                                            <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} className="text-blue-600 text-xs font-bold hover:underline uppercase tracking-widest">Clear all filters</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubmissions.map((sub) => (
                                    <tr key={sub.submission_id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in duration-300">
                                        <td className="px-6 py-4 align-top">
                                            <span className="font-mono text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-tighter">
                                                {sub.submission_id}
                                            </span>
                                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
                                                {new Date(sub.created_at).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 max-w-sm">
                                            <p className="font-bold text-slate-800 text-base leading-snug group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate(`/admin/submissions/${sub.submission_id}`)}>
                                                {sub.title}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub.section_name}</span>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                                                    <Users size={12} className="text-slate-400" />
                                                    {sub.main_author || 'Author'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors ${sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                sub.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${sub.status === 'accepted' ? 'bg-emerald-500' :
                                                    sub.status === 'rejected' ? 'bg-rose-500' :
                                                        'bg-amber-500'
                                                    }`}></div>
                                                {sub.status || 'pending'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right align-top">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => navigate(`/admin/submissions/${sub.submission_id}`)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="View Full Details"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <div className="h-4 w-px bg-slate-100 mx-1"></div>

                                                <button
                                                    onClick={() => handleUpdateStatus(sub.submission_id, 'accepted')}
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                    title="Accept"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(sub.submission_id, 'rejected')}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                    title="Reject"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub.submission_id)}
                                                    className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">Showing {filteredSubmissions.length} of {submissions.length} submissions</p>
                    <div className="flex gap-2">
                        <button disabled className="p-2 rounded-lg bg-white border border-slate-200 text-slate-300 cursor-not-allowed transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <button disabled className="p-2 rounded-lg bg-white border border-slate-200 text-slate-300 cursor-not-allowed transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSubmissions;
