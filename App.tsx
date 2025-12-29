
import React, { useState, useRef, useEffect } from 'react';
import { Role, Message } from './types.ts';
import { Icons, SAVAGE_TRIGGERS, NICE_TRIGGERS } from './constants.tsx';
import { streamWithSavageAI } from './services/gemini.ts';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isSavageMode, setIsSavageMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const placeholders = [
    "Speak, 2cmr luli...",
    "Ki koba, kukur puwali?",
    "Pukur marim kela, likh...",
    "Behan ke lan, speak up...",
    "Bokachoda, ki khobor?",
    "Mukh khul BC...",
    "Bara, input de kela...",
    "Jhant er user, speak..."
  ];

  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    if (!isTyping) {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }
  }, [messages, isTyping]);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 0 || currentResponse) {
      scrollToBottom(messages.length === 1 ? 'auto' : 'smooth');
    }
  }, [messages, currentResponse]);

  const detectMode = (text: string) => {
    const lower = text.toLowerCase();
    if (SAVAGE_TRIGGERS.some(t => lower.includes(t))) setIsSavageMode(true);
    if (NICE_TRIGGERS.some(t => lower.includes(t))) setIsSavageMode(false);
  };

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    const val = (customInput || input).trim();
    if (!val || isTyping) return;

    detectMode(val);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: val,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setCurrentResponse('');

    const history = messages.map(m => ({
      role: m.role === Role.USER ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    try {
      let full = '';
      const stream = streamWithSavageAI(val, history, isSavageMode);
      for await (const chunk of stream) {
        full += chunk;
        setCurrentResponse(full);
      }
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        content: full,
        timestamp: new Date(),
      }]);
      setCurrentResponse('');
    } catch (err) {
      setMessages(prev => [...prev, {
        id: 'err',
        role: Role.MODEL,
        content: "API error kela. Net check kor 2cmr. Pukur marim.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-zinc-950 text-zinc-100 selection:bg-white selection:text-black transition-all duration-700">
      
      {/* Responsive Header */}
      <nav className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <span 
            className="text-white font-bold tracking-[0.2em] text-[11px] md:text-[13px] uppercase cursor-pointer hover:opacity-70 transition-opacity" 
            onClick={() => setMessages([])}
          >
            IRONE
          </span>
          <button 
            onClick={() => setIsSavageMode(!isSavageMode)}
            className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[9px] md:text-[10px] mono uppercase tracking-[0.1em] transition-all border ${
              isSavageMode 
                ? 'text-white bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'text-zinc-500 bg-zinc-900/40 border-zinc-800 hover:text-zinc-300'
            }`}
          >
            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border transition-all ${isSavageMode ? 'bg-white border-white ring-pulse' : 'border-zinc-700 bg-transparent'}`} />
            <span className="hidden xs:inline">{isSavageMode ? 'UNFILTERED' : 'STANDARD'}</span>
            <span className="xs:hidden">{isSavageMode ? 'X' : 'S'}</span>
          </button>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 text-zinc-700 hover:text-white transition-colors touch-manipulation"
          title="Clear session"
        >
          <Icons.Trash />
        </button>
      </nav>

      {/* Optimized Chat Container */}
      <main 
        ref={mainRef}
        className="flex-1 overflow-y-auto pt-8 pb-32 px-5 md:px-8 max-w-2xl mx-auto w-full flex flex-col scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-10 animate-staggered">
            <div className="space-y-4 md:space-y-6 text-center animate-float">
              <div className="relative inline-block max-w-full overflow-hidden">
                <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter animate-glow type-writer pr-2 md:pr-4">
                  welcome baby
                </h1>
              </div>
              <p className="text-zinc-600 text-[9px] md:text-[11px] mono uppercase tracking-[0.3em] md:tracking-[0.5em] delay-500 opacity-60">
                SYSTEM ONLINE. NO FILTER MODE ACTIVE.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-10 md:space-y-12">
            {messages.map((m) => (
              <div key={m.id} className="space-y-2 md:space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className={`mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] ${
                  m.role === Role.USER ? 'text-zinc-700' : 'text-zinc-500'
                }`}>
                  {m.role === Role.USER ? 'USER' : (isSavageMode ? 'IRONE_X' : 'IRONE')}
                </div>
                <div className={`text-[14px] md:text-[15px] leading-relaxed font-normal whitespace-pre-wrap ${m.role === Role.USER ? 'text-white' : 'text-zinc-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {currentResponse && (
              <div className="space-y-2 md:space-y-3 animate-in fade-in duration-300">
                <div className="mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-zinc-700 animate-pulse">EXTRACTING</div>
                <div className="text-[14px] md:text-[15px] leading-relaxed text-zinc-400">
                  {currentResponse}
                  <span className="inline-block w-1.5 h-3 bg-zinc-600 ml-1 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </main>

      {/* Keyboard-Friendly Responsive Footer */}
      <footer className="p-5 md:p-8 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-2xl mx-auto w-full safe-bottom">
          <div className="relative group">
            <form onSubmit={handleSubmit}>
              <input 
                autoFocus
                className="w-full bg-transparent border-b border-zinc-900 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all placeholder:tracking-widest appearance-none"
                placeholder={isTyping ? "..." : placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                spellCheck="false"
                autoComplete="off"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white disabled:opacity-0 transition-all p-3 touch-manipulation"
              >
                <Icons.Send />
              </button>
            </form>
            <div className="mt-3 md:mt-4 flex justify-between items-center opacity-40">
              <span className="text-[7px] md:text-[8px] mono uppercase tracking-widest text-zinc-600">MAX 3 LNS</span>
              <span className="text-[7px] md:text-[8px] mono uppercase tracking-widest text-zinc-600">IRONE V1.1_PRO</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
