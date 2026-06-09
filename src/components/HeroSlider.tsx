"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  cta: string;
  href: string;
};

export function HeroSlider({ slides, email }: { slides: HeroSlide[]; email: string }) {
  const [active, setActive] = useState(0);
  const current = slides[active];

  function go(direction: number) {
    setActive((value) => (value + direction + slides.length) % slides.length);
  }

  return (
    <section className="hero-slider" aria-label="Vastorabaltic recruitment highlights">
      <div className="hero-slide-copy" key={current.title}>
        <p className="eyebrow">{current.eyebrow}</p>
        <h1>{current.title}</h1>
        <p>{current.text}</p>
        <div className="hero-actions">
          <Link className="primary-button" href={current.href}>
            {current.cta}
            <ArrowRight size={18} />
          </Link>
          <a className="secondary-button" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </div>
      <div className="hero-slide-media">
        {slides.map((slide, index) => (
          <Image
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="(max-width: 980px) 100vw, 54vw"
            className={index === active ? "active" : ""}
          />
        ))}
        <div className="slider-card">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span>{current.eyebrow}</span>
        </div>
        <div className="slider-controls">
          <button aria-label="Previous slide" onClick={() => go(-1)} type="button">
            <ChevronLeft size={20} />
          </button>
          <button aria-label="Next slide" onClick={() => go(1)} type="button">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="slider-dots" aria-label="Hero slide navigation">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show ${slide.title}`}
            className={index === active ? "active" : ""}
            key={slide.title}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
