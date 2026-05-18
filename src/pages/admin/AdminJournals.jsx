import React, { useState, useEffect } from 'react';
import { journalService } from '../../services/api';
import { Layout, Plus, Trash2, Shield, Image as ImageIcon, BookOpen, Clock, CheckCircle, AlertCircle, PlusCircle, User } from 'lucide-react';

const AdminJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingMemberImg, setUploadingMemberImg] = useState(false);

    const [formData, setFormData] = useState({
        journal_id: '',
        title: '',
        category: '',
        editor_in_chief: '',
        description: '',
        image_url: '',
        about_text: '',
        scope_text: '',
        impact_factor: '',
        editorial_board: []
    });

    const [newBoardMember, setNewBoardMember] = useState({ name: '', role: '', image: '', linkedin: '' });

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

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            setUploadingCover(true);
            const url = await journalService.uploadImage(file);
            setFormData(prev => ({ ...prev, image_url: url }));
        } catch (error) {
            console.error('Error uploading cover:', error);
            setMessage({ type: 'error', text: 'Failed to upload cover image.' });
        } finally {
            setUploadingCover(false);
        }
    };

    const handleMemberImgUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingMemberImg(true);
            const url = await journalService.uploadImage(file);
            setNewBoardMember(prev => ({ ...prev, image: url }));
        } catch (error) {
            console.error('Error uploading member image:', error);
            setMessage({ type: 'error', text: 'Failed to upload member image.' });
        } finally {
            setUploadingMemberImg(false);
        }
    };

    const addBoardMember = () => {
        if (!newBoardMember.name || !newBoardMember.role) return;
        setFormData({
            ...formData,
            editorial_board: [...formData.editorial_board, newBoardMember]
        });
        setNewBoardMember({ name: '', role: '', image: '', linkedin: '' });
    };

    const removeBoardMember = (index) => {
        const updated = formData.editorial_board.filter((_, i) => i !== index);
        setFormData({ ...formData, editorial_board: updated });
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
                image_url: '',
                about_text: '',
                scope_text: '',
                impact_factor: '',
                editorial_board: []
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
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Create New Journal Shell</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">General Info</h3>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Journal ID (Unique)</label>
                                <input type="text" placeholder="e.g., medical-studies" className="admin-input" value={formData.journal_id} onChange={(e) => setFormData({...formData, journal_id: e.target.value})} required />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Journal Title</label>
                                <input type="text" placeholder="Full name" className="admin-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                <input type="text" placeholder="Science, Arts, etc." className="admin-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Cover Image</label>
                                <input type="file" accept="image/*" className="admin-input cursor-pointer" onChange={handleCoverUpload} disabled={uploadingCover} />
                                {uploadingCover && <span className="text-xs text-blue-600 mt-1 inline-block">Uploading...</span>}
                                {formData.image_url && <span className="text-xs text-emerald-600 mt-1 inline-block break-all">✓ Uploaded</span>}
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Page Content</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Impact Factor</label>
                                    <input type="text" placeholder="e.g. 4.5" className="admin-input" value={formData.impact_factor} onChange={(e) => setFormData({...formData, impact_factor: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Editor in Chief</label>
                                    <input type="text" placeholder="Name" className="admin-input" value={formData.editor_in_chief} onChange={(e) => setFormData({...formData, editor_in_chief: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">About Text (Long Description)</label>
                                <textarea placeholder="Describe the journal in detail..." className="admin-input min-h-[100px]" value={formData.about_text} onChange={(e) => setFormData({...formData, about_text: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Scope / Areas Covered (Bullet points)</label>
                                <textarea placeholder="List the topics covered..." className="admin-input min-h-[80px]" value={formData.scope_text} onChange={(e) => setFormData({...formData, scope_text: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Editorial Board Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                             <User size={16} /> Editorial Board Members
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <input type="text" placeholder="Name" className="admin-input-small" value={newBoardMember.name} onChange={e => setNewBoardMember({...newBoardMember, name: e.target.value})} />
                            <input type="text" placeholder="Role (e.g. Associate Editor)" className="admin-input-small" value={newBoardMember.role} onChange={e => setNewBoardMember({...newBoardMember, role: e.target.value})} />
                            <div>
                                <input type="file" accept="image/*" className="admin-input-small cursor-pointer" onChange={handleMemberImgUpload} disabled={uploadingMemberImg} />
                                {uploadingMemberImg && <span className="text-[10px] text-blue-600 ml-1">Uploading...</span>}
                                {newBoardMember.image && <span className="text-[10px] text-emerald-600 ml-1">✓ Uploaded</span>}
                            </div>
                            <button type="button" onClick={addBoardMember} className="bg-slate-800 text-white rounded-lg px-4 py-2 hover:bg-black transition flex items-center justify-center gap-2 text-sm font-bold">
                                <PlusCircle size={16} /> Add Member
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {formData.editorial_board.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
                                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800 leading-none">{member.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{member.role}</p>
                                    </div>
                                    <button type="button" onClick={() => removeBoardMember(idx)} className="text-slate-300 hover:text-rose-600 transition-colors ml-2">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl shadow-blue-100"
                        >
                            {submitting ? 'Creating...' : <><Plus size={20} /> Create Journal & Page</>}
                        </button>
                    </div>
                </form>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-in slide-in-from-bottom-2 ${
                    message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{message.text}</span>
                    <button onClick={() => setMessage(null)} className="ml-auto">✕</button>
                </div>
            )}

            {/* Journals List */}
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Existing Journals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 text-center py-10 text-slate-400 italic">Loading journals...</div>
                ) : journals.length === 0 ? (
                    <div className="col-span-2 text-center py-10 text-slate-400 font-medium">No journals added yet.</div>
                ) : (
                    journals.map((journal) => (
                        <div key={journal.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="flex gap-4">
                                <div className="w-20 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                                    {journal.image_url ? <img src={journal.image_url} className="w-full h-full object-cover rounded-lg" /> : <ImageIcon size={32} />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-800 leading-tight mb-1">{journal.title}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{journal.journal_id}</p>
                                        {journal.impact_factor && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold">IF: {journal.impact_factor}</span>}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{journal.about_text || journal.description}</p>
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

            {/* Custom Styles */}
            <style jsx>{`
                .admin-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.75rem;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                .admin-input:focus {
                    background-color: white;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                    outline: none;
                }
                .admin-input-small {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    background-color: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    font-size: 0.75rem;
                    outline: none;
                }
                .admin-input-small:focus {
                    border-color: #3b82f6;
                }
            `}</style>
        </div>
    );
};

export default AdminJournals;
