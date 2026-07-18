import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Layers, 
  Sliders, 
  Award, 
  Compass, 
  CheckCircle2
} from 'lucide-react';
import { Magnetic, TiltCard } from './UI';
import { cn } from '../lib/utils';

/* -------------------------------------------------------------------------- */
/*                               PROJECTS PAGE                                */
/* -------------------------------------------------------------------------- */
export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'villas'>('all');
  const [activePlan, setActivePlan] = useState<'ground' | 'mid' | 'penthouse'>('ground');
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, title: 'The Meridian Tower', category: 'residential', img: '/project-1.jpg', location: 'New York, USA', scale: '45,000 sqft', yr: '2024' },
    { id: 2, title: 'Azure Bay Villas', category: 'villas', img: '/project-2.jpg', location: 'Santorini, Greece', scale: '12,000 sqft', yr: '2025' },
    { id: 3, title: 'Verdant Corporate Hub', category: 'commercial', img: '/project-3.jpg', location: 'Frankfurt, Germany', scale: '180,000 sqft', yr: '2023' },
    { id: 4, title: 'Skyline Residences', category: 'residential', img: '/hero-building.jpg', location: 'Tokyo, Japan', scale: '85,000 sqft', yr: '2024' },
    { id: 5, title: 'Minimalist Monolith', category: 'villas', img: '/detail-1.jpg', location: 'Geneva, Switzerland', scale: '9,500 sqft', yr: '2026' },
    { id: 6, title: 'The Oasis Pavilion', category: 'commercial', img: '/interior-lux.jpg', location: 'Dubai, UAE', scale: '240,000 sqft', yr: '2025' },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    // Stagger reveal project cards on filter changes
    gsap.fromTo(
      '.project-grid-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );
  }, [filter]);

  // Spec metrics for floor plan
  const planSpecs = {
    ground: { area: '3,200 SQFT', beds: '2', baths: '2.5', terrace: 'N/A', ceiling: '12 FT' },
    mid: { area: '4,500 SQFT', beds: '3', baths: '3.5', terrace: '400 SQFT', ceiling: '14 FT' },
    penthouse: { area: '8,200 SQFT', beds: '4', baths: '5.5', terrace: '1,800 SQFT', ceiling: '18 FT' }
  };

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-lime">
          <span className="text-sm font-bold tracking-[0.2em]">01 / INDEX</span>
          <span className="w-12 h-px bg-current opacity-40" />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-ink leading-[0.9]">
          Landmarks & <br /><span className="font-display italic font-light text-lime-deep">Masterpieces</span>
        </h1>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 border-b border-ink/5 pb-6">
        {(['all', 'residential', 'commercial', 'villas'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border",
              filter === cat 
                ? "bg-ink border-ink text-cream" 
                : "border-ink/10 text-ink/60 hover:border-ink hover:text-ink"
            )}
            data-cursor="hover"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => (
          <TiltCard key={p.id} intensity={5}>
            <div 
              className="project-grid-card group relative rounded-[32px] overflow-hidden aspect-[4/5] bg-ink cursor-pointer"
              data-cursor data-cursor-label="Specs"
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-6 right-6 bg-cream/90 backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-ink">
                {p.yr}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-cream flex flex-col justify-end gap-2">
                <span className="text-xs font-bold text-lime uppercase tracking-widest">{p.category} · {p.scale}</span>
                <h3 className="text-2xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                  {p.title} <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-cream/60">
                  <MapPin size={12} /> {p.location}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Interactive Blueprint Visualizer */}
      <div className="bg-ink text-cream rounded-[48px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-lime/5 blur-[100px] -top-20 -right-20 pointer-events-none" />
        
        <div className="space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-lime">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Blueprint Visualizer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
            Explore architectural <br /><span className="font-display italic font-light text-lime">configurations</span>
          </h2>
          <p className="text-cream/50 text-sm leading-relaxed max-w-md font-medium">
            Toggle through pre-built structural and interior plans. Designed down to the millimeter for optimal ventilation, spacing, and natural light access.
          </p>

          <div className="flex gap-2">
            {(['ground', 'mid', 'penthouse'] as const).map((plan) => (
              <button
                key={plan}
                onClick={() => setActivePlan(plan)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300",
                  activePlan === plan ? "bg-lime text-ink" : "bg-white/5 hover:bg-white/10 text-cream/70"
                )}
                data-cursor="hover"
              >
                {plan} Plan
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Total Space</span>
              <span className="text-lg font-bold">{planSpecs[activePlan].area}</span>
            </div>
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Bedrooms</span>
              <span className="text-lg font-bold">{planSpecs[activePlan].beds}</span>
            </div>
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Bathrooms</span>
              <span className="text-lg font-bold">{planSpecs[activePlan].baths}</span>
            </div>
            <div>
              <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Ceilings</span>
              <span className="text-lg font-bold">{planSpecs[activePlan].ceiling}</span>
            </div>
          </div>
        </div>

        {/* Blueprint Wireframe Canvas Placeholder / Style */}
        <div className="border border-white/10 rounded-3xl bg-black/40 p-8 flex items-center justify-center relative min-h-[360px] select-none group">
          {/* Floorplan mock graphics */}
          <div className="absolute inset-8 opacity-20 border border-dashed border-white/30 rounded-2xl flex items-center justify-center">
            <div className="w-[120%] h-px bg-white/20 absolute rotate-12" />
            <div className="w-[120%] h-px bg-white/20 absolute -rotate-12" />
          </div>
          
          <div className="relative w-full h-64 border border-lime/30 rounded-xl flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
            {/* Live active floor plan graphic changes */}
            {activePlan === 'ground' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-48 h-48 border-2 border-lime/60 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border border-dashed border-lime/40 rounded-full flex items-center justify-center">
                    <span className="text-xs text-lime font-mono tracking-widest">GROUND LEVEL</span>
                  </div>
                </div>
                <span className="text-[10px] text-lime/40 font-mono">NORTH-FACING PARKING & ENTRANCE</span>
              </div>
            )}
            {activePlan === 'mid' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-56 h-36 border-2 border-lime/60 rounded-lg flex items-center justify-center">
                  <div className="w-44 h-24 border border-dashed border-lime/40 rounded flex items-center justify-center">
                    <span className="text-xs text-lime font-mono tracking-widest">MID-LEVEL LOFTS</span>
                  </div>
                </div>
                <span className="text-[10px] text-lime/40 font-mono">CORE KITCHEN & BALCONY EXTENSION</span>
              </div>
            )}
            {activePlan === 'penthouse' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-44 h-44 border-2 border-lime/60 rotate-45 flex items-center justify-center">
                  <div className="w-28 h-24 border border-dashed border-lime/40 rotate-45 flex items-center justify-center">
                    <span className="text-xs text-lime font-mono tracking-widest -rotate-90">PENTHOUSE</span>
                  </div>
                </div>
                <span className="text-[10px] text-lime/40 font-mono">1,800 SQFT SKY-TERRACE</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                SERVICES PAGE                               */
/* -------------------------------------------------------------------------- */
export const ServicesPage: React.FC = () => {
  // Slider/Estimation variables
  const [scale, setScale] = useState(50); // Scale of consult request: 10k - 500k sqft
  const [finishes, setRefinements] = useState<'ultra' | 'gold' | 'custom'>('gold');

  const specs = [
    { title: 'Architectural Blueprinting', icon: <Compass className="w-6 h-6 text-lime-deep" />, desc: 'Bespoke conceptualization of modern developments.' },
    { title: 'Asset & Property Management', icon: <Layers className="w-6 h-6 text-lime-deep" />, desc: 'Strategic advisory and portfolio valuation.' },
    { title: 'Sourcing & Location Sourcing', icon: <MapPin className="w-6 h-6 text-lime-deep" />, desc: 'Acquisition of premium plots and zoning compliance.' },
    { title: 'Sustainable Infrastructure', icon: <Award className="w-6 h-6 text-lime-deep" />, desc: 'Net-zero emissions consulting and LEED designs.' }
  ];

  const estimatedMonths = Math.ceil(scale * 0.12 + (finishes === 'ultra' ? 4 : 2));
  const baseCost = scale * 1200 + (finishes === 'ultra' ? 150000 : finishes === 'custom' ? 250000 : 50000);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-lime">
          <span className="text-sm font-bold tracking-[0.2em]">02 / CAPABILITIES</span>
          <span className="w-12 h-px bg-current opacity-40" />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-ink leading-[0.9]">
          Premium Real Estate <br /><span className="font-display italic font-light text-lime-deep">Consulting</span>
        </h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {specs.map((spec, i) => (
          <div key={i} className="bg-cream border border-ink/5 p-10 rounded-[40px] space-y-6 hover:bg-ink hover:text-cream transition-colors duration-500 group">
            <div className="w-14 h-14 rounded-full bg-ink/5 border border-ink/5 group-hover:bg-lime flex items-center justify-center transition-colors">
              {React.cloneElement(spec.icon, { className: 'w-6 h-6 text-ink group-hover:text-ink' })}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">{spec.title}</h3>
              <p className="text-ink/60 group-hover:text-cream/60 text-sm leading-relaxed font-medium">{spec.desc}</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-ink/5 group-hover:border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-lime-deep">Inquire Capabilities</span>
              <div className="w-10 h-10 rounded-full border border-ink/10 group-hover:border-white/20 flex items-center justify-center group-hover:rotate-45 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Consultation Calculator */}
      <div className="bg-ink text-cream rounded-[48px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-lime/5 blur-[100px] -bottom-20 -left-20 pointer-events-none" />

        <div className="space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-lime">
            <Sliders className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Project Configurator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
            Tailor your bespoke <br /><span className="font-display italic font-light text-lime">consultation</span> scale
          </h2>
          <p className="text-cream/50 text-sm leading-relaxed max-w-md font-medium">
            Fine-tune specifications to evaluate estimate scopes, turnaround schedules, and primary engineering phases.
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-white/55">
                <span>Target Project Scale</span>
                <span className="text-lime">{scale * 10}k SQFT</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime"
              />
            </div>

            <div className="space-y-3">
              <span className="block text-xs font-bold tracking-widest uppercase text-white/55">Finishing & Refinements</span>
              <div className="flex gap-2">
                {(['gold', 'ultra', 'custom'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRefinements(opt)}
                    className={cn(
                      "px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300",
                      finishes === opt ? "bg-lime text-ink" : "bg-white/5 hover:bg-white/10 text-cream/70"
                    )}
                    data-cursor="hover"
                  >
                    {opt} spec
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live dynamic invoice estimation panel */}
        <div className="border border-white/10 rounded-3xl bg-black/40 p-8 md:p-12 flex flex-col justify-between relative min-h-[380px] z-10">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-lime">Primary Valuation</span>
            <div className="space-y-1">
              <span className="text-[10px] text-white/40 block font-bold uppercase tracking-widest">Bespoke Estimate</span>
              <span className="text-5xl md:text-6xl font-display font-light text-cream leading-none block">
                ${baseCost.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Turnaround Duration</span>
              <span className="font-bold">{estimatedMonths} Months</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">LEED Compliance Rating</span>
              <span className="font-bold text-lime">Gold (Standard)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Development Stage</span>
              <span className="font-bold">Phase I Evaluation</span>
            </div>
          </div>

          <Magnetic className="mt-8">
            <button className="w-full bg-cream text-ink font-bold py-4 rounded-full flex items-center justify-center gap-2 group" data-cursor="hover">
              Request Detailed Proposal <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                JOURNAL PAGE                                */
/* -------------------------------------------------------------------------- */
export const JournalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'trends'>('all');
  const [readingPost, setReadingPost] = useState<any | null>(null);

  const posts = [
    {
      id: 1,
      date: 'Oct 24, 2024',
      category: 'trends',
      title: 'Maximizing Space: How Design Brings Nature Indoors',
      img: '/project-3.jpg',
      desc: 'Urban developers are embracing bidirectional landscaping to counter dense steel configurations. We break down standard methodologies from top developers in Zurich and London.',
      readTime: '6 mins read',
      author: 'Alistair Vance',
      details: 'This article explores the evolution of structural biodomes, vertical planting patterns, and high-tensile glass terraces. The fusion of natural organic layouts with modern steel structures is no longer a luxury choice but a prerequisite for sustainable residential assets.'
    },
    {
      id: 2,
      date: 'Oct 20, 2024',
      category: 'news',
      title: 'Reclaiming Old Architectural Foundations',
      img: '/project-1.jpg',
      desc: 'Instead of razing historical factories, modular conversions present a more authentic, lower-carbon alternative for contemporary office quarters.',
      readTime: '4 mins read',
      author: 'Elena Rostova',
      details: 'Historical conversions save over 60% in initial layout carbon offsets. We evaluate several notable industrial conversions in Chicago, Amsterdam, and Berlin that have generated record-setting valuations.'
    },
    {
      id: 3,
      date: 'Oct 15, 2024',
      category: 'trends',
      title: 'Buying Your First Luxury Off-Plan Real Estate',
      img: '/project-2.jpg',
      desc: 'Secure equity advantages by locking down early development tiers. Discover structural risks and risk-hedging frameworks for international investors.',
      readTime: '8 mins read',
      author: 'Marcus Aurelius',
      details: 'Locking down pre-construction assets allows early stage financing benefits. Understanding leverage margins, development benchmarks, and trust escrow schemes is vital for ensuring reliable returns.'
    }
  ];

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(p => p.category === activeTab);

  if (readingPost) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
        <button 
          onClick={() => setReadingPost(null)}
          className="text-xs font-bold uppercase tracking-widest text-ink/50 hover:text-ink flex items-center gap-2"
          data-cursor="hover"
        >
          ← Back to Journal
        </button>

        <div className="space-y-4">
          <span className="text-xs font-bold text-lime-deep uppercase tracking-widest">{readingPost.category} · {readingPost.readTime}</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1] text-ink">{readingPost.title}</h1>
          <p className="text-ink/40 text-sm font-bold">By {readingPost.author} · {readingPost.date}</p>
        </div>

        <div className="h-[450px] rounded-[32px] overflow-hidden">
          <img src={readingPost.img} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6 text-ink/75 leading-relaxed text-lg font-medium">
          <p>{readingPost.desc}</p>
          <p>{readingPost.details}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-lime">
          <span className="text-sm font-bold tracking-[0.2em]">03 / INSIGHTS</span>
          <span className="w-12 h-px bg-current opacity-40" />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-ink leading-[0.9]">
          The Spaciaz <br /><span className="font-display italic font-light text-lime-deep">Chronicles</span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-ink/5 pb-4">
        {(['all', 'news', 'trends'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300",
              activeTab === tab ? "bg-ink text-cream" : "hover:bg-ink/5 text-ink/60"
            )}
            data-cursor="hover"
          >
            {tab} Articles
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {filteredPosts.map((blog) => (
          <div 
            key={blog.id} 
            className="group space-y-6 cursor-pointer"
            onClick={() => setReadingPost(blog)}
            data-cursor data-cursor-label="Read"
          >
            <div className="aspect-square rounded-[30px] overflow-hidden relative">
              <img src={blog.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-ink/40 uppercase tracking-widest">
                <span>{blog.date}</span>
                <span className="w-1 h-1 rounded-full bg-lime" />
                <span>{blog.readTime}</span>
              </div>
              <h4 className="text-2xl font-bold group-hover:text-lime-deep transition-colors leading-[1.2]">{blog.title}</h4>
              <p className="text-ink/50 text-sm leading-relaxed font-medium line-clamp-2">{blog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTACT PAGE                                */
/* -------------------------------------------------------------------------- */
export const ContactPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const days = ['Mon, Oct 28', 'Tue, Oct 29', 'Wed, Oct 30', 'Thu, Oct 31', 'Fri, Nov 1'];
  const times = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-lime">
          <span className="text-sm font-bold tracking-[0.2em]">04 / INQUIRIES</span>
          <span className="w-12 h-px bg-current opacity-40" />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-ink leading-[0.9]">
          Book a Private <br /><span className="font-display italic font-light text-lime-deep">Consultation</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Forms/Scheduler - Left */}
        <div className="lg:col-span-7 space-y-12">
          {formSubmitted ? (
            <div className="bg-cream border border-ink/5 p-12 rounded-[40px] flex flex-col items-center text-center gap-6">
              <CheckCircle2 className="w-16 h-16 text-lime-deep animate-bounce" />
              <h3 className="text-3xl font-bold tracking-tight text-ink">Consultation Request Confirmed</h3>
              <p className="text-ink/50 text-sm max-w-md leading-relaxed font-medium">
                Our lead architectural analyst will reach out within 2 hours to confirm your scheduled slot on {selectedDay} at {selectedTime}.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="mt-4 bg-ink text-cream px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-lime hover:text-ink transition-colors"
                data-cursor="hover"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Full Name</label>
                  <input required type="text" placeholder="Johnathan Doe" className="w-full bg-cream border border-ink/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-lime" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Email Address</label>
                  <input required type="email" placeholder="john@domain.com" className="w-full bg-cream border border-ink/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-lime" />
                </div>
              </div>

              {/* Consultation Scheduling Slot Widgets */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-ink/50">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Select Consultation Day</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "px-5 py-3 rounded-full text-xs font-bold transition-all border",
                        selectedDay === day ? "bg-ink border-ink text-cream" : "bg-cream border-ink/10 text-ink/70 hover:border-ink"
                      )}
                      data-cursor="hover"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDay && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-ink/50">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Select Desired Slot</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "px-5 py-3 rounded-full text-xs font-bold transition-all border",
                          selectedTime === time ? "bg-lime border-lime text-ink" : "bg-cream border-ink/10 text-ink/70 hover:border-ink"
                        )}
                        data-cursor="hover"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Project Summary</label>
                <textarea rows={4} placeholder="Tell us briefly about your property blueprints, land parcel details, or scale specifications." className="w-full bg-cream border border-ink/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-lime resize-none" />
              </div>

              <Magnetic>
                <button 
                  type="submit" 
                  disabled={!selectedDay || !selectedTime}
                  className="bg-ink text-cream disabled:opacity-40 disabled:pointer-events-none px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-lime hover:text-ink transition-colors"
                  data-cursor="hover"
                >
                  Confirm Scheduled Reservation <ArrowUpRight className="w-5 h-5" />
                </button>
              </Magnetic>
            </form>
          )}
        </div>

        {/* Contact info card - Right */}
        <div className="lg:col-span-5 space-y-12">
          <div className="bg-ink text-cream rounded-[40px] p-10 space-y-8 relative overflow-hidden">
            <div className="absolute w-[300px] h-[300px] rounded-full bg-lime/5 blur-[80px] -top-10 -right-10 pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-lime uppercase tracking-[0.3em]">Spaciaz Headquarters</span>
              <h3 className="text-3xl font-bold tracking-tight">Main Office</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lime shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Corporate Address</span>
                  <p className="text-sm font-medium text-cream/80">123 Architecture Plaza, Penthouse 4B, New York, NY 10013</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lime shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Direct Inquiries</span>
                  <p className="text-sm font-medium text-cream/80">+(084) 123-456 89</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lime shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">General Operations</span>
                  <p className="text-sm font-medium text-cream/80">hello@spaciaz.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-[40px] overflow-hidden relative border border-ink/5">
            {/* Architectural structural visual / mockup map view placeholder */}
            <img src="/final-cta.jpg" className="w-full h-full object-cover" alt="Office Location View" />
            <div className="absolute inset-0 bg-ink/20" />
            <div className="absolute bottom-6 left-6 bg-cream text-ink px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl">
              <MapPin size={14} className="text-lime-deep" /> Coordinates: 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
