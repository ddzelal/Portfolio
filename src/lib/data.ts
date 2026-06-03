// Central content source — extracted from Dzelal Dupljak's CV.

export const profile = {
  name: "Dzelal Dupljak",
  handle: "ddzelal",
  role: "Full-Stack Software Engineer",
  tagline: "High-availability architecture · AI integration · infrastructure automation",
  location: "Novi Pazar, Serbia",
  email: "dzelal_d@live.com",
  phone: "+381 66 316189",
  website: "https://dzelaldupljak.com",
  github: "https://github.com/ddzelal",
  linkedin: "https://linkedin.com/in/dzelaldupljak",
  resume: "/Dzelal-Dupljak-CV.pdf",
  bio: "Full-Stack Software Engineer with 5+ years of expertise in high-availability architecture and infrastructure automation. I specialize in building complex software systems — from designing robust, flexible architectures to integrating modern AI tools that elevate team productivity. Focused on delivering stable solutions that drive direct business value.",
} as const;

export type Stat = { value: number; suffix: string; prefix?: string; label: string };

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years building" },
  { value: 20, suffix: "K+", label: "Users impacted" },
  { value: 15, suffix: "%", label: "Routing efficiency" },
  { value: 25, suffix: "%", label: "Engagement lift" },
];

export type Experience = {
  company: string;
  meta: string;
  role: string;
  period: string;
  current?: boolean;
  stack: string[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Betatel LTD",
    meta: "Telecom Innovations & AI · Sofia, Bulgaria",
    role: "Full-Stack Software Engineer",
    period: "Dec 2024 — Present",
    current: true,
    stack: ["Node.js", "React", "High-Availability", "AI Routing", "STT", "TTS", "CI/CD"],
    highlights: [
      "Architected and scaled telecom A2P messaging platforms, managing a high-availability system processing millions of daily API calls.",
      "Designed an intelligent AI message-routing component that analyses traffic in real time and dynamically optimizes paths — directly increasing delivery efficiency by ~15%.",
      "Developed a commercial AI voice agent (Call Agent), integrating advanced Speech-to-Text and Text-to-Speech for real-time voice interaction.",
      "Optimized CI/CD pipelines with AI-driven code reviews and automated feature/code generation, drastically reducing time-to-market.",
      "Led modernization of the core tech stack (Node.js / React) and hardened fraud prevention under peak traffic loads.",
    ],
  },
  {
    company: "OmniStreak",
    meta: "performancegolf.com · Ljubljana, Slovenia",
    role: "Full-Stack Software Engineer",
    period: "Jan 2024 — Nov 2024",
    stack: ["Python", "Next.js", "OpenAI", "Anthropic", "Video Streaming"],
    highlights: [
      "Led the end-to-end technical migration of a 12-year-old platform from a legacy PHP codebase to modern Python + Next.js — eliminating massive technical debt with zero downtime.",
      "Designed and integrated an intelligent personalization engine using OpenAI and Anthropic APIs for real-time generation of custom content and tailored training modules.",
      "Optimized core video-streaming pipelines to drastically reduce content latency — driving a 25% increase in user engagement across 20,000+ active users.",
    ],
  },
  {
    company: "Libex Marketplace",
    meta: "Web3 / DeFi · Johannesburg, South Africa",
    role: "Full-Stack Software Engineer",
    period: "Jan 2023 — Dec 2023",
    stack: ["Node.js", "Next.js", "GraphQL", "React Native", "TypeScript", "Web3"],
    highlights: [
      "Built and scaled an NFT platform from MVP to production, engineering robust APIs and frontend architectures that handled a sudden influx of 20,000+ active users.",
      "Architected low-latency blockchain integrations and smart-contract interfaces, ensuring transaction security through precise application-state management.",
      "Built and deployed a companion mobile platform (React Native / TypeScript) for system administration and real-time operational control.",
    ],
  },
  {
    company: "BaitulMal",
    meta: "Co-Founder · Novi Pazar, Serbia",
    role: "Co-Founder & Technical Lead",
    period: "Feb 2024 — Present",
    current: true,
    stack: ["Next.js", ".NET", "OpenAI", "PostgreSQL", "Docker"],
    highlights: [
      "Established the technical architecture and product strategy from scratch — a centralized system that introduced full transparency to financial tracking and humanitarian projects.",
      "Designed and integrated custom AI automation systems using the OpenAI API, enabling automated proposal generation and maximizing team velocity under lean resources.",
    ],
  },
  {
    company: "Centar NIT",
    meta: "Novi Pazar, Serbia",
    role: "Software Engineer & Tech Mentor",
    period: "Mar 2021 — Dec 2022",
    stack: ["Node.js", "Next.js", "React Native", "PostgreSQL", "MongoDB"],
    highlights: [
      "Led technical execution of web applications for municipal-services digitization — robust, scalable architecture enabling real-time analytical visibility for the city.",
      "Transferred production-grade engineering practices to students through intensive courses, and served as an active hackathon mentor guiding teams to working software under tight deadlines.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C#", "Solidity"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Redux", "React Query", "MUI", "Bootstrap", "Figma"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express.js", "GraphQL", ".NET", "PostgreSQL", "MongoDB"],
  },
  {
    label: "AI & Infra",
    items: ["AI & LLM", "Speech-to-Text", "Text-to-Speech", "High-Availability", "Microservices", "CI/CD", "Docker", "Linux"],
  },
  {
    label: "Tooling",
    items: ["Git", "Jest", "Postman", "Trello / Jira", "Web3"],
  },
];

// Flat marquee strip of headline tech.
export const marquee: string[] = [
  "TypeScript", "Node.js", "React", "Next.js", "Python", "AI / LLM", "GraphQL",
  "Docker", "PostgreSQL", "MongoDB", "React Native", "Web3", "STT / TTS",
  "High-Availability", "CI/CD", "Microservices", ".NET", "Solidity",
];

export type ProjectKind =
  | "routing"
  | "voice"
  | "video"
  | "nft"
  | "finance"
  | "analytics";

export type Project = {
  name: string;
  category: string;
  blurb: string;
  stack: string[];
  metric: string;
  kind: ProjectKind;
};

export const projects: Project[] = [
  {
    name: "AI Message-Routing Engine",
    category: "Telecom · AI",
    kind: "routing",
    blurb:
      "Real-time A2P traffic router that analyses load and dynamically optimizes delivery paths across a high-availability system handling millions of daily API calls.",
    stack: ["Node.js", "AI Routing", "High-Availability"],
    metric: "+15% delivery efficiency",
  },
  {
    name: "Call Agent — AI Voice",
    category: "Telecom · Voice AI",
    kind: "voice",
    blurb:
      "Commercial AI voice agent integrating advanced Speech-to-Text and Text-to-Speech for natural, real-time voice interaction for telecom clients.",
    stack: ["STT", "TTS", "Node.js"],
    metric: "Real-time voice",
  },
  {
    name: "Performance Golf Platform",
    category: "Streaming · Personalization",
    kind: "video",
    blurb:
      "Migrated a 12-year-old PHP platform to Python + Next.js with zero downtime, adding an AI personalization engine and low-latency video pipelines.",
    stack: ["Python", "Next.js", "OpenAI", "Anthropic"],
    metric: "+25% engagement · 20K+ users",
  },
  {
    name: "Libex NFT Marketplace",
    category: "Web3 · DeFi",
    kind: "nft",
    blurb:
      "NFT marketplace taken from MVP to production with low-latency blockchain integrations, smart-contract interfaces and a React Native admin companion app.",
    stack: ["Next.js", "GraphQL", "Solidity", "React Native"],
    metric: "MVP → production",
  },
  {
    name: "BaitulMal Transparency System",
    category: "Fintech · Humanitarian",
    kind: "finance",
    blurb:
      "Centralized platform bringing full transparency to financial tracking and humanitarian projects, with custom OpenAI automation for proposal generation.",
    stack: ["Next.js", ".NET", "OpenAI", "PostgreSQL"],
    metric: "Built from scratch",
  },
  {
    name: "Municipal Smart Systems",
    category: "GovTech · Analytics",
    kind: "analytics",
    blurb:
      "Scalable web applications for municipal-services digitization, giving the city real-time analytical visibility into complex data.",
    stack: ["Node.js", "PostgreSQL", "MongoDB"],
    metric: "City-scale analytics",
  },
];

export type Certification = { title: string; issuer: string };

export const certifications: Certification[] = [
  { title: "Advanced LLM Architecture & Claude API Orchestration", issuer: "Anthropic Training" },
  { title: "International Tech Delegate", issuer: "Web Summit, Lisbon" },
];

export const education = [
  { degree: "Information Engineering", school: "International University in Novi Pazar", period: "2019 — Present" },
  { degree: "Electrical Engineering", school: "Tehnička Škola, Novi Pazar", period: "2013 — 2017" },
];

export const navLinks = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "stack", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];
