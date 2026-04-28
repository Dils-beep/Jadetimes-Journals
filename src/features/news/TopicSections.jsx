import React from "react";
import { Link } from "react-router-dom";

const SectionPlaceholder = ({ title, color = "bg-white" }) => (
  <section className={`py-12 px-6 max-w-7xl mx-auto ${color}`}>
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <Link to="/science-news" className="text-blue-600 font-semibold hover:underline">View more &gt;</Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Link key={i} to="/science-news" className="bg-white border border-gray-200 rounded-xl p-4 h-64 flex items-center justify-center shadow-sm group hover:shadow-md transition">
          <span className="text-gray-400 font-medium group-hover:text-blue-600 transition-colors">{title} Article {i}</span>
        </Link>
      ))}
    </div>
  </section>
);

export const NeuroscienceSection = () => <SectionPlaceholder title="Neuroscience" />;
export const EnvironmentSection = () => <SectionPlaceholder title="Environment" color="bg-green-50" />;
export const PsychologySection = () => <SectionPlaceholder title="Psychology" />;
export const SpaceAstronomySection = () => <SectionPlaceholder title="Space & Astronomy" color="bg-slate-50" />;