import React, { useState, useEffect } from 'react';
import { journalService } from '../../services/api';
import { Layout, Plus, Trash2, Shield, Image as ImageIcon, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AdminJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        journal_id: '',
        title: '',
        category: '',
        editor_in_chief: '',
        description: '',
        image_url: ''
    });

    useEffect(() => {
        fetchJournals();
    }, []);

    const fetchJournals = async () => {
        try {
            setLoading(true);
            const data = await journalService.getAll();
            setJournals(data);
        } catch (error) {
            console.error('Error fetching journals:', error);
            setMessage({ type: 'error', text: 'Failed to load journals.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            await journalService.create(formData);
            setMessage({ type: 'success', text: 'Journal created successfully!' });
            setFormData({
                journal_id: '',
                title: '',
                category: '',
                editor_in_chief: '',
                description: '',
                image_url: ''
            });
            fetchJournals();
        } catch (error) {
            console.error('Error creating journal:', error);
            setMessage({ type: 'error', text: 'Failed to create journal.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this journal? This might affect existing submissions.')) return;

        try {
            await journalService.delete(id);
            setMessage({ type: 'success', text: 'Journal deleted successfully.' });
            fetchJournals();
        } catch (error) {
            console.error('Error deleting journal:', error);
            setMessage({ type: 'error', text: 'Failed to delete journal.' });
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Layout className="text-blue-600" /> Journal Management
                </h1>
                <p className="text-slate-500 text-sm">Add and manage journals in your catalog.</p>
            </div>

            {/* Add Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Add New Journal</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Journal ID (Unique)</label>
                            <input
                                type="text"
                                placeholder="e.g., medical-studies"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={formData.journal_id}
                                onChange={(e) => setFormData({...formData, journal_id: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Journal Title</label>
                            <input
                                type="text"
                                placeholder="Full name of the journal"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category / Fields</label>
                            <input
                                type="text"
                                placeholder="e.g., Science, Medicine, Engineering"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Editor in Chief</label>
                            <input
                                type="text"
                                placeholder="Name of the head editor"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={formData.editor_in_chief}
                                onChange={(e) => setFormData({...formData, editor_in_chief: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                            <textarea
                                placeholder="Brief overview of the journal"
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-200"
                        >
                            {submitting ? 'Creating...' : <><Plus size={18} /> Create Journal</>}
                        </button>
                    </div>
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

            {/* Journals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 text-center py-10 text-slate-400">Loading journals...</div>
                ) : journals.length === 0 ? (
                    <div className="col-span-2 text-center py-10 text-slate-400 font-medium">No journals added yet.</div>
                ) : (
                    journals.map((journal) => (
                        <div key={journal.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="flex gap-4">
                                <div className="w-20 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                                    <ImageIcon size={32} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800 leading-tight mb-1">{journal.title}</h3>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{journal.journal_id}</p>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{journal.description || 'No description provided.'}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] rounded-md font-medium">{journal.category}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(journal.id)}
                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminJournals;
