/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  LucideIcon,
  LayoutDashboard, 
  Calendar, 
  Library, 
  Settings, 
  Search, 
  Bell, 
  User, 
  Orbit, 
  ChevronRight,
  Clock,
  Zap,
  Star,
  Check,
  Plus,
  Filter,
  ExternalLink,
  X,
  Link as LinkIcon,
  Palette,
  Video,
  Code,
  Sun,
  Moon,
  Trash2,
  Command as CommandIcon,
  Sparkles,
  Quote,
  Target,
  Trophy,
  ShieldCheck,
  Timer as TimerIcon,
  BookOpen,
  Heart,
  Flame,
  BarChart3
} from 'lucide-react';

// --- Sidebar Component ---

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  key?: string | number;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: SidebarItemProps) => {
  return (
    <button 
      onClick={onClick}
      className={`
        relative flex items-center w-full gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 group mb-1
        ${isActive ? 'bg-[var(--color-orbit-card)] text-[var(--color-orbit-accent)] shadow-[var(--shadow-card)] border border-[var(--color-glass-border)]' : 'text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)] hover:bg-[var(--color-orbit-card)]/50 border border-transparent'}
      `}
    >
      <Icon size={16} className={`${isActive ? 'text-[var(--color-orbit-accent)]' : 'opacity-70 group-hover:opacity-100'}`} />
      <span className="font-medium tracking-tight text-[13px]">{label}</span>
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[var(--color-orbit-accent)] rounded-r-full" />}
    </button>
  );
};

const Sidebar = ({ activeTab, setActiveTab, userName }: { activeTab: string, setActiveTab: (t: string) => void, userName: string }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'routine', label: 'Routine', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Library },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-[240px] h-full nav-sidebar flex-col p-6 relative z-20">
      <div className="flex items-center gap-2.5 mb-8 px-2 card-premium p-3">
        <div className="w-6 h-6 rounded-md bg-[var(--color-orbit-accent)] flex items-center justify-center p-1 shadow-sm">
          <div className="w-full h-full bg-[var(--color-orbit-card)] rounded-[2px]" />
        </div>
        <h1 className="text-sm font-bold tracking-tight text-[var(--color-orbit-text-primary)] uppercase tracking-[0.15em]">My Orbit</h1>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <SidebarItem 
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <div className="mt-8 flex items-center gap-3 card-premium p-3">
        <div className="w-7 h-7 rounded-md bg-[var(--color-orbit-accent)]/10 flex items-center justify-center border border-[var(--color-orbit-accent)]/20">
           <User size={14} className="text-[var(--color-orbit-accent)]" />
        </div>
        <span className="text-[13px] font-bold text-[var(--color-orbit-text-primary)] truncate font-bengali">{userName}</span>
      </div>
    </aside>
  );
};

const WelcomeScreen = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-[var(--color-orbit-bg)] flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full glass p-10 rounded-[32px] text-center space-y-8 bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] shadow-[var(--shadow-card-hover)]"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-[var(--color-orbit-accent)]/10 rounded-2xl mx-auto flex items-center justify-center border border-[var(--color-orbit-accent)]/20 shadow-sm">
            <Orbit className="text-[var(--color-orbit-accent)]" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-orbit-text-primary)] tracking-tight font-bengali">আপনার নাম কি?</h1>
          <p className="text-[var(--color-orbit-text-secondary)] text-sm font-medium font-bengali">সিস্টেমে প্রবেশ করতে আপনার নাম লিখুন।</p>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="এখানে লিখুন..." 
            className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-6 text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] transition-all font-medium text-center font-bengali"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && name.trim() && onComplete(name)}
          />
          <button 
            disabled={!name.trim()}
            onClick={() => onComplete(name)}
            className="w-full py-4 bg-[var(--color-orbit-accent)] hover:opacity-90 disabled:opacity-50 text-white rounded-xl font-bold text-[14px] transition-all active:scale-[0.98] font-bengali shadow-md"
          >
            অরবিট চালু করুন
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};


const CommandPalette = ({ isOpen, onClose, resources }: { isOpen: boolean, onClose: () => void, resources: Resource[] }) => {
  const [query, setQuery] = useState('');
  
  if (!isOpen) return null;

  const filtered = resources.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-start justify-center p-6 pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="w-full max-w-xl bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] rounded-2xl shadow-[var(--shadow-card-hover)] relative overflow-hidden"
        >
          <div className="p-4 border-b border-[var(--color-glass-border)] flex items-center gap-3">
            <Search className="text-[var(--color-orbit-text-secondary)]" size={18} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search resources, categories, commands..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-[15px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] font-medium"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="px-2 py-0.5 rounded border border-[var(--color-glass-border)] text-[9px] font-bold text-[var(--color-orbit-text-secondary)] uppercase">ESC</div>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
            {filtered.length > 0 ? filtered.map(res => (
              <button 
                key={res.id}
                className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--color-orbit-bg)] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] overflow-hidden">
                   <img src={res.thumbnail} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold text-[var(--color-orbit-text-primary)] line-clamp-1">{res.title}</h4>
                  <p className="text-[10px] text-[var(--color-orbit-text-secondary)] uppercase tracking-widest">{res.category}</p>
                </div>
                <ChevronRight size={14} className="text-[var(--color-orbit-text-secondary)] opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            )) : (
              <div className="py-12 text-center">
                <p className="text-[var(--color-orbit-text-secondary)] text-sm font-medium">No system assets found matching "{query}"</p>
              </div>
            )}
          </div>
          <div className="p-3 bg-[var(--color-orbit-bg)] border-t border-[var(--color-glass-border)] flex justify-between items-center px-6">
             <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-[var(--color-orbit-text-secondary)] font-bold uppercase tracking-widest">
                   <span className="p-1 rounded bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-secondary)] font-mono">↑↓</span> Navigate
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[var(--color-orbit-text-secondary)] font-bold uppercase tracking-widest">
                   <span className="p-1 rounded bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-secondary)] font-mono">↵</span> Select
                </div>
             </div>
             <CommandIcon size={14} className="text-[var(--color-orbit-accent)]" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

