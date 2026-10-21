export const PORTFOLIO_CONFIG = {
  profile: {
    name: "SOHAIL HUSSAIN",
    role: "FILM & COMMERCIAL EDITOR",
    subRole: "OFFLINE / ONLINE PICTURE EDITORIAL",
    location: "LONDON / LOS ANGELES / REMOTE",
    status: "BOOKINGS OPEN — Q4 / 2026",
    reelYear: "2026",
    reelDuration: "01:48",
    email: "contact@sohailhussain.edit",
    representation: "INDEPENDENT / ROSTER AVAILABLE UPON REQUEST",
    stats: [
      { label: "COMMERCIALS CUT", value: "85+" },
      { label: "FEATURE / SHORT CUTS", value: "14" },
      { label: "AWARDS / FESTIVALS", value: "9" },
      { label: "AVERAGE CONFORM ERRORS", value: "0.0%" },
    ]
  },

  categories: [
    { id: "all", label: "ALL CUTS" },
    { id: "commercial", label: "COMMERCIAL" },
    { id: "narrative", label: "NARRATIVE / FILM" },
    { id: "music-video", label: "MUSIC VIDEO" },
    { id: "documentary", label: "DOCUMENTARY" }
  ],

  projects: [
    {
      id: "monolith-bmw",
      title: "THE DRIFT OF SILENCE",
      category: "commercial",
      client: "BMW MOTORSPORT",
      director: "Jonas Lindqvist",
      year: "2026",
      runtime: "01:30",
      aspectRatio: "2.39:1",
      fps: "24.000",
      codec: "ARRIRAW / PRORES 4444 XQ",
      tools: ["DaVinci Resolve Studio", "Avid Media Composer"],
      thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-city-at-night-4228-large.mp4",
      synopsis: "High-octane commercial edit juxtaposing silent electric acceleration with mechanical night city cuts. Cut with sharp rhythm to an escalating tempo of industrial foley.",
      cutNotes: "Heavy emphasis on match cuts on wheel rotation and headlight sweeps. Sub-frame audio alignment on downshifts.",
      awards: "Cannes Lions Bronze (Film Craft: Editing)",
      featured: true
    },
    {
      id: "solitude-noir",
      title: "VESPER POINT",
      category: "narrative",
      client: "A24 SELECTS",
      director: "Claire Moreau",
      year: "2025",
      runtime: "22:15",
      aspectRatio: "1.85:1",
      fps: "23.976",
      codec: "RED MONSTRO 8K / DNxHR HQX",
      tools: ["Premiere Pro", "Pro Tools (AAF Bridge)"],
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-standing-in-a-dark-room-41617-large.mp4",
      synopsis: "Psychological chamber piece taking place across one relentless rainstorm. Pacing relies on prolonged tension holds and abrupt perspective cuts.",
      cutNotes: "Restrained assembly. Shot count reduced by 35% from script to heighten claustrophobia and let actor micro-expressions breathe.",
      awards: "BFI London Film Festival Selection",
      featured: true
    },
    {
      id: "kinetic-pulse",
      title: "GHOST FREQUENCIES",
      category: "music-video",
      client: "WARNER RECORDS / SYNTHWAVE ARTIST",
      director: "Marcus Vance",
      year: "2026",
      runtime: "03:42",
      aspectRatio: "2.35:1",
      fps: "24.000",
      codec: "35MM SCAN / 4K PRORES 422 HQ",
      tools: ["Avid Media Composer", "After Effects"],
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-playing-a-synthesizer-in-a-studio-41480-large.mp4",
      synopsis: "Non-linear analog montage cut on 16mm and 35mm optical print scans. Cross-cutting three concurrent timelines that converge on the final synth drop.",
      cutNotes: "Rapid staccato editing calibrated precisely to transient waveforms. 68 cuts within a 20-second crescendo.",
      awards: "UK MVA Nominee: Best Editing",
      featured: true
    },
    {
      id: "deep-north",
      title: "ZERO ISOLATION",
      category: "documentary",
      client: "NATIONAL GEOGRAPHIC / EXPEDITIONS",
      director: "Henrik Blom",
      year: "2025",
      runtime: "44:00",
      aspectRatio: "16:9",
      fps: "25.000",
      codec: "SONY VENICE / X-OCN ST",
      tools: ["DaVinci Resolve Studio"],
      thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-snow-covered-mountains-4393-large.mp4",
      synopsis: "Documentary tracking meteorological divers working underneath Arctic ice sheets. Built from 180 hours of uncataloged field footage.",
      cutNotes: "Extensive story reconstruction during offline stage. Restructured 4 narrative arcs into a continuous chronological dive cycle.",
      awards: "Sundance Documentary Competition Nominee",
      featured: false
    },
    {
      id: "atelier-couture",
      title: "THE SEAM",
      category: "commercial",
      client: "VOGUE / MAISON ARCHIVE",
      director: "Seraphina Lin",
      year: "2026",
      runtime: "01:00",
      aspectRatio: "4:3",
      fps: "24.000",
      codec: "16MM BOLEX / PRORES 4444",
      tools: ["Premiere Pro"],
      thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-34305-large.mp4",
      synopsis: "Haute couture editorial film celebrating manual textile craft. Cut with rhythmic scissors, thread pulls, and loom needle impacts.",
      cutNotes: "Exact metric cutting matching the mechanical BPM of vintage textile machinery.",
      awards: "Fashion Film Festival Milan (Best Editing)",
      featured: false
    },
    {
      id: "redbull-apex",
      title: "DESERT SUMMIT",
      category: "commercial",
      client: "RED BULL MEDIA HOUSE",
      director: "Mateo Ortiz",
      year: "2025",
      runtime: "02:10",
      aspectRatio: "2.39:1",
      fps: "59.940 CONFORM TO 24.000",
      codec: "RED V-RAPTOR / PRORES 422 HQ",
      tools: ["Avid Media Composer", "DaVinci Resolve"],
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-motorcyclist-riding-in-a-desert-valley-41481-large.mp4",
      synopsis: "Extreme downhill freeride edit across Utah sandstone canyons. Blending high-speed phantom footage with raw cockpit POV audio.",
      cutNotes: "Dynamic time-ramping handled natively on timeline. Seamless speed ramp transitions without artifacting.",
      awards: "Webby Winner: Sports & Adventure",
      featured: false
    }
  ],

  feedbacks: [
    {
      id: "fb-1",
      quote: "Locked picture two days ahead of schedule. Understood the dramatic weight of the dialogue instantly and cut with breathing room where it mattered. Delivered the project cleanly to color and sound turnover without a single conform hiccup.",
      clientName: "Claire Moreau",
      role: "Director",
      company: "A24 Selects / Noir Collective",
      project: "Vesper Point (Narrative)",
      year: "2025"
    },
    {
      id: "fb-2",
      quote: "Sharp editorial instincts on when to hold a shot and when to slash. In an era where editors over-cut, Sohail understands emotional rhythm, spatial continuity, and sound foley integration better than almost anyone I have worked with.",
      clientName: "Jonas Lindqvist",
      role: "Commercial Director",
      company: "Rogue Films / BMW Global",
      project: "The Drift of Silence",
      year: "2026"
    },
    {
      id: "fb-3",
      quote: "We handed over 180 hours of chaotic Arctic field footage with conflicting narrative lines. He constructed a gripping 44-minute story structure that saved the entire documentary in post. Exceptional patience and story discipline.",
      clientName: "Henrik Blom",
      role: "Series Producer",
      company: "Nordic Documentaries / NatGeo",
      project: "Zero Isolation",
      year: "2025"
    },
    {
      id: "fb-4",
      quote: "Flawless technical delivery across 24 deliverables: 2.39:1 theatrical, 16:9 broadcast, and bespoke 9:16 social cutdowns. Avid bins were immaculately organized, proxies properly synced, and roundtrips to DaVinci Resolve were seamless.",
      clientName: "Julian Ward",
      role: "Post Production Supervisor",
      company: "Unit9 Post Facilities",
      project: "Commercial Campaigns 2025-2026",
      year: "2026"
    }
  ],

  technicalSpecs: [
    {
      category: "OFFLINE NLE",
      items: ["Avid Media Composer 2024", "Adobe Premiere Pro", "DaVinci Resolve Studio 19"]
    },
    {
      category: "COLOR & CONFORM",
      items: ["ACEScc Pipeline", "DaVinci Resolve XML / EDL / AAF Roundtrip", "ProRes 4444 XQ / ARRIRAW Conforms"]
    },
    {
      category: "STORAGE & WORKFLOW",
      items: ["10GbE High-Throughput NVMe SAN", "Frame.io C2C Integration", "Aspera / Signiant High-Speed Data Handover"]
    },
    {
      category: "AUDIO FINISHING",
      items: ["Stem Splitting & Dialogue Isolation", "Pro Tools AAF Export with Handles", "Loudness Standards (EBU R128 / ITU-R BS.1770)"]
    }
  ],

  bookingTiers: [
    {
      title: "COMMERCIAL & SHORT FORM",
      scope: "30s / 60s / 90s TVC, Brand Films, Music Videos",
      timeline: "3 - 7 Days",
      deliverables: "Offline Cut + 4K Conform + Social Cutdowns (9:16, 1:1, 16:9)"
    },
    {
      title: "LONG FORM & NARRATIVE",
      scope: "Short Films, Documentary Features, Pilot Episodes",
      timeline: "2 - 6 Weeks",
      deliverables: "Assembly Cut + Director's Cuts + Sound Turnover + Conform Lock"
    },
    {
      title: "RUSH TURNAROUND / DOCTORING",
      scope: "Pacing Rescue, Re-cuts, Festival Submission Polish",
      timeline: "24 - 72 Hours",
      deliverables: "Emergency Picture Re-alignment + Audio Cleanup Pass"
    }
  ]
};
