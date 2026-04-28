import React from "react";
import { Link } from "react-router-dom";

export const GuidelineCards = ({ cards }) => (
  <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {cards.map((c, i) => (
      <Link key={i} to={c.to || "#"} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
        <div className="h-32 w-full bg-gray-100 relative">
          {c.img && <img src={c.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h4 className="font-semibold text-gray-900 mb-3 text-base group-hover:text-blue-600 transition-colors">{c.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
        </div>
      </Link>
    ))}
  </section>
);

export const ResearchIntegrity = ({ title, body }) => (
  <section className="bg-slate-50 py-12 px-6 text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-700">{body}</p>
    </div>
  </section>
);

export const Volumes = ({ volumes = [] }) => {
  // Ensure we have at least these 3 for the demo if not passed
  const displayVolumes = volumes.length > 0 ? volumes : [
    { label: "Volume 2 - 2025" },
    { label: "Volume 1 - 2025" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-200">
      <div className="flex items-baseline gap-4 mb-6">
        <h3 className="text-3xl font-normal text-gray-900">Volumes</h3>
        <a href="#" className="text-sm font-semibold text-green-700 hover:underline flex items-center gap-1">
          See all <span className="text-lg leading-none">&rarr;</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {displayVolumes.map((v, i) => {
          const Wrapper = v.to ? Link : "div";
          const wrapperProps = v.to ? { to: v.to } : {};

          return (
            <Wrapper key={i} {...wrapperProps} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer block">
              <h4 className="text-lg text-gray-800 mb-8">{v.label}</h4>
              {/* Simple icon representation */}
              <div className="text-green-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
};