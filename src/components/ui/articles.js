import thumb1 from "../../assets/images/news_antarctic_anchors.webp";
import thumb2 from "../../assets/images/news_fossil_wombat.webp";
import thumb3 from "../../assets/images/news_hawk_traffic.webp";
import thumb4 from "../../assets/images/news_statins_sepsis.webp";
import impactCardImgFixed from "../../assets/images/hero.webp";

// --- MOCK IMAGES FOR THUMBNAILS AND AVATARS ---
// (In a real app, these would come from your assets or a CMS)
const userAvatar = "https://placehold.co/100x100/E2E8F0/94A3B8?text=:D&font=sans";
const userAvatar2 = "https://placehold.co/100x100/E2E8F0/94A3B8?text=R.P&font=sans";
const userAvatar3 = "https://placehold.co/100x100/E2E8F0/94A3B8?text=P.S&font=sans";
const userAvatar4 = "https://placehold.co/100x100/E2E8F0/94A3B8?text=M.M&font=sans";


export const ARTICLES = [
  {
    id: "network-analysis-job-burnout",
    kind: "ORIGINAL RESEARCH article",
    journal: "Front. Psychol.",
    section: "Organizational Psychology",
    published: "31 October 2025",
    volume: 16,
    doi: "10.3389/fpsyg.2025.1704862",
    title:
      "A network analysis of the relationship between perceived social support, emotion regulation, and job burnout among elementary and middle school teachers",

    // --- AUTHORS (as objects) ---
    authors: [
      { name: "Yueyao Li", affiliations: [1, 2, 3], isCorresponding: true, avatar: userAvatar },
      { name: "Yuyang Nie", affiliations: [1, 3], isCorresponding: true, avatar: userAvatar },
      { name: "Zhaoming Ma", affiliations: [], avatar: userAvatar },
      { name: "Cong Liu", affiliations: [1, 3], avatar: userAvatar },
      { name: "Yuxian Cao", affiliations: [2], avatar: userAvatar },
      { name: "Guofeng Qu", affiliations: [1], avatar: userAvatar },
      { name: "Lijia Hou", affiliations: [1, 3], avatar: userAvatar },
      { name: "Kangli Du", affiliations: [1, 3], avatar: userAvatar },
      { name: "MingMing Guo", affiliations: [1, 3], avatar: userAvatar },
      { name: "Tianci Wang", affiliations: [4], avatar: userAvatar },
      { name: "Xilai Zhu", affiliations: [1, 5], avatar: userAvatar },
    ],
    // --- AFFILIATIONS (as strings) ---
    affiliations: [
      "College of Physical Education and Sports, Beijing Normal University, Beijing, China",
      "College of Education for the Future, Beijing Normal University, Zhuhai, China",
      "Henan Sports High-tech Center, Zhengzhou, Henan, China", // Mocked, was blurry
      "College of Sports, Ningxia University, Yinchuan, China",
      "Zhuhai Middle School Affiliated to Sun Yat-sen University, Zhuhai, China",
    ],

    // --- METRICS ---
    metrics: {
      views: 163,
    },

    // --- SIDEBAR DATA ---
    editors: [
      { name: "Renato Pisanti", avatar: userAvatar2, url: "#" },
    ],
    reviewers: [
      { name: "Paramjit Singh Jamir Singh", avatar: userAvatar3, url: "#" },
      { name: "Mariacarla Martí-González", avatar: userAvatar4, url: "#" },
    ],
    toc: [
      { label: "Abstract", id: "abstract" },
      { label: "1. Introduction", id: "introduction" },
      { label: "2. Methods", id: "methods" },
      { label: "3. Results", id: "results" },
      { label: "4. Discussion", id: "discussion" },
      { label: "5. Conclusion", id: "conclusion" },
      { label: "Data availability statement", id: "data-availability" },
      { label: "Ethics statement", id: "ethics-statement" },
      { label: "Author contributions", id: "author-contributions" },
      { label: "Funding", id: "funding" },
      { label: "Conflict of interest", id: "conflict-of-interest" },
      { label: "Publisher's note", id: "publishers-note" },
      { label: "Supplementary material", id: "supplementary-material" },
      { label: "References", id: "references" },
    ],
    // --- ABSTRACT (as an object) ---
    abstract: {
      background:
        "Job burnout is a common mental health problem among primary and secondary school teacher populations, and navigating perceived social support and emotion regulation are recognized as important protective factors. The aim of this study was to explore the relationship between perceived social support, emotion regulation, and job burnout among elementary and secondary school teachers and to provide an in-depth analysis using network analysis and mediation modeling.",
      methods:
        "A questionnaire was administered to 351 elementary and middle school teachers using the perceived social support Scale, Emotion Regulation Scale and Job Burnout Scale. Network analysis was used to depict the network of associations between the variables, and mediation analysis was used to test the mediating role of emotion regulation between perceived social support and job burnout.",
      results:
        "The results of the network analysis revealed that the connections within variables were stronger than those across variables. The core associations between different dimensions included: “family support” and “emotional exhaustion,” “family support” and “depersonalization,” as well as “cognitive reappraisal” and “reduced personal accomplishment.” Family support exhibited the highest Bridging Expected Influence (BEI), is the core hub of the network. The mediation model confirmed the mediating role of emotion regulation (cognitive reappraisal and expression inhibition) in the relationship between perceived social support and job burnout.",
      conclusion:
        "Elementary and middle school teachers’ perceptions of perceived social support, emotion regulation, and job burnout constitute a dynamic network of associations, with family support and cognitive reappraisal as the core nodes, and emotion regulation mediating the role of perceived social support in alleviating job burnout. The study provides a theoretical basis and intervention target for improving teachers’ mental health by strengthening family support and cognitive reappraisal.",
    },

    // --- MAIN BODY (as mock HTML) ---
    body: `
      <h2 id="introduction">1. Introduction</h2>
      <p>In recent years, people’s attention to mental health is increasing, and the profession of teaching is highly regarded for its important contribution to the development of society, and its mental health status is especially critical. This profession not only requires unswerving dedication, but also continuous emotional investment and strong mental toughness (Mir Jalali, 2024; Nwoko et al., 2024). For primary and secondary school teachers in particular, increasing educational pressures – including frequent curriculum reforms, heavy administrative workloads, and complex demands on student management (especially “problem students”) – have made job burnout a common and pressing problem (Wong et al., 2017; Karimi and Adam, 2023). This state of burnout not only erodes the physical and mental health of teachers, but also directly reduces the quality of teaching, ultimately damaging students’ learning outcomes (Oth and Wolf, 2023).</p>
      <p>Teachers’ emotion regulation skills play an important role in coping with job stress and preventing Job Burnout (Yin et al., 2016). Emotion regulation refers to the process by which an individual changes his or her emotional state through various ways. Effective emotion regulation strategies can help teachers better manage their emotions and reduce the accumulation of negative emotions, thus reducing the risk of job burnout (Bing et al., 2022). Teachers are often under intense work pressure, dealing with a large number of teacher-student interactions, coping with a variety of teaching tasks, and at the same time taking care of their students’ personal development and emotional needs (López-Pérez et al., 2024).</p>
      <p>Previous studies have indicated that perceived social support and emotion regulation are key factors influencing teacher job burnout (Fiorilli et al., 2016; Mulyani et al., 2021). However, complex interactive mechanisms may exist among these variables. For instance, perceived social support may indirectly mitigate job burnout by facilitating teachers’ adoption of adaptive emotion regulation strategies (Fiorilli et al., 2016).</p>
      <h2 id="methods">2. Methods</h2>
      <p>Mock text for the methods section. A detailed description of the study design, participants, data collection procedures, and statistical analyses would go here. This study employed a cross-sectional design, gathering data from 351 teachers across various elementary and middle schools.</p>
      <h2 id="results">3. Results</h2>
      <p>Mock text for the results section. This section would present the findings from the network analysis and mediation modeling. Tables and figures would be used to illustrate the network structure, centrality measures (like the Bridging Expected Influence), and the path coefficients from the mediation analysis.</p>
      <h2 id="discussion">4. Discussion</h2>
      <p>Mock text for the discussion section. Here, the results would be interpreted in the context of existing literature. The central roles of "family support" and "cognitive reappraisal" would be highlighted, and the implications of the mediation findings would be explored. Limitations of the study and directions for future research would also be in_this_section.</p>
      <h2 id="conclusion">5. Conclusion</h2>
      <p>A final summary of the study's main findings and their significance. As stated in the abstract, the study confirmed a dynamic network and the mediating role of emotion regulation, providing clear targets for interventions aimed at improving teacher mental health.</p>
    `,

    // --- BOTTOM SECTIONS ---
    articleSections: [
      {
        id: "data-availability",
        title: "Data availability statement",
        content: "The raw data supporting the conclusions of this article will be made available by the authors, without undue reservation.",
      },
      {
        id: "ethics-statement",
        title: "Ethics statement",
        content: "The studies involving humans were approved by the Ethics Committee of Beijing Normal University. The studies were conducted in accordance with the local legislation and institutional requirements. The participants provided their written informed consent to participate in this study.",
      },
      {
        id: "author-contributions",
        title: "Author contributions",
        content: "YL: Conceptualization, Data curation, Writing – original draft. YN: Conceptualization, Writing – original draft, Funding acquisition, Supervision. ZM: Data curation, Writing – review & editing. CL: Methodology, Writing – review & editing. YC: Investigation, Writing – review & editing. GQ: Data curation, Writing – review & editing. LH: Investigation, Writing – review & editing. KD: Methodology, Writing – review & editing. MG: Software, Writing – review & editing. TW: Software, Writing – review & editing. XZ: Funding acquisition, Supervision, Writing – review & editing.",
      },
      {
        id: "funding",
        title: "Funding",
        content: "The author(s) declare that financial support was received for the research, authorship, and/or publication of this article. This work was supported by the National Social Science Fund of China (No. 20BTY057).",
      },
      {
        id: "conflict-of-interest",
        title: "Conflict of interest",
        content: "The authors declare that the research was conducted in the absence of any commercial or financial relationships that could be construed as a potential conflict of interest.",
      },
      {
        id: "publishers-note",
        title: "Publisher's note",
        content: "All claims expressed in this article are solely those of the authors and do not necessarily represent those of their affiliated organizations, or those of the publisher, the editors and the reviewers. Any product that may be evaluated in this article, or claim that may be made by its manufacturer, is not guaranteed or endorsed by the publisher.",
      },
      {
        id: "supplementary-material",
        title: "Supplementary material",
        content: "The Supplementary Material for this article can be found online at: [link-to-supplementary-material]",
      },
      {
        id: "references",
        title: "References",
        content: "A list of all cited works would appear here. For example: Bing, R., Li, J., and Zhang, Y. (2022). Emotion regulation and job burnout in teachers. J. Teach. Educ. 45, 123–145. doi: 10.1234/jte.2022.5678"
      }
    ],

    // --- FOOTER CARD DATA ---
    similarArticles: [
      {
        id: "similar-1",
        kind: "ORIGINAL RESEARCH",
        published: "03 Aug 2018",
        title: "Gender Inequality in Household Chores and Work-Family Conflict",
        authors: ["Javier Cerrato", "Eva Cifre"],
        journal: "Jadetimes Journals in Psychology",
        doi: "doi 10.3389/fpsyg.2021.720151",
        thumbnail: thumb1,
      },
      {
        id: "similar-2",
        kind: "ORIGINAL RESEARCH",
        published: "13 Dec 2021",
        title: "Impact of Pricing and Product Information on Consumer Buying Behavior With Customer Satisfaction in a Mediating Role",
        authors: ["Huiliang Zhao", "Xuemai Yao", "Zhengqiao Liu", "Qiu Yang"],
        journal: "Jadetimes Journals in Psychology",
        doi: "doi 10.3389/fpsyg.2021.720151",
        thumbnail: thumb2,
      },
      {
        id: "similar-3",
        kind: "ORIGINAL RESEARCH",
        published: "17 Jan 2022",
        title: "Role of Social Media Marketing Activities in Influencing Customer Intentions: A Perspective of a New Emerging Era",
        authors: ["Khalid Jamil", "Lu Duman", "Rana Faizan Gul", "Muhammad Usman Snezhad", "Syed Hussain Mustafa Gillani", "Faizal Hussain Awan"],
        journal: "Jadetimes Journals in Psychology",
        doi: "doi 10.3389/fpsyg.2021.808535",
        thumbnail: thumb3,
      },
      {
        id: "similar-4",
        kind: "ORIGINAL RESEARCH",
        published: "11 Mar 2022",
        title: "Service Quality and Customer Satisfaction in the Post Pandemic World: A Study of Saudi Auto Care Industry",
        authors: ["Sotirios Zygiaris", "Zain Hameed", "Mubarak Aydh Alsubaie", "Shafiq Ur Rehman"],
        journal: "Jadetimes Journals in Psychology",
        doi: "doi 10.3389/fpsyg.2022.842141",
        thumbnail: thumb4,
      },
    ],
    // --- SIDEBAR CARD DATA ---
    peopleAlsoLookedAt: [
      {
        title: "The relationship between Chinese medical students’ learning motivation and learning engagement: a network analysis",
        authors: "Denggin Wang, Peibo Song, Qianqian Zhang, Huili Zhao and Bo Zhuang",
        url: "#"
      },
      {
        title: "The impact of swimming coaches’ authentic leadership coaching on trust, self-efficacy, service quality, and relationship continuity intention",
        authors: "Buom Kim",
        url: "#"
      }
    ],
    impactCard: {
      title: "Jadetimes Journals' impact",
      body: "Our articles are highly cited in the top journals — learn how we maximise your impact through our leading community journals.",
      url: "#",
      img: impactCardImgFixed
    }
  },
  // --- SECOND ARTICLE (for navigation) ---
  {
    id: "similar-1", // This ID matches the card
    kind: "ORIGINAL RESEARCH",
    published: "03 Aug 2018",
    title: "Gender Inequality in Household Chores and Work-Family Conflict",
    authors: [
      { name: "Javier Cerrato", affiliations: [1], avatar: userAvatar },
      { name: "Eva Cifre", affiliations: [1], isCorresponding: true, avatar: userAvatar }
    ],
    affiliations: ["1. Jaume I University, Castellón de la Plana, Spain"],
    journal: "Jadetimes Journals in Psychology",
    section: "Organizational Psychology",
    volume: 9,
    doi: "10.3389/fpsyg.2018.01390",
    metrics: { views: 12045 },
    editors: [{ name: "Renato Pisanti", avatar: userAvatar2, url: "#" }],
    reviewers: [{ name: "Anonymous", avatar: userAvatar, url: "#" }],
    toc: [
      { label: "Abstract", id: "abstract" },
      { label: "Introduction", id: "introduction" },
      { label: "Conclusion", id: "conclusion" },
    ],
    abstract: {
      background: "A mock abstract for the second article. This article explores the relationship between gender inequality in household chores and the prevalence of work-family conflict.",
      methods: "Survey data was collected from dual-income couples.",
      results: "Findings indicate a significant correlation, with women reporting higher levels of conflict.",
      conclusion: "Policy and workplace interventions are suggested to promote greater balance.",
    },
    body: `
      <h2 id="introduction">Introduction</h2>
      <p>This is the mock body for the article on Gender Inequality. The persistence of traditional gender roles within the household, even as women's participation in the workforce has increased, creates significant challenges. This study investigates one such challenge: work-family conflict.</p>
      <h2 id="conclusion">Conclusion</h2>
      <p>The study confirms that an unequal division of household labor is a strong predictor of work-family conflict, particularly for women. Addressing these domestic imbalances is crucial for achieving true gender equity in the workplace.</p>
    `,
    articleSections: [
      { id: "data-availability", title: "Data availability statement", content: "Data is available upon request." },
      { id: "ethics-statement", title: "Ethics statement", content: "The study was approved by the local ethics committee." },
    ],
    // --- Mocked footer/sidebar data for this article ---
    similarArticles: [],
    peopleAlsoLookedAt: [],
    impactCard: {
      title: "Jadetimes Journals' impact",
      body: "Our articles are highly cited in the top journals.",
      url: "#",
      img: impactCardImgFixed
    }
  },

  // --- STUBS FOR OTHER SIMILAR ARTICLES ---
  // (Fill these out just like 'similar-1' to make them fully navigable)
  {
    id: "similar-2",
    kind: "ORIGINAL RESEARCH",
    published: "13 Dec 2021",
    title: "Impact of Pricing and Product Information on Consumer Buying Behavior With Customer Satisfaction in a Mediating Role",
    authors: [{ name: "Huiliang Zhao" }],
    journal: "Jadetimes Journals in Psychology",
    abstract: { background: "Mock abstract for Pricing article." },
    metrics: { views: 5000 },
    toc: [{ label: "Abstract", id: "abstract" }],
    body: "<p>Mock body</p>"
  },
  {
    id: "similar-3",
    kind: "ORIGINAL RESEARCH",
    published: "17 Jan 2022",
    title: "Role of Social Media Marketing Activities in Influencing Customer Intentions: A Perspective of a New Emerging Era",
    authors: [{ name: "Khalid Jamil" }],
    journal: "Jadetimes Journals in Psychology",
    abstract: { background: "Mock abstract for Social Media article." },
    metrics: { views: 7500 },
    toc: [{ label: "Abstract", id: "abstract" }],
    body: "<p>Mock body</p>"
  },
  {
    id: "similar-4",
    kind: "ORIGINAL RESEARCH",
    published: "11 Mar 2022",
    title: "Service Quality and Customer Satisfaction in the Post Pandemic World: A Study of Saudi Auto Care Industry",
    authors: [{ name: "Sotirios Zygiaris" }],
    journal: "Jadetimes Journals in Psychology",
    abstract: { background: "Mock abstract for Service Quality article." },
    metrics: { views: 3200 },
    toc: [{ label: "Abstract", id: "abstract" }],
    body: "<p>Mock body</p>"
  },
];

