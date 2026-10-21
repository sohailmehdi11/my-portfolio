import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Film } from 'lucide-react';
import { useAudio } from './AudioEngine';
import { TimecodeCounter } from './TimecodeCounter';

export const Header = ({ onOpenHire, onOpenReel, profile }) => {
  const { isMuted, toggleMute, playClick } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORKS', href: '#works' },
    { name: 'REEL', action: onOpenReel },
    { name: 'TESTIMONIALS', href: '#feedbacks' },
    { name: 'PIPELINE', href: '#specs' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md border-white/10 py-3' 
            : 'bg-transparent border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand & Technical Status */}
          <div className="flex items-center space-x-5">
            <a 
              href="#" 
              onClick={playClick}
              className="group flex items-center space-x-3 text-white focus:outline-none"
            >
              <div className="w-8 h-8 rounded-none border border-white/40 flex items-center justify-center font-mono text-xs tracking-tighter group-hover:border-white transition-colors bg-white/5">
                <span className="font-bold">SH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-widest font-mono text-white group-hover:text-zinc-300 transition-colors uppercase">
                  {profile.name}
                </span>
                <span className="text-[10px] tracking-widest2 text-zinc-500 font-mono hidden sm:inline-block">
                  {profile.subRole}
                </span>
              </div>
            </a>

            {/* Timecode ticker - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 pl-4 border-l border-white/10 text-zinc-400 text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[11px] text-zinc-400">TC</span>
              <TimecodeCounter className="text-zinc-300 text-xs" />
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs tracking-widest">
            {navLinks.map((link) => (
              link.action ? (
                <button
                  key={link.name}
                  onClick={() => {
                    playClick();
                    link.action();
                  }}
                  className="text-zinc-400 hover:text-white transition-colors uppercase flex items-center gap-1 group"
                >
                  <Film className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                  <span>{link.name}</span>
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={playClick}
                  className="text-zinc-400 hover:text-white transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Right Controls: Audio + Hire Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Audio Atmosphere Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? "Activate Projector Atmosphere Audio" : "Mute Sound"}
              className="p-2 border border-white/10 hover:border-white/40 text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-2 bg-white/[0.02]"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-white" />
                  <span className="flex space-x-[2px] items-end h-3">
                    <span className="w-[2px] h-3 bg-white animate-pulse" />
                    <span className="w-[2px] h-2 bg-white animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <span className="w-[2px] h-3 bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </span>
                </div>
              )}
              <span className="font-mono text-[10px] hidden xl:inline uppercase tracking-wider">
                {isMuted ? "ATMOSPHERE OFF" : "ATMOSPHERE ON"}
              </span>
            </button>

            {/* High-Impact HIRE Button */}
            <button
              onClick={() => {
                playClick();
                onOpenHire();
              }}
              className="relative group overflow-hidden bg-white text-black font-mono text-xs font-semibold px-4 sm:px-6 py-2.5 tracking-widest uppercase transition-all duration-300 hover:bg-zinc-200 active:scale-95 flex items-center gap-2"
            >
              <span>HIRE EDITOR</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden border-b border-white/10 flex flex-col justify-between pb-12"
          >
            <div className="space-y-6">
              <div className="font-mono text-[11px] text-zinc-600 tracking-widest pb-4 border-b border-white/10 uppercase">
                // EDITORIAL NAVIGATION
              </div>
              <div className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  link.action ? (
                    <button
                      key={link.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.action();
                      }}
                      className="text-left font-mono text-lg tracking-widest text-zinc-200 hover:text-white"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-mono text-lg tracking-widest text-zinc-200 hover:text-white"
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>STATUS:</span>
                <span className="text-white">{profile.status}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHire();
                }}
                className="w-full bg-white text-black font-mono text-sm font-semibold py-3 uppercase tracking-widest"
              >
                BOOK PICTURE EDITORIAL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
