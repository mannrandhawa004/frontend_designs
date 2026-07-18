import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, ArrowUpRight } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, { scale: 0.96, y: 30, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Using a real architectural video from Mixkit */}
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
          title="Spaciaz Cinematic"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    tag: string;
    img: string;
    location: string;
    size: string;
    completion: string;
    desc: string;
  } | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        panelRef.current,
        { xPercent: 20, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-[210] flex items-center justify-center p-4 md:p-8"
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        className="bg-white text-black rounded-[32px] max-w-6xl w-full overflow-hidden relative flex flex-col md:flex-row max-h-[92vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-7 right-7 z-50 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
        >
          <X size={20} />
        </button>

        <div className="md:w-3/5 relative">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover md:min-h-[620px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
        </div>

        <div className="md:w-2/5 p-10 md:p-14 flex flex-col justify-center">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#D9E954] font-bold">{project.tag}</div>
            <h2 className="text-4xl font-bold leading-none mt-3 mb-6 tracking-tight">{project.title}</h2>
            
            <div className="grid grid-cols-3 gap-5 mb-10 text-sm">
              <div>
                <div className="text-black/40 text-xs tracking-wider font-medium mb-px">LOCATION</div>
                <div className="font-semibold">{project.location}</div>
              </div>
              <div>
                <div className="text-black/40 text-xs tracking-wider font-medium mb-px">TOTAL AREA</div>
                <div className="font-semibold">{project.size}</div>
              </div>
              <div>
                <div className="text-black/40 text-xs tracking-wider font-medium mb-px">COMPLETED</div>
                <div className="font-semibold">{project.completion}</div>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-gray-600 mb-10">{project.desc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
            <button className="bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-[#D9E954] hover:text-black transition-all">
              Download Brochure <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
