import React, { useState } from 'react';
import { AudioProvider } from './components/AudioEngine';
import { FilmGrain } from './components/FilmGrain';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { EditorialTimeline } from './components/EditorialTimeline';
import { Feedbacks } from './components/Feedbacks';
import { Toolkit } from './components/Toolkit';
import { HireSection } from './components/HireSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ShowreelModal } from './components/ShowreelModal';
import { HireModal } from './components/HireModal';
import { PORTFOLIO_CONFIG } from './data/portfolioData';

export function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hireContextProject, setHireContextProject] = useState(null);

  const handleOpenHire = (project = null) => {
    setHireContextProject(project);
    setIsHireModalOpen(true);
  };

  const handleHireForSimilar = (project) => {
    setHireContextProject(project);
    setIsHireModalOpen(true);
  };

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-[#040404] text-white selection:bg-white selection:text-black">
        {/* Film grain and atmospheric noise */}
        <FilmGrain />

        {/* Custom Viewfinder Cursor */}
        <CustomCursor />

        {/* Top Header */}
        <Header 
          profile={PORTFOLIO_CONFIG.profile}
          onOpenHire={() => handleOpenHire(null)}
          onOpenReel={() => setIsReelOpen(true)}
        />

        {/* Main Sections */}
        <main>
          {/* Hero Section */}
          <Hero 
            profile={PORTFOLIO_CONFIG.profile}
            onOpenReel={() => setIsReelOpen(true)}
            onOpenHire={() => handleOpenHire(null)}
          />

          {/* Picture Archive / Works */}
          <Works 
            projects={PORTFOLIO_CONFIG.projects}
            categories={PORTFOLIO_CONFIG.categories}
            onSelectProject={setSelectedProject}
          />

          {/* Interactive NLE Sequence Timeline */}
          <EditorialTimeline />

          {/* Director & Producer Testimonials */}
          <Feedbacks 
            feedbacks={PORTFOLIO_CONFIG.feedbacks}
          />

          {/* Post-Production Pipeline & Specs */}
          <Toolkit 
            specs={PORTFOLIO_CONFIG.technicalSpecs}
          />

          {/* Booking & Inquiry Terminal */}
          <HireSection 
            profile={PORTFOLIO_CONFIG.profile}
            bookingTiers={PORTFOLIO_CONFIG.bookingTiers}
            preselectedProject={hireContextProject}
          />
        </main>

        {/* Footer */}
        <Footer 
          profile={PORTFOLIO_CONFIG.profile}
        />

        {/* Modals */}
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onHireForSimilar={handleHireForSimilar}
        />

        <ShowreelModal 
          isOpen={isReelOpen}
          onClose={() => setIsReelOpen(false)}
          onOpenHire={() => handleOpenHire(null)}
          profile={PORTFOLIO_CONFIG.profile}
        />

        <HireModal 
          isOpen={isHireModalOpen}
          onClose={() => {
            setIsHireModalOpen(false);
            setHireContextProject(null);
          }}
          profile={PORTFOLIO_CONFIG.profile}
          preselectedProject={hireContextProject}
        />
      </div>
    </AudioProvider>
  );
}

export default App;
