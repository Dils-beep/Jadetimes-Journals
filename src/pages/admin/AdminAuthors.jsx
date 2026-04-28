import React, { useState, useEffect } from 'react';
import { Users, FileText, Search, Mail, ExternalLink, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const submissions = JSON.parse(localStorage.getItem('jt_submissions') || '[]');

        // Group by email to derive comprehensive author data
        const authorMap = new Map();

        submissions.forEach(sub => {
            sub.contributors?.forEach(c => {
                const email = c.email.toLowerCase();
                if (!authorMap.has(email)) {
                    authorMap.set(email, {
                        name: c.name,
                        email: c.email,
                        affiliation: c.affiliation,
                        submissionCount: 0,
                        latestDate: sub.createdAt,
                        statuses: { pending: 0, accepted: 0, rejected: 0 }
                    });
                }

                const data = authorMap.get(email);
                data.submissionCount++;
                if (new Date(sub.createdAt) > new Date(data.latestDate)) {
                    data.latestDate = sub.createdAt;
                }
                data.statuses[sub.status || 'pending']++;
            });
        });

        setAuthors(Array.from(authorMap.values()).sort((a, b) => b.submissionCount - a.submissionCount));
    }, []);

    const filteredAuthors = authors.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.affiliation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Authors Directory</h1>
                <p className="text-slate-500 mt-1">Manage all contributing authors and their submission history.</p>
            </div>

            {/* Total Author Count */}
            <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Active Authors</p>
                    <p className="text-2xl font-bold text-slate-800">{authors.length}</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search authors by name, email or affiliation..."
                        className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 rounded-xl pl-10 pr-4 py-2 text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Authors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAuthors.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100">
                        <Users size={40} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-medium font-bold uppercase tracking-widest text-xs">No authors found matching your criteria</p>
                    </div>
                ) : (
                    filteredAuthors.map((author) => (
                        <div key={author.email} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold border border-slate-100 shadow-inner group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                                        {author.name.charAt(0).toUpperCase()}
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800">{author.name}</h3>
                                <p className="text-xs text-indigo-600 font-medium mb-4 flex items-center gap-1.5"><Mail size={12} /> {author.email}</p>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-6 h-px bg-slate-100"></div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">{author.affiliation}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center text-center">
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Submissions</p>
                                        <p className="text-lg font-bold text-slate-800">{author.submissionCount}</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Accepted</p>
                                        <p className="text-lg font-bold text-emerald-600">{author.statuses.accepted}</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Last Active</p>
                                        <p className="text-xs font-bold text-slate-800">{new Date(author.latestDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/admin/submissions?search=${author.email}`)}
                                className="w-full py-3 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                View Submission History <ExternalLink size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminAuthors;
