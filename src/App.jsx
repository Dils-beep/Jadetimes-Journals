import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Link
} from "react-router-dom";

// --- LAYOUTS ---
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LegalLayout from "./components/layout/LegalLayout";

// --- PAGES: MAIN ---
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ScienceNews from "./pages/ScienceNews";
import EditorialCommunity from "./pages/EditorialCommunity";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SubmitResearch from "./pages/SubmitResearch";
import Profile from "./pages/auth/Profile";
import AdminRoute from "./components/auth/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminSubmissionDetails from "./pages/admin/AdminSubmissionDetails";
import AdminAuthors from "./pages/admin/AdminAuthors";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJournals from "./pages/admin/AdminJournals";

// --- PAGES: JOURNALS ---
import Journals from "./pages/Journals";
import JournalDetail from "./pages/journals/JournalDetail";
import JournalAbout from "./pages/journals/JournalAbout";
import JournalInfoLayout from "./layouts/JournalInfoLayout";
import JournalEditors from "./pages/journals/JournalEditors";
import JournalArticles from "./pages/journals/JournalArticles";

import Volume1 from "./pages/journals/Volume1";

// --- PAGES: ARTICLES ---
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/articles/ArticleDetail";

// --- PAGES: ABOUT US ---
import Mission from "./pages/about/Mission";
import History from "./pages/about/History";
import Leadership from "./pages/about/Leadership";
import Awards from "./pages/about/Awards";

// --- PAGES: RESEARCH ---
import ResearchLanding from "./pages/research/ResearchLanding";
import ResearchTopicsPage from "./pages/research/ResearchTopicsPage";
import BeEditorPage from "./pages/research/BeEditorPage";
import HowItWorksPage from "./pages/research/HowItWorksPage";
import BenefitsPage from "./pages/research/BenefitsPage";

// --- PAGES: PUBLISHING ---
import HowWePublish from "./pages/publishing/HowWePublish";
import OpenAccess from "./pages/publishing/OpenAccess";
import PublishingFeesPage from "./pages/publishing/PublishingFeesPage";
import AuthorGuidelines from "./pages/publishing/AuthorGuidelines";
import WhySubmitPage from "./pages/publishing/WhySubmitPage";
import PeerReview from "./pages/publishing/PeerReview";
import SubmissionChecklistPage from "./pages/publishing/SubmissionChecklistPage";
import EditorialPolicies from "./pages/publishing/EditorialPolicies";

import FactsPage from "./pages/publishing/FactsPage";
import QualityPage from "./pages/publishing/QualityPage";
import CopyrightStatementPage from "./pages/publishing/CopyrightStatementPage";
import ResearchIntegrityPage from "./pages/publishing/ResearchIntegrityPage";
import OpenAccessPage from "./pages/publishing/OpenAccessPage";
import ArticleTypesPage from "./pages/publishing/ArticleTypesPage";

// --- PAGES: SERVICES ---
import InstitutionalPartners from "./pages/services/InstitutionalPartners";
import Collaborators from "./pages/services/Collaborators";

// --- PAGES: LEGAL ---
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsConditions from "./pages/legal/TermsConditions";

// --- UTILITIES ---
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
        Go Home
      </Link>
    </div>
  );
}

// Placeholder for services not yet fully built
const ServicesPlaceholder = ({ title }) => (
  <div className="py-20 text-center">
    <h1 className="text-3xl font-bold text-gray-400">{title}</h1>
    <p className="text-gray-500 mt-2">This page is under construction.</p>
  </div>
);

export default function App() {
  // Handle GitHub Pages or sub-folder deployment if necessary
  const basename = import.meta?.env?.BASE_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>

          {/* 1. Core Pages */}
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="science-news" element={<ScienceNews />} />
          <Route path="editorial-community" element={<EditorialCommunity />} />
          <Route path="admin-login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="submissions/:id" element={<AdminSubmissionDetails />} />
            <Route path="authors" element={<AdminAuthors />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="users" element={<AdminRoute requireSuperAdmin={true}><AdminUsers /></AdminRoute>} />
            <Route path="journals" element={<AdminRoute requireSuperAdmin={true}><AdminJournals /></AdminRoute>} />
          </Route>

          <Route
            path="submit-research/journal-of-universal-studies"
            element={
              <ProtectedRoute>
                <SubmitResearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Legal Pages */}
          <Route element={<LegalLayout />}>
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
          </Route>

          {/* 2. Journals Structure */}
          {/* Universal Studies Specific Routing */}
          <Route path="journal-of-universal-studies">
            <Route index element={<JournalDetail journalId="journal-of-universal-studies" />} />
            
            <Route element={<JournalInfoLayout variant="about-us" />}>
              <Route path="about-us/mission" element={<Mission />} />
            </Route>

            <Route element={<JournalInfoLayout variant="publishing" />}>
              <Route path="scope" element={<JournalAbout />} />
            </Route>

            <Route path="about" element={<JournalAbout />} />
            <Route path="editors" element={<JournalEditors />} />
            <Route path="articles" element={<JournalArticles />} />
            <Route path="articles/:slug" element={<ArticleDetail />} />
            <Route path="volume-1" element={<Volume1 />} />
            <Route path="why-submit" element={<WhySubmitPage />} />
          </Route>

          <Route path="journals">
            <Route index element={<Journals />} />
            <Route path=":id" element={<JournalDetail />} />
            <Route path=":id/about" element={<JournalAbout />} />
          </Route>

          {/* 3. Articles Structure */}
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticleDetail />} />

          {/* 4. About Us Section */}
          <Route path="about-us">
            <Route path="mission" element={<Mission />} />
            <Route path="history" element={<History />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="awards" element={<Awards />} />
          </Route>

          {/* 5. Research Topics Section */}
          <Route path="research">
            <Route index element={<ResearchLanding />} />
            <Route path="topics" element={<ResearchTopicsPage />} />
            <Route path="be-a-topic-editor" element={<BeEditorPage />} />
            <Route path="how-research-topics-work" element={<HowItWorksPage />} />
            <Route path="benefits" element={<BenefitsPage />} />
          </Route>

          {/* 6. Publishing Section */}
          <Route path="publishing" element={<JournalInfoLayout variant="publishing" />}>
            <Route path="how-we-publish" element={<HowWePublish />} />
            <Route path="open-access" element={<OpenAccessPage />} />
            <Route path="fee-policy" element={<PublishingFeesPage />} />
            <Route path="author-guidelines" element={<AuthorGuidelines />} />
            {/* Mapping editor guidelines to editorial policies */}
            <Route path="editor-guidelines" element={<EditorialPolicies />} />
            <Route path="why-submit" element={<WhySubmitPage />} />
            <Route path="peer-review" element={<PeerReview />} />
            <Route path="submission-checklist" element={<SubmissionChecklistPage />} />
            <Route path="author-services" element={<WhySubmitPage />} />
            <Route path="research-integrity" element={<ResearchIntegrityPage />} />
            <Route path="facts" element={<FactsPage />} />
            <Route path="quality" element={<QualityPage />} />
            <Route path="copyright-statement" element={<CopyrightStatementPage />} />
            <Route path="artical-types" element={<ArticleTypesPage />} />
          </Route>

          {/* 7. Services */}
          <Route path="services">
            <Route path="institutional-partnerships" element={<InstitutionalPartners />} />
            <Route path="collaborators" element={<Collaborators />} />
            <Route path="societies" element={<ServicesPlaceholder title="Societies" />} />
            <Route path="consortia" element={<ServicesPlaceholder title="National Consortia" />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}