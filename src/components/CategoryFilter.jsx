export default function CategoryFilter({ categories, selected, onChange, t }) {
  return (
    <div className="category-filter" aria-label={t.filterByCategory}>
      <button type="button" className={selected === "all" ? "category-chip selected" : "category-chip"} aria-pressed={selected === "all"} onClick={() => onChange("all")}>{t.allCategories}</button>
      {categories.map((category) => (
        <button type="button" className={selected === category.id ? "category-chip selected" : "category-chip"} aria-pressed={selected === category.id} key={category.id} onClick={() => onChange(category.id)}>{category.label}</button>
      ))}
    </div>
  );
}