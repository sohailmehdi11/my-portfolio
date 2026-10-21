# Film & Commercial Picture Editor Portfolio

A high-contrast monochrome, animated cinematic portfolio designed specifically for film, commercial, and narrative editors.

Built with React 18, Tailwind CSS, Framer Motion, Lucide icons, and Web Audio API synthesizer.

---

## Cinematic Design System
- **Pure Black & White Aesthetic**: No traditional chromatic colors. High-contrast blacks (`#000000`, `#040404`, `#090909`), deep zinc tones, and crisp stark whites.
- **Film Industry Vernacular**: Zero AI fluff sentences. Direct post-production terminology (Offline / Online, Picture Lock, ACEScc color conform, J-cuts, timecode counters, SMPTE standards).
- **Zero Emojis**: Clean minimal stroke iconography with viewfinder reticles and NLE visual cues.
- **Fluid Motion & Sound**:
  - Live 24 FPS running timecode counter (`01:14:28:12`).
  - Viewfinder crosshair cursor with responsive hover targets.
  - Interactive NLE sequence timeline simulating video tracks (V1) and multi-channel audio stems (A1-A6 dialogue, sound effects, music score).
  - Web Audio ambient projector hum and mechanical cut clicks (toggleable).
  - Hover-scrub video previews and theater-mode director's cut modals with aspect ratio letterbox toggles (`2.39:1`, `16:9`, `4:3`).

---

## Project Structure

```
editor-portfolio/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── portfolioData.js     <-- ALL YOUR DATA CAN BE CUSTOMIZED HERE
    └── components/
        ├── AudioEngine.jsx       (Atmospheric projector drone & mechanical clicks)
        ├── CustomCursor.jsx      (Viewfinder ring cursor)
        ├── FilmGrain.jsx         (Subtle 35mm analog film grain overlay)
        ├── TimecodeCounter.jsx   (24 FPS SMPTE running timecode)
        ├── Header.jsx            (Logo, navigation, audio switch, Hire CTA)
        ├── Hero.jsx              (High-impact typography, reel trigger, stats)
        ├── Works.jsx             (Picture archive, category filters, hover video cards)
        ├── EditorialTimeline.jsx (Interactive NLE timeline sequence)
        ├── Feedbacks.jsx         (Director & producer testimonials)
        ├── Toolkit.jsx           (Avid, Premiere, DaVinci, ACEScc pipeline specs)
        ├── HireSection.jsx       (Booking tiers, confidential transmission terminal)
        ├── HireModal.jsx         (Direct drawer booking modal)
        ├── ProjectModal.jsx      (Director's cut theater viewer)
        ├── ShowreelModal.jsx     (2026 official reel modal)
        └── Footer.jsx            (Delivery slates, credits, back to top)
```

---

## Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory ready for deployment on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

### 3. Preview Production Build
```bash
npm run preview
```

---

## Customization Guide

All personal info, projects, testimonials, and specs are centralized in:
`src/data/portfolioData.js`

1. **Profile & Contact**:
   - `name`: Change to your name or moniker.
   - `email`: Your direct booking email.
   - `location`: Your cities / base.
   - `status`: Booking availability.
   - `stats`: Your cut counts and metrics.

2. **Works / Cuts**:
   - Add or replace objects in `projects` array.
   - Assign categories (`commercial`, `narrative`, `music-video`, `documentary`).
   - Add your video URLs (`mp4`, `webm`, or Vimeo/YouTube embed links) and thumbnail stills.
   - Specify aspect ratio (`2.39:1`, `1.85:1`, `16:9`, `4:3`), frame rate, and NLE software.

3. **Client Feedbacks**:
   - Update `feedbacks` array with quotes from your directors, producers, and post supervisors.

4. **Booking Tiers & Rates**:
   - Adjust `bookingTiers` with your turnaround windows and project scopes.
