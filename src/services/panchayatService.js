import services from "../data/services.json";

export function getServices() {
  return services;
}

export function getServiceById(id) {
  return services.find(service => service.id === id) || null;
}

export function getServiceCategories() {
  return [...new Set(services.map(service => service.category))];
}

export function searchServices(query = "", category = "all") {
  const term = query.trim().toLowerCase();

  return services.filter(service => {
    const matchesQuery =
      !term ||
      service.name.toLowerCase().includes(term) ||
      service.nameHi.includes(query.trim()) ||
      service.description.toLowerCase().includes(term);

    const matchesCategory =
      category === "all" || service.category === category;

    return matchesQuery && matchesCategory;
  });
}