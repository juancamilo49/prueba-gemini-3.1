import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiLightBulb, HiShieldCheck, HiDesktopComputer,
  HiChevronRight, HiSearch, HiFilter
} from 'react-icons/hi';
import { FaThermometerHalf, FaMusic, FaLock, FaVideo, FaBolt, FaNetworkWired } from 'react-icons/fa';

const categories = [
  { id: 'all', name: 'Todos', icon: HiFilter },
  { id: 'iluminacion', name: 'Iluminación', icon: HiLightBulb },
  { id: 'clima', name: 'Clima', icon: FaThermometerHalf },
  { id: 'seguridad', name: 'Seguridad', icon: HiShieldCheck },
  { id: 'audio', name: 'Audio & Video', icon: FaMusic },
  { id: 'control', name: 'Control', icon: HiDesktopComputer },
  { id: 'redes', name: 'Redes', icon: FaNetworkWired },
];

const allProducts = [
  {
    id: 1, category: 'iluminacion', name: 'Panel de Iluminación Centralizado',
    desc: 'Control de iluminación para hasta 48 zonas con programación horaria y escenas personalizables.',
    price: 'Desde $2,500 USD', image: '💡', features: ['48 zonas', 'Escenas ilimitadas', 'Control remoto', 'Dimmer integrado'],
  },
  {
    id: 2, category: 'iluminacion', name: 'Interruptores Inteligentes Pro',
    desc: 'Interruptores táctiles con retroiluminación LED y compatible con Alexa, Google Home y Siri.',
    price: 'Desde $89 USD', image: '🔆', features: ['Touch panel', 'WiFi/Zigbee', 'Regulación 1-100%', 'Programable'],
  },
  {
    id: 3, category: 'iluminacion', name: 'Tiras LED RGBW Inteligentes',
    desc: 'Tiras LED de alta densidad con 16 millones de colores y blanco cálido/frío ajustable.',
    price: 'Desde $45 USD/m', image: '🌈', features: ['RGBW', '120 LEDs/m', 'IP65', 'Music sync'],
  },
  {
    id: 4, category: 'clima', name: 'Termostato Inteligente Elite',
    desc: 'Termostato con IA que aprende tus rutinas y optimiza el consumo energético automáticamente.',
    price: 'Desde $350 USD', image: '🌡️', features: ['IA adaptativa', 'Sensor de presencia', 'Pantalla táctil', 'Ahorro 30%'],
  },
  {
    id: 5, category: 'clima', name: 'Controlador HVAC Multi-zona',
    desc: 'Sistema de control para aire acondicionado y calefacción con gestión independiente por zona.',
    price: 'Desde $1,200 USD', image: '❄️', features: ['Multi-zona', 'Control IR/WiFi', 'Geolocalización', 'Reportes'],
  },
  {
    id: 6, category: 'clima', name: 'Sensor Ambiental Premium',
    desc: 'Monitoreacalidad del aire, temperatura, humedad, CO2 y compuestos orgánicos volátiles.',
    price: 'Desde $180 USD', image: '🌿', features: ['CO2', 'VOC', 'Temp/Humedad', 'PM2.5'],
  },
  {
    id: 7, category: 'seguridad', name: 'Sistema de Alarma Integral',
    desc: 'Central de alarma inalámbrica con monitoreo en la nube, compatible con sensores y cámaras.',
    price: 'Desde $890 USD', image: '🚨', features: ['Inalámbrica', 'Cloud', 'App móvil', '128 zonas'],
  },
  {
    id: 8, category: 'seguridad', name: 'Cámara PTZ 4K con IA',
    desc: 'Cámara motorizada con reconocimiento facial, detección de vehículos y seguimiento automático.',
    price: 'Desde $450 USD', image: '📷', features: ['4K UHD', 'IA integrada', 'PTZ 360°', 'Visión nocturna'],
  },
  {
    id: 9, category: 'seguridad', name: 'Videoportero Inteligente',
    desc: 'Videoportero con cámara HD, reconocimiento facial y apertura remota desde tu smartphone.',
    price: 'Desde $320 USD', image: '🔔', features: ['Full HD', 'Facial rec', 'Two-way audio', 'Cloud storage'],
  },
  {
    id: 10, category: 'audio', name: 'Sistema de Audio Multi-Room',
    desc: 'Amplificador de 8 zonas con streaming integrado, AirPlay 2, Chromecast y Spotify Connect.',
    price: 'Desde $2,800 USD', image: '🔊', features: ['8 zonas', 'Hi-Res Audio', 'Streaming', 'DSP integrado'],
  },
  {
    id: 11, category: 'audio', name: 'Home Theater 7.2.4 Dolby Atmos',
    desc: 'Procesador de audio/video inmersivo con Dolby Atmos, DTS:X y calibración automática.',
    price: 'Desde $5,500 USD', image: '🎬', features: ['Dolby Atmos', '7.2.4 ch', '8K HDR', 'Auto-calibración'],
  },
  {
    id: 12, category: 'audio', name: 'Altavoces Empotrados Premium',
    desc: 'Altavoces arquitectónicos de alto rendimiento que se integran perfectamente en techos y paredes.',
    price: 'Desde $290 USD/par', image: '🎵', features: ['In-ceiling', '2-vías', '100W', 'Pivotable'],
  },
  {
    id: 13, category: 'control', name: 'Panel Táctil de Control 10"',
    desc: 'Pantalla táctil empotrable de 10 pulgadas para control centralizado de toda la automatización.',
    price: 'Desde $1,500 USD', image: '📱', features: ['10" HD', 'Touch', 'PoE', 'Customizable UI'],
  },
  {
    id: 14, category: 'control', name: 'Hub de Automatización Central',
    desc: 'Procesador central con soporte multi-protocolo: KNX, Z-Wave, Zigbee, ModBus, BACnet y más.',
    price: 'Desde $3,200 USD', image: '🧠', features: ['Multi-protocolo', 'IA local', 'Edge computing', 'API abierta'],
  },
  {
    id: 15, category: 'control', name: 'Control por Voz Avanzado',
    desc: 'Módulo de control por voz con procesamiento local e integración con Alexa, Google y Siri.',
    price: 'Desde $250 USD', image: '🎤', features: ['Voz local', 'Multi-idioma', 'Custom commands', 'Sin nube'],
  },
  {
    id: 16, category: 'redes', name: 'Switch PoE Gestionable 24 puertos',
    desc: 'Switch de red empresarial con 24 puertos PoE+ para alimentar dispositivos IoT y cámaras.',
    price: 'Desde $680 USD', image: '🔌', features: ['24 puertos', 'PoE+ 400W', 'VLAN', 'QoS'],
  },
  {
    id: 17, category: 'redes', name: 'Access Point WiFi 6E',
    desc: 'Punto de acceso tri-banda de alta densidad para cobertura total en grandes espacios.',
    price: 'Desde $420 USD', image: '📡', features: ['WiFi 6E', 'Tri-band', '6.6 Gbps', 'Mesh ready'],
  },
  {
    id: 18, category: 'redes', name: 'Rack de Telecomunicaciones',
    desc: 'Gabinete de telecomunicaciones pre-configurado con patch panel, switch y UPS integrados.',
    price: 'Desde $1,800 USD', image: '🗄️', features: ['12U-42U', 'Ventilado', 'Cable mgmt', 'Llave seguridad'],
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

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
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Catálogo</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
              Nuestros <span className="gradient-text">Productos</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Explora nuestra gama completa de soluciones de automatización y domótica
              para hogares y empresas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <cat.icon size={16} />
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer group"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                      <span className="text-sm font-bold text-emerald-600">{product.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          {f}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          +{product.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No se encontraron productos con esos criterios.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-10 text-center">
                <span className="text-8xl">{selectedProduct.image}</span>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                    {categories.find(c => c.id === selectedProduct.category)?.name}
                  </span>
                  <span className="text-lg font-bold text-emerald-600">{selectedProduct.price}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h2>
                <p className="text-gray-500 mb-6">{selectedProduct.desc}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Características:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/contacto"
                    className="flex-1 btn-primary justify-center no-underline"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Solicitar Cotización
                  </Link>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas una Solución Personalizada?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Nuestros ingenieros pueden diseñar un sistema a medida para tu proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/simulador" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors no-underline">
              Usar Simulador de Costos
            </Link>
            <Link to="/contacto" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors no-underline">
              Contactar a un Ingeniero
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