const AISummarizerModal = ({ isOpen, onClose, initialContext }: { isOpen: boolean, onClose: () => void, initialContext: string }) => {
  const [inputText, setInputText] = useState(initialContext);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialContext) {
        setInputText(initialContext);
      } else {
        const selection = window.getSelection()?.toString();
        if (selection) setInputText(selection);
      }
    } else {
      setSummary('');
      setError('');
    }
  }, [isOpen, initialContext]);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Summarize the following text or resource information concisely:\n\n${inputText}`,
      });
      setSummary(response.text || 'No summary generated.');
    } catch (err: any) {
      setError(err.message || 'Error generating summary.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputText && !summary && !isLoading && !error) {
       handleSummarize();
    }
  }, [isOpen, inputText]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="w-full max-w-2xl bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] rounded-2xl shadow-[var(--shadow-card-hover)] relative flex flex-col overflow-hidden max-h-[80vh]"
        >
          <div className="p-4 border-b border-[var(--color-glass-border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--color-orbit-accent)]">
              <Sparkles size={18} />
              <h2 className="font-bold tracking-tight">AI Summarizer</h2>
            </div>
            <button onClick={onClose} className="text-[var(--color-orbit-text-secondary)] hover:text-white"><X size={18}/></button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            <textarea
              className="w-full h-32 bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3 px-4 text-[13px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] resize-none"
              placeholder="Paste text you want to summarize, or select text before opening..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button 
              onClick={handleSummarize}
              disabled={isLoading || !inputText.trim()}
              className="w-full py-3 bg-[var(--color-orbit-accent)] disabled:opacity-50 text-white rounded-xl font-bold text-[13px] shadow-md transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isLoading ? 'Generating...' : 'Summarize'}
            </button>
            {error && <div className="text-red-400 text-xs text-center border border-red-500/20 bg-red-500/10 p-2 rounded">{error}</div>}
            {(summary || isLoading) && (
              <div className="mt-4 p-4 rounded-xl bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] min-h-[100px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full text-[var(--color-orbit-text-secondary)] opacity-50 animate-pulse">
                     <Sparkles className="animate-spin mr-2" size={16}/> Thinking...
                  </div>
                ) : (
                  <div className="markdown-body text-[14px] leading-relaxed text-[var(--color-orbit-text-primary)]">{summary}</div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Toast = ({ message, onComplete }: { message: string, onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20"
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
        <Check size={14} className="text-white" />
      </div>
      <span className="text-sm font-bold font-bengali tracking-wide">{message}</span>
    </motion.div>
  );
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: 'sm' | 'lg';
}

const CustomCheckbox = ({ checked, onChange, size = 'sm' }: CheckboxProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`
        border-2 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm
        ${size === 'lg' ? 'w-6 h-6 rounded-md' : 'w-4 h-4 rounded-sm'}
        ${checked 
          ? 'bg-[var(--color-orbit-accent)] border-[var(--color-orbit-accent)]' 
          : 'bg-[var(--color-orbit-card)] border-[var(--color-glass-border)] hover:border-[var(--color-orbit-accent)]/50'}
      `}
    >
      <AnimatePresence mode="wait">
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 15,
              mass: 0.5
            }}
          >
            <Check size={size === 'lg' ? 14 : 10} className="text-white stroke-[4px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
}

interface RoutineData {
  id: number;
  title: string;
  meta: string;
  completed: boolean;
}

const PriorityItem = ({ title, checked, onToggle }: { title: string, checked: boolean, onToggle: () => void, key?: number | string }) => (
  <div 
    className={`
      flex items-center gap-4 p-5 card-premium group
      ${checked ? 'opacity-70' : 'hover:border-[var(--color-orbit-accent)]/50'}
    `}
  >
    <CustomCheckbox checked={checked} onChange={onToggle} size="lg" />
    <span className={`text-[15px] font-medium tracking-tight transition-all select-none ${checked ? 'text-[var(--color-orbit-text-secondary)] line-through' : 'text-[var(--color-orbit-text-primary)]'}`}>
      {title}
    </span>
  </div>
);

const RoutineItem = ({ title, meta, completed, onToggle, onDelete }: { title: string, meta: string, completed: boolean, onToggle: () => void, onDelete?: () => void, key?: number | string }) => (
  <motion.div 
    animate={{ scale: completed ? [1, 0.98, 1] : 1 }}
    transition={{ duration: 0.2 }}
    className={`flex items-center gap-3 p-4 card-premium transition-all group ${completed ? 'opacity-70' : ''}`}
  >
    <CustomCheckbox checked={completed} onChange={onToggle} />
    <div className="routine-info select-none font-bengali flex-1">
      <h4 className={`text-[15px] font-medium transition-all ${completed ? 'text-[var(--color-orbit-text-secondary)] line-through' : 'text-[var(--color-orbit-text-primary)]'}`}>{title}</h4>
      <p className="text-[12px] text-[var(--color-orbit-text-secondary)] font-medium mt-0.5">{meta}</p>
    </div>
    {onDelete && (
      <button 
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-[var(--color-orbit-text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <Trash2 size={14} />
      </button>
    )}
  </motion.div>
);

const SettingsContent = ({ 
  userName, 
  setUserName, 
  routines, 
  deleteRoutine, 
  resources, 
  setResources,
  isSoundEnabled,
  setIsSoundEnabled,
  isConfettiEnabled,
  setIsConfettiEnabled,
  isLightMode,
  setIsLightMode,
  setToast
}: any) => {
  const [tempName, setTempName] = useState(userName);

  const saveProfile = () => {
    setUserName(tempName);
    setToast('প্রোফাইল সফলভাবে আপডেট হয়েছে');
  };

  const backupData = () => {
    const data = JSON.stringify({ routines, resources, userName });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-orbit-backup.json';
    a.click();
    setToast('ডেটা ব্যাকআপ নেওয়া হয়েছে');
  };

  const clearAll = () => {
    if (confirm('আপনি কি নিশ্চিত? সব ডেটা মুছে ফেলা হবে।')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl mx-auto pb-20">
      <div className="card-premium p-8 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-orbit-text-primary)] font-bengali">প্রোফাইল সেটিংস</h2>
        <div className="flex gap-4">
          <input 
            value={tempName} 
            onChange={e => setTempName(e.target.value)}
            className="flex-1 bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3 px-4 text-[14px] text-[var(--color-orbit-text-primary)] font-bengali shadow-sm focus:outline-none focus:border-[var(--color-orbit-accent)]"
          />
          <button onClick={saveProfile} className="px-6 py-3 bg-[var(--color-orbit-accent)] hover:opacity-90 text-white rounded-xl font-bold text-[13px] font-bengali shadow-md">সেভ করুন</button>
        </div>
      </div>

      <div className="card-premium p-8 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-orbit-text-primary)] font-bengali">কন্টেন্ট ম্যানেজমেন্ট</h2>
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[var(--color-orbit-text-secondary)] font-bengali">রুটিন (Daily Routines)</h3>
          {routines.map((r: any) => (
            <div key={r.id} className="flex justify-between items-center p-4 bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-lg">
              <span className="font-bengali text-[13px] text-[var(--color-orbit-text-primary)]">{r.title}</span>
              <button className="text-red-400 hover:text-red-600 p-1" onClick={() => deleteRoutine(r.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4 border-t border-[var(--color-glass-border)]">
          <h3 className="text-sm font-bold text-[var(--color-orbit-text-secondary)] font-bengali">রিসোর্স (Vault Resources)</h3>
          {resources.map((r: any) => (
            <div key={r.id} className="flex justify-between items-center p-4 bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-lg">
              <span className="font-bengali text-[13px] text-[var(--color-orbit-text-primary)]">{r.title}</span>
              <button className="text-red-400 hover:text-red-600 p-1" onClick={() => setResources(resources.filter((res: any) => res.id !== r.id))}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="card-premium p-8 space-y-6">
        <h2 className="text-xl font-bold text-[var(--color-orbit-text-primary)] font-bengali">প্রেফারেন্স</h2>
        <div className="space-y-6">
          <label className="flex justify-between items-center cursor-pointer p-4 bg-[var(--color-orbit-bg)] rounded-xl border border-[var(--color-glass-border)]">
            <span className="font-bengali font-medium">সাফল্যের শব্দ (Completion Sound)</span>
            <input type="checkbox" className="w-5 h-5 accent-emerald-500" checked={isSoundEnabled} onChange={e => setIsSoundEnabled(e.target.checked)} />
          </label>
          <label className="flex justify-between items-center cursor-pointer p-4 bg-[var(--color-orbit-bg)] rounded-xl border border-[var(--color-glass-border)]">
            <span className="font-bengali font-medium">অ্যানিমেশন (Confetti Effect)</span>
            <input type="checkbox" className="w-5 h-5 accent-emerald-500" checked={isConfettiEnabled} onChange={e => setIsConfettiEnabled(e.target.checked)} />
          </label>
          <label className="flex justify-between items-center cursor-pointer p-4 bg-[var(--color-orbit-bg)] rounded-xl border border-[var(--color-glass-border)]">
            <span className="font-bengali font-medium">ডার্ক মোড (Dark Mode Toggle)</span>
            <input type="checkbox" className="w-5 h-5 accent-emerald-500" checked={!isLightMode} onChange={e => setIsLightMode(!e.target.checked)} />
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={backupData} className="flex-1 py-4 bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-primary)] rounded-xl font-bold font-bengali hover:bg-[var(--color-glass-border)] transition-all shadow-sm">ব্যাকআপ ডেটা</button>
        <button onClick={clearAll} className="flex-1 py-4 bg-red-600/90 hover:bg-red-600 text-white rounded-xl font-bold font-bengali shadow-md transition-all">সব ডেটা মুছুন</button>
      </div>
    </motion.div>
  );
};

const wisdomSlides = [
  {
    id: 1,
    category: 'Wisdom & Mindset',
    content: "consistency is key: maintaining continuity will lead you to success.",
    icon: Sparkles,
    label: 'Daily Propulsion'
  },
  {
    id: 2,
    category: 'Success Strategy',
    content: "ধারাবাহিকতা মানেই বিরতিহীন প্রচেষ্টা, আর এটিই আপনাকে সফলতার চূড়ায় পৌঁছে দেবে।",
    icon: Target,
    label: 'Action Strategy'
  },
  {
    id: 3,
    category: 'Daily Growth',
    content: "Success is the sum of small efforts, repeated day in and day out.",
    icon: Trophy,
    label: 'Growth Protocol'
  }
];

const SpiritualHub = ({ salah, setSalah, quran, setQuran }: any) => (
  <div className="card-premium p-6 col-span-1">
    <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold mb-4 flex items-center gap-2">
      <BookOpen size={12} className="text-[var(--color-orbit-accent)]" />
      Spiritual Hub
    </h3>
    <div className="flex justify-between mb-4">
      {['ফজর', 'যোহর', 'আসর', 'মাগরিব', 'এশা'].map((p, i) => (
        <button key={p} onClick={() => setSalah(s => s.map((v: boolean, idx: number) => idx === i ? !v : v))} className={`flex flex-col items-center gap-1.5 ${salah[i] ? 'text-[var(--color-orbit-accent)]' : 'text-[var(--color-orbit-text-secondary)]'}`}>
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${salah[i] ? 'bg-[var(--color-orbit-accent)] border-[var(--color-orbit-accent)] text-white' : 'border-[var(--color-glass-border)]'}`}>
            {salah[i] ? <Check size={16} /> : <div className="w-2 h-2 rounded-full bg-[var(--color-glass-border)]" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-tight">{p}</span>
        </button>
      ))}
    </div>
    <input 
      value={quran} 
      onChange={e => setQuran(e.target.value)} 
      placeholder="Quran Progress (e.g., JUZ 5)" 
      className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-lg py-2 px-3 text-[12px] text-[var(--color-orbit-text-primary)] focus:outline-none focus:border-[var(--color-orbit-accent)]"
    />
  </div>
);

