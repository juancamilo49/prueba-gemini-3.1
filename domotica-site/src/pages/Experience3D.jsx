import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox, Environment, Float, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLightBulb, HiChevronRight, HiInformationCircle } from 'react-icons/hi';
import { FaThermometerHalf, FaMusic, FaLock, FaShieldAlt } from 'react-icons/fa';
import * as THREE from 'three';

/* ─── Smart Room 3D Scene ─── */

function SmartLight({ position, isOn, color = '#fbbf24', onClick }) {
  const meshRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isOn) {
      meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Light fixture */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.05, 16]} />
        <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Light bulb */}
      <mesh ref={meshRef} position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={isOn ? color : '#333'}
          emissive={isOn ? color : '#000'}
          emissiveIntensity={isOn ? 0.8 : 0}
        />
      </mesh>
      {/* Actual point light */}
      {isOn && (
        <pointLight
          ref={lightRef}
          position={[0, -0.3, 0]}
          color={color}
          intensity={2}
          distance={5}
          decay={2}
        />
      )}
    </group>
  );
}

function SmartTV({ position, isOn }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isOn) {
      const hue = (state.clock.elapsedTime * 0.05) % 1;
      meshRef.current.material.emissive.setHSL(hue, 0.5, 0.2);
    }
  });

  return (
    <group position={position}>
      {/* TV Frame */}
      <RoundedBox args={[2.2, 1.3, 0.08]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {/* Screen */}
      <mesh ref={meshRef} position={[0, 0, 0.045]}>
        <planeGeometry args={[2.0, 1.1]} />
        <meshStandardMaterial
          color={isOn ? '#1e3a5f' : '#0a0a0a'}
          emissive={isOn ? '#1e3a5f' : '#000000'}
          emissiveIntensity={isOn ? 0.5 : 0}
        />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.75, 0.1]}>
        <boxGeometry args={[0.6, 0.1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Speaker({ position, isPlaying }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isPlaying) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.03;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <RoundedBox args={[0.25, 0.4, 0.2]} radius={0.03}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      {/* Speaker driver */}
      <mesh position={[0, 0.05, 0.11]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial
          color="#111"
          emissive={isPlaying ? '#3b82f6' : '#000'}
          emissiveIntensity={isPlaying ? 0.3 : 0}
        />
      </mesh>
      {/* Sound rings when playing */}
      {isPlaying && (
        <Float speed={4} floatIntensity={0.1}>
          <mesh position={[0, 0, 0.2]}>
            <ringGeometry args={[0.12, 0.14, 16]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} />
          </mesh>
        </Float>
      )}
    </group>
  );
}

function SecurityCamera({ position }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Mount */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#444" metalness={0.8} />
      </mesh>
      {/* Camera body */}
      <group ref={meshRef}>
        <mesh position={[0, -0.1, 0.05]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.15]} />
          <meshStandardMaterial color="#eee" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lens */}
        <mesh position={[0, -0.1, 0.13]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.04, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* LED */}
        <mesh position={[0.04, -0.07, 0.12]} rotation={[0.3, 0, 0]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial color="red" emissive="red" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
}

function Thermostat({ position, temperature }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.3, 0.3, 0.05]} radius={0.05}>
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.5} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.03]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </mesh>
      <Html position={[0, 0, 0.04]} center transform scale={0.08}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', textAlign: 'center', userSelect: 'none' }}>
          {temperature}°C
        </div>
      </Html>
    </group>
  );
}

