"use client";

import React, { useEffect, useRef } from "react";
import { useHeatmapStore } from "@/stores/heatmap";
import { useDelightStore } from "@/stores/delight";

export function AttentionHeatmap() {
  const isHeatmapActive = useHeatmapStore((s) => s.isHeatmapActive);
  const toggleHeatmap = useHeatmapStore((s) => s.toggleHeatmap);
  const reduceDelight = useDelightStore((s) => s.reduceDelight);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isHeatmapActive || reduceDelight) return;

    // Check touch devices
    if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Heat spots array
    const points: Array<{ x: number; y: number; radius: number; alpha: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        radius: 35,
        alpha: 0.35,
      });
      if (points.length > 250) points.shift();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId: number;
    const render = () => {
      // Clear with slight trailing fade
      ctx.clearRect(0, 0, width, height);

      // Render heat trail
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.alpha *= 0.985; // gradual decay

        if (p.alpha > 0.01) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          // Sapphire core to gold halo
          grad.addColorStop(0, `rgba(200, 162, 90, ${p.alpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(37, 99, 235, ${p.alpha * 0.6})`);
          grad.addColorStop(1, "rgba(11, 15, 25, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [isHeatmapActive, reduceDelight]);

  if (!isHeatmapActive || reduceDelight) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9994] mix-blend-screen opacity-90 transition-opacity duration-300"
      />
      {/* Floating active pill badge */}
      <div className="fixed bottom-6 right-6 z-[9996] flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#131928]/95 border border-[#C8A25A]/40 backdrop-blur-md shadow-xl text-xs font-mono text-[#E8D5A3]">
        <span className="w-2 h-2 rounded-full bg-[#C8A25A] animate-ping" />
        <span>Heatmap Active (Desktop)</span>
        <button
          onClick={toggleHeatmap}
          className="ml-2 hover:text-white transition-colors cursor-pointer text-slate-400"
          title="Turn off heatmap"
        >
          ✕
        </button>
      </div>
    </>
  );
}
