import React from "react";
import { Link } from "react-router-dom";

export default function JournalCard({ j }) {
  const to = j.id === "journal-of-universal-studies" ? "/journal-of-universal-studies" : `/journals/${j.id}`;
  return (
    <Link to={to} className="block group">
      <article className="flex flex-row items-start gap-4 sm:gap-5 py-6 border-b border-slate-200 rounded-lg transition -mx-2 px-2 group-hover:bg-slate-50">
        <img
          src={j.image}
          alt={`${j.title} thumbnail`}
          className="w-[120px] sm:w-[140px] flex-none h-auto rounded-lg shadow-sm object-cover self-start"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold leading-6 group-hover:underline">
            {j.title}
          </h3>
          <p className="text-slate-600 mt-2">{j.blurb}</p>
          <p className="mt-4 text-sm">
            <span className="font-semibold text-slate-800">Field chief editor</span>{" "}
            <span className="font-semibold text-slate-900">{j.fieldEditor}</span>
            <span className="text-slate-500">, {j.org}</span>
          </p>
          <div className="mt-4 flex items-center text-sm text-slate-600">
            <span>
              <span className="font-medium text-slate-900">{j.sections}</span> sections
            </span>
            <span aria-hidden className="mx-3 inline-block h-4 w-px bg-slate-300 align-middle" />
            <span>
              <span className="font-medium text-slate-900">{j.articles}</span> articles
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}