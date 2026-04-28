import React from "react";
import PlaceholderImg from "../../assets/images/JadetimesLogoBlack.webp";

const BioCard = ({ img, name, role, bio }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 md:flex md:items-start mt-10 border border-gray-100">
    <div className="flex flex-col items-center md:items-start md:w-1/4 mb-6 md:mb-0 shrink-0">
      <img src={img || PlaceholderImg} alt={name} className="w-28 h-28 rounded-full object-cover mb-4" />
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-500 text-sm whitespace-pre-line">{role}</p>
    </div>
    <div className="md:w-3/4 md:pl-8 text-gray-700 leading-relaxed">
      <p>{bio}</p>
    </div>
  </div>
);

export const LeadershipList = () => {
  return (
    <div className="mb-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Our leadership</h1>
      <p className="text-gray-600 text-lg mb-10">The team running operations day to day.</p>

      <BioCard
        name="Kamila Markram, PhD"
        role="CEO and co-founder"
        bio="Kamila co-founded Jadetimes Journals with the vision to make research openly available. She obtained a MSc in Psychology and an award-winning PhD in Neuroscience at the EPFL."
      />
      <BioCard
        name="Julian Oei"
        role="President & Chief Business Officer"
        bio="Julian joined in 2023. He is responsible for the overall strategy. Previously he spent 12 years with Holtzbrinck Publishing Group."
      />
      <BioCard
        name="Giovanni Lippi"
        role="Chief Financial Officer"
        bio="Giovanni oversees financial operations. He joined in 2009 and has held various business support roles."
      />
    </div>
  );
};

export const BoardOfDirectors = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Board of directors</h1>
      <p className="text-gray-600 text-lg mb-10">Responsible for financial and governance oversight.</p>

      <BioCard
        name="Henry Markram, PhD"
        role="Co-founder, Board Chairperson"
        bio="Henry co-founded Jadetimes Journals. He is a professor of neuroscience at the EPFL and founder of the Blue Brain Project."
      />
      <BioCard
        name="Stefan von Holtzbrinck"
        role="Board Member"
        bio="Stefan is the CEO of the Holtzbrinck Publishing Group, parent of Springer Nature and Digital Science."
      />
    </div>
  );
};