const GratitudeJournal = ({ gratitude, setGratitude }: any) => (
  <div className="card-premium p-6">
    <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold mb-4 flex items-center gap-2">
      <Heart size={12} className="text-[var(--color-orbit-accent)]" />
      Alhamdulillah Log
    </h3>
    <div className="space-y-2">
      {gratitude.map((g: string, i: number) => (
        <input 
          key={i}
          value={g}
          onChange={e => setGratitude(prev => prev.map((val: string, idx: number) => idx === i ? e.target.value : val))}
          placeholder={`I'm thankful for... #${i+1}`}
          className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-lg py-2 px-3 text-[12px] text-[var(--color-orbit-text-primary)] focus:outline-none focus:border-[var(--color-orbit-accent)]"
        />
      ))}
    </div>
  </div>
);

const StreakWidget = ({ streak }: any) => (
  <div className="card-premium p-6 flex flex-col items-center justify-center text-center">
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold mb-2">
      <Flame size={12} className="text-orange-500" />
      Habit Streak
    </div>
    <div className="text-4xl font-bold text-[var(--color-orbit-text-primary)] tabular-nums">{streak}</div>
    <div className="text-[10px] text-[var(--color-orbit-text-secondary)] mt-1 font-bold">DAYS ACTIVE</div>
  </div>
);

