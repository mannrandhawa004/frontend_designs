import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Cursor, Preloader } from './components/UI';
import {
  Navbar,
  Hero,
  Marquee,
  ImpactSection,
  StatsSection,
  Features,
  HorizontalGallery,
  LuxuryPromo,
  Leadership,
  Recognitions,
  Testimonials,
  Blog,
  FinalCTA,
  Footer,
} from './components/Sections';
import {
  ProjectsPage,
  ServicesPage,
  JournalPage,
  ContactPage,
} from './components/Pages';
import { CinematicVideoSection } from './components/CinematicVideoSection';
import { VideoModal, ProjectModal } from './components/Modals';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [displayTab, setDisplayTab] = useState('home');
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  const handleWatchVideo = () => setVideoOpen(true);
  const handleProjectClick = (p: any) => setSelectedProject(p);

  // Run initial page scroll trigger hook
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const targets = document.querySelectorAll('.reveal-section');
    const anims = Array.from(targets).map((section) =>
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    );

    return () => {
      clearTimeout(t);
      anims.forEach((a) => a.scrollTrigger?.kill());
    };
  }, [loading, displayTab]);

  // Page Transition Curtain Wipe
  const navigateTo = (page: string) => {
    if (page === currentTab) return;
    setCurrentTab(page);

    const wipe = transitionRef.current;
    if (!wipe) {
      setDisplayTab(page);
      window.scrollTo(0, 0);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Change render state during transition peak
        setDisplayTab(page);
        window.scrollTo(0, 0);
        
        // Wipe-In reveal
        gsap.fromTo(wipe, 
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }, 
          { 
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', 
            duration: 0.85, 
            ease: 'power4.inOut',
            onComplete: () => {
              // Recalculate ScrollTrigger offsets once elements lay out
              setTimeout(() => ScrollTrigger.refresh(), 200);
            }
          }
        );
      }
    });

    // Wipe-Out mask overlay rise
    tl.fromTo(wipe, 
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }, 
      { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8, ease: 'power4.inOut' }
    );
  };

  return (
    <div className="min-h-screen bg-cream font-sans antialiased text-ink overflow-x-hidden selection:bg-lime selection:text-ink">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Cursor />

      {/* GSAP Page Transition Masking Panel */}
      <div 
        ref={transitionRef}
        className="fixed inset-0 bg-ink z-[100] pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-cream text-4xl font-display italic font-light">spaciaz<span className="text-lime">.</span></span>
        </div>
      </div>

      {/* Subtle film-grain overlay for premium texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[200] opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Header and Routing */}
      <Navbar currentPage={currentTab} onNavigate={navigateTo} />

      {/* Page Routing Views */}
      <div className="transition-all duration-300">
        {displayTab === 'home' && (
          <>
            <Hero onWatchVideo={handleWatchVideo} />
            <Marquee />
            <ImpactSection />
            <CinematicVideoSection />
            <StatsSection />
            <div className="reveal-section">
              <Features />
            </div>
            <HorizontalGallery onProjectClick={handleProjectClick} />
            <LuxuryPromo />
            <div className="reveal-section">
              <Leadership />
            </div>
            <div className="reveal-section">
              <Recognitions />
            </div>
            <Testimonials />
            <Blog />
          </>
        )}

        {displayTab === 'projects' && <ProjectsPage />}
        {displayTab === 'services' && <ServicesPage />}
        {displayTab === 'journal' && <JournalPage />}
        {displayTab === 'contact' && <ContactPage />}
      </div>

      <FinalCTA onNavigate={navigateTo} />
      <Footer onNavigate={navigateTo} />

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor="hover"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#D9E954] rounded-full flex items-center justify-center shadow-2xl hover:bg-black hover:text-white transition-all duration-300 z-40 group border border-ink/5"
      >
        <ArrowUpRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform" />
      </button>

      <style>{`
        html { cursor: default; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/font/geist-sans/latest/Geist-Variable.woff2') format('woff2');
        }
        body {
          font-family: 'Geist', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default App;
