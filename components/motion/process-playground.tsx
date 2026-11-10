'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import '../../styles/process-playground.css';

const stages = [
  { word: 'Idea', discipline: 'Strategy', title: 'Find the why', detail: 'The user. The workflow. The constraints.', offset: 72 },
  { word: 'Design', discipline: 'Design', title: 'Make it feel right', detail: 'User logic. Wireframes. UI design.', offset: 36 },
  { word: 'Build', discipline: 'Development', title: 'Bring it to life', detail: 'Implementation. Review. Validation.', offset: 0 },
] as const;

const connection = 'M24 95C125 95 130 25 245 25S360 145 470 145S595 25 710 25S810 95 876 95';

export function ProcessPlayground() {
  const id = useId();
  const [selection, setSelection] = useState({ index: 0, revision: 0 });
  const active = stages[selection.index];
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const accents = useRef<(HTMLSpanElement | null)[]>([]);
  const animations = useRef<Animation[]>([]);
  const reducedMotion = useRef(true);

  useEffect(() => {
    const scene = sceneRef.current;
    const tilt = tiltRef.current;
    if (!scene || !tilt) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;

    function resetTilt() {
      cancelAnimationFrame(frame);
      tilt?.style.setProperty('--process-tilt-x', '0deg');
      tilt?.style.setProperty('--process-tilt-y', '0deg');
    }
    function updatePreferences() {
      reducedMotion.current = motion.matches;
      if (motion.matches || !pointer.matches) resetTilt();
      if (motion.matches) {
        animations.current.forEach((animation) => animation.cancel());
        animations.current = [];
      }
    }
    function move(event: PointerEvent) {
      if (motion.matches || !pointer.matches || event.pointerType === 'touch' || !scene) return;
      const bounds = scene.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        tilt?.style.setProperty('--process-tilt-x', `${-y * 7}deg`);
        tilt?.style.setProperty('--process-tilt-y', `${x * 9}deg`);
      });
    }

    updatePreferences();
    scene.addEventListener('pointermove', move, { passive: true });
    scene.addEventListener('pointerleave', resetTilt);
    scene.addEventListener('pointercancel', resetTilt);
    motion.addEventListener('change', updatePreferences);
    pointer.addEventListener('change', updatePreferences);
    return () => {
      resetTilt();
      animations.current.forEach((animation) => animation.cancel());
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', resetTilt);
      scene.removeEventListener('pointercancel', resetTilt);
      motion.removeEventListener('change', updatePreferences);
      pointer.removeEventListener('change', updatePreferences);
    };
  }, []);

  useEffect(() => {
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    const layer = layers.current[selection.index];
    if (reducedMotion.current || !layer || typeof layer.animate !== 'function') return;

    // Only decorative layers move; process copy and keyboard focus remain stable.
    if (selection.revision > 0) {
      animations.current.push(layer.animate([
        { transform: 'translateY(35px) rotateY(-72deg) rotateX(12deg) scale(.88)', opacity: .25 },
        { transform: 'translateY(-9px) rotateY(8deg) rotateX(-3deg) scale(1.025)', opacity: 1, offset: .65 },
        { transform: 'translateY(0) rotateY(0) rotateX(0) scale(1)', opacity: 1 },
      ], { duration: 650, easing: 'cubic-bezier(.22,.75,.2,1)' }));
    }
    if (pathRef.current) {
      animations.current.push(pathRef.current.animate([
        { strokeDashoffset: '100' },
        { strokeDashoffset: String(active.offset) },
      ], { duration: 650, easing: 'cubic-bezier(.22,.75,.2,1)' }));
    }
    accents.current.forEach((accent, index) => {
      if (!accent) return;
      animations.current.push(accent.animate([
        { translate: '0 0', rotate: '0deg' },
        { translate: `${index % 2 ? -8 : 8}px -18px`, rotate: `${index % 2 ? -18 : 18}deg`, offset: .45 },
        { translate: '0 0', rotate: '0deg' },
      ], { duration: 2800 + index * 180, easing: 'ease-in-out' }));
    });
    // Bounded flourishes, not an endless autoplay loop. A selection replays them.
    return () => { animations.current.forEach((animation) => animation.cancel()); };
  }, [selection.index, selection.revision, active.offset]);

  function selectStage(index: number) {
    setSelection((previous) => ({ index, revision: previous.revision + 1 }));
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % stages.length; break;
      case 'ArrowLeft': next = (index + stages.length - 1) % stages.length; break;
      case 'Home': next = 0; break;
      case 'End': next = stages.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectStage(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="process-playground" data-stage={selection.index} aria-labelledby={`${id}-heading`}>
      <header className="process-playground__header">
        <p className="process-playground__eyebrow">How we get there</p>
        <p className="process-playground__invitation">Choose a step.<br />Watch it take shape.</p>
      </header>
      <h2 className="process-playground__heading" id={`${id}-heading`}>
        <span>Idea<span className="process-playground__heading-arrow" aria-hidden="true">↗</span></span>
        <span>Design<span className="process-playground__heading-arrow" aria-hidden="true">↗</span></span>
        <span>Build<span className="process-playground__heading-dot" aria-hidden="true">.</span></span>
      </h2>

      <div className="process-playground__body">
        <div className="process-playground__controls">
          <div className="process-playground__tabs" role="tablist" aria-label="Explore my process" aria-orientation="horizontal">
            {stages.map((stage, index) => (
              <button
                key={stage.word}
                ref={(node) => { tabs.current[index] = node; }}
                className="process-playground__tab"
                data-step={index}
                id={`${id}-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selection.index === index}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selection.index === index ? 0 : -1}
                onClick={() => selectStage(index)}
                onKeyDown={(event) => navigateTabs(event, index)}
              >
                <span className="process-playground__tab-number" aria-hidden="true">0{index + 1}</span>
                <span>{stage.word}</span>
                <span className="process-playground__tab-mark" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="process-playground__panels">
            {stages.map((stage, index) => (
              <div
                key={stage.word}
                className="process-playground__panel"
                id={`${id}-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${index}`}
                tabIndex={0}
                hidden={selection.index !== index}
              >
                <p className="process-playground__discipline">0{index + 1} / {stage.discipline}</p>
                <h3>{stage.title}<span aria-hidden="true">.</span></h3>
                <p className="process-playground__detail">{stage.detail}</p>
              </div>
            ))}
          </div>
          <p className="process-playground__hint">Click or tap to explore. Arrow keys work, too.</p>
        </div>

        <figure className="process-playground__figure">
          <div className="process-playground__scene" ref={sceneRef} aria-hidden="true">
            <span className="process-playground__orbit" />
            <span className="process-playground__accent process-playground__accent--star" ref={(node) => { accents.current[0] = node; }}>✳</span>
            <span className="process-playground__accent process-playground__accent--ring" ref={(node) => { accents.current[1] = node; }} />
            <span className="process-playground__accent process-playground__accent--square" ref={(node) => { accents.current[2] = node; }} />
            <div className="process-playground__tilt" ref={tiltRef}>
              <div className="process-playground__backplate process-playground__backplate--one" />
              <div className="process-playground__backplate process-playground__backplate--two" />
              {stages.map((stage, index) => (
                <div
                  key={stage.word}
                  className="process-playground__layer"
                  data-step={index}
                  ref={(node) => { layers.current[index] = node; }}
                  hidden={selection.index !== index}
                >
                  <div className="process-playground__browser">
                    <div className="process-playground__browser-bar"><i /><i /><i /><span /></div>
                    <div className="process-playground__mock-nav"><i /><span /><span /><b /></div>
                    <div className="process-playground__mock-hero">
                      <div className="process-playground__mock-copy"><i /><i /><i /><b /></div>
                      <div className="process-playground__mock-art"><span /><i /><b /></div>
                    </div>
                    <div className="process-playground__mock-grid"><i /><i /><i /></div>
                  </div>
                  <div className="process-playground__phone">
                    <span className="process-playground__phone-speaker" />
                    <div className="process-playground__phone-screen"><i /><span /><b /><i /><i /><em /></div>
                  </div>
                  <span className="process-playground__stage-stamp">{index === 0 ? 'WHY?' : index === 1 ? 'WHAT IF?' : 'LET’S GO.'}</span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="process-playground__caption">An interactive process sketch. Not a client project.</figcaption>
        </figure>
      </div>
      <svg className="process-playground__connection" viewBox="0 0 900 170" fill="none" aria-hidden="true">
        <path className="process-playground__connection-track" d={connection} />
        <path className="process-playground__connection-progress" ref={pathRef} d={connection} pathLength="100" strokeDasharray="100" strokeDashoffset={active.offset} />
        <circle cx="24" cy="95" r="7" /><circle cx="470" cy="145" r="7" /><circle cx="876" cy="95" r="7" />
      </svg>
    </section>
  );
}
