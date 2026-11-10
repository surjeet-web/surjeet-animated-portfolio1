import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const harness = vi.hoisted(() => ({
  cleanups: [] as (() => void)[],
  instances: [] as { destroy: ReturnType<typeof vi.fn>; start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn>; on: ReturnType<typeof vi.fn>; off: ReturnType<typeof vi.fn>; raf: ReturnType<typeof vi.fn> }[],
  observers: [] as { callback: () => void; disconnect: ReturnType<typeof vi.fn> }[],
  add: vi.fn(), remove: vi.fn(), update: vi.fn(), refresh: vi.fn(),
  paused: vi.fn(), contextAdd: vi.fn(), contextRevert: vi.fn(), mediaRevert: vi.fn(),
  mediaCleanups: [] as (() => void)[],
  triggers: [] as { isActive: boolean; onToggle: (state: { isActive: boolean }) => void }[],
}));

vi.mock('react', () => ({
  useEffect: (effect: () => (() => void) | void) => { const cleanup = effect(); if (cleanup) harness.cleanups.push(cleanup); },
  useRef: () => ({ current: null }),
}));
vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('lenis', () => ({ default: class {
  destroy = vi.fn(); start = vi.fn(); stop = vi.fn(); on = vi.fn(); off = vi.fn(); raf = vi.fn();
  constructor() { harness.instances.push(this); }
} }));
vi.mock('gsap', () => ({ gsap: {
  registerPlugin: vi.fn(), ticker: { add: harness.add, remove: harness.remove },
  context: () => ({ add: (fn: () => void) => { harness.contextAdd(); fn(); }, revert: harness.contextRevert }),
  matchMedia: () => ({
    add: (query: string, fn: (context: { add: (callback: () => void) => void }) => (() => void) | void) => {
      if (query !== '(prefers-reduced-motion: no-preference)') return;
      const cleanup = fn({ add: (callback) => callback() });
      if (cleanup) harness.mediaCleanups.push(cleanup);
    },
    revert: () => { harness.mediaRevert(); harness.mediaCleanups.splice(0).forEach((cleanup) => cleanup()); },
  }),
  timeline: () => ({ from: vi.fn(), fromTo: vi.fn() }),
  fromTo: () => ({ paused: harness.paused }),
} }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {
  update: harness.update, refresh: harness.refresh,
  create: (options: { onToggle: (state: { isActive: boolean }) => void }) => {
    const trigger = { isActive: false, onToggle: options.onToggle };
    harness.triggers.push(trigger);
    return trigger;
  },
} }));

import { SmoothScroll } from '../components/motion/smooth-scroll';
import { MotionObserver } from '../components/motion/motion-observer';

class Preference extends EventTarget {
  constructor(public matches: boolean) { super(); }
  set(matches: boolean) { this.matches = matches; this.dispatchEvent(new Event('change')); }
}
let motion: Preference;
let fine: Preference;
let browser: EventTarget;
let page: EventTarget & { hidden: boolean; body: { style: { overflow: string } }; documentElement: { dataset: Record<string, string> }; querySelectorAll: ReturnType<typeof vi.fn> };

beforeEach(() => {
  vi.clearAllMocks();
  harness.instances.length = 0; harness.observers.length = 0; harness.triggers.length = 0;
  motion = new Preference(false); fine = new Preference(true);
  browser = Object.assign(new EventTarget(), { matchMedia: (query: string) => query.includes('reduced-motion') ? motion : fine });
  page = Object.assign(new EventTarget(), {
    hidden: false, body: { style: { overflow: '' } }, documentElement: { dataset: {} as Record<string, string> },
    fonts: { ready: Promise.resolve() }, querySelector: vi.fn(() => null), querySelectorAll: vi.fn(() => [] as object[]),
  });
  vi.stubGlobal('window', browser); vi.stubGlobal('document', page);
  vi.stubGlobal('MutationObserver', class {
    disconnect = vi.fn(); observe = vi.fn();
    constructor(callback: () => void) { harness.observers.push({ callback, disconnect: this.disconnect }); }
  });
});
afterEach(() => {
  harness.cleanups.splice(0).forEach((cleanup) => cleanup());
  vi.unstubAllGlobals();
});

const mounted = () => vi.waitFor(() => expect(harness.instances.length).toBeGreaterThan(0));

