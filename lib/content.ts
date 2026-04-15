import portfolioPreview from "@/public/corpcomment.png";
import meetingMindDashboardImg from "@/public/meetingMindDashboardScreen.png";
import meetingMindMeetingsImg from "@/public/meetingMindMeetingsScreen.png";
import meetingMindRecordImg from "@/public/meetingMindManualRecordScreen.png";
import meetingMindSettings1Img from "@/public/meetingMindSettingsScreen1.png";
import meetingMindSettings2Img from "@/public/meetingMindSettingsScreen2.png";
import plantSystemImg from "@/public/plantSystem.jpg";
import vendingMachineImg from "@/public/vendingMachine.png";
import type {
  CaseStudy,
  ContactConfig,
  ContactLink,
  EducationItem,
  ExperienceItem,
  NavigationItem,
  Profile,
  SkillGroup,
} from "@/lib/types";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Approach", href: "/#approach", sectionId: "approach" },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export const profile: Profile = {
  name: "Jamie White",
  role: "Early-career Software Engineer",
  location: "United Kingdom",
  heroEyebrow: "Jamie White / software engineer / UK-based",
  heroHeadline:
    "Building clear, reliable software across modern web delivery, object-oriented systems, and embedded prototypes.",
  heroSummary:
    "I enjoy turning fuzzy ideas into maintainable software with strong fundamentals, deliberate architecture, and interface polish. My work spans typed Next.js applications, Java domain modelling, and sensor-driven automation systems.",
  availability:
    "Open to graduate, junior, and early-career software engineering roles where I can keep building depth while contributing responsibly.",
  quickFacts: [
    "TypeScript, React, Next.js, Tailwind, Framer Motion",
    "Java, JUnit, domain modelling, and OOP fundamentals",
    "Embedded systems, sensor data, and control-driven prototypes",
  ],
  proofPoints: [
    {
      label: "Build style",
      value: "Maintainable first",
      detail:
        "I favour readable architecture, typed boundaries, and implementation detail that stays easy to extend.",
    },
    {
      label: "Technical range",
      value: "Web to systems",
      detail:
        "Recent work crosses App Router web apps, Java project design, and hardware-linked automation concepts.",
    },
    {
      label: "Working habits",
      value: "Calm delivery",
      detail:
        "I care about collaboration, dependable execution, and finishing work to a standard that feels intentional.",
    },
  ],
  about: [
    "I am motivated by software that stays understandable after the first version ships. That means modelling the problem clearly, choosing tools for the job rather than for novelty, and keeping implementation detail honest.",
    "The projects I am most proud of combine technical curiosity with delivery discipline: responsive interfaces that feel polished, Java systems shaped around strong object-oriented principles, and embedded prototypes that connect software decisions to behaviour in the real world.",
  ],
  principles: [
    "Design the model before chasing the UI.",
    "Prefer clear tradeoffs over clever complexity.",
    "Treat testing and structure as part of the product.",
    "Carry ideas through from architecture to final polish.",
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "meeting-mind",
    title: "Meeting Mind",
    summary:
      "A Tauri v2 desktop application that automatically detects Microsoft Teams meetings, captures dual audio sources, transcribes locally with faster-whisper, and generates AI-powered summaries — all without sending audio off-device.",
    role: "Solo developer",
    period: "Personal project",
    problem:
      "Taking manual notes during meetings splits your attention between listening and writing, producing inconsistent records that miss key decisions. Existing transcription tools either require visible bot participants that change how people behave in meetings, or stream raw audio to external servers — a non-starter for sensitive business discussions. I wanted a tool that could capture, transcribe, and summarise meetings completely in the background, with local-first processing that keeps confidential audio on the machine.",
    approach: [
      "Designed the system as a Python daemon (FastAPI on localhost) paired with a Tauri v2 desktop app. The daemon monitors for active Teams calls and automatically begins dual audio capture — system audio via BlackHole virtual driver for remote speakers and microphone input for the user — then merges both streams with RMS normalisation.",
      "Built the transcription pipeline around faster-whisper with a CTranslate2 backend for efficient on-device speech-to-text. Added energy-based speaker diarisation to distinguish the user from remote participants, producing speaker-labelled timestamped transcripts without any network traffic.",
      "Connected the transcript output to either a local Ollama instance or the Claude API for structured summarisation. The system generates meeting summaries with action items, key decisions, and attendee contributions, then exports to Markdown with YAML frontmatter (optimised for Obsidian) or directly to Notion databases.",
    ],
    technicalDecisions: [
      {
        title: "Tauri v2 with React and TypeScript frontend",
        detail:
          "Chose Tauri over Electron for a significantly smaller binary size and native Rust performance. The React frontend provides a polished interface with real-time audio meters, streaming transcripts, waveform visualisation, and a command palette (Cmd+K) — all styled with Tailwind CSS and managed with Zustand state.",
      },
      {
        title: "Local-first transcription with faster-whisper",
        detail:
          "Runs the entire speech-to-text pipeline on-device using faster-whisper's CTranslate2 backend, avoiding cloud transcription APIs entirely. This keeps all meeting audio on the machine, addresses privacy requirements for sensitive discussions, and eliminates per-minute API costs.",
      },
      {
        title: "Dual audio capture via BlackHole",
        detail:
          "Captures both system audio (remote speakers) and microphone input through separate channels using the BlackHole virtual audio driver on macOS. The streams are merged post-capture with RMS normalisation, producing clean mixed audio without requiring participants to install anything.",
      },
    ],
    stack: [
      "Tauri v2",
      "Rust",
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "faster-whisper",
      "Claude API",
      "SQLite",
      "Tailwind CSS",
    ],
    outcome: [
      "Shipped a fully automated meeting pipeline — from detection through transcription to structured summary — that runs invisibly in the background with zero manual setup per meeting.",
      "All audio capture and transcription stays on-device, making the tool suitable for confidential discussions where cloud-based alternatives are not appropriate.",
      "Built a polished desktop application with live audio meters, streaming transcripts, full-text search across meeting history, waveform playback, and multiple export formats including Obsidian-compatible Markdown and native Notion pages.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/JWhite212/meeting-mind",
        kind: "repository",
      },
    ],
    media: [
      {
        src: meetingMindDashboardImg,
        alt: "Meeting Mind dashboard showing live recording interface with audio meters and transcript",
        caption:
          "The main dashboard during an active recording — real-time audio levels, streaming transcript, and meeting controls.",
      },
      {
        src: meetingMindMeetingsImg,
        alt: "Meeting Mind meetings list with search and meeting history",
        caption:
          "Meeting history view with full-text search across all transcripts and summaries.",
      },
      {
        src: meetingMindRecordImg,
        alt: "Meeting Mind manual recording interface with waveform visualisation",
        caption:
          "Manual recording mode with waveform visualisation and speaker-labelled playback controls.",
      },
      {
        src: meetingMindSettings1Img,
        alt: "Meeting Mind general settings panel showing recording defaults and app preferences",
        caption:
          "General settings — recording defaults, auto-detection behaviour, and app-wide preferences in one panel.",
      },
      {
        src: meetingMindSettings2Img,
        alt: "Meeting Mind advanced settings panel for transcription model, AI provider, and export targets",
        caption:
          "Advanced settings — transcription model selection, AI provider routing between local Ollama and Claude, and Notion / Obsidian export configuration.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/JWhite212/meeting-mind",
    metrics: [
      {
        label: "Network calls during transcription",
        value: "0",
        detail:
          "All speech-to-text runs on-device via faster-whisper + CTranslate2.",
      },
      {
        label: "Audio sources per meeting",
        value: "2",
        detail:
          "System audio + microphone captured in parallel and RMS-normalised.",
      },
      {
        label: "Export targets",
        value: "3",
        detail:
          "Markdown (Obsidian-compatible), native Notion pages, plain-text transcript.",
      },
      {
        label: "AI providers supported",
        value: "Local + cloud",
        detail:
          "Ollama for fully offline summaries, Claude API for higher-quality cloud summaries.",
      },
    ],
    architecture: [
      "Tauri v2 shell with a React and TypeScript frontend handles the desktop UI, window management, and native integration points while keeping the binary small.",
      "A Python FastAPI daemon bound to localhost runs alongside the shell, responsible for meeting detection, lifecycle state, and orchestrating the audio capture subsystem.",
      "Dual audio capture pulls system output through the BlackHole virtual driver and microphone input in parallel, then merges the two streams with RMS normalisation so neither side dominates the mix.",
      "The transcription pipeline runs faster-whisper on a CTranslate2 backend with energy-based diarisation, producing speaker-labelled timestamped segments without any network traffic.",
      "A summary layer routes transcripts to either a local Ollama model or the Claude API, so the same pipeline supports fully offline operation or higher-quality cloud summaries.",
      "An export layer writes Markdown with YAML frontmatter for Obsidian or pushes structured pages into Notion databases, while SQLite stores meeting metadata and backs full-text search across history.",
    ],
    features: [
      {
        title: "Auto meeting detection",
        detail:
          "Watches for active Teams calls and begins recording without a visible bot or any per-meeting setup step.",
      },
      {
        title: "Dual-channel audio capture",
        detail:
          "Captures remote participants and the local microphone on separate channels so transcripts can distinguish speakers reliably.",
      },
      {
        title: "Real-time audio meters",
        detail:
          "Live level meters for both channels give immediate feedback that capture is healthy before a meeting starts.",
      },
      {
        title: "Streaming transcript",
        detail:
          "Transcribed segments appear as they are produced so the user can follow the record as the meeting runs rather than waiting for a post-call export.",
      },
      {
        title: "Command palette (Cmd+K)",
        detail:
          "Keyboard-first access to recording controls, search, and navigation keeps the interface out of the way during active calls.",
      },
      {
        title: "Full-text meeting search",
        detail:
          "SQLite-backed full-text search spans every transcript and summary, so past discussions stay retrievable instead of sitting in isolated files.",
      },
      {
        title: "Obsidian + Notion export",
        detail:
          "Writes Markdown with YAML frontmatter for Obsidian vaults or native pages into Notion databases, letting meetings flow into existing knowledge systems.",
      },
    ],
    challenges: [
      {
        title: "Keeping two live audio streams in sync without drift",
        detail:
          "The system audio and microphone arrive from different devices with independent clocks, so small drift accumulates quickly. Capture runs on a shared frame clock, each stream is RMS-normalised so neither side dominates the mix, and frame-aligned mixing is handled on fixed-size buffers rather than by concatenating raw chunks, which keeps the merged output aligned with the transcript timeline.",
      },
      {
        title: "Running faster-whisper efficiently without blocking the UI",
        detail:
          "The FastAPI daemon hosts transcription on a background worker and streams partial segments to the Tauri frontend over a local HTTP and WebSocket bridge. The UI only awaits small incremental messages, the Python side pushes results as soon as a segment is ready, and the async boundaries are scoped tightly so the React layer never has to wait on a long-running inference call.",
      },
      {
        title: "Handling Teams meeting edge cases reliably",
        detail:
          "Teams calls change shape mid-meeting — mute toggles, breakout rooms, and screen-share transitions all alter the audio graph. Detection reads mute state and active device changes explicitly, breakouts are treated as scoped sub-sessions rather than new meetings, and any capture failure falls back to manual recording rather than silently dropping audio, so the record stays trustworthy even when the call does something unexpected.",
      },
    ],
  },
  {
    slug: "automatic-plant-watering-system",
    title: "Automatic IoT Plant Watering System",
    summary:
      "A sensor-driven plant care prototype that combines embedded programming, environmental control, and a monitoring interface to automate day-to-day plant management.",
    role: "Independent builder",
    period: "Personal project",
    problem:
      "Static watering schedules ignore the real condition of the plant and its environment. I wanted a system that could react to live sensor data, keep the environment stable, and give useful visibility into what the hardware was doing.",
    approach: [
      "Built the control loop around environmental sensor readings rather than a fixed schedule, so watering decisions could respond to actual conditions.",
      "Combined Arduino and ESP32 work with a lightweight web interface to surface readings, graph behaviour, and make the system easier to reason about from software as well as hardware.",
      "Used predictive logic and control-system thinking to balance watering, lighting, and temperature instead of treating each variable as an isolated feature.",
    ],
    technicalDecisions: [
      {
        title: "Sensor-led automation",
        detail:
          "The core behaviour is driven by measured conditions, which makes the system more adaptable than timer-based watering alone.",
      },
      {
        title: "Predictive decision layer",
        detail:
          "Logistic regression and KNN were used to inform watering decisions, giving the prototype a more analytical basis than a simple threshold script.",
      },
      {
        title: "Closed-loop environmental control",
        detail:
          "A PID-based control system handled temperature and lighting so the project could operate as a broader plant-care system, not only a pump trigger.",
      },
    ],
    stack: [
      "Arduino",
      "ESP32",
      "C++",
      "IoT",
      "Sensor integration",
      "PID control",
      "Web interface",
    ],
    outcome: [
      "Brought together embedded programming, hardware integration, software design, and interface work in one coherent project.",
      "Strengthened my confidence working across disciplines where software decisions have direct real-world effects.",
      "Created a case study that shows curiosity beyond standard CRUD applications.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/JWhite212/Automatic-IOT-Plant-Watering-System",
        kind: "repository",
      },
    ],
    media: [
      {
        src: plantSystemImg,
        alt: "Plant watering system project preview",
        caption:
          "A prototype that links sensors, control logic, and software visibility into one plant-care workflow.",
      },
    ],
    featured: true,
    githubUrl:
      "https://github.com/JWhite212/Automatic-IOT-Plant-Watering-System",
  },
  {
    slug: "java-vending-machine",
    title: "Java Vending Machine",
    summary:
      "A Java project focused on object-oriented design, domain modelling, and testable implementation rather than surface-level feature count.",
    role: "Independent builder",
    period: "Coursework and personal refinement",
    problem:
      "I wanted a project that made software design quality visible. The goal was not only to simulate a vending machine, but to build it in a way that demonstrated clear modelling, maintainability, and sound object-oriented thinking.",
    approach: [
      "Modelled the machine around well-scoped responsibilities so inventory, payment handling, and product behaviour stayed understandable and testable.",
      "Used the project as a way to practise core Java engineering habits: strong encapsulation, clean abstractions, and careful separation between behaviour and state.",
      "Backed the implementation with JUnit tests to show that the design could be verified and evolved instead of existing as one-off coursework code.",
    ],
    technicalDecisions: [
      {
        title: "Domain-first class design",
        detail:
          "The code is shaped around the responsibilities of the vending domain, which keeps behaviour easier to reason about than a single monolithic implementation.",
      },
      {
        title: "OOP principles made explicit",
        detail:
          "Encapsulation, abstraction, inheritance, and polymorphism are visible in the structure of the system rather than being treated as theory only.",
      },
      {
        title: "Testing as part of design",
        detail:
          "JUnit coverage helped validate behaviours and reinforced the idea that a clean design should be straightforward to exercise in tests.",
      },
    ],
    stack: [
      "Java",
      "JUnit",
      "Object-oriented design",
      "Domain modelling",
      "Design principles",
    ],
    outcome: [
      "Produced a compact project that communicates software engineering fundamentals clearly.",
      "Reinforced habits around modelling, readability, and testability that transfer directly into production codebases.",
      "Created a useful example of how I think about code quality beyond just shipping features.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/JWhite212/VendingMachine",
        kind: "repository",
      },
    ],
    media: [
      {
        src: vendingMachineImg,
        alt: "Java vending machine project preview",
        caption:
          "A focused Java build designed to showcase object-oriented thinking, maintainable structure, and testable behaviour.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/JWhite212/VendingMachine",
  },
  {
    slug: "portfolio-platform-redesign",
    title: "Portfolio Platform Redesign",
    summary:
      "A rebuild of my personal site into an employer-focused portfolio platform with dedicated case studies, typed content, and a cleaner conversion path.",
    role: "Designer and developer",
    period: "Ongoing personal product",
    problem:
      "The older portfolio looked dated, concentrated too much information into a single scrolling page, and did not communicate technical judgement or delivery quality clearly enough for engineering roles.",
    approach: [
      "Reframed the site around employer-first storytelling: stronger hierarchy, fewer generic components, clearer project narratives, and dedicated detail pages for selected work.",
      "Moved the site content into a typed local model so profile copy, navigation, case studies, metadata, and contact details all stay consistent.",
      "Used the rebuild to improve both presentation and implementation quality, including route-level metadata, structured data, and a more deliberate contact flow.",
    ],
    technicalDecisions: [
      {
        title: "Typed content architecture",
        detail:
          "Profile data, navigation, skills, experience, and project narratives are centralised so the site behaves more like a maintainable product than a hard-coded landing page.",
      },
      {
        title: "Hybrid App Router structure",
        detail:
          "The homepage works as a high-level editorial overview, while dedicated `/projects/[slug]` routes carry deeper case-study detail for the strongest work.",
      },
      {
        title: "Inline contact feedback with server action delivery",
        detail:
          "The contact form uses a server action, React Email, and Resend with clearer validation, honeypot spam friction, and env-backed runtime configuration.",
      },
    ],
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Email",
      "Resend",
      "Structured data",
    ],
    outcome: [
      "Turned the portfolio into a clearer representation of how I think, build, and communicate as an engineer.",
      "Improved both the visual quality and the underlying implementation model instead of treating design and engineering as separate concerns.",
      "Created a reusable foundation for future case studies without adding CMS overhead.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/JWhite212/Portfolio-Website",
        kind: "repository",
      },
    ],
    media: [
      {
        src: portfolioPreview,
        alt: "Portfolio platform preview",
        caption:
          "A portfolio rebuild focused on clearer storytelling, stronger hierarchy, and a more maintainable content structure.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/JWhite212/Portfolio-Website",
  },
];

