import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Play,
  Phone,
  Building2,
  Users2,
  ShieldCheck,
  Trophy,
  LayoutGrid,
  MapPin,
  Mail,
  Globe,
  MessageSquare,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Magnetic, Counter, RevealText, TiltCard } from './UI';

gsap.registerPlugin(ScrollTrigger);

/* Small reusable eyebrow/section-label */
const SectionLabel: React.FC<{ index: string; children: React.ReactNode; dark?: boolean }> = ({
  index,
  children,
  dark,
}) => (
  <div className={cn('flex items-center gap-3 mb-6', dark ? 'text-white/60' : 'text-ink/50')}>
    <span className="text-lime font-bold text-sm tabular-nums">{index}</span>
    <span className="w-8 h-px bg-current opacity-40" />
    <span className="text-[11px] font-bold uppercase tracking-[0.25em]">{children}</span>
  </div>
);

/* ============================= NAVBAR ============================= */
interface NavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavProps> = ({ currentPage, onNavigate }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 250) {
          gsap.to(nav, { yPercent: -100, duration: 0.5, ease: 'power3.out' });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
        }
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(menuRef.current, { display: 'flex' });
      gsap.fromTo(menuRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' });
      gsap.fromTo('.mobile-link', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => gsap.set(menuRef.current, { display: 'none' }),
      });
    }
  }, [menuOpen]);

  // Links directly match navigation routes
  const links = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'Projects', value: 'projects' },
    { label: 'Journal', value: 'journal' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <>
      <div ref={navRef} className="fixed top-0 left-0 w-full z-50 bg-cream/70 backdrop-blur-xl border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer" 
              data-cursor="hover"
            >
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center rotate-0 hover:rotate-45 transition-transform duration-500">
                <div className="w-4 h-4 bg-[#D9E954] rounded-full" />
              </div>
              <span className="text-2xl font-bold tracking-tight">spaciaz</span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
              {links.map((l) => (
                <button 
                  key={l.value} 
                  onClick={() => onNavigate(l.value)}
                  className={cn(
                    "relative group hover:text-black transition-colors py-2 text-xs uppercase tracking-widest font-bold",
                    currentPage === l.value ? "text-ink" : "text-ink/50"
                  )}
                  data-cursor="hover"
                >
                  {l.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-[1.5px] bg-[#D9E954] transition-all duration-300",
                    currentPage === l.value ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Phone size={14} className="text-gray-400" />
              <span className="font-semibold">+(084) 123-456 89</span>
            </div>
            <Magnetic>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-ink text-cream px-6 py-3 rounded-full text-sm font-bold hover:bg-lime hover:text-ink transition-colors duration-300" 
                data-cursor="hover"
              >
                Get In Touch
              </button>
            </Magnetic>
            <button
              className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center lg:hidden bg-cream"
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor="hover"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-ink text-cream flex-col items-center justify-center gap-6 hidden"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        {links.map((l, i) => (
          <button
            key={l.value}
            onClick={() => {
              setMenuOpen(false);
              onNavigate(l.value);
            }}
            className="mobile-link text-5xl md:text-6xl font-display italic font-light hover:text-lime transition-colors flex items-baseline gap-3 text-left"
          >
            <span className="text-xs font-sans not-italic text-lime/60 font-bold">0{i + 1}</span>
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
};

/* ============================= HERO ============================= */
const SplitLine: React.FC<{ text: string }> = ({ text }) => (
  <span className="block overflow-hidden pb-1">
    <span className="hero-line inline-block will-change-transform">{text}</span>
  </span>
);

interface HeroProps {
  onWatchVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchVideo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.1 });
      tl.fromTo(
        '.hero-line',
        { yPercent: 120, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }
      )
        .fromTo('.hero-fade', { y: 24, opacity: 0 }, { y: 0, opacity: 0, duration: 0 }, 0)
        .to('.hero-fade', { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
        .fromTo(imgWrapRef.current, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.out' }, 0.2);

      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row gap-12 items-center">
      {/* soft aurora glow */}
      <div className="aurora-blob pointer-events-none absolute -top-20 right-10 w-[420px] h-[420px] rounded-full bg-lime/25 blur-[120px]" />

      <div ref={imgWrapRef} className="w-full lg:w-1/2 h-[600px] rounded-[40px] overflow-hidden relative group" data-cursor data-cursor-label="Explore">
        <img
          ref={imgRef}
          src="/hero-building.jpg"
          alt="Modern Skyscraper"
          className="w-full h-[130%] -mt-[15%] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="hero-fade opacity-0 absolute top-6 left-6 bg-cream/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Now Selling · Phase III</span>
        </div>
        <div className="hero-fade opacity-0 absolute bottom-6 left-6 right-6 bg-cream/90 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full bg-gray-300 border-2 border-cream overflow-hidden">
                <img src={`https://i.pravatar.cc/60?img=${i + 10}`} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold leading-tight">2,400+ satisfied clients <br /><span className="text-gray-400 font-medium">worldwide</span></p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-8">
        <div className="overflow-hidden">
          <span className="hero-line inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ink/50">
            <span className="w-8 h-px bg-ink/30" /> Real Estate · Est. 1984
          </span>
        </div>
        <h1 className="text-6xl lg:text-[6.5rem] font-bold leading-[0.88] tracking-tight text-ink">
          <SplitLine text="A new" />
          <SplitLine text="standard of" />
          <span className="block overflow-hidden pb-1">
            <span className="hero-line inline-block will-change-transform font-display italic font-light text-lime-deep">
              excellence
            </span>
          </span>
        </h1>
        <p className="hero-fade opacity-0 text-lg text-ink/50 max-w-md font-medium leading-relaxed">
          The largest privately held real estate investors and managers in the world.
        </p>

        <div className="hero-fade opacity-0 flex flex-wrap gap-4 items-center">
          <Magnetic>
            <button className="flex items-center gap-3 bg-ink text-cream pl-7 pr-2 py-2 rounded-full font-bold hover:bg-charcoal transition-all group" data-cursor="hover">
              View All Services
              <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center text-ink group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </Magnetic>
        </div>

        <div className="hero-fade opacity-0 pt-12 flex items-center gap-10 flex-wrap">
          <div className="flex items-center gap-4 pr-10 border-r border-ink/10">
            <span className="text-7xl font-display font-light text-ink leading-none">
              <Counter value="40" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-ink/40">years of</span>
              <span className="text-xs font-bold uppercase tracking-widest text-ink">experiences</span>
            </div>
          </div>

          <button 
            onClick={() => onWatchVideo?.()} 
            className="flex items-center gap-4 group" 
            data-cursor 
            data-cursor-label="Play"
          >
            <div className="w-14 h-14 bg-ink rounded-full flex items-center justify-center text-cream transition-transform group-hover:scale-110">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">Watch Film</span>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ============================= MARQUEE (velocity reactive) ============================= */
export const Marquee: React.FC = () => {
  const items = ['EGALITARIAN COMMUNITY', 'COMPREHENSIVE AMENITIES', 'PROFESSIONAL SERVICES', 'SUSTAINABLE DESIGN', 'TRUSTED BY THOUSANDS'];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let currentSkew = 0;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-25, 25, self.getVelocity() / -60);
        if (Math.abs(v) > Math.abs(currentSkew)) {
          currentSkew = v;
          gsap.to(track, {
            skewX: v * 0.4,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              currentSkew = 0;
              gsap.to(track, { skewX: 0, duration: 0.6, ease: 'power3.out' });
            },
          });
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div className="bg-ink py-10 overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />
      <div ref={trackRef} className="inline-flex items-center gap-14 animate-marquee will-change-transform">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-14">
            <span className="text-3xl font-display font-light italic tracking-tight text-cream/90">{text}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-lime" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================= IMPACT SECTION ============================= */
export const ImpactSection: React.FC = () => {
  const cards = [
    {
      id: '01.',
      title: 'What we do',
      desc: 'We maintain this by ensuring transparency and professional conduct in every aspect.',
      link: 'Our Solutions',
      bgColor: 'bg-black',
      textColor: 'text-white',
      btnColor: 'bg-[#D9E954]',
      btnTextColor: 'text-black',
    },
    {
      id: '02.',
      title: 'Our impact',
      desc: 'We work with both investors and developers to create landmarks that make an impact.',
      link: 'See Projects',
      bgColor: 'bg-[#D9E954]',
      textColor: 'text-black',
      btnColor: 'bg-white',
      btnTextColor: 'text-black',
      image: '/project-2.jpg',
    },
    {
      id: '03.',
      title: 'Core values',
      desc: 'To empower businesses with cutting-edge solutions that enhance their growth.',
      link: 'Discover More',
      bgColor: 'bg-[#2A2A2A]',
      textColor: 'text-white',
      btnColor: 'bg-[#D9E954]',
      btnTextColor: 'text-black',
      image: '/project-3.jpg',
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.impact-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <SectionLabel index="01">Who we are</SectionLabel>
          <h2 className="text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-ink">
            We developed <span className="font-display italic font-light text-lime-deep">landmark</span> <br /> real estate projects
          </h2>
        </div>
        <p className="text-ink/50 max-w-xs text-sm font-medium leading-relaxed">
          Four decades of shaping skylines, communities, and enduring value across the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <TiltCard key={i} intensity={7} className="impact-card">
            <div
              data-cursor="hover"
              className={cn(
                'relative h-[500px] rounded-[40px] p-10 flex flex-col justify-between overflow-hidden group',
                card.bgColor,
                card.textColor
              )}
            >
              {card.image && (
                <img src={card.image} className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none group-hover:scale-110 group-hover:opacity-35 transition-all duration-700" alt="" />
              )}
              <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                <span className="text-sm font-bold opacity-60 mb-8 block">{card.id}</span>
                <h3 className="text-4xl font-bold mb-4">{card.title}</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed max-w-[250px]">{card.desc}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                <a href="#" className="font-bold border-b-2 border-current pb-1 hover:opacity-70 transition-opacity">
                  {card.link}
                </a>
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300', card.btnColor, card.btnTextColor)}>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

/* ============================= STATS SECTION ============================= */
export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'completed projects', val: '48+' },
    { label: 'projects in development', val: '52+' },
    { label: 'total projects cost', val: '2.3b+' },
    { label: 'square feet of property', val: '18m+' },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[700px] bg-black text-white py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-40 scale-125">
        <img ref={bgRef} src="/luxury-night.jpg" className="w-full h-full object-cover" alt="Cityscape" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 h-full items-center">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D9E954]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
              </div>
              <span className="text-6xl md:text-8xl font-bold leading-none tracking-tighter">
                <Counter value={stat.val} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[#D9E954] font-bold text-2xl md:text-4xl tracking-tighter opacity-80">
        www.SpaciazRealty.com
      </div>
    </section>
  );
};

/* ============================= FEATURES ============================= */
export const Features: React.FC = () => {
  const features = [
    { icon: <Building2 />, title: 'Corporate Responsibility', desc: 'Our commitment to ethical business and community growth.' },
    { icon: <Users2 />, title: 'Experts with a keen eye', desc: 'Decades of experience in selecting prime real estate.' },
    { icon: <ShieldCheck />, title: 'Security & Compliance', desc: 'Rigorous standards for safety and regulatory adherence.' },
    { icon: <Trophy />, title: 'Diversity, Equity & Inclusion', desc: 'Building environments where everyone belongs and thrives.' },
    { icon: <LayoutGrid />, title: 'Construction & Future Warranty', desc: 'Quality construction backed by industry-leading support.' },
    { icon: <MapPin />, title: 'Easy Customization Options', desc: 'Flexible spaces designed to fit your unique business needs.' },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto bg-cream">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-32 self-start">
          <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] group" data-cursor data-cursor-label="View">
            <img src="/detail-1.jpg" alt="Architectural detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="space-y-4">
            <SectionLabel index="04">Our approach</SectionLabel>
            <h3 className="text-4xl font-bold text-ink">What makes us <span className="font-display italic font-light text-lime-deep">different</span></h3>
          </div>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {features.map((f, i) => (
            <div key={i} className="feature-item group p-6 rounded-3xl hover:bg-ink/[0.03] transition-colors duration-300 space-y-4">
              <div className="w-14 h-14 bg-cream border border-ink/5 rounded-full flex items-center justify-center text-ink group-hover:bg-lime group-hover:text-ink group-hover:rotate-12 transition-all duration-300">
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 26 })}
              </div>
              <h4 className="text-xl font-bold text-ink">{f.title}</h4>
              <p className="text-ink/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================= HORIZONTAL GALLERY ============================= */
interface HorizontalGalleryProps {
  onProjectClick?: (project: any) => void;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ onProjectClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects = [
    { title: 'The Meridian Tower', tag: 'Residential', img: '/project-1.jpg', location: 'New York', size: '1,200 sqft', completion: '2024', desc: 'Luxury high-rise with premium amenities.' },
    { title: 'Azure Bay Villas', tag: 'Luxury Estate', img: '/project-2.jpg', location: 'Greece', size: '5,000 sqft', completion: '2025', desc: 'Waterfront property with sunset views.' },
    { title: 'Verdant Corporate Hub', tag: 'Commercial', img: '/project-3.jpg', location: 'Germany', size: '50,000 sqft', completion: '2023', desc: 'Eco-friendly office spaces.' },
    { title: 'Skyline Residences', tag: 'Residential', img: '/hero-building.jpg', location: 'Japan', size: '2,000 sqft', completion: '2024', desc: 'Urban living redefined.' },
    { title: 'Harbor Point District', tag: 'Mixed Use', img: '/final-cta.jpg', location: 'Australia', size: '10,000 sqft', completion: '2023', desc: 'Community focused development.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const setPin = () => {
        const distance = track.scrollWidth - window.innerWidth;
        return gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      };
      const tween = setPin();
      return () => {
        tween.kill();
      };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      <div className="absolute top-16 md:top-20 left-6 md:left-16 z-10 text-cream pointer-events-none">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-lime">05 — Featured Projects</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">Landmarks we've <span className="font-display italic font-light text-lime">built</span></h2>
      </div>
      <div className="absolute bottom-10 left-6 md:left-16 z-10 flex items-center gap-2 text-cream/40 text-xs font-bold uppercase tracking-widest pointer-events-none">
        <ArrowUpRight className="w-4 h-4 rotate-90" /> Scroll to explore
      </div>
      <div ref={trackRef} className="flex h-full items-center gap-8 pl-6 md:pl-16 pr-[10vw] w-max pt-24">
        {projects.map((p, i) => (
          <div 
            key={i} 
            data-cursor 
            data-cursor-label="View" 
            onClick={() => onProjectClick?.(p)}
            className="relative w-[80vw] md:w-[460px] h-[65vh] rounded-[32px] overflow-hidden shrink-0 group cursor-pointer"
          >
            <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9E954]">{p.tag}</span>
                <h3 className="text-3xl font-bold mt-2">{p.title}</h3>
              </div>
              <div className="w-12 h-12 bg-[#D9E954] rounded-full flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
            <span className="absolute top-6 right-6 text-white/50 font-bold text-sm">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================= LUXURY PROMO ============================= */
export const LuxuryPromo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.luxury-img',
        { rotate: 8, scale: 0.9 },
        {
          rotate: 3,
          scale: 1,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#2A2A2A] text-white py-24 rounded-[60px] mx-3 md:mx-6 mb-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 md:px-10 flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">
        <div className="max-w-xl">
          <SectionLabel index="06" dark>Signature Living</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            Discover <span className="font-display italic font-light text-lime">luxury living</span> at an affordable price
          </h2>
          <Magnetic>
            <button className="bg-lime text-ink px-8 py-4 rounded-full font-bold flex items-center gap-3 group" data-cursor="hover">
              Explore Properties <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </Magnetic>
        </div>
        <div className="w-full md:w-1/3">
          <img
            src="/interior-lux.jpg"
            className="luxury-img rounded-2xl shadow-2xl w-full h-[360px] object-cover"
            alt=""
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-[100px] md:text-[180px] font-black text-white/5 leading-none select-none whitespace-nowrap">
        SPACIAZ
      </div>
    </section>
  );
};

/* ============================= LEADERSHIP ============================= */
export const Leadership: React.FC = () => {
  const leaders = [
    { name: 'John Doe', role: 'Chief Executive Officer', img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Jane Smith', role: 'Chief Operations Officer', img: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Robert Wilson', role: 'Head of Development', img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-b border-ink/10">
      <div className="flex flex-col items-center text-center mb-16">
        <SectionLabel index="07">The team</SectionLabel>
        <RevealText
          as="h2"
          text="Global executive leadership"
          className="text-5xl md:text-6xl font-bold tracking-tight text-ink max-w-2xl leading-[1]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaders.map((leader, i) => (
          <div key={i} className="group cursor-pointer" data-cursor="hover">
            <div className="aspect-[4/5] overflow-hidden rounded-[30px] mb-6">
              <img
                src={leader.img}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                alt={leader.name}
              />
            </div>
            <h4 className="text-xl font-bold text-ink group-hover:text-lime-deep transition-colors">{leader.name}</h4>
            <p className="text-sm text-ink/40 font-bold uppercase tracking-widest">{leader.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================= RECOGNITIONS ============================= */
export const Recognitions: React.FC = () => {
  const awards = [
    'Emerging Designer of the Year',
    'Best Residential Design',
    'Sustainable Design Award',
    'Real Estate Consultant',
    'Residential Advisor of the Year',
    'Real Estate Superintendent',
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center">
        <SectionLabel index="08">Awards</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-ink">
          Recognitions <span className="font-display italic font-light text-lime-deep">we got</span>
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {awards.map((award, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 group">
              <Trophy className="w-6 h-6 text-[#D9E954] group-hover:scale-125 transition-transform" />
              <span className="text-sm font-bold max-w-[150px]">{award}</span>
              <div className="w-full h-px bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================= TESTIMONIALS ============================= */
export const Testimonials: React.FC = () => {
  const testimonials = [
    { text: 'A wonderful experience! They know what they were doing and were incredibly knowledgeable throughout the process.', author: 'John Lennon', role: 'Real Estate Consultant' },
    { text: 'Your team was great to work with on our basement renovation! I will definitely be working with them for future projects.', author: 'Mark Miller', role: 'Residential Advisor of the Year' },
    { text: 'I asked to have the area rebuilt and they were very prompt. Mud and texture came out great! Would highly recommend!', author: 'Sarah Howard', role: 'Real Estate Superintendent' },
    { text: 'They knew what they were doing and were incredibly knowledgeable throughout the process. A wonderful experience!', author: 'David Bowie', role: 'Creative Director' },
  ];

  return (
    <section className="py-24 bg-cream rounded-t-[60px]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center mb-16">
          <SectionLabel index="09">Testimonials</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-bold text-ink leading-[1]">
            Happy users <span className="font-display italic font-light text-lime-deep">feedback</span>
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] text-left border border-ink/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <span className="absolute top-4 right-8 text-8xl font-display text-lime/40 leading-none select-none">”</span>
                <p className="text-lg font-medium mb-10 leading-relaxed text-ink relative z-10">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lime rounded-full flex items-center justify-center font-bold text-ink">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{t.author}</p>
                    <p className="text-xs text-ink/40 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 w-full h-full min-h-[500px] rounded-[40px] overflow-hidden relative">
            <img src="/final-cta.jpg" className="w-full h-full object-cover absolute inset-0" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================= BLOG ============================= */
export const Blog: React.FC = () => {
  const posts = [
    { date: 'Oct 24, 2024', title: 'Maximizing Space: Design brings Nature Indoors', img: '/project-3.jpg' },
    { date: 'Oct 20, 2024', title: 'Reclaiming Old Spaces: Revamping Old Spaces', img: '/project-1.jpg' },
    { date: 'Oct 15, 2024', title: 'How to Get Started in Buying Your First Home', img: '/project-2.jpg' },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <SectionLabel index="10">Journal</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-bold text-ink leading-[1]">
            Discover <span className="font-display italic font-light text-lime-deep">inspiration</span> <br /> and trends
          </h2>
        </div>
        <Magnetic>
          <button className="hidden md:flex items-center gap-2 border border-ink/15 rounded-full px-6 py-3 font-bold text-sm hover:bg-ink hover:text-cream transition-colors" data-cursor="hover">
            All Articles <ArrowUpRight className="w-4 h-4" />
          </button>
        </Magnetic>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {posts.map((blog, i) => (
          <div key={i} className="group space-y-6" data-cursor="hover">
            <div className="aspect-square rounded-[30px] overflow-hidden">
              <img src={blog.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{blog.date}</span>
              <h4 className="text-2xl font-bold group-hover:text-[#a8b830] transition-colors">{blog.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================= FINAL CTA ============================= */
interface FinalCTAProps {
  onNavigate: (page: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[600px] overflow-hidden">
      <img ref={imgRef} src="/final-cta.jpg" className="w-full h-[130%] -mt-[15%] object-cover" alt="" />
      <div className="absolute inset-0 bg-ink/50 flex flex-col items-center justify-center text-center p-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-lime mb-6">Begin your journey</span>
        <h2 className="text-5xl md:text-8xl font-bold text-cream mb-8 tracking-tight leading-[0.9]">
          Your dream <br /> <span className="font-display italic font-light">home awaits</span>
        </h2>
        <Magnetic>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-lime text-ink px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform" 
            data-cursor="hover"
          >
            Schedule a Consultation
          </button>
        </Magnetic>
      </div>
    </section>
  );
};

/* ============================= FOOTER ============================= */
interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-ink text-cream pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 pb-16 border-b border-white/10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            Let's build something <br /><span className="font-display italic font-light text-lime">extraordinary</span>
          </h2>
          <Magnetic>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-lime text-ink px-8 py-5 rounded-full font-bold flex items-center gap-3 shrink-0 group" 
              data-cursor="hover"
            >
              Start a Project <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </Magnetic>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-[#D9E954] rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full" />
              </div>
              <span className="text-2xl font-bold tracking-tight">spaciaz</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading the way in modern real estate investment and urban development. Excellence in every square foot.
            </p>
            <div className="flex gap-4">
              <a href="#" data-cursor="hover" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9E954] hover:text-black transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" data-cursor="hover" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9E954] hover:text-black transition-colors">
                <MessageSquare size={18} />
              </a>
              <a href="#" data-cursor="hover" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9E954] hover:text-black transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-8">Quick Links</h5>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">Projects</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Our Team</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-8">Services</h5>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Real Estate Investment</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Property Management</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Interior Design</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Consulting</button></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="font-bold text-lg mb-8">Contact Info</h5>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <Phone size={18} className="text-[#D9E954]" />
              <span>+(084) 123-456 89</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <Mail size={18} className="text-[#D9E954]" />
              <span>hello@spaciaz.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <MapPin size={18} className="text-[#D9E954]" />
              <span>123 Architecture Plaza, NY</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-medium">
          <p>© 2026 SPACIAZ. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cream">PRIVACY POLICY</a>
            <a href="#" className="hover:text-cream">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
      <div className="mt-16 -mb-6 text-center leading-none select-none pointer-events-none">
        <span className="font-display italic font-light text-[22vw] lg:text-[18vw] text-white/[0.04]">spaciaz</span>
      </div>
    </footer>
  );
};
