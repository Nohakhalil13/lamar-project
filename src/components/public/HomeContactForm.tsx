"use client";

import { useState } from "react";

export default function HomeContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState({
    naam: "",
    email: "",
    telefoon: "",
    woonplaats: "",
    beschrijving: "",
  });

  const set =
    (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const message = [
      fields.woonplaats ? `Woonplaats: ${fields.woonplaats}` : "",
      fields.beschrijving,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.naam,
          email: fields.email || undefined,
          phone: fields.telefoon || undefined,
          message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ?? "Verzenden mislukt.",
        );
      }
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verzenden mislukt. Probeer opnieuw.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 1rem",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontFamily: "var(--font-outfit)",
    fontSize: "0.95rem",
    background: "#F8FAFC",
    color: "#1A1A1A",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#007a63";
    e.target.style.boxShadow = "0 0 0 3px rgba(0, 128, 128, 0.12)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "#CBD5E1";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      style={{
        padding: "7rem 1.5rem",
        background: "#F8FAFC",
        position: "relative",
      }}
      id="offerte"
    >
      <div className="rv" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(2rem,3.2vw,2.8rem)",
              color: "#1A1A1A",
              margin: 0,
            }}
          >
            Offerte aanvraag
          </h2>
          <div
            style={{
              width: 80,
              height: 4,
              background: "var(--emerald)",
              borderRadius: 2,
              margin: "1rem auto 1.25rem",
            }}
          />
          <p
            style={{
              color: "#4A5568",
              fontSize: "1.05rem",
              fontFamily: "var(--font-outfit)",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Laat hier uw bericht achter. Wij komen dezelfde dag nog bij u terug!
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: Form */}
          <div style={{ position: "relative" }}>
            {/* Floating Discount Badge */}
            <div
              style={{
                position: "absolute",
                top: "-18px",
                left: "24px",
                background: "var(--emerald)",
                color: "#FFFFFF",
                padding: "0.55rem 1.1rem",
                fontFamily: "var(--font-outfit)",
                fontSize: "0.82rem",
                fontWeight: 700,
                borderRadius: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                zIndex: 10,
                boxShadow: "0 4px 14px rgba(0, 128, 128, 0.25)",
                letterSpacing: "0.03em",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  background: "#FFFFFF",
                  color: "var(--emerald)",
                  borderRadius: "50%",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                }}
              >
                %
              </span>
              TIJDELIJKE KORTING TOT 10%!
            </div>

            <div
              style={{
                background: "#FFFFFF",
                padding: "3.5rem 2.5rem 2.5rem",
                borderRadius: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                border: "1px solid #E2E8F0",
              }}
            >
              {success ? (
                <div
                  style={{
                    background: "rgba(0, 128, 128, 0.08)",
                    color: "var(--emerald)",
                    border: "1px solid rgba(0, 128, 128, 0.2)",
                    padding: "2rem",
                    borderRadius: 12,
                    textAlign: "center",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "0.5rem",
                      fontFamily: "var(--font-archivo)",
                      fontWeight: 700,
                    }}
                  >
                    Bedankt voor uw aanvraag!
                  </h3>
                  <p style={{ margin: 0, color: "#4A5568" }}>
                    Wij hebben uw gegevens ontvangen en nemen binnen 24 uur
                    contact met u op.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Naam"
                    required
                    value={fields.naam}
                    onChange={set("naam")}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    value={fields.email}
                    onChange={set("email")}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                  <input
                    type="tel"
                    placeholder="Telefoonnummer"
                    required
                    value={fields.telefoon}
                    onChange={set("telefoon")}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Woonplaats"
                    required
                    value={fields.woonplaats}
                    onChange={set("woonplaats")}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                  <textarea
                    placeholder="Beschrijving opdracht"
                    required
                    rows={4}
                    value={fields.beschrijving}
                    onChange={set("beschrijving")}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle, resize: "vertical" }}
                  ></textarea>

                  {error && (
                    <p
                      style={{
                        color: "#DC2626",
                        fontFamily: "var(--font-outfit)",
                        fontSize: "0.88rem",
                        margin: 0,
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "var(--emerald)",
                      color: "#FFFFFF",
                      padding: "1.1rem",
                      borderRadius: 8,
                      border: "none",
                      fontFamily: "var(--font-archivo)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      transition:
                        "background-color 0.2s ease, transform 0.1s ease",
                      marginTop: "0.5rem",
                      opacity: loading ? 0.7 : 1,
                      boxShadow: "0 4px 12px rgba(0, 128, 128, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#006666";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#007a63";
                    }}
                  >
                    {loading ? "Bezig met verzenden..." : "Offerte Aanvragen"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3.5rem",
              justifyContent: "center",
              padding: "1rem 0",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.25rem",
              }}
            >
              <div style={{ width: 110, height: 80 }}>
                <img
                  src="/rush-150x150.png"
                  alt="Snel en efficiënt"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.05rem",
                  color: "#4A5568",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Snel en efficiënt,{" "}
                <strong style={{ color: "#1A1A1A" }}>
                  ZONDER wachttijden!
                </strong>
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.25rem",
              }}
            >
              <div style={{ width: 100, height: 90 }}>
                <img
                  src="/transparent-size-icon-real-estate-icon-measurement-icon-5fb3244b4c56c50929056516055757553127-282x300.png"
                  alt="Grote en kleine klussen"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.05rem",
                  color: "#4A5568",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Zowel grote, als{" "}
                <strong style={{ color: "#1A1A1A" }}>kleine klussen.</strong>
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.25rem",
              }}
            >
              <div style={{ width: 100, height: 90 }}>
                <img
                  src="/customer-service-150x150.png"
                  alt="1 op 1 begeleiding"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "1.05rem",
                  color: "#4A5568",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                1 op 1 begeleiding{" "}
                <strong style={{ color: "#1A1A1A" }}>
                  gedurende het hele traject.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
