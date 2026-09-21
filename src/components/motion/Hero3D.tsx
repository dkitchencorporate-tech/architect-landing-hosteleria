'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Torus, Ring, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export type PresetHero3D =
  | 'home'
  | 'qr'
  | 'experience'
  | 'auditoria'
  | 'base-operativa'
  | 'dark-kitchen'
  | 'marcas';

const NARANJA = '#D9531E';
const AMBAR = '#B8863B';

/** Sigue el cursor dentro del lienzo y aplica un tilt suave al grupo hijo. */
function GrupoConTilt({ children, intensidad = 0.35 }: { children: React.ReactNode; intensidad?: number }) {
  const grupo = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!grupo.current) return;
    grupo.current.rotation.y = THREE.MathUtils.lerp(grupo.current.rotation.y, pointer.x * intensidad, 0.06);
    grupo.current.rotation.x = THREE.MathUtils.lerp(grupo.current.rotation.x, -pointer.y * intensidad, 0.06);
  });

  return <group ref={grupo}>{children}</group>;
}

/** `/qr` — una carta/QR flotando con inclinación reactiva al cursor (Sección 2.3). */
function EscenaQr() {
  return (
    <GrupoConTilt intensidad={0.5}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <RoundedBox args={[2.2, 2.8, 0.12]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#171008" />
        </RoundedBox>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#FDFCF8" />
        </mesh>
        {[-1, 1].map((x) =>
          [-1, 1].map((y) => (
            <mesh key={`${x}-${y}`} position={[x * 0.5, y * 0.5, 0.08]}>
              <boxGeometry args={[0.35, 0.35, 0.02]} />
              <meshStandardMaterial color="#171008" />
            </mesh>
          ))
        )}
      </Float>
    </GrupoConTilt>
  );
}

/** `/dark-kitchen` — cajas apilándose bajo una sola cocina (marcas apilables). */
function EscenaDarkKitchen() {
  const posiciones: [number, number, number][] = [
    [0, -0.9, 0],
    [0.7, -0.1, 0.2],
    [-0.7, 0.3, -0.2],
    [0.2, 1.1, 0.1],
    [-0.4, -0.3, 0.5],
  ];
  return (
    <GrupoConTilt intensidad={0.25}>
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.6}>
        {posiciones.map((p, i) => (
          <RoundedBox key={i} args={[0.9, 0.9, 0.9]} radius={0.08} position={p}>
            <meshStandardMaterial color={i % 2 === 0 ? NARANJA : '#171008'} />
          </RoundedBox>
        ))}
      </Float>
    </GrupoConTilt>
  );
}

/** `/auditoria` — un anillo que gira hasta señalar una zona "en riesgo". */
function EscenaAuditoria() {
  const aguja = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!aguja.current) return;
    // Gira hasta ~40% del círculo (zona "en riesgo") y se detiene ahí.
    const objetivo = Math.PI * 0.8;
    aguja.current.rotation.z = THREE.MathUtils.lerp(aguja.current.rotation.z, -objetivo, delta * 1.2);
  });

  return (
    <GrupoConTilt intensidad={0.3}>
      <Ring args={[1.3, 1.5, 64, 1, 0, Math.PI * 1.5]} rotation={[0, 0, Math.PI]}>
        <meshStandardMaterial color="#e5e7eb" side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.3, 1.5, 64, 1, 0, Math.PI * 0.6]} rotation={[0, 0, Math.PI * 1.75]}>
        <meshStandardMaterial color={NARANJA} side={THREE.DoubleSide} />
      </Ring>
      <group ref={aguja}>
        <mesh position={[0, 0.65, 0.05]}>
          <coneGeometry args={[0.08, 1, 8]} />
          <meshStandardMaterial color="#171008" />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[0.15, 24]} />
        <meshStandardMaterial color="#171008" />
      </mesh>
    </GrupoConTilt>
  );
}

