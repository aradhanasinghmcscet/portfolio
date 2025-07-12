export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category?: string;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  averageTime: string;
  pageViews: Record<string, number>;
}
