import { useMemo } from "react";

export function useSchemeFilters(schemes, query, category) {
  const categories = useMemo(() => {
    const byId = new Map();
    schemes.forEach((scheme) => {
      if (!byId.has(scheme.categoryId)) byId.set(scheme.categoryId, { id: scheme.categoryId, en: scheme.categoryEn, hi: scheme.categoryHi });
    });
    return [...byId.values()];
  }, [schemes]);

  const filteredSchemes = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return schemes.filter((scheme) => {
      const matchesCategory = category === "all" || scheme.categoryId === category;
      const searchable = [scheme.titleEn, scheme.titleHi, scheme.summaryEn, scheme.summaryHi, scheme.categoryEn, scheme.categoryHi, scheme.eligibilityEn, scheme.eligibilityHi].join(" ").toLocaleLowerCase();
      return matchesCategory && (!needle || searchable.includes(needle));
    });
  }, [schemes, query, category]);

  return { categories, filteredSchemes };
}