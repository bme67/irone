
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Role, Message } from './types.ts';
import { Icons, THEMES, ThemeType } from './constants.tsx';
import { streamWithAI } from './services/gemini.ts';

const AntigravityBackground = ({ theme, isLabiba }: { theme: ThemeType, isLabiba: boolean }) => {
  const config = THEMES[theme];
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: config.particleType === 'fall' ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
      left: Math.random() * 100,
      duration: config.particleType === 'fall' ? 5 + Math.random() * 5 : 10 + Math.random() * 25,
      delay: Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.2,
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
          50% { transform: translateY(-50dvh) rotate(180deg) translateX(-15px); }
          100% { transform: translateY(10dvh) rotate(360deg) translateX(0); }
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
          filter: blur(1px);
        }
      `}</style>
      {particles.map((p) => {
        let animationName = 'driftUp';
        if (config.particleType === 'fall') animationName = 'driftDown';
        if (config.particleType === 'float') animationName = 'driftFloat';

        return (
          <div
            key={p.id}
            className={`particle-anim ${isLabiba ? 'bg-pink-500' : config.particle}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: config.particleType === 'fall' ? 'auto' : '-20px',
              top: config.particleType === 'fall' ? '-20px' : 'auto',
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
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Audio Persistence State - Defaulting to unmuted so user hears it upon interaction
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('irone_is_muted');
    return saved === 'true'; // Default is false (unmuted)
  });

  // Persistent States
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('irone_theme');
    return (saved as ThemeType) || 'standard';
  });
  const [isLabibaMode, setIsLabibaMode] = useState(() => {
    return localStorage.getItem('irone_is_labiba') === 'true';
  });

  const [triggerHearts, setTriggerHearts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString([], { hour12: false }));

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('irone_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('irone_is_labiba', String(isLabibaMode));
  }, [isLabibaMode]);

  useEffect(() => {
    localStorage.setItem('irone_is_muted', String(isMuted));
  }, [isMuted]);

  // Unified Audio Logic
  const playAudio = async () => {
    const audio = audioRef.current;
    // Strictly enforce: Only play if current theme is 'snow' and not muted
    if (audio && !isMuted && currentTheme === 'snow') {
      try {
        audio.volume = 0.5;
        await audio.play();
        console.log('Audio: Snow theme active. Started playback.');
      } catch (err) {
        console.warn('Audio: Autoplay blocked. Waiting for user interaction.');
      }
    } else if (audio) {
      audio.pause();
    }
  };

  // This wakes up the audio on first touch
  const handleWakeUp = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    playAudio();
  };

  // Re-trigger playback when the song can play
  const onAudioCanPlay = () => {
    if (userInteracted && !isMuted && currentTheme === 'snow') {
      playAudio();
    }
  };

  // Sync state changes with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted || currentTheme !== 'snow') {
      audio.pause();
    } else if (userInteracted) {
      playAudio();
    }
  }, [isMuted, userInteracted, currentTheme]);

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
    handleWakeUp();
    const themes: ThemeType[] = ['standard', 'fire', 'snow', 'water'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setCurrentTheme(nextTheme);
    
    // Explicitly handle audio loading for the next theme
    if (audioRef.current) {
        if (nextTheme === 'snow') {
            audioRef.current.load();
        } else {
            audioRef.current.pause();
        }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleWakeUp();
    setIsMuted(!isMuted);
  };

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    handleWakeUp();
    
    const val = (customInput || input).trim();
    if (!val || isTyping) return;

    let currentlyLabiba = isLabibaMode;
    if (val.toLowerCase().includes("i am labiba") || val.toLowerCase().includes("moi labiba")) {
      currentlyLabiba = true;
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
    <div 
      className={`flex flex-col h-[100dvh] ${themeData.bg} text-zinc-400 selection:bg-${selectionColor} transition-all duration-1000 overflow-hidden`}
      onClick={handleWakeUp}
      onKeyDown={handleWakeUp}
    >
      {/* Audio element only has a source if the theme is snow */}
      <audio 
        ref={audioRef} 
        key={themeData.audioUrl} 
        src={themeData.audioUrl} 
        loop 
        preload="auto"
        onCanPlay={onAudioCanPlay}
        playsInline
      />
      
      <AntigravityBackground theme={currentTheme} isLabiba={isLabibaMode} />
      <HeartShower active={triggerHearts} />
      
      {/* Brutalist Header */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 md:py-12 z-50">
        <div className="flex items-center gap-4">
          <h1 
            className={`text-xl md:text-2xl font-[900] uppercase tracking-tighter cursor-pointer ${accentColor} transition-colors`} 
            onClick={(e) => {
              e.stopPropagation();
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
            <button 
              onClick={toggleMute}
              className="text-zinc-800 hover:text-white transition-colors p-2 relative group"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <Icons.Mute /> : <Icons.Unmute />}
              {!userInteracted && (
                <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full animate-ping ${isLabibaMode ? 'bg-pink-500' : themeData.accent.replace('text-', 'bg-')}`}></span>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="mono text-[10px] text-zinc-800 font-bold uppercase tracking-widest hidden md:block">
            {isLabibaMode ? 'QUEEN_MODE' : themeData.name} / {systemTime}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMessages([]);
              setIsLabibaMode(false);
              localStorage.removeItem('irone_is_labiba');
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
                {isLabibaMode ? 'WELCOME QUEEN' : 'WELCOME BABY'}
              </h2>
              {!userInteracted && (
                <div className="mt-8 opacity-20 mono text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
                  TAP ANYWHERE TO UNLOCK SENSES
                </div>
              )}
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
                onFocus={handleWakeUp}
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
              <span>18MS</span>
            </div>
            <span>V_3.1.0_SNOW_ONLY_MUSIC</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
