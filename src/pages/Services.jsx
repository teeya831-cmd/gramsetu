import { useMemo, useState } from "react";
import { Search, FileText, Droplets, Building2 } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { getServices } from "../services/panchayatService.js";

const icons = {
  certificates: FileText,
  utilities: Droplets,
  "public-services": Building2
};

export default function Services() {
  const { language } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const services = getServices();

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();

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
  }, [query, category, services]);

  return (
    <>
      <PageHeader
        eyebrow="LOCAL GOVERNMENT"
        title={language === "hi" ? "पंचायत सेवाएँ" : "Panchayat Services"}
        body={
          language === "hi"
            ? "स्थानीय सरकारी सेवाओं और आवश्यक दस्तावेजों की जानकारी प्राप्त करें।"
            : "Find information about local government services, required documents and application procedures."
        }
      />

      <section className="page-width" style={{ paddingBottom: "70px" }}>
        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "28px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: "1",
            minWidth: "220px",
            padding: "12px 16px",
            border: "1px solid var(--border-light)",
            borderRadius: "12px",
            background: "var(--surface)"
          }}>
            <Search size={18} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Panchayat services..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                color: "inherit"
              }}
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: "12px", borderRadius: "10px" }}
          >
            <option value="all">All categories</option>
            <option value="certificates">Certificates</option>
            <option value="utilities">Utilities</option>
            <option value="public-services">Public services</option>
          </select>
        </div>

        <p style={{ marginBottom: "20px" }}>
          {filtered.length} services available
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px"
        }}>
          {filtered.map(service => {
            const Icon = icons[service.category] || FileText;

            return (
              <article
                key={service.id}
                style={{
                  padding: "24px",
                  border: "1px solid var(--border-light)",
                  borderRadius: "16px",
                  background: "var(--surface)"
                }}
              >
                <Icon size={28} />

                <h2 style={{ margin: "16px 0 8px" }}>
                  {language === "hi" ? service.nameHi : service.name}
                </h2>

                <p style={{ lineHeight: 1.6 }}>
                  {language === "hi"
                    ? service.descriptionHi
                    : service.description}
                </p>

                <h4 style={{ marginTop: "20px" }}>
                  Required documents
                </h4>

                <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
                  {service.requiredDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>

                <h4 style={{ marginTop: "16px" }}>
                  Application steps
                </h4>

                <ol style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
                  {service.applicationSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>

                <a
                  href={service.officialSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: "18px" }}
                >
                  Visit official source ↗
                </a>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p>No matching services found. Try another search.</p>
        )}

        <p style={{ marginTop: "28px", fontSize: "13px" }}>
          Information is for guidance only. Confirm requirements with the
          responsible local authority before applying.
        </p>
      </section>
    </>
  );
}