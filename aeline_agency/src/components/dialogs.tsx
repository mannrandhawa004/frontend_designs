import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { ArrowBadge } from "@/components/brand";
import { services } from "@/lib/site-content";
import type { Project } from "@/lib/site-content";

export function ContactDialog({ onClose, initialService }: { onClose: () => void; initialService?: string }) {
  const [values, setValues] = useState({ name: "", email: "", company: "", service: initialService ?? "Let's figure it out together", message: "" });
  const [prepared, setPrepared] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prepared) titleRef.current?.focus({ preventScroll: true });
  }, [prepared]);

  const brief = [
    "AELINE / PROJECT BRIEF",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "Not provided"}`,
    `Interested in: ${values.service}`,
    "",
    "What we'd like to work on:",
    values.message,
  ].join("\n");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setPrepared(true);
  }

  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "aeline-project-brief.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <Dialog titleId="contact-dialog-title" onClose={onClose} className="contact-dialog">
      <div className="dialog-body">
        <p className="dialog-eyebrow mono">A GOOD PLACE TO START</p>
        <h2 id="contact-dialog-title" ref={titleRef} tabIndex={-1}>{prepared ? "Your next chapter, on paper." : "Let's find your next move."}</h2>
        {!prepared ? (
          <>
            <p className="dialog-intro">Tell us a little about your ambition. We'll help you prepare a project brief to start the conversation.</p>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-grid">
                <label>Your name <span aria-hidden="true">*</span><input autoFocus name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={80} value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} /></label>
                <label>Work email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={150} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /></label>
              </div>
              <label>Company <span className="field-optional">(optional)</span><input name="company" autoComplete="organization" placeholder="Your company or team" maxLength={120} value={values.company} onChange={(e) => setValues({ ...values, company: e.target.value })} /></label>
              <label>What are you curious about?<select name="service" value={values.service} onChange={(e) => setValues({ ...values, service: e.target.value })}><option>Let's figure it out together</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
              <label>What's on your mind? <span aria-hidden="true">*</span><textarea name="message" placeholder="The challenge, the ambition, or the question you can't stop thinking about..." required minLength={15} maxLength={1500} rows={4} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} /></label>
              <div className="form-bottom"><p>Your details stay in this page.<br />Nothing is sent automatically.</p><button type="submit" className="button button-blue">Prepare my brief <ArrowBadge /></button></div>
            </form>
          </>
        ) : (
          <div className="prepared-brief">
            <p className="dialog-intro">Your brief is ready, {values.name.split(" ")[0]}. Open your email app to send it, or download a copy to share. Nothing has been sent yet.</p>
            <div className="brief-preview"><span className="mono">YOUR PROJECT BRIEF</span><h3>{values.service}</h3><p>{values.message}</p><span className="brief-author">{values.name}{values.company && ` / ${values.company}`}</span></div>
            <div className="brief-actions">
              <a className="button button-blue" href={`mailto:hello@aeline.studio?subject=${encodeURIComponent(`A new possibility${values.company ? `: ${values.company}` : ""}`)}&body=${encodeURIComponent(brief)}`}><Mail size={16} aria-hidden="true" />Open email app<ArrowBadge /></a>
              <button className="button button-outline" onClick={download}>{downloaded ? <Check size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}{downloaded ? "Downloaded" : "Download brief"}</button>
            </div>
            <button className="text-link edit-brief" onClick={() => { setPrepared(false); setDownloaded(false); }}><ArrowLeft size={15} aria-hidden="true" />Back to edit</button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export function ProjectDialog({ project, onClose, onContact }: { project: Project; onClose: () => void; onContact: (service?: string) => void }) {
  return (
    <Dialog titleId="project-dialog-title" onClose={onClose} className="project-dialog">
      <div className={`project-dialog-image ${project.className}`}><img src={project.image} alt={project.imageAlt} /><span>{project.client}.</span></div>
      <div className="dialog-body">
        <p className="dialog-eyebrow mono">{project.category}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-intro">{project.intro}</p>
        <div className="project-detail-copy"><h3>The question</h3><p>{project.challenge}</p><h3>The way forward</h3><p>{project.approach}</p></div>
        <div className="project-outcomes">{project.outcomes.map((outcome) => <div key={outcome.label}><strong>{outcome.value}</strong><p>{outcome.label}</p></div>)}</div>
        <button className="button button-blue" onClick={() => onContact(project.id === "nordwind" ? services[2].title : services[0].title)}>Let's explore your challenge <ArrowBadge /></button>
        <p className="concept-note">An illustrative project story for the Aeline concept website.</p>
      </div>
    </Dialog>
  );
}

export function PrivacyDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog titleId="privacy-dialog-title" onClose={onClose}>
      <div className="dialog-body privacy-body">
        <p className="dialog-eyebrow mono">A LITTLE TRANSPARENCY</p>
        <h2 id="privacy-dialog-title">Your data stays yours.</h2>
        <p>This Aeline concept website runs in your browser. There is no connected contact-form backend and no analytics or advertising tracking.</p>
        <h3>Your project brief</h3>
        <p>The information you enter is held in page memory, not saved to our servers or your browser's storage. It is cleared when you close the dialog or leave the page. Downloading a brief saves a text file to your device.</p>
        <h3>Sending an email</h3>
        <p>The email button opens your configured email app with your brief filled in. Nothing is sent until you choose to send it from that app. Your email provider's privacy policy applies.</p>
        <h3>Images and fonts</h3>
        <p>Images are served with this website. Fonts load from Google Fonts, which receives the normal network information needed to serve them.</p>
        <button className="text-link" onClick={onClose}>Back to the possibilities <ArrowUpRight size={16} aria-hidden="true" /></button>
      </div>
    </Dialog>
  );
}