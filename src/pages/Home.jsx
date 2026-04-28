import React from "react";

// Components
import Hero from "../features/home/Hero";
import HomeContent from "../features/home/HomeContent";
import NewsGrid from "../features/news/NewsGrid";
import NewsletterSignup from "../features/marketing/NewsletterSignup";

// Images for News
import newsMicrobial from "../assets/images/news_microbial_map.webp";
import newsStatins from "../assets/images/news_statins_sepsis.webp";
import newsTech2025 from "../assets/images/news_tech_2025.webp";
import newsAntarctic from "../assets/images/news_antarctic_anchors.webp";
import newsHawk from "../assets/images/news_hawk_traffic.webp";
import newsSustain from "../assets/images/news_sustainability_old_orgs.webp";
import newsFossil from "../assets/images/news_fossil_wombat.webp";

// Data for News Grid
const NEWS_ARTICLES = [
  {
    category: "SCIENCE NEWS",
    date: "Published on 06 Sep 2025",
    title: "Biological ‘moonshot’ accelerates efforts to genetically map life on Earth",
    description: "From the mighty blue whale to the humble baker’s yeast, scientists have barely begun to understand the vast genetic diversity among lifeforms. Of the 1.67m known species of animal, plant, fungi and protists, just 1% have been genetically sequenced.",
    image: newsMicrobial
  },
  {
    category: "SCIENCE NEWS",
    date: "Published on 06 Jun 2025",
    title: "Statins may reduce risk of death by 39% for patients with life-threatening sepsis",
    description: "A study in Jadetimes Journals in Immunology shows supplementary statins could boost survival.",
    image: newsStatins
  },
  {
    category: "Jadetimes Journals NEWS",
    date: "Published on 25 Jun 2025",
    title: "Shaping the future: WEF and Jadetimes Journals reveal Top 10 Emerging Technologies for 2025",
    description: "Spotlighting innovations ready to make real-world impact across climate, healthcare, and digital authenticity.",
    image: newsTech2025
  },
  {
    category: "SCIENCE NEWS",
    date: "Published on 09 Jun 2025",
    title: "Protected Antarctic oceanic life threatened by ships anchoring, first underwater videos show",
    image: newsAntarctic
  },
  {
    category: "SCIENCE NEWS",
    date: "Published on 23 May 2025",
    title: "Street smarts: how a hawk learned to use traffic signals to hunt more successfully",
    image: newsHawk
  },
  {
    category: "RESEARCH TOPICS",
    date: "Published on 08 Jun 2025",
    title: "Survival of the greenest: why world’s oldest organizations are surpassing young upstarts in environmental sustainability",
    image: newsSustain
  },
  {
    category: "SCIENCE NEWS",
    date: "Published on 03 Jun 2025",
    title: "Ancient collagen can help identify a ‘wombat the size of a hippo’ in the fossil record",
    image: newsFossil
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <HomeContent />
      <NewsGrid articles={NEWS_ARTICLES} />
      <NewsletterSignup />
    </>
  );
}