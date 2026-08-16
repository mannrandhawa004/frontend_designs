export const REMOTE = "https://wpriverthemes.com/HTML/aigocy/assets/images";

export const works = [
  {
    id: "support-copilot",
    title: "Support Copilot",
    titleBreak: "Support Copilot\nfor SaaS",
    description:
      "Draft replies and pulls account context; reduced first-response time by 38%.",
    deliverables: "AI strategy, AI UX flows,\nLLM agent, RAG",
    industry: "SaaS",
    image: "/images/work-headphones.jpg",
    year: "2025",
    client: "Cantos SaaS",
    challenge:
      "Support teams were drowning in repetitive tickets and losing first-response SLAs as volume scaled.",
    outcome:
      "A production copilot that drafts replies with live account context, cutting first-response time by 38% while keeping humans in the loop.",
  },
  {
    id: "underwriting-risk",
    title: "Underwriting Risk Copilot",
    titleBreak: "Underwriting\nRisk Copilot",
    description:
      "Built a triage assistant to summarize claims; cut manual review time by 42%.",
    deliverables: "Use-case mapping, Prompt & UI patterns",
    industry: "Fintech",
    image: "/images/work-clock.jpg",
    year: "2025",
    client: "VectorPay",
    challenge:
      "Underwriters spent hours summarizing claims and hunting for risk signals across fragmented systems.",
    outcome:
      "A triage assistant that summarizes claims, flags risk, and prepares a draft memo — cutting manual review time by 42%.",
  },
  {
    id: "clinical-note",
    title: "Clinical Note Summarizer",
    titleBreak: "Clinical Note\nSummarizer",
    description:
      "Clinic-lobby assistant answering pre-visit questions; decreased front-desk calls by 28%.",
    deliverables: "PHI-safe RAG, HIPAA-aligned workflows",
    industry: "Healthcare",
    image: "/images/work-swiss.jpg",
    year: "2024",
    client: "Northway Clinics",
    challenge:
      "Front desks were overwhelmed by pre-visit questions while clinicians lost time reconstructing notes.",
    outcome:
      "A PHI-safe lobby assistant and note summarizer that decreased front-desk calls by 28% and sped charting.",
  },
  {
    id: "catalog-intelligence",
    title: "Catalog Intelligence Engine",
    titleBreak: "Catalog Intelligence\nEngine",
    description:
      "Launched a shopping copilot that understands attributes; raised add-to-cart by 12%.",
    deliverables: "Data cleaning & embeddings",
    industry: "Ecommerce/Retail",
    image: "/images/work-catalog.jpg",
    year: "2024",
    client: "Northway Commerce",
    challenge:
      "Product data was inconsistent across channels, hurting search, filters, and merchandising.",
    outcome:
      "An attribute-aware shopping copilot and catalog engine that raised add-to-cart by 12%.",
  },
];

export const services = [
  {
    id: "strategy",
    num: "01",
    title: "AI Strategy\n& Mapping",
    short: "Identify high-ROI use cases and define a realistic, measurable AI roadmap.",
    tags: ["Stakeholder discovery", "Value model & KPI definition", "Data readiness assessment"],
    image: "/images/service-knobs.jpg",
    long: "Identify high-ROI use cases and define a realistic, measurable AI roadmap. Our AI Strategy & Mapping process aligns technology with business goals through stakeholder discovery, KPI modeling, and data readiness assessment to ensure sustainable growth and measurable transformation outcomes.",
  },
  {
    id: "ux",
    num: "02",
    title: "AI UX &\nProduct Design",
    short: "Human-centered flows, prompts, and interfaces that build trust and adoption.",
    tags: ["Conversation design", "Clickable prototypes", "Trust & error states"],
    image: "/images/work-headphones.jpg",
    long: "Human-centered flows, prompts, and interfaces that build trust and adoption. We design intuitive AI experiences focused on transparency, usability, and engagement—helping users understand, trust, and confidently interact with intelligent systems.",
  },
  {
    id: "llm",
    num: "03",
    title: "LLM / Agent\nDevelopment",
    short: "Domain-specific copilots and agents that plan, execute, and report.",
    tags: ["Agent workflows", "Tool use & RAG", "Eval harnesses"],
    image: "/images/work-clock.jpg",
    long: "Domain-specific copilots and agents that plan, execute, and report. These intelligent systems are tailored to your industry, automating complex tasks, enhancing decision-making, and delivering actionable insights.",
  },
  {
    id: "data",
    num: "04",
    title: "Data Engineering\n& Pipelines",
    short: "Reliable data flows from ingestion to features, built for scale and cost control.",
    tags: ["Ingestion & cleaning", "Embeddings", "Cost-aware serving"],
    image: "/images/work-catalog.jpg",
    long: "Reliable data flows from ingestion to features, built for scale and cost control. Our robust data engineering ensures clean, consistent, and efficient pipelines—enabling seamless integration, real-time analytics, and optimized performance.",
  },
];