export const education: EducationItem[] = [
  {
    title: "Advanced Computer Science, MSc",
    grade: "Achieved: Distinction",
    institution: "University of Kent",
    period: "Postgraduate study",
    summary:
      "Expanded my software foundation with more advanced technical problem solving, deeper systems thinking, and project work that pushed beyond introductory development patterns.",
  },
  {
    title: "Computer Science, BSc (Hons)",
    grade: "Achieved: Upper Second Class Honours (2:1)",
    institution: "University of Kent",
    period: "Undergraduate foundation",
    summary:
      "Built the core grounding in programming, object-oriented design, databases, web development, and collaborative technical work that underpins the projects I continue to build.",
  },
];

export const experience: ExperienceItem[] = [
  {
    title: "Software and Solutions Engineer",
    organisation: "Quo Vadis CCS Ltd",
    location: "Remote",
    period: "Sep 2025 – Present",
    summary:
      "Build and configure customer-experience solutions on Genesys Cloud CX, shipping backend services and integrations that orchestrate workflows across voice and digital channels.",
    highlights: [
      "Design inbound IVR/Architect flows, queues, and routing that reduce handle time and improve first-contact resolution.",
      "Develop custom integrations with CRM/ITSM platforms (Salesforce, Zendesk, ServiceNow) using REST/webhooks and event-driven patterns.",
      "Ship backend services and tooling in Node.js/TypeScript and Python for workflow orchestration, data enrichment, and reporting.",
      "Translate client journey maps and SLAs into measurable solutions with monitoring, alerting, and CX KPI dashboards.",
      "Champion engineering quality through code reviews, testing, CI/CD, and IaC while meeting security and compliance requirements.",
    ],
  },
  {
    title: "Customer Assistant",
    organisation: "Morrisons",
    location: "Farnborough, England",
    period: "Nov 2024 – Aug 2025",
    summary:
      "Part-time customer-facing role providing friendly, efficient service and support in a busy retail environment.",
    highlights: [
      "Delivered consistent customer support across multiple departments.",
      "Maintained composure and helpfulness during peak trading periods.",
    ],
  },
  {
    title: "Field Sales Representative",
    organisation: "toob",
    location: "Farnborough, England",
    period: "May 2024 – Aug 2024",
    summary:
      "Full-time field sales role promoting broadband services directly to customers, combining persuasive communication with product knowledge.",
    highlights: [
      "Engaged prospective customers face-to-face to explain product benefits and close sales.",
      "Developed strong interpersonal and objection-handling skills in a target-driven environment.",
    ],
  },
  {
    title: "Kitchen and Front of House Staff",
    organisation: "Papas The Deep Blue",
    location: "Kent, England",
    period: "Aug 2021 – Apr 2024",
    summary:
      "Part-time role alongside completing BSc Computer Science and MSc Advanced Computer Science degrees, serving customers and preparing food in a fast-paced environment.",
    highlights: [
      "Served customers promptly and courteously while preparing high-quality food.",
      "Worked closely with a small team to deliver efficient service and maintain high standards.",
      "Balanced demanding academic workload with consistent professional reliability.",
    ],
  },
  {
    title: "Graduation Congregations & Open Day Assistant",
    organisation: "University of Kent",
    location: "Kent, England",
    period: "Jun 2022 – Jul 2023",
    summary:
      "Supported large-scale university events hosting over 1,000 guests, representing the institution to prospective students, current students, and their families.",
    highlights: [
      "Provided guidance, information, and support to ensure every attendee felt welcomed and informed.",
      "Collaborated with university staff to oversee event logistics, manage crowd flow, and resolve issues swiftly.",
      "Strengthened skills in customer service, problem-solving, and event coordination.",
    ],
  },
  {
    title: "Receptionist",
    organisation: "University of Kent's Careers and Employability Service",
    location: "Kent, England",
    period: "Jul 2022 – Nov 2022",
    summary:
      "First point of contact for students, staff, and business partners at the Careers and Employability Department, managing inquiries and coordinating appointments.",
    highlights: [
      "Managed student inquiries and coordinated appointments for the Careers team.",
      "Communicated with partnered businesses to support ongoing collaborations.",
      "Handled phone calls with a friendly, solutions-focused approach to address questions and resolve issues.",
    ],
  },
  {
    title: "Kitchen Staff",
    organisation: "McDonald's",
    location: "Farnborough, England",
    period: "Feb 2019 – Jan 2022",
    summary:
      "Part-time kitchen role completing orders quickly, efficiently, and to the highest standard in a fast-paced team environment.",
    highlights: [
      "Completed orders under time pressure while maintaining quality standards.",
      "Communicated and organised effectively within a large team to meet customer demand.",
      "Maintained high levels of cleanliness and workspace organisation.",
    ],
  },
  {
    title: "Sales Representative",
    organisation: "Clarks",
    location: "Ashford, England",
    period: "Jun 2021 – Aug 2021",
    summary:
      "Full-time sales role assisting customers through product fitting and selection while working towards personal sales targets.",
    highlights: [
      "Communicated with and guided customers to find the perfect products.",
      "Worked towards management-set sales targets in a customer-focused environment.",
    ],
  },
  {
    title: "Customer Assistant",
    organisation: "Asda",
    location: "Farnborough, England",
    period: "Apr 2017 – Oct 2018",
    summary:
      "Part-time retail role providing high levels of customer service and completing tasks collaboratively with the team.",
    highlights: [
      "Provided attentive customer service and fulfilled customer needs promptly.",
      "Collaborated with the team to complete tasks efficiently.",
    ],
  },
  {
    title: "Customer Assistant",
    organisation: "Marks and Spencer",
    location: "Surrey, England",
    period: "Dec 2016 – Jan 2017",
    summary:
      "Supported the clothing section during peak holiday season, assisting customers and ensuring stock availability in a fast-paced environment.",
    highlights: [
      "Assisted customers and organised displays during peak trading periods.",
      "Delivered friendly, efficient service to enhance the shopping experience.",
    ],
  },
];

