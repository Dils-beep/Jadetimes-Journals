import React from "react";
import valuesWheel from "../../assets/images/values-wheel.webp";

// --- PLACEHOLDER COMPONENTS (Since code was missing) ---
export const TitleIntro = () => (
  <div className="py-10 text-center">
    <h1 className="text-5xl font-bold mb-4">Our Mission</h1>
    <p className="text-xl text-gray-600">Making science open for a healthy planet.</p>
  </div>
);

export const VideoHero = () => (
  <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center mb-10">
    <span className="text-gray-500 font-semibold">[Video Hero Placeholder]</span>
  </div>
);

// --- REAL COMPONENTS (From your paste) ---
export const Innovations = () => {
  return (
    <section id="innovations" className="mt-20">
      <h2 className="text-[36px] md:text-[44px] leading-tight font-semibold tracking-tight">
        Our innovations
      </h2>
      <div className="mt-6 space-y-8 text-lg md:text-xl text-gray-900 leading-8 md:leading-9">
        <p>
          We place researchers at the center of everything we do and empower them through
          pioneering technology, artificial intelligence, outstanding service and rigorous
          quality standards.
        </p>
        {[
          { t: "Community-driven journals", d: "Leading researchers serve as independent editors." },
          { t: "Research Topics", d: "Collaborative hubs bringing communities together." },
          { t: "Jadetimes Journals for Young Minds", d: "A platform where young people engage with science." },
          { t: "Jadetimes Journals in Science", d: "Our flagship multidisciplinary journal." },
          { t: "AIRA – our AI review assistant", d: "Supporting the review and quality control." }
        ].map((item, i) => (
          <div key={i}>
            <p className="font-semibold">{item.t}</p>
            <p>{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Values = () => {
  return (
    <section id="values" className="mt-20">
      <h2 className="text-[36px] md:text-[44px] leading-tight font-semibold tracking-tight">
        Our values
      </h2>
      <p className="mt-6 text-lg md:text-xl text-gray-900 leading-8 md:leading-9 max-w-4xl">
        Our core values are key to achieving our mission.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-12">
        <img src={valuesWheel} alt="Values" className="w-full max-w-3xl rounded-xl" />
        <ul className="space-y-6 text-lg md:text-xl text-gray-900 leading-8 md:leading-9">
          <li><span className="font-semibold">Researcher-centricity</span></li>
          <li><span className="font-semibold">Collaboration</span></li>
          <li><span className="font-semibold">Innovation</span></li>
          <li><span className="font-semibold">Quality</span></li>
          <li><span className="font-semibold">Speed</span></li>
        </ul>
      </div>
    </section>
  );
};