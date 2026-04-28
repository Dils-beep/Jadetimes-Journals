# Routed Buttons and Links Report

This document lists all buttons and links in the application that are correctly routed to valid internal pages. It excludes dummy links (e.g., `#`) and external links unless specified.

## 1. Header (`src/components/layout/Header.jsx`)

### Main Navigation
- **Home Logo**: `/`
- **About us (Mega Menu)**:
  - "Mission and values": `/about-us/mission`
  - "History": `/about-us/history`
  - "Why submit?": `/publishing/why-submit`
  - "How we publish": `/publishing/how-we-publish`
  - "Open access": `/publishing/open-access`
  - "Peer review": `/publishing/peer-review`
  - "Research integrity": `/publishing/research-integrity`
  - "Research Topics": `/research/topics`
  - "Fee policy": `/publishing/fee-policy`
- **Services (Mega Menu)**:
  - "Institutional partnerships": `/services/institutional-partnerships`
  - "Collaborators": `/services/collaborators`
- **More (Mega Menu)**:
  - "Contact us": `/contact`
- **All journals**: `/journals`
- **All articles**: `/articles`
- **Editorial Community**: `/editorial-community`
- **Submit your research**: `/publishing/why-submit`

### Sub-Header / Utilities
- **Search**: `/journals`
- **Login**: `/login`
- **Articles**: `/articles`
- **Research Topics**: `/research/topics`
- **Editorial board**: `/editorial-community`

## 2. Footer (`src/components/layout/Footer.jsx`)

### Guidelines
- **Author guidelines**: `/publishing/author-guidelines`
- **Services for authors**: `/publishing/author-services`
- **Submission checklist**: `/publishing/submission-checklist`
- **Editor guidelines**: `/publishing/editor-guidelines`
- **Fee policy**: `/publishing/fee-policy`

### Explore
- **Why submit?**: `/publishing/why-submit`
- **Articles**: `/articles`
- **Research Topics**: `/research/topics`
- **Journals**: `/journals`
- **How we publish**: `/publishing/how-we-publish`

### Connect
- **Help center**: `/contact`
- **Contact us**: `/contact`
- **Submit**: `/publishing/peer-review`

### Legal
- **Privacy policy**: `/privacy-policy`
- **Terms and conditions**: `/terms-conditions`

## 3. Home Page (`src/features/home/HomeContent.jsx`)

### Info Cards (Authors Tab)
- **Find a journal**: `/journals`
- **Find a topic**: `/research/topics`
- **Submit your research**: `/publishing/why-submit`
- **How to publish**: `/publishing/how-we-publish`
- **Peer review**: `/publishing/peer-review`

### Info Cards (Editors Tab)
- **Peer review**: `/publishing/peer-review`
- **How we publish**: `/publishing/how-we-publish`
- **Editor guidelines**: `/publishing/editor-guidelines`
- **Become an editor**: `/research/be-a-topic-editor`

### Info Cards (Collaborators Tab)
- **Press office**: `/contact`
- **Institutional partnerships**: `/services/institutional-partnerships`
- **Publishing partnerships**: `/services/collaborators`
- **How we publish**: `/publishing/how-we-publish`

## 4. Journal Pages (`src/features/journals/JournalExtras.jsx` & `JournalDetail.jsx`)

### Guideline Cards
- **Submit your research**: `/publishing/why-submit`
- **Author guidelines**: `/publishing/author-guidelines`
- **Editor guidelines**: `/publishing/editor-guidelines`
- **Peer review**: `/publishing/peer-review`
- **Publishing fees**: `/publishing/fee-policy`

### Articles Section
- **See all**: `/articles`
- **Article Item**: `/articles/:id` (Dynamic)

### Topics Section
- **See all**: `/research/topics`

## 5. Auth Pages (`src/features/auth/LoginForm.jsx`)

- **Register**: `/register`

## 6. Services Pages (`src/pages/services/Collaborators.jsx`)

- **Publishing partnerships**: `/services/institutional-partnerships`
- **Institutional partnerships**: `/services/institutional-partnerships`

## 7. Legal Pages (`src/components/layout/LegalLayout.jsx`)

- **Terms and Conditions**: `/terms-conditions`
- **Privacy Policy**: `/privacy-policy`

## 8. Contact Page (`src/pages/Contact.jsx`)

- **Contact us**: `/contact`
