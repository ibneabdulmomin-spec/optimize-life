import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle, X, Loader2 } from 'lucide-react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PhoneAuthModal = ({ isOpen, onClose, onSuccess }: PhoneAuthModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError('সঠিক মোবাইল নম্বর দিন।');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // বর্তমানে ওটিপি ছাড়া ডেমো লগইন এর জন্য
    // আমরা লোকাল স্টোরেজে একটি ফ্ল্যাগ সেট করছি যেন অ্যাপ বুঝতে পারে ইউজার লগইন করেছে
    setTimeout(() => {
      localStorage.setItem('orbit_mock_user', phoneNumber);
      onSuccess();
      onClose();
      setLoading(false);
      // এখানে পেজ রিলোড দিয়ে স্টেট আপডেট করা যেতে পারে অথবা ইভেন্ট ফায়ার করা যায়
      window.dispatchEvent(new Event('auth-change'));
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="card-premium relative w-full max-w-sm rounded-[24px] shadow-2xl p-6 sm:p-8"
          >
            <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-[var(--color-orbit-bg)] transition-colors text-[var(--color-orbit-text-secondary)] hover:text-white">
              <X size={20} />
            </button>
            
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-orbit-accent)] flex items-center justify-center mb-4 text-white shadow-lg shadow-[var(--color-orbit-accent)]/20">
                <Phone size={24} />
              </div>
              <h2 className="text-xl font-bold font-bengali text-[var(--color-orbit-text-primary)]">লগইন করুন</h2>
              <p className="text-sm text-[var(--color-orbit-text-secondary)] mt-2 font-bengali">
                আপনার মোবাইল নম্বর দিয়ে একাউন্ট সুরক্ষিত করুন। (আপাতত ওটিপি ছাড়াই)
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bengali">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[var(--color-orbit-bg)] border border-[var(--color-glass-border)] rounded-xl py-3 px-4 text-[var(--color-orbit-text-primary)] focus:outline-none focus:border-[var(--color-orbit-accent)] transition-all font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full bg-[var(--color-orbit-accent)] hover:bg-[var(--color-orbit-accent)]/80 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-bengali disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'লগইন করুন'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
