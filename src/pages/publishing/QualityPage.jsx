import React from 'react';

export default function QualityPage() {
  const sections = [
    {
      title: "Peer Review Process",
      content: "Jadetimes Journal of Universal Studies (JJUS) ensures the highest standards of scientific quality through a rigorous double-blind peer review process. All submitted manuscripts undergo an initial editorial assessment to determine their suitability for the journal's scope and quality requirements. Submissions that pass this stage are then evaluated by independent, expert reviewers in the relevant field."
    },
    {
      title: "Editorial Standards",
      content: "Our journals are led by world-class researchers who are experts in their fields. They provide the strategic vision and editorial oversight required to maintain the highest standards. The editorial team works closely with authors and reviewers to ensure that every published article contributes meaningfully to sociological discourse."
    },
    {
      title: "Publication Ethics",
      content: "JJUS strictly adheres to international ethical standards, including COPE guidelines. The journal employs plagiarism detection tools (Turnitin) to ensure the originality of every manuscript. We maintain a zero-tolerance policy toward research misconduct, including data fabrication, falsification, and duplicate publication."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Quality</h1>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
