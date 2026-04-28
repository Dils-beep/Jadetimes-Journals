import React from "react";
import logoBlack from "../../assets/images/JadetimesLogoBlack.webp";
import newsTech from "../../assets/images/news_tech_2025.webp";
import newsMicro from "../../assets/images/news_microbial_map.webp";
import heroImg from "../../assets/images/hero.webp";
import award1 from "../../assets/images/awards-stevie.webp";
import award2 from "../../assets/images/awards-alpsp.webp";


export const BeATopicEditor = () => {
  const bullets = [
    "Propose a focused question the community cares about.",
    "Attract high-quality submissions around that question.",
    "Be visibly credited as Topic Editor on the collection page.",
    "Boost your academic profile without doing production admin.",
  ];

  return (
    <div className="bg-white text-gray-900">
      <section className="border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Become a Topic Editor</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Shape the direction of your field — publicly</h1>
            <p className="mt-4 text-lg text-gray-700">You define the scope. We handle peer review ops, production, publishing, and distribution.</p>
            <ul className="mt-8 space-y-4 text-sm text-gray-700">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">✓</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="/login" className="inline-block rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">Apply / Sign in</a>
              <a href="/research/how-research-topics-work" className="inline-block rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">See workflow</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 flex items-start gap-4">
              <img src={logoBlack} alt="JadeTimes" className="w-12 h-12 object-contain" />
              <div className="text-sm text-gray-700 leading-relaxed">“Topic Editor” is a visible public credit.</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
                <img src={newsTech} alt="tech topic" className="w-full h-24 object-cover object-center" />
                <div className="p-4"><p className="text-sm font-semibold text-gray-900">AI, privacy & policy</p></div>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
                <img src={newsMicro} alt="microbial map topic" className="w-full h-24 object-cover object-center" />
                <div className="p-4"><p className="text-sm font-semibold text-gray-900">Microbial ecosystems</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const HowResearchTopicsWork = () => {
  const steps = [
    { num: "01", title: "You define the Topic", desc: "You choose a focused, high-value question." },
    { num: "02", title: "We open submissions", desc: "Your Topic becomes a live Call for Papers." },
    { num: "03", title: "Standard peer review", desc: "Submissions go through standard checks." },
    { num: "04", title: "Published as a collection", desc: "Accepted articles are grouped and promoted." },
  ];

  return (
    <div className="bg-white text-gray-900">
      <section className="relative border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">How it works</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">From idea → call for papers → citable collection</h1>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <ol className="space-y-10">
          {steps.map((s) => (
            <li key={s.num} className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md">{s.num}</div>
              <div className="mt-4 md:mt-0"><h2 className="text-xl font-semibold text-gray-900">{s.title}</h2><p className="text-gray-600 mt-2 text-base leading-relaxed">{s.desc}</p></div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export const ResearchBenefits = () => {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-gradient-to-br from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Benefits</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Why take part in a Research Topic?</h1>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl">TL;DR: career signal, attention, and momentum.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">For Topic Editors</h2>
          <p className="text-gray-600 mt-3 max-w-xl">You get to steer the conversation — and everyone can see you’re steering it.</p>
          <div className="mt-10"><a href="/research/be-a-topic-editor" className="inline-block rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">Become a Topic Editor</a></div>
        </div>
        <div className="flex flex-col gap-4">
          <img src={award1} alt="Award 1" className="w-full h-40 object-cover object-center rounded-xl border border-gray-200 shadow-sm" />
          <img src={award2} alt="Award 2" className="w-full h-40 object-cover object-center rounded-xl border border-gray-200 shadow-sm" />
        </div>
      </section>
    </div>
  );
};