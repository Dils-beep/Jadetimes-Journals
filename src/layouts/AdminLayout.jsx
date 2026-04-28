import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronRight
} from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/admin-login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Submissions', icon: FileText, path: '/admin/submissions' },
        { name: 'Authors', icon: Users, path: '/admin/authors' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`bg-slate-900 text-slate-300 transition-all duration-300 flex-shrink-0 z-20 ${sidebarOpen ? 'w-64' : 'w-20'
                    } fixed lg:static inset-y-0 left-0 translate-x-0`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 bg-slate-950/50 border-b border-slate-800/50">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">J</span>
                        </div>
                        {sidebarOpen && (
                            <span className="ml-3 text-white font-bold tracking-tight text-lg truncate">Jadetimes Admin</span>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all group ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                            : 'hover:bg-slate-800 hover:text-slate-100'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'} />
                                    {sidebarOpen && (
                                        <span className="ml-3 font-medium text-sm flex-grow">{item.name}</span>
                                    )}
                                    {sidebarOpen && isActive && <ChevronRight size={14} className="opacity-50" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 bg-slate-950/30 border-t border-slate-800/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-all group"
                        >
                            <LogOut size={20} className="group-hover:text-red-400" />
                            {sidebarOpen && (
                                <span className="ml-3 font-medium text-sm">Logout</span>
                            )}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm shadow-slate-200/50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search submissions..."
                                className="bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 rounded-lg pl-10 pr-4 py-1.5 text-sm w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">{user?.email}</p>
                            </div>
                            <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden shadow-inner">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
