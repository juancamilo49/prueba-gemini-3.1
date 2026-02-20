import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck, HiChevronRight } from 'react-icons/hi';
import { FaAward, FaCertificate, FaUsers, FaGlobeAmericas } from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const team = [
  { name: 'Andrés Martínez', role: 'CEO & Fundador', bio: 'Ingeniero electrónico con 20+ años en automatización.' },
  { name: 'Laura Ramírez', role: 'Directora de Proyectos', bio: 'Experta en gestión de proyectos de domótica premiada.' },
  { name: 'Diego Torres', role: 'CTO', bio: 'Arquitecto de soluciones IoT y especialista en integraciones.' },
  { name: 'Camila López', role: 'Diseñadora UX/UI', bio: 'Diseña interfaces intuitivas para sistemas inteligentes.' },
];

const timeline = [
  { year: '2010', title: 'Fundación', desc: 'DomoTech nace con la visión de llevar la automatización a cada hogar.' },
  { year: '2013', title: 'Primera Certificación', desc: 'Obtenemos la certificación internacional en sistemas de control.' },
  { year: '2016', title: 'Expansión Regional', desc: 'Abrimos operaciones en 5 países de Latinoamérica.' },
  { year: '2019', title: '500 Proyectos', desc: 'Alcanzamos la marca de 500 proyectos completados exitosamente.' },
  { year: '2022', title: 'IA & IoT', desc: 'Integramos inteligencia artificial en nuestras soluciones.' },
  { year: '2025', title: 'Liderazgo', desc: 'Reconocidos como líderes del sector en Latinoamérica.' },
];

const partners = ['Crestron', 'Lutron', 'Control4', 'Savant', 'Sonos', 'RTI', 'Shure', 'Cisco'];

export default function About() {
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
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Nosotros</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
              Sobre <span className="gradient-text">DomoTech</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Más de 15 años transformando espacios en experiencias inteligentes.
              Conócenos y descubre por qué somos la elección preferida en domótica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              {...fadeUp}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border border-blue-100"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <FaGlobeAmericas className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Democratizar la tecnología de automatización y domótica, haciendo que cada
                hogar y empresa pueda disfrutar del confort, la seguridad y la eficiencia
                que ofrecen los espacios inteligentes. Nos comprometemos a entregar
                soluciones innovadoras y de alta calidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-10 border border-purple-100"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6">
                <FaAward className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser la empresa líder en soluciones de automatización inteligente en
                Latinoamérica, reconocida por nuestra excelencia técnica, innovación
                constante y compromiso con la satisfacción del cliente. Queremos que
                cada proyecto refleje el futuro de la vida conectada.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="hero-gradient py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaUsers, value: '500+', label: 'Proyectos' },
              { icon: FaCertificate, value: '25+', label: 'Certificaciones' },
              { icon: FaGlobeAmericas, value: '8', label: 'Países' },
              { icon: FaAward, value: '98%', label: 'Satisfacción' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Historia</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Nuestra Trayectoria</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Equipo</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Nuestro Equipo</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-500 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-widest">Partners</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Nuestros Aliados Tecnológicos</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-xl px-8 py-4 shadow-sm border border-gray-100 flex items-center justify-center"
              >
                <span className="text-xl font-bold text-gray-400">{partner}</span>
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
              ¿Quieres Ser Parte del Futuro?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Únete a las más de 500 familias y empresas que confían en DomoTech.
            </p>
            <Link to="/contacto" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors no-underline inline-block">
              Comienza Ahora <HiChevronRight className="inline" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
