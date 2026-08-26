export type ThemeMode = 'dark' | 'light';

export interface MemoryItem {
  id: string;
  title: string;
  source: string;
  sourceType: 'video' | 'article' | 'reddit' | 'podcast' | 'note' | 'paper' | 'course';
  savedAgo: string;
  dateStr: string;
  excerpt: string;
  tags: string[];
  connections: string[]; // IDs of related memories
  contextNote?: string;
  confidenceScore?: number;
  highlightedPhrase?: string;
  encountersCount?: number;
  firstSeenDate?: string;
  url?: string;
}

export interface ConnectionNode {
  id: string;
  label: string;
  category: 'core' | 'backend' | 'systems' | 'performance' | 'security' | 'concept';
  x: number; // percentage coordinate
  y: number;
  description: string;
  encounters: string;
  connections: string[]; // Connected Node IDs
  contextBridge: Record<string, string>; // Plain human explanation of how they connect
  color?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  displayDate: string;
  concept: string;
  title: string;
  sourceType: 'video' | 'article' | 'reddit' | 'course';
  sourceName: string;
  durationOrLength: string;
  connectedTo: string[];
  summary: string;
  color: string;
}

export interface OriginTrackingItem {
  id: string;
  concept: string;
  firstFound: {
    platform: string;
    date: string;
    title: string;
    format: string;
  };
  encounters: {
    platform: string;
    date: string;
    title: string;
    note: string;
  }[];
  relatedConcepts: string[];
}

export interface SearchPreset {
  id: string;
  query: string;
  label: string;
  matchedMemoryIds: string[];
  explanation: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

