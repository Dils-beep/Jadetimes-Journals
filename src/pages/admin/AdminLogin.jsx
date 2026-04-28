import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // The AuthContext update will happen automatically via onAuthStateChanged
            // But we can check isAdmin here immediately if we want to redirect
            // However, onAuthStateChanged is async. A better way is to wait or rely on a useEffect
        } catch (err) {
            setError('Invalid credentials.');
            setLoading(false);
        }
    };

    // Redirect after successful login AND admin verification
    React.useEffect(() => {
        // We only redirect if we have a user and they ARE an admin
        // If they are logged in but NOT an admin, we might want to show an error
        // But the task says: if user email is in ADMIN_EMAILS -> redirect to /admin else show error

        // Let's handle the "not an admin" case
        const checkAdmin = async () => {
            if (loading) {
                // Wait for login to complete
                return;
            }

            const currentUser = await new Promise(resolve => {
                const { user } = login; // This is not quite right, useAuth provides user
                // Actually useAuth is already reactive
            });
        };
    }, []);

    const { user, isAdmin: isAdminUser } = useAuth();

    React.useEffect(() => {
        if (user) {
            if (isAdminUser) {
                const origin = location.state?.from?.pathname || '/admin';
                navigate(origin);
            } else if (!loading && email) {
                setError('You do not have admin access.');
                // Optional: sign out if they tried to log in as admin but aren't
            }
            setLoading(false);
        }
    }, [user, isAdminUser, navigate, location]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="flex items-center justify-center flex-grow p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Admin Portal</h2>
                        <p className="text-slate-500 mt-2">Enter your credentials to access the dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-300"
                                placeholder="admin@jadetimesjournals.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-300"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-slate-800 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-slate-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Login as Admin"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Looking for author login? <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:underline">Click here</button>
                        </p>
                    </div>
                </div>
            </div>
            <footer className="bg-white border-t border-slate-100 text-slate-400 text-xs px-8 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                    <p>© 2025 Jadetimes Journals Media S.A. Administrative Panel</p>
                    <div className="flex gap-4 font-medium">
                        <a href="#" className="hover:text-slate-600">Privacy</a>
                        <a href="#" className="hover:text-slate-600">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminLogin;
