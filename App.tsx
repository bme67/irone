
import React, { useState, useRef, useEffect } from 'react';
import { Role, Message } from './types';
import { Icons, SAVAGE_TRIGGERS, NICE_TRIGGERS } from './constants';
import { streamWithSavageAI } from './services/gemini';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isSavageMode, setIsSavageMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0 || currentResponse) {
      scrollToBottom();
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
        content: "Error kela. Billami nokori side ho bandor sada.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-black text-zinc-400 selection:bg-white selection:text-black transition-all duration-1000 ${isSavageMode ? 'border-red-900/10' : ''}`}>
      
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-950">
        <div className="flex items-center gap-6">
          <span className="text-white font-bold tracking-[0.2em] text-[13px] uppercase">IRONE</span>
          <button 
            onClick={() => setIsSavageMode(!isSavageMode)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[10px] mono uppercase tracking-[0.1em] transition-all border ${
              isSavageMode 
                ? 'text-red-500 bg-red-500/5 border-red-900/50' 
                : 'text-zinc-500 bg-zinc-900/20 border-zinc-900 hover:text-zinc-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full border ${isSavageMode ? 'bg-red-500 border-red-400 ring-pulse' : 'border-zinc-700 bg-transparent'}`} />
            {isSavageMode ? 'UNFILTERED' : 'STANDARD'}
          </button>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-1 text-zinc-700 hover:text-zinc-500 transition-colors"
        >
          <Icons.Trash />
        </button>
      </nav>

      {/* Chat Container */}
      <main className="flex-1 overflow-y-auto pt-16 pb-24 px-8 max-w-2xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-8 animate-staggered">
            <div className="space-y-4 text-center">
              <h1 className="text-white text-5xl font-bold tracking-tighter glitch-text">welcome baby</h1>
              <p className="text-zinc-800 text-[10px] mono uppercase tracking-[0.4em] animate-pulse">
                System online. No filter mode active.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {messages.map((m) => (
              <div key={m.id} className="space-y-3">
                <div className={`mono text-[9px] uppercase tracking-[0.3em] ${
                  m.role === Role.USER ? 'text-zinc-800' : (isSavageMode ? 'text-red-950' : 'text-zinc-800')
                }`}>
                  {m.role === Role.USER ? 'USER' : (isSavageMode ? 'IRONE_X' : 'IRONE')}
                </div>
                <div className={`text-[15px] leading-relaxed font-normal ${m.role === Role.USER ? 'text-white' : 'text-zinc-300'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {currentResponse && (
              <div className="space-y-3">
                <div className="mono text-[9px] uppercase tracking-[0.3em] text-zinc-900 animate-pulse">PROCESSING</div>
                <div className="text-[15px] leading-relaxed text-zinc-500">
                  {currentResponse}
                  <span className="inline-block w-1.5 h-3 bg-zinc-800 ml-1 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer Input */}
      <footer className="p-8 pb-12 bg-black">
        <div className="max-w-2xl mx-auto w-full relative group">
          <form onSubmit={handleSubmit}>
            <input 
              autoFocus
              className="w-full bg-transparent border-b border-zinc-950 py-4 text-sm text-white placeholder:text-zinc-900 focus:outline-none focus:border-zinc-800 transition-all"
              placeholder={isTyping ? "..." : "Speak, bandor sada..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-zinc-500 disabled:opacity-0 transition-all p-2"
            >
              <Icons.Send />
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center opacity-20">
            <span className="text-[8px] mono uppercase tracking-widest text-zinc-700">3 LNS MAX</span>
            <span className="text-[8px] mono uppercase tracking-widest text-zinc-700">IRONE SYSTEM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
