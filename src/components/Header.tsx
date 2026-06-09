"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SiteSettings } from "@/lib/defaultContent";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/solutions", label: "Our Solutions" },
  { href: "/solutions/job-placement", label: "Job Placement" },
  { href: "/contact", label: "Contact us" }
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Hide on scroll-down, show on scroll-up (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 980) return;
      const currentY = window.scrollY;
      if (currentY < 80) {
        setHeaderHidden(false);
      } else if (currentY > lastScrollY.current) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header${headerHidden ? " header-hidden" : ""}`}>
        <Link className="brand" href="/" aria-label="Vastorabaltic home">
          <Image src={settings.logoUrl} alt="Vastorabaltic logo" width={54} height={54} />
          <span>{settings.siteName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Enquire
        </Link>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`mobile-overlay${open ? " active" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className={`mobile-drawer${open ? " active" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            <Image src={settings.logoUrl} alt="Vastorabaltic logo" width={42} height={42} />
            <span>{settings.siteName}</span>
          </Link>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <Link className="primary-button" href="/contact" onClick={() => setOpen(false)}>
            Enquire now
          </Link>
        </div>
      </div>
    </>
  );
}
