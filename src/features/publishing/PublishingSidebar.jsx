import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const PublishingSidebar = () => {
    const linkClasses = ({ isActive }) =>
        isActive
            ? "text-black font-medium block"
            : "hover:text-black hover:underline block";

    return (
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-32">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-black-300 pb-1 inline-block">
                    For authors
                </h3>
                <ul className="space-y-4 text-gray-700">
                    <li>
                        <NavLink to="/publishing/why-submit" className={linkClasses}>
                            Why submit?
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/publishing/fee-policy" className={linkClasses}>
                            Article types and publication fees
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/publishing/author-guidelines" className={linkClasses} end>
                            Author guidelines
                        </NavLink>
                    </li>
                    <li>
                        <Link
                            to="/publishing/author-guidelines#important-stipulation"
                            className="hover:text-black hover:underline block"
                        >
                            Important stipulation
                        </Link>
                    </li>
                    <li>
                        <NavLink to="/publishing/editor-guidelines" className={linkClasses}>
                            Editorial Policies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/publishing/submission-checklist" className={linkClasses}>
                            Submission checklist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={linkClasses}>
                            Contact editorial office
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default PublishingSidebar;
