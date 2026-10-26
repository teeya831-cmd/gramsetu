import { useMemo, useState } from "react";
import schemes from "../data/schemes.json";
import { useSchemeFilters } from "../hooks/useSchemeFilters.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function HomePage({ language, t }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { categories, filteredSchemes } = useSchemeFilters(schemes, query, category);
  const localizedCategories = useMemo(
    () => categories.map((item) => ({ id: item.id, label: language === "hi" ? item.hi : item.en })),
    [categories, language],
  );

  return (
    <>
      <section className="hero">
        <div className="page-width hero-content">
          <p className="eyebrow"><span />{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroBody}</p>
          <div className="hero-search"><SearchBar value={query} onChange={setQuery} t={t} /></div>
          <p className="trust-note">✓ {t.checkOfficial}</p>
        </div>
      </section>
      <section className="page-width directory" aria-labelledby="scheme-heading">
        <div className="section-heading">
          <div><p>{t.results}</p><h2 id="scheme-heading">{t.resultCount(filteredSchemes.length)}</h2></div>
          <span className="count-pill">{String(filteredSchemes.length).padStart(2, "0")}</span>
        </div>
        <CategoryFilter categories={localizedCategories} selected={category} onChange={setCategory} t={t} />
        {filteredSchemes.length ? (
          <div className="scheme-grid">
            {filteredSchemes.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} language={language} t={t} />)}
          </div>
        ) : (
          <div className="empty-state"><span className="empty-mark">⌕</span><h3>{t.noResultsTitle}</h3><p>{t.noResultsBody}</p></div>
        )}
      </section>
    </>
  );
}