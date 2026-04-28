import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AudienceTabs from "./AudienceTabs";

// --- CARD IMAGES ---
// --- CARD IMAGES ---
import imgJournals from "../../assets/images/card_journals.webp";
import imgTopics from "../../assets/images/card_topics.webp";

// Standardized images
import imgSubmit from "../../assets/images/submit your research.webp";
import imgAuthor from "../../assets/images/author guidlines.webp";
import imgEditor from "../../assets/images/Editorial Policies.webp";
import imgPeerReview from "../../assets/images/Peer Review .webp";
import imgFees from "../../assets/images/Publishig Fees.webp";

// --- COLLABORATOR IMAGES ---
import imgCollabPressOffice from "../../assets/images/collab_press_office.webp";
import imgCollabInstitutional from "../../assets/images/collab_institutional_partnerships.webp";
import imgCollabPublishing from "../../assets/images/collab_publishing_partnerships.webp";
import imgCollabPolicyLabs from "../../assets/images/collab_policy_labs.webp";
// Reusing imgPublish (which is now likely imgFees or we pick a generic one?)
// The original code used `card_publish` for "How we publish".
// If "How we publish" is not in the list of 5, what image to use?
// The user said "Submit your research, Author guidelines, Editor guidelines, Peer review, Publishing fees" for these 5.
// "How we publish" is likely generic. I will use imgSubmit or imgJournals? Or maybe I shouldn't delete card_publish if it's used for "How we publish"?
// BUT the user said "delete the other images".
// Let's assume "How we publish" can use one of the new ones or we keep card_publish if it's distinct?
// Actually, "How to publish" was in the list in HomeContent.
// I will try to map "How to publish" to "Author Guidelines" (imgAuthor) or similar? 
// Or maybe I should just use `imgSubmit` for "How we publish" as well?
// Let's look at the mapping content. 
// "How to publish" -> "Check our guidelines...". This sounds like Author Guidelines. I will use imgAuthor.
import imgCollabHowWePublish from "../../assets/images/submit your research.webp";

export default function HomeContent({ pillOffsetY = 55, pillGap = 24 }) {
  const CHIP_BG = "#545555";
  const TRACK_BORDER = "#D1D5DB";
  const SECTION_GAP = "clamp(48px, 5vw, 80px)";

  // default tab
  const [activeTab, setActiveTab] = useState("Editors and reviewers");

  // cross-fade state
  const [visibleTab, setVisibleTab] = useState(activeTab);
  const [phase, setPhase] = useState("in"); // 'out' | 'in'
  const FADE_MS = 180;

  const handleTabChange = (tab) => {
    if (tab === visibleTab) return;
    setActiveTab(tab);
    setPhase("out");
    window.clearTimeout(handleTabChange._t);
    handleTabChange._t = window.setTimeout(() => {
      setVisibleTab(tab);
      setPhase("in");
    }, FADE_MS);
  };
  useEffect(() => () => window.clearTimeout(handleTabChange._t), []);

  const tabs = ["For authors", "Editors and reviewers", "Collaborators"];

  // Added 'to' paths matching your App.jsx routes
  const cardsByTab = {
    "For authors": [
      { title: "Find a journal", to: "/journals", description: "We have a home for your research. Our community journals and sections cover more than 1,700 academic disciplines.", image: imgJournals },
      { title: "Find a topic", to: "/research/topics", description: "Research Topics bring together expert researchers to work on emerging themes. Find your community or start a new one.", image: imgTopics },
      { title: "Submit your research", to: "/publishing/why-submit", description: "Ready to publish? Start your submission today and get more impact for your research by publishing with us.", image: imgSubmit },
      { title: "How to publish", to: "/publishing/how-we-publish", description: "Check our guidelines and policies for everything you need, from choosing a journal to submitting your manuscript for review.", image: imgAuthor },
      { title: "Peer review", to: "/publishing/peer-review", description: "Our efficient peer review means you’ll get a decision on your manuscript fast – our average acceptance time is 96 days.", image: imgPeerReview },
    ],
    "Editors and reviewers": [
      { title: "Peer review", to: "/publishing/peer-review", description: "Our efficient peer review means you’ll get a decision on your manuscript fast – our average acceptance time is 96 days.", image: imgPeerReview },
      { title: "How we publish", to: "/publishing/how-we-publish", description: "All Jadetimes Journals journals are community-run and fully open access, so every research article we publish is immediately and permanently free to read.", image: imgAuthor },
      { title: "Editor guidelines", to: "/publishing/editor-guidelines", description: "Reviewing a manuscript? See our guidelines for everything you need to know about our peer review process.", image: imgEditor },
      { title: "Become an editor", to: "/research/be-a-topic-editor", description: "Apply to join an editorial board and collaborate with an international team of carefully selected independent researchers.", image: imgJournals },
      { title: "My assignments", to: "/my-assignments", description: "Find and track your editorial assignments with ‘My Jadetimes Journals’ so you can save time and focus on your research.", image: imgTopics },
    ],
    Collaborators: [
      { title: "Press office", to: "/contact", description: "Visit our press office for key media contact information, as well as Jadetimes Journals’ media kit, including our embargo policy, logos, key facts, leadership bios, and imagery.", image: imgCollabPressOffice },
      { title: "Institutional partnerships", to: "/services/institutional-partnerships", description: "Join more than 670 institutions around the world already benefiting from an institutional membership with Jadetimes Journals, including CERN, Max Planck Society, and the University of Oxford.", image: imgCollabInstitutional },
      { title: "Publishing partnerships", to: "/services/collaborators", description: "Partner with Jadetimes Journals and make your society’s transition to open access a reality with our custom-built platform and publishing expertise.", image: imgCollabPublishing },
      { title: "Policy Labs", to: "#", description: "Connecting experts from business, science, and policy to strengthen the dialogue between scientific research and informed policymaking.", image: imgCollabPolicyLabs },
      { title: "How we publish", to: "/publishing/how-we-publish", description: "All Jadetimes Journals journals are community-run and fully open access, so every research article we publish is immediately and permanently free to read.", image: imgCollabHowWePublish },
    ],
  };

  const infoCards = cardsByTab[visibleTab] ?? [];

  return (
    <main className="bg-gray-50">
      {/* ===== Section below hero ===== */}
      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-16 -mt-12 md:-mt-20">
        <AudienceTabs
          tabs={tabs}
          value={activeTab}
          onChange={handleTabChange}
          offsetY={pillOffsetY}
          gap={pillGap}
        />

        {/* Info cards (fluid, capped gap below) */}
        <div
          className={[
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6",
            "transition-opacity transform-gpu will-change-[opacity,transform]",
            phase === "out" ? "opacity-0 translate-y-2 duration-200 ease-fade-out" : "opacity-100 translate-y-0 duration-200 ease-fade-in",
          ].join(" ")}
          style={{ marginBottom: SECTION_GAP }}
        >
          {infoCards.map((card, idx) => (
            <Link
              key={`${card.title}-${idx}`}
              to={card.to}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}