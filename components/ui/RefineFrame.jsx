'use client';

import { useEffect, useRef, useState } from 'react';
import './RefineFrame.css';

function Tick02Icon({ size = 13, strokeWidth = 2.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Alert02Icon({ size = 13, strokeWidth = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function Loading03Icon({ size = 13, strokeWidth = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function RefreshIcon({ size = 14, strokeWidth = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

const HugeiconsIcon = ({ icon: Icon, size, strokeWidth }) => <Icon size={size} strokeWidth={strokeWidth} />;

const STAGES = {
  queued: { blur: 4, sat: 0.6, scale: 1.04, opacity: 0.55 },
  generating: { blur: 1.5, sat: 0.8, scale: 1.02, opacity: 0.85 },
  refining: { blur: 0.5, sat: 0.95, scale: 1.005, opacity: 1 },
  complete: { blur: 0, sat: 1, scale: 1, opacity: 1 },
  error: { blur: 2, sat: 0.5, scale: 1, opacity: 0.28 }
};
const TARGET = { queued: 0, generating: 0.5, refining: 0.875, complete: 1 };
const LEVELS = [48, 32, 20, 12, 8, 5, 3, 2, 1];
const EDGE = 28;
const STRIPS = 14;
const DEFAULT_LABELS = {
  queued: 'Queued',
  generating: 'Generating',
  refining: 'Refining',
  complete: 'Ready',
  error: 'Failed'
};
const ACTIVE = new Set(['queued', 'generating', 'refining']);

const build = (s, canvas, img, dpr) => {
  const rect = canvas.getBoundingClientRect();
  const W = Math.max(1, Math.round(rect.width * dpr));
  const H = Math.max(1, Math.round(rect.height * dpr));
  const key = `${img.currentSrc || img.src}|${W}x${H}`;
  if (s.key === key) return;
  s.key = key;
  s.w = W;
  s.h = H;
  canvas.width = W;
  canvas.height = H;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cover = Math.max(W / iw, H / ih);
  const sw = W / cover;
  const sh = H / cover;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  const glint = canvas.getContext('2d')?.createLinearGradient(0, 0, W, 0) ?? null;
  if (glint) {
    for (const [at, a] of [
      [0, 0],
      [0.08, 0.1],
      [0.2, 0.7],
      [0.32, 1],
      [0.68, 1],
      [0.8, 0.7],
      [0.92, 0.1],
      [1, 0]
    ]) {
      glint.addColorStop(at, `rgba(255, 255, 255, ${a})`);
    }
  }
  s.glint = glint;
  s.levels = LEVELS.map(block => {
    const b = block === 1 ? 1 : Math.max(2, Math.round(block * dpr));
    const full = document.createElement('canvas');
    full.width = W;
    full.height = H;
    const fc = full.getContext('2d');
    if (!fc) return full;
    if (b === 1) {
      fc.imageSmoothingEnabled = true;
      fc.imageSmoothingQuality = 'high';
      try {
        fc.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      } catch {}
      return full;
    }
    const small = document.createElement('canvas');
    small.width = Math.max(1, Math.round(W / b));
    small.height = Math.max(1, Math.round(H / b));
    const sc = small.getContext('2d');
    if (sc) {
      sc.imageSmoothingEnabled = true;
      sc.imageSmoothingQuality = 'high';
      try {
        sc.drawImage(img, sx, sy, sw, sh, 0, 0, small.width, small.height);
      } catch {}
    }
    fc.imageSmoothingEnabled = false;
    try {
      fc.drawImage(small, 0, 0, W, H);
    } catch {}
    return full;
  });
};

export default function RefineFrame({
  status = 'complete',
  children,
  aspectRatio = '1 / 1',
  width = 320,
  radius = 16,
  background = 'oklch(0.12 0.02 345)',
  color = '#f5f5f5',
  stageDuration = 400,
  sweep = true,
  showStatus = true,
  hideAfter = 1200,
  labels = DEFAULT_LABELS,
  retryLabel = 'Retry',
  onRetry,
  className = ''
}) {
  const stage = STAGES[status] ?? STAGES.complete;
  const active = ACTIVE.has(status);
  const text = { ...DEFAULT_LABELS, ...labels };
  const printRef = useRef(null);
  const canvasRef = useRef(null);
  const sim = useRef({ p: 0, raf: 0, last: 0, key: '', w: 0, h: 0, levels: [], glint: null, sent: false });
  const live = useRef({});
  live.current = { status, stageDuration, sweep, reduce: false };
  const [mosaic, setMosaic] = useState(false);
  const [resolved, setResolved] = useState(false);

  const [chip, setChip] = useState(showStatus);
  const timer = useRef(undefined);
  useEffect(() => {
    clearTimeout(timer.current);
    if (!showStatus) {
      setChip(false);
      return undefined;
    }
    setChip(true);
    if (status === 'complete' && hideAfter > 0) {
      timer.current = setTimeout(() => setChip(false), hideAfter);
    }
    return () => clearTimeout(timer.current);
  }, [status, showStatus, hideAfter]);

  const tick = now => {
    const s = sim.current;
    const c = live.current;
    const canvas = canvasRef.current;
    const img = printRef.current?.querySelector('img');
    if (!canvas || !img || !img.naturalWidth) {
      s.raf = 0;
      return;
    }
    const dt = Math.min(0.05, s.last ? (now - s.last) / 1000 : 0.016);
    s.last = now;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    build(s, canvas, img, dpr);
    const n = s.levels.length - 1;
    const target = TARGET[c.status] ?? s.p;
    const rate = c.reduce ? 1e9 : 1 / (n * (c.stageDuration / 1000));
    const step = rate * dt;
    if (target < s.p) s.p = target;
    else if (target - s.p <= step) s.p = target;
    else s.p += step;
    const ctx = canvas.getContext('2d');
    if (ctx && s.levels && s.levels.length > 0) {
      const L = s.p * n;
      const i = Math.min(n, Math.floor(L + 1e-6));
      const frac = L - i;
      ctx.globalAlpha = 1;
      if (s.levels[i]) ctx.drawImage(s.levels[i], 0, 0);
      if (i < n && frac > 0 && s.levels[i + 1]) {
        const edge = EDGE * dpr;
        const front = frac * (s.h + edge) - edge / 2;
        const top = Math.max(0, Math.floor(front - edge / 2));
        if (top > 0) ctx.drawImage(s.levels[i + 1], 0, 0, s.w, top, 0, 0, s.w, top);
        const sh = edge / STRIPS;
        for (let k = 0; k < STRIPS; k += 1) {
          const y = front - edge / 2 + k * sh;
          if (y + sh <= 0 || y >= s.h) continue;
          const t = 1 - (k + 0.5) / STRIPS;
          ctx.globalAlpha = t * t * (3 - 2 * t);
          const y0 = Math.max(0, y);
          const h0 = Math.min(s.h, y + sh) - y0;
          if (h0 > 0) ctx.drawImage(s.levels[i + 1], 0, y0, s.w, h0, 0, y0, s.w, h0);
        }
        ctx.globalAlpha = 1;
        if (c.sweep && !c.reduce && s.glint && front > 0 && front < s.h) {
          ctx.fillStyle = s.glint;
          ctx.globalAlpha = 0.12;
          ctx.fillRect(0, front - 2 * dpr, s.w, 4 * dpr);
          ctx.globalAlpha = 0.3;
          ctx.fillRect(0, front - dpr, s.w, 2 * dpr);
          ctx.globalAlpha = 1;
        }
      }
    }
    const done = s.p >= 1;
    if (done !== s.sent) {
      s.sent = done;
      setResolved(done);
    }
    const keep = (!c.reduce && ACTIVE.has(c.status)) || Math.abs(target - s.p) > 0.0005;
    s.raf = keep ? requestAnimationFrame(tick) : 0;
    if (!keep) s.last = 0;
  };
  const wake = () => {
    const s = sim.current;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      live.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const img = printRef.current?.querySelector('img');
    if (!img) {
      setMosaic(false);
      return undefined;
    }
    let gone = false;
    const start = () => {
      if (gone) return;
      setMosaic(true);
      wake();
    };
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });
    return () => {
      gone = true;
      img.removeEventListener('load', start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, status]);

  useEffect(() => {
    wake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, width, aspectRatio]);

  useEffect(() => {
    const s = sim.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  return (
    <div
      className={`refine-frame${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={text[status] ?? status}
      aria-busy={active || undefined}
      data-status={status}
      data-active={active ? '' : undefined}
      data-sweep={sweep && active ? '' : undefined}
      data-mosaic={mosaic ? '' : undefined}
      data-resolved={mosaic && resolved ? '' : undefined}
      style={{
        '--rf-w': `${width}px`,
        '--rf-aspect': aspectRatio,
        '--rf-radius': `${radius}px`,
        '--rf-bg': background,
        '--rf-ink': color,
        '--rf-stage': `${stageDuration}ms`,
        '--rf-blur': `${mosaic ? 0 : stage.blur}px`,
        '--rf-sat': stage.sat,
        '--rf-scale': mosaic ? 1 : stage.scale,
        '--rf-opacity': stage.opacity
      }}
    >
      <div className="refine-frame__media" aria-hidden="true">
        <div ref={printRef} className="refine-frame__print">
          {children}
        </div>
        <canvas ref={canvasRef} className="refine-frame__mosaic" />
      </div>
      <div className="refine-frame__sweep" aria-hidden="true" />
      {chip ? (
        <div className="refine-frame__chip" aria-hidden="true">
          <span className="refine-frame__mark" data-kind={active ? 'spin' : status}>
            {status === 'complete' ? (
              <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.5} />
            ) : status === 'error' ? (
              <HugeiconsIcon icon={Alert02Icon} size={13} strokeWidth={2.2} />
            ) : (
              <HugeiconsIcon icon={Loading03Icon} size={13} strokeWidth={2.2} />
            )}
          </span>
          <span key={status} className="refine-frame__label">
            {text[status] ?? status}
          </span>
        </div>
      ) : null}
      {status === 'error' && onRetry ? (
        <button type="button" className="refine-frame__retry" onClick={onRetry}>
          <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2.2} />
          <span>{retryLabel}</span>
        </button>
      ) : null}
      <span className="refine-frame__sr" role="status">
        {text[status] ?? status}
      </span>
    </div>
  );
}
