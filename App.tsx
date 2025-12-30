
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Role, Message } from './types.ts';
import { Icons, THEMES, ThemeType } from './constants.tsx';
import { streamWithAI } from './services/gemini.ts';

const QUOTA_LIMIT = 15; // Set to 15 per hour as requested
const RESET_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

const ShootingStars = ({ active }: { active: boolean }) => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; width: number }[]>([]);

  useEffect(() => {
    if (!active) {
      setStars([]);
      return;
    }

    const triggerStar = () => {
      const id = Date.now();
      const newStar = {
        id,
        top: Math.random() * 40,
        left: 60 + Math.random() * 40,
        width: 150 + Math.random() * 250,
      };
      setStars(prev => [...prev, newStar]);
      
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== id));
      }, 1200);

      const nextDelay = 2000 + Math.random() * 8000;
      return setTimeout(triggerStar, nextDelay);
    };

    const timerId = triggerStar();
    return () => clearTimeout(timerId);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map(star => (
        <div 
          key={star.id} 
          className="shooting-star" 
          style={{ top: `${star.top}%`, left: `${star.left}%`, width: `${star.width}px` }} 
        />
      ))}
    </div>
  );
};

const SkyCycle = ({ theme }: { theme: ThemeType }) => {
  if (theme !== 'moonlight') return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#02040a] via-[#0a1128] to-[#000000] opacity-90" />
      <div className="fixed top-[12%] left-[10%] w-36 h-36 md:w-64 md:h-64 rounded-full z-10 pointer-events-none transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
          boxShadow: '0 0 100px 10px rgba(255, 255, 255, 0.2), inset -10px -10px 30px rgba(0,0,0,0.1)',
          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
        }}
      >
        <div className="absolute inset-0 opacity-10 overflow-hidden rounded-full mix-blend-multiply">
            <div className="absolute top-[20%] left-[25%] w-10 h-10 bg-slate-800 rounded-full blur-sm" />
            <div className="absolute top-[55%] left-[40%] w-14 h-14 bg-slate-900 rounded-full blur-md" />
            <div className="absolute top-[35%] left-[60%] w-8 h-8 bg-slate-800 rounded-full blur-sm" />
        </div>
      </div>
      <div className="fixed top-[12%] left-[10%] w-36 h-36 md:w-64 md:h-64 rounded-full blur-[80px] bg-white/5 z-0 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 50%)' }} />
      <ShootingStars active={true} />
    </>
  );
};

const PineTree = ({ x, scale, opacity }: { x: number; scale: number; opacity: number }) => (
  <g transform={`translate(${x}, 800) scale(${scale}) translate(0, -400)`} opacity={opacity}>
    <path d="M0,0 L-40,100 L-10,100 L-50,200 L-15,200 L-60,300 L60,300 L15,200 L50,200 L10,100 L40,100 Z" />
    <rect x="-10" y="300" width="20" height="100" />
  </g>
);

const ForestPath = ({ theme }: { theme: ThemeType }) => {
  const isStorm = theme === 'water';
  const isNight = theme === 'moonlight';
  const isSnow = theme === 'snow';
  const forestOpacity = isStorm ? '0.8' : (isNight ? '0.7' : '0.95');
  const treeFill = isSnow ? '#050505' : 'black';

  return (
    <div className="fixed bottom-0 left-0 w-full h-[85dvh] z-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="w-full h-full transition-all duration-1000">
        <g fill={treeFill} style={{ opacity: forestOpacity }}>
          <PineTree x={100} scale={0.8} opacity={0.3} />
          <PineTree x={250} scale={1.2} opacity={0.6} />
          <PineTree x={-50} scale={1.5} opacity={0.9} />
          <PineTree x={900} scale={0.9} opacity={0.3} />
          <PineTree x={1050} scale={1.3} opacity={0.6} />
          <PineTree x={1200} scale={1.6} opacity={0.9} />
        </g>
        {isSnow && (
          <path 
            d="M0,800 Q300,750 600,780 T1200,760 L1200,800 L0,800 Z" 
            fill="white" 
            opacity="0.95"
            className="transition-opacity duration-1000"
          />
        )}
      </svg>
    </div>
  );
};

