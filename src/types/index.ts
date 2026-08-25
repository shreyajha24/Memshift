export type ThemeMode = 'dark' | 'light';

export interface MemoryItem {
  id: string;
  title: string;
  source: string;
  sourceType: 'article' | 'video' | 'paper' | 'tweet' | 'note' | 'podcast' | 'website';
  savedAgo: string;
  excerpt: string;
  tags: string[];
  connections: string[]; // IDs of related memories
  contextNote?: string;
  confidenceScore?: number;
  highlightedPhrase?: string;
}

export interface ConnectionNode {
  id: string;
  label: string;
  category: 'core' | 'ai' | 'systems' | 'design' | 'cognition' | 'tools';
  x: number; // percentage or SVG coordinate
  y: number;
  description: string;
  connections: string[]; // Connected Node IDs
  contextBridge: Record<string, string>; // Connection description per target node ID
  color?: string;
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
