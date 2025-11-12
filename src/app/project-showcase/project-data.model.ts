export interface Chapter {
  id: number;
  title: string;
  content: string;
  image?: string;
  code?: string;
  metrics?: MetricData[];
  color: string;
}

export interface MetricData {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectShowcaseData {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  videoUrl: string;
  badge?: string; // e.g., "NEW PROJECT", "FEATURED", etc.
  chapters: Chapter[];
}
