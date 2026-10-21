import React from 'react';
import { ArrowUp, Film, Scissors, Shield } from 'lucide-react';
import { useAudio } from './AudioEngine';
import { TimecodeCounter } from './TimecodeCounter';

export const Footer = ({ profile }) => {
  const { playClick } = useAudio();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-12 font-mono text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white" />
              <span className="font-bold tracking-widest text-white uppercase text-sm">
                {profile.name}
              </span>
            </div>
            <p className="text-zinc-500 text-xs">
              {profile.role} • {profile.subRole}
            </p>
            <div className="text-[11px] text-zinc-600">
              BASED IN {profile.location}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-zinc-500 uppercase tracking-widest">
              // EDITORIAL CAPACITIES
            </div>
            <ul className="space-y-1 text-zinc-400">
              <li>Commercials & Brand Campaigns</li>
              <li>Narrative Feature Films</li>
              <li>Music Videos & Fashion Editorial</li>
              <li>Documentary Assemblies</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-zinc-500 uppercase tracking-widest">
              // REELS & DIRECTORY
            </div>
            <ul className="space-y-1 text-zinc-400">
              <li>Vimeo On Demand / Roster</li>
              <li>Avid Media Composer Verified</li>
              <li>DaVinci Resolve Color Certified</li>
              <li>Frame.io Enterprise Partner</li>
            </ul>
          </div>

          <div className="space-y-4 md:text-right flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-zinc-500 uppercase tracking-widest">TIMECODE REF</div>
              <TimecodeCounter className="text-sm text-zinc-300 block" />
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 border border-white/20 px-3 py-2 text-zinc-400 hover:text-white hover:border-white transition-colors"
              >
                <span>TOP OF REEL</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Slate */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-4">
          <div>
            © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED. CONFORMED UNDER DCI SPECIFICATIONS.
          </div>
          <div className="flex items-center space-x-4">
            <span>NO AI VOICEOVER</span>
            <span>•</span>
            <span>MONOCHROME MASTER</span>
            <span>•</span>
            <span>SMPTE TIMECODE STANDARD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
