import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings as SettingsIcon, BarChart3, Activity } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneAuthModal } from './PhoneAuthModal';

export const UserProfileMenu = ({ 
  userName, 
  streak, 
  setActiveTab 
}: { 
  userName: string; 
  streak: number; 
  setActiveTab: (tab: string) => void;
}) => {
  const [user, setUser] = useState<any>(auth.currentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAuth = () => {
      const mockPhone = localStorage.getItem('orbit_mock_user');
      if (mockPhone) {
        setUser({ phoneNumber: mockPhone, uid: 'mock-uid' });
      } else {
        setUser(auth.currentUser);
      }
    };

    handleAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!localStorage.getItem('orbit_mock_user')) {
        setUser(u);
      }
    });

    window.addEventListener('auth-change', handleAuth);
    return () => {
      unsubscribe();
      window.removeEventListener('auth-change', handleAuth);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('orbit_mock_user');
    await signOut(auth);
    setUser(null);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event('auth-change'));
  };

  const handleSettings = () => {
    setActiveTab('settings');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleClick}
        className="w-9 h-9 rounded-full card-premium shadow-sm flex items-center justify-center text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)] transition-all hover:bg-[var(--color-orbit-card)] relative"
      >
        <User size={16} />
        {user && <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[var(--color-orbit-bg)]"></div>}
      </button>

      <AnimatePresence>
        {isDropdownOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 card-premium rounded-[16px] shadow-2xl p-4 z-50 border border-[var(--color-glass-border)]"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--color-glass-border)] opacity-80">
              <div className="w-10 h-10 rounded-full bg-[var(--color-orbit-accent)] flex items-center justify-center text-white pb-0.5 shadow-md font-bold">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-orbit-text-primary)] text-sm">{userName || 'My Orbit User'}</h4>
                <p className="text-[11px] text-[var(--color-orbit-text-secondary)] tracking-wider">{user.phoneNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
               <div className="bg-[var(--color-orbit-bg)] rounded-xl p-3 border border-[var(--color-glass-border)]">
                 <div className="flex items-center gap-1.5 text-[var(--color-orbit-text-secondary)] mb-1">
                   <Activity size={12} className="text-blue-400" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Productivity</span>
                 </div>
                 <div className="font-bold text-[18px] text-[var(--color-orbit-text-primary)]">85%</div>
               </div>
               <div className="bg-[var(--color-orbit-bg)] rounded-xl p-3 border border-[var(--color-glass-border)]">
                 <div className="flex items-center gap-1.5 text-[var(--color-orbit-text-secondary)] mb-1">
                   <BarChart3 size={12} className="text-orange-400" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
                 </div>
                 <div className="font-bold text-[18px] text-[var(--color-orbit-text-primary)]">{streak} <span className="text-[11px] font-normal text-[var(--color-orbit-text-secondary)]">Days</span></div>
               </div>
            </div>

            <div className="space-y-1">
              <button 
                onClick={handleSettings}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-orbit-text-secondary)] hover:text-[var(--color-orbit-text-primary)] hover:bg-[var(--color-orbit-card)] transition-colors font-medium font-bengali"
              >
                <SettingsIcon size={16} />
                সেটিংস (Settings)
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium font-bengali"
              >
                <LogOut size={16} />
                লগআউট করুন
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PhoneAuthModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={() => setIsDropdownOpen(true)}
      />
    </div>
  );
};