export const process = [
  {
    num: "01",
    title: "Discover & Scope",
    body: "Align on problems, data reality, and success metrics. Opportunity brief, KPI model, phased roadmap, effort/cost ranges.",
    time: "3-7 DAYS",
  },
  {
    num: "02",
    title: "Prototype",
    body: "De-risk unknowns and validate value quickly. Clickable UX, tech spike repo, initial eval rubric, demo.",
    time: "1-2 WEEKS",
  },
  {
    num: "03",
    title: "Validate & Evals",
    body: "Prove accuracy, usability, safety, and cost. Eval dashboard, acceptance thresholds, decision to iterate/ship.",
    time: "1 WEEKS",
  },
];

export const features = [
  {
    title: "Agent-Powered Workflows",
    body: "Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails, audit trails, and clear handoff to humans.",
    icon: "workflow",
  },
  {
    title: "Eval-First Quality",
    body: "Measure accuracy, latency, safety, and cost from day one. Our evals and dashboards keep models reliable and budgets predictable.",
    icon: "eval",
  },
  {
    title: "Private Knowledge RAG",
    body: "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation—freshness, citations, and explainability built in.",
    icon: "rag",
  },
  {
    title: "Human-Centered AI UX",
    body: "Interfaces, prompts, and error states designed for trust and adoption—so the smart thing is also the obvious thing to do.",
    icon: "ux",
  },
  {
    title: "Secure by Design",
    body: "PII handling, SSO/SAML, RBAC, secrets management, and compliance workflows—ship AI that’s safe, auditable, and enterprise-ready.",
    icon: "secure",
  },
  {
    title: "Seamless Integrations",
    body: "Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs to turn insights into action—fast.",
    icon: "plug",
  },
];

