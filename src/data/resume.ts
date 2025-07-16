export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: readonly string[];
  techStack?: readonly string[];
  projects?: readonly {
    name: string;
    description: readonly string[];
    techStack: readonly string[];
  }[];
}

export interface Project {
  title: string;
  description: string;
  technologies: readonly string[];
  achievements: readonly string[];
  image?: string;
  demo?: string;
  github?: string;
}

export interface Skill {
  category: string;
  technologies: readonly string[];
}

export interface Achievement {
  title: string;
  items: readonly string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export const resumeData = {
  profile: {
    name: "Aradhana Singh",
    title: "UI/Frontend Technical Leader",
    summary: "Visionary UI/Frontend Technical Leader skilled in building design systems, optimizing performance, and driving team excellence. Currently focused on leveraging AI trends like generative UI, personalized content delivery, and intelligent user behavior analysis to enhance product value. Seeking to lead cross-functional teams in building smarter, data-informed frontend ecosystems.",
    location: "Bangalore",
    linkedin: "https://linkedin.com/in/aradhana-singh",
    github: "https://github.com/aradhanasinghmcscet"
  } as const,
  experience: [
    {
      company: "JPMorgan Chase & Co.",
      position: "AVP",
      duration: "April 2023 - Present",
      location: "Bangalore",
      description: [
        "Accomplished UI/Frontend Technical Development with a proven track record in leading end-to-end modernization of enterprise-grade lending applications",
        "Spearheaded digital transformation efforts, migrating legacy systems to modern architectures using ReactJS, Spring Boot, Python, Cypress, and data analytics tools like Splunk and Adobe Analytics",
        "Adept at managing cross-functional teams, driving Agile delivery, and integrating emerging AI capabilities",
        "Recognized as 2nd place winner in the JPMC Global Hackathon 2024 (UK)",
        "Led digital transformation of enterprise-grade lending applications",
        "Successfully migrated legacy systems to modern architectures"
      ] as const,
      techStack: [
        "ReactJS",
        "Spring Boot",
        "Python",
        "Cypress",
        "Splunk",
        "Adobe Analytics"
      ] as const
    } as const,
    {
      company: "Collins Aerospace",
      position: "Senior Lead Software Engineer",
      duration: "April 2020 - February 2023",
      location: "Bangalore",
      description: [
        "Led frontend development and architecture decisions",
        "Mentored junior developers",
        "Implemented design systems and UI components",
        "Optimized frontend performance and scalability",
        "Collaborated with cross-functional teams"
      ] as const,
      projects: [
        {
          name: "Muse - Airport Project",
          description: [
            "Full-stack development and modernization of airport operations platform",
            "Implemented real-time flight tracking and passenger management",
            "Optimized system performance and reduced latency"
          ] as const,
          techStack: ["React", "Node.js", "MongoDB", "AWS"] as const
        } as const,
        {
          name: "Flight Operations System",
          description: [
            "Developed real-time flight monitoring and analytics",
            "Implemented predictive maintenance features",
            "Enhanced user experience with modern UI components"
          ] as const,
          techStack: [
            "ReactJS",
            "React Bootstrap",
            "Material UI",
            "Node.js",
            "Express",
            "Electron",
            "Socket.io"
          ] as const
        } as const
      ] as const
    } as const,
    {
      company: "Wipro Pvt. Ltd.",
      position: "UI Technical Lead Developer",
      duration: "June 2018 - April 2020",
      location: "Bangalore",
      description: [
        "Conducted user research and developed user personas",
        "Designed user flows, wireframes, and prototypes for award-winning mobile apps",
        "Worked closely with development team to ensure accurate implementation"
      ] as const,
      techStack: [
        "ReactJS",
        "Material UI",
        "React Bootstrap",
        "Jules",
        "Zeplin",
        "Photoshop"
      ] as const
    } as const,
    {
      company: "Aequor Information Technology",
      position: "Software Engineer",
      duration: "May 2010 - June 2011",
      location: "Bangalore",
      description: [
        "Developed and maintained web applications using HTML5, CSS3, and JavaScript",
        "Implemented responsive design patterns",
        "Optimized website performance",
        "Collaborated with designers and back-end developers"
      ] as const,
      techStack: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Bootstrap",
        "Photoshop"
      ] as const
    } as const
  ] as const,
  projects: [
    {
      title: "Muse - Airport Project",
      description: [
        "Full-stack development and modernization of airport operations platform"
      ] as const,
      technologies: ["JavaScript", "Node.js", "CSS3", "PostgreSQL", "MongoDB", "Socket.io"] as const,
      achievements: [
        "Reduced system latency by 40% through optimized database queries",
        "Implemented real-time passenger tracking system",
        "Developed responsive UI for multiple devices"
      ] as const
    } as const,
    {
      title: "Itella Posti Finland Digital Platform",
      description: [
        "Digital transformation platform for Finnish postal services"
      ] as const,
      technologies: ["Angular", "TypeScript", "Bootstrap", "jQuery", "SASS", "Azure Cloud", "Docker", "Kubernetes", "GraphQL"] as const,
      achievements: [
        "Reduced delivery time by 25% through optimized route planning",
        "Improved customer satisfaction scores by 30%",
        "Successfully migrated legacy system to cloud infrastructure"
      ] as const
    } as const,
    {
      title: "Business & Home Lending Platform",
      description: [
        "Enterprise-grade platform for home loan processing and management"
      ] as const,
      technologies: ["JavaScript", "Spring Boot", "Python", "Cypress", "Splunk", "Adobe Analytics"] as const,
      achievements: [
        "Modernized legacy Business and Home loan processing system",
        "Implemented AI-driven loan eligibility assessment",
        "Enhanced customer experience with personalized dashboards",
        "Integrated with multiple banking systems",
        "Implemented real-time loan status tracking"
      ] as const
    } as const,
    {
      title: "HPE B2B E-commerce Platform",
      description: [
        "Enterprise-grade B2B e-commerce platform for HPE"
      ] as const,
      technologies: ["Hybris WCMS", "JavaScript (ES6)", "TypeScript", "jQuery", "Spring Boot", "Java", "REST API", "SAP Integration"] as const,
      achievements: [
        "Developed complex B2B e-commerce solution using Hybris",
        "Implemented multi-vendor marketplace functionality",
        "Integrated with SAP backend systems",
        "Developed custom extensions for Hybris",
        "Implemented advanced product configuration",
        "Optimized performance for high-traffic scenarios",
        "Developed comprehensive order management system"
      ] as const
    } as const,
    {
      title: "HPE B2C E-commerce Platform",
      description: [
        "Consumer-facing e-commerce platform for HPE"
      ] as const,
      technologies: ["Hybris WCMS", "JavaScript (ES6)", "TypeScript", "jQuery", "Spring Boot", "Java", "REST API", "SAP Integration"] as const,
      achievements: [
        "Developed responsive consumer e-commerce platform",
        "Implemented personalized shopping experience",
        "Integrated with marketing automation tools",
        "Enhanced SEO and performance optimization",
        "Implemented A/B testing framework"
      ] as const
    } as const,
    {
      title: "Telstra Digital Platform",
      description: [
        "Modern digital platform for Telstra's customer engagement"
      ] as const,
      technologies: ["React", "Redux", "Redux Toolkit", "TypeScript", "Next.js", "Tailwind CSS", "Material-UI", "Framer Motion", "Storybook", "Jest", "Cypress"],
      achievements: [
        "Built scalable React components and design system",
        "Implemented Redux state management with TypeScript",
        "Developed responsive layouts using Tailwind CSS",
        "Created interactive UI with Framer Motion",
        "Implemented comprehensive testing suite",
        "Built reusable UI components with Storybook",
        "Optimized performance for mobile devices",
        "Implemented dark/light theme support",
        "Developed real-time dashboard components",
        "Integrated with REST APIs"
      ] as const
    } as const,
    {
      title: "Maplin UK E-commerce Platform",
      description: [
        "Modern e-commerce platform for Maplin UK's electronics retail"
      ] as const,
      technologies: ["Angular", "TypeScript", "Bootstrap", "jQuery", "SASS", "Stripe API", "AWS", "Docker", "Kubernetes"],
      achievements: [
        "Developed responsive e-commerce platform",
        "Implemented product catalog with advanced filtering",
        "Integrated Stripe payment gateway",
        "Built real-time inventory tracking",
        "Implemented personalized product recommendations",
        "Optimized for mobile-first approach",
        "Developed order management system",
        "Implemented SEO best practices",
        "Built analytics dashboard",
        "Integrated with AWS services"
      ]
    },
    {
      title: "Itella Posti Finland Digital Platform",
      description: [
        "Digital transformation platform for Finnish postal services"
      ] as const,
      technologies: ["Angular", "TypeScript", "Bootstrap", "jQuery", "SASS", "Azure Cloud", "Docker", "Kubernetes", "GraphQL"],
      achievements: [
        "Developed modern digital postal platform",
        "Implemented real-time package tracking",
        "Built postal service management system",
        "Integrated with Azure Cloud services",
        "Developed customer portal",
        "Implemented postal rate calculator",
        "Built package tracking dashboard",
        "Integrated with IoT devices",
        "Developed mobile-responsive interfaces",
        "Implemented automated testing suite"
      ]
    }
  ],
  skills: [
    {
      category: "UI/UX Development",
      technologies: [
        "AI Tools: Copilot, Codeium, Windsurf, ChatGPT, Generative AI",
        "User research",
        "Usability testing",
        "Project management",
        "React, Redux, Other UI Technologies (Expert)",
        "ReactJS (Expert) - Deep understanding of Hooks, Context API, component architecture, state management, performance tuning",
        "JavaScript (ES6+) / JSX - Expert in writing modular, reusable, efficient code",
        "HTML5 & CSS3 - Semantic markup, responsive design, Flexbox/Grid, SCSS",
        "Node.js & Express.js - Strong backend capabilities",
        "Agile Delivery & Frontend Architecture - Led frontend strategy and architecture in large-scale digital transformation projects",
        "Cypress - UI automation and E2E testing in production-grade systems",
        "Material UI / React Bootstrap / Jules (Design Systems) - Proficient in component libraries and theming for consistent UX",
        "Socket.IO - Implemented real-time features like live updates and communication layers in apps",
        "MongoDB & PostgreSQL - Hands-on with full-stack integration, CRUD operations, schema design for dynamic data layers",
        "Electron.js - Built desktop-grade applications with web stack and real-time capabilities",
        "Splunk & Adobe Analytics - Used for monitoring, logging, and user behavior analysis in production systems",
        "Digi Tools / Ombre - Internal tooling for enterprise-grade UI integration, accessibility, and data visualization"
      ]
    },
    {
      category: "Frontend Technologies",
      technologies: [
        "ReactJS",
        "HTML5",
        "CSS",
        "JavaScript",
        "jQuery",
        "AJAX",
        "Sass",
        "Less Preprocessors",
        "TypeScript"
      ]
    },
    {
      category: "Backend Technologies",
      technologies: [
        "Node.js",
        "Express.js",
        "Spring Boot",
        ".NET",
        "Python",
        "StellarJS",
        "React SSR",
        "NEXTJS"
      ]
    },
    {
      category: "Database & Tools",
      technologies: [
        "SQL Server",
        "MySQL",
        "MongoDB",
        "RWD",
        "Bootstrap",
        "Handlebar"
      ]
    },
    {
      category: "Development Tools",
      technologies: [
        "Eclipse",
        "VS Code",
        "Photoshop",
        "Zeplin",
        "Dreamweaver",
        "SourceTree",
        "Git",
        "Tortoise Git"
      ] as const
    } as const,
  ] as const,
  achievements: [
    {
      title: "Performance Optimization",
      items: [
        "Reduced page load time by 60% through code splitting and lazy loading",
        "Implemented PWA features for offline support and faster loading"
      ] as const
    } as const,
    {
      title: "Professional",
      items: [
        "Guest Speaker at Government Polytechnic College, UP",
        "2× Star Performer award at Collins Aerospace",
        "Certified in HackerRank Problem Solving",
        "Generative AI Trained",
        "Certified Product Business Fundamentals",
        "Cyber Security Fundamentals certificate",
        "Filed 2 patents on Airport tracking process system"
      ] as const
    } as const,
    {
      title: "Team Leadership",
      items: [
        "Mentored 15+ junior developers",
        "Led cross-functional teams of 20+ members",
        "Implemented agile methodologies across teams"
      ] as const
    } as const
  ] as const,
  education: [
    {
      institution: "Manipal University Jaipur",
      degree: "B.Tech Computer Science",
      duration: "2017 - 2021",
      location: "Jaipur"
    } as const
  ] as const
} as const;
