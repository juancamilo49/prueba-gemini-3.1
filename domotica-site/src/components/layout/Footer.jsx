import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const footerLinks = {
  productos: [
    { name: 'Iluminación Inteligente', path: '/productos' },
    { name: 'Control de Clima', path: '/productos' },
    { name: 'Seguridad', path: '/productos' },
    { name: 'Audio & Video', path: '/productos' },
    { name: 'Control de Accesos', path: '/productos' },
  ],
  empresa: [
    { name: 'Sobre Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Simulador de Costos', path: '/simulador' },
    { name: 'Experiencia 3D', path: '/experiencia-3d' },
    { name: 'Contacto', path: '/contacto' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 no-underline mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">DomoTech</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Transformamos espacios en experiencias inteligentes. Líderes en automatización
              y domótica para hogares y empresas.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all no-underline"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Productos</h4>
            <ul className="space-y-3 list-none">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-blue-400 transition-colors no-underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-3 list-none">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-blue-400 transition-colors no-underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4 list-none">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm">Calle 100 #19-61, Oficina 802<br />Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-blue-400 flex-shrink-0" size={18} />
                <span className="text-sm">+57 (1) 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-blue-400 flex-shrink-0" size={18} />
                <span className="text-sm">info@domotech.co</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 DomoTech. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 no-underline">Política de Privacidad</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 no-underline">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
