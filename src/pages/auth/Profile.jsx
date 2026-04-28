import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
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
                                    to="/submit-research/journal-of-universal-studies"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-150 text-center shadow-sm"
                                >
                                    Submit New Research
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

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">Researcher Dashboard</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Welcome to your Jadetimes Journals researcher profile. Here you can manage your submissions, review status, and profile information.
                            Our peer review process ensures the highest quality of scientific communication.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
