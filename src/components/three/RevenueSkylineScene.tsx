"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ChannelRoiOutput, formatCurrency, Currency } from "@/lib/roi-engine";

interface RevenueSkylineSceneProps {
  channels: ChannelRoiOutput[];
  currency: Currency;
  maxRevenue?: number;
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

// Canonical channel order for 1:1 match between 3D bars and legend
export const CANONICAL_CHANNEL_ORDER = [
  "seo",
  "google-search",
  "meta-ads",
  "email-crm",
  "cro",
];

// Short channel label map
export const CHANNEL_LABELS: Record<string, string> = {
  seo: "SEO",
  "google-search": "Search",
  "meta-ads": "Paid Social",
  "email-crm": "Email",
  cro: "CRO",
};

// Normalization constants (in Three.js world units)
// H_MAX is calibrated so the tallest bar fits comfortably inside the camera frame with >25% headroom
export const MIN_H = 0.25;
export const H_MAX = 1.5;

export function getNormalizedHeight(revenue: number, maxActiveRevenue: number): number {
  if (maxActiveRevenue <= 0 || revenue <= 0) return MIN_H;
  return Math.max(MIN_H, (revenue / maxActiveRevenue) * H_MAX);
}

function CameraRig() {
  useFrame(({ camera }) => {
    camera.lookAt(0, 0.75, 0);
  });
  return null;
}

function SkylineBar({
  channel,
  index,
  total,
  targetHeight,
  currency,
  isHovered,
  onHover,
}: SkylineBarProps) {
  const columnRef = useRef<THREE.Mesh>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const currentHeight = useRef(MIN_H);

  // Position bars along X-axis centered around 0
  const spacing = 1.4;
  const startX = -((total - 1) * spacing) / 2;
  const x = startX + index * spacing;

  useFrame((_, delta) => {
    const target = Math.max(MIN_H, targetHeight);
    currentHeight.current = THREE.MathUtils.damp(currentHeight.current, target, 8, delta);

    if (columnRef.current) {
      columnRef.current.scale.set(1, currentHeight.current, 1);
      columnRef.current.position.y = currentHeight.current / 2;
    }
    if (capRef.current) {
      capRef.current.position.y = currentHeight.current + 0.04;
    }
  });

  const barWidth = 0.75;
  const barDepth = 0.75;

  return (
    <group position={[x, 0, 0]}>
      {/* Interactive Hit Area / Bar Group */}
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(channel.channelId);
        }}
        onPointerOut={() => onHover(null)}
      >
        {/* Channel Color Column Body */}
        <mesh ref={columnRef} position={[0, MIN_H / 2, 0]}>
          <boxGeometry args={[barWidth, 1, barDepth]} />
          <meshStandardMaterial
            color={channel.color}
            roughness={0.25}
            metalness={0.35}
            transparent
            opacity={isHovered ? 1.0 : 0.85}
            emissive={isHovered ? channel.color : "#000000"}
            emissiveIntensity={isHovered ? 0.35 : 0}
          />
        </mesh>

        {/* Burnished Gold Top Cap — constant thickness at top */}
        <mesh ref={capRef} position={[0, MIN_H + 0.04, 0]}>
          <boxGeometry args={[barWidth * 1.06, 0.08, barDepth * 1.06]} />
          <meshStandardMaterial
            color="#C8A25A"
            roughness={0.2}
            metalness={0.7}
            emissive={isHovered ? "#C8A25A" : "#000000"}
            emissiveIntensity={isHovered ? 0.3 : 0}
          />
        </mesh>
      </group>