function SmartDoor({ position, isLocked }) {
  return (
    <group position={position}>
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[1.0, 2.2, 0.1]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.7} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.35, 0, 0.08]}>
        <boxGeometry args={[0.05, 0.15, 0.05]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Smart lock indicator */}
      <mesh position={[0.35, 0.2, 0.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={isLocked ? '#22c55e' : '#ef4444'}
          emissive={isLocked ? '#22c55e' : '#ef4444'}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function Room({ devices }) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#d4c5a9" roughness={0.8} />
      </mesh>

      {/* Walls */}
      {/* Back wall */}
      <mesh position={[0, 0.5, -4]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.9} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-4, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.9} />
      </mesh>
      {/* Right wall */}
      <mesh position={[4, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#e0d8c8" roughness={0.9} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#f5f0e8" roughness={1} />
      </mesh>

      {/* Furniture - Sofa */}
      <group position={[0, -0.8, 1]}>
        {/* Seat */}
        <RoundedBox args={[2.5, 0.5, 1]} radius={0.05}>
          <meshStandardMaterial color="#6b7280" roughness={0.8} />
        </RoundedBox>
        {/* Back */}
        <RoundedBox args={[2.5, 0.8, 0.3]} radius={0.05} position={[0, 0.4, -0.35]}>
          <meshStandardMaterial color="#6b7280" roughness={0.8} />
        </RoundedBox>
        {/* Pillows */}
        <RoundedBox args={[0.5, 0.35, 0.35]} radius={0.08} position={[-0.7, 0.4, -0.1]}>
          <meshStandardMaterial color="#3b82f6" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.35, 0.35]} radius={0.08} position={[0.7, 0.4, -0.1]}>
          <meshStandardMaterial color="#06b6d4" roughness={0.9} />
        </RoundedBox>
      </group>

      {/* Coffee table */}
      <group position={[0, -1.1, -0.5]}>
        <RoundedBox args={[1.2, 0.08, 0.6]} radius={0.02}>
          <meshStandardMaterial color="#8B7355" roughness={0.5} />
        </RoundedBox>
        {/* Legs */}
        {[[-0.5, -0.2, -0.25], [0.5, -0.2, -0.25], [-0.5, -0.2, 0.25], [0.5, -0.2, 0.25]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
            <meshStandardMaterial color="#5c3d2e" metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshStandardMaterial color="#4a5568" roughness={1} />
      </mesh>

      {/* Smart Devices */}
      <SmartLight position={[-1.5, 2.45, -1.5]} isOn={devices.lights} color="#fbbf24" />
      <SmartLight position={[1.5, 2.45, -1.5]} isOn={devices.lights} color="#fbbf24" />
      <SmartLight position={[0, 2.45, 1.5]} isOn={devices.lights} color="#93c5fd" />

      <SmartTV position={[0, 0.3, -3.9]} isOn={devices.tv} />

      <Speaker position={[-2.5, -0.3, -3]} isPlaying={devices.audio} />
      <Speaker position={[2.5, -0.3, -3]} isPlaying={devices.audio} />

      <SecurityCamera position={[3.8, 2.2, -3.8]} />

      <Thermostat position={[-3.95, 0.5, -1]} temperature={devices.temperature} />

      <SmartDoor position={[3.9, 0, 2]} isLocked={devices.locked} />

      {/* Ambient light based on state */}
      <ambientLight intensity={devices.lights ? 0.4 : 0.15} />
      <directionalLight position={[3, 5, 2]} intensity={0.3} />
    </group>
  );
}

function Scene({ devices }) {
  return (
    <>
      <Room devices={devices} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 + 0.2}
        target={[0, 0, 0]}
      />
    </>
  );
}

/* ─── Page Component ─── */

const deviceControls = [
  {
    id: 'lights',
    icon: HiLightBulb,
    label: 'Iluminación',
    desc: 'Encender/apagar luces inteligentes',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'tv',
    icon: FaMusic,
    label: 'Smart TV',
    desc: 'Encender/apagar televisor',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'audio',
    icon: FaMusic,
    label: 'Audio',
    desc: 'Activar sistema de sonido',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'locked',
    icon: FaLock,
    label: 'Cerradura',
    desc: 'Bloquear/desbloquear puerta',
    color: 'from-emerald-400 to-green-500',
  },
];

