import { useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const ESCAPES = [
  {
    batch: 'Escape 01 — Spring Cohort',
    name: 'Old Manali, Himachal',
    meta: ['3 Weeks', '16 People', '₹58,000', 'Mar 2 — Mar 22'],
    note: 'Pine forests, river mornings, and a workspace with a view you will stop noticing only because you got used to wonder.',
    images: [
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop', alt: 'Himalayan ridge above the clouds at dusk' },
      { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop', alt: 'Golden morning light through mountains' },
      { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop', alt: 'People working together on laptops' },
      { src: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop', alt: 'Bonfire embers at night' },
    ],
  },
  {
    batch: 'Escape 02 — Winter Cohort',
    name: 'Assagao, Goa',
    meta: ['2 Weeks', '14 People', '₹42,000', 'Nov 9 — Nov 23'],
    note: 'Slow lanes, Portuguese houses, sea air in the evenings. Work ends; the beach was always five minutes away.',
    images: [
      { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop', alt: 'Palm-lined Goan beach' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', alt: 'Quiet shoreline at dusk' },
      { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop', alt: 'Friends working around a table' },
      { src: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?q=80&w=800&auto=format&fit=crop', alt: 'Chai and a book in warm light' },
    ],
  },
];

const useParallax = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translateY(${(-progress * 6).toFixed(2)}%)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
};

const Collage = ({ images }) => {
  const parallaxRef = useParallax();
  const areas = ['collage-dominant', 'collage-support-1', 'collage-support-2', 'collage-support-3'];
  return (
    <div className="escape-collage">
      {images.map((img, i) => (
        <div className={`collage-item ${areas[i]}`} key={i}>
          <img
            ref={i === 0 ? parallaxRef : null}
            src={img.src}
            alt={img.alt}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default function Escapes() {
  return (
    <section className="escapes" id="escapes" data-testid="escapes-section">
      <div className="escapes-inner">
        <p className="section-label">Escapes</p>
        <h2 className="escapes-heading">Where we're going</h2>
        {ESCAPES.map((e, idx) => (
          <Escape key={e.name} escape={e} idx={idx} />
        ))}
      </div>
    </section>
  );
}

const Escape = ({ escape, idx }) => {
  const ref = useReveal();
  return (
    <article className="escape reveal" ref={ref} data-testid={`escape-${idx + 1}`}>
      <p className="escape-batch">{escape.batch}</p>
      <h3 className="escape-name" data-testid={`escape-name-${idx + 1}`}>{escape.name}</h3>
      <div className="escape-meta" data-testid={`escape-meta-${idx + 1}`}>
        {escape.meta.map((m, i) => (
          <span key={i} className="escape-meta-item">{m}</span>
        ))}
      </div>
      <p className="escape-note">{escape.note}</p>
      <Collage images={escape.images} />
    </article>
  );
};
