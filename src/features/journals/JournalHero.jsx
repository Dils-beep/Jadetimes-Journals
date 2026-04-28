import React from "react";
import { ArrowRightIcon } from "../../components/ui/Icons";
import imgBanner from "../../assets/images/Universal_Studies_banner.webp";

export default function JournalHero({ title, subtitle, issn, image, citations = 0, onSubmit }) {
  return (
    <section
      className="relative w-full h-[320px] md:h-[420px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${imgBanner})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full px-6 lg:px-10 h-full flex items-start pt-16 justify-start gap-8 z-10">
        <div className="flex flex-col max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">{title}</h1>
          {subtitle && <p className="text-white text-lg md:text-xl mt-3 drop-shadow-md font-medium text-slate-100">{subtitle}</p>}
          {issn && <p className="text-white text-base md:text-lg mt-1 drop-shadow-md font-medium text-slate-200">{issn}</p>}
        </div>
        {image && <img
          src={image}
          alt="Journal Cover"
          className="h-[70%] md:h-[90%] w-auto object-contain shadow-2xl rounded flex-shrink-0"
        />}
      </div>

      <div className="absolute bottom-0 right-0 flex z-10">
        <div className="hidden sm:flex items-center gap-1 px-8 py-5 text-white bg-slate-900/80 backdrop-blur-sm border-t border-l border-white/10">
          <div className="text-3xl font-bold leading-none">{citations}</div>
          <div className="ml-3 leading-tight">
            <div className="uppercase text-[10px] tracking-widest font-semibold opacity-90">Citations</div>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="px-8 py-5 bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2 transition-colors"
        >
          Submit <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
}