import React, { useState, useEffect } from 'react';
import {
    Users,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    Search,
    Settings,
    Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { submissionService } from '../../services/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        authors: 0
    });
    const [recentSubmissions, setRecentSubmissions] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await submissionService.getAll();
                
                const counts = data.reduce((acc, sub) => {
                    acc.total++;
                    const status = sub.status || 'pending';
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, { total: 0, pending: 0, accepted: 0, rejected: 0 });

                setStats({ ...counts, authors: data.length }); // Simplified author count
                setRecentSubmissions(data.slice(0, 5)); // backend already sorts DESC
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const cards = [
        { name: 'Total Submissions', value: stats.total, icon: FileText, color: 'bg-blue-500', shadow: 'shadow-blue-200' },
        { name: 'Pending Review', value: stats.pending, icon: Clock, color: 'bg-amber-500', shadow: 'shadow-amber-200' },
        { name: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
        { name: 'Rejected', value: stats.rejected, icon: XCircle, color: 'bg-rose-500', shadow: 'shadow-rose-200' },
        { name: 'Total Authors', value: stats.authors, icon: Users, color: 'bg-indigo-500', shadow: 'shadow-indigo-200' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Monitor your journal's submission metrics and recent activity.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {cards.map((card) => (
                    <div key={card.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 ${card.color} ${card.shadow} rounded-xl flex items-center justify-center mb-4 shadow-lg text-white`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.name}</p>
                        <p className="text-3xl font-bold text-slate-800 mt-1 tracking-tight">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Submissions */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Recent Submissions</h2>
                        <Link to="/admin/submissions" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                            View all <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentSubmissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-slate-400 italic">No submissions found.</td>
                                    </tr>
                                ) : (
                                    recentSubmissions.map((sub) => (
                                        <tr key={sub.submission_id || sub.id} className="hover:bg-slate-50 transition-colors cursor-pointer group/row" onClick={() => navigate(`/admin/submissions/${sub.submission_id || sub.id}`)}>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-800 truncate max-w-xs group-hover/row:text-blue-600 transition-colors">{sub.title}</p>
                                                <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-tighter">{sub.section_name || sub.section}</p>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {sub.main_author || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                                                    sub.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                                                        'bg-amber-50 text-amber-600'
                                                    }`}>
                                                    {sub.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">
                                                {new Date(sub.created_at || sub.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end">
                                                    <div className="p-2 text-slate-400 group-hover/row:text-blue-600 group-hover/row:bg-blue-50 rounded-lg transition-all">
                                                        <Eye size={16} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Management</p>
                        <div className="space-y-3">
                            <Link to="/admin/submissions?status=pending" className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors group">
                                <span className="text-sm font-medium">Review Pending</span>
                                <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                    <Clock size={14} />
                                </div>
                            </Link>
                            <Link to="/admin/authors" className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors group">
                                <span className="text-sm font-medium">Manage Authors</span>
                                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                                    <Users size={14} />
                                </div>
                            </Link>
                            <Link to="/admin/settings" className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors group">
                                <span className="text-sm font-medium">Site Settings</span>
                                <div className="w-6 h-6 rounded-lg bg-slate-600 text-slate-400 flex items-center justify-center">
                                    <Settings size={14} />
                                </div>
                            </Link>
                            {useAuth().isSuperAdmin && (
                                <Link to="/admin/users" className="flex items-center justify-between p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors group">
                                    <span className="text-sm font-medium">User Management</span>
                                    <div className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center">
                                        <Users size={14} />
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Tip</p>
                                <p className="text-xs text-blue-100/70 leading-relaxed">You can search for submissions by title or author email using the search bar in the topbar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
