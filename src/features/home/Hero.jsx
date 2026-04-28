import React from "react";
import heroImg from "../../assets/images/hero.webp";

/**
 * Hero component for the homepage.
 * Displays the main hero image, headline, and stats bar.
 */
export default function Hero({
  heroHeight = "60vh",
  minHeroHeight = "500px",
  statsWidth = "760px",
  statsHeight = "85px",
  statsRight = "-85px",
  statsLeft,
  statsBottom = "0px",
  objectPosition = "100% 92%",
}) {
  return (
    <section
      className="relative text-white overflow-hidden font-sans"
      style={{
        height: heroHeight,
        minHeight: minHeroHeight,
      }}
    >
      {/* HERO IMAGE */}
      <img
        src={heroImg}
        alt="Ice cave"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
      />

      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/35" />

      {/* Headline + subhead */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <h1 className="font-light leading-tight max-w-4xl text-[44px] md:text-[64px]">
          Where scientists empower society
        </h1>
        <p className="mt-4 max-w-2xl text-white/90 text-[18px] md:text-[20px] font-normal">
          Creating solutions for healthy lives on a healthy planet.
        </p>
      </div>

      {/* STATS BAR — bottom-right with full control */}
      <div
        className="absolute z-10"
        style={{
          right: statsRight,
          left: statsLeft,
          bottom: statsBottom,
          width: statsWidth,
          height: statsHeight,
        }}
      >
        <div className="w-full h-full bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-white/10 overflow-hidden">
          <div className="grid grid-cols-3 h-full divide-x divide-white/10">
            <Stat value="3 million" label="researchers" />
            <Stat value="4 billion" label="article views and downloads" />
            <Stat value="12 million" label="citations" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="px-8 py-4 flex flex-col justify-center">
      <p className="text-[18px] md:text-[20px] font-semibold">{value}</p>
      <p className="mt-1 text-[13px] md:text-[14px] font-normal text-white/90">
        {label}
      </p>
    </div>
  );
}