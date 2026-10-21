import React from 'react';
import { Cpu, Film, HardDrive, Check, Radio } from 'lucide-react';

export const Toolkit = ({ specs }) => {
  return (
    <section id="specs" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#060606]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>INFRASTRUCTURE // EDITORIAL SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-sans">
            POST-PRODUCTION PIPELINE
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl font-normal">
            Calibrated for seamless handoffs between offline proxy editing, conform, ACES color workflows, and 5.1/Dolby Atmos sound editorial.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((specBlock) => (
            <div 
              key={specBlock.category}
              className="border border-white/10 bg-black p-6 space-y-4 hover:border-white/40 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-white tracking-widest">
                  {specBlock.category}
                </span>
                <span className="w-1.5 h-1.5 bg-white" />
              </div>

              <ul className="space-y-3 font-mono text-xs text-zinc-400">
                {specBlock.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-zinc-600 select-none">→</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Deliverables Standard Banner */}
        <div className="p-6 border border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-white font-semibold uppercase tracking-wider">
              STANDARD MASTERING & DELIVERABLES SPEC
            </span>
            <p className="text-zinc-400">
              ProRes 4444 XQ / ProRes 422 HQ Masters • Clean + Texted • Anamorphic Theatrical + Social Aspect Split (16:9, 1:1, 9:16) • Frame.io Review Links
            </p>
          </div>
          <div className="px-3 py-1.5 border border-white/30 text-white shrink-0 tracking-widest text-[11px] uppercase">
            CALIBRATED REC.709 / DCI-P3
          </div>
        </div>

      </div>
    </section>
  );
};
