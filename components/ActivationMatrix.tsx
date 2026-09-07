"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const GRID = 24;
const CELLS = GRID * GRID;
const DIGITS = ["7", "3", "0", "9", "4", "1", "8", "5", "2", "6"];
const HOLD_MS = 3400;

/** Rasterise a digit onto the grid: the same 2-D array of intensities a
 *  convolutional model would be handed as input. */
function glyphField(digit: string): Float32Array {
  const field = new Float32Array(CELLS);
  const canvas = document.createElement("canvas");
  canvas.width = GRID;
  canvas.height = GRID;
  const ctx = canvas.getContext("2d");
  if (!ctx) return field;

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${Math.round(GRID * 0.94)}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText(digit, GRID / 2, GRID / 2 + 1);

  const { data } = ctx.getImageData(0, 0, GRID, GRID);
  for (let i = 0; i < CELLS; i += 1) field[i] = data[i * 4 + 3] / 255;
  return field;
}

/** Pre-mixed colour ramps: cheaper than building rgba strings 1,152 times a frame. */
const STEPS = 32;
const DIM: string[] = [];
const HOT: string[] = [];
for (let i = 0; i <= STEPS; i += 1) {
  const t = i / STEPS;
  DIM.push(`rgba(237,234,227,${(0.035 + t * 0.14).toFixed(3)})`);
  HOT.push(`rgba(242,179,61,${(0.2 + t * 0.72).toFixed(3)})`);
}

/**
 * The page's signature: a live intensity grid. Cells breathe on ambient noise,
 * a digit resolves out of them every few seconds, and the pointer warms the
 * cells it passes over. It is a visualization, not a running model — the label
 * under it says so.
 */
export function ActivationMatrix() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState(DIGITS[0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const current = new Float32Array(CELLS);
    const seeds = new Float32Array(CELLS);
    for (let i = 0; i < CELLS; i += 1) seeds[i] = Math.random() * Math.PI * 2;

    let digitIndex = 0;
    let target = glyphField(DIGITS[digitIndex]);
    let pointer: { x: number; y: number } | null = null;

    const paint = (time: number) => {
      const cell = width / GRID;
      const size = cell * 0.66;
      const inset = (cell - size) / 2;
      ctx.clearRect(0, 0, width, height);

      for (let y = 0; y < GRID; y += 1) {
        for (let x = 0; x < GRID; x += 1) {
          const i = y * GRID + x;

          const ambient =
            0.055 + 0.045 * Math.sin(time * 0.00085 + seeds[i] + x * 0.16 + y * 0.11);

          let boost = 0;
          if (pointer) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3.4) boost = (1 - dist / 3.4) * 0.6;
          }

          const goal = Math.min(1, ambient + target[i] * 0.9 + boost);
          current[i] += (goal - current[i]) * (reduced ? 1 : 0.1);

          const v = current[i];
          const px = x * cell + inset;
          const py = y * cell + inset;

          if (v < 0.17) {
            ctx.fillStyle = DIM[Math.round((v / 0.17) * STEPS)];
            ctx.fillRect(px, py, size, size);
          } else {
            const t = Math.min(1, (v - 0.17) / 0.83);
            ctx.fillStyle = HOT[Math.round(t * STEPS)];
            ctx.fillRect(px, py, size, size);
            if (v > 0.6) {
              ctx.fillStyle = `rgba(242,179,61,${((v - 0.6) * 0.09).toFixed(3)})`;
              ctx.fillRect(px - cell * 0.4, py - cell * 0.4, size + cell * 0.8, size + cell * 0.8);
            }
          }
        }
      }
    };

    resize();

    /* Reduced motion: resolve the first digit and stop. No loop, no shimmer. */
    if (reduced) {
      paint(0);
      const observer = new ResizeObserver(() => {
        resize();
        paint(0);
      });
      observer.observe(wrap);
      return () => observer.disconnect();
    }

    let frame = 0;
    let lastPaint = 0;
    let lastSwap = 0;
    let visible = true;

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (time - lastPaint < 32) return; // ~30fps is plenty for a 24×24 field
      lastPaint = time;

      if (time - lastSwap > HOLD_MS) {
        lastSwap = time;
        digitIndex = (digitIndex + 1) % DIGITS.length;
        target = glyphField(DIGITS[digitIndex]);
        setReadout(DIGITS[digitIndex]);
      }

      paint(time);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * GRID,
        y: ((event.clientY - rect.top) / rect.height) * GRID,
      };
    };
    const onPointerLeave = () => {
      pointer = null;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return (
    <figure className="panel relative overflow-hidden p-4 sm:p-5">
      {/* corner annotations, like the margins of a plot */}
      <div className="flex items-center justify-between pb-3">
        <span className="label">activation_map</span>
        <span className="label">
          {GRID}×{GRID} · float32
        </span>
      </div>

      <div ref={wrapRef} className="relative aspect-square w-full touch-none">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      </div>

      {/* class-index readout: which digit the grid is currently drawing */}
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
        <div className="flex items-end gap-1.5" aria-hidden="true">
          {DIGITS.slice()
            .sort()
            .map((digit) => {
              const on = digit === readout;
              return (
                <span
                  key={digit}
                  className={`flex flex-col items-center gap-1.5 font-mono text-[10px] transition-colors duration-500 ${
                    on ? "text-amber" : "text-faint/70"
                  }`}
                >
                  <span
                    className={`w-[3px] rounded-[1px] transition-all duration-500 ${
                      on ? "h-4 bg-amber" : "h-1.5 bg-white/12"
                    }`}
                  />
                  {digit}
                </span>
              );
            })}
        </div>
        <figcaption className="demo-tag">
          {reduced ? "static view" : "ambient visualization"}
        </figcaption>
      </div>

      <p className="sr-only">
        A decorative 24 by 24 intensity grid. Cells brighten to form a handwritten digit, echoing
        the pixel input of the NUMX digit-recognition project. It is an illustration, not a live
        model.
      </p>
    </figure>
  );
}
