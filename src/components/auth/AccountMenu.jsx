import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon, ChevronDownIcon } from '../ui/Icons';

const AccountMenu = ({ overlayMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        navigate('/');
    };

    const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className={`flex items-center gap-2 group focus:outline-none ${overlayMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-blue-600'
                    }`}
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${overlayMode ? 'bg-white/20 border-white text-white' : 'bg-blue-100 border-blue-600 text-blue-600'
                    }`}>
                    {userInitial}
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-sm font-medium">
                    My Account <ChevronDownIcon size={16} />
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-[1000] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold border-2 border-blue-600">
                                {userInitial}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-gray-900 font-semibold truncate">{displayName}</span>
                                <span className="text-gray-500 text-xs truncate">{user?.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                            My Profile
                        </Link>
                        <Link
                            to="/submit-research/journal-of-universal-studies"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                            Submit Research
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-2 pb-1">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
