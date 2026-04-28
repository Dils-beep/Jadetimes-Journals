import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link, NavLink, useLocation, useMatch } from "react-router-dom";
import {
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "../ui/Icons";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import { JOURNALS } from "../../data/journals";
import { useAuth } from "../../contexts/AuthContext";
import AccountMenu from "../auth/AccountMenu";

// Logos
import logoWhite from "../../assets/images/JadetimesLogoWhite.webp";
import logoBlack from "../../assets/images/JadetimesLogoBlack.webp";

/* ------------------------------ Mega menu data ----------------------------- */
const MEGA_LINKS = [
  {
    heading: "Who we are",
    links: [
      { label: "Mission and values", to: "/about-us/mission" },
      { label: "History", to: "/about-us/history" },
      { label: "Why submit?", to: "/publishing/why-submit" },
      { label: "How we publish", to: "/publishing/how-we-publish" },
      { label: "Open access", to: "/publishing/open-access" },
      { label: "Peer review", to: "/publishing/peer-review" },
      { label: "Research integrity", to: "/publishing/research-integrity" },
      { label: "Research Topics", to: "/research/topics" },
      { label: "Fee policy", to: "/publishing/fee-policy" },
    ],
  },
  {
    heading: "Services",
    links: [
      {
        label: "Institutional partnerships",
        to: "/services/institutional-partnerships",
      },
      { label: "Collaborators", to: "/services/collaborators" },
    ],
  },
  {
    heading: "More from Jadetimes Journals",
    links: [
      { label: "Contact us", to: "/contact" },
    ],
  },
];

/* ---------------------------- Sub-header content --------------------------- */
const SUBNAV = [
  { label: "Articles", to: "/articles", hasMenu: false },
  { label: "Research Topics", to: "/research/topics", hasMenu: false },
  { label: "Editorial board", to: "/editorial-community", hasMenu: false },
  { label: "About journal", to: "#", hasMenu: true },
];

/* -------------------------- About Journal Menu Data ------------------------- */
const ABOUT_JOURNAL_LINKS = [
  {
    heading: "Scope",
    links: [
      { label: "Field chief editors", to: "/editorial-community" },
      { label: "Mission & scope", to: "/about-us/mission" },
      { label: "Facts", to: "/publishing/facts" },
      { label: "Research Integrity", to: "/publishing/research-integrity" },
      { label: "Open access statement", to: "/publishing/open-access" },
      { label: "Copyright statement", to: "/publishing/copyright-statement" },
      { label: "Quality", to: "/publishing/quality" },
    ],
  },
  {
    heading: "For authors",
    links: [
      { label: "Why submit?", to: "/publishing/why-submit" },
      { label: "Article types", to: "/publishing/artical-types" },
      { label: "Author guidelines", to: "/publishing/author-guidelines" },
      { label: "Editor guidelines", to: "/publishing/editor-guidelines" },
      { label: "Publishing fees", to: "/publishing/fee-policy" },
      { label: "Submission checklist", to: "/publishing/submission-checklist" },
      { label: "Contact editorial office", to: "/contact" },
    ],
  },
];

const HOME_SOLID_Y = 80;

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null); // 'mega' | 'journal-about' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledY, setScrolledY] = useState(0);

  const [mainH, setMainH] = useState(64);
  const [subH, setSubH] = useState(0);
  const [stickyH, setStickyH] = useState(0);

  const mainRef = useRef(null);
  const subRef = useRef(null);
  const stickyRef = useRef(null);
  const megaMenuRef = useRef(null);
  const submenuRef = useRef(null);

  const location = useLocation();
  const isHome = !!useMatch({ path: "/", end: true });

  const matchedJournal = useMatch("/journals/:id/*");
  const matchedUniversal = useMatch("/journal-of-universal-studies/*");
  const matchedPublishing = useMatch("/publishing/*");
  const matchedAbout = useMatch("/about-us/*");
  const matchedEditorial = useMatch("/editorial-community");

  const currentJournalId = useMemo(() => {
    if (matchedUniversal) return "journal-of-universal-studies";
    if (matchedJournal?.params?.id) return matchedJournal.params.id;
    if (matchedPublishing || matchedAbout || matchedEditorial) return "journal-of-universal-studies";
    return null;
  }, [matchedJournal, matchedUniversal, matchedPublishing, matchedAbout, matchedEditorial]);

  const onJournalDetail = !!currentJournalId;
  const onArticleDetail = !!useMatch("/articles/:id");
  const onScienceNews = !!useMatch("/science-news");
  const isDetail = onJournalDetail || onArticleDetail || onScienceNews;

  // Reset menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click Outside Behavior
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the main header or sub header (where buttons are)
      // or inside the open menus themselves
      const clickedInsideMain = mainRef.current && mainRef.current.contains(event.target);
      const clickedInsideSub = subRef.current && subRef.current.contains(event.target);
      const clickedInsideStickySub = stickyRef.current && stickyRef.current.contains(event.target);
      const clickedInsideMega = megaMenuRef.current && megaMenuRef.current.contains(event.target);
      const clickedInsideSubmenu = submenuRef.current && submenuRef.current.contains(event.target);

      if (!clickedInsideMain && !clickedInsideSub && !clickedInsideStickySub && !clickedInsideMega && !clickedInsideSubmenu) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  // Scroll Handling
  useEffect(() => {
    const onScroll = () => {
      const newY = window.scrollY || 0;
      setScrolledY(newY);
      // Optional: Close menus on scroll if desired, but user asked specifically for Click Outside.
      // Keeping it loose for now to allow scrolling while menu is open if needed, 
      // or we can strictly close it. Standard mega menus often stay open. 
      // Let's NOT close on scroll to strictly follow "Click Outside" imperative, 
      // unless it creates layout issues.
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measurement
  useEffect(() => {
    const measure = () => {
      setMainH(mainRef.current?.offsetHeight || 64);
      setSubH(subRef.current?.offsetHeight || 0);
      setStickyH(stickyRef.current?.offsetHeight || 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (mainRef.current) ro.observe(mainRef.current);
    if (subRef.current) ro.observe(subRef.current);
    if (stickyRef.current) ro.observe(stickyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [isDetail]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let variant = "B";
  let overlayMode = false;
  let siteHeaderClasses = "";
  let spacerHeight = mainH;
  let megaTop = mainH;

  let mainTransform = "translateY(0)";
  let subTop = mainH;
  let subTransform = "translateY(0)";
  let subClass =
    "fixed left-0 right-0 z-[950] border-b border-slate-200 bg-white transition-opacity";

  let stickyTransform = "translateY(-100%)";
  let stickyClass =
    "fixed top-0 left-0 right-0 z-[975] bg-white text-gray-900";

  let isFullyCollapsed = false;

  if (isHome) {
    variant = scrolledY > HOME_SOLID_Y ? "A2" : "A";
    overlayMode = variant === "A";
    siteHeaderClasses =
      "fixed left-0 right-0 z-[1000] transition-[color,background-color,box-shadow] duration-150 " +
      (overlayMode
        ? "bg-transparent text-white"
        : "bg-white text-gray-900 shadow-md");
    spacerHeight = overlayMode ? 0 : mainH;
    megaTop = mainH;
    subClass += " opacity-0 pointer-events-none";
    stickyClass += " opacity-0 pointer-events-none";
  } else if (isDetail) {
    const SWAP_ANIMATION_DISTANCE = 150;
    const stage1Amount = Math.min(scrolledY, mainH);
    mainTransform = `translateY(-${stage1Amount}px)`;
    subTop = mainH - stage1Amount;

    const stage2Start = mainH;
    const stage2Duration = SWAP_ANIMATION_DISTANCE;
    const stage2Amount = Math.min(
      Math.max(0, scrolledY - stage2Start),
      stage2Duration
    );
    const stage2Frac = stage2Amount / stage2Duration;
    isFullyCollapsed = stage2Frac === 1.0;

    subTransform = `translateY(-${stage2Frac * subH}px)`;
    stickyTransform = `translateY(-${stickyH * (1.0 - stage2Frac)}px)`;

    spacerHeight = mainH + subH - stage1Amount;
    if (scrolledY >= stage2Start) {
      const interpolatedHeight =
        subH * (1.0 - stage2Frac) + stickyH * stage2Frac;
      spacerHeight = interpolatedHeight;
    }
    megaTop = mainH + subH - stage1Amount;
    if (scrolledY >= stage2Start) {
      const interpolatedTop =
        subH * (1.0 - stage2Frac) + stickyH * stage2Frac;
      megaTop = interpolatedTop;
    }
    if (isFullyCollapsed) {
      stickyClass += " shadow-md";
    }
    if (isFullyCollapsed) {
      subClass += " opacity-0 pointer-events-none";
    } else {
      subClass += " opacity-100";
    }

    siteHeaderClasses =
      "fixed left-0 right-0 z-[1000] bg-white text-gray-900" +
      (scrolledY === 0 ? " shadow-md" : "");
  } else {
    variant = "B";
    overlayMode = false;
    siteHeaderClasses =
      "fixed left-0 right-0 z-[1000] transition-[color,background-color,box-shadow] duration-150 bg-white text-gray-900 shadow-md";
    spacerHeight = mainH;
    megaTop = mainH;
    subClass += " opacity-0 pointer-events-none";
    stickyClass += " opacity-0 pointer-events-none";
  }

  const logoSrc = overlayMode ? logoWhite : logoBlack;

  const journalTitle = useMemo(() => {
    if (onJournalDetail && currentJournalId) {
      const j = Array.isArray(JOURNALS) ? JOURNALS.find((x) => x.id === currentJournalId) : null;
      return j?.title || "Journal";
    }
    if (onArticleDetail) return "Article";
    if (onScienceNews) return "Science News";
    return "";
  }, [onJournalDetail, onArticleDetail, onScienceNews, currentJournalId]);

  const journalHomeLink = useMemo(() => {
    if (currentJournalId === "journal-of-universal-studies") return "/journal-of-universal-studies";
    if (currentJournalId) return `/journals/${currentJournalId}`;
    return "/";
  }, [currentJournalId]);

  const navLinkClass = (extra = "") =>
    (overlayMode ? "hover:text-gray-200 " : "hover:text-blue-600 ") + extra;

  const SubHeaderActions = () => {
    return (
      <div className="flex items-center gap-4">
        <Link to="/submit-research/journal-of-universal-studies" className="hidden sm:inline-flex border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors whitespace-nowrap">
          <span>Submit your research</span>
        </Link>
        <NavLink
          to="/journals"
          className="hidden sm:flex items-center gap-1 text-sm hover:text-blue-600"
        >
          <SearchIcon /> <span>Search</span>
        </NavLink>
        {isAuthenticated ? (
          <AccountMenu />
        ) : (
          <NavLink
            to="/login"
            className="hidden sm:flex items-center gap-1 text-sm hover:text-blue-600"
          >
            <UserIcon /> <span>Login</span>
          </NavLink>
        )}
      </div>
    );
  };

  const JournalSubNav = () => (
    <nav className="hidden xl:flex items-center gap-8 text-sm">
      {SUBNAV.map((item) => {
        let href = item.to;
        // Dynamic link resolution
        if (currentJournalId) {
          const base = currentJournalId === "journal-of-universal-studies"
            ? "/journal-of-universal-studies"
            : `/journals/${currentJournalId}`;

          if (item.label === "Articles") href = `${base}/articles`;
          if (item.label === "Editorial board") href = `${base}/editors`;
          if (item.label === "About journal") href = "#";
        }

        if (item.label === "About journal") {
          return (
            <button
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === "journal-about" ? null : "journal-about");
              }}
              className={
                "inline-flex items-center gap-1 " +
                (activeMenu === "journal-about"
                  ? "text-blue-600"
                  : "hover:text-blue-600")
              }
            >
              <span>{item.label}</span>
              <ChevronDownIcon />
            </button>
          );
        }
        return (
          <Link
            key={item.label}
            to={href}
            className="hover:text-blue-600 inline-flex items-center gap-1"
          >
            <span>{item.label}</span>
            {item.hasMenu ? <ChevronDownIcon /> : null}
          </Link>
        );
      })}
    </nav>
  );

  const JournalSubmenu = ({ isOpen, onClose, links }) => {
    const hasHeadings = typeof links[0]?.heading === "string";
    const resolveLink = (l) => {
      if (currentJournalId) {
        const base = currentJournalId === "journal-of-universal-studies"
          ? "/journal-of-universal-studies"
          : `/journals/${currentJournalId}`;

        if (l.label === "Field chief editors") return `${base}/editors`;
        if (l.label === "Mission & scope") return `${base}/about-us/mission`;
        if (l.label === "Journal sections") return `${base}`;
      }
      return l.to;
    };

    return (
      <div
        ref={submenuRef}
        aria-hidden={!isOpen}
        className={
          "fixed left-0 right-0 z-[2900] transform-gpu transition-all duration-200 " +
          (isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto ease-out"
            : "opacity-0 -translate-y-3 pointer-events-none ease-in")
        }
        style={{ top: megaTop }}
      >
        <div className="bg-white text-gray-900 ring-1 ring-black/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            {hasHeadings ? (
              <div className="grid gap-x-8 gap-y-10 grid-cols-2">
                {links.map((col) => (
                  <div key={col.heading}>
                    <h3 className="font-semibold text-gray-500 uppercase tracking-wide text-sm mb-4">
                      {col.heading}
                    </h3>
                    <ul className="space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            to={resolveLink(l)}
                            onClick={onClose}
                            className="text-gray-700 hover:text-blue-600"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid grid-flow-col grid-rows-6 gap-x-8 gap-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={resolveLink(l)}
                      onClick={onClose}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Spacer to prevent content from jumping when header is fixed */}
      <div style={{ height: spacerHeight }} />

      {/* Main Header */}
      <header
        ref={mainRef}
        className={siteHeaderClasses}
        style={{ top: 0, transform: mainTransform }}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="block shrink-0" aria-label="Home">
              <img
                src={logoSrc}
                alt="JadeTimes"
                className="h-8 md:h-10 lg:h-12 w-auto select-none"
                draggable={false}
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
              <div className="relative">
                <button
                  aria-expanded={activeMenu === 'mega'}
                  aria-controls="about-mega"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === 'mega' ? null : 'mega');
                  }}
                  className={navLinkClass() + (activeMenu === 'mega' ? " text-blue-600" : "")}
                >
                  <span className="inline-flex items-center gap-1">
                    About us <ChevronDownIcon />
                  </span>
                </button>
              </div>
              <NavLink
                to="/journals"
                className={({ isActive }) =>
                  navLinkClass() + (isActive ? " text-blue-600" : "")
                }
              >
                All journals
              </NavLink>
              <NavLink to="/articles" className={navLinkClass()}>
                All articles
              </NavLink>
              <NavLink
                to="/editorial-community"
                className={({ isActive }) =>
                  navLinkClass() + (isActive ? " text-blue-600" : "")
                }
              >
                Editorial Community
              </NavLink>
              <Link
                to="/submit-research/journal-of-universal-studies"
                className={
                  "border px-4 py-2 rounded-full text-sm font-semibold transition-colors " +
                  (overlayMode
                    ? "border-white text-white hover:bg-white hover:text-gray-900"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white")
                }
              >
                Submit your research
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="hidden lg:flex items-center gap-4">
              <NavLink
                to="/journals"
                className={"flex items-center gap-1 " + navLinkClass()}
              >
                <SearchIcon /> <span>Search</span>
              </NavLink>
              {isAuthenticated ? (
                <AccountMenu overlayMode={overlayMode} />
              ) : (
                <NavLink
                  to="/login"
                  className={"flex items-center gap-1 " + navLinkClass()}
                >
                  <UserIcon /> <span>Login</span>
                </NavLink>
              )}
            </div>
            <button
              className="lg:hidden p-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header >

      {/* Sub Header for Journal Details */}
      {isDetail && (
        <div
          ref={subRef}
          className={subClass}
          style={{ top: subTop, transform: subTransform }}
        >
          <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="h-[52px] flex items-center">
              <div className="flex items-center gap-8 min-w-0 mr-4">
                <div className="min-w-0 flex items-center gap-3 shrink-0">
                  <Link to={journalHomeLink} className="truncate font-semibold hover:text-blue-600 transition-colors">
                    {journalTitle}
                  </Link>
                </div>
                {!onScienceNews && <JournalSubNav />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Sub Header (appears on scroll) */}
      {
        isDetail && (
          <div
            ref={stickyRef}
            className={stickyClass}
            style={{ transform: stickyTransform }}
          >
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="h-[52px] flex items-center w-full">
                <div className="flex items-center gap-2 md:gap-8 mr-auto min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <Link to="/" aria-label="Home" className="shrink-0">
                      <img src={logoBlack} alt="JadeTimes" className="h-6 w-auto" />
                    </Link>
                    <span className="h-5 w-px bg-slate-300" aria-hidden />
                    <Link to={journalHomeLink} className="truncate font-semibold text-sm hover:text-blue-600 transition-colors">
                      {journalTitle}
                    </Link>
                  </div>
                  {!onScienceNews && <JournalSubNav />}
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* About Us Mega Menu */}
      <div
        id="about-mega"
        ref={megaMenuRef}
        aria-hidden={activeMenu !== 'mega'}
        className={
          "fixed left-0 right-0 z-[2900] transform-gpu transition-all duration-200 " +
          (activeMenu === 'mega'
            ? "opacity-100 translate-y-0 pointer-events-auto ease-out"
            : "opacity-0 -translate-y-3 pointer-events-none ease-in")
        }
        style={{ top: megaTop }}
      >
        <div className="bg-white text-gray-900 ring-1 ring-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
              {MEGA_LINKS.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xl font-semibold">{col.heading}</h3>
                  <span className="block w-16 h-[3px] bg-gray-300 mt-2 mb-4" />

                  {/* Special rendering for the last column (social icons + spacing) */}
                  <ul className={col.heading === "More from Jadetimes Journals" ? "space-y-6" : "space-y-3"}>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.to.startsWith("/") ? (
                          <NavLink
                            to={l.to}
                            onClick={() => setActiveMenu(null)}
                            className={
                              l.disabled
                                ? "text-gray-400 pointer-events-none"
                                : "text-gray-700 hover:text-blue-600"
                            }
                          >
                            {l.label}
                          </NavLink>
                        ) : (
                          <a
                            href={l.to}
                            onClick={() => setActiveMenu(null)}
                            className={
                              l.disabled
                                ? "text-gray-400 pointer-events-none"
                                : "text-gray-700 hover:text-blue-600"
                            }
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                  {col.heading === "More from Jadetimes Journals" && (
                    <div className="flex space-x-6 text-gray-600 text-xl mt-6">
                      <a href="#" className="hover:text-blue-600"><FaInstagram /></a>
                      <a href="#" className="hover:text-blue-600"><FaYoutube /></a>
                      <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
                      <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Journal SubMenu */}
      <JournalSubmenu
        isOpen={activeMenu === "journal-about"}
        onClose={() => setActiveMenu(null)}
        links={ABOUT_JOURNAL_LINKS}
      />

      {/* Mobile Menu Overlay */}
      {
        mobileMenuOpen && (
          <div className="fixed inset-0 z-[2000] bg-white text-gray-900 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src={logoBlack} alt="JadeTimes" className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-gray-600"
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search journals..."
                  className="w-full border border-gray-300 rounded-full py-3 px-5 pl-12 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-4 top-3.5 text-gray-400">
                  <SearchIcon />
                </span>
              </div>

              <nav className="flex flex-col space-y-6 text-lg font-medium">
                {MEGA_LINKS.map((section) => (
                  <div key={section.heading}>
                    <div className="font-semibold text-gray-900 mb-4">{section.heading}</div>
                    <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                      {section.links.map(l => (
                        <Link key={l.label} to={l.to} className="block text-gray-600 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <Link to="/journals" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:text-blue-600">
                  All journals
                </Link>
                <Link to="/articles" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:text-blue-600">
                  All articles
                </Link>
                <Link to="/editorial-community" onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:text-blue-600">
                  Editorial Community
                </Link>

                {isAuthenticated ? (
                  <div className="pt-2">
                    <AccountMenu />
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-900 hover:text-blue-600">
                    <UserIcon /> Login
                  </Link>
                )}

                <div className="pt-4">
                  <Link
                    to="/submit-research/journal-of-universal-studies"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Submit your research
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )
      }
    </>
  );
}