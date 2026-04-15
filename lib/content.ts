import portfolioPreview from "@/public/corpcomment.png";
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
  {
    slug: "meeting-mind",
    title: "Meeting Mind",
    summary:
      "A macOS daemon that auto-detects Microsoft Teams meetings, transcribes audio locally using faster-whisper, and produces structured meeting summaries via the Claude API.",
    role: "Solo developer",
    period: "2026",
    problem:
      "Manually taking notes during meetings is distracting and produces inconsistent records. Existing transcription tools require manual setup or send audio to external servers.",
    approach: [
      "Built a background macOS daemon that monitors for active Teams meetings using system APIs.",
      "Integrated faster-whisper for efficient local audio transcription, keeping all data on-device.",
      "Connected to the Claude API to produce structured summaries with action items from raw transcripts.",
    ],
    technicalDecisions: [
      {
        title: "Local-first transcription",
        detail:
          "Chose faster-whisper over cloud transcription APIs to keep meeting audio entirely on-device, addressing privacy concerns for sensitive business discussions.",
      },
      {
        title: "Claude API for summarisation",
        detail:
          "Used Claude to extract structured summaries, action items, and key decisions from raw transcripts, producing more useful output than simple transcription alone.",
      },
    ],
    stack: ["Python", "Claude API", "faster-whisper", "macOS", "Daemon"],
    outcome: [
      "Fully automated meeting transcription and summarisation pipeline.",
      "All audio processing happens locally, preserving meeting confidentiality.",
      "Structured output includes action items, decisions, and attendee contributions.",
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
        src: portfolioPreview,
        alt: "Meeting Mind application overview",
        caption:
          "Meeting Mind — automated meeting transcription and summarisation.",
      },
    ],
    featured: false,
    githubUrl: "https://github.com/JWhite212/meeting-mind",
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
