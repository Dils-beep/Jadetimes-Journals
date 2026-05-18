import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { submissionService, BASE_URL } from '../../services/api';
import { FileText, CheckCircle, Clock, XCircle, Upload, AlertCircle, Eye } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [submissions, setSubmissions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [reuploading, setReuploading] = React.useState(null); // stores submission ID being reuploaded
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
        if (user) {
            fetchSubmissions();
        }
    }, [user]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const data = await submissionService.getMySubmissions();
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch user submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleReuploadClick = (id) => {
        setReuploading(id);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !reuploading) return;

        try {
            const formData = new FormData();
            formData.append('files', file);

            await submissionService.reupload(reuploading, formData);
            alert("File re-uploaded successfully. Your submission is now pending review again.");
            fetchSubmissions(); // Refresh list
        } catch (error) {
            console.error("Failed to reupload:", error);
            alert("Failed to re-upload the file. Please try again.");
        } finally {
            setReuploading(null);
            e.target.value = null; // reset file input
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[60vh]">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-4xl font-bold shadow-inner">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user?.displayName || user?.email?.split('@')[0] || 'User'}</h1>
                            <p className="text-blue-100 opacity-90">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">Account Details</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
                                    <span className="text-gray-500">Email Address</span>
                                    <span className="text-gray-900 font-medium">{user?.email}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
                                    <span className="text-gray-500">Account Role</span>
                                    <span className="text-blue-600 font-medium uppercase tracking-wider text-xs">Researcher</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
                                    <span className="text-gray-500">Email Verified</span>
                                    <span className={user?.emailVerified ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                                        {user?.emailVerified ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">Quick Actions</h2>
                            <div className="flex flex-col gap-3">
                                <Link
                                    to="/journals"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-150 text-center shadow-sm"
                                >
                                    Browse Journals to Submit
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-50 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-100 transition duration-150 border border-red-100"
                                >
                                    Logout from Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* My Submissions Panel */}
                    <div className="pt-8 border-t border-gray-100">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                            <FileText size={20} className="text-blue-600" /> My Submissions
                        </h2>
                        
                        <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />

                        {loading ? (
                            <div className="text-center py-10 text-gray-400">Loading submissions...</div>
                        ) : submissions.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                                <p className="text-gray-500 mb-4">You haven't submitted any research yet.</p>
                                <Link to="/journals" className="text-blue-600 font-medium hover:underline">Find a journal to submit to</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {submissions.map((sub) => (
                                    <div key={sub.submission_id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                                                        sub.status === 'accepted' ? 'text-green-600' :
                                                        sub.status === 'rejected' ? 'text-red-600' :
                                                        'text-amber-600'
                                                    }`}>
                                                        {sub.status === 'accepted' && <CheckCircle size={14} />}
                                                        {sub.status === 'rejected' && <XCircle size={14} />}
                                                        {(!sub.status || sub.status === 'pending') && <Clock size={14} />}
                                                        {sub.status || 'pending'}
                                                    </span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-xs text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">{sub.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">Journal ID: <span className="font-medium text-gray-700">{sub.journal_id}</span></p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 shrink-0">
                                                {/* If accepted, maybe show a view button, but since they uploaded it they have it. We can show it anyway. */}
                                                {sub.status === 'rejected' && (
                                                    <button 
                                                        onClick={() => handleReuploadClick(sub.submission_id)}
                                                        disabled={reuploading === sub.submission_id}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium text-sm transition-colors border border-blue-200"
                                                    >
                                                        <Upload size={16} /> {reuploading === sub.submission_id ? 'Uploading...' : 'Re-upload PDF'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {sub.status === 'rejected' && sub.feedback && (
                                            <div className="mt-4 bg-red-50/50 border border-red-100 rounded-lg p-4">
                                                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                    <AlertCircle size={14} /> Editor Feedback
                                                </h4>
                                                <p className="text-sm text-red-900 whitespace-pre-wrap">{sub.feedback}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
