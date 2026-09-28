import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { person } from '../data/content';
import { usePrefersReducedMotion } from '../lib/useMediaQuery';
import { cn } from '../lib/cn';

export const Contact: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync document title
  useEffect(() => {
    document.title = 'Contact | Jassinta Roid Triniti';
  }, []);

  // Copy email to clipboard with fallback
  const handleCopyEmail = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const textToCopy = person.email;
    let successful = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        successful = true;
      }
    } catch {
      successful = false;
    }

    if (!successful) {
      // Fallback using temporary textarea
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        successful = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        successful = false;
      }
    }

    setToastMessage('Copied');
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden bg-[#070707] text-[#EFE8D8] select-none">
      {/* ============================================================ */}
      {/* ATMOSPHERIC DRIFTING BACKGROUND                              */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ivory-tinted black ambient ellipse */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  x: [0, 16, -16, 0],
                  y: [0, -12, 12, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-[20%] opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 40%, rgba(239, 232, 216, 0.05), transparent 70%)',
          }}
        />

        {/* Subtle crimson horizon glow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 500px at 50% 64%, rgba(215, 38, 30, 0.08), transparent 75%)',
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* MAIN THREE-COLUMN CONTACT STAGE                              */}
      {/* ============================================================ */}
      <main className="flex-1 w-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-14 xl:gap-20 items-center">
          {/* ======================================================== */}
          {/* COLUMN 1: EMAIL                                          */}
          {/* ======================================================== */}
          <div
            onMouseEnter={() => setHoveredCol(0)}
            onMouseLeave={() => setHoveredCol(null)}
            className={cn(
              'flex flex-col items-center text-center transition-opacity duration-300',
              hoveredCol !== null && hoveredCol !== 0
                ? 'opacity-60'
                : 'opacity-100'
            )}
          >
            {/* Heading: Sentient Regular 66px Merah Menyala */}
            <div className="overflow-hidden py-1 mb-2 sm:mb-3 flex justify-center">
              <motion.h2
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-sentient font-normal text-[#D7261E] text-[clamp(36px,5vw,66px)] leading-none tracking-tight text-center"
              >
                Email
              </motion.h2>
            </div>

            {/* Email link + Copy button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${person.email}`}
                data-cursor="EMAIL"
                className="group relative min-h-[44px] inline-flex items-center font-poppins italic text-narration leading-relaxed text-[#FFFFFF] hover:text-[#D7261E] transition-colors [overflow-wrap:anywhere] active:scale-[0.98]"
              >
                <span>{person.email}</span>
                {/* Left-to-right sweep underline */}
                <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#D7261E] origin-bottom-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </a>

              {/* Copy micro-button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY"
                aria-label="Copy email address to clipboard"
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-white/[0.06] hover:bg-white/[0.15] active:bg-[#D7261E]/20 border border-white/15 hover:border-[#D7261E] text-micro uppercase tracking-wider text-[#FFFFFF]/80 hover:text-white transition-all cursor-pointer shadow-sm"
              >
                <Copy className="w-3 h-3 text-[#FFFFFF]/80" />
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: SOCIAL MEDIA                                   */}
          {/* ======================================================== */}
          <div
            onMouseEnter={() => setHoveredCol(1)}
            onMouseLeave={() => setHoveredCol(null)}
            className={cn(
              'flex flex-col items-center text-center transition-opacity duration-300',
              hoveredCol !== null && hoveredCol !== 1
                ? 'opacity-60'
                : 'opacity-100'
            )}
          >
            {/* Heading: Sentient Regular 66px Merah Menyala */}
            <div className="overflow-hidden py-1 mb-2 sm:mb-3 flex justify-center">
              <motion.h2
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-sentient font-normal text-[#D7261E] text-[clamp(36px,5vw,66px)] leading-none tracking-tight text-center"
              >
                Social Media
              </motion.h2>
            </div>

            {/* Instagram link */}
            <div className="flex items-center justify-center">
              <a
                href={person.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                className="group relative min-h-[44px] inline-flex items-center font-poppins italic text-narration leading-relaxed text-[#FFFFFF] hover:text-[#D7261E] transition-colors [overflow-wrap:anywhere] active:scale-[0.98]"
              >
                <span>Instagram: {person.instagram}</span>
                {/* Left-to-right sweep underline */}
                <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#D7261E] origin-bottom-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: WA: PHONE                                      */}
          {/* ======================================================== */}
          <div
            onMouseEnter={() => setHoveredCol(2)}
            onMouseLeave={() => setHoveredCol(null)}
            className={cn(
              'flex flex-col items-center text-center transition-opacity duration-300',
              hoveredCol !== null && hoveredCol !== 2
                ? 'opacity-60'
                : 'opacity-100'
            )}
          >
            {/* Heading: Sentient Regular 66px Merah Menyala */}
            <div className="overflow-hidden py-1 mb-2 sm:mb-3 flex justify-center">
              <motion.h2
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-sentient font-normal text-[#D7261E] text-[clamp(36px,5vw,66px)] leading-none tracking-tight text-center"
              >
                WA: Phone
              </motion.h2>
            </div>

            {/* WhatsApp link + Call micro-link */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={person.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CHAT"
                className="group relative min-h-[44px] inline-flex items-center font-poppins italic text-narration leading-relaxed text-[#FFFFFF] hover:text-[#D7261E] transition-colors tabular-nums [overflow-wrap:anywhere] active:scale-[0.98]"
              >
                <span>{person.phoneDisplay}</span>
                {/* Left-to-right sweep underline */}
                <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#D7261E] origin-bottom-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </a>

              {/* Call micro-link */}
              <a
                href={`tel:${person.phoneTel}`}
                data-cursor="CALL"
                aria-label={`Call ${person.phoneDisplay}`}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-[3px] bg-white/[0.06] hover:bg-white/[0.15] active:bg-[#D7261E]/20 border border-white/15 hover:border-[#D7261E] text-micro uppercase tracking-wider text-[#FFFFFF]/80 hover:text-white transition-all shadow-sm"
              >
                <span className="text-[10px]">Call</span>
                <span className="font-mono text-[9px] text-[#D7261E]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* INTEGRATED FOOTER ROW                                        */}
      {/* Left: 2026 | Center: Jassinta Roid Triniti | Right: Contact  */}
      {/* ============================================================ */}
      <footer
        role="contentinfo"
        className="w-full h-11 border-t border-[rgba(239,232,216,0.1)] bg-[#070707]/90 backdrop-blur-md px-6 sm:px-10 lg:px-16 flex items-center justify-between text-micro text-[#EFE8D8] relative z-30 pointer-events-auto"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <span className="tracking-widest tabular-nums opacity-75">{person.year}</span>
        <span className="font-poppins font-medium tracking-widest text-[#EFE8D8]/90 text-center">
          {person.name}
        </span>
        <span className="font-mono text-xs tracking-widest text-[#EFE8D8]/70 text-right">
          Contact
        </span>
      </footer>

      {/* ============================================================ */}
      {/* FLOATING TOAST NOTIFICATION                                  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#141414]/95 border border-[rgba(239,232,216,0.25)] text-[#EFE8D8] text-xs font-poppins shadow-[0_12px_32px_rgba(0,0,0,0.9)] backdrop-blur-md select-none pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7261E] animate-pulse" />
            <span className="font-medium tracking-wide">{toastMessage}</span>
            <Check className="w-3.5 h-3.5 text-[#D7261E] ml-0.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
