import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Layers, Scissors, Disc, FastForward } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const EditorialTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(25);
  const [activeClip, setActiveClip] = useState(null);
  const { playClick, playSwoosh } = useAudio();

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadPos(prev => {
          if (prev >= 98) return 0;
          return prev + 0.35;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const timelineCuts = [
    { start: 0, width: 14, name: "V1_001_ESTABLISHING_ROOFTOP", type: "ESTABLISH", notes: "Low light anamorphic plate. Hold 4 seconds for tone." },
    { start: 14, width: 18, name: "V1_002_MATCH_CUT_INTERIOR", type: "ACTION", notes: "Match cut on camera pan speed. Seamless wipe." },
    { start: 32, width: 12, name: "V1_003_DIALOGUE_OVER_SHOULDER", type: "DIALOGUE", notes: "J-cut: dialogue starts 12 frames prior to angle change." },
    { start: 44, width: 22, name: "V1_004_KINETIC_MONTAGE_08", type: "STACCATO", notes: "8 rapid cuts synced to drum transients. High rhythm." },
    { start: 66, width: 16, name: "V1_005_EXTREME_CLOSEUP_EYE", type: "TENSION", notes: "Micro-expression hold. Color graded to ACEScc." },
    { start: 82, width: 18, name: "V1_006_FINAL_PULLOUT_RESOLVE", type: "RESOLUTION", notes: "Slow dissolve into brand typography slate." }
  ];

  const audioCues = [
    { start: 0, width: 35, name: "A1_AMB_NIGHT_RAIN_WIND", category: "AMBIENCE" },
    { start: 35, width: 35, name: "A1_ROOM_TONE_HURRICANE", category: "AMBIENCE" },
    { start: 70, width: 30, name: "A1_SUB_BASS_DROP_50HZ", category: "SUB" },
    { start: 12, width: 30, name: "A3_DX_PROTAGONIST_MIC_01", category: "DIALOGUE" },
    { start: 44, width: 25, name: "A5_PERCUSSION_STEM_120BPM", category: "SCORE" }
  ];

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setPlayheadPos(pct);
    playClick();
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <Scissors className="w-3.5 h-3.5 text-zinc-400" />
              <span>NLE WORKFLOW // TIMELINE ANATOMY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-sans">
              INSIDE THE SEQUENCE
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl font-normal">
              Picture editing is spatial mathematics and auditory momentum. Inspect live track architecture, clip handles, and sound stems.
            </p>
          </div>

          {/* Timeline Playback Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                playClick();
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center space-x-2 bg-white text-black px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'PAUSE SCRUB' : 'SCRUB SEQUENCE'}</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setPlayheadPos(0);
              }}
              className="p-2 border border-white/20 text-zinc-400 hover:text-white transition-colors"
              title="Reset playhead to frame 0"
            >
              <FastForward className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* NLE Timeline Console Window */}
        <div className="border border-white/20 bg-[#0a0a0a] p-4 sm:p-6 space-y-6 relative overflow-hidden">
          
          {/* Header Bar / Timecode Display */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 text-xs font-mono gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-zinc-500">SEQUENCE:</span>
              <span className="text-white font-semibold">REEL_01_ACT_02_CONFORM_LOCK</span>
              <span className="px-1.5 py-0.5 border border-white/20 text-[10px] text-zinc-400">
                24.00 FPS
              </span>
            </div>

            <div className="flex items-center space-x-6 text-zinc-400">
              <div>
                <span className="text-zinc-600 mr-2">PLAYHEAD:</span>
                <span className="text-white font-mono">{playheadPos.toFixed(1)}%</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-zinc-600 mr-2">AUDIO SAMPLE:</span>
                <span>48.000 kHz / 24-BIT</span>
              </div>
            </div>
          </div>

          {/* Timeline Ruler */}
          <div 
            onClick={handleTimelineClick}
            className="relative h-6 border-b border-white/10 cursor-pointer flex items-end select-none"
          >
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 flex flex-col justify-end items-start border-l border-white/15 h-3 text-[9px] font-mono text-zinc-600 pl-1"
              >
                {i % 4 === 0 && `00:0${i * 2}:00`}
              </div>
            ))}
          </div>

          {/* Timeline Tracks Area */}
          <div 
            onClick={handleTimelineClick}
            className="relative space-y-2 cursor-pointer select-none py-2"
          >
            {/* Playhead Vertical Line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none transition-all duration-75"
              style={{ left: `${playheadPos}%` }}
            >
              <div className="w-3 h-3 bg-white -translate-x-[5px] -translate-y-1 rotate-45 shadow-lg" />
            </div>

            {/* TRACK V1: Picture Cuts */}
            <div className="flex items-stretch gap-1 h-14 relative bg-black/60 border border-white/10 p-1">
              <div className="w-12 bg-zinc-900 border-r border-white/10 flex flex-col items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0 font-bold">
                <span>V1</span>
                <span className="text-[9px] text-zinc-600">PIC</span>
              </div>

              <div className="relative flex-1 h-full flex gap-1">
                {timelineCuts.map((cut) => (
                  <div
                    key={cut.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSwoosh();
                      setActiveClip(cut);
                    }}
                    style={{ width: `${cut.width}%` }}
                    className={`h-full border border-white/20 p-2 flex flex-col justify-between font-mono text-[10px] transition-colors ${
                      activeClip?.name === cut.name
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:border-white/50'
                    }`}
                  >
                    <span className="truncate font-semibold">{cut.name}</span>
                    <span className="text-[8px] opacity-70 tracking-widest">{cut.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TRACK A1-A2: Dialogue */}
            <div className="flex items-stretch gap-1 h-10 relative bg-black/60 border border-white/10 p-1">
              <div className="w-12 bg-zinc-900 border-r border-white/10 flex flex-col items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0">
                <span>A1-A2</span>
                <span className="text-[8px] text-zinc-600">DX</span>
              </div>
              <div className="relative flex-1 h-full flex gap-1">
                <div style={{ width: '40%' }} className="bg-zinc-900 border border-white/10 px-2 py-1 flex items-center font-mono text-[9px] text-zinc-400">
                  <span>DX_CLEAN_LAV_BOOM_STEM</span>
                </div>
                <div style={{ width: '25%' }} className="bg-zinc-900/70 border border-white/10 px-2 py-1 flex items-center font-mono text-[9px] text-zinc-500">
                  <span>DX_ADR_PASS</span>
                </div>
                <div style={{ width: '35%' }} className="bg-zinc-900 border border-white/10 px-2 py-1 flex items-center font-mono text-[9px] text-zinc-400">
                  <span>DX_WHISPER_REVERSE_TAKE</span>
                </div>
              </div>
            </div>

            {/* TRACK A3-A4: Foley / Sound Effects */}
            <div className="flex items-stretch gap-1 h-10 relative bg-black/60 border border-white/10 p-1">
              <div className="w-12 bg-zinc-900 border-r border-white/10 flex flex-col items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0">
                <span>A3-A4</span>
                <span className="text-[8px] text-zinc-600">FX</span>
              </div>
              <div className="relative flex-1 h-full flex gap-1">
                {audioCues.map((cue, i) => (
                  <div
                    key={i}
                    style={{ width: `${cue.width / 1.5}%` }}
                    className="bg-zinc-900 border border-white/10 px-2 py-1 flex items-center font-mono text-[9px] text-zinc-400 truncate"
                  >
                    <span>{cue.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TRACK A5-A6: Music / Score */}
            <div className="flex items-stretch gap-1 h-10 relative bg-black/60 border border-white/10 p-1">
              <div className="w-12 bg-zinc-900 border-r border-white/10 flex flex-col items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0">
                <span>A5-A6</span>
                <span className="text-[8px] text-zinc-600">MX</span>
              </div>
              <div className="relative flex-1 h-full flex gap-1">
                <div className="w-full bg-zinc-900/80 border border-white/15 px-3 flex items-center justify-between font-mono text-[9px] text-zinc-300">
                  <span>SCORE_MASTER_SYNTH_CRESCENDO_STEM</span>
                  <span className="text-zinc-500 text-[8px]">PRO TOOLS CONFORMED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Clip Inspector Note */}
          <div className="border border-white/10 p-4 bg-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                INSPECTOR LOG // {activeClip ? activeClip.name : "PLAYHEAD MONITOR"}
              </span>
              <p className="text-zinc-300">
                {activeClip 
                  ? activeClip.notes 
                  : "Click any video block or drag timeline playhead to preview cut methodology and sound layer separation."}
              </p>
            </div>
            {activeClip && (
              <button
                onClick={() => setActiveClip(null)}
                className="text-[10px] text-zinc-500 hover:text-white border border-white/20 px-2 py-1 uppercase"
              >
                CLEAR SELECTION
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
