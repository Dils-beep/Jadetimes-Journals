import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const JournalSidebar = () => {
    const { pathname } = useLocation();

    // Helper to determine if a link is active
    // Exact match for some, startsWith for others if needed.
    const getLinkClass = (path) => {
        const isActive = pathname === path || (path !== '/' && pathname.startsWith(path) && path !== '/publishing/author-guidelines');
        // Special handling for hash links or specific rules if needed
        return isActive
            ? "text-blue-600 font-semibold block border-l-2 border-blue-600 pl-3"
            : "text-gray-600 hover:text-blue-600 hover:border-l-2 hover:border-gray-300 pl-3 block transition-colors";
    };

    const LinkItem = ({ to, label, isHash }) => {
        if (isHash) {
            // For hash links, we might just use standard Link or a href if on same page
            // But for sidebar navigation across pages, usually we want to go that page.
            return (
                <li>
                    <NavLink to={to} className={({ isActive }) =>
                        (isActive || pathname === to.split('#')[0]) // Simplified active check
                            ? "text-blue-600 font-semibold block border-l-2 border-blue-600 pl-3"
                            : "text-gray-600 hover:text-blue-600 hover:border-l-2 hover:border-gray-300 pl-3 block transition-colors"
                    }>
                        {label}
                    </NavLink>
                </li>
            )
        }
        return (
            <li>
                <NavLink to={to} className={({ isActive }) =>
                    isActive
                        ? "text-blue-600 font-semibold block border-l-2 border-blue-600 pl-3"
                        : "text-gray-600 hover:text-blue-600 hover:border-l-2 hover:border-gray-300 pl-3 block transition-colors"
                }>
                    {label}
                </NavLink>
            </li>
        );
    };

    return (
        <aside className="hidden lg:block lg:w-72 flex-shrink-0 order-last lg:order-none">
            <div className="sticky top-32">
                <nav className="space-y-8">
                    {/* Group 1: Journal Info */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                            About Journal
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <LinkItem label="Scope" to="/journal-of-universal-studies" />
                            <LinkItem label="Field chief editors" to="/journal-of-universal-studies/editors" />
                            <LinkItem label="Mission & scope" to="/journal-of-universal-studies/about-us/mission" />
                            <LinkItem label="Facts" to="/publishing/facts" />
                            <LinkItem label="Research Integrity" to="/publishing/research-integrity" />
                            <LinkItem label="Open access statement" to="/publishing/open-access" />
                            <LinkItem label="Copyright statement" to="/publishing/copyright-statement" />
                            <LinkItem label="Quality" to="/publishing/quality" />
                        </ul>
                    </div>

                    {/* Group 2: For Authors */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                            For authors
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <LinkItem label="Why submit?" to="/publishing/why-submit" />
                            <LinkItem label="Article types" to="/publishing/fee-policy" />
                            <LinkItem label="Author guidelines" to="/publishing/author-guidelines" />
                            <LinkItem label="Editor guidelines" to="/publishing/editor-guidelines" />
                            <LinkItem label="Publishing fees" to="/publishing/fee-policy" />
                            <LinkItem label="Submission checklist" to="/publishing/submission-checklist" />
                            <LinkItem label="Contact editorial office" to="/contact" />
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default JournalSidebar;
