import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, ArrowUpRight, Terminal } from 'lucide-react';
import { useAudio } from './AudioEngine';

export const HireModal = ({ isOpen, onClose, profile, preselectedProject }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: preselectedProject ? preselectedProject.category : 'commercial',
    timeline: 'standard',
    details: preselectedProject ? `Regarding an edit with tone similar to "${preselectedProject.title}".` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { playClick } = useAudio();

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-2xl bg-[#080808] border border-white/25 shadow-2xl relative my-auto overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between font-mono text-xs bg-black">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-white animate-pulse" />
              <span className="font-bold tracking-widest uppercase">
                HIRE PICTURE EDITOR // BOOKINGS Q4 2026
              </span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1 border border-white/20 hover:border-white text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Email Banner */}
            <div className="p-4 border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
              <span className="text-zinc-400">DIRECT DISPATCH CHANNEL:</span>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 border border-white/20 hover:border-white text-white flex items-center gap-2"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? "COPIED TO CLIPBOARD" : profile.email}</span>
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-12 h-12 border border-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold uppercase font-sans">
                  INQUIRY CONFIRMED
                </h3>
                <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your project brief has been logged. Review turnaround is within 12 business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="font-mono text-xs bg-white text-black font-semibold px-6 py-2.5 uppercase tracking-widest mt-4"
                >
                  CLOSE TERMINAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase tracking-wider block">
                      YOUR NAME / PRODUCER *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-black border border-white/20 p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase tracking-wider block">
                      PRODUCTION COMPANY
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Rogue Films / Studio"
                      className="w-full bg-black border border-white/20 p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase tracking-wider block">
                      EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="producer@agency.com"
                      className="w-full bg-black border border-white/20 p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase tracking-wider block">
                      PROJECT CATEGORY *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-white"
                    >
                      <option value="commercial">Commercial / TVC</option>
                      <option value="narrative">Narrative Feature / Short</option>
                      <option value="music-video">Music Video</option>
                      <option value="documentary">Documentary</option>
                      <option value="rescue">Pacing Rescue / Emergency Edit</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-wider block">
                    PROJECT SCOPE & TARGET CONFORM DEADLINE
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe shooting format, target runtime, editorial timeline, and any reference cuts."
                    className="w-full bg-black border border-white/20 p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white font-sans text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-white text-black font-mono text-xs font-bold py-3.5 uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>TRANSMIT BOOKING INQUIRY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
