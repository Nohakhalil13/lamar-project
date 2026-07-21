"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";

export default function Navbar({ lang }: { lang: Lang }) {
  const tr = t[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    document.body.style.overflow = "";
  };
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const services = [
    { label: "Sausklaar Stucwerk", href: "/diensten/sausklaar-stucwerk" },
    { label: "Stucwerk", href: "/diensten/stucwerk" },
    { label: "Dunpleister", href: "/diensten/dunpleister" },
    { label: "Reparatiewerk", href: "/diensten/reparatiewerk" },
    { label: "Schilderwerk", href: "/diensten/schilderwerk" },
    { label: "Latex spuiten", href: "/diensten/latex-spuiten" },
    { label: "Schilderwerk (hout)", href: "/diensten/schilderwerk-hout" },
  ];

  const desktopLinks = [
    { label: "HOME", href: "/" },
    { label: "OVER ONS", href: "/over-ons" },
    { label: "ONZE DIENSTEN", href: "/onze-diensten", dropdown: services },
    { label: "PORTFOLIO", href: "/projects" },
    { label: "CONTACT", href: "/contact" },
  ];

  /* ── glassmorphism nav style ── */
  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
  };

  return (
    <>
      <nav style={navStyle} className="px-4 sm:px-8 md:px-14 py-4">
        {/* Left: logo */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              padding: "2px 0",
            }}
          >
            <img
              src="/images/logo-removebg-preview.png"
              alt="LAMAR Stukadoor en Renovatie"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain transition-all duration-200"
              style={{ display: "block", maxWidth: "100%" }}
            />
          </Link>
        </div>

        {/* Center: links */}
        <div
          className="hidden md:flex items-center justify-center gap-8"
          style={{ flex: 2 }}
        >
          {desktopLinks.map((item) => {
            if (item.dropdown) {
              const dienstenActive = isActive(item.href);
              return (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  ref={dropdownRef}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    {/* Main link → navigates to /onze-diensten */}
                    <Link
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        color: dienstenActive ? "var(--emberd)" : "#333333",
                        fontFamily: "var(--font-outfit)",
                        paddingBottom: 4,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#007a63";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = dienstenActive
                          ? "#007a63"
                          : "#333333";
                      }}
                    >
                      {item.label}
                    </Link>
                    {/* Arrow button → toggles dropdown only */}
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      aria-label="Diensten submenu"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px 2px 0",
                        cursor: "pointer",
                        color: servicesOpen ? "#007a63" : "#333333",
                        display: "flex",
                        alignItems: "center",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#007a63";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = servicesOpen
                          ? "#007a63"
                          : "#333333";
                      }}
                    >
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          transform: servicesOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {servicesOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "1rem",
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        minWidth: "200px",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setServicesOpen(false)}
                          style={{
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            color: "#333333",
                            padding: "0.75rem 1rem",
                            borderRadius: "4px",
                            transition: "background 0.2s, color 0.2s",
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f4f4f4";
                            e.currentTarget.style.color = "#007a63";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#333333";
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: "relative",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: active ? "#007a63" : "#1A1A1A",
                  transition: "color 0.2s",
                  fontFamily: "var(--font-outfit)",
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#007a63";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active ? "#007a63" : "#1A1A1A";
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Link
            href="/#offerte"
            className="inline-block"
            style={{
              background: "#007a63",
              color: "#FFFFFF",
              padding: "0.7rem 1.6rem",
              borderRadius: 4,
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-outfit)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "none";
            }}
          >
            OFFERTE AANVRAAG
          </Link>

          <button
            onClick={toggleMenu}
            className="flex md:hidden flex-col gap-1.25 cursor-pointer p-1 bg-transparent border-none"
            aria-label="Menu"
            style={{ zIndex: 210 }}
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "#1A1A1A",
                borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "#1A1A1A",
                borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "#1A1A1A",
                borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 199,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            paddingTop: "5rem",
          }}
        >
          {/* Active page label */}
          <div
            style={{
              padding: "0.5rem 1.5rem 0.25rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "#007a63",
                fontFamily: "var(--font-outfit)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {desktopLinks.find((l) => isActive(l.href))?.label || "HOME"}
            </span>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1 }}>
            {desktopLinks.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    {/* Row: link to page + chevron toggle */}
                    <div style={{ display: "flex", alignItems: "stretch" }}>
                      {/* Link → goes to /onze-diensten */}
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          padding: "1.1rem 1.5rem",
                          textDecoration: "none",
                          fontFamily: "var(--font-archivo)",
                          fontWeight: 700,
                          fontSize: "1.15rem",
                          color: isActive(item.href) ? "#007a63" : "#1A1A1A",
                        }}
                      >
                        {item.label}
                      </Link>
                      {/* Chevron button → toggles submenu only */}
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        aria-label="Diensten submenu toggle"
                        style={{
                          background: mobileServicesOpen
                            ? "rgba(0,128,128,0.08)"
                            : "transparent",
                          border: "none",
                          borderLeft: "1px solid var(--border)",
                          padding: "0 1.25rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.2s",
                        }}
                      >
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          style={{
                            transform: mobileServicesOpen
                              ? "rotate(180deg)"
                              : "none",
                            transition: "transform 0.25s",
                            flexShrink: 0,
                          }}
                        >
                          <path
                            d="M1 1L7 7L13 1"
                            stroke={
                              mobileServicesOpen ? "#007a63" : "#1A1A1A"
                            }
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Dropdown sub-items */}
                    {mobileServicesOpen && (
                      <div
                        style={{
                          background: "#fafafa",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        {/* "Alle diensten" shortcut link */}
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.9rem 1.5rem 0.9rem 2rem",
                            textDecoration: "none",
                            fontFamily: "var(--font-outfit)",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            color: "#007a63",
                            borderBottom: "1px solid var(--border)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                          </svg>
                          Alle diensten
                        </Link>
                        {item.dropdown.map((subItem, i) => {
                          const subActive = isActive(subItem.href);
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeMenu}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "1rem 1.5rem 1rem 2rem",
                                textDecoration: "none",
                                fontFamily: "var(--font-outfit)",
                                fontSize: "1rem",
                                fontWeight: subActive ? 700 : 500,
                                color: subActive ? "#007a63" : "#333",
                                borderBottom:
                                  i < item.dropdown!.length - 1
                                    ? "1px solid var(--border)"
                                    : "none",
                                background: subActive
                                  ? "rgba(0,128,128,0.05)"
                                  : "transparent",
                              }}
                            >
                              <span
                                style={{
                                  display: "block",
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: subActive ? "#007a63" : "#ccc",
                                  flexShrink: 0,
                                }}
                              />
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.1rem 1.5rem",
                    textDecoration: "none",
                    fontFamily: "var(--font-archivo)",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    color: active ? "#007a63" : "#1A1A1A",
                    borderBottom: "1px solid var(--border)",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                  {/* small line decoration */}
                  <span
                    style={{
                      display: "block",
                      width: 40,
                      height: 1.5,
                      background: "var(--border2)",
                    }}
                  />
                </Link>
              );
            })}

            {/* CTA button */}
            <div style={{ padding: "1.5rem" }}>
              <Link
                href="/#offerte"
                onClick={closeMenu}
                style={{
                  display: "block",
                  background: "#007a63",
                  color: "#FFFFFF",
                  padding: "1rem 2.5rem",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                OFFERTE AANVRAAG
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}