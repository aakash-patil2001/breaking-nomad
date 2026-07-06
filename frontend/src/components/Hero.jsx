import { HeroIllustration } from './HeroIllustration';

export default function Hero() {
  return (
    <section className="hero" id="top" data-testid="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker" data-testid="hero-kicker">A movement for Indian remote workers</p>
          <h1 className="hero-title" data-testid="hero-title">Breaking<br />Nomad</h1>
          <p className="hero-tagline" data-testid="hero-tagline">Work stayed. Everything else changed.</p>
          <p className="hero-desc" data-testid="hero-description">
            Live, work, and explore together in curated destinations — two to four
            weeks at a time. Same job. Same meetings. Different mornings.
          </p>
          <a href="#apply" className="btn-primary" data-testid="hero-cta-waitlist">Join the Waitlist</a>
        </div>
        <div className="hero-art">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
