import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const Feedbacks = ({ feedbacks }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playClick, playSwoosh } = useAudio();

  const nextFeedback = () => {
    playClick();
    setActiveIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    playClick();
    setActiveIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <section id="feedbacks" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div className="space-y-2">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span>TESTIMONIALS // PRODUCTION ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
              DIRECTOR & PRODUCER FEEDBACK
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-lg font-normal">
              Direct notes from directors, executive producers, and post supervisors across commercial campaigns and narrative releases.
            </p>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevFeedback}
              className="p-3 border border-white/20 hover:border-white text-zinc-400 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-zinc-500">
              0{activeIndex + 1} / 0{feedbacks.length}
            </span>
            <button
              onClick={nextFeedback}
              className="p-3 border border-white/20 hover:border-white text-zinc-400 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Big Quote Showcase */}
        <div className="relative border border-white/20 bg-black p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Subtle Grid Reticle */}
          <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-600">
            [VERIFIED EDITORIAL CREDIT // {feedbacks[activeIndex].year}]
          </div>

          <motion.div
            key={feedbacks[activeIndex].id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Quote Body */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-100 leading-snug tracking-tight max-w-4xl font-sans">
              "{feedbacks[activeIndex].quote}"
            </blockquote>

            {/* Author Meta */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-base text-white uppercase tracking-wider">
                    {feedbacks[activeIndex].clientName}
                  </span>
                  <span className="px-2 py-0.5 border border-white/20 font-mono text-[10px] text-zinc-400 uppercase">
                    {feedbacks[activeIndex].role}
                  </span>
                </div>
                <div className="font-mono text-xs text-zinc-400">
                  {feedbacks[activeIndex].company}
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-zinc-500">
                <div>PROJECT CUT: <span className="text-zinc-300 font-semibold">{feedbacks[activeIndex].project}</span></div>
                <div>TURNOVER: ZERO CONFORM ERRORS</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Multi-Card Grid for Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {feedbacks.map((fb, idx) => (
            <div
              key={fb.id}
              onClick={() => {
                playClick();
                setActiveIndex(idx);
              }}
              className={`p-5 border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 ${
                activeIndex === idx 
                  ? 'border-white bg-white/[0.04]' 
                  : 'border-white/10 bg-black hover:border-white/40'
              }`}
            >
              <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                "{fb.quote}"
              </p>
              <div className="pt-3 border-t border-white/10">
                <div className="font-mono text-xs font-semibold text-white uppercase truncate">
                  {fb.clientName}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 truncate">
                  {fb.role} // {fb.company}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
