export const Footer = () => (
  <footer className="bn-footer" data-testid="site-footer">
    <div className="bn-footer-inner">
      <div className="bn-footer-top">
        <div className="bn-footer-brand">
          <p className="bn-footer-wordmark">Breaking Nomad</p>
          <p className="bn-footer-desc">
            Curated workations for Indian remote workers.<br />
            Move together. Work together. Live together.
          </p>
        </div>
        <nav className="bn-footer-links" data-testid="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="footer-link-instagram">Instagram</a>
          <a href="mailto:hello@breakingnomad.in" data-testid="footer-link-contact">Contact</a>
          <a href="#apply" data-testid="footer-link-apply">Apply</a>
        </nav>
      </div>
      <p className="bn-footer-quote" data-testid="footer-quote">
        "One day you'll answer a Monday meeting from somewhere that doesn't feel like work.<br />
        We hope Breaking Nomad was the reason."
      </p>
    </div>
  </footer>
);
