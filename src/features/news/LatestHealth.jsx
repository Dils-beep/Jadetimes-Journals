import React from "react";
import { Link } from "react-router-dom";
import imgStatins from "../../assets/images/news_statins_sepsis.webp";
import imgMicrobial from "../../assets/images/news_microbial_map.webp";

const healthCardData = [
  { category: "HEALTH", date: "30 Oct 2025", title: "Scientists on ‘urgent’ quest...", image: imgMicrobial },
  { category: "HEALTH", date: "23 Oct 2025", title: "Drug which stops tumors...", image: imgStatins },
];

export default function LatestHealth() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-6 px-4">
        <h2 className="text-3xl font-semibold text-gray-800">Health</h2>
        <Link to="/science-news" className="text-blue-600 font-semibold flex items-center hover:underline">View more &gt;</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthCardData.map((card, idx) => (
          <Link key={idx} to="/science-news" className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col group block">
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="p-4 py-6 flex-grow flex flex-col min-h-[12rem]">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{card.category}</p>
              <p className="text-xs text-gray-500 mt-1">{card.date}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-800 group-hover:text-blue-600 transition-colors">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}