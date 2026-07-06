import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const CHAPTERS = [
  {
    id: 'chapter-1',
    num: '01',
    title: 'The Nomad in You',
    body: [
      'There is a version of you that exists outside your apartment. You have met them before — on the last morning of a trip, when the return flight felt like a mistake. They wake earlier. They talk to strangers. They notice light.',
      'Then Monday arrives, and the apartment wins, and that version of you goes quiet again. Not gone. Just waiting.',
    ],
  },
  {
    id: 'chapter-2',
    num: '02',
    title: 'The Instinct Waiting',
    body: [
      'People were not meant to spend every Monday in the same room. For most of human history we moved with seasons, with rivers, with reasons. The instinct never left — it just ran out of permission.',
      'You feel it in small ways. Checking flight prices you never book. Reading about towns you will never live in. The instinct is patient. It has been waiting for a way out that does not cost you everything.',
    ],
  },
  {
    id: 'chapter-3',
    num: "03",
    title: "The Excuse That's Gone",
    body: [
      'For years, the answer was simple: work. Work needed a desk, and the desk needed a city, and the city needed you to stay. That excuse is gone now. Your work travels lighter than your luggage.',
      'What remains is harder to admit — going alone is lonely, planning is exhausting, and the wifi in that beautiful homestay was never actually tested. The obstacle was never the job. It was doing it alone.',
    ],
  },
  {
    id: 'chapter-4',
    num: '04',
    title: 'What Breaking Nomad Is',
    body: [
      'Breaking Nomad is a small group of people who take their work somewhere worth waking up in — together. We find the place, test the wifi, plan the stays, and gather the kind of people you would want at a long dinner table.',
      'You keep your job. You keep your meetings. You change everything around them. Two to four weeks. One destination. A community that was never forced, because it never had to be.',
    ],
  },
];

export default function OurStory() {
  const [active, setActive] = useState('chapter-1');
  const sectionRef = useRef(null);

  useEffect(() => {
    const ratios = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = null;
        ratios.forEach((r, id) => {
          if (r > (best?.r || 0)) best = { id, r };
        });
        if (best) setActive(best.id);
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] }
    );
    const nodes = sectionRef.current?.querySelectorAll('.story-chapter') || [];
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="story" id="story" ref={sectionRef} data-testid="our-story-section">
      <div className="story-inner">
        <aside className="story-sidebar">
          <p className="section-label">Our Story</p>
          <nav className="story-toc" data-testid="story-chapter-nav">
            {CHAPTERS.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`story-toc-item ${active === c.id ? 'is-active' : ''}`}
                data-testid={`story-nav-${c.id}`}
              >
                <span className="story-toc-num">{c.num}</span>
                <span className="story-toc-label">{c.title}</span>
              </a>
            ))}
          </nav>
        </aside>
        <div className="story-content">
          {CHAPTERS.map((c) => (
            <Chapter key={c.id} chapter={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Chapter = ({ chapter }) => {
  const ref = useReveal();
  return (
    <article className="story-chapter reveal" id={chapter.id} ref={ref} data-testid={`story-${chapter.id}`}>
      <span className="story-chapter-num">{chapter.num}</span>
      <h2 className="story-chapter-title">{chapter.title}</h2>
      {chapter.body.map((p, i) => (
        <p key={i} className="story-chapter-body">{p}</p>
      ))}
    </article>
  );
};