describe('smooth-scroll lifecycle', () => {
  it('enables after initially reduced motion, destroys once, and re-enables', async () => {
    motion.matches = true;
    SmoothScroll();
    expect(harness.instances).toHaveLength(0);
    motion.set(false); await mounted();
    const first = harness.instances[0];
    motion.set(true);
    expect(first.destroy).toHaveBeenCalledTimes(1);
    expect(first.off).toHaveBeenCalledTimes(1);
    expect(harness.observers[0].disconnect).toHaveBeenCalledTimes(1);
    motion.set(false);
    await vi.waitFor(() => expect(harness.instances).toHaveLength(2));
    harness.cleanups.splice(0).forEach((cleanup) => cleanup());
    expect(first.destroy).toHaveBeenCalledTimes(1);
    expect(harness.instances[1].destroy).toHaveBeenCalledTimes(1);
    motion.set(false); fine.set(true);
    expect(harness.instances).toHaveLength(2);
  });

  it('preserves native touch and initializes a modal lock when a fine pointer appears', async () => {
    fine.matches = false; page.body.style.overflow = 'hidden';
    SmoothScroll(); expect(harness.instances).toHaveLength(0);
    fine.set(true); await mounted();
    expect(harness.instances[0].stop).toHaveBeenCalledTimes(1);
    page.body.style.overflow = ''; harness.observers[0].callback();
    expect(harness.instances[0].start).toHaveBeenCalledTimes(1);
    fine.set(false);
    expect(harness.instances[0].destroy).toHaveBeenCalledTimes(1);
  });

  it('rechecks preferences after asynchronous imports and never mounts after cleanup', async () => {
    SmoothScroll(); motion.set(true);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(harness.instances).toHaveLength(0);
    motion.set(false);
    harness.cleanups.splice(0).forEach((cleanup) => cleanup());
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(harness.instances).toHaveLength(0);
  });

  it('does not tick in a hidden document and removes its visibility listener on teardown', async () => {
    page.hidden = true; SmoothScroll(); await mounted();
    expect(harness.add).not.toHaveBeenCalled();
    page.hidden = false; page.dispatchEvent(new Event('visibilitychange'));
    expect(harness.add).toHaveBeenCalledTimes(1);
    const frame = harness.add.mock.calls[0][0] as (time: number) => void;
    frame(2); expect(harness.instances[0].raf).toHaveBeenCalledWith(2000);
    harness.cleanups.splice(0).forEach((cleanup) => cleanup());
    page.dispatchEvent(new Event('visibilitychange'));
    expect(harness.add).toHaveBeenCalledTimes(1);
  });
});

describe('decorative motion lifecycle', () => {
  it('starts offscreen loops paused and keeps them paused on visibility or user resume', async () => {
    page.querySelectorAll.mockImplementation((selector: string) => selector === '.marquee-track' ? [{ parentElement: { classList: { contains: () => false } } }] : []);
    MotionObserver();
    await vi.waitFor(() => expect(harness.triggers).toHaveLength(1));
    expect(harness.paused).toHaveBeenLastCalledWith(true);
    page.dispatchEvent(new Event('visibilitychange'));
    browser.dispatchEvent(new Event('studio:motion'));
    expect(harness.paused).toHaveBeenLastCalledWith(true);
    const trigger = harness.triggers[0]; trigger.isActive = true; trigger.onToggle(trigger);
    expect(harness.paused).toHaveBeenLastCalledWith(false);
    page.hidden = true; page.dispatchEvent(new Event('visibilitychange'));
    expect(harness.paused).toHaveBeenLastCalledWith(true);
    page.hidden = false; page.documentElement.dataset.motionPaused = 'true'; browser.dispatchEvent(new Event('studio:motion'));
    expect(harness.paused).toHaveBeenLastCalledWith(true);
    page.documentElement.dataset.motionPaused = 'false'; browser.dispatchEvent(new Event('studio:motion'));
    expect(harness.paused).toHaveBeenLastCalledWith(false);
    // Only reading progress belongs to the route context; reveals/loops belong to matchMedia.
    expect(harness.contextAdd).toHaveBeenCalledTimes(1);
    harness.cleanups.splice(0).forEach((cleanup) => cleanup());
    expect(harness.contextRevert).toHaveBeenCalledTimes(1);
    expect(harness.mediaRevert).toHaveBeenCalledTimes(1);
    harness.paused.mockClear();
    page.dispatchEvent(new Event('visibilitychange')); browser.dispatchEvent(new Event('studio:motion'));
    expect(harness.paused).not.toHaveBeenCalled();
  });
});
