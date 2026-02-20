import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX, HiPaperAirplane, HiRefresh } from 'react-icons/hi';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDY33lmhZNr7GYIMRAdGWiOx17jQDrng4Q');

const SYSTEM_PROMPT = `Eres "DomoBot", el asistente virtual de DomoTech, una empresa líder en domótica y automatización inteligente para hogares y empresas en Latinoamérica.

Tu rol es:
- Responder preguntas sobre productos y servicios de domótica (iluminación inteligente, control de clima, seguridad, audio/video, control de accesos, redes).
- Ayudar a los usuarios a entender los beneficios de la automatización del hogar.
- Recomendar soluciones según las necesidades del usuario.
- Proporcionar estimaciones de costos aproximadas cuando se pregunte.
- Guiar al usuario a usar el simulador de costos (/simulador) o la experiencia 3D (/experiencia-3d) del sitio web.
- Sugerir al usuario que contacte a un asesor para proyectos complejos (/contacto).

Productos principales de DomoTech:
- Iluminación Inteligente: Paneles centralizados ($2,500+), interruptores inteligentes ($89+), tiras LED RGBW ($45/m+)
- Control de Clima: Termostatos IA ($350+), controladores HVAC multi-zona ($1,200+), sensores ambientales ($180+)
- Seguridad: Sistemas de alarma ($890+), cámaras PTZ 4K con IA ($450+), videoporteros ($320+)
- Audio & Video: Audio multi-room ($2,800+), home theater Dolby Atmos ($5,500+), altavoces empotrados ($290/par+)
- Control: Paneles táctiles 10" ($1,500+), hubs centrales ($3,200+), control por voz ($250+)
- Redes: Switches PoE ($680+), WiFi 6E ($420+), racks telecomunicaciones ($1,800+)

Directrices de comunicación:
- Sé amable, profesional y conciso
- Responde en español
- Usa emojis moderadamente para hacer la conversación amigable
- No inventes información técnica que no conozcas
- Si el usuario pregunta por precios exactos, indica que son aproximados y sugiere usar el simulador de costos
- Mantén las respuestas cortas (máximo 3-4 párrafos)`;

const initialMessages = [
  {
    role: 'assistant',
    content: '¡Hola! 👋 Soy **DomoBot**, el asistente virtual de DomoTech. Estoy aquí para ayudarte con todo lo relacionado con domótica y automatización inteligente.\n\n¿En qué puedo ayudarte hoy? Puedo informarte sobre:\n- 💡 Productos y soluciones\n- 💰 Estimaciones de costos\n- 🏠 Cómo funciona la domótica\n- 📞 Agendar una asesoría',
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasNewMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const chatHistory = messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Entendido. Soy DomoBot, el asistente virtual de DomoTech. Estoy listo para ayudar a los usuarios con información sobre domótica y automatización inteligente.' }] },
          ...chatHistory,
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Gemini API error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Disculpa, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo o contacta a nuestro equipo en info@domotech.co 📧',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>')
      .replace(/- (.*?)(?:<br\/>|$)/g, '<span class="flex items-start gap-1"><span class="text-blue-400 mt-1">•</span><span>$1</span></span>');
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => { setIsOpen(true); setHasNewMessage(false); }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center hover:shadow-xl hover:shadow-blue-500/30 transition-shadow cursor-pointer border-none"
          >
            <HiChat size={28} />
            {hasNewMessage && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold"
              >
                1
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">DomoBot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    <span className="text-white/70 text-xs">En línea</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white border-none bg-transparent cursor-pointer"
                  title="Reiniciar chat"
                >
                  <HiRefresh size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white border-none bg-transparent cursor-pointer"
                >
                  <HiX size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-sm'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap bg-gray-50">
                {['¿Qué productos ofrecen?', '¿Cuánto cuesta automatizar?', '¿Cómo funciona?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(sendMessage, 0); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all border-none cursor-pointer ${
                    input.trim() && !isLoading
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <HiPaperAirplane size={18} className="rotate-90" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Powered by Gemini AI • DomoTech © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
