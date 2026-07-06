export const Nav = () => (
  <header className="bn-nav" data-testid="site-nav">
    <div className="bn-nav-inner">
      <a href="#top" className="bn-wordmark" data-testid="nav-wordmark">Breaking Nomad</a>
      <nav className="bn-nav-links">
        <a href="#story" data-testid="nav-link-story">Our Story</a>
        <a href="#how" data-testid="nav-link-how">How It Works</a>
        <a href="#escapes" data-testid="nav-link-escapes">Escapes</a>
        <a href="#apply" className="bn-nav-apply" data-testid="nav-link-apply">Apply</a>
      </nav>
    </div>
  </header>
);
