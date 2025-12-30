
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Role, Message } from './types.ts';
import { Icons } from './constants.tsx';
import { streamWithAI } from './services/gemini.ts';

const AntigravityBackground = ({ colorClass }: { colorClass: string }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 20,
    }));
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${colorClass}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-10px',
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HeartShower = ({ active }: { active: boolean }) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);
  const [isSpawning, setIsSpawning] = useState(false);

  useEffect(() => {
    if (active) {
      setIsSpawning(true);
      const timer = setTimeout(() => setIsSpawning(false), 2000); 
      return () => clearTimeout(timer);
    }
  }, [active]);
  
  useEffect(() => {
    if (!isSpawning) return;
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-15), 
        { 
          id: Date.now() + Math.random(), 
          left: Math.random() * 100, 
          delay: Math.random() * 0.2,
          scale: 0.5 + Math.random() * 0.8
        }
      ]);
    }, 150);
    return () => clearInterval(interval);
  }, [isSpawning]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute bottom-[-50px] text-xl md:text-2xl animate-float-up"
          style={{ 
            left: `${h.left}%`, 
            animationDelay: `${h.delay}s`,
            transform: `scale(${h.scale})`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [isLabibaMode, setIsLabibaMode] = useState(false);
  const [triggerHearts, setTriggerHearts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString([], { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    const val = (customInput || input).trim();
    if (!val || isTyping) return;

    if (val.toLowerCase().includes("i am labiba") || val.toLowerCase().includes("moi labiba")) {
      setIsLabibaMode(true);
      setTriggerHearts(true);
      setTimeout(() => setTriggerHearts(false), 2500);
    }

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
    
    const hasKey = typeof process !== 'undefined' && !!process.env.API_KEY;
    setIsLocalMode(!hasKey);

    const history = messages.map(m => ({
      role: m.role === Role.USER ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    try {
      let full = '';
      const stream = streamWithAI(val, history);
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
      console.error(err);
    } finally {
      setIsTyping(false);
      setIsLocalMode(false);
    }
  };

  const accentColor = isLabibaMode ? 'text-pink-500' : 'text-orange-500';
  const selectionColor = isLabibaMode ? 'pink-500' : 'orange-500';
  const borderColor = isLabibaMode ? 'border-pink-900/20' : 'border-zinc-800';

  return (
    <div className={`flex flex-col h-[100dvh] bg-[#080808] text-zinc-400 selection:bg-${selectionColor} transition-all duration-1000 overflow-hidden`}>
      <AntigravityBackground colorClass={accentColor} />
      <HeartShower active={triggerHearts} />
      
      {/* Brutalist Header - Only occurrence of IRONE */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 md:py-12 z-50">
        <h1 
          className={`text-xl md:text-2xl font-[900] uppercase tracking-tighter cursor-pointer ${accentColor} transition-colors`} 
          onClick={() => {
            setMessages([]);
            setIsLabibaMode(false);
          }}
        >
          IRONE
        </h1>
        <div className="flex items-center gap-6">
          <span className="mono text-[10px] text-zinc-800 font-bold uppercase tracking-widest hidden md:block">{systemTime}</span>
          <button 
            onClick={() => {
              setMessages([]);
              setIsLabibaMode(false);
            }} 
            className="text-zinc-800 hover:text-white transition-opacity"
            aria-label="Purge"
          >
            <Icons.Trash />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto px-6 md:px-12 z-10 relative">
        <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
          
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-24">
              <h2 className={`text-4xl md:text-7xl font-[900] uppercase tracking-tighter animate-welcome ${isLabibaMode ? 'text-pink-500' : 'text-white'}`}>
                WELCOME BABY
              </h2>
            </div>
          ) : (
            <div className="flex flex-col gap-12 md:gap-16 pt-4 pb-48">
              {messages.map((m) => (
                <div key={m.id} className="message-fade-in">
                  <div className="flex flex-col gap-2">
                    <div className={`mono text-[8px] font-black uppercase tracking-widest ${m.role === Role.USER ? 'text-zinc-800 text-right' : accentColor + ' opacity-40'}`}>
                      {m.role === Role.USER ? 'INPUT' : 'RESPONSE'}
                    </div>
                    <div className={`text-base md:text-xl leading-relaxed ${
                      m.role === Role.USER ? 'text-zinc-600 font-medium italic text-right' : 'text-zinc-100 font-bold'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {currentResponse && (
                <div className="message-fade-in">
                  <div className="flex flex-col gap-2">
                    <div className={`mono text-[8px] font-black uppercase tracking-widest animate-pulse ${accentColor} opacity-40`}>
                      ...
                    </div>
                    <div className="text-base md:text-xl leading-relaxed text-zinc-100 font-bold">
                      {currentResponse}
                      <span className={`cursor-blink ml-1 ${accentColor}`}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Brutally Minimalist Footer Input */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 md:p-12 z-50 bg-gradient-to-t from-[#080808] via-[#080808] to-transparent">
        <div className="max-w-3xl mx-auto w-full">
          <div className={`border-b-2 transition-all duration-300 ${borderColor}`}>
            <form onSubmit={handleSubmit} className="flex items-center">
              <input 
                ref={inputRef}
                autoFocus
                className="w-full bg-transparent py-4 md:py-6 text-base md:text-xl text-white placeholder:text-zinc-900 focus:outline-none mono font-bold uppercase tracking-wider"
                placeholder={isTyping ? "" : "SPEAK..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                spellCheck="false"
                autoComplete="off"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`p-2 transition-transform active:scale-90 disabled:opacity-0 ${accentColor}`}
              >
                <Icons.Send />
              </button>
            </form>
          </div>
          
          <div className="mt-8 flex justify-between items-center text-[8px] md:text-[9px] mono font-bold uppercase tracking-[0.4em] opacity-10">
            <div className="flex gap-8">
              <span>ACTIVE</span>
              <span>18MS</span>
            </div>
            <span>V_1.0.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