const WeeklySummary = () => (
  <div className="card-premium p-6 flex flex-col items-center justify-center text-center">
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold mb-2">
      <BarChart3 size={12} className="text-[var(--color-orbit-accent)]" />
      Weekly Summary
    </div>
    <div className="text-2xl font-bold text-[var(--color-orbit-text-primary)]">12 / 8</div>
    <div className="text-[10px] text-[var(--color-orbit-text-secondary)] mt-1 font-bold">+50% vs LAST WEEK</div>
  </div>
);
const DashboardContent = ({ priorities, routines, togglePriority, toggleRoutine, deleteRoutine, onOpenModal, setToast, isSoundEnabled, salah, setSalah, quran, setQuran, gratitude, setGratitude, streak }: any) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [duration, setDuration] = useState(25); // Default 25 mins
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (!timerActive) {
      setTimeLeft(duration * 60);
    }
  }, [duration, timerActive]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % wisdomSlides.length);
    }, 10000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      if (setToast) setToast("Mission Accomplished! Your core focus session is complete.");
      if (isSoundEnabled) {
         try {
           const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
           audio.play();
         } catch(e) {}
      }
      setTimeLeft(duration * 60);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, setToast, isSoundEnabled, duration]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (((duration * 60) - timeLeft) / (duration * 60)) * 100;

  const slide = wisdomSlides[activeSlide];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1"
    >
      <div className="lg:col-span-2 space-y-8">
        {/* Mindset & Wisdom Slideshow Section */}
        <section>
          <div className="card-premium p-6 md:p-8 relative overflow-hidden group min-h-[180px] flex flex-col justify-center">
            {/* Background Icon Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <slide.icon size={120} className="text-[var(--color-orbit-accent)]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 space-y-4"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-orbit-accent)] uppercase tracking-[0.2em]">
                  <slide.icon size={12} />
                  {slide.category}
                </div>
                <p className="text-xl md:text-2xl font-bold text-[var(--color-orbit-text-primary)] tracking-tight leading-tight italic decoration-[var(--color-orbit-accent)]/30 underline-offset-8 decoration-2 font-bengali">
                  "{slide.content}"
                </p>
                <div className="pt-4 flex items-center gap-4 text-[var(--color-orbit-text-secondary)]">
                  <div className="h-px flex-1 bg-[var(--color-glass-border)]" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">{slide.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {wisdomSlides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-4 bg-[var(--color-orbit-accent)]' : 'w-1.5 bg-[var(--color-orbit-text-secondary)]/30'}`} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Top 3 Priorities Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-orbit-text-secondary)] font-bold flex items-center gap-2">
              Top 3 Priorities
            </h2>
            <button 
              onClick={onOpenModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-primary)] text-[11px] font-bold tracking-wide hover:border-[var(--color-orbit-accent)] transition-all shadow-sm"
            >
              <Plus size={14} className="text-[var(--color-orbit-accent)]" />
              Add Action
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {priorities.map((p: any) => (
              <PriorityItem 
                key={p.id} 
                title={p.title} 
                checked={p.completed} 
                onToggle={() => togglePriority(p.id)} 
              />
            ))}
          </div>
        </section>

        {/* New Companion Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpiritualHub salah={salah} setSalah={setSalah} quran={quran} setQuran={setQuran} />
          <GratitudeJournal gratitude={gratitude} setGratitude={setGratitude} />
          <StreakWidget streak={streak} />
          <WeeklySummary />
        </section>

        {/* Current Metrics / Focus Shield */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-premium p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            {timerActive && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.1 }}
                 className="absolute inset-0 bg-gradient-to-br from-[var(--color-orbit-accent)] to-transparent z-0"
               />
            )}
            
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold">
                {timerActive ? <ShieldCheck size={14} className="text-[var(--color-orbit-accent)]" /> : <TimerIcon size={14} />}
                Distraction Shield
              </div>

              {/* Duration Selector */}
              {!timerActive && (
                 <div className="flex gap-1 mb-4">
                   {[5, 10, 15, 20, 25].map(d => (
                     <button
                       key={d}
                       onClick={() => setDuration(d)}
                       className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${duration === d ? 'bg-[var(--color-orbit-accent)] text-white' : 'bg-[var(--color-orbit-bg)] text-[var(--color-orbit-text-secondary)]'}`}
                     >
                       {d}m
                     </button>
                   ))}
                 </div>
              )}

              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="transparent"
                    stroke="var(--color-glass-border)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="transparent"
                    stroke="var(--color-orbit-accent)"
                    strokeWidth="4"
                    strokeDasharray="377"
                    animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                    transition={{ duration: 1, ease: "linear" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_var(--color-orbit-accent)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-[var(--color-orbit-text-primary)] tracking-tight tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={toggleTimer}
                  className={`flex-1 py-3 rounded-xl text-[12px] font-bold transition-all shadow-md ${timerActive ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-[var(--color-orbit-accent)] text-white hover:opacity-90'}`}
                >
                  {timerActive ? 'Pause Shield' : 'Activate Shield'}
                </button>
                <button 
                  onClick={resetTimer}
                  className="px-6 py-3 rounded-xl text-[12px] font-bold bg-[var(--color-orbit-bg)] text-[var(--color-orbit-text-secondary)] border border-[var(--color-glass-border)] hover:bg-[var(--color-glass-border)] hover:text-[var(--color-orbit-text-primary)] transition-all shadow-sm"
                >
                  Reset
                </button>
              </div>
              
              {timerActive && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-[var(--color-orbit-accent)] font-bold uppercase tracking-widest mt-6 font-bengali animate-pulse"
                >
                  শিল্ড সক্রিয় - পূর্ণ মনোযোগ দিন
                </motion.p>
              )}
            </div>
          </div>

          <div className="card-premium p-6 space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-[var(--color-orbit-text-secondary)] font-bold">Quick Vault</h3>
            <div className="flex flex-wrap gap-2">
              {['Project: Orion', 'Assets', 'Q4 Strategy'].map(pill => (
                <div key={pill} className="bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] px-2.5 py-1 rounded text-[11px] font-medium text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-accent)] cursor-pointer transition-colors shadow-sm">
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-1">
        {/* Daily Routine Section */}
        <div className="card-premium p-6 h-full">
          <h2 className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-orbit-text-secondary)] font-bold flex items-center gap-2 mb-6">
            Daily Routine
          </h2>
          
          <div className="space-y-2">
            {routines.slice(0, 4).map((r: any) => (
              <RoutineItem 
                key={r.id} 
                title={r.title} 
                meta={r.meta} 
                completed={r.completed} 
                onToggle={() => toggleRoutine(r.id)} 
                onDelete={() => deleteRoutine(r.id)}
              />
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--color-glass-border)]">
            <div className="bg-[var(--color-orbit-bg)] p-4 rounded-lg border border-[var(--color-glass-border)] shadow-sm">
              <p className="text-[10px] text-[var(--color-orbit-text-secondary)] leading-relaxed uppercase tracking-tighter font-bold mb-1 font-sans">Current Phase</p>
              <h4 className="text-[14px] font-bold text-[var(--color-orbit-text-primary)] font-bengali">সিস্টেম অপ্টিমাইজেশন</h4>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RoutineContent = ({ routines, toggleRoutine, deleteRoutine }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-6 pb-20"
    >
      <div className="flex justify-between items-center mb-4 px-2 card-premium p-4">
        <h2 className="text-xl font-bold text-[var(--color-orbit-text-primary)] tracking-tight">Full Daily Routine</h2>
        <span className="text-xs text-[var(--color-orbit-text-secondary)] font-bold uppercase tracking-widest">{routines.filter((r: any) => r.completed).length} / {routines.length} Completed</span>
      </div>

      
      <div className="grid grid-cols-1 gap-3">
        {routines.map((r: any) => (
          <div key={r.id} className="card-premium p-2">
            <RoutineItem 
              title={r.title} 
              meta={r.meta} 
              completed={r.completed} 
              onToggle={() => toggleRoutine(r.id)} 
              onDelete={() => deleteRoutine(r.id)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Resource Vault ---

interface Resource {
  id: number;
  title: string;
  category: string;
  tags: string[];
  thumbnail: string;
}

const VaultContent = ({ resources, onSummarize }: { resources: Resource[], onSummarize: (text: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  
  const categories = [
    { name: 'All', icon: Library },
    { name: 'Graphic Design', icon: Palette },
    { name: 'Video Editing', icon: Video },
    { name: 'Dev', icon: Code }
  ];
  
  const filteredResources = [...resources]
    .filter(r => filter === 'All' ? true : r.category === filter)
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else {
        // Fallback for 'date', assuming larger id means newer, or use string sorting if date is present.
        return b.id - a.id; 
      }
    });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setFilter(cat.name)}
              className={`
                px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all border flex items-center gap-2 shadow-sm
                ${filter === cat.name 
                  ? 'bg-[var(--color-orbit-accent)] text-white border-[var(--color-orbit-accent)]' 
                  : 'bg-[var(--color-orbit-card)] text-[var(--color-orbit-text-secondary)] border-[var(--color-glass-border)] hover:border-[var(--color-orbit-accent)]/50 hover:text-[var(--color-orbit-text-primary)]'}
              `}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-wider">Sort By:</span>
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] rounded-lg py-1.5 px-3 text-[13px] text-[var(--color-orbit-text-primary)] focus:outline-none focus:border-[var(--color-orbit-accent)] transition-all shadow-sm cursor-pointer"
          >
            <option value="date">Date Added</option>
            <option value="title">Title (A-Z)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <motion.div 
            layout
            key={res.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03, y: -5 }}                
            className="card-premium group overflow-hidden flex flex-col"
          >
            <div className="relative h-40 overflow-hidden bg-[var(--color-orbit-bg)]">
              <img 
                src={res.thumbnail} 
                alt={res.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button title="View Link" className="p-1.5 bg-black/50 backdrop-blur-md rounded text-white/80 hover:text-white border border-white/20">
                  <ExternalLink size={14} />
                </button>
                <button onClick={() => onSummarize(`Resource: ${res.title}\nCategory: ${res.category}\nTags: ${res.tags.join(', ')}`)} title="AI Summary" className="p-1.5 bg-[var(--color-orbit-accent)]/80 backdrop-blur-md rounded text-white hover:bg-[var(--color-orbit-accent)] border border-[var(--color-orbit-accent)] shadow-lg transform transition active:scale-95">
                  <Sparkles size={14} />
                </button>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold text-[var(--color-orbit-accent)] uppercase tracking-widest mb-1.5 block">{res.category}</span>
                <h3 className="text-[15px] font-bold text-[var(--color-orbit-text-primary)] mb-3 line-clamp-1 tracking-tight">{res.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {res.tags.map(tag => (
                  <span key={tag} className="text-[9px] text-[var(--color-orbit-text-secondary)] font-bold px-1.5 py-0.5 bg-[var(--color-orbit-bg)] rounded border border-[var(--color-glass-border)] uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Create Action Modal ---

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (res: any) => void;
  onAddRoutine: (task: any) => void;
}

const CreateActionModal = ({ isOpen, onClose, onAddResource, onAddRoutine }: CreateActionModalProps) => {
  const [activeTab, setActiveTab] = useState<'routine' | 'resource'>('routine');
  const [resourceForm, setResourceForm] = useState({ url: '', title: '', category: 'Dev', tags: '' });
  const [routineForm, setRoutineForm] = useState({ title: '', meta: '' });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="w-full max-w-lg bg-[var(--color-orbit-card)] border border-[var(--color-glass-border)] rounded-[28px] p-2 relative overflow-hidden flex flex-col shadow-[var(--shadow-card-hover)]"
        >
           {/* Tab Header */}
           <div className="flex p-2 gap-2 bg-[var(--color-orbit-bg)] rounded-[24px] mb-6">
              <button 
                onClick={() => setActiveTab('routine')}
                className={`flex-1 py-3 rounded-[18px] text-[13px] font-bold transition-all font-bengali ${activeTab === 'routine' ? 'bg-[var(--color-orbit-accent)] text-white shadow-[var(--shadow-card)]' : 'text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)]'}`}
              >
                রুটিন যোগ করুন
              </button>
              <button 
                onClick={() => setActiveTab('resource')}
                className={`flex-1 py-3 rounded-[18px] text-[13px] font-bold transition-all font-bengali ${activeTab === 'resource' ? 'bg-[var(--color-orbit-accent)] text-white shadow-[var(--shadow-card)]' : 'text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)]'}`}
              >
                রিসোর্স সেভ করুন
              </button>
           </div>

           <div className="px-6 pb-8 pt-2">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h2 className="text-xl font-bold text-[var(--color-orbit-text-primary)] tracking-tight font-bengali">নতুন আইটেম তৈরি করুন</h2>
                  <p className="text-[13px] text-[var(--color-orbit-text-secondary)] font-medium mt-1 font-bengali">আপনার সিস্টেমে নতুন ডেটা যোগ করুন।</p>
               </div>
               <button onClick={onClose} className="p-2.5 rounded-xl bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)]"><X size={18} /></button>
            </div>

            {activeTab === 'routine' ? (
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                onAddRoutine(routineForm);
                setRoutineForm({ title: '', meta: '' });
                onClose();
              }}>
                <div className="space-y-2 font-bengali">
                  <label className="text-[10px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-widest ml-1">টাস্ক টাইটেল (Task Title)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="উদা: নতুন স্কিল শেখা"
                    className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-6 text-[14px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] transition-all font-medium font-bengali shadow-sm"
                    value={routineForm.title}
                    onChange={(e) => setRoutineForm({ ...routineForm, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2 font-bengali">
                  <label className="text-[10px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-widest ml-1">সময়/বিবরণ (Time/Subtitle)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="উদা: বিকেল ৪:০০ - নলেজ আপগ্রেড"
                    className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-6 text-[14px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] transition-all font-medium font-bengali shadow-sm"
                    value={routineForm.meta}
                    onChange={(e) => setRoutineForm({ ...routineForm, meta: e.target.value })}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-[var(--color-orbit-accent)] hover:opacity-90 text-white rounded-xl font-bold text-[14px] shadow-md transition-all active:scale-[0.98] mt-4 font-bengali">রুটিনে সেভ করুন</button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                onAddResource(resourceForm);
                setResourceForm({ url: '', title: '', category: 'Dev', tags: '' });
                onClose();
              }}>
                <div className="space-y-2 font-bengali">
                  <label className="text-[10px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-widest ml-1">রিসোর্স টাইটেল (Title)</label>
                  <input required placeholder="উদা: মডার্ন ডিজাইন টুলকিট" className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-6 text-[13px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] font-bengali shadow-sm transition-all" value={resourceForm.title} onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 font-bengali">
                    <label className="text-[10px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-widest ml-1">টাইপ (Type)</label>
                    <select className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-4 text-[13px] text-[var(--color-orbit-text-primary)] cursor-pointer font-bengali transition-all shadow-sm" value={resourceForm.category} onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })}>
                      {['Dev', 'Graphic Design', 'Video Editing'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2 font-bengali">
                     <label className="text-[10px] font-bold text-[var(--color-orbit-text-secondary)] uppercase tracking-widest ml-1">ট্যাগ (Tags)</label>
                     <input placeholder="#tag" className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3.5 px-4 text-[13px] text-[var(--color-orbit-text-primary)] placeholder:text-[var(--color-orbit-text-secondary)] focus:outline-none focus:border-[var(--color-orbit-accent)] font-bengali shadow-sm transition-all" value={resourceForm.tags} onChange={e => setResourceForm({ ...resourceForm, tags: e.target.value })} />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-[var(--color-orbit-accent)] hover:opacity-90 text-white rounded-xl font-bold text-[14px] shadow-md mt-4 font-bengali transition-all active:scale-[0.98]">লাইব্রেরিতে সেভ করুন</button>
              </form>
            )}
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Mobile Components ---

const MobileNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'routine', label: 'Routine', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Library },
    { id: 'settings', label: 'Set.', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[80] nav-bottom">
      <div className="flex justify-between items-center px-4 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              flex flex-col items-center justify-center flex-1 py-1.5 gap-1 transition-all rounded-lg mx-1
              ${activeTab === item.id ? 'text-[var(--color-orbit-accent)] bg-[var(--color-orbit-card)] shadow-sm border border-[var(--color-glass-border)]' : 'text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)]'}
            `}
          >
            <item.icon size={18} className={activeTab === item.id ? 'stroke-[2.5px]' : ''} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const MobileHeader = ({ isLightMode, toggleTheme }: { isLightMode: boolean, toggleTheme: () => void }) => (
  <header className="md:hidden flex justify-between items-center px-4 py-3 nav-header fixed top-0 left-0 w-full z-[80]">
    <div className="flex items-center gap-2 card-premium p-2 px-3">
      <div className="w-5 h-5 rounded-[5px] bg-[var(--color-orbit-accent)] flex items-center justify-center p-1 shadow-sm">
        <div className="w-full h-full bg-[var(--color-orbit-card)] rounded-[2px]" />
      </div>
      <h1 className="text-sm font-bold text-[var(--color-orbit-text-primary)] uppercase tracking-[0.15em]">My Orbit</h1>
    </div>
    
    <div className="flex items-center gap-3">
      <button 
        onClick={toggleTheme}
        className="p-2.5 rounded-lg card-premium text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)] transition-all flex items-center justify-center"
      >
        {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      <div className="w-9 h-9 rounded-full card-premium shadow-sm flex items-center justify-center text-[var(--color-orbit-text-secondary)]">
        <User size={16} />
      </div>
    </div>
  </header>
);

// --- Main App Component ---

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => localStorage.getItem('orbit-theme') === 'light');
  const [userName, setUserName] = useState(() => localStorage.getItem('orbit-user') || '');
  const [isSummarizerOpen, setIsSummarizerOpen] = useState(false);
  const [summarizerContext, setSummarizerContext] = useState('');

  const [priorities, setPriorities] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('orbit-priorities');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Finalize Architectural Specs', completed: false },
      { id: 2, title: 'Engineering Team Sync', completed: true },
      { id: 3, title: 'Review Security Protocols', completed: false },
    ];
  });

  const [salah, setSalah] = useState(() => JSON.parse(localStorage.getItem('orbit-salah') || '[false,false,false,false,false]'));
  const [quran, setQuran] = useState(() => localStorage.getItem('orbit-quran') || '');
  const [gratitude, setGratitude] = useState(() => JSON.parse(localStorage.getItem('orbit-gratitude') || '["","",""]'));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('orbit-streak') || '0'));
  const [streakDate, setStreakDate] = useState(() => localStorage.getItem('orbit-streak-date') || '');
  
  useEffect(() => {
    localStorage.setItem('orbit-salah', JSON.stringify(salah));
    localStorage.setItem('orbit-quran', quran);
    localStorage.setItem('orbit-gratitude', JSON.stringify(gratitude));
    localStorage.setItem('orbit-streak', streak.toString());
    localStorage.setItem('orbit-streak-date', streakDate);
  }, [salah, quran, gratitude, streak, streakDate]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (priorities.every(p => p.completed) && streakDate !== today) {
       setStreak(s => s + 1);
       setStreakDate(today);
    }
  }, [priorities, streakDate]);

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isConfettiEnabled, setIsConfettiEnabled] = useState(true);

  const [routines, setRoutines] = useState<RoutineData[]>(() => {
    const saved = localStorage.getItem('orbit-routines');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'তাহাজ্জুদ, ফজরের সালাত ও কুরআন তিলাওয়াত', meta: 'ভোর ৫:০০ - প্রশান্তির শুরু', completed: true },
      { id: 2, title: 'সকালের শরীরচর্চা ও স্বাস্থ্যকর নাস্তা', meta: 'সকাল ৭:৩০ - এনার্জি বুস্ট', completed: false },
      { id: 3, title: 'দিনের সবচেয়ে গুরুত্বপূর্ণ কাজ (Deep Work)', meta: 'সকাল ৯:০০ - ফোকাস সেশন', completed: false },
      { id: 4, title: 'নতুন স্কিল শেখা বা বই পড়া', meta: 'বিকেল ৪:০০ - নলেজ আপগ্রেড', completed: false },
      { id: 5, title: 'এশার সালাত ও সারাদিনের মূল্যায়ন', meta: 'রাত ৯:০০ - রুটিন চেক', completed: false },
    ];
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('orbit-resources');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Modern UI/UX Patterns', category: 'Graphic Design', tags: ['#inspiration', '#ui'], thumbnail: 'https://picsum.photos/seed/ui/400/300' },
      { id: 2, title: 'React Performance Tips', category: 'Dev', tags: ['#react', '#performance'], thumbnail: 'https://picsum.photos/seed/dev/400/300' },
      { id: 3, title: 'Cinema 4D Rendering', category: 'Graphic Design', tags: ['#3d', '#motion'], thumbnail: 'https://picsum.photos/seed/3d/400/300' },
      { id: 4, title: 'Color Grading Masterclass', category: 'Video Editing', tags: ['#video', '#tutorial'], thumbnail: 'https://picsum.photos/seed/video/400/300' },
      { id: 5, title: 'TypeScript Best Practices', category: 'Dev', tags: ['#ts', '#clean-code'], thumbnail: 'https://picsum.photos/seed/ts/400/300' },
      { id: 6, title: 'Logotype Grid Systems', category: 'Graphic Design', tags: ['#branding', '#logo'], thumbnail: 'https://picsum.photos/seed/logo/400/300' },
    ];
  });

  const togglePriority = (id: number) => {
    setPriorities(prev => prev.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  const [toast, setToast] = useState<string | null>(null);

  const playZenDing = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const toggleRoutine = (id: number) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === id) {
        if (!r.completed) {
          playZenDing();
          setToast('মাশাআল্লাহ! আপনি কাজটি সম্পন্ন করেছেন।');
        }
        return { ...r, completed: !r.completed };
      }
      return r;
    }));
  };

  const deleteRoutine = (id: number) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
  };

  const handleAddResource = (data: any) => {
    const newRes: Resource = {
      id: Date.now(),
      title: data.title || 'Untitled Asset',
      category: data.category,
      tags: data.tags.split(' ').filter((t: string) => t.startsWith('#')),
      thumbnail: `https://picsum.photos/seed/${data.title}/400/300`
    };
    setResources(prev => [newRes, ...prev]);
  };

  const handleAddRoutine = (data: any) => {
    const newRoutine: RoutineData = {
      id: Date.now(),
      title: data.title,
      meta: data.meta,
      completed: false
    };
    setRoutines(prev => [newRoutine, ...prev]);
  };

  const toggleTheme = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    localStorage.setItem('orbit-priorities', JSON.stringify(priorities));
    localStorage.setItem('orbit-routines', JSON.stringify(routines));
    localStorage.setItem('orbit-resources', JSON.stringify(resources));
    localStorage.setItem('orbit-user', userName);
    localStorage.setItem('orbit-theme', isLightMode ? 'light' : 'dark');
    
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [priorities, routines, resources, userName, isLightMode]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsCommandOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`flex h-screen w-full bg-orbit-bg overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-white transition-all duration-500`}>
      <AnimatePresence>
        {!userName && <WelcomeScreen onComplete={(name) => setUserName(name)} />}
      </AnimatePresence>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userName={userName} />

      <main className="flex-1 flex flex-col relative overflow-y-auto z-10 p-6 md:p-12 max-w-[1400px] mx-auto w-full pt-20 md:pt-12 pb-32 md:pb-12 scrollbar-hide">
        <MobileHeader isLightMode={isLightMode} toggleTheme={toggleTheme} />

        <header className="hidden md:flex justify-between items-start mb-12 card-premium p-6">
          <div>
            <h1 className="text-[28px] font-bold text-[var(--color-orbit-text-primary)] tracking-tight mb-2">My System</h1>
            <p className="text-[15px] text-[var(--color-orbit-text-secondary)] font-medium tracking-wide font-bengali">
              আসসালামু আলাইকুম, {userName || 'কমান্ডার'}!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={() => {
                const selection = window.getSelection()?.toString();
                setSummarizerContext(selection || '');
                setIsSummarizerOpen(true);
              }}
              title="Summarize Selection"
              className="p-2.5 rounded-xl card-premium text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-accent)] transition-all flex items-center justify-center"
            >
              <Sparkles size={18} />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl card-premium text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)] transition-all flex items-center justify-center"
            >
              {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setIsCommandOpen(true)}
              className="px-5 py-2.5 bg-[var(--color-orbit-card)] hover:border-[var(--color-orbit-accent)] border border-[var(--color-glass-border)] text-[var(--color-orbit-text-primary)] rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 group shadow-[var(--shadow-card)]"
            >
              <Zap size={14} className="text-[var(--color-orbit-accent)] group-hover:drop-shadow-md" />
              Quick Command
              <span className="ml-2 text-[10px] text-[var(--color-orbit-text-secondary)] font-mono font-bold tracking-tighter bg-[var(--color-orbit-bg)] px-1.5 py-0.5 rounded border border-[var(--color-glass-border)]">⌘K</span>
            </button>
          </div>
        </header>

        <div className="flex-1">
          {activeTab === 'dashboard' ? (
            <DashboardContent 
              priorities={priorities} 
              routines={routines} 
              togglePriority={togglePriority} 
              toggleRoutine={toggleRoutine} 
              deleteRoutine={deleteRoutine}
              onOpenModal={() => setIsModalOpen(true)}
              setToast={setToast}
              isSoundEnabled={isSoundEnabled}
              salah={salah}
              setSalah={setSalah}
              quran={quran}
              setQuran={setQuran}
              gratitude={gratitude}
              setGratitude={setGratitude}
              streak={streak}
            />
          ) : 
           activeTab === 'vault' ? (
             <VaultContent 
                resources={resources} 
                onSummarize={(text) => {
                  setSummarizerContext(text);
                  setIsSummarizerOpen(true);
                }} 
             />
           ) : 
           activeTab === 'routine' ? (
             <RoutineContent 
               routines={routines} 
               toggleRoutine={toggleRoutine} 
               deleteRoutine={deleteRoutine}
             />
           ) : activeTab === 'settings' ? (
             <SettingsContent 
               userName={userName}
               setUserName={setUserName}
               routines={routines}
               deleteRoutine={deleteRoutine}
               resources={resources}
               setResources={setResources}
               isSoundEnabled={isSoundEnabled}
               setIsSoundEnabled={setIsSoundEnabled}
               isConfettiEnabled={isConfettiEnabled}
               setIsConfettiEnabled={setIsConfettiEnabled}
               isLightMode={isLightMode}
               setIsLightMode={setIsLightMode}
               setToast={setToast}
             />
           ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
                <Settings size={24} className="text-slate-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2 tracking-tight">System Settings</h2>
              <p className="text-[14px] text-slate-500 max-w-sm">Manage your orbital parameters and system preferences here.</p>
            </div>
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 md:bottom-10 right-6 md:right-10 w-12 h-12 md:w-14 md:h-14 bg-emerald-500 text-white rounded-lg shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)] flex items-center justify-center z-50 group border border-white/20"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnimatePresence>
        {toast && <Toast message={toast} onComplete={() => setToast(null)} />}
      </AnimatePresence>
      <CreateActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddResource={handleAddResource}
        onAddRoutine={handleAddRoutine}
      />
      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
        resources={resources}
      />
      <AISummarizerModal
        isOpen={isSummarizerOpen}
        onClose={() => setIsSummarizerOpen(false)}
        initialContext={summarizerContext}
      />
    </div>
  );
}
