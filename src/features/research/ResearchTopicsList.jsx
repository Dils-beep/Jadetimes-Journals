import React from "react";
import opticalImg from "../../assets/images/optical.webp";
import acousticsImg from "../../assets/images/acoustics.webp";
import valuesWheel from "../../assets/images/values-wheel.webp";

export default function ResearchTopicsList() {
  const topics = [
    { title: "Optical imaging in next-gen diagnostics", desc: "AI-assisted imaging, non-invasive sensing...", img: opticalImg, field: "Biomedical Engineering" },
    { title: "Acoustic materials & quiet cities", desc: "Urban noise mitigation, smart soundscapes...", img: acousticsImg, field: "Materials / Sustainability" },
    { title: "Sustainability & policy impact", desc: "How policy, climate tech, and economics work together...", img: valuesWheel, field: "Environment & Policy" },
  ];

  return (
    <div className="bg-white text-gray-900">
      <section className="relative bg-gradient-to-br from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-12">
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Research Topics</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">Curated collections that drive citations</h1>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="/research/be-a-topic-editor" className="inline-block rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">Become a Topic Editor</a>
            </div>
          </div>
          <div className="flex-1 mt-12 lg:mt-0 grid grid-cols-2 gap-4">
            <img src={opticalImg} alt="Optical" className="h-20 w-auto object-contain mx-auto" />
            <img src={acousticsImg} alt="Acoustics" className="h-20 w-auto object-contain mx-auto" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Live & high-performing Topics</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {topics.map((t) => (
            <div key={t.title} className="rounded-xl border border-gray-200 shadow-sm bg-white flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 border-b border-gray-200 flex items-center justify-center p-6">
                <img src={t.img} alt={t.title} className="h-20 w-auto object-contain" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">{t.field}</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">{t.title}</h3>
                <p className="text-sm text-gray-600 mt-3 flex-1">{t.desc}</p>
                <a href="/login" className="mt-5 inline-block rounded-full border border-blue-600 text-blue-600 text-sm font-semibold px-4 py-2 text-center hover:bg-blue-600 hover:text-white transition-colors">Submit to this Topic</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}