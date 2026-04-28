import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TopicsSection({
  title = "Research Topics",
  seeAllTo = "/research/topics",
  tabs = {},
}) {
  const [active, setActive] = useState(Object.keys(tabs)[0] || "recent");
  const list = tabs[active] || [];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl md:text-[40px] font-semibold">{title}</h2>
        <Link to={seeAllTo} className="text-green-700 font-semibold inline-flex items-center gap-1 hover:underline">
          See all <span aria-hidden>›</span>
        </Link>
      </div>

      <div className="mt-6 flex gap-10 text-lg">
        {[
          { id: "recent", label: "Most recent" },
          { id: "viewed", label: "Most viewed" },
          { id: "articles", label: "Most articles" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`pb-2 -mb-px border-b-2 ${active === t.id ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {list.map((t, i) => (
          <Link key={i} to="/research/topics" className="block group">
            <article className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden h-full transition-shadow hover:shadow-md">
              <img src={t.img} alt="" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6">
                <div className="text-xs font-semibold tracking-wide text-slate-700">{t.status}</div>
                <h3 className="mt-3 text-2xl font-semibold leading-snug group-hover:text-blue-600 transition-colors">{t.title}</h3>
                <p className="mt-2 text-slate-600">{t.lead}</p>
                <div className="mt-8 text-sm text-slate-500 flex gap-6">
                  {t.views && <span>{t.views} views</span>}
                  {t.articles && <span>{t.articles} articles</span>}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}