      {/* Floating 3D HTML Tooltip on Hover — strictly framed inside canvas */}
      {isHovered && (
        <Html
          position={[0, Math.min(H_MAX + 0.35, targetHeight + 0.25), 0]}
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

// Glowing Gold Growth Arc Line across top of bars (clamped strictly inside frame)
function SkylineGrowthLine({
  channels,
  maxActiveRevenue,
}: {
  channels: ChannelRoiOutput[];
  maxActiveRevenue: number;
}) {
  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const spacing = 1.4;
    const startX = -((channels.length - 1) * spacing) / 2;

    channels.forEach((ch, idx) => {
      const x = startX + idx * spacing;
      const h = getNormalizedHeight(ch.revenue, maxActiveRevenue);
      // Top of cap is at h + 0.08; line sits just above at h + 0.12, clamped to H_MAX + 0.15
      const y = Math.min(H_MAX + 0.15, h + 0.12);
      pts.push(new THREE.Vector3(x, y, 0));
    });
    return pts;
  }, [channels, maxActiveRevenue]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  if (linePoints.length < 2) return null;

  return (
    <group>
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
      {/* Subtle glowing vertex markers on each bar top */}
      {linePoints.map((pt, i) => (
        <mesh key={i} position={[pt.x, pt.y, pt.z]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#E8D5A3" emissive="#C8A25A" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function RevenueSkylineScene({
  channels,
  currency,
  isVisible,
}: RevenueSkylineSceneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Keep bar order identical to canonical legend order
  const sortedChannels = useMemo(() => {
    return [...channels].sort((a, b) => {
      const idxA = CANONICAL_CHANNEL_ORDER.indexOf(a.channelId);
      const idxB = CANONICAL_CHANNEL_ORDER.indexOf(b.channelId);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }, [channels]);

  // Active peak revenue among sorted channels
  const maxActiveRevenue = useMemo(() => {
    if (sortedChannels.length === 0) return 0;
    return Math.max(...sortedChannels.map((c) => c.revenue), 1);
  }, [sortedChannels]);

  return (
    <div className="w-full flex flex-col rounded-2xl overflow-hidden border border-white/10">
      {/* Fixed-height 3D canvas container */}
      <div className="relative bg-[#0F1422]" style={{ height: "420px" }}>
        {/* Canvas Header Badge & Faint HTML Scale */}
        <div className="absolute top-4 left-6 z-10 flex items-center justify-between right-6 pointer-events-none">
          <div>
            <span className="text-[11px] font-mono text-[#C8A25A] uppercase tracking-wider block">
              3D Revenue Skyline
            </span>
            <span className="font-sans font-bold text-sm text-white">
              Real-Time Stage Synthesis
            </span>
          </div>
          <div className="flex items-center gap-2">
            {maxActiveRevenue > 0 && (
              <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 tabular-nums">
                Tallest bar = <span className="text-[#C8A25A] font-bold">{formatCurrency(maxActiveRevenue, currency)}</span>
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
              WebGL Primitives · DPR 1.5
            </span>
          </div>
        </div>

        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.4, 6.5], fov: 36 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0.75, 0);
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="w-full h-full"
        >
          <CameraRig />
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

          {/* Skyline Bars — strictly normalized so tallest bar fits camera with >25% headroom */}
          <group position={[0, 0, 0]}>
            {sortedChannels.map((ch, idx) => {
              const h = getNormalizedHeight(ch.revenue, maxActiveRevenue);
              return (
                <SkylineBar
                  key={ch.channelId}
                  channel={ch}
                  index={idx}
                  total={sortedChannels.length}
                  targetHeight={h}
                  currency={currency}
                  isHovered={hoveredId === ch.channelId}
                  onHover={setHoveredId}
                />
              );
            })}

            {/* Golden Skyline Growth Spline */}
            <SkylineGrowthLine channels={sortedChannels} maxActiveRevenue={maxActiveRevenue} />
          </group>
        </Canvas>
      </div>

      {/* HTML Legend row below canvas — matches exact 3D bar sequence and colors */}
      <div className="bg-[#0A0E18] border-t border-white/5 px-4 py-3 flex flex-wrap gap-3 justify-center">
        {sortedChannels.map((ch) => (
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