export default function Experience3D() {
  const [devices, setDevices] = useState({
    lights: true,
    tv: true,
    audio: false,
    locked: true,
    temperature: 22,
  });

  const [showInfo, setShowInfo] = useState(true);

  const toggleDevice = (id) => {
    setDevices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const adjustTemp = (delta) => {
    setDevices((prev) => ({
      ...prev,
      temperature: Math.max(16, Math.min(30, prev.temperature + delta)),
    }));
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">WebGL Interactivo</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Experiencia <span className="gradient-text">3D</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Explora una habitación domótica en 3D. Controla las luces, temperatura,
              audio y más. Arrastra para rotar, scroll para zoom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="bg-gray-900 relative">
        <div className="container-custom py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* 3D Canvas */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700" style={{ height: '600px' }}>
                <Canvas
                  camera={{ position: [5, 3, 5], fov: 55 }}
                  shadows
                  gl={{ antialias: true }}
                >
                  <Suspense fallback={null}>
                    <Scene devices={devices} />
                  </Suspense>
                </Canvas>

                {/* Info overlay */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-xl p-4 text-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <HiInformationCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-semibold mb-1">Controles de Navegación</p>
                            <p className="text-sm text-gray-300">
                              <strong>Arrastrar:</strong> Rotar vista • <strong>Scroll:</strong> Zoom
                              • <strong>Click derecho + arrastrar:</strong> Mover • Usa el panel lateral para controlar los dispositivos
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowInfo(false)}
                          className="text-gray-400 hover:text-white ml-2 bg-transparent border-none cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <h3 className="text-white font-bold mb-1">Panel de Control</h3>
                <p className="text-gray-400 text-xs mb-5">Controla los dispositivos en tiempo real</p>

                <div className="space-y-3">
                  {deviceControls.map((control) => (
                    <button
                      key={control.id}
                      onClick={() => toggleDevice(control.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer border-none ${
                        devices[control.id]
                          ? 'bg-blue-500/20 text-white'
                          : 'bg-gray-700/50 text-gray-400'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${control.color} flex items-center justify-center flex-shrink-0 ${
                        !devices[control.id] ? 'opacity-40' : ''
                      }`}>
                        <control.icon className="text-white" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{control.label}</div>
                        <div className="text-xs opacity-60">{control.desc}</div>
                      </div>
                      <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                        devices[control.id] ? 'bg-blue-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          devices[control.id] ? 'translate-x-4' : ''
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaThermometerHalf className="text-cyan-400" />
                  Temperatura
                </h4>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => adjustTemp(-1)}
                    className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold hover:bg-blue-500/30 transition-colors cursor-pointer border-none"
                  >
                    −
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">{devices.temperature}°</span>
                    <span className="text-gray-400 text-sm block">Celsius</span>
                  </div>
                  <button
                    onClick={() => adjustTemp(1)}
                    className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xl font-bold hover:bg-red-500/30 transition-colors cursor-pointer border-none"
                  >
                    +
                  </button>
                </div>
                <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                    style={{ width: `${((devices.temperature - 16) / 14) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scene presets */}
              <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <h4 className="text-white font-semibold mb-3">Escenas Predefinidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      name: 'Cine',
                      icon: '🎬',
                      config: { lights: false, tv: true, audio: true, locked: true, temperature: 22 }
                    },
                    {
                      name: 'Relax',
                      icon: '🧘',
                      config: { lights: true, tv: false, audio: true, locked: true, temperature: 24 }
                    },
                    {
                      name: 'Fiesta',
                      icon: '🎉',
                      config: { lights: true, tv: true, audio: true, locked: false, temperature: 21 }
                    },
                    {
                      name: 'Dormir',
                      icon: '😴',
                      config: { lights: false, tv: false, audio: false, locked: true, temperature: 20 }
                    },
                  ].map((scene) => (
                    <button
                      key={scene.name}
                      onClick={() => setDevices(scene.config)}
                      className="p-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 text-white text-center transition-all cursor-pointer border-none"
                    >
                      <span className="text-2xl block mb-1">{scene.icon}</span>
                      <span className="text-xs font-medium">{scene.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features explanation */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...{ initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Así Funciona un Hogar Inteligente
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Lo que acabas de experimentar en 3D es solo una muestra. En la realidad,
              todos estos sistemas se integran perfectamente para crear un hogar que se adapta a ti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💡', title: 'Iluminación', desc: 'Escenas personalizadas que se adaptan a tu rutina diaria.' },
              { icon: '🌡️', title: 'Clima', desc: 'IA que aprende tus preferencias y optimiza el consumo.' },
              { icon: '🔊', title: 'Audio', desc: 'Música en cada espacio con calidad profesional.' },
              { icon: '🔒', title: 'Seguridad', desc: 'Monitoreo 24/7 con alertas en tiempo real.' },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <span className="text-4xl mb-3 block">{feat.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/simulador" className="btn-primary no-underline">
              Calcular Costo de mi Proyecto <HiChevronRight className="inline" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
