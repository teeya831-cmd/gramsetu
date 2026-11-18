import schemes from "../data/schemes.json";

export const DEMO_NOTICE = "Demonstration dataset — verify current details with the responsible authority.";

export function getSchemes() {
  return schemes;
}

export function getSchemeById(id) {
  return schemes.find((scheme) => scheme.id === id);
}

export function getCategories() {
  const categoryMap = new Map();
  schemes.forEach((scheme) => {
    if (!categoryMap.has(scheme.category.id)) categoryMap.set(scheme.category.id, {
      id: scheme.category.id,
      name: scheme.category.name,
      nameHi: scheme.category.nameHi,
      description: scheme.category.description,
      descriptionHi: scheme.category.descriptionHi,
      icon: scheme.category.icon,
    });
  });
  return [...categoryMap.values()];
}

export function localizeScheme(scheme, language = "en") {
  if (!scheme) return null;
  const useHi = language === "hi" || (["mr", "mai", "sa", "kok", "ne", "brx"].includes(language) && Boolean(scheme.nameHi));
  return {
    ...scheme,
    displayName: (useHi && scheme.nameHi) ? scheme.nameHi : scheme.name,
    displayDescription: (useHi && scheme.descriptionHi) ? scheme.descriptionHi : scheme.description,
    displayWhatItProvides: (useHi && scheme.whatItProvidesHi?.length) ? scheme.whatItProvidesHi : (scheme.whatItProvides || []),
    displayFinancialAssistance: (useHi && scheme.financialAssistanceHi?.length) ? scheme.financialAssistanceHi : (scheme.financialAssistance || []),
    displayBenefits: (useHi && scheme.benefitsHi) ? scheme.benefitsHi : scheme.benefits,
    displayEligibility: (useHi && scheme.eligibilityHi) ? scheme.eligibilityHi : scheme.eligibility,
    displayBeneficiaries: (useHi && scheme.beneficiariesHi) ? scheme.beneficiariesHi : scheme.beneficiaries,
    displayDocuments: (useHi && scheme.requiredDocumentsHi) ? scheme.requiredDocumentsHi : scheme.requiredDocuments,
    displaySteps: (useHi && scheme.applicationStepsHi) ? scheme.applicationStepsHi : scheme.applicationSteps,
    displayCategory: (useHi && scheme.category?.nameHi) ? scheme.category.nameHi : scheme.category?.name,
  };
}

export function searchSchemes(items, { query = "", category = "all", beneficiary = "all", level = "all", sort = "featured" } = {}) {
  const needle = query.trim().toLocaleLowerCase();
  const filtered = items.filter((scheme) => {
    const haystack = [scheme.name, scheme.nameHi, scheme.description, scheme.descriptionHi, scheme.category.name, scheme.category.nameHi, ...scheme.keywords, ...scheme.beneficiaries].join(" ").toLocaleLowerCase();
    return (!needle || haystack.includes(needle))
      && (category === "all" || scheme.category.id === category)
      && (beneficiary === "all" || scheme.beneficiaries.includes(beneficiary))
      && (level === "all" || scheme.level === level);
  });
  return [...filtered].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "category") return a.category.name.localeCompare(b.category.name);
    if (sort === "newest") return String(b.lastVerified || "").localeCompare(String(a.lastVerified || ""));
    return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
  });
}

export function evaluateEligibility(items, answers) {
  const results = items.map((scheme) => {
    const rules = scheme.eligibilityRules || {};
    const checks = [];
    const reasons = [];

    if (rules.occupations?.length) {
      const match = rules.occupations.includes(answers.occupation);
      checks.push(match);
      if (!match) reasons.push("Occupation does not match the listed criteria");
    }

    if (rules.incomes?.length) {
      const match = rules.incomes.includes(answers.income);
      checks.push(match);
      if (!match) reasons.push("Income category does not match");
    }

    if (rules.regions?.length && answers.region !== "any") {
      const match = rules.regions.includes(answers.region);
      checks.push(match);
      if (!match) reasons.push("Region does not match");
    }

    if (rules.minAge !== undefined || rules.maxAge !== undefined) {
      const ageMap = {
        under18: 17,
        age18_25: 22,
        age26_45: 35,
        age46_60: 53,
        over60: 65
      };

      const age = ageMap[answers.ageRange];
      const match =
        age !== undefined &&
        (rules.minAge === undefined || age >= rules.minAge) &&
        (rules.maxAge === undefined || age <= rules.maxAge);

      checks.push(match);
      if (!match) reasons.push("Age may not match the listed criteria");
    }

    const matched = checks.filter(Boolean).length;
    const total = checks.length;
    const conflicts = total - matched;

    let status = "insufficient";

    if (total > 0 && conflicts === 0) {
      status = "potential";
    } else if (matched > 0) {
      status = "possible";
    } else if (total > 0) {
      status = "unlikely";
    }

    return {
      scheme,
      status,
      score: matched,
      checks: total,
      conflicts,
      reasons
    };
  });

  return results
    .filter(result => result.status !== "unlikely")
    .sort((a, b) => b.score - a.score);
}