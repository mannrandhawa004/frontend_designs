import type { TiltedGridImage } from "@/components/ui/tilted-grid-hero";

export const heroImages: TiltedGridImage[] = [
  { src: "/images/architecture.jpg", alt: "Fluid, forward-looking architecture" },
  { src: "/images/studio.jpg", alt: "People working together in a sunlit studio" },
  { src: "/images/technology.jpg", alt: "The intricate connections of a circuit board" },
  { src: "/images/nordwind.jpg", alt: "A new perspective on modern architecture" },
  { src: "/images/workspace.jpg", alt: "A thoughtful space for new ideas" },
];

export const services = [
  {
    title: "AI & business strategy",
    description:
      "Find the opportunity behind the noise. We turn big questions into a focused AI roadmap, grounded in your business, your people, and a clear definition of success.",
    deliverables: "Opportunity discovery / AI readiness / Strategic roadmaps",
    image: "/images/architecture.jpg",
    imageAlt: "Sculptural architecture seen from a new perspective",
    note: "A fresh perspective. A clear direction.",
  },
  {
    title: "Intelligent automation",
    description:
      "Give your people space to do their best work. We design, build, and integrate practical AI agents that take the repetitive work out of your everyday operations.",
    deliverables: "Workflow design / AI agents / Human-in-the-loop systems",
    image: "/images/technology.jpg",
    imageAlt: "Connected circuitry powering intelligent systems",
    note: "Less busywork. More meaningful work.",
  },
  {
    title: "Data & decision intelligence",
    description:
      "Connect what you know to what you do next. We bring your data together and create forecasting tools that help your team make better, more confident decisions.",
    deliverables: "Data foundations / Forecasting / Decision products",
    image: "/images/nordwind.jpg",
    imageAlt: "The ordered lines of a glass building",
    note: "See the whole picture. Find the next move.",
  },
  {
    title: "People & transformation",
    description:
      "Lasting change is a team effort. We work alongside your people to build the skills, governance, and ways of working that make new technology feel like second nature.",
    deliverables: "Team enablement / Responsible AI / Operating models",
    image: "/images/studio.jpg",
    imageAlt: "A small team sharing ideas in their workspace",
    note: "Built with your people. Made to last.",
  },
];

export type Project = {
  id: string;
  client: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  className: string;
  intro: string;
  challenge: string;
  approach: string;
  outcomes: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    id: "nordwind",
    client: "Nordwind",
    category: "DATA INTELLIGENCE / OPERATIONS",
    title: "One clear picture. A whole new perspective.",
    image: "/images/nordwind.jpg",
    imageAlt: "Looking up through a modern blue glass building",
    className: "project-nordwind",
    intro:
      "Helping a growing business turn disconnected data into a shared source of confidence.",
    challenge:
      "Fourteen data sources. Multiple versions of the same report. A leadership team spending more time checking the numbers than acting on them. Nordwind needed a simpler way to see its business.",
    approach:
      "We worked with their operations team to connect key systems, agree on a shared set of metrics, and build a reporting workflow with AI-assisted commentary. Every decision and data source remains visible to the people using it.",
    outcomes: [
      { value: "73%", label: "less manual reporting" },
      { value: "14 to 1", label: "connected sources of truth" },
    ],
  },
  {
    id: "helios",
    client: "Helios",
    category: "AI STRATEGY / INTELLIGENT SYSTEMS",
    title: "Less guesswork. More forward thinking.",
    image: "/images/architecture.jpg",
    imageAlt: "A fluid architectural facade opening toward the sky",
    className: "project-helios",
    intro:
      "A demand forecasting system that helps a retail team meet tomorrow with a little more certainty.",
    challenge:
      "Demand was changing faster than the planning cycle. Helios needed to move beyond static spreadsheets without losing the judgment and knowledge of its experienced buying team.",
    approach:
      "Starting with a single category, we built a transparent forecasting model that combines historical demand, seasonality, and team feedback. A weekly review rhythm keeps people in control as the model learns.",
    outcomes: [
      { value: "94%", label: "forecast accuracy in the pilot" },
      { value: "6 weeks", label: "from discovery to first deployment" },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "They made something complex feel clear. More importantly, they built something our people actually want to use.",
    name: "Sarah Chen",
    role: "Chief Operating Officer, Nordwind",
    company: "Nordwind",
    initials: "SC",
  },
  {
    quote:
      "Aeline didn't arrive with all the answers. They asked better questions, then built the right thing alongside us.",
    name: "Marcus Bell",
    role: "Chief Executive Officer, Helios",
    company: "Helios",
    initials: "MB",
  },
  {
    quote:
      "The rare partner who cares just as much about the people using the technology as the technology itself.",
    name: "Amara Okafor",
    role: "VP of Product, Layers",
    company: "Layers",
    initials: "AO",
  },
];

export const faqs = [
  {
    question: "Where do we start?",
    answer:
      "With a conversation, not a proposal. We'll listen to what you're trying to change, explore where AI or better data could help, and suggest a focused first step. If we're not the right fit, we'll tell you.",
  },
  {
    question: "Do we need to have our data figured out?",
    answer:
      "Not at all. Understanding what you have is often the first part of the work. We can help connect existing systems, improve data quality, and identify a useful starting point without rebuilding everything.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "A focused discovery usually takes two weeks. A first working pilot typically takes four to eight weeks after that. We agree on scope and milestones together, and build in small, useful steps rather than disappearing for months.",
  },
  {
    question: "Will our team own what you build?",
    answer:
      "Yes. Your team owns the code, models, documentation, and workflows we create for you. We include practical training and a structured handover so you can keep moving without depending on us.",
  },
  {
    question: "How do you think about responsible AI?",
    answer:
      "Responsibility is part of the design, not a final checkbox. We consider data privacy, model evaluation, human oversight, and the regulations relevant to your business from the very beginning. Sensitive information stays within the boundaries we agree with you.",
  },
];