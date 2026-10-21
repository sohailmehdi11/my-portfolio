import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { useAudio } from './AudioEngine';
import { TimecodeCounter } from './TimecodeCounter';

export const ShowreelModal = ({ isOpen, onClose, onOpenHire, profile }) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const { playClick } = useAudio();

  const togglePlay = () => {
    playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekPercent = clickX / width;
    if (videoRef.current) {
      videoRef.current.currentTime = seekPercent * videoRef.current.duration;
      setProgress(seekPercent * 100);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
      >
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <div className="w-full max-w-5xl bg-[#080808] border border-white/20 shadow-2xl relative flex flex-col overflow-hidden">
          {/* Top Slate */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between font-mono text-xs bg-black">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 bg-white animate-pulse" />
              <span className="font-bold tracking-widest uppercase">
                {profile.name} — OFFICIAL EDITORIAL REEL {profile.reelYear}
              </span>
              <span className="text-zinc-500 hidden md:inline">[{profile.reelDuration} CUT]</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-zinc-400">
                <TimecodeCounter />
              </div>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 border border-white/20 hover:border-white text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cinematic Theater Viewport */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-city-at-night-4228-large.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
            />

            {/* Letterbox Bars for 2.39:1 scope vibe */}
            <div className="absolute top-0 inset-x-0 h-[8%] bg-black pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-[8%] bg-black pointer-events-none" />

            {/* Viewfinder crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none opacity-20">
              <div className="w-full h-[1px] bg-white absolute top-1/2" />
              <div className="h-full w-[1px] bg-white absolute left-1/2" />
            </div>

            {/* Play/Pause overlay click */}
            <div 
              onClick={togglePlay}
              className="absolute inset-0 cursor-pointer flex items-center justify-center group"
            >
              {!isPlaying && (
                <div className="w-16 h-16 bg-white text-black flex items-center justify-center shadow-2xl">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              )}
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-black border-t border-white/10 flex flex-col space-y-3">
            {/* Timeline Bar */}
            <div 
              onClick={handleSeek}
              className="w-full h-1 bg-white/20 hover:h-2 transition-all cursor-pointer relative group"
            >
              <div 
                className="h-full bg-white relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={togglePlay}
                  className="p-1 hover:text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button 
                  onClick={() => {
                    playClick();
                    setIsMuted(!isMuted);
                  }}
                  className="p-1 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-zinc-500">FORMAT: SCOPE 2.39:1 / 24FPS</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline text-zinc-500">FEATURING: BMW, A24, WARNER, RED BULL</span>
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                    onOpenHire();
                  }}
                  className="bg-white text-black font-mono text-xs font-bold px-4 py-2 uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <span>BOOK EDITOR</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
