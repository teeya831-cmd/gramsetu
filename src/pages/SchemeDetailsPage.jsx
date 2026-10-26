import { Link, useParams } from "react-router";
import schemes from "../data/schemes.json";

export default function SchemeDetailsPage({ language, t }) {
  const { schemeId } = useParams();
  const scheme = schemes.find((item) => item.id === schemeId);

  if (!scheme) {
    return (
      <section className="page-width details-page">
        <div className="empty-state"><h1>{t.notFoundTitle}</h1><p>{t.notFoundBody}</p><Link className="button button-primary" to="/">{t.backToSchemes}</Link></div>
      </section>
    );
  }

  const text = language === "hi"
    ? { title: scheme.titleHi, category: scheme.categoryHi, summary: scheme.summaryHi, benefit: scheme.benefitHi, eligibility: scheme.eligibilityHi }
    : { title: scheme.titleEn, category: scheme.categoryEn, summary: scheme.summaryEn, benefit: scheme.benefitEn, eligibility: scheme.eligibilityEn };

  return (
    <section className="page-width details-page">
      <Link className="back-link" to="/">← {t.backToSchemes}</Link>
      <article className="details-card">
        <p className="eyebrow"><span />{t.detailsEyebrow}</p>
        <span className="category-label">{text.category}</span>
        <h1>{text.title}</h1>
        <p className="details-summary">{text.summary}</p>
        <div className="detail-grid">
          <section><h2>{t.benefit}</h2><p>{text.benefit}</p></section>
          <section><h2>{t.eligibility}</h2><p>{text.eligibility}</p></section>
        </div>
        <p className="details-notice">ⓘ {t.detailsNotice}</p>
        <a className="button button-primary" href={scheme.officialUrl} target="_blank" rel="noreferrer">{t.officialSource} ↗</a>
      </article>
    </section>
  );
}