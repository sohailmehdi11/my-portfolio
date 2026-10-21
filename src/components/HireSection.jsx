import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy, ArrowUpRight, Clock, ShieldCheck, Terminal } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const HireSection = ({ profile, bookingTiers, preselectedProject }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: preselectedProject ? preselectedProject.category : 'commercial',
    timeline: 'standard',
    details: preselectedProject ? `Regarding editorial style similar to "${preselectedProject.title}".` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { playClick } = useAudio();

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitted(true);
  };

  return (
    <section id="hire" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span>BOOKINGS // PICTURE EDITORIAL INQUIRY</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
              INITIATE PROJECT
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-normal">
              Accepting director bookings for commercial campaigns, narrative festival cuts, and post-production consulting.
            </p>
          </div>

          {/* Quick Copy Contact Slate */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 border border-white/20 hover:border-white text-zinc-300 hover:text-white font-mono text-xs tracking-wider flex items-center gap-2 transition-colors bg-white/[0.02]"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? "EMAIL COPIED" : profile.email}</span>
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="px-4 py-3 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <span>DIRECT MAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Booking Tiers Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookingTiers.map((tier) => (
            <div
              key={tier.title}
              className="p-6 border border-white/15 bg-[#090909] space-y-4 hover:border-white/50 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                  {tier.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 border border-white/20 px-2 py-0.5">
                  {tier.timeline}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <span className="text-zinc-500 uppercase font-mono block text-[10px] mb-1">SCOPE:</span>
                {tier.scope}
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500 uppercase block text-[10px] mb-1">DELIVERABLES:</span>
                {tier.deliverables}
              </div>
            </div>
          ))}
        </div>

        {/* Main Transmission Form */}
        <div className="border border-white/20 bg-[#070707] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="flex items-center space-x-2 font-mono text-xs text-zinc-500 border-b border-white/10 pb-4 mb-8">
            <Terminal className="w-4 h-4 text-zinc-400" />
            <span>TRANSMISSION TERMINAL // SECURE PRODUCTION INQUIRY</span>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="w-12 h-12 border border-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold uppercase font-sans text-white">
                    INQUIRY DISPATCHED
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                    Brief received for {formData.company || formData.name || "production"}. You will receive a response within 12 business hours along with rate card and booking hold confirmations.
                  </p>
                </div>
                <div className="pt-4 font-mono text-xs text-zinc-500">
                  REF: EDIT-HOLD-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-mono text-xs text-white border border-white/30 px-4 py-2 hover:border-white uppercase"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-zinc-400 uppercase tracking-widest block">
                      PRODUCER / DIRECTOR NAME *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-black border border-white/20 p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Company / Studio */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-zinc-400 uppercase tracking-widest block">
                      PRODUCTION COMPANY / AGENCY
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Rogue Films / Independent"
                      className="w-full bg-black border border-white/20 p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-zinc-400 uppercase tracking-widest block">
                      CONTACT EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. producer@studio.com"
                      className="w-full bg-black border border-white/20 p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-zinc-400 uppercase tracking-widest block">
                      PROJECT CATEGORY *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-black border border-white/20 p-3.5 text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="commercial">Commercial / TVC Campaign</option>
                      <option value="narrative">Narrative Feature / Short Film</option>
                      <option value="music-video">Music Video</option>
                      <option value="documentary">Documentary Feature / Series</option>
                      <option value="rescue">Pacing Rescue / Emergency Re-Cut</option>
                    </select>
                  </div>

                </div>

                {/* Brief & Notes */}
                <div className="space-y-2 font-mono text-xs">
                  <label className="text-zinc-400 uppercase tracking-widest block">
                    PROJECT SCOPE & TARGET DELIVERY DATE
                  </label>
                  <textarea
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Provide raw camera format (e.g. ARRI RAW / RED), estimated runtime, offline cut deadline, and reference cuts."
                    className="w-full bg-black border border-white/20 p-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors font-sans text-sm"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-zinc-500">
                    * CONFIDENTIALITY PRESERVED // NDA SUPPORTED UPON REQUEST
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-black font-mono text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT EDITORIAL INQUIRY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
