export default function LanguageToggle({ language, onChange, t }) {
  return (
    <div className="language-toggle" role="group" aria-label={t.chooseLanguage}>
      <button className={language === "en" ? "language-option active" : "language-option"} type="button" aria-pressed={language === "en"} onClick={() => onChange("en")}>English</button>
      <button className={language === "hi" ? "language-option active" : "language-option"} type="button" aria-pressed={language === "hi"} onClick={() => onChange("hi")}>हिन्दी</button>
    </div>
  );
}