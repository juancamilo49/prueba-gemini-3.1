import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiLightBulb, HiShieldCheck, HiDesktopComputer,
  HiChevronRight, HiCheck, HiCog, HiSupport, HiClipboardCheck
} from 'react-icons/hi';
import { FaProjectDiagram, FaTools, FaGraduationCap, FaHandshake } from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const services = [
  {
    icon: FaProjectDiagram,
    title: 'Consultoría y Diseño',
    desc: 'Analizamos tu proyecto y diseñamos la solución de automatización perfecta. Desde la conceptualización hasta los planos técnicos detallados.',
    features: ['Análisis de necesidades', 'Diseño de planos', 'Selección de equipos', 'Presupuesto detallado'],
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: FaTools,
    title: 'Instalación Profesional',
    desc: 'Equipo técnico certificado que ejecuta la instalación con los más altos estándares de calidad y seguridad.',
    features: ['Técnicos certificados', 'Cableado estructurado', 'Configuración completa', 'Pruebas integrales'],
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: HiCog,
    title: 'Programación e Integración',
    desc: 'Programamos y configuramos todos los sistemas para que trabajen en armonía, creando escenas y automatizaciones.',
    features: ['Programación de escenas', 'Integración multi-sistema', 'Personalización UI', 'Automatizaciones IA'],
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: HiSupport,
    title: 'Soporte & Mantenimiento',
    desc: 'Servicio de soporte técnico 24/7 y mantenimiento preventivo para asegurar el funcionamiento óptimo.',
    features: ['Soporte 24/7', 'Monitoreo remoto', 'Mantenimiento preventivo', 'Actualizaciones de firmware'],
    color: 'from-red-400 to-red-600',
  },
  {
    icon: FaGraduationCap,
    title: 'Capacitación',
    desc: 'Entrenamos a tu equipo o familia para aprovechar al máximo todas las funcionalidades del sistema.',
    features: ['Curso presencial', 'Manuales personalizados', 'Videos tutoriales', 'Soporte post-capacitación'],
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: FaHandshake,
    title: 'Proyectos Llave en Mano',
    desc: 'Nos encargamos de todo, desde el diseño hasta la entrega final. Un solo interlocutor para tu proyecto completo.',
    features: ['Gestión integral', 'Cronograma garantizado', 'Un solo punto de contacto', 'Garantía total'],
    color: 'from-cyan-400 to-cyan-600',
  },
];

const process = [
  {
    step: '01',
    title: 'Consulta Inicial',
    desc: 'Nos reunimos contigo para entender tus necesidades, preferencias y presupuesto.',
  },
  {
    step: '02',
    title: 'Diseño del Proyecto',
    desc: 'Creamos un diseño personalizado con selección de equipos y planos técnicos.',
  },
  {
    step: '03',
    title: 'Propuesta y Aprobación',
    desc: 'Presentamos la propuesta detallada con cronograma y costos desglosados.',
  },
  {
    step: '04',
    title: 'Instalación',
    desc: 'Nuestro equipo ejecuta la instalación siguiendo los más altos estándares.',
  },
  {
    step: '05',
    title: 'Programación y Pruebas',
    desc: 'Configuramos, programamos y realizamos pruebas exhaustivas de todo el sistema.',
  },
  {
    step: '06',
    title: 'Entrega y Capacitación',
    desc: 'Entregamos el proyecto y capacitamos a los usuarios para su uso óptimo.',
  },
];

export default function Services() {
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
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Servicios</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
              Soluciones <span className="gradient-text">Integrales</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Desde la consultoría inicial hasta el soporte continuo, te acompañamos
              en cada etapa de tu proyecto de domótica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <HiCheck className="text-blue-500 flex-shrink-0" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Metodología</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Un proceso estructurado para garantizar resultados excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <span className="text-6xl font-black text-blue-50 absolute top-4 right-6">
                  {p.step}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Sectores</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Sectores que Atendemos
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Residencial', desc: 'Hogares y apartamentos inteligentes' },
              { icon: '🏢', title: 'Corporativo', desc: 'Oficinas y edificios comerciales' },
              { icon: '🏨', title: 'Hospitality', desc: 'Hoteles y restaurantes' },
              { icon: '🏥', title: 'Salud', desc: 'Clínicas y hospitales inteligentes' },
            ].map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100"
              >
                <span className="text-5xl mb-4 block">{sector.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{sector.title}</h3>
                <p className="text-gray-500 text-sm">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para Comenzar tu Proyecto?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Solicita una consulta gratuita y nuestro equipo te guiará en cada paso del proceso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacto" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors no-underline">
                Agendar Consulta Gratuita
              </Link>
              <Link to="/simulador" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors no-underline">
                Simular Costos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
