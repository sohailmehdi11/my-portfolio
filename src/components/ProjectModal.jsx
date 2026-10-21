import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film, ArrowUpRight, Clock, Sliders } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const ProjectModal = ({ project, onClose, onHireForSimilar }) => {
  if (!project) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aspect, setAspect] = useState(project.aspectRatio || '16:9');
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
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop click to close */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl bg-[#090909] border border-white/20 text-white shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between font-mono text-xs bg-black">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-white" />
              <span className="font-bold tracking-wider uppercase text-zinc-200">
                {project.client} — {project.title}
              </span>
              <span className="text-zinc-500 hidden sm:inline">[{project.year}]</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Aspect Ratio selector */}
              <div className="hidden sm:flex items-center space-x-1 text-[11px] text-zinc-500">
                <span className="mr-1">MASK:</span>
                {['2.39:1', '16:9', '4:3'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => {
                      playClick();
                      setAspect(ratio);
                    }}
                    className={`px-1.5 py-0.5 border ${
                      aspect === ratio
                        ? 'border-white text-white'
                        : 'border-white/10 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 border border-white/20 hover:border-white text-zinc-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative bg-black flex items-center justify-center overflow-hidden border-b border-white/10">
            <div 
              className="w-full transition-all duration-300 flex items-center justify-center"
              style={{
                aspectRatio: aspect === '2.39:1' ? '2.39 / 1' : aspect === '4:3' ? '4 / 3' : '16 / 9',
                maxHeight: '52vh'
              }}
            >
              {project.videoUrl ? (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale"
                />
              )}
            </div>

            {/* Custom Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col space-y-2">
              {/* Seek Timeline */}
              <div 
                onClick={handleSeek}
                className="w-full h-1 bg-white/20 hover:h-2 transition-all cursor-pointer relative group"
              >
                <div 
                  className="h-full bg-white relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <div className="flex items-center space-x-3">
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

                  <span className="text-[11px] text-zinc-400">
                    RUNTIME: {project.runtime}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px]">
                  <span>CODEC: {project.codec}</span>
                  <span className="hidden sm:inline">|</span>
                  <span className="hidden sm:inline">{project.fps} FPS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Notes & Technical Slate */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left 2 cols: Synopsis & Cut Notes */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    // EDITORIAL SYNOPSIS
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.synopsis}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    // PACING & MONTAGE NOTES
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed bg-black/60 p-4 border border-white/5 font-mono text-xs">
                    {project.cutNotes}
                  </p>
                </div>
              </div>

              {/* Right 1 col: Technical Slate & Action */}
              <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-6">
                <div>
                  <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                    // PRODUCTION SLATE
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-500">DIRECTOR</span>
                      <span className="text-zinc-200">{project.director}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-500">CLIENT</span>
                      <span className="text-zinc-200">{project.client}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-500">NLE SUITE</span>
                      <span className="text-zinc-200">{project.tools.join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-zinc-500">ASPECT RATIO</span>
                      <span className="text-zinc-200">{project.aspectRatio}</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                    onHireForSimilar(project);
                  }}
                  className="w-full bg-white text-black font-mono text-xs font-bold py-3 uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <span>INQUIRE SIMILAR EDIT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
