
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Role, Message } from './types.ts';
import { Icons, THEMES, ThemeType } from './constants.tsx';
import { streamWithAI } from './services/gemini.ts';

const Thunderstorm = ({ active }: { active: boolean }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!active) return;
    const triggerFlash = () => {
      if (Math.random() > 0.8) {
        setFlash(true);
        setTimeout(() => setFlash(false), 50 + Math.random() * 150);
        if (Math.random() > 0.5) {
          setTimeout(() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 50);
          }, 200);
        }
      }
      setTimeout(triggerFlash, 3000 + Math.random() * 7000);
    };
    const timer = setTimeout(triggerFlash, 2000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div 
      className={`fixed inset-0 z-[5] pointer-events-none transition-opacity duration-75 ${flash ? 'bg-white/20 opacity-100' : 'opacity-0'}`} 
    />
  );
};

const SnowForest = () => (
  <div className="fixed bottom-0 left-0 w-full h-[75dvh] z-0 pointer-events-none overflow-hidden">
    <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="w-full h-full transition-all duration-1000">
      <defs>
        <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <g className="fill-black opacity-95">
        <path d="M-50,800 L0,300 L80,450 L40,470 L120,580 L80,600 L200,750 L0,800 Z" opacity="0.4" />
        <path d="M0,800 L30,400 L90,480 L50,490 L130,580 L70,600 L180,750 L0,800 Z" opacity="0.7" />
        <path d="M0,800 L0,450 L40,480 L10,490 L60,550 L30,560 L90,650 L0,800 Z" />
        
        <path d="M1250,800 L1200,320 L1120,470 L1160,490 L1080,600 L1120,620 L1000,770 L1200,800 Z" opacity="0.4" />
        <path d="M1200,800 L1170,380 L1110,480 L1150,500 L1070,600 L1130,620 L1020,770 L1200,800 Z" opacity="0.7" />
        <path d="M1200,800 L1200,420 L1160,470 L1190,480 L1140,540 L1170,550 L1110,640 L1200,800 Z" />
      </g>

      <rect width="1200" height="800" fill="url(#mistGrad)" />
      
      <ellipse cx="600" cy="780" rx="400" ry="100" fill="white" opacity="0.15" />
      <path d="M0,800 Q300,720 600,760 Q900,800 1200,740 L1200,800 L0,800 Z" fill="white" opacity="0.2" />
    </svg>
    
    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
  </div>
);

