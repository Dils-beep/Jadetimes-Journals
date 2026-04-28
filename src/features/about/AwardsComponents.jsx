import React from "react";
import fallbackImg from "../../assets/images/awards-vaud.webp";

// --- REUSABLE TITLE COMPONENT ---
export const AwardsTitle = () => (
  <section className="py-14 md:py-20">
    <h1 className="text-[40px] md:text-[56px] leading-tight font-semibold tracking-tight">
      Awards
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-800 max-w-4xl">
      Jadetimes Journals’ success as an open science platform has been recognized with numerous awards.
    </p>
  </section>
);

// --- VIDEO HERO COMPONENT ---
export const AwardsVideoHero = () => (
  <section>
    <h2 className="text-[34px] md:text-[44px] leading-tight font-semibold tracking-tight">
      2021: Vaud International Business Awards
    </h2>

    <div className="mt-8 relative w-full overflow-hidden rounded-xl bg-black aspect-video">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/Omuv_gtIV3I?start=1"
        title="Vaud International Business Awards"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {/* Fallback image if iframe fails or loads slowly */}
      <img src={fallbackImg} alt="" className="hidden w-full h-full object-cover" />
    </div>
  </section>
);

// --- REUSABLE AWARD BLOCK ---
export const AwardBlock = ({ title, img, children, readMoreHref = "#" }) => (
  <section className="mt-24">
    <h2 className="text-[34px] md:text-[44px] leading-tight font-semibold tracking-tight">
      {title}
    </h2>

    {img && (
      <div className="mt-8">
        <img src={img} alt={title} className="w-full rounded-xl object-cover" />
      </div>
    )}

    <div className="mt-6 text-lg md:text-xl text-gray-900 leading-8 md:leading-9 space-y-4">
      {children}
    </div>

    <a href={readMoreHref} className="inline-block mt-4 text-blue-700 font-semibold hover:underline">
      Read more
    </a>
  </section>
);