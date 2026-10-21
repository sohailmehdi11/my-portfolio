import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, Tag, Film, SlidersHorizontal, Info } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const Works = ({ projects, categories, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const { playClick, playSwoosh } = useAudio();

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#070707]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span>INDEX // SELECTED WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
              PICTURE ARCHIVE
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-normal">
              Commercials, festival narratives, and short-form pieces. Filter by format or inspect individual project conformed files.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`font-mono text-xs px-4 py-2 border transition-all uppercase tracking-wider ${
                    isActive
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-black text-zinc-400 border-white/15 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProjectId === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onMouseEnter={() => {
                    setHoveredProjectId(project.id);
                    playSwoosh();
                  }}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => {
                    playClick();
                    onSelectProject(project);
                  }}
                  className="group cursor-pointer flex flex-col bg-black border border-white/10 hover:border-white/60 transition-colors duration-300 relative overflow-hidden"
                >
                  {/* Top Slate Bar */}
                  <div className="p-3 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-white/[0.02]">
                    <span className="truncate pr-2 font-semibold text-zinc-300">
                      {project.client}
                    </span>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="px-1.5 py-0.5 border border-white/20 text-[10px]">
                        {project.aspectRatio}
                      </span>
                      <span>{project.runtime}</span>
                    </div>
                  </div>

                  {/* Visual Preview Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                    
                    {/* Fallback Image */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className={`w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isHovered && project.videoUrl ? 'opacity-0' : 'opacity-90'
                      }`}
                      loading="lazy"
                    />

                    {/* Live Video Preview on Hover */}
                    {project.videoUrl && (
                      <video
                        src={project.videoUrl}
                        muted
                        loop
                        playsInline
                        autoPlay={isHovered}
                        className={`absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-300 pointer-events-none ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}

                    {/* Scanlines / Film Grain effect */}
                    <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

                    {/* Center Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-white text-black flex items-center justify-center transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Award / Accolade Ribbon if any */}
                    {project.awards && (
                      <div className="absolute bottom-2 left-2 bg-black/90 border border-white/20 px-2 py-0.5 text-[10px] font-mono text-zinc-300 tracking-wide backdrop-blur-sm">
                        {project.awards}
                      </div>
                    )}
                  </div>

                  {/* Project Details Footer */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                          DIR. {project.director}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors uppercase font-sans">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {project.synopsis}
                      </p>
                    </div>

                    {/* Tool Badges */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <div className="truncate pr-2">
                        {project.tools.join(" // ")}
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform text-white">
                        →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footnote / Reel Prompt */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <span>// ALL CUTS CONFORMED FROM ORIGINAL RAW ASSETS</span>
          <span className="text-zinc-400">SELECT ANY PROJECT TO REVIEW EDITORIAL NOTES & TIMECODE CUTS</span>
        </div>
      </div>
    </section>
  );
};
