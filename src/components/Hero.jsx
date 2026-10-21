import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, Scissors, Film, Clock, Sliders } from 'lucide-react';
import { useAudio } from './AudioEngine';
import { TimecodeCounter } from './TimecodeCounter';

export const Hero = ({ onOpenReel, onOpenHire, profile }) => {
  const { playClick, playSwoosh } = useAudio();
  const [aspect, setAspect] = useState('2.39:1');

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden bg-black">
      
      {/* Background Film Strip Ambient Layer */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80"
          alt="Cinematic frame preview"
          className="w-full h-full object-cover filter grayscale contrast-150 brightness-50 transform scale-105"
        />
        <div className="absolute inset-0 scanlines" />
      </div>

      {/* Viewfinder Overlay Markers */}
      <div className="absolute inset-x-6 top-24 bottom-12 pointer-events-none border border-white/5 hidden md:block">
        {/* Corner Reticles */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40" />
        
        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-20">
          <div className="w-full h-[1px] bg-white absolute top-1/2" />
          <div className="h-full w-[1px] bg-white absolute left-1/2" />
        </div>
      </div>

      {/* Top Metadata Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/10 pb-4 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-zinc-300 font-semibold tracking-widest">[REEL 2026]</span>
            <span className="text-zinc-600">/</span>
            <span>24.000 FPS</span>
            <span className="text-zinc-600">/</span>
            <span>4K PRORES 4444 XQ</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span className="text-zinc-300 uppercase tracking-widest">{profile.status}</span>
            </div>
            <div className="text-zinc-400">
              <TimecodeCounter />
            </div>
          </div>
        </div>
      </div>

      {/* Main Cinematic Title Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Tagline / Department */}
          <div className="inline-flex items-center space-x-3 px-3 py-1 border border-white/15 bg-white/[0.03] backdrop-blur-sm">
            <Scissors className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">
              OFFLINE & ONLINE PICTURE EDITORIAL
            </span>
          </div>

          {/* Mammoth Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.88] select-none font-sans">
            RHYTHM. <br />
            PACING. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
              TENSION.
            </span>
          </h1>

          {/* Understated Statement (Strictly Professional, No AI Buzzwords) */}
          <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed pt-2">
            Selected offline cuts for commercial campaigns, narrative films, and documentary features.
            Focusing on dialogue breathing room, non-linear montages, and seamless turnovers to color and sound.
          </p>

          {/* Action Triggers */}
          <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            
            {/* Play Reel Big CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                onOpenReel();
              }}
              className="group relative flex items-center space-x-4 bg-white text-black px-6 sm:px-8 py-4 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-zinc-200 transition-colors shadow-2xl"
            >
              <div className="w-6 h-6 rounded-none bg-black text-white flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>WATCH SHOWREEL [{profile.reelDuration}]</span>
            </motion.button>

            {/* Direct Hire Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick();
                onOpenHire();
              }}
              className="px-6 sm:px-8 py-4 font-mono text-xs sm:text-sm tracking-widest uppercase border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all"
            >
              INQUIRE BOOKINGS
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Stats & Quick Specs Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {profile.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              className="space-y-1 border-l border-white/10 pl-4"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-[1px] bg-zinc-600" />
            <span>SCROLL TO INSPECT TIMELINE & CUTS</span>
          </div>
          <a 
            href="#works" 
            onClick={playClick}
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
