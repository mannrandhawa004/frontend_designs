import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Asterisk, Plus } from "lucide-react";
import { ArrowBadge, Reveal, SectionLabel } from "@/components/brand";
import { faqs, projects, services, testimonials } from "@/lib/site-content";
import type { Project } from "@/lib/site-content";

export function About() {
  return (
    <section id="about" className="about section-space page-width" aria-labelledby="about-heading">
      <Reveal className="about-label"><SectionLabel number="01">A DIFFERENT PERSPECTIVE</SectionLabel></Reveal>
      <div className="about-main">
        <Reveal>
          <h2 id="about-heading" className="display-heading">The future isn't<br />just artificial.<br /><span className="text-blue">It's deeply human.</span><Asterisk className="about-asterisk" aria-hidden="true" strokeWidth={1.3} /></h2>
        </Reveal>
        <Reveal className="about-description" delay={0.1}>
          <p>Technology opens the door. People move things forward. We're an independent team of strategists, builders, and curious minds helping ambitious businesses find their next way forward.</p>
          <a href="#expertise" className="text-link">A little clarity goes a long way <ArrowDown size={15} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  );
}

export function Expertise({ onContact }: { onContact: (service?: string) => void }) {
  const [active, setActive] = useState<number | null>(0);
  const visual = services[active ?? 0];

  return (
    <section id="expertise" className="expertise section-space" aria-labelledby="expertise-heading">
      <div className="page-width expertise-layout">
        <div className="expertise-intro">
          <Reveal>
            <SectionLabel number="02">OUR EXPERTISE</SectionLabel>
            <h2 id="expertise-heading" className="display-heading">Big thinking.<br /><span>Real doing.</span></h2>
            <p className="section-description">From the first question to the thing that changes everything. We connect the dots, then get to work.</p>
          </Reveal>
          <Reveal className="expertise-visual" delay={0.1}>
            <div className="expertise-photo">
              <AnimatePresence initial={false}>
                <motion.img
                  key={visual.image}
                  src={visual.image}
                  alt={visual.imageAlt}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
            <p>{visual.note}</p>
          </Reveal>
        </div>
        <Reveal className="service-list" delay={0.1}>
          {services.map((service, index) => {
            const isActive = active === index;
            return (
              <div className={`service-item ${isActive ? "is-open" : ""}`} key={service.title}>
                <h3>
                  <button
                    className="service-toggle"
                    id={`service-button-${index}`}
                    aria-expanded={isActive}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setActive(isActive ? null : index)}
                  >
                    <span className="service-number mono">0{index + 1}</span>
                    <span>{service.title}</span>
                    <Plus className="service-plus" size={22} strokeWidth={1.3} aria-hidden="true" />
                  </button>
                </h3>
                <div className="accordion-content" inert={!isActive} aria-hidden={!isActive} style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}>
                  <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-button-${index}`}>
                    <div className="service-description">
                      <p>{service.description}</p>
                      <p className="service-deliverables mono">{service.deliverables}</p>
                      <button className="text-link" onClick={() => onContact(service.title)}>Explore the possibilities <ArrowUpRight size={16} aria-hidden="true" /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="expertise-footnote">One connected team. Built around your challenge.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SelectedWork({ onProject }: { onProject: (project: Project) => void }) {
  return (
    <section id="work" className="work section-space page-width" aria-labelledby="work-heading">
      <Reveal className="section-heading-row">
        <div>
          <SectionLabel number="03">SELECTED WORK</SectionLabel>
          <h2 id="work-heading" className="display-heading">Less what if.<br /><span className="text-blue">More what next.</span></h2>
        </div>
        <p className="section-description">A few of the ways we turn fresh perspectives into meaningful progress.</p>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal className={`project-item ${project.className}`} delay={index * 0.12} key={project.id}>
            <button className="project-link" onClick={() => onProject(project)} aria-label={`View ${project.client} project`}>
              <div className="project-image">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <div className="project-image-shade" />
                <span className="project-client">{project.id === "helios" && <Asterisk aria-hidden="true" strokeWidth={1.4} />}{project.client}<span className="project-client-period">.</span></span>
                <span className="project-view">Explore the project <span><ArrowUpRight size={20} aria-hidden="true" /></span></span>
              </div>
              <div className="project-caption">
                <p className="mono">{project.category}</p>
                <h3>{project.title}<ArrowUpRight size={21} aria-hidden="true" /></h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Approach() {
  const steps = [
    { title: "Understand deeply.", text: "The right questions before the first solution. We get to know your people and the problem worth solving." },
    { title: "Build together.", text: "Small, focused teams. Tangible work, early and often. We create alongside you, not behind closed doors." },
    { title: "Make it yours.", text: "The tools, the knowledge, the confidence. Everything you need to keep moving forward, on your own terms." },
  ];

  return (
    <section className="approach section-space" aria-labelledby="approach-heading">
      <div className="page-width">
        <Reveal className="approach-heading">
          <SectionLabel number="04">THE WAY WE WORK</SectionLabel>
          <h2 id="approach-heading" className="display-heading">On your side.<br />Every step of the way.</h2>
        </Reveal>
        <div className="approach-steps">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <div className="approach-line"><span className="mono">0{index + 1}</span><ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const story = testimonials[active];

  return (
    <section className="testimonials page-width section-space" aria-label="Words from our partners" aria-roledescription="carousel">
      <Reveal className="testimonial-side">
        <SectionLabel number="05">IN GOOD COMPANY</SectionLabel>
        <div className="testimonial-navigation">
          <button className="icon-button" aria-label="Previous testimonial" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}><ArrowLeft size={18} aria-hidden="true" /></button>
          <span className="mono">0{active + 1} <span>/ 0{testimonials.length}</span></span>
          <button className="icon-button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </Reveal>
      <div className="testimonial-main" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <blockquote><span className="quote-mark">&ldquo;</span>{story.quote}&rdquo;</blockquote>
            <figcaption>
              <div className="testimonial-person"><span className="person-initials">{story.initials}</span><div><p>{story.name}</p><span>{story.role}</span></div></div>
              <span className="testimonial-company">{story.company}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function FrequentlyAsked({ onContact }: { onContact: () => void }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="questions" className="faq section-space page-width" aria-labelledby="faq-heading">
      <Reveal className="faq-intro">
        <SectionLabel number="06">A LITTLE MORE CLARITY</SectionLabel>
        <h2 id="faq-heading" className="display-heading">Good questions.<br />Honest answers.</h2>
        <p className="section-description">Still have something on your mind?<br />We're always up for a conversation.</p>
        <button className="text-link" onClick={onContact}>Ask us anything <ArrowUpRight size={16} aria-hidden="true" /></button>
      </Reveal>
      <Reveal className="faq-list" delay={0.1}>
        {faqs.map((faq, index) => {
          const open = active === index;
          return (
            <div className={`faq-item ${open ? "is-open" : ""}`} key={faq.question}>
              <h3><button id={`faq-button-${index}`} aria-expanded={open} aria-controls={`faq-panel-${index}`} onClick={() => setActive(open ? null : index)}>{faq.question}<Plus size={19} strokeWidth={1.5} aria-hidden="true" /></button></h3>
              <div className="accordion-content" inert={!open} aria-hidden={!open} style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`}><p>{faq.answer}</p></div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}

export function ContactFooter({ onContact, onPrivacy }: { onContact: () => void; onPrivacy: () => void }) {
  return (
    <footer id="contact" className="contact-footer">
      <div className="page-width">
        <Reveal className="contact-top">
          <div>
            <SectionLabel number="07">YOUR NEXT CHAPTER</SectionLabel>
            <h2>A little conversation.<br />A lot of possibility.</h2>
            <button className="button button-dark" onClick={onContact}>Start a conversation <ArrowBadge /></button>
          </div>
          <a className="contact-email" href="mailto:hello@aeline.studio"><span>GOOD THINGS START WITH HELLO</span>hello@aeline.studio <ArrowUpRight size={17} aria-hidden="true" /></a>
        </Reveal>
        <div className="footer-links">
          <p>Independent minds.<br />Extraordinary possibilities.</p>
          <nav aria-label="Footer navigation"><a href="#about">Our perspective</a><a href="#expertise">Our expertise</a><a href="#work">Selected work</a><a href="#questions">Your questions</a></nav>
          <a className="back-top" href="#home">Back to the top <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">aeline<span><Asterisk strokeWidth={1.25} /></span></div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Aeline Studio</p><p>Human insight. Intelligent impact.</p><button onClick={onPrivacy}>Privacy &amp; your data</button></div>
      </div>
    </footer>
  );
}