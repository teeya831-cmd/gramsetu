import { useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import SchemeDetailsPage from "./pages/SchemeDetailsPage.jsx";
import { translations } from "./i18n/translations.js";

export default function App() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage language={language} t={t} />} />
          <Route path="/schemes/:schemeId" element={<SchemeDetailsPage language={language} t={t} />} />
          <Route path="*" element={<HomePage language={language} t={t} />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="page-width footer-inner"><b>GramSetu</b><span>{t.footerNote}</span></div>
      </footer>
    </div>
  );
}