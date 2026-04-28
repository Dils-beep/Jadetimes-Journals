import React from "react";
import { Link } from "react-router-dom";
import imgAntarctic from "../../assets/images/news_antarctic_anchors.webp";
import imgFossil from "../../assets/images/news_fossil_wombat.webp";
import imgHawk from "../../assets/images/news_hawk_traffic.webp";

// Using placeholder for now to avoid crash
const FeaturedImg = imgAntarctic;

const postData = [
  { title: "Orcas seen killing young great white sharks...", image: imgHawk },
  { title: "Scientists on ‘urgent’ quest to explain consciousness...", image: imgFossil },
];

export default function FeaturedNews() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Featured Big Card */}
      <Link to="/science-news" className="lg:col-span-9 bg-white shadow-xl rounded-xl overflow-hidden h-80 group block">
        <div className="grid grid-cols-3 md:grid-cols-2">
          <div className="grid grid-cols-3 grid-rows-2 h-80">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <img key={i} src={FeaturedImg} alt="featured" className="w-full h-full object-cover" />
            ))}
          </div>
          <div className="p-6 max-w-3xl">
            <p className="text-xs font-semibold text-black-600 uppercase tracking-wide">FEATURED NEWS</p>
            <p className="text-xs text-gray-500 mt-1">Published on 29 Oct 2025</p>
            <h2 className="mt-3 text-xl md:text-xl font-semibold leading-snug text-gray-800 group-hover:text-blue-600 transition-colors">
              Underwater robot ‘Lassie’ discovers remarkable icefish nests
            </h2>
            <p className="mt-3 text-gray-600 text-md leading-relaxed">
              In a remote part of Antarctica's Western Weddell Sea...
            </p>
          </div>
        </div>
      </Link>
      {/* Sidebar */}
      <aside className="lg:col-span-3 space-y-5">
        <h3 className="font-semibold text-lg border-b pb-1 w-max">Latest posts</h3>
        {postData.map((post, idx) => (
          <Link key={idx} to="/science-news" className="flex gap-4 items-start group">
            <img src={post.image} alt={post.title} className="w-20 h-20 object-cover flex-shrink-0" />
            <p className="text-md text-gray-700 leading-snug cursor-pointer group-hover:text-blue-600 transition-colors">{post.title}</p>
          </Link>
        ))}
        <Link to="/science-news" className="flex items-center text-blue-600 font-semibold text-sm mt-5 hover:underline">View all news &gt;</Link>
      </aside>
    </section>
  );
}