import React from "react";

export const HistoryIntro = () => (
  <div className="mb-12">
    <h1 className="text-4xl font-bold mb-6">History</h1>
    <h2 className="text-2xl font-semibold mb-4">Where it all started</h2>
    <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
      <p>
        Jadetimes Journals was founded in 2007 by Henry Markram and Kamila Markram,
        two neuroscientists from the Swiss Federal Institute of Technology (EPFL).
      </p>
      <p>
        Starting in neuroscience, Jadetimes Journals now spans hundreds of academic disciplines
        and is one of the most cited research publishers in the world.
      </p>
    </div>
  </div>
);

const Dot = () => <div className="-ml-11 h-4 w-4 bg-gray-800 rounded-full mb-4" />;

const Section = ({ year, children }) => (
  <div className="flex mt-8">
    <div className="w-24 shrink-0">
      <span className="font-bold text-2xl text-gray-800">{year}</span>
    </div>
    <div className="flex-1 border-l-2 border-gray-300 pl-8 space-y-8">
      {children}
    </div>
  </div>
);

export const Timeline = () => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Our timeline</h2>
      <Section year="2024">
        <Dot />
        <div>
          <h3 className="font-bold text-xl mb-4">Milestones</h3>
          <p>561,000 published articles</p>
          <p>3.7 billion article views</p>
        </div>
      </Section>
      <Section year="2023">
        <Dot />
        <div>
          <h3 className="font-bold text-xl mb-4">Milestones</h3>
          <p>489,000 published articles</p>
          <p>2.8 billion views</p>
        </div>
      </Section>
      <Section year="2007">
        <Dot />
        <div>
          <h3 className="font-bold text-xl mb-4">Founding</h3>
          <p>Jadetimes Journals launches as a not-for-profit foundation.</p>
        </div>
      </Section>
    </div>
  );
};