import { useState } from "react";

const ITEMS = [
  {
    q: "What is Melius?",
    a: "Melius is an AI-native operating system for creative work. One canvas holds every image, video and audio model side by side, plus agents that take the repetitive parts of a campaign off your plate — so the only thing you spend time on is judgement.",
  },
  {
    q: "What is a node-based AI canvas?",
    a: "Instead of a chat window that forgets, your work is a graph. Each node is a reference, a prompt, a model or an edit, and every node stays wired to the ones around it. Change an input and the whole branch regenerates — with the old version still sitting next to it.",
  },
  {
    q: "What kind of work is the Melius canvas best for?",
    a: "Anything that comes in versions: campaign variants, pack shots, treatment decks, storyboards, previz, look dev, lifecycle art and launch films. If you have ever exported the same idea in nine ratios, the canvas was built for you.",
  },
  {
    q: "How does AI video generation work on Melius?",
    a: "Pipe stills, references or a prompt from any upstream node into a video model, then extend, re-time, restyle or upscale the result in place. Shots stay linked to the frames that produced them, so a change to the look rolls through the sequence.",
  },
  {
    q: "Is Melius free?",
    a: "Yes. Every account starts with free monthly credits, full access to the canvas and no card required. Paid plans add more credits, agent skills and commercial terms when you are ready to ship.",
  },
  {
    q: "What AI models does Melius support?",
    a: "Sixty-plus models across image, video, audio and language — including GPT Image, Nano Banana, Seedream, Ideogram, Flux, Veo, Kling, Runway and ElevenLabs — with new releases wired in within days of launch.",
  },
  {
    q: "Who owns the content I create, and can I use it commercially?",
    a: "You do. On every paid plan the outputs you generate are yours to use commercially, including client work. We never train on your private projects.",
  },
  {
    q: "How is Melius different from single-model tools like Midjourney?",
    a: "A single-model tool gives you one engine and one prompt box. Melius gives you every engine, a canvas that remembers the whole chain of decisions, and agents that can repeat your process across a hundred assets without losing the thread.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#0c0b0a] py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-5">
        <h2
          data-fx="faq-heading"
          className="font-display text-[32px] leading-none text-[#efece8] sm:text-[44px]"
        >
          Frequently asked questions
        </h2>

        <div
          data-fx="faq-rule"
          className="mt-10 h-px w-full origin-left bg-gradient-to-r from-brand via-white/25 to-transparent"
        />
        <div>
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="reveal border-b border-white/10" style={{ transitionDelay: `${i * 40}ms` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={`text-[13.5px] transition-colors sm:text-[15px] ${
                      isOpen ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {it.q}
                  </span>
                  <span className="relative grid h-5 w-5 shrink-0 place-items-center text-white/50">
                    <span className="absolute h-px w-3 bg-current" />
                    <span
                      className={`absolute h-3 w-px bg-current transition-transform duration-300 ${
                        isOpen ? "rotate-90 opacity-0" : ""
                      }`}
                    />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[70ch] pb-6 pr-10 text-[13px] leading-[1.75] text-white/50">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
