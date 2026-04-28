import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import PublishingSidebar from '../components/layout/PublishingSidebar';

const whoWeAreLinks = [
  { label: 'Mission & values', to: '/journal-of-universal-studies/about-us/mission' },
  { label: 'History', to: '/about-us/history' },
  { label: 'Leadership', to: '/about-us/leadership' },
  { label: 'Awards', to: '/about-us/awards' },
];

export default function JournalInfoLayout({ variant = 'publishing' }) {
  const renderSidebar = () => {
    if (variant === 'about-us') {
      return (
        <section>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2 font-serif">
            Who we are
          </h3>
          <nav className="flex flex-col space-y-0.5">
            {whoWeAreLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-[15px] transition-all border-l-2 ${
                    isActive
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </section>
      );
    }

    return <PublishingSidebar />;
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <main className="flex-grow order-2 lg:order-1 min-w-0">
            <Outlet />
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 order-1 lg:order-2 shrink-0">
            <div className="sticky top-28">
              {renderSidebar()}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

