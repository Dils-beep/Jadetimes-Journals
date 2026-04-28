import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ArticlesSection({
  title = "Articles",
  seeAllTo = "/articles",
  tabs = {},
}) {
  const [active, setActive] = useState(Object.keys(tabs)[0] || "recent");
  const list = tabs[active] || [];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl md:text-[40px] font-semibold">{title}</h2>
        <Link to={seeAllTo} className="text-green-700 font-semibold inline-flex items-center gap-1 hover:underline">
          See all ({list.length}) <span aria-hidden>›</span>
        </Link>
      </div>

      <div className="mt-6 flex gap-10 text-lg">
        {[
          { id: "recent", label: "Most recent" },
          { id: "viewed", label: "Most viewed" },
          { id: "cited", label: "Most cited" },
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
        {list.map((a, i) => (
          <div key={i} className="group flex flex-col h-full">
            <article className="bg-white rounded-2xl ring-1 ring-slate-200 p-6 flex flex-col h-full transition-shadow hover:shadow-md">
              <div className="text-sm font-semibold tracking-wide text-slate-700">{a.tag}</div>
              <div className="text-sm text-slate-500">{a.dateLabel}</div>

              <h3 className="mt-4 text-2xl font-semibold leading-snug transition-colors">
                <Link to={`/articles/${a.id || 1}`} className="group-hover:text-blue-600">
                  {a.title}
                </Link>
              </h3>

              <p className="mt-3 text-slate-600 mb-6 flex-grow">{a.authors}</p>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="mb-2">
                  <div className="font-semibold text-sm text-slate-800">{a.journalTitle}</div>
                  <div className="text-xs text-slate-500">doi {a.doi}</div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-slate-500">{a.views} views</span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}