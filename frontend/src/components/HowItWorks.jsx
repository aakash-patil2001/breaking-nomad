import { useReveal } from '../hooks/useReveal';

const STEPS = [
  {
    num: '01',
    title: 'Apply',
    body: 'Tell us who you are, what you do, and where you have always wanted to wake up. We keep cohorts small, so we read every application slowly.',
  },
  {
    num: '02',
    title: 'We handle it',
    body: 'Stays, workspaces, tested wifi, backup power, weekend plans, local food worth writing home about. You pack a bag. That is the whole list.',
  },
  {
    num: '03',
    title: 'You live it',
    body: 'Mornings in a new place. Meetings as usual. Evenings with people who chose the same thing you did. Then, eventually, the hardest goodbye.',
  },
];

const Arrow = ({ className }) => (
  <svg className={className} viewBox="0 0 64 24" fill="none" aria-hidden="true">
    <path d="M2 12 C 20 10, 40 14, 58 12 M50 5 C 54 8, 57 10, 60 12 C 57 14, 54 16, 50 19"
      stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function HowItWorks() {
  const ref = useReveal();
  return (
    <section className="how" id="how" data-testid="how-it-works-section">
      <div className="how-inner reveal" ref={ref}>
        <p className="section-label">How It Works</p>
        <h2 className="how-heading">Three steps.<br />No spreadsheets on your side.</h2>
        <div className="how-steps">
          {STEPS.map((s, i) => (
            <div className="how-step-wrap" key={s.num}>
              <div className="how-step" data-testid={`how-step-${s.num}`}>
                <span className="how-step-num" aria-hidden="true">{s.num}</span>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-body">{s.body}</p>
              </div>
              {i < STEPS.length - 1 && <Arrow className="how-arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
