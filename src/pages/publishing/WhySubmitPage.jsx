import React from 'react';
import submitImg from '../../assets/images/submit your research.webp';

const reasons = [
  {
    title: "Fair and Transparent Peer Review",
    subtitle: "All manuscripts are treated objectively and with without editorial bias.",
    points: [
      "Initial editorial screening for scope alignment with the journal structure and author guidelines.",
      "Manuscripts passing initial screening are subjected to a double-blind peer review process.",
      "Reviewers provide high-quality, theoretical contributions, methodological rigor, and critical commentary.",
      "Constructive reviewer feedback assists authors in strengthening their research.",
      "Final editorial decisions are taken independently by the editors based solely on scholarly merit."
    ]
  },
  {
    title: "Efficient Review and Publication",
    subtitle: "JJUS aims to balance timely publication with high academic standards.",
    points: [
      "Editorial decisions are typically communicated within 6–8 weeks of submission.",
      "Research manuscripts are processed and initially upon submission.",
      "Accepted articles are indexed and publication without unnecessary delay.",
      "The process ensures high authors distance results and reach as a result of timeliness and maintaining quality."
    ]
  },
  {
    title: "Research Visibility and Academic Impact",
    subtitle: "JJUS is committed to maximizing research visibility and reach of published research.",
    points: [
      "All articles are published online via open access.",
      "Research is discoverable through major academic search engines.",
      "Open access model supports thematic academic discussion and knowledge exchange."
    ]
  },
  {
    title: "Indexing and Abstracting",
    subtitle: "Jadetimes Journal of Universal Studies is actively engaged in the process of indexing and abstracting.",
    points: [
      "The journal is currently indexed in Google Scholar.",
      "Scopus indexing is under active preparation and evaluation.",
      "Add additional indexing services to bring our journal in accordance to international publishing standards.",
      "Indexing and abstracting are basic indicators frequently used in checking compliance in quality and ethical requirements."
    ]
  },
  {
    title: "Open Access Policy",
    subtitle: "JJUS follows a paper open-access publishing model.",
    points: [
      "All accepted articles are free provide to readers worldwide.",
      "Manuscripts are rendered accessible on website.",
      "Research supports and provide access to academics, practitioners and policymakers.",
      "This approach promotes higher research reach for sociological knowledge."
    ]
  },
  {
    title: "Copyright and Licensing",
    subtitle: "Authors' publishing and institutional ownership of their work.",
    points: [
      "Articles are published under the Creative Commons Attribution (CC BY 4.0) license.",
      "Authors retain ownership and distribution of their research.",
      "Proper citation of the original publication is required."
    ]
  }
];

const steps = [
  { n: 1, title: "Submission", desc: "Manuscript is submitted via our online dashboard." },
  { n: 2, title: "Initial Review", desc: "Editorial Board performs an initial screening." },
  { n: 3, title: "Technical Check", desc: "Ensuring manuscript meets formatting and ethical standards." },
  { n: 4, title: "Peer Review", desc: "Double-blind peer review by at least two experts." },
  { n: 5, title: "Editorial Decision", desc: "Acceptance, revision, or rejection based on review." },
  { n: 6, title: "Revision (if required)", desc: "Authors revise manuscripts based on reviewer comments." },
  { n: 7, title: "Production", desc: "Copyediting, typesetting, and final proof preparation." },
  { n: 8, title: "Publication", desc: "Article is published online with open access." },
  { n: 9, title: "Post-Publication Visibility", desc: "Article is indexed and cited for citation, research discussion and referencing." }
];

export default function WhySubmitPage() {
  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <img 
        src={submitImg} 
        alt="Submit Your Research" 
        className="w-full h-auto mb-10 rounded-lg shadow-sm"
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
        Why Submit to Jadetimes Journal of Universal Studies?
      </h1>

      <div className="space-y-8 text-gray-600 leading-relaxed max-w-none">
        <p>
          Jadetimes Journal of Universal Studies (JJUS) was established to provide a rigorous, ethical, and transparent scholarly publishing platform dedicated to advancing research in the field of Sociology. The journal aims to address key challenges faced by authors in traditional publishing models, including prolonged review timelines, lack of transparency, and limited access to published research.
        </p>
        <p>
          JJUS is committed to academic integrity, fairness in peer review, and global accessibility, ensuring that high-quality sociological research reaches the international academic community.
        </p>

        {reasons.map((reason, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 font-serif">{reason.title}</h2>
            <p className="text-gray-600 font-medium italic text-[15px]">{reason.subtitle}</p>
            <ul className="space-y-2">
              {reason.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start text-[14.5px]">
                  <span className="text-blue-500 mr-2 mt-1.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Step by Step Grid */}
      <div className="mt-20">
        <div className="bg-slate-50 rounded-2xl p-4 text-center mb-10 border border-slate-100">
          <h2 className="text-lg font-bold text-gray-900 font-serif">Publishing Process – Step by Step</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
          {steps.map((step) => (
            <div key={step.n} className="flex gap-4">
              <span className="text-4xl font-black text-gray-100 shrink-0 leading-none">{step.n}</span>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}