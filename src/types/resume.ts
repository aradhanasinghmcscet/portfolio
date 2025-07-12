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

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    summary: string;
    location: string;
    linkedin: string;
    github: string;
    githubRepo: string;
  };
  experience: Experience[];
  skills: Skill[];
  achievements: Achievement[];
  education: Education[];
}
