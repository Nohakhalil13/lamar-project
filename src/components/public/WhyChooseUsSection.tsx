"use client";

import { useEffect, useRef } from "react";

type WcuCard = { title: string; text: string; icon: React.ReactNode }

const defaultReasons: WcuCard[] = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Betrouwbaarheid",
    text: "Wij houden ons altijd aan onze beloften — met eerlijkheid, verantwoordelijkheid en respect voor uw rechten.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Initiatief",
    text: "De geest van initiatief drijft ons team aan — snelle actie, voortdurende innovatie en het benutten van duurzame kansen.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Kwaliteit",
    text: "Wij realiseren kwaliteit op de hoogste standaard — met precisie, vakmanschap en toewijding aan de technische normen.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Klantgerichtheid",
    text: "Uw tevredenheid staat centraal. Wij luisteren naar uw wensen en zorgen voor een persoonlijke aanpak bij elk project.",
  },
];

function ReasonCard({
  reason,
  index,
}: {
  reason: WcuCard;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        background: "#fff",
        borderRadius: 16,
        padding: "1.5rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        border: "1px solid #E2E8F0",
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          flexShrink: 0,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "rgba(0, 128, 128, 0.08)",
          border: "1px solid rgba(0, 128, 128, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--emerald)",
        }}
      >
        {reason.icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-archivo)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#1a1a1a",
            marginBottom: "0.35rem",
          }}
        >
          {reason.title}
        </div>
        <div
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.65,
            color: "#555",
            fontFamily: "var(--font-outfit)",
            fontWeight: 400,
          }}
        >
          {reason.text}
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection({
  pill,
  headingA,
  headingB,
  sub,
  cards,
}: {
  pill?: string
  headingA?: string
  headingB?: string
  sub?: string
  cards?: { title: string; text: string }[]
}) {
  const reasons: WcuCard[] = defaultReasons.map((d, i) => ({
    ...d,
    title: cards?.[i]?.title || d.title,
    text:  cards?.[i]?.text  || d.text,
  }))
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      style={{
        background: "#F8FAFC",
        padding: "7rem 3.5rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          ref={headingRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          {/* Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(0, 128, 128, 0.08)",
              border: "1px solid rgba(0, 128, 128, 0.2)",
              borderRadius: 50,
              padding: "0.35rem 1.1rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--emerald)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-outfit)",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--emerald)",
              }}
            >
              {pill || 'Waarom kiezen voor ons?'}
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
              color: "#1A1A1A",
              lineHeight: 1.2,
              marginBottom: "1rem",
              maxWidth: 680,
              margin: "0 auto 1rem",
            }}
          >
            {headingA || 'Onze waarden zijn de'}{" "}
            <span style={{ color: "var(--emerald)" }}>{headingB || 'kern van ons succes'}</span>
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "#4A5568",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
              fontFamily: "var(--font-outfit)",
              fontWeight: 400,
            }}
          >
            {sub || 'Bij Lamar hechten wij grote waarde aan eerlijkheid, kwaliteit en persoonlijk contact — in elk project dat wij uitvoeren.'}
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          className="wcu-grid"
        >
          {reasons.map((r, i) => (
            <ReasonCard key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