const AntigravityBackground = ({ theme, isLabiba }: { theme: ThemeType, isLabiba: boolean }) => {
  const config = THEMES[theme];
  const particles = useMemo(() => {
    const count = theme === 'snow' ? 120 : (theme === 'water' ? 200 : 40);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: theme === 'water' ? Math.random() * 2 + 1 : (theme === 'snow' ? Math.random() * 3 + 1 : (config.particleType === 'fall' ? Math.random() * 4 + 2 : Math.random() * 3 + 1)),
      left: Math.random() * 100,
      duration: theme === 'water' ? 0.3 + Math.random() * 0.4 : (theme === 'snow' ? 2.5 + Math.random() * 6 : (config.particleType === 'fall' ? 5 + Math.random() * 5 : 10 + Math.random() * 25)),
      delay: Math.random() * 20,
      opacity: theme === 'water' ? 0.2 + Math.random() * 0.4 : (theme === 'snow' ? 0.4 + Math.random() * 0.6 : 0.1 + Math.random() * 0.2),
      blur: theme === 'snow' && Math.random() > 0.85 ? 'blur-[1px]' : 'blur-[0px]',
      height: theme === 'water' ? 20 + Math.random() * 40 : 0,
    }));
  }, [theme]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes driftUp {
          0% { transform: translateY(0) rotate(0deg) translateX(0); }
          50% { transform: translateY(-50dvh) rotate(180deg) translateX(15px); }
          100% { transform: translateY(-110dvh) rotate(360deg) translateX(0); }
        }
        @keyframes driftDown {
          0% { transform: translateY(-110dvh) rotate(0deg) translateX(0); }
          100% { transform: translateY(110dvh) rotate(360deg) translateX(0); }
        }
        @keyframes snowFall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
          33% { transform: translateY(30vh) translateX(15px) rotate(120deg); }
          66% { transform: translateY(70vh) translateX(-15px) rotate(240deg); }
          100% { transform: translateY(110vh) translateX(0) rotate(360deg); }
        }
        @keyframes rainFall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(110dvh); }
        }
        @keyframes driftFloat {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-20px, -60px) scale(0.9); }
          100% { transform: translate(0, -110dvh) scale(1); }
        }
        .particle-anim {
          position: absolute;
          border-radius: 50%;
        }
        .rain-anim {
          position: absolute;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.5));
        }
      `}</style>
      {particles.map((p) => {
        let animationName = 'driftUp';
        if (theme === 'snow') animationName = 'snowFall';
        else if (theme === 'water') animationName = 'rainFall';
        else if (config.particleType === 'fall') animationName = 'driftDown';
        else if (config.particleType === 'float') animationName = 'driftFloat';

        if (theme === 'water') {
           return (
            <div
              key={p.id}
              className="rain-anim"
              style={{
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: '-100px',
                opacity: p.opacity,
                animation: `rainFall ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
              }}
            />
          );
        }

        return (
          <div
            key={p.id}
            className={`particle-anim ${isLabiba ? 'bg-pink-300' : config.particle} ${p.blur}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: config.particleType === 'fall' || theme === 'snow' ? 'auto' : '-20px',
              top: config.particleType === 'fall' || theme === 'snow' ? '-20px' : 'auto',
              opacity: p.opacity,
              animation: `${animationName} ${p.duration}s linear infinite`,
              animationDelay: `-${p.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const RomanceShower = ({ active }: { active: boolean }) => {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; scale: number; char: string }[]>([]);
  const chars = ['❤️', '💖', '💝', '🌷', '✨', '🌸', '🌷', '💓', '🌹', '💐'];
  
  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => setItems([]), 500);
      return () => clearTimeout(timer);
    }
    
    const interval = setInterval(() => {
      setItems(prev => [
        ...prev.slice(-40), 
        { 
          id: Date.now() + Math.random(), 
          left: Math.random() * 100, 
          delay: Math.random() * 0.05,
          scale: 0.6 + Math.random() * 1.2,
          char: chars[Math.floor(Math.random() * chars.length)]
        }
      ]);
    }, 60);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {items.map(h => (
        <div
          key={h.id}
          className="absolute bottom-[-50px] text-xl md:text-3xl animate-float-up"
          style={{ 
            left: `${h.left}%`, 
            animationDelay: `${h.delay}s`,
            transform: `scale(${h.scale})`,
            filter: 'drop-shadow(0 0 10px rgba(255,100,200,0.4))'
          }}
        >
          {h.char}
        </div>
      ))}
    </div>
  );
};

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-all p-1 text-zinc-500"
      title="Copy to clipboard"
    >
      {copied ? <Icons.Check /> : <Icons.Copy />}
    </button>
  );
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [showRomance, setShowRomance] = useState(false);
  
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('irone_theme');
    return (saved as ThemeType) || 'standard';
  });
  
  const [isLabibaMode, setIsLabibaMode] = useState(() => {
    return localStorage.getItem('irone_is_labiba') === 'true';
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));

  useEffect(() => {
    localStorage.setItem('irone_theme', currentTheme);
    localStorage.setItem('irone_is_labiba', String(isLabibaMode));
  }, [currentTheme, isLabibaMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString([], { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const themes: ThemeType[] = ['standard', 'fire', 'snow', 'water'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const triggerRomanceBurst = () => {
    setShowRomance(true);
    setTimeout(() => setShowRomance(false), 3000);
  };

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    
    const val = (customInput || input).trim();
    if (!val || isTyping) return;

    let currentlyLabiba = isLabibaMode;
    const labibaKeywords = ["i am labiba", "moi labiba", "labiba nushan", "it's labiba", "labiba here", "queen labiba"];
    if (labibaKeywords.some(k => val.toLowerCase().includes(k))) {
      currentlyLabiba = true;
      setIsLabibaMode(true);
      triggerRomanceBurst();
    } else if (currentlyLabiba) {
      triggerRomanceBurst();
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
      const stream = streamWithAI(val, history, false, currentlyLabiba);
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

  const themeData = THEMES[currentTheme];
  const accentColor = isLabibaMode ? 'text-pink-500' : themeData.accent;
  const selectionColor = isLabibaMode ? 'pink-500' : themeData.accent.replace('text-', '');
  const borderColor = isLabibaMode ? 'border-pink-900/20' : 'border-zinc-800';

  return (
    <div className={`flex flex-col h-[100dvh] ${themeData.bg} text-zinc-400 selection:bg-${selectionColor} transition-all duration-1000 overflow-hidden`}>
      <AntigravityBackground theme={currentTheme} isLabiba={isLabibaMode} />
      {currentTheme === 'snow' && <SnowForest />}
      <Thunderstorm active={currentTheme === 'water'} />
      <RomanceShower active={showRomance} />
      
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 md:py-12 z-50">
        <div className="flex items-center gap-4">
          <h1 
            className={`text-xl md:text-2xl font-[900] uppercase tracking-tighter cursor-pointer ${accentColor} transition-colors`} 
            onClick={() => {
              setMessages([]);
              setIsLabibaMode(false);
              localStorage.removeItem('irone_is_labiba');
            }}
          >
            IRONE
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="text-zinc-800 hover:text-white transition-colors p-2"
              title="Toggle Theme"
            >
              <Icons.Theme />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="mono text-[10px] text-zinc-800 font-bold uppercase tracking-widest hidden md:block">
            {isLabibaMode ? 'QUEEN_MODE' : themeData.name} / {systemTime}
          </span>
          <button 
            onClick={() => {
              setMessages([]);
              setIsLabibaMode(false);
              localStorage.removeItem('irone_is_labiba');
            }} 
            className="text-zinc-800 hover:text-white transition-opacity"
          >
            <Icons.Trash />
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-6 md:px-12 z-10 relative">
        <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
          
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-24">
              <h2 className={`text-4xl md:text-7xl font-[900] uppercase tracking-tighter animate-welcome ${isLabibaMode ? 'text-pink-500' : 'text-white'}`}>
                {isLabibaMode ? 'WELCOME QUEEN' : 'WELCOME BABY'}
              </h2>
            </div>
          ) : (
            <div className="flex flex-col gap-12 md:gap-16 pt-4 pb-48">
              {messages.map((m) => (
                <div key={m.id} className="message-fade-in group">
                  <div className="flex flex-col gap-2 relative">
                    <div className={`mono text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${m.role === Role.USER ? 'justify-end text-zinc-800' : 'justify-start ' + accentColor + ' opacity-40'}`}>
                      {m.role === Role.USER ? 'INPUT' : (
                        <>
                          <span>RESPONSE</span>
                          <CopyButton content={m.content} />
                        </>
                      )}
                    </div>
                    <div className={`text-base md:text-xl leading-relaxed ${
                      m.role === Role.USER ? 'text-zinc-600 font-medium italic text-right' : (isLabibaMode ? 'text-pink-100 font-semibold drop-shadow-[0_0_12px_rgba(255,182,193,0.4)]' : 'text-zinc-100 font-bold')
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

      <footer className={`fixed bottom-0 left-0 right-0 p-6 md:p-12 z-50`}>
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
              <span>{isLocalMode ? 'LOCAL_NODE' : 'CORE_STREAM'}</span>
              <span>8MS</span>
            </div>
            <span>V_9.0.0_STORM_PULSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
