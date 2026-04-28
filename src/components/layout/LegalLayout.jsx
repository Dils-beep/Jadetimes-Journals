import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const sidebarLinks = [
    { label: 'Terms and Conditions', to: '/terms-conditions' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Copyright Statement', to: '#' },
    { label: 'Cookie Policy', to: '#' },
    { label: 'Summary of Changes', to: '#' },
    { label: 'Events Terms and Conditions', to: '#' },
];

export default function LegalLayout() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
                <nav className="flex flex-col space-y-1">
                    {sidebarLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm rounded-full transition-colors ${isActive
                                    ? 'bg-gray-100 font-semibold text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}
