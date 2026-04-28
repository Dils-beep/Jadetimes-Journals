import React, { useState, useEffect } from 'react';
import { 
    Users, 
    UserPlus, 
    Shield, 
    Mail, 
    BookOpen, 
    Trash2, 
    CheckCircle,
    AlertCircle,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/api';
import { JOURNALS } from '../../data/journals';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    
    const [newAdmin, setNewAdmin] = useState({
        email: '',
        journal_id: 'journal-of-universal-studies',
        role: 'admin'
    });

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const data = await userService.getAdmins();
            setAdmins(data);
        } catch (error) {
            console.error("Failed to fetch admins:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleAssignAdmin = async (e) => {
        e.preventDefault();
        try {
            await userService.assignAdmin(newAdmin);
            setMessage({ type: 'success', text: `Admin assigned successfully to ${newAdmin.email}` });
            setIsModalOpen(false);
            setNewAdmin({ email: '', journal_id: 'journal-of-universal-studies', role: 'admin' });
            fetchAdmins();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || "Failed to assign admin." });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-slate-500 font-bold text-xs hover:text-slate-800 transition-colors uppercase tracking-widest mb-4">
                        <ChevronLeft size={16} /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Management</h1>
                    <p className="text-slate-500 mt-1">Manage journal administrators and their permissions.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                    <UserPlus size={20} /> Assign New Admin
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-medium">{message.text}</p>
                    <button onClick={() => setMessage(null)} className="ml-auto">✕</button>
                </div>
            )}

            {/* Admins Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Assigned Journal</th>
                            <th className="px-6 py-4">Created At</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">Loading admins...</td></tr>
                        ) : admins.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">No admins found.</td></tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin.firebase_uid} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{admin.full_name || 'Pending Sync'}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1"><Mail size={12} /> {admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${admin.role === 'super_admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {admin.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <BookOpen size={16} className="text-slate-400" />
                                            <span className="font-medium">{admin.journal_id ? (JOURNALS.find(j => j.id === admin.journal_id)?.title || admin.journal_id) : 'All Journals'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                                        {new Date(admin.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Assign Admin Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Shield className="text-blue-600" size={20} /> Assign Admin Privileges</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">✕</button>
                        </div>
                        <form onSubmit={handleAssignAdmin} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="admin@example.com" 
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" 
                                        value={newAdmin.email} 
                                        onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} 
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 ml-1">The user will be granted admin status once they sign up or log in with this email.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Journal</label>
                                <select 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:border-blue-500 focus:bg-white outline-none transition-all appearance-none" 
                                    value={newAdmin.journal_id} 
                                    onChange={e => setNewAdmin({ ...newAdmin, journal_id: e.target.value })}
                                >
                                    {JOURNALS.map(j => (
                                        <option key={j.id} value={j.id}>{j.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Access Level</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setNewAdmin({...newAdmin, role: 'admin'})}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${newAdmin.role === 'admin' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        Journal Admin
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setNewAdmin({...newAdmin, role: 'super_admin'})}
                                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${newAdmin.role === 'super_admin' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        Super Admin
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition shadow-xl shadow-slate-200">
                                    Assign Privileges
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