const Thunderstorm = ({ active }: { active: boolean }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!active) {
      setFlash(false);
      return;
    }

    const triggerFlash = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 50 + Math.random() * 100);
      
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setFlash(true);
          setTimeout(() => setFlash(false), 50);
        }, 150);
      }

      const nextDelay = 3000 + Math.random() * 7000;
      return setTimeout(triggerFlash, nextDelay);
    };

    const timerId = triggerFlash();
    return () => clearTimeout(timerId);
  }, [active]);

  if (!active) return null;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-75 ${flash ? 'bg-white/10 opacity-100' : 'opacity-0'}`} 
    />
  );
};

const AntigravityBackground = ({ theme, isLabiba }: { theme: ThemeType, isLabiba: boolean }) => {
  const config = THEMES[theme] || THEMES.fire;
  const particles = useMemo(() => {
    const isStorm = theme === 'water';
    const isStars = theme === 'moonlight';
    const isFire = theme === 'fire';
    const count = isLabiba ? 120 : (isStars ? 400 : (theme === 'snow' ? 120 : (isStorm ? 250 : 60)));
    
    return Array.from({ length: count }).map((_, i) => {
      const isSpecial = isLabiba && Math.random() > 0.4;
      return {
        id: i,
        size: isStars ? Math.random() * 1.5 + 0.3 : (isStorm ? Math.random() * 1.5 + 0.5 : (theme === 'snow' ? Math.random() * 3 + 1 : (isFire ? Math.random() * 5 + 2 : (isLabiba ? Math.random() * 8 + 4 : 3)))),
        left: Math.random() * 100,
        top: isStars ? Math.random() * 100 : undefined,
        duration: isStars ? 3 + Math.random() * 4 : (isStorm ? 0.2 + Math.random() * 0.3 : (theme === 'snow' ? 2.5 + Math.random() * 6 : (isFire ? 8 + Math.random() * 15 : (isLabiba ? 12 + Math.random() * 10 : 10 + Math.random() * 25)))),
        delay: Math.random() * 20,
        opacity: isStars ? 0.2 + Math.random() * 0.8 : (isStorm ? 0.1 + Math.random() * 0.3 : (theme === 'snow' ? 0.4 + Math.random() * 0.6 : 0.1 + Math.random() * 0.3)),
        blur: (theme === 'snow' || isStars || isFire || isLabiba) && Math.random() > 0.8 ? 'blur-[1px]' : 'blur-[0px]',
        height: isStorm ? 40 + Math.random() * 80 : 0,
        content: isSpecial ? (Math.random() > 0.5 ? '❤️' : '🌸') : null,
      };
    });
  }, [theme, isLabiba]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes driftUp { 0% { transform: translateY(0); } 100% { transform: translateY(-110dvh); } }
        @keyframes driftDown { 0% { transform: translateY(-110dvh); } 100% { transform: translateY(110dvh); } }
        @keyframes snowFall { 0% { transform: translateY(-10vh); } 100% { transform: translateY(110vh); } }
        @keyframes rainFall { 0% { transform: translateY(-150px); } 100% { transform: translateY(110dvh); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
        .particle-anim { position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
      `}</style>
      {particles.map((p) => {
        let animationName = 'driftUp';
        if (theme === 'snow') animationName = 'snowFall';
        else if (theme === 'water') animationName = 'rainFall';
        else if (theme === 'moonlight') animationName = 'twinkle';
        else if (config.particleType === 'fall') animationName = 'driftDown';

        if (theme === 'water') {
           return (
            <div key={p.id} className="absolute w-[1px] bg-cyan-400/20"
              style={{ height: `${p.height}px`, left: `${p.left}%`, top: '-150px', opacity: p.opacity, animation: `rainFall ${p.duration}s linear infinite`, animationDelay: `-${p.delay}s` }}
            />
          );
        }

        return (
          <div key={p.id} className={`particle-anim ${p.content ? '' : (isLabiba ? 'bg-pink-300' : config.particle)} ${p.blur}`}
            style={{
              width: p.content ? 'auto' : `${p.size}px`, 
              height: p.content ? 'auto' : `${p.size}px`, 
              left: `${p.left}%`,
              bottom: theme === 'moonlight' ? undefined : (config.particleType === 'fall' || theme === 'snow' ? 'auto' : '-40px'),
              top: theme === 'moonlight' ? `${p.top}%` : (config.particleType === 'fall' || theme === 'snow' ? '-40px' : 'auto'),
              opacity: p.opacity, 
              animation: `${animationName} ${p.duration}s ease-in-out infinite`, 
              animationDelay: `-${p.delay}s`,
              fontSize: p.content ? `${p.size * 2}px` : 'inherit',
            }}
          >
            {p.content}
          </div>
        );
      })}
    </div>
  );
};

