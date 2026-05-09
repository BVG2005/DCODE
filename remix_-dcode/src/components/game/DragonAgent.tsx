import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { askDragon } from '../../services/geminiService';
import { cn } from '../../lib/utils';

export default function DragonAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'dragon'; text: string }[]>([
    { role: 'dragon', text: '¡Hola, pequeño aprendiz! Soy DCODE. ¿En qué misión de código puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const dragonResponse = await askDragon(input);
    setMessages(prev => [...prev, { role: 'dragon', text: dragonResponse || 'Grrr... no pude concentrarme.' }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 h-[450px] glass-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-dcode-magenta/20 to-dcode-purple/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ec4899] flex items-center justify-center shadow-[0_0_10px_#ff00ff]">
                  <span className="text-lg">🐲</span>
                </div>
                <span className="font-display font-bold text-sm text-[#ff00ff]">DRAGO AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#2d1b4d] to-[#1a1a2e]">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed",
                    msg.role === 'dragon' 
                      ? "bg-white/10 text-[#d8b4fe] rounded-tl-none mr-auto border border-white/5" 
                      : "bg-dcode-cyan/20 border border-dcode-cyan/30 rounded-tr-none ml-auto text-cyan-50"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none mr-auto p-3 text-xs w-12 flex gap-1 items-center">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregúntale al dragón..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-dcode-cyan transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="p-2 bg-dcode-cyan rounded-xl text-dcode-bg hover:brightness-110 active:scale-95 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative interactive-button",
          isOpen ? "bg-dcode-purple" : "bg-gradient-to-br from-dcode-cyan to-dcode-blue"
        )}
      >
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-dcode-cyan/30 blur-md"
          />
        )}
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <span className="text-3xl">🐉</span>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="text-dcode-yellow animate-pulse" size={16} />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
