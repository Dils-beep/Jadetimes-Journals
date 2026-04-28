import coverImg from '../assets/images/Universal_Studie_cover.webp';
import bannerImg from '../assets/images/Universal_Studies_banner.webp';
import submitImg from '../assets/images/submit your research.webp';
import authorImg from '../assets/images/author guidlines.webp';
import editorImg from '../assets/images/Editorial Policies.webp';
import peerImg from '../assets/images/Peer Review .webp';
import feesImg from '../assets/images/Publishig Fees.webp';

export const UNIVERSAL_STUDIES_DATA = {
  title: "Jadetimes Journal of Universal Studies",
  metadata: {
    volume: "Volume 2",
    issue: "Issue 1",
    date: "January-June 2025",
    issn: "3066-9421",
    citations: "1240",
    views: "52k"
  },
  banner: bannerImg,
  cover: coverImg,
  about: {
    description: "Jadetimes Journal of Universal Studies (JJUS) is an international, peer-reviewed academic journal committed to advancing rigorous scholarship in the field of sociology. The journal serves as a global forum for researchers, scholars, and practitioners to disseminate original research that contributes to a deeper understanding of social structures, institutions, relationships, inequalities, and social change across diverse societal contexts. JJUS publishes high-quality empirical, theoretical, and methodological studies grounded in sociological theory and research methods, encouraging contributions that engage with contemporary social issues.",
    areasCovered: [
      "Sociological theory and classical sociological thought",
      "Social stratification, inequality, and social mobility",
      "Gender, family and life-course",
      "Youth, childhood, aging, and life-course studies",
      "Urban and rural sociology",
      "Sociology of education",
      "Sociology of work, labor, and organizations",
      "Political sociology and social movements",
      "Culture, identity, and social change",
      "Media, digital society and online social interaction"
    ],
    supportingText: "Jadetimes Journal of Universal Studies aims to foster critical sociological inquiry, promote international scholarly dialogue, and support evidence-based social knowledge that informs academic research, policy discussions, and societal development."
  },
  researchIntegrity: [
    {
      title: "Submit your research",
      description: "Start your submission and get more impact for your research through Jadetimes Journals.",
      image: submitImg,
      link: "/submit-research/journal-of-universal-studies"
    },
    {
      title: "Author guidelines",
      description: "Ready to publish? Find our author guidelines for everything you need to know about submission.",
      image: authorImg,
      link: "/publishing/author-guidelines"
    },
    {
      title: "Editor guidelines",
      description: "Interested in being an Editor? Find out what we look for when considering new members.",
      image: editorImg,
      link: "/publishing/editor-guidelines"
    },
    {
      title: "Peer review",
      description: "Our double-blind peer-review is designed to ensure a fair and timely process.",
      image: peerImg,
      link: "/publishing/peer-review"
    },
    {
      title: "Publishing fees",
      description: "Prices are transparent and reflect the work we do to ensure your research stays open access.",
      image: feesImg,
      link: "/publishing/fee-policy"
    }
  ],
  scope: {
    title: "Scope of the Journal",
    description: [
      "Jadetimes Journal of Universal Studies (JJUS) is dedicated to the advancement of scholarly research from broadly within the discipline of sociology. The journal provides an international platform for publishing high-quality, peer-reviewed research that examines social structures, institutions, relationships, inequalities, and power dynamics across diverse societies.",
      "The journal welcomes original empirical, theoretical, and methodological studies that are clearly grounded in sociological theory and sociological research methods. Studies may address social phenomena at local, national, regional, or global levels, provided that the data analysis and research are sociologically relevant."
    ],
    methodologicalApproaches: [
      "Qualitative methodological research",
      "Quantitative methods (survey, ethnography, observation, etc.)",
      "Mixed methods studies",
      "Survey research and statistical analysis",
      "Discourse and content analysis"
    ]
  },
  articles: [
    {
      id: 1,
      type: "ORIGINAL RESEARCH",
      metadata: "Volume 2, Issue 1, January-June 2025",
      title: "Expanding International Relations Paradigms: The Role of India in Resolving Global Affairs Discourse",
      authors: "Prof. (Dr.) Amritdeep Singh, Dr. Amritab Summer Gauda",
      citation: "Jadetimes Journal of Universal Studies",
      doi: "10.3066/jjus.2025.123",
      views: "1.2k views"
    },
    {
      id: 2,
      type: "REVIEW ARTICLE",
      metadata: "Volume 2, Issue 1, January-June 2025",
      title: "A Structured Review of Emerging AI-Driven Technologies in Human Resource Management",
      authors: "Tornike Shurgulaia, Deepshikha Singh",
      citation: "Jadetimes Journal of Universal Studies",
      doi: "10.3066/jjus.2025.124",
      views: "2.4k views"
    },
    {
      id: 3,
      type: "ORIGINAL RESEARCH",
      metadata: "Volume 2, Issue 1, January-June 2025",
      title: "Perceptions of Science Undergraduates Towards Online English Learning at a Sri Lankan State University: The Influence of Gender, Age, Academic Major, and Year of Study",
      authors: "Ms. Dilruka Thimali, Ramae Rao, Thiloththama Jayasinghe",
      citation: "Jadetimes Journal of Universal Studies",
      doi: "10.3066/jjus.2025.125",
      views: "1.8k views"
    },
    {
      id: 4,
      type: "ORIGINAL RESEARCH",
      metadata: "Volume 2, Issue 1, January-June 2025",
      title: "Algorithmic Inspiration: How AI technology is influencing ideation and concept development in Graphic Design",
      authors: "Ms. Dilrushika Siri, Dr. Tornike Shurgulaia",
      citation: "Jadetimes Journal of Universal Studies",
      doi: "10.3066/jjus.2025.126",
      views: "3.2k views"
    }
  ],
  volumes: [
    { id: 2, title: "Volume 2 - 2025", link: "/journal-of-universal-studies/volume-2" },
    { id: 1, title: "Volume 1 - 2025, Issue 1-2", link: "/journal-of-universal-studies/volume-1" }
  ]
};
