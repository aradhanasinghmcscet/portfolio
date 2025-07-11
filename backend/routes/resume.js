const express = require('express');
const router = express.Router();

// Resume data
const resumeData = {
  profile: {
    name: "Aradhana Singh",
    title: "UI/Frontend Technical Leader",
    summary: "Visionary UI/Frontend Technical Leader skilled in building design systems, optimizing performance, and driving team excellence. Currently focused on leveraging AI trends like generative UI, personalized content delivery, and intelligent user behavior analysis to enhance product value. Seeking to lead cross-functional teams in building smarter, data-informed frontend ecosystems.",
    location: "Bangalore, Karnataka",
    linkedin: "https://www.linkedin.com/in/aradhana-singh-903aa923/",
    github: "https://github.com/aradhanasinghmcscet",
    githubRepo: "https://github.com/aradhanasinghmcscet/AradhanaPortfolio"
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
      ]
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
          techStack: [
            "JavaScript",
            "Node.js",
            "CSS3",
            "PostgreSQL",
            "MongoDB",
            "Socket.io"
          ]
        },
        {
          name: "AIM Rail - Web Platform",
          description: [
            "End-to-end web application for rail operations",
            "Integrated modern UX practices",
            "Delivered highly responsive platform"
          ],
          techStack: [
            "JavaScript",
            "Bootstrap",
            "Material UI",
            "Node.js",
            "Express",
            "Electron",
            "Socket.io"
          ]
        }
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
        "Electron.js - Built desktop-grade applications with web stack and real-time capabilities"
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
};

// Get resume data
router.get('/', (req, res) => {
  res.json(resumeData);
});

module.exports = router;
