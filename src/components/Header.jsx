import { Link } from "react-router";
import LanguageToggle from "./LanguageToggle.jsx";

export default function Header({ language, onLanguageChange, t }) {
  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <Link className="brand" to="/" aria-label="GramSetu home"><span className="brand-mark" aria-hidden="true">G</span> GramSetu</Link>
        <div className="header-actions">
          <span className="tagline">{t.tagline}</span>
          <LanguageToggle language={language} onChange={onLanguageChange} t={t} />
        </div>
      </div>
    </header>
  );
}