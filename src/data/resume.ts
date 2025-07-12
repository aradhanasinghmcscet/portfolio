export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  techStack?: string[];
  projects?: {
    name: string;
    description: string[];
    techStack: string[];
  }[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  category: string;
  technologies: string[];
}

export interface Achievement {
  title: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export const resumeData: {
  profile: {
    name: string;
    title: string;
    summary: string;
    location: string;
    linkedin: string;
    github: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  education: Education[];
} = {
  profile: {
    name: "Aradhana Singh",
    title: "UI/Frontend Technical Leader",
    summary: "Visionary UI/Frontend Technical Leader skilled in building design systems, optimizing performance, and driving team excellence. Currently focused on leveraging AI trends like generative UI, personalized content delivery, and intelligent user behavior analysis to enhance product value. Seeking to lead cross-functional teams in building smarter, data-informed frontend ecosystems.",
    location: "Bangalore, Karnataka",
    linkedin: "https://www.linkedin.com/in/aradhana-singh-903aa923/",
    github: "https://github.com/aradhanasinghmcscet"
  },
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
      ],
      techStack: [
        "ReactJS",
        "Spring Boot",
        "Python",
        "Cypress",
        "Splunk",
        "Adobe Analytics"
      ],
    },
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
      ],
      projects: [
        {
          name: "Muse - Airport Project",
          description: [
            "Full-stack development and modernization of airport operations platform",
            "Implemented real-time flight tracking and passenger management",
            "Optimized system performance and reduced latency"
          ],
          techStack: ["React", "Node.js", "MongoDB", "AWS"]
        },
        {
          name: "Flight Operations System",
          description: [
            "Developed real-time flight monitoring and analytics",
            "Implemented predictive maintenance features",
            "Enhanced user experience with modern UI components"
          ],
          techStack: [
            "ReactJS",
            "React Bootstrap",
            "Material UI",
            "Node.js",
            "Express",
            "Electron",
            "Socket.io"
          ]
        }
      ],
    },
    {
      company: "Wipro Pvt. Ltd.",
      position: "UI Technical Lead Developer",
      duration: "June 2018 - April 2020",
      location: "Bangalore",
      description: [
        "Conducted user research and developed user personas",
        "Designed user flows, wireframes, and prototypes for award-winning mobile apps",
        "Worked closely with development team to ensure accurate implementation"
      ],
      techStack: [
        "ReactJS",
        "Material UI",
        "React Bootstrap",
        "Jules",
        "Zeplin",
        "Photoshop"
      ]
    },
    {
      company: "IBM India Pvt Ltd",
      position: "Senior UI Developer",
      duration: "April 2013 - April 2018",
      location: "Bangalore",
      description: [
        "Working directly with customers to establish project scope and timelines",
        "Developed advanced UI frameworks for web applications",
        "Established design patterns for rapid prototyping",
        "Recommended and implemented UI best practices",
        "Published article on Angular Integration with Hybris"
      ],
      techStack: [
        "ReactJS",
        "Angular 7",
        "Hybris UI/WCMS",
        "GruntJS",
        "Bootstrap",
        "HTML5",
        "CSS3",
        "JavaScript"
      ]
    },
    {
      company: "Microsoft (Payroll Company - Affluent)",
      position: "UI Front-End Developer",
      duration: "October 2012 - April 2013",
      location: "Bangalore",
      description: [
        "Developed Win8 Metro applications using Visual Studio, XAML, CRM, HTML5, JavaScript, jQuery"
      ],
      techStack: [
        "Win8 Metro",
        "Visual Studio",
        "XAML",
        "CRM",
        "HTML5",
        "JavaScript",
        "jQuery"
      ]
    },
    {
      company: "AON Hewitt",
      position: "UI Developer",
      duration: "September 2011 - May 2012",
      location: "Bangalore",
      description: [
        "Designed YBR, Gateway, Nucleus web products for system and mobile applications",
        "Worked with HTML, CSS, JavaScript, jQuery, advanced JavaScript"
      ],
      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery"
      ]
    },
    {
      company: "Aequor Information Technology",
      position: "Software Engineer",
      duration: "May 2010 - June 2011",
      location: "Bangalore",
      description: [
        "Learned and worked on HTML, CSS, JavaScript, jQuery, .Net and Java Struts framework"
      ],
      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        ".NET",
        "Java Struts"
      ]
    }
  ],
  projects: [
    {
      title: "Muse - Airport Project",
      description: "Full-stack development and modernization of airport operations platform",
      technologies: ["JavaScript", "Node.js", "CSS3", "PostgreSQL", "MongoDB", "Socket.io"],
      achievements: [
        "Implemented real-time capabilities using Socket.io",
        "Led frontend modernization efforts",
        "Optimized backend with Express and MongoDB"
      ]
    },
    {
      title: "AIM Rail - Web Platform",
      description: "End-to-end web application for rail operations",
      technologies: ["JavaScript", "Bootstrap", "Material UI", "Node.js", "Express", "Electron", "Socket.io"],
      achievements: [
        "Complete ownership of development lifecycle",
        "Integrated modern UX practices",
        "Delivered highly responsive platform"
      ]
    },
    {
      title: "AOA Business Lending Platform",
      description: "Modernization of enterprise-grade lending application",
      technologies: ["JavaScript", "Spring Boot", "Python", "Cypress", "Splunk", "Adobe Analytics"],
      achievements: [
        "Successful legacy system migration",
        "Implemented data analytics integration",
        "Enhanced user experience with AI capabilities"
      ]
    },
    {
      title: "Home Lending Platform",
      description: "Enterprise-grade platform for home loan processing and management",
      technologies: ["JavaScript", "Spring Boot", "Python", "Cypress", "Splunk", "Adobe Analytics"],
      achievements: [
        "Modernized legacy home loan processing system",
        "Implemented AI-driven loan eligibility assessment",
        "Enhanced customer experience with personalized dashboards",
        "Integrated with multiple banking systems",
        "Implemented real-time loan status tracking"
      ]
    },
    {
      title: "HPE B2B E-commerce Platform",
      description: "Enterprise-grade B2B e-commerce platform for HPE",
      technologies: ["Hybris WCMS", "JavaScript (ES6)", "TypeScript", "jQuery", "Spring Boot", "Java", "REST API", "SAP Integration"],
      achievements: [
        "Developed complex B2B e-commerce solution using Hybris",
        "Implemented multi-vendor marketplace functionality",
        "Integrated with SAP backend systems",
        "Developed custom extensions for Hybris",
        "Implemented advanced product configuration",
        "Optimized performance for high-traffic scenarios",
        "Developed comprehensive order management system"
      ]
    },
    {
      title: "HPE B2C E-commerce Platform",
      description: "Consumer-facing e-commerce platform for HPE",
      technologies: ["Hybris WCMS", "JavaScript (ES6)", "TypeScript", "jQuery", "Spring Boot", "Java", "REST API", "SAP Integration"],
      achievements: [
        "Developed responsive consumer e-commerce platform",
        "Implemented personalized shopping experience",
        "Integrated with multiple payment gateways",
        "Developed product recommendation engine",
        "Implemented real-time inventory management",
        "Optimized for mobile devices",
        "Developed multi-language support"
      ]
    },
    {
      title: "Telstra Digital Platform",
      description: "Modern digital platform for Telstra's customer engagement",
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
      ]
    },
    {
      title: "Maplin UK E-commerce Platform",
      description: "Modern e-commerce platform for Maplin UK's electronics retail",
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
      description: "Digital transformation platform for Finnish postal services",
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
        "Tortoise Git",
        "Bitbucket",
        "Bamboo",
        "JIRA",
        "ServiceNow",
        "Fortie Client",
        "Pulse",
        "Chrome Dev Tools",
        "Firebug"
      ]
    },
    {
      category: "Operating Systems",
      technologies: [
        "Windows",
        "Linux"
      ]
    },
    {
      category: "Methodologies",
      technologies: [
        "Agile Methodology",
        "SCRUM",
        "Sprint planning",
        "UI Integration"
      ]
    }
  ],

  achievements: [
    {
      title: "Professional",
      items: [
        "Guest Speaker at Government Polytechnic College, UP",
        "2× Star Performer award at Collins Aerospace",
        "Certified in HackerRank Problem Solving",
        "Generative AI Trained",
        "Certified Product Business Fundamentals",
        "Cyber Security Fundamentals certificate",
        "Filed 2 patents on Airport tracking process system",
        "2nd place winner in JPMC Global Hackathon 2024 (UK)",
        "Published article: Angular Integration with Hybris",
        "Active participant in Bangalore tech meetups",
        "Published code on GitHub"
      ]
    },
    {
      title: "Technical",
      items: [
        "Consistent Performer",
        "Capability to deliver high quality code and UI",
        "Strong debugging skills",
        "Published article on CodeProject",
        "Active GitHub contributor"
      ]
    }
  ],
  education: [
    {
      institution: "APJ Abdul Kalam University",
      degree: "B.Tech (IT)",
      duration: "2009",
      location: "Lucknow"
    }
  ]
} as const;
