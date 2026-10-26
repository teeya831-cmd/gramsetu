import { Link } from "react-router";

export default function SchemeCard({ scheme, language, t }) {
  const title = language === "hi" ? scheme.titleHi : scheme.titleEn;
  const summary = language === "hi" ? scheme.summaryHi : scheme.summaryEn;
  const category = language === "hi" ? scheme.categoryHi : scheme.categoryEn;
  return (
    <article className="scheme-card">
      <div className="card-topline"><span className="category-label">{category}</span><span className="official-hint">● {t.checkOfficial}</span></div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="card-actions">
        <Link className="text-link" to={"/schemes/" + scheme.id}>{t.viewDetails} →</Link>
        <a className="source-link" href={scheme.officialUrl} target="_blank" rel="noreferrer">{t.officialSource} ↗</a>
      </div>
    </article>
  );
}