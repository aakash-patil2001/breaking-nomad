import { useEffect, useRef } from 'react';

/* Hand-built layered SVG: static background + bodies, separate head groups.
   Heads rotate around neck pivots (transform-box: fill-box, origin 50% 92%). */

export const HeroIllustration = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !hasHover) return;

    const svg = svgRef.current;
    const hero = svg?.closest('.hero');
    if (!svg || !hero) return;

    const heads = Array.from(svg.querySelectorAll('.bn-head'));
    const mouse = { x: null, y: null };
    const current = new Map();
    let rafId = null;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    hero.addEventListener('pointermove', onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      heads.forEach((head, i) => {
        let target = 0;
        if (mouse.x !== null) {
          const rect = head.getBoundingClientRect();
          const pivotX = rect.left + rect.width / 2;
          const pivotY = rect.top + rect.height * 0.9;
          const dx = mouse.x - pivotX;
          const dy = mouse.y - pivotY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          target = Math.max(-14, Math.min(14, angle * 0.12));
        }
        const eased = lerp(current.get(i) || 0, target, 0.06 - i * 0.005);
        current.set(i, eased);
        head.style.transform = `rotate(${eased.toFixed(3)}deg)`;
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener('pointermove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="hero-illustration"
      viewBox="0 0 760 540"
      role="img"
      aria-label="Illustration of a small group of remote workers gathered on a hillside porch with laptops and coffee"
      data-testid="hero-illustration"
    >
      {/* ——— BACKGROUND LAYER ——— */}
      <g className="bn-bg">
        <circle cx="596" cy="96" r="48" fill="#C88A22" opacity="0.5" />
        <circle cx="596" cy="96" r="66" fill="#C88A22" opacity="0.12" />
        {/* far hills */}
        <path d="M0 320 Q 150 218 300 292 Q 440 356 560 280 Q 660 220 760 268 L760 540 L0 540 Z" fill="#A5A57A" opacity="0.30" />
        {/* near hill */}
        <path d="M0 372 Q 200 300 400 360 Q 580 412 760 350 L760 540 L0 540 Z" fill="#243224" opacity="0.14" />
        {/* deodar trees */}
        <g fill="#243224" opacity="0.55">
          <path d="M64 342 L84 262 L104 342 Z" />
          <path d="M70 306 L84 244 L98 306 Z" />
          <rect x="81" y="342" width="6" height="16" />
          <path d="M118 352 L133 292 L148 352 Z" />
          <rect x="130" y="352" width="5" height="12" />
        </g>
        <g fill="#243224" opacity="0.4">
          <path d="M676 352 L694 280 L712 352 Z" />
          <path d="M682 318 L694 262 L706 318 Z" />
          <rect x="691" y="352" width="6" height="14" />
        </g>
        {/* soft watercolor blooms */}
        <ellipse cx="220" cy="150" rx="90" ry="34" fill="#E8DFC6" opacity="0.5" />
        <ellipse cx="470" cy="120" rx="70" ry="26" fill="#E8DFC6" opacity="0.4" />
        {/* porch deck */}
        <rect x="48" y="452" width="664" height="14" fill="#C88A22" opacity="0.32" />
        <rect x="48" y="466" width="664" height="6" fill="#243224" opacity="0.28" />
        <rect x="82" y="472" width="8" height="46" fill="#243224" opacity="0.28" />
        <rect x="672" y="472" width="8" height="46" fill="#243224" opacity="0.28" />
        {/* low table */}
        <rect x="306" y="408" width="158" height="9" fill="#243224" opacity="0.82" />
        <rect x="316" y="417" width="7" height="36" fill="#243224" opacity="0.6" />
        <rect x="448" y="417" width="7" height="36" fill="#243224" opacity="0.6" />
        {/* items on table */}
        <rect x="352" y="396" width="26" height="12" fill="#1F2D1F" />
        <path d="M352 396 L358 376 L380 376 L378 396 Z" fill="#243224" />
        <rect x="398" y="396" width="12" height="12" fill="#C88A22" />
        <path d="M410 399 q7 2 0 6" stroke="#C88A22" strokeWidth="2" fill="none" />
        <rect x="424" y="400" width="22" height="8" fill="#A5A57A" />
      </g>

      {/* ——— CHARACTER 1 · left, cross-legged with laptop ——— */}
      <g className="bn-char">
        <g className="bn-body">
          <path d="M138 452 Q 132 372 172 366 Q 212 372 206 452 Z" fill="#243224" />
          <ellipse cx="172" cy="452" rx="44" ry="14" fill="#1F2D1F" />
          <path d="M140 402 Q 128 424 150 434" stroke="#243224" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M204 402 Q 216 424 194 434" stroke="#243224" strokeWidth="14" strokeLinecap="round" fill="none" />
          <rect x="150" y="418" width="44" height="14" fill="#1F2D1F" />
          <path d="M150 418 L156 400 L192 400 L190 418 Z" fill="#3A4A3A" />
          <rect x="165" y="352" width="14" height="16" fill="#E3BC93" />
        </g>
        <g className="bn-head">
          <circle cx="172" cy="330" r="26" fill="#E3BC93" />
          <path d="M146 328 Q 148 300 172 302 Q 196 300 198 328 Q 196 312 172 312 Q 148 312 146 328 Z" fill="#1F2D1F" />
          <circle cx="184" cy="322" r="11" fill="#1F2D1F" />
          <circle cx="164" cy="332" r="2.4" fill="#1F2D1F" />
          <circle cx="180" cy="332" r="2.4" fill="#1F2D1F" />
          <path d="M168 342 q5 3 10 0" stroke="#1F2D1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="158" cy="338" r="4" fill="#C88A22" opacity="0.28" />
        </g>
      </g>

      {/* ——— CHARACTER 2 · holding chai cup ——— */}
      <g className="bn-char">
        <g className="bn-body">
          <path d="M252 452 Q 248 376 288 370 Q 328 376 324 452 Z" fill="#A5A57A" />
          <ellipse cx="288" cy="452" rx="42" ry="13" fill="#8C8C60" />
          <path d="M256 404 Q 246 428 272 430" stroke="#A5A57A" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M320 404 Q 330 420 306 424" stroke="#A5A57A" strokeWidth="13" strokeLinecap="round" fill="none" />
          <rect x="296" y="410" width="13" height="15" fill="#C88A22" />
          <path d="M309 413 q6 2 0 6" stroke="#C88A22" strokeWidth="2" fill="none" />
          <path d="M298 406 q2 -6 4 0 M304 406 q2 -6 4 0" stroke="#A5A57A" strokeWidth="1.4" fill="none" opacity="0.8" />
          <rect x="281" y="356" width="14" height="16" fill="#C89B72" />
        </g>
        <g className="bn-head">
          <circle cx="288" cy="334" r="25" fill="#C89B72" />
          <path d="M263 334 Q 262 306 288 306 Q 314 306 313 334 L 313 344 Q 310 318 288 316 Q 266 318 263 344 Z" fill="#243224" />
          <circle cx="288" cy="303" r="8" fill="#243224" />
          <circle cx="280" cy="336" r="2.4" fill="#1F2D1F" />
          <circle cx="296" cy="336" r="2.4" fill="#1F2D1F" />
          <path d="M283 346 q5 3 10 0" stroke="#1F2D1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="272" cy="342" r="4" fill="#C88A22" opacity="0.3" />
          <circle cx="304" cy="342" r="4" fill="#C88A22" opacity="0.3" />
        </g>
      </g>

      {/* ——— CHARACTER 3 · at the table, typing ——— */}
      <g className="bn-char">
        <g className="bn-body">
          <path d="M356 452 Q 352 380 392 374 Q 432 380 428 452 Z" fill="#C88A22" opacity="0.85" />
          <ellipse cx="392" cy="452" rx="42" ry="13" fill="#A5701B" opacity="0.85" />
          <path d="M360 408 Q 352 430 376 432" stroke="#C88A22" strokeWidth="13" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M424 408 Q 432 430 408 432" stroke="#C88A22" strokeWidth="13" strokeLinecap="round" fill="none" opacity="0.9" />
          <rect x="385" y="360" width="14" height="16" fill="#D3A97E" />
        </g>
        <g className="bn-head">
          <circle cx="392" cy="338" r="25" fill="#D3A97E" />
          <path d="M367 336 Q 369 308 392 310 Q 415 308 417 336 Q 413 318 392 320 Q 371 318 367 336 Z" fill="#4A3A26" />
          <circle cx="384" cy="340" r="2.4" fill="#1F2D1F" />
          <circle cx="400" cy="340" r="2.4" fill="#1F2D1F" />
          <path d="M377 334 h14 M393 334 h14" stroke="#1F2D1F" strokeWidth="1.6" opacity="0.85" />
          <path d="M391 334 h2" stroke="#1F2D1F" strokeWidth="1.2" />
          <path d="M387 350 q5 3 10 0" stroke="#1F2D1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* ——— CHARACTER 4 · reading a book ——— */}
      <g className="bn-char">
        <g className="bn-body">
          <path d="M470 452 Q 466 380 506 374 Q 546 380 542 452 Z" fill="#E8DFC6" stroke="#DDD3BC" strokeWidth="2" />
          <ellipse cx="506" cy="452" rx="42" ry="13" fill="#DDD3BC" />
          <path d="M474 406 Q 466 426 492 430" stroke="#E8DFC6" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M538 406 Q 546 426 520 430" stroke="#E8DFC6" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M488 424 L506 416 L524 424 L524 434 L506 426 L488 434 Z" fill="#C88A22" opacity="0.85" />
          <rect x="499" y="358" width="14" height="18" fill="#E9C9A3" />
        </g>
        <g className="bn-head">
          <circle cx="506" cy="336" r="25" fill="#E9C9A3" />
          <path d="M481 336 Q 480 308 506 308 Q 532 308 531 336 L 533 352 Q 528 320 506 318 Q 484 320 479 352 Z" fill="#4A3A26" />
          <path d="M479 352 Q 476 364 482 370 M533 352 Q 536 364 530 370" stroke="#4A3A26" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="498" cy="338" r="2.4" fill="#1F2D1F" />
          <circle cx="514" cy="338" r="2.4" fill="#1F2D1F" />
          <path d="M501 348 q5 3 10 0" stroke="#1F2D1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="490" cy="344" r="4" fill="#C88A22" opacity="0.3" />
        </g>
      </g>

      {/* ——— CHARACTER 5 · standing, leaning with mug ——— */}
      <g className="bn-char">
        <g className="bn-body">
          <path d="M588 466 L592 336 Q 614 326 636 336 L640 466 Z" fill="#243224" />
          <path d="M594 356 Q 578 386 600 398" stroke="#243224" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M632 356 Q 650 380 626 392" stroke="#243224" strokeWidth="13" strokeLinecap="round" fill="none" />
          <rect x="596" y="390" width="12" height="14" fill="#C88A22" />
          <rect x="588" y="466" width="18" height="42" fill="#1F2D1F" />
          <rect x="622" y="466" width="18" height="42" fill="#1F2D1F" />
          <rect x="607" y="316" width="14" height="18" fill="#C08D5E" />
        </g>
        <g className="bn-head">
          <circle cx="614" cy="296" r="24" fill="#C08D5E" />
          <path d="M590 294 Q 592 268 614 270 Q 636 268 638 294 Q 634 278 614 280 Q 594 278 590 294 Z" fill="#1F2D1F" />
          <path d="M598 312 Q 614 322 630 312 L 630 306 Q 614 314 598 306 Z" fill="#4A3A26" opacity="0.9" />
          <circle cx="606" cy="298" r="2.4" fill="#1F2D1F" />
          <circle cx="622" cy="298" r="2.4" fill="#1F2D1F" />
          <path d="M609 306 q5 3 10 0" stroke="#1F2D1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* foreground grass tufts */}
      <g stroke="#A5A57A" strokeWidth="2" strokeLinecap="round" opacity="0.7" fill="none">
        <path d="M40 522 q2 -14 6 -18 M48 522 q0 -12 -3 -20 M56 522 q3 -10 8 -14" />
        <path d="M712 522 q2 -14 6 -18 M720 522 q0 -12 -3 -20 M728 522 q3 -10 8 -14" />
      </g>
    </svg>
  );
};
