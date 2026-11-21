"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  isLaunched: boolean;
}

interface FloatingItem {
  id: number;
  initialY: number;
  xOffset: number;
  zOffset: number;
  speed: number;
  rotationSpeed: number;
}

export function HeroScene({ isLaunched }: HeroSceneProps) {
  const funnelGroupRef = useRef<THREE.Group>(null);
  const megaphoneRef = useRef<THREE.Group>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const coinGroupRef = useRef<THREE.Group>(null);
  const objectsGroupRef = useRef<THREE.Group>(null);

  // 6 distinct floating marketing objects
  const items = useMemo<FloatingItem[]>(() => {
    return [
      { id: 0, initialY: 3.4, xOffset: -0.65, zOffset: 0.15, speed: 0.019, rotationSpeed: 0.02 },  // Heart
      { id: 1, initialY: 4.5, xOffset: 0.6, zOffset: -0.2, speed: 0.021, rotationSpeed: 0.022 },   // Share arrow
      { id: 2, initialY: 5.6, xOffset: -0.35, zOffset: -0.4, speed: 0.018, rotationSpeed: 0.018 }, // Cursor click
      { id: 3, initialY: 6.7, xOffset: 0.45, zOffset: 0.35, speed: 0.02, rotationSpeed: 0.02 },    // Envelope
      { id: 4, initialY: 7.8, xOffset: -0.55, zOffset: 0.45, speed: 0.022, rotationSpeed: 0.025 }, // Magnifier
      { id: 5, initialY: 8.9, xOffset: 0.25, zOffset: -0.35, speed: 0.019, rotationSpeed: 0.02 },  // Shopping bag
    ];
  }, []);

  // Track runtime animations
  const runtimeState = useRef({
    shockwaveScale: 0.2,
    shockwaveOpacity: 0,
    coinY: -1.3,
    positions: items.map((it) => it.initialY),
  });

  useFrame((state, delta) => {
    const mult = isLaunched ? 2.5 : 1.0;
    const st = runtimeState.current;

    // 1. Funnel Idle & Accelerated Spin
    if (funnelGroupRef.current) {
      funnelGroupRef.current.rotation.y += (0.007 + (isLaunched ? 0.022 : 0)) * (delta * 60);
    }

    // 2. Megaphone Pulse & Shockwave on Launch
    if (megaphoneRef.current) {
      if (isLaunched) {
        const pulse = Math.sin(state.clock.elapsedTime * 12) * 0.12;
        megaphoneRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
      } else {
        megaphoneRef.current.scale.set(1, 1, 1);
      }
    }

    if (shockwaveRef.current) {
      if (isLaunched) {
        st.shockwaveScale += 0.08;
        if (st.shockwaveScale > 4.2) {
          st.shockwaveScale = 0.5;
        }
        st.shockwaveOpacity = Math.max(0, 1 - st.shockwaveScale / 4.2);
        shockwaveRef.current.scale.set(st.shockwaveScale, st.shockwaveScale, st.shockwaveScale);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = st.shockwaveOpacity * 0.75;
      } else {
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0;
      }
    }

    // 3. Falling Marketing Objects through Funnel
    if (objectsGroupRef.current) {
      const children = objectsGroupRef.current.children;
      for (let i = 0; i < items.length; i++) {
        const child = children[i];
        if (!child) continue;

        st.positions[i] -= items[i].speed * mult * (delta * 60);
        const currY = st.positions[i];

        if (currY < -0.75) {
          // Object passed through spout: reset above top
          st.positions[i] = 3.6 + Math.random() * 1.5;
          st.coinY = -1.0;
        }

        // Converge toward center as it enters funnel neck
        let progressToNeck = 1;
        if (currY < 1.6 && currY > -0.75) {
          progressToNeck = Math.max(0.12, (currY + 0.75) / 2.35);
        }

        child.position.y = currY;
        child.position.x = items[i].xOffset * progressToNeck;
        child.position.z = items[i].zOffset * progressToNeck;

        const s = Math.max(0.3, Math.min(1.1, progressToNeck * 1.1));
        child.scale.set(s, s, s);

        child.rotation.x += items[i].rotationSpeed * mult;
        child.rotation.y += items[i].rotationSpeed * 1.2 * mult;
      }
    }

    // 4. Dropping Gold Conversion Coin
    if (coinGroupRef.current) {
      st.coinY -= 0.03 * mult * (delta * 60);
      if (st.coinY < -1.8) {
        st.coinY = -0.85;
      }
      coinGroupRef.current.position.y = st.coinY;
      coinGroupRef.current.rotation.y += 0.04 * mult;
      coinGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <>
      {/* Lighting Setup: Sapphire & Gold Ambient */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#FAF9F6" />
      <directionalLight position={[-5, 3, -3]} intensity={1.3} color="#3B6FE0" />
      <pointLight position={[0, -0.8, 3]} intensity={2.0} color="#C8A25A" />
      <pointLight position={[0, 0.4, -2.5]} intensity={2.2} color="#3B6FE0" />

      {/* Orbit Controls with strict bounds */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.7}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        dampingFactor={0.05}
      />

      {/* SCALED ROOT GROUP: Guarantees ~10% padding with zero clipping */}
      <group scale={[0.82, 0.82, 0.82]} position={[0, -0.05, 0]}>
        
        {/* Soft Radial Backlight Glow behind Funnel */}
        <mesh position={[0, 0.4, -1.2]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial
            color="#2563EB"
            transparent={true}
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* CENTERPIECE: Translucent Sapphire Faceted Glass Funnel */}
        <group ref={funnelGroupRef} position={[0, 0.1, 0]}>
          {/* Top Conical Hopper (Translucent Sapphire #3B6FE0) */}
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[1.9, 0.6, 1.85, 10, 1, false]} />
            <meshStandardMaterial
              color="#3B6FE0"
              roughness={0.15}
              metalness={0.2}
              transparent={true}
              opacity={0.7}
              flatShading={true}
            />
          </mesh>

          {/* Facet Light-Blue Edge Highlights (#60A5FA) */}
          <lineSegments position={[0, 0.9, 0]}>
            <edgesGeometry args={[new THREE.CylinderGeometry(1.9, 0.6, 1.85, 10, 1, false)]} />
            <lineBasicMaterial color="#60A5FA" transparent={true} opacity={0.55} linewidth={1.5} />
          </lineSegments>

          {/* Golden Rim on Funnel Top */}
          <mesh position={[0, 1.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.92, 0.045, 12, 32]} />
            <meshStandardMaterial color="#C8A25A" metalness={0.92} roughness={0.18} />
          </mesh>

          {/* Funnel Stem / Discharge Tube */}
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.5, 0.45, 0.85, 10, 1, false]} />
            <meshStandardMaterial
              color="#3B6FE0"
              roughness={0.2}
              metalness={0.2}
              transparent={true}
              opacity={0.65}
              flatShading={true}
            />
          </mesh>

          {/* Stem Facet Edge Highlights */}
          <lineSegments position={[0, -0.45, 0]}>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.5, 0.45, 0.85, 10, 1, false)]} />
            <lineBasicMaterial color="#60A5FA" transparent={true} opacity={0.5} />
          </lineSegments>

          {/* Stem Golden Bottom Rim */}
          <mesh position={[0, -0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.48, 0.035, 10, 24]} />
            <meshStandardMaterial color="#C8A25A" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>

        {/* FLOATING MARKETING OBJECTS: Scaled up & clearly recognizable with emissive glow */}
        <group ref={objectsGroupRef}>
          {/* 0. Like Heart (Coral #FB7185, Engagement) */}
          <group position={[items[0].xOffset, items[0].initialY, items[0].zOffset]}>
            <mesh position={[-0.2, 0.2, 0]}>
              <sphereGeometry args={[0.28, 14, 14]} />
              <meshStandardMaterial color="#FB7185" emissive="#FB7185" emissiveIntensity={0.35} roughness={0.3} />
            </mesh>
            <mesh position={[0.2, 0.2, 0]}>
              <sphereGeometry args={[0.28, 14, 14]} />
              <meshStandardMaterial color="#FB7185" emissive="#FB7185" emissiveIntensity={0.35} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[0.45, 0.65, 14]} />
              <meshStandardMaterial color="#FB7185" emissive="#FB7185" emissiveIntensity={0.35} roughness={0.3} />
            </mesh>
          </group>

          {/* 1. Share Arrow (Sky Blue #38BDF8, Virality) */}
          <group position={[items[1].xOffset, items[1].initialY, items[1].zOffset]}>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <coneGeometry args={[0.38, 0.75, 14]} />
              <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.35} metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh position={[-0.25, -0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.13, 0.13, 0.5, 10]} />
              <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.3} metalness={0.4} roughness={0.3} />
            </mesh>
          </group>

          {/* 2. Cursor Click Pointer (Pure White #FFFFFF, CTR) */}
          <group position={[items[2].xOffset, items[2].initialY, items[2].zOffset]}>
            <mesh rotation={[0, 0, Math.PI / 6]}>
              <coneGeometry args={[0.35, 0.8, 4]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} roughness={0.2} />
            </mesh>
          </group>

          {/* 3. Email Envelope (Ivory & Gold, Retention CRM) */}
          <group position={[items[3].xOffset, items[3].initialY, items[3].zOffset]}>
            <mesh>
              <boxGeometry args={[0.8, 0.52, 0.1]} />
              <meshStandardMaterial color="#FAF9F6" emissive="#FAF9F6" emissiveIntensity={0.25} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.08, 0.06]} rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[0.35, 0.28, 3]} />
              <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.35} metalness={0.8} roughness={0.25} />
            </mesh>
          </group>

          {/* 4. Magnifier Search (Champagne Gold #C8A25A, Organic Search) */}
          <group position={[items[4].xOffset, items[4].initialY, items[4].zOffset]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.34, 0.075, 14, 28]} />
              <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.35} metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0.28, -0.28, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.065, 0.065, 0.45, 10]} />
              <meshStandardMaterial color="#131928" roughness={0.4} />
            </mesh>
          </group>

          {/* 5. Shopping Bag (Sapphire #60A5FA, Conversion Sales) */}
          <group position={[items[5].xOffset, items[5].initialY, items[5].zOffset]}>
            <mesh>
              <boxGeometry args={[0.68, 0.62, 0.4]} />
              <meshStandardMaterial color="#3B6FE0" emissive="#3B6FE0" emissiveIntensity={0.3} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.38, 0]}>
              <torusGeometry args={[0.22, 0.045, 10, 20, Math.PI]} />
              <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.35} metalness={0.85} />
            </mesh>
          </group>
        </group>

        {/* DROPPING GOLD CONVERSION TOKEN */}
        <group ref={coinGroupRef} position={[0, -1.3, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.09, 24]} />
            <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.25} metalness={0.92} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0, 0.055]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.025, 8, 24]} />
            <meshStandardMaterial color="#FAF9F6" metalness={0.92} roughness={0.1} />
          </mesh>
        </group>

        {/* SIDE OBJECT: Golden Target Bullseye (Positioned with 10% stage padding) */}
        <group position={[-2.35, 0.15, -0.3]} rotation={[0.15, 0.45, 0]}>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.06, 32]} />
            <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.2} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <cylinderGeometry args={[0.58, 0.58, 0.04, 32]} />
            <meshStandardMaterial color="#0B0F19" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.04, 32]} />
            <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.2} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.085, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
            <meshStandardMaterial color="#FB7185" emissive="#FB7185" emissiveIntensity={0.3} roughness={0.3} />
          </mesh>
        </group>

        {/* SIDE OBJECT: Broadcast Megaphone (Positioned with 10% stage padding) */}
        <group ref={megaphoneRef} position={[2.3, 0.4, -0.2]} rotation={[0.15, -0.5, 0.1]}>
          <mesh rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.42, 1.0, 16, 1, true]} />
            <meshStandardMaterial color="#C8A25A" emissive="#C8A25A" emissiveIntensity={0.2} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.42, 0.04, 10, 24]} />
            <meshStandardMaterial color="#FAF9F6" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.18, -0.32, 0]} rotation={[0, 0, Math.PI / 10]}>
            <cylinderGeometry args={[0.075, 0.075, 0.5, 10]} />
            <meshStandardMaterial color="#131928" roughness={0.5} />
          </mesh>
        </group>

        {/* EXPANDING SHOCKWAVE RING ON LAUNCH */}
        <mesh ref={shockwaveRef} position={[2.3, 0.4, -0.2]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.75, 0.05, 12, 32]} />
          <meshBasicMaterial color="#C8A25A" transparent={true} opacity={0} />
        </mesh>

      </group>
    </>
  );
}
