import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiLightBulb, HiShieldCheck, HiDesktopComputer,
  HiChevronRight, HiChevronLeft, HiCheck, HiInformationCircle
} from 'react-icons/hi';
import { FaThermometerHalf, FaMusic, FaLock, FaNetworkWired } from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const propertyTypes = [
  { id: 'apartment-small', label: 'Apartamento Pequeño', area: '50-80 m²', icon: '🏠', factor: 0.8 },
  { id: 'apartment-large', label: 'Apartamento Grande', area: '80-150 m²', icon: '🏢', factor: 1.0 },
  { id: 'house-medium', label: 'Casa Mediana', area: '150-250 m²', icon: '🏡', factor: 1.3 },
  { id: 'house-large', label: 'Casa Grande', area: '250-400 m²', icon: '🏰', factor: 1.7 },
  { id: 'penthouse', label: 'Penthouse / Mansión', area: '400+ m²', icon: '✨', factor: 2.2 },
  { id: 'commercial', label: 'Espacio Comercial', area: 'Variable', icon: '🏬', factor: 1.5 },
];

const systemOptions = [
  {
    id: 'lighting',
    icon: HiLightBulb,
    name: 'Iluminación Inteligente',
    desc: 'Control de luces, escenas y regulación',
    baseCost: 2500,
    color: 'from-amber-400 to-orange-500',
    tiers: [
      { id: 'basic', label: 'Básico', desc: '5-10 zonas, interruptores inteligentes', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: '10-20 zonas, dimmer + escenas', factor: 1.8 },
      { id: 'premium', label: 'Premium', desc: '20+ zonas, panel centralizado + LED RGBW', factor: 3 },
    ]
  },
  {
    id: 'climate',
    icon: FaThermometerHalf,
    name: 'Control de Clima',
    desc: 'Termostatos y automatización HVAC',
    baseCost: 1800,
    color: 'from-blue-400 to-cyan-500',
    tiers: [
      { id: 'basic', label: 'Básico', desc: 'Termostato inteligente, 1-2 zonas', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: 'Multi-zona, sensores ambientales', factor: 2 },
      { id: 'premium', label: 'Premium', desc: 'Multi-zona + sensores CO2/VOC + geolocalización', factor: 3.2 },
    ]
  },
  {
    id: 'security',
    icon: HiShieldCheck,
    name: 'Seguridad',
    desc: 'Alarmas, cámaras y sensores',
    baseCost: 3000,
    color: 'from-red-400 to-rose-500',
    tiers: [
      { id: 'basic', label: 'Básico', desc: '4 cámaras + alarma básica', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: '8 cámaras + alarma + videoportero', factor: 1.8 },
      { id: 'premium', label: 'Premium', desc: 'IA + PTZ + monitoreo 24/7 + biometría', factor: 3.5 },
    ]
  },
  {
    id: 'audio',
    icon: FaMusic,
    name: 'Audio & Video',
    desc: 'Sonido multi-room y home theater',
    baseCost: 3500,
    color: 'from-purple-400 to-indigo-500',
    tiers: [
      { id: 'basic', label: 'Básico', desc: '2-3 zonas, streaming básico', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: '5-6 zonas + home theater 5.1', factor: 2.2 },
      { id: 'premium', label: 'Premium', desc: '8+ zonas + Dolby Atmos 7.2.4', factor: 4 },
    ]
  },
  {
    id: 'access',
    icon: FaLock,
    name: 'Control de Accesos',
    desc: 'Cerraduras y control de puertas',
    baseCost: 1500,
    color: 'from-emerald-400 to-green-500',
    tiers: [
      { id: 'basic', label: 'Básico', desc: 'Cerradura inteligente puerta principal', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: 'Multi-puerta + videoportero', factor: 2 },
      { id: 'premium', label: 'Premium', desc: 'Biometría + RFID + intercomunicador avanzado', factor: 3 },
    ]
  },
  {
    id: 'network',
    icon: FaNetworkWired,
    name: 'Infraestructura de Red',
    desc: 'Redes, WiFi y cableado estructurado',
    baseCost: 2000,
    color: 'from-gray-400 to-gray-600',
    tiers: [
      { id: 'basic', label: 'Básico', desc: 'WiFi mesh básico, 2-3 APs', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: 'WiFi 6, switch PoE, rack', factor: 1.8 },
      { id: 'premium', label: 'Premium', desc: 'WiFi 6E enterprise + fibra + UPS', factor: 3 },
    ]
  },
  {
    id: 'control',
    icon: HiDesktopComputer,
    name: 'Control Centralizado',
    desc: 'Hub central y paneles de control',
    baseCost: 4000,
    color: 'from-blue-500 to-blue-700',
    tiers: [
      { id: 'basic', label: 'Básico', desc: 'Hub + control por app', factor: 1 },
      { id: 'standard', label: 'Estándar', desc: 'Hub + panel táctil + voz', factor: 2 },
      { id: 'premium', label: 'Premium', desc: 'Procesador central + multi-panel + IA', factor: 3.5 },
    ]
  },
];

