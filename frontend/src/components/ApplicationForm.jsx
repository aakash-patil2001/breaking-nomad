import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const INTERESTS = ['Mountains', 'Coastline', 'Slow mornings', 'Treks', 'Community dinners', 'Photography', 'Long stays'];

export default function ApplicationForm() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', city: '', work: '' });
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i) =>
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="apply" id="apply" data-testid="application-section">
      <div className="apply-inner reveal" ref={ref}>
        <p className="section-label">Application</p>
        <h2 className="apply-heading" data-testid="apply-heading">The next cohort is forming.</h2>
        <p className="apply-sub">Leave your email. We'll tell you where we're going next.</p>

        {submitted ? (
          <div className="apply-success" data-testid="apply-success-message">
            <p className="apply-success-serif">Thank you. You're on the list.</p>
            <p className="apply-success-body">
              We read every application slowly. When the next cohort opens, you'll hear from us first.
            </p>
          </div>
        ) : (
          <form className="apply-form" onSubmit={onSubmit} data-testid="apply-form">
            <div className="apply-fields">
              <div className="apply-field">
                <label htmlFor="apply-name">Full Name</label>
                <input
                  id="apply-name" type="text" value={form.name} autoComplete="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" data-testid="apply-input-name"
                />
              </div>
              <div className="apply-field">
                <label htmlFor="apply-email">Email</label>
                <input
                  id="apply-email" type="email" required value={form.email} autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@somewhere.com" data-testid="apply-input-email"
                />
              </div>
              <div className="apply-field">
                <label htmlFor="apply-city">City You Work From</label>
                <input
                  id="apply-city" type="text" value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Bengaluru, Mumbai, anywhere" data-testid="apply-input-city"
                />
              </div>
              <div className="apply-field">
                <label htmlFor="apply-work">What You Do</label>
                <input
                  id="apply-work" type="text" value={form.work}
                  onChange={(e) => setForm({ ...form, work: e.target.value })}
                  placeholder="Design, code, words, numbers…" data-testid="apply-input-work"
                />
              </div>
            </div>

            <div className="apply-interests">
              <span className="apply-interests-label">What Calls You</span>
              <div className="apply-chips" data-testid="apply-interest-chips">
                {INTERESTS.map((i) => (
                  <button
                    type="button" key={i}
                    className={`apply-chip ${selected.includes(i) ? 'is-selected' : ''}`}
                    onClick={() => toggle(i)}
                    data-testid={`apply-chip-${i.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" data-testid="apply-submit-button">
              Join the Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
