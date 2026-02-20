import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiLightBulb, HiShieldCheck, HiDesktopComputer, HiSun,
  HiChevronRight, HiPlay, HiStar, HiCheck
} from 'react-icons/hi';
import { FaThermometerHalf, FaMusic, FaLock, FaDoorOpen } from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 }
};

const products = [
  {
    icon: HiLightBulb,
    title: 'Iluminación Inteligente',
    desc: 'Control total de la iluminación con escenas personalizadas, regulación de intensidad y programación horaria.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: FaThermometerHalf,
    title: 'Control de Clima',
    desc: 'Termostatos inteligentes y automatización HVAC para el máximo confort y eficiencia energética.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: HiShieldCheck,
    title: 'Seguridad Avanzada',
    desc: 'Cámaras, sensores, alarmas y monitoreo 24/7 integrados en una sola plataforma.',
    color: 'from-red-400 to-rose-500',
  },
  {
    icon: FaMusic,
    title: 'Audio & Video',
    desc: 'Sistemas de sonido multi-habitación y home theater con control centralizado inteligente.',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    icon: FaLock,
    title: 'Control de Accesos',
    desc: 'Cerraduras inteligentes, intercomunicadores y gestión de acceso biométrica.',
    color: 'from-emerald-400 to-green-500',
  },
  {
    icon: HiDesktopComputer,
    title: 'Automatización Integral',
    desc: 'Integración total de todos los sistemas del hogar en una interfaz unificada e intuitiva.',
    color: 'from-blue-500 to-blue-700',
  },
];

const stats = [
  { value: '500+', label: 'Proyectos Completados' },
  { value: '98%', label: 'Clientes Satisfechos' },
  { value: '15+', label: 'Años de Experiencia' },
  { value: '24/7', label: 'Soporte Técnico' },
];

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'CEO, Grupo Inmobiliario Alta',
    text: 'DomoTech transformó nuestros desarrollos inmobiliarios. La automatización añade un valor diferencial que nuestros compradores adoran.',
    rating: 5,
  },
  {
    name: 'María González',
    role: 'Arquitecta de Interiores',
    text: 'Trabajar con DomoTech es una experiencia excepcional. Su equipo entiende perfectamente la integración entre diseño y tecnología.',
    rating: 5,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Director, Hotel Boutique Cielo',
    text: 'Implementaron todo el sistema de automatización de nuestro hotel. Los huéspedes quedan impresionados con la experiencia tecnológica.',
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="container-custom relative z-10 py-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-12 bg-blue-400" />
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                Domótica & Automatización
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            >
              Tu Hogar del <br />
              <span className="gradient-text">Futuro, Hoy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed"
            >
              Diseñamos e implementamos soluciones de automatización inteligente que
              transforman hogares y empresas. Control total desde cualquier lugar, en
              cualquier momento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/simulador" className="btn-primary text-lg no-underline">
                Simular Costos <HiChevronRight />
              </Link>
              <Link to="/experiencia-3d" className="btn-secondary text-lg no-underline">
                <HiPlay /> Recorrido 3D
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Soluciones</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Tecnología de vanguardia para cada aspecto de tu hogar inteligente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to="/productos"
                  className="block bg-white rounded-2xl p-8 card-hover shadow-sm border border-gray-100 no-underline group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                    <product.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    {product.desc}
                  </p>
                  <span className="text-blue-500 text-sm font-semibold flex items-center gap-1">
                    Conocer más <HiChevronRight />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/productos" className="btn-primary no-underline">
              Ver Todos los Productos <HiChevronRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">¿Por qué elegirnos?</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                Experiencia que <span className="gradient-text">Marca la Diferencia</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Con más de 15 años en el mercado, somos líderes en integración de sistemas
                de automatización residencial y comercial. Nuestro equipo certificado garantiza
                instalaciones impecables.
              </p>
              <div className="space-y-4">
                {[
                  'Diseño personalizado para cada proyecto',
                  'Tecnología de marcas líderes mundiales',
                  'Instalación profesional certificada',
                  'Soporte técnico 24/7',
                  'Garantía extendida en todos los equipos',
                  'Integración con asistentes de voz (Alexa, Google, Siri)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HiCheck className="text-blue-500" size={14} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/nosotros" className="btn-primary no-underline">
                  Conocer Más <HiChevronRight />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-1">
                <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                  }} />
                  <div className="relative z-10 space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <HiDesktopComputer className="text-white" size={32} />
                      </div>
                      <h3 className="text-white text-lg font-bold">Panel de Control</h3>
                      <p className="text-gray-400 text-sm">Dashboard Inteligente</p>
                    </div>
                    {[
                      { label: 'Iluminación Sala', value: '75%', icon: HiLightBulb, active: true },
                      { label: 'Temperatura', value: '22°C', icon: FaThermometerHalf, active: true },
                      { label: 'Alarma', value: 'Activa', icon: HiShieldCheck, active: true },
                      { label: 'Persianas', value: 'Abiertas', icon: HiSun, active: false },
                      { label: 'Puerta Principal', value: 'Cerrada', icon: FaDoorOpen, active: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <item.icon className="text-blue-400" size={20} />
                          <span className="text-white text-sm">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm">{item.value}</span>
                          <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-green-400' : 'bg-gray-500'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Descubre tu Hogar Inteligente
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Usa nuestras herramientas interactivas para explorar las posibilidades de la domótica
                y calcular el costo de tu proyecto personalizado.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Link
                to="/simulador"
                className="glass-card rounded-2xl p-6 text-center no-underline group hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <svg className="text-blue-400 group-hover:text-white" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="12" y2="14" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Simulador de Costos</h3>
                <p className="text-gray-400 text-sm">Calcula el presupuesto de tu proyecto</p>
              </Link>
              <Link
                to="/experiencia-3d"
                className="glass-card rounded-2xl p-6 text-center no-underline group hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                  <svg className="text-cyan-400 group-hover:text-white" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">Recorrido 3D</h3>
                <p className="text-gray-400 text-sm">Explora un hogar domótico en 3D</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Testimonios</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <HiStar key={j} className="text-amber-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para Transformar tu Espacio?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y recibe una asesoría gratuita. Nuestro equipo diseñará
              la solución perfecta para ti.
            </p>
            <Link to="/contacto" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors no-underline inline-block">
              Solicitar Asesoría Gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
