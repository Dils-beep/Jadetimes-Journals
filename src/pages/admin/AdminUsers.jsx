import React, { useState, useEffect } from 'react';
import { userService } from '../../services/api';
import api from '../../services/api';
import { Users, Mail, Trash2, Shield, Layout, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AdminUsers = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [journalId, setJournalId] = useState('');
    const [role, setRole] = useState('admin');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const data = await userService.getAdmins();
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admins:', error);
            setMessage({ type: 'error', text: 'Failed to load admins.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            await userService.assignAdmin({ email, journal_id: journalId, role });
            setMessage({ type: 'success', text: `Successfully assigned ${email} as ${role}.` });
            setEmail('');
            setJournalId('');
            fetchAdmins();
        } catch (error) {
            console.error('Error assigning admin:', error);
            setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to assign admin.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (uid) => {
        if (!window.confirm('Are you sure you want to remove this admin?')) return;

        try {
            await api.delete(`/users/${uid}`);
            setMessage({ type: 'success', text: 'Admin removed successfully.' });
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
            setMessage({ type: 'error', text: 'Failed to delete admin.' });
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield className="text-blue-600" /> Admin Management
                    </h1>
                    <p className="text-slate-500 text-sm">Manage journal administrators and their permissions.</p>
                </div>
            </div>

            {/* Assign Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Assign New Admin</h2>
                <form onSubmit={handleAssign} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <select
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={journalId}
                            onChange={(e) => setJournalId(e.target.value)}
                            required
                        >
                            <option value="">Select Journal</option>
                            <option value="universal">Universal Journal</option>
                            <option value="medical">Medical Journal</option>
                            <option value="engineering">Engineering Journal</option>
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Journal Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {submitting ? 'Assigning...' : 'Assign Admin'}
                    </button>
                </form>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                    message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{message.text}</span>
                    <button onClick={() => setMessage(null)} className="ml-auto">✕</button>
                </div>
            )}

            {/* Admins Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Journal</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400">Loading admins...</td></tr>
                        ) : admins.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400">No admins found.</td></tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin.firebase_uid} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                                <Users size={16} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{admin.full_name || 'Pending'}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1"><Mail size={12} /> {admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            admin.role === 'super_admin' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {admin.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-slate-600">
                                            <Layout size={14} className="text-slate-400" />
                                            {admin.journal_id || 'All Journals'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            {new Date(admin.created_at).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {admin.role !== 'super_admin' && (
                                            <button 
                                                onClick={() => handleDelete(admin.firebase_uid)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                title="Delete Admin"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
