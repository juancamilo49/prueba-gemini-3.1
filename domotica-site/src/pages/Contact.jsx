import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiCheck } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', projectType: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', company: '', projectType: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Contacto</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
              Hablemos de tu <span className="gradient-text">Proyecto</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Estamos listos para ayudarte a transformar tu espacio. Contáctanos y recibe
              una asesoría personalizada sin compromiso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeUp} className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HiLocationMarker className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                      <p className="text-gray-500 text-sm">
                        Calle 100 #19-61, Oficina 802<br />
                        Bogotá, Colombia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HiPhone className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                      <p className="text-gray-500 text-sm">+57 (1) 234 5678</p>
                      <p className="text-gray-500 text-sm">+57 300 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HiMail className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-500 text-sm">info@domotech.co</p>
                      <p className="text-gray-500 text-sm">ventas@domotech.co</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  {[
                    { icon: FaWhatsapp, color: 'bg-green-500' },
                    { icon: FaFacebook, color: 'bg-blue-600' },
                    { icon: FaInstagram, color: 'bg-pink-500' },
                    { icon: FaLinkedin, color: 'bg-blue-700' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity no-underline`}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sábados</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Domingos</span>
                    <span className="font-medium text-red-500">Cerrado</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-gray-600">
                    <span>Soporte Técnico</span>
                    <span className="font-medium text-emerald-600">24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un Mensaje</h3>
                <p className="text-gray-500 mb-8">Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.</p>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <HiCheck className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-emerald-800 font-semibold">¡Mensaje enviado!</p>
                      <p className="text-emerald-600 text-sm">Nos pondremos en contacto contigo pronto.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Proyecto *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial / Corporativo</option>
                      <option value="hotel">Hotel / Hospitality</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-96 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-cyan-900/90 flex items-center justify-center">
          <div className="text-center text-white">
            <HiLocationMarker size={48} className="mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-2">Visítanos</h3>
            <p className="text-gray-300">Calle 100 #19-61, Oficina 802 — Bogotá, Colombia</p>
          </div>
        </div>
      </section>
    </>
  );
}
