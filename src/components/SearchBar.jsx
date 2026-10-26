export default function SearchBar({ value, onChange, t }) {
  return (
    <label className="search-field">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <span className="sr-only">{t.searchLabel}</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={t.searchPlaceholder} autoComplete="off" />
      {value && <button className="clear-search" type="button" onClick={() => onChange("")}>{t.clear}</button>}
    </label>
  );
}