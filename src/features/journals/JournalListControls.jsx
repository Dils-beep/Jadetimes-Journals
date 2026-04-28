import React from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "../../components/ui/Icons";

export const SearchBar = ({ value, onChange }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <SearchIcon />
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
      placeholder="Search journals..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const CategoryTabs = ({ active, setActive }) => {
  const cats = ["All", "Health", "Engineering", "Science", "Humanities"];
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${active === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export const SortSelect = ({ sort, setSort }) => (
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none"
  >
    <option value="letter">A-Z</option>
    <option value="impact-desc">Impact Factor (High-Low)</option>
    <option value="articles-desc">Most Articles</option>
  </select>
);

export const RightRail = ({ items }) => (
  <aside className="hidden lg:block space-y-6">
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
      <h3 className="font-semibold text-lg mb-4">Most Viewed</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            <Link to={`/articles/${item.id}`} className="font-medium text-slate-900 hover:text-blue-600">
              {item.title}
            </Link>
            <div className="text-slate-500 mt-1">{item.views} views</div>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);