import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds as requested
    const intervalTime = 30;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white overflow-hidden select-none"
      >
        {/* Background glow & subtle patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-stone-950/90 to-stone-950" />
        
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
          {/* Animated Emblem / Logo */}
          <motion.div
            initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.1 }}
            className="relative mb-6"
          >
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 blur-md opacity-60"
            />

            {/* Logo Badge */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-red-600 via-red-700 to-stone-900 rounded-2xl border-2 border-amber-400/60 shadow-2xl flex flex-col items-center justify-center p-3">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="flex items-center gap-1 mb-1 text-amber-300"
              >
                <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
              </motion.div>
              <span className="font-heading text-4xl sm:text-5xl font-black tracking-wider text-white drop-shadow-md leading-none">
                RCB
              </span>
              <span className="font-display text-xs font-black tracking-widest text-amber-300 uppercase">
                FOODS
              </span>
            </div>
          </motion.div>

          {/* Restaurant Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-2"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              RCB FOODS
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Karachi Ultimate Food Stop!</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-stone-400 text-xs sm:text-sm mb-8"
          >
            Main PWD Road, Islamabad • Authentic Karachi Taste
          </motion.p>

          {/* Progress Bar */}
          <div className="w-full bg-stone-800/80 rounded-full h-2 overflow-hidden mb-3 border border-stone-700/50 p-0.5">
            <motion.div
              className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round(progress))}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs text-stone-400 mb-6">
            <span>Sizzling Karachi Flavors...</span>
            <span className="font-mono text-amber-400 font-semibold">{Math.min(100, Math.round(progress))}%</span>
          </div>

          {/* Skip Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border border-stone-700 transition cursor-pointer"
          >
            <span>Skip to Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
