import React from 'react';

export const HeroImage = ({ src, alt }) => (
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-sm">
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-auto object-cover"
    />
  </div>
);

export const ContentSection = ({ children, className = "" }) => (
  <div className={`space-y-6 ${className}`}>
    {children}
  </div>
);

export const InfoBox = ({ title, children, className = "" }) => (
  <div className={`bg-gray-50/50 border border-gray-100 border-l-4 border-l-blue-600 rounded-lg p-6 mb-6 ${className}`}>
    <h3 className="text-lg font-bold text-gray-900 mb-3 font-serif">{title}</h3>
    <div className="text-gray-700 text-[14.5px] leading-relaxed">
      {children}
    </div>
  </div>
);

export const NumberedSection = ({ number, title, children }) => (
  <section className="relative pl-16 mb-12">
    <div className="absolute left-0 top-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
      {number}
    </div>
    <h2 className="text-xl font-black text-gray-900 mb-4 font-serif">{title}</h2>
    <div className="space-y-4 text-gray-700 text-[14.5px] leading-relaxed">
      {children}
    </div>
  </section>
);

export const PartnershipsCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6 mt-16 max-w-2xl">
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">Heard about the partnerships program?</h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        If your institution is partnered with us you can benefit from full or partial support for article processing charges (APCs) on manuscripts you submit.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-bold">
        <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group">
          Learn more <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
        <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group">
          Discover benefits for researchers <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </div>
    </div>
    <div className="pt-6 border-t border-gray-50 text-[13px] text-gray-400 leading-relaxed space-y-1">
      <p>We also provide a support program for authors and institutions with insufficient funding.</p>
      <p>Authors in countries classified by the World Bank as low or lower-middle income countries may be eligible for discounts to their APC.</p>
    </div>
  </div>
);