export default function CostSimulator() {
  const [step, setStep] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSystems, setSelectedSystems] = useState({});

  const totalSteps = 3;

  const toggleSystem = (systemId) => {
    setSelectedSystems((prev) => {
      const updated = { ...prev };
      if (updated[systemId]) {
        delete updated[systemId];
      } else {
        updated[systemId] = 'basic';
      }
      return updated;
    });
  };

  const setTier = (systemId, tier) => {
    setSelectedSystems((prev) => ({ ...prev, [systemId]: tier }));
  };

  const propertyFactor = useMemo(() => {
    const prop = propertyTypes.find((p) => p.id === selectedProperty);
    return prop ? prop.factor : 1;
  }, [selectedProperty]);

  const costBreakdown = useMemo(() => {
    return Object.entries(selectedSystems).map(([systemId, tierId]) => {
      const system = systemOptions.find((s) => s.id === systemId);
      const tier = system.tiers.find((t) => t.id === tierId);
      const cost = Math.round(system.baseCost * tier.factor * propertyFactor);
      return { system, tier, cost };
    });
  }, [selectedSystems, propertyFactor]);

  const totalCost = useMemo(() => {
    return costBreakdown.reduce((sum, item) => sum + item.cost, 0);
  }, [costBreakdown]);

  const installationCost = Math.round(totalCost * 0.2);
  const grandTotal = totalCost + installationCost;

  const canProceed = () => {
    if (step === 0) return selectedProperty !== null;
    if (step === 1) return Object.keys(selectedSystems).length > 0;
    return true;
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Herramienta Interactiva</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
              Simulador de <span className="gradient-text">Costos</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Estima el costo de tu proyecto de domótica en minutos. Selecciona tus
              necesidades y obtén un presupuesto aproximado al instante.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simulator */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {['Tipo de Propiedad', 'Sistemas', 'Resumen'].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    i <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i < step ? <HiCheck size={20} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    i <= step ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {/* Step 1: Property Type */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué tipo de propiedad quieres automatizar?</h2>
                <p className="text-gray-500 mb-8">Selecciona el tipo que mejor describe tu espacio.</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {propertyTypes.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedProperty(pt.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        selectedProperty === pt.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-4xl mb-3 block">{pt.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{pt.label}</h3>
                      <p className="text-sm text-gray-500">{pt.area}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Systems Selection */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué sistemas necesitas?</h2>
                <p className="text-gray-500 mb-8">Selecciona los sistemas y el nivel que deseas para cada uno.</p>

                <div className="space-y-4">
                  {systemOptions.map((system) => {
                    const isSelected = system.id in selectedSystems;
                    return (
                      <div
                        key={system.id}
                        className={`rounded-2xl border-2 transition-all overflow-hidden ${
                          isSelected ? 'border-blue-500 bg-white shadow-md' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <button
                          onClick={() => toggleSystem(system.id)}
                          className="w-full p-5 flex items-center gap-4 text-left cursor-pointer bg-transparent border-none"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${system.color} flex items-center justify-center flex-shrink-0`}>
                            <system.icon className="text-white" size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{system.name}</h3>
                            <p className="text-sm text-gray-500">{system.desc}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                          }`}>
                            {isSelected && <HiCheck className="text-white" size={16} />}
                          </div>
                        </button>

                        {/* Tier Selection */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-1">
                                <div className="grid grid-cols-3 gap-3">
                                  {system.tiers.map((tier) => (
                                    <button
                                      key={tier.id}
                                      onClick={() => setTier(system.id, tier.id)}
                                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                        selectedSystems[system.id] === tier.id
                                          ? 'border-blue-500 bg-blue-50'
                                          : 'border-gray-200 hover:border-gray-300 bg-white'
                                      }`}
                                    >
                                      <div className="font-semibold text-sm text-gray-900 mb-1">{tier.label}</div>
                                      <div className="text-xs text-gray-500">{tier.desc}</div>
                                      <div className="text-sm font-bold text-blue-500 mt-2">
                                        ${(Math.round(system.baseCost * tier.factor * propertyFactor)).toLocaleString()} USD
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Summary */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Resumen de tu Proyecto</h2>
                <p className="text-gray-500 mb-8">Revisa el estimado de costos para tu proyecto de domótica.</p>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Cost Breakdown */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Property */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {propertyTypes.find((p) => p.id === selectedProperty)?.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {propertyTypes.find((p) => p.id === selectedProperty)?.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {propertyTypes.find((p) => p.id === selectedProperty)?.area}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Systems */}
                    {costBreakdown.map((item, i) => (
                      <motion.div
                        key={item.system.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.system.color} flex items-center justify-center`}>
                              <item.system.icon className="text-white" size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{item.system.name}</h4>
                              <p className="text-xs text-gray-500">
                                Nivel: <span className="text-blue-500 font-medium">{item.tier.label}</span>
                              </p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-gray-900">
                            ${item.cost.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Installation */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-600">🔧</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Instalación & Programación</h4>
                            <p className="text-xs text-gray-500">
                              Aprox. 20% del costo de equipos
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          ${installationCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Card */}
                  <div>
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white sticky top-28">
                      <h3 className="text-lg font-semibold mb-6 opacity-90">Presupuesto Estimado</h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="opacity-80">Equipos</span>
                          <span className="font-semibold">${totalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="opacity-80">Instalación</span>
                          <span className="font-semibold">${installationCost.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/20 pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total Estimado</span>
                            <span className="text-3xl font-bold">${grandTotal.toLocaleString()}</span>
                          </div>
                          <p className="text-xs opacity-60 mt-1">USD antes de impuestos</p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-2">
                          <HiInformationCircle className="flex-shrink-0 mt-0.5" size={18} />
                          <p className="text-xs leading-relaxed opacity-80">
                            Este es un estimado referencial. El costo final puede variar
                            según las especificaciones exactas del proyecto y condiciones
                            del sitio.
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/contacto"
                        className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors no-underline"
                      >
                        Solicitar Cotización Formal
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                step === 0
                  ? 'text-gray-300 cursor-not-allowed bg-transparent border-none'
                  : 'text-gray-700 hover:bg-gray-100 bg-transparent border border-gray-200'
              }`}
            >
              <HiChevronLeft /> Anterior
            </button>
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
                disabled={!canProceed()}
                className={`btn-primary ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Siguiente <HiChevronRight />
              </button>
            ) : (
              <Link to="/contacto" className="btn-primary no-underline">
                Contactar Asesor <HiChevronRight />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