/** `/base-operativa` — pantalla flotante con el flujo de pedido en bucle. */
function EscenaBaseOperativa() {
  const indicador = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!indicador.current) return;
    const t = (clock.getElapsedTime() % 4) / 4; // 0→1 en bucle de 4s
    indicador.current.position.y = THREE.MathUtils.lerp(-0.7, 0.7, t);
  });

  return (
    <GrupoConTilt intensidad={0.3}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <RoundedBox args={[1.8, 3, 0.15]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#171008" />
        </RoundedBox>
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[1.5, 2.6]} />
          <meshStandardMaterial color="#1f1f1f" />
        </mesh>
        {[-0.7, 0, 0.7].map((y) => (
          <mesh key={y} position={[0, y, 0.1]}>
            <planeGeometry args={[1.2, 0.35]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        ))}
        <mesh ref={indicador} position={[-0.5, -0.7, 0.12]}>
          <circleGeometry args={[0.1, 24]} />
          <meshStandardMaterial color={NARANJA} emissive={NARANJA} emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </GrupoConTilt>
  );
}

/** `/experience` — copa/plato del caso Alhambra, entrada tipo reveal. */
function EscenaExperience() {
  return (
    <GrupoConTilt intensidad={0.3}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <Torus args={[1, 0.35, 32, 64]} rotation={[Math.PI / 2.3, 0, 0]}>
          <meshStandardMaterial color={NARANJA} metalness={0.3} roughness={0.4} />
        </Torus>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.15, 32]} />
          <meshStandardMaterial color={AMBAR} metalness={0.4} roughness={0.3} />
        </mesh>
      </Float>
    </GrupoConTilt>
  );
}

/** `/` (Home) — la escalera como composición 3D: 5 formas en distintos planos. */
function EscenaHome() {
  const formas = [
    { pos: [-2.2, 0.6, -0.5], color: NARANJA, tipo: 'box' },
    { pos: [-1.1, -0.4, 0.3], color: '#171008', tipo: 'sphere' },
    { pos: [0, 0.8, 0], color: AMBAR, tipo: 'box' },
    { pos: [1.1, -0.3, -0.3], color: '#171008', tipo: 'sphere' },
    { pos: [2.2, 0.5, 0.4], color: NARANJA, tipo: 'box' },
  ] as const;

  return (
    <GrupoConTilt intensidad={0.2}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.7}>
        {formas.map((f, i) =>
          f.tipo === 'box' ? (
            <RoundedBox key={i} args={[0.7, 0.7, 0.7]} radius={0.1} position={f.pos as [number, number, number]}>
              <meshStandardMaterial color={f.color} />
            </RoundedBox>
          ) : (
            <mesh key={i} position={f.pos as [number, number, number]}>
              <icosahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color={f.color} />
            </mesh>
          )
        )}
      </Float>
    </GrupoConTilt>
  );
}

/** `/marcas` — estante 3D de las 6 marcas, rotable al arrastrar. */
function EscenaMarcas() {
  const radio = 2.2;
  const n = 6;
  return (
    <>
      <group>
        {Array.from({ length: n }).map((_, i) => {
          const angulo = (i / n) * Math.PI * 2;
          return (
            <RoundedBox
              key={i}
              args={[0.9, 0.9, 0.15]}
              radius={0.1}
              position={[Math.sin(angulo) * radio, 0, Math.cos(angulo) * radio]}
              rotation={[0, angulo, 0]}
            >
              <meshStandardMaterial color={i % 2 === 0 ? NARANJA : AMBAR} />
            </RoundedBox>
          );
        })}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

const ESCENAS: Record<PresetHero3D, () => React.ReactNode> = {
  home: EscenaHome,
  qr: EscenaQr,
  experience: EscenaExperience,
  auditoria: EscenaAuditoria,
  'base-operativa': EscenaBaseOperativa,
  'dark-kitchen': EscenaDarkKitchen,
  marcas: EscenaMarcas,
};

/**
 * Elemento 3D real por página (Parte 7, Sección 2.3): rotación continua sutil
 * + reacción al cursor, nunca un modelo estático. Se importa siempre vía
 * `next/dynamic` con `ssr: false` (ver Hero3DLazy) — WebGL no existe en el
 * servidor.
 */
export default function Hero3D({ preset, className }: { preset: PresetHero3D; className?: string }) {
  const Escena = ESCENAS[preset];
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 4]} intensity={1.1} />
        <Escena />
      </Canvas>
    </div>
  );
}
