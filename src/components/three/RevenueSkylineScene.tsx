"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ChannelRoiOutput, formatCurrency, Currency } from "@/lib/roi-engine";

interface RevenueSkylineSceneProps {
  channels: ChannelRoiOutput[];
  currency: Currency;
  maxRevenue: number;
  isVisible: boolean;
}

interface SkylineBarProps {
  channel: ChannelRoiOutput;
  index: number;
  total: number;
  targetHeight: number;
  currency: Currency;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

// Short channel label map for the HTML legend
const CHANNEL_LABELS: Record<string, string> = {
  seo: "SEO",
  "google-search": "Search",
  "meta-ads": "Paid Social",
  "email-crm": "Email",
  cro: "CRO",
};

function SkylineBar({
  channel,
  index,
  total,
  targetHeight,
  currency,
  isHovered,
  onHover,
}: SkylineBarProps) {
  const meshRef = useRef<THREE.Group>(null);
  const currentHeight = useRef(0.1);

  // Position bars along X-axis centered around 0
  const spacing = 1.35;
  const startX = -((total - 1) * spacing) / 2;
  const x = startX + index * spacing;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = Math.max(0.2, targetHeight);
    currentHeight.current = THREE.MathUtils.damp(currentHeight.current, target, 8, delta);
    meshRef.current.scale.set(1, currentHeight.current, 1);
  });

  const barWidth = 0.7;
  const barDepth = 0.7;

  return (
    <group position={[x, 0, 0]}>
      {/* Dynamic Animated Bar Group */}
      <group
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(channel.channelId);
        }}
        onPointerOut={() => onHover(null)}
      >
        {/* Sapphire Column Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[barWidth, 1, barDepth]} />
          <meshStandardMaterial
            color={isHovered ? "#3B82F6" : "#2563EB"}
            roughness={0.25}
            metalness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Burnished Gold Top Cap */}
        <mesh position={[0, 1.02, 0]}>
          <boxGeometry args={[barWidth * 1.05, 0.08, barDepth * 1.05]} />
          <meshStandardMaterial
            color="#C8A25A"
            roughness={0.2}
            metalness={0.65}
          />
        </mesh>
      </group>

      {/* Floating 3D HTML Tooltip on Hover — no ground labels */}
      {isHovered && (
        <Html
          position={[0, Math.max(1.5, targetHeight + 0.6), 0]}
          center
          distanceFactor={10}
        >
          <div className="pointer-events-none p-3 rounded-xl bg-[#0B0F19]/95 border border-[#C8A25A]/60 shadow-2xl backdrop-blur-md min-w-[170px] text-center space-y-1">
            <span className="text-[10px] font-mono text-[#C8A25A] uppercase tracking-wider block font-bold">
              {CHANNEL_LABELS[channel.channelId] ?? channel.channelId.toUpperCase()}
            </span>
            <div className="font-mono text-base font-extrabold text-white">
              {formatCurrency(channel.revenue, currency)}
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-300 pt-1 border-t border-white/10">
              <span>Leads: {channel.leads}</span>
              <span>ROAS: {channel.roas}x</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Glowing Gold Growth Arc Line across top of bars
function SkylineGrowthLine({
  channels,
  maxRevenue,
}: {
  channels: ChannelRoiOutput[];
  maxRevenue: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const spacing = 1.35;
    const startX = -((channels.length - 1) * spacing) / 2;

    channels.forEach((ch, idx) => {
      const x = startX + idx * spacing;
      const height = maxRevenue > 0 ? (ch.revenue / maxRevenue) * 3.5 : 0.2;
      pts.push(new THREE.Vector3(x, Math.max(0.2, height) + 0.08, 0));
    });
    return pts;
  }, [channels, maxRevenue]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  if (points.length < 2) return null;

  return (
    <primitive
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: new THREE.Color("#E8D5A3"),
            linewidth: 2,
          })
        )
      }
    />
  );
}

export function RevenueSkylineScene({
  channels,
  currency,
  maxRevenue,
  isVisible,
}: RevenueSkylineSceneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Short label map
  const CHANNEL_LABELS: Record<string, string> = {
    seo: "SEO",
    "google-search": "Search",
    "meta-ads": "Paid Social",
    "email-crm": "Email",
    cro: "CRO",
  };

  return (
    <div className="w-full flex flex-col rounded-2xl overflow-hidden border border-white/10">
      {/* Fixed-height 3D canvas container */}
      <div className="relative bg-[#0F1422]" style={{ height: "420px" }}>
        {/* Canvas Header Badge */}
        <div className="absolute top-4 left-6 z-10 flex items-center justify-between right-6 pointer-events-none">
          <div>
            <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider block">
              3D Revenue Skyline
            </span>
            <span className="font-sans font-bold text-sm text-white">
              Real-Time Stage Synthesis
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            WebGL Primitives · DPR 1.5
          </span>
        </div>

        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.8, 7.5], fov: 40 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FAF9F6" />
          <pointLight position={[-4, 4, -2]} intensity={0.6} color="#60A5FA" />

          {/* Stage Grid & Base */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[14, 10]} />
            <meshStandardMaterial
              color="#0A0E18"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          <gridHelper args={[14, 14, "#C8A25A", "#1E293B"]} position={[0, 0, 0]} />

          {/* Skyline Bars */}
          <group position={[0, 0, 0]}>
            {channels.map((ch, idx) => {
              const height = maxRevenue > 0 ? (ch.revenue / maxRevenue) * 3.5 : 0.2;
              return (
                <SkylineBar
                  key={ch.channelId}
                  channel={ch}
                  index={idx}
                  total={channels.length}
                  targetHeight={height}
                  currency={currency}
                  isHovered={hoveredId === ch.channelId}
                  onHover={setHoveredId}
                />
              );
            })}

            {/* Golden Skyline Growth Spline */}
            <SkylineGrowthLine channels={channels} maxRevenue={maxRevenue} />
          </group>
        </Canvas>
      </div>

      {/* HTML Legend row below canvas — no overlapping 3D text */}
      <div className="bg-[#0A0E18] border-t border-white/5 px-4 py-3 flex flex-wrap gap-3 justify-center">
        {channels.map((ch) => (
          <div key={ch.channelId} className="flex items-center gap-2 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: ch.color }}
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono text-slate-300 whitespace-nowrap">
              {CHANNEL_LABELS[ch.channelId] ?? ch.channelId}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#C8A25A] tabular-nums whitespace-nowrap">
              {formatCurrency(ch.revenue, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