export const team = [
  {
    name: "Ava Collins",
    role: "Aigocy’s Design Lead",
    image: "/images/ava.jpg",
    featured: true,
  },
  {
    name: "Noah Reed",
    role: "ML/Agent Lead. Builds domain agents",
    image:
      "https://images.pexels.com/photos/31420959/pexels-photo-31420959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Jordan Brooks",
    role: "Data Engineer. Secure access policies",
    image:
      "https://images.pexels.com/photos/31868049/pexels-photo-31868049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Lucas Hayes",
    role: "Solutions Architect. Connects AI to your stack",
    image:
      "https://images.pexels.com/photos/16811639/pexels-photo-16811639.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Erin Park",
    role: "MLOps Engineer. Productionizes with CI/CD",
    image:
      "https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const awards = [
  {
    brand: "LOGOIPSUM",
    title: "Innovation in AI",
    project: "Underwriting Risk Copilot (Fintech)",
    year: "2025",
  },
  {
    brand: "LOGOIPSUM",
    title: "Best AI Product Design",
    project: "Support Copilot (SaaS)",
    year: "2025",
  },
  {
    brand: "Logoipsum",
    title: "Data & AI Excellence",
    project: "Clinical Note Summarizer (Healthcare)",
    year: "2024",
  },
  {
    brand: "logoipsum",
    title: "Innovation in AI",
    project: "Underwriting Risk Copilot (Fintech)",
    year: "2024",
  },
];

export const testimonials = [
  {
    quote:
      "We shipped our first copilot in 7 weeks and cut support tickets by 31%. The eval dashboards made every decision obvious.",
    name: "Elena Ruiz",
    role: "Cantos SaaS’s VP Product",
    image:
      "https://images.pexels.com/photos/31024751/pexels-photo-31024751.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100",
  },
  {
    quote:
      "SSO/SAML and RBAC landed smoothly. Latency stayed <300 ms on p95—huge win for our agents.",
    name: "Marcus Tan",
    role: "VectorPay’s CTO",
    image:
      "https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100",
  },
  {
    quote:
      "The best partner for agentic work. Multi-step planning, tool use, and audit trails—done right the first time.",
    name: "David Kim",
    role: "Northway's Ecommerce Director",
    image:
      "https://images.pexels.com/photos/37148344/pexels-photo-37148344.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100",
  },
];

export const faqs = [
  {
    q: "What’s the typical timeline from idea to v1?",
    a: "Typically 2–6 weeks depending on scope and complexity. We move from kickoff workshop to rapid prototyping and iteration, focusing on delivering a usable V1 quickly.",
  },
  {
    q: "What do we need to start?",
    a: "A clear problem statement, success metrics, access to sample data, and a stakeholder who can make decisions. We’ll run a kickoff workshop to align scope.",
  },
  {
    q: "Which models/stack do you use?",
    a: "We use OpenAI models, open-source LLMs, and modern stacks like Python (FastAPI), Node.js, React, and vector databases. The stack is chosen based on performance, scalability, and cost.",
  },
  {
    q: "Are model/API costs included in pricing?",
    a: "Development costs are included in project pricing, while model/API usage is typically billed separately based on usage. We provide estimates and optimize to keep costs low.",
  },
];

export const posts = [
  {
    id: "eval-first-ai",
    title: "Why eval-first AI ships faster than prompt-first AI",
    excerpt:
      "Teams that write goldens before they write prompts catch regressions early and make every model swap a measured decision.",
    date: "Mar 12, 2026",
    category: "Playbooks",
    read: "6 min",
    image:
      "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "rag-that-cites",
    title: "Private knowledge RAG that actually cites its sources",
    excerpt:
      "Freshness, chunking, and citation UX are the difference between a demo and a system operators will trust.",
    date: "Feb 28, 2026",
    category: "Engineering",
    read: "8 min",
    image:
      "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "agent-guardrails",
    title: "Guardrails for multi-step agents in production",
    excerpt:
      "Planning, tool use, and audit trails only work when humans can interrupt, inspect, and take over.",
    date: "Feb 04, 2026",
    category: "Agents",
    read: "7 min",
    image:
      "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "human-centered-ux",
    title: "Good AI feels obvious — because the hard work is hidden",
    excerpt:
      "Ava Collins on designing copilots that reduce support tickets instead of creating new ones.",
    date: "Jan 19, 2026",
    category: "Design",
    read: "5 min",
    image: "/images/ava.jpg",
  },
  {
    id: "from-pilot-to-prod",
    title: "From 7-week pilot to enterprise-ready copilot",
    excerpt:
      "How we shipped a support copilot, cut tickets by 31%, and left behind eval dashboards the team still uses.",
    date: "Jan 03, 2026",
    category: "Case Study",
    read: "9 min",
    image:
      "https://images.pexels.com/photos/6804084/pexels-photo-6804084.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "cost-latency",
    title: "Keeping p95 under 300ms without blowing the budget",
    excerpt:
      "Caching, routing, and eval-driven model choice — the unglamorous work that makes agents feel instant.",
    date: "Dec 11, 2025",
    category: "Performance",
    read: "6 min",
    image:
      "https://images.pexels.com/photos/17194838/pexels-photo-17194838.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
];

export const partners = ["LOGOIPSUM", "LOGOIPUM", "Logoipsum", "logoipsum"];

export const values = [
  {
    title: "Innovation",
    body: "Innovation drives everything we do. We leverage emerging technologies, challenge conventions, and explore new possibilities to create solutions that fuel growth and redefine standards.",
  },
  {
    title: "Creativity",
    body: "Creativity is the core of our agency. We transform ideas into compelling experiences that inspire, engage, and resonate — blending imagination with strategy.",
  },
  {
    title: "Collaboration",
    body: "We foster open communication, encourage co-creation, and build strong partnerships so every project reflects a shared vision and purpose.",
  },
  {
    title: "Excellence",
    body: "From concept to execution we pursue the highest standards. Every detail matters, every decision is intentional, and every outcome sets a new benchmark.",
  },
];
