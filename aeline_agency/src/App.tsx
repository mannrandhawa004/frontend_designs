import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Hero, Partners } from "@/components/hero";
import { About, Approach, ContactFooter, Expertise, FrequentlyAsked, SelectedWork, Testimonials } from "@/components/sections";
import { ContactDialog, PrivacyDialog, ProjectDialog } from "@/components/dialogs";
import type { Project } from "@/lib/site-content";

type ActiveDialog = { kind: "contact"; service?: string } | { kind: "project"; project: Project } | { kind: "privacy" } | null;

export default function App() {
  const [dialog, setDialog] = useState<ActiveDialog>(null);
  const openContact = (service?: string) => setDialog({ kind: "contact", service });
  const closeDialog = () => setDialog(null);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation onContact={() => openContact()} />
      <main id="main">
        <Hero onContact={() => openContact()} />
        <Partners />
        <About />
        <Expertise onContact={openContact} />
        <SelectedWork onProject={(project) => setDialog({ kind: "project", project })} />
        <Approach />
        <Testimonials />
        <FrequentlyAsked onContact={() => openContact()} />
      </main>
      <ContactFooter onContact={() => openContact()} onPrivacy={() => setDialog({ kind: "privacy" })} />
      {dialog?.kind === "contact" && <ContactDialog onClose={closeDialog} initialService={dialog.service} />}
      {dialog?.kind === "project" && <ProjectDialog project={dialog.project} onClose={closeDialog} onContact={openContact} />}
      {dialog?.kind === "privacy" && <PrivacyDialog onClose={closeDialog} />}
    </MotionConfig>
  );
}