export const skillsByGroup: SkillGroup[] = [
  {
    title: "Languages and fundamentals",
    summary:
      "A practical base in typed and object-oriented programming, with an emphasis on readability and maintainable structure.",
    skills: ["TypeScript", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend and product delivery",
    summary:
      "Modern frontend work focused on responsive interfaces, interaction polish, and maintainable component architecture.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Gatsby",
      "Responsive UI",
    ],
  },
  {
    title: "Backend, data, and integration",
    summary:
      "Experience wiring together app behaviour, data handling, and supporting services for end-to-end delivery.",
    skills: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "GraphQL",
      "React Email",
      "Resend",
    ],
  },
  {
    title: "Engineering practice",
    summary:
      "The habits that make codebases easier to trust, extend, and hand over to other engineers.",
    skills: [
      "JUnit",
      "Git",
      "Object-oriented design",
      "Testing",
      "Design principles",
      "Technical communication",
    ],
  },
];

export const contactConfig: ContactConfig = {
  email: "jamiecs@live.co.uk",
  cvHref: "/Jamie White CV.pdf",
  formIntro:
    "If you are hiring for an early-career engineering role, want to discuss one of the projects here, or would like a copy of my CV, I would be glad to hear from you.",
  availabilityNote:
    "I am currently open to software engineering opportunities in teams that value strong fundamentals, curiosity, and reliable delivery.",
  responseNote:
    "The fastest route is email, but you can also use the form and it will go directly to my inbox.",
  githubHref: "https://github.com/JWhite212",
  linkedInHref: "https://www.linkedin.com/in/jamie-white-swe/",
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: `mailto:${contactConfig.email}`,
    description: "Start a direct conversation.",
  },
  {
    label: "Download CV",
    href: contactConfig.cvHref,
    description: "Review the full experience summary.",
  },
  {
    label: "GitHub",
    href: contactConfig.githubHref,
    description: "Browse repositories and implementation work.",
    external: true,
  },
  {
    label: "LinkedIn",
    href: contactConfig.linkedInHref,
    description: "Professional profile and background.",
    external: true,
  },
];