const RomanceShower = ({ active }: { active: boolean }) => {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; scale: number; char: string }[]>([]);
  const chars = ['❤️', '💖', '✨', '🌸', '🎀', '💓', '🧸', '💝'];
  useEffect(() => {
    if (!active) { setTimeout(() => setItems([]), 500); return; }
    const interval = setInterval(() => {
      setItems(prev => [...prev.slice(-35), { 
        id: Date.now() + Math.random(), left: Math.random() * 100, delay: Math.random() * 0.05,
        scale: 0.8 + Math.random() * 1.2, char: chars[Math.floor(Math.random() * chars.length)]
      }]);
    }, 80);
    return () => clearInterval(interval);
  }, [active]);
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {items.map(h => (
        <div key={h.id} className="absolute bottom-[-50px] text-2xl md:text-4xl animate-float-up"
          style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, transform: `scale(${h.scale})` }}
        >{h.char}</div>
      ))}
    </div>
  );
};

const LabibaGlow = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-pink-900/10 to-transparent" />
    </div>
  );
}

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => { try { await navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (err) {} };
  return (
    <button onClick={handleCopy} className="opacity-40 hover:!opacity-100 transition-all p-1 text-zinc-500">
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
  const [usage, setUsage] = useState(() => {
    const saved = localStorage.getItem('irone_usage');
    return saved ? JSON.parse(saved) : { count: 0, startTime: Date.now() };
  });
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('irone_theme');
    const validThemes: ThemeType[] = ['fire', 'moonlight', 'snow', 'water'];
    return validThemes.includes(saved as ThemeType) ? (saved as ThemeType) : 'fire';
  });
  const [isLabibaMode, setIsLabibaMode] = useState(() => localStorage.getItem('irone_is_labiba') === 'true');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));

  useEffect(() => {
    const checkQuota = () => {
      const now = Date.now();
      const elapsed = now - usage.startTime;
      if (elapsed >= RESET_WINDOW_MS) {
        setUsage({ count: 0, startTime: now });
        localStorage.setItem('irone_usage', JSON.stringify({ count: 0, startTime: now }));
        setTimeLeft(null);
      } else if (usage.count >= QUOTA_LIMIT) {
        const remaining = RESET_WINDOW_MS - elapsed;
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    };
    const interval = setInterval(checkQuota, 1000);
    return () => clearInterval(interval);
  }, [usage]);

  useEffect(() => {
    localStorage.setItem('irone_theme', currentTheme);
    localStorage.setItem('irone_is_labiba', String(isLabibaMode));
  }, [currentTheme, isLabibaMode]);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date().toLocaleTimeString([], { hour12: false })), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages, currentResponse]);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const themes: ThemeType[] = ['fire', 'moonlight', 'snow', 'water'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (usage.count >= QUOTA_LIMIT && timeLeft !== null) return;
    const val = input.trim();
    if (!val || isTyping) return;
    
    let currentlyLabiba = isLabibaMode;
    const labibaKeywords = [
      "i am labiba", 
      "moi labiba", 
      "labiba nushan", 
      "it's labiba", 
      "queen labiba", 
      "i'm labiba",
      "labiba name",
      "name is labiba"
    ];

    if (labibaKeywords.some(k => val.toLowerCase().includes(k))) {
      currentlyLabiba = true;
      setIsLabibaMode(true);
      setShowRomance(true);
      setTimeout(() => setShowRomance(false), 8000);
    }
    
    const userMsg: Message = { id: Date.now().toString(), role: Role.USER, content: val, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setCurrentResponse('');
    const hasKey = typeof process !== 'undefined' && !!process.env.API_KEY;
    setIsLocalMode(!hasKey);
    const history = messages.map(m => ({ role: m.role === Role.USER ? "user" : "model", parts: [{ text: m.content }] }));
    const newUsage = { ...usage, count: usage.count + 1 };
    setUsage(newUsage);
    localStorage.setItem('irone_usage', JSON.stringify(newUsage));
    try {
      let full = '';
      const stream = streamWithAI(val, history, currentlyLabiba);
      for await (const chunk of stream) { full += chunk; setCurrentResponse(full); }
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: Role.MODEL, content: full, timestamp: new Date() }]);
      setCurrentResponse('');
    } catch (err) { console.error(err); } finally { setIsTyping(false); setIsLocalMode(false); }
  };

  const themeData = THEMES[currentTheme] || THEMES.fire;
  const accentColor = isLabibaMode ? 'text-pink-400' : themeData.accent;
  const isQuotaLocked = usage.count >= QUOTA_LIMIT && timeLeft !== null;

  const bgGradientColor = isLabibaMode ? 'from-[#050000]' : 
    currentTheme === 'fire' ? 'from-[#050000]' :
    currentTheme === 'moonlight' ? 'from-[#010208]' :
    currentTheme === 'snow' ? 'from-[#0f172a]' :
    'from-[#020617]';

  const selectionColorClass = isLabibaMode ? 'selection:bg-pink-500' : 
    currentTheme === 'fire' ? 'selection:bg-red-600' :
    currentTheme === 'moonlight' ? 'selection:bg-blue-300' :
    currentTheme === 'snow' ? 'selection:bg-blue-100' :
    'selection:bg-cyan-400';

  const borderColor = isLabibaMode ? 'border-pink-900/50' : 'border-zinc-800';

  return (
    <div className={`flex flex-col h-[100dvh] w-full ${themeData.bg} text-zinc-400 ${selectionColorClass} transition-all duration-1000 overflow-hidden relative`}>
      <AntigravityBackground theme={currentTheme} isLabiba={isLabibaMode} />
      <SkyCycle theme={currentTheme} />
      {(currentTheme === 'snow' || currentTheme === 'water' || currentTheme === 'moonlight') && <ForestPath theme={currentTheme} />}
      <Thunderstorm active={currentTheme === 'water'} />
      <RomanceShower active={showRomance} />
      <LabibaGlow active={isLabibaMode} />
      
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 z-[100] relative">
        <div className="flex items-center gap-3 sm:gap-4">
          <h1 className={`text-lg sm:text-xl md:text-2xl font-[900] uppercase tracking-tighter cursor-pointer ${accentColor}`} onClick={() => window.location.reload()}>IRONE</h1>
          <button onClick={toggleTheme} className="text-zinc-800 hover:text-white p-1.5 sm:p-2 transition-transform hover:scale-110 active:rotate-45 duration-300"><Icons.Theme /></button>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="mono text-[8px] sm:text-[10px] text-zinc-800 font-bold uppercase tracking-widest hidden sm:block">{isLabibaMode ? 'QUEEN' : themeData.name} / {systemTime}</span>
          <button onClick={() => {setMessages([]); setIsLabibaMode(false); localStorage.removeItem('irone_is_labiba');}} className="text-zinc-800 hover:text-white transition-all hover:text-red-500 hover:scale-110"><Icons.Trash /></button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-12 z-10 relative scroll-smooth touch-pan-y">
        <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center pb-12 sm:pb-24">
              {isQuotaLocked && <p className="mono text-[9px] sm:text-[11px] mt-6 sm:mt-8 text-orange-500 font-bold uppercase tracking-widest animate-pulse">SYSTEM_LOCKED: {timeLeft}</p>}
            </div>
          ) : (
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 pt-4 pb-48 sm:pb-64">
              {messages.map((m) => (
                <div key={m.id} className="group">
                  <div className="flex flex-col gap-2">
                    <div className={`mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${m.role === Role.USER ? 'justify-end text-zinc-800' : 'justify-start ' + accentColor + ' opacity-30'}`}>
                      {m.role === Role.USER ? 'INPUT' : <><span className="flex items-center gap-1">{isLabibaMode ? 'FOR_QUEEN' : 'VERDICT'}</span><CopyButton content={m.content} /></>}
                    </div>
                    <div className={`text-sm sm:text-base md:text-xl leading-relaxed break-words ${m.role === Role.USER ? 'text-zinc-600 font-medium italic text-right' : (isLabibaMode ? 'text-pink-100 font-semibold drop-shadow-[0_0_8px_rgba(255,182,193,0.3)]' : 'text-zinc-100 font-bold')}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {currentResponse && (
                <div className="flex flex-col gap-2">
                  <div className={`mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest animate-pulse ${accentColor} opacity-30`}>...</div>
                  <div className={`text-sm sm:text-base md:text-xl leading-relaxed font-bold break-words ${isLabibaMode ? 'text-pink-200' : 'text-zinc-100'}`}>{currentResponse}<span className={`cursor-blink ml-1 ${accentColor}`}></span></div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-[150] bg-gradient-to-t ${bgGradientColor} to-transparent`}>
        <div className="max-w-3xl mx-auto w-full">
          <div className={`border-b-2 transition-all duration-300 relative ${borderColor} ${isQuotaLocked ? 'opacity-20 pointer-events-none' : ''}`}>
            <form onSubmit={handleSubmit} className="flex items-center">
              <input 
                ref={inputRef} 
                autoFocus 
                className="w-full bg-transparent py-4 sm:py-6 px-1 sm:px-2 text-sm sm:text-base md:text-xl text-white placeholder:text-zinc-900 focus:outline-none mono font-bold uppercase"
                placeholder={isQuotaLocked ? `WAIT ${timeLeft}...` : (isTyping ? "" : "SPEAK...")}
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                disabled={isTyping || isQuotaLocked} 
                autoComplete="off" 
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping || isQuotaLocked} 
                className={`p-2 active:scale-90 transition-opacity disabled:opacity-0 ${accentColor}`}
              >
                <Icons.Send />
              </button>
            </form>
          </div>
          <div className="mt-4 sm:mt-8 flex justify-between items-center text-[7px] sm:text-[9px] mono font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] opacity-20">
            <div className="flex gap-4 sm:gap-8"><span>{isLocalMode ? 'LOCAL' : 'CORE'}</span><span>STABLE</span></div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span>{QUOTA_LIMIT - usage.count}/{QUOTA_LIMIT}</span>
              <div className="w-12 sm:w-16 h-[1px] sm:h-[2px] bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-current transition-all duration-500" style={{ width: `${(usage.count / QUOTA_LIMIT) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="h-safe-bottom sm:h-0" />
        </div>
      </footer>
    </div>
  );
};

export default App;
