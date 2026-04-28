import React from 'react';
import { NavLink } from 'react-router-dom';

const aboutJournalLinks = [
  { label: 'Scope', to: '/journal-of-universal-studies/scope' },
  { label: 'Field chief editors', to: '/journal-of-universal-studies/editors' },
  { label: 'Mission & scope', to: '/journal-of-universal-studies/about-us/mission' },
  { label: 'Facts', to: '/publishing/facts' },
];

const forAuthorsLinks = [
  { label: 'Why submit?', to: '/publishing/why-submit' },
  { label: 'Article types', to: '/publishing/artical-types' },
  { label: 'Author guidelines', to: '/publishing/author-guidelines' },
  { label: 'Editor guidelines', to: '/publishing/editor-guidelines' },
  { label: 'Publishing fees', to: '/publishing/fee-policy' },
  { label: 'Submission checklist', to: '/publishing/submission-checklist' },
  { label: 'Contact editorial office', to: '/contact' },
];

export default function PublishingSidebar() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-4 border-b border-gray-100 pb-2 font-serif">
          ABOUT JOURNAL
        </h3>
        <nav className="flex flex-col space-y-0.5">
          {aboutJournalLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center px-3 py-1.5 text-[13px] transition-all border-l-2 ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </section>

      <section>
        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-4 border-b border-gray-100 pb-2 font-serif">
          FOR AUTHORS
        </h3>
        <nav className="flex flex-col space-y-0.5">
          {forAuthorsLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center px-3 py-1.5 text-[13px] transition-all border-l-2 ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </section>
    </div>
  );
}
