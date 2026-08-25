import { MemoryItem, ConnectionNode, SearchPreset, FAQItem } from '../types';

export const mockMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Autonomous Agent Loops: Cognitive Architectures Beyond ReAct',
    source: 'arxiv.org/abs/2403.0892',
    sourceType: 'paper',
    savedAgo: '12 days ago',
    excerpt: 'Examining long-term associative memory structures vs episodic buffers in multi-agent collaboration systems.',
    tags: ['AI Agents', 'Memory', 'Cognition'],
    connections: ['mem-2', 'mem-3', 'mem-5'],
    contextNote: 'Saved while reading on tablet after seeing a discussion about persistent context windows.',
    confidenceScore: 98,
    highlightedPhrase: 'Memory is not just storage; it is active associative synthesis across temporal horizons.'
  },
  {
    id: 'mem-2',
    title: 'Vector Databases vs Graph Memory: The Latent Space Dilemma',
    source: 'latent.space/podcast/ep-84',
    sourceType: 'podcast',
    savedAgo: '18 days ago',
    excerpt: 'Cosine distance captures semantic similarity, but knowledge graphs capture explicit relational causality.',
    tags: ['Vector DB', 'RAG', 'Knowledge Graphs'],
    connections: ['mem-1', 'mem-4', 'mem-6'],
    contextNote: 'Bookmarked during commute; timestamp 24:18 on hybrid retrieval mechanisms.',
    confidenceScore: 94,
    highlightedPhrase: 'Hybrid search combines lexical accuracy with dense associative embeddings.'
  },
  {
    id: 'mem-3',
    title: 'Building Unbreakable Agent Workflows in Production',
    source: 'blog.langchain.dev/production-agents',
    sourceType: 'article',
    savedAgo: '5 days ago',
    excerpt: 'State machines, human-in-the-loop checkpoints, and deterministic fallback loops for enterprise agents.',
    tags: ['Agent Workflows', 'AI Agents', 'Systems'],
    connections: ['mem-1', 'mem-5', 'mem-7'],
    contextNote: 'Saved from Twitter thread breakdown during late night research session.',
    confidenceScore: 91,
    highlightedPhrase: 'Deterministic state graphs prevent infinite execution loops in tool-calling agents.'
  },
  {
    id: 'mem-4',
    title: 'RAG Architecture: Hierarchical Indexing & Context Pruning',
    source: 'towardsdatascience.com/hierarchical-rag',
    sourceType: 'article',
    savedAgo: '3 weeks ago',
    excerpt: 'Chunking strategies degrade without parent-child document mapping and dynamic reranking.',
    tags: ['RAG', 'Vector DB', 'Retrieval'],
    connections: ['mem-2', 'mem-1', 'mem-7'],
    contextNote: 'Found via Hacker News frontpage discussion on LLM context degradation.',
    confidenceScore: 89,
    highlightedPhrase: 'Small-to-large chunk mapping preserves localized nuance alongside macro context.'
  },
  {
    id: 'mem-5',
    title: 'Startup Thesis: The Internet Memory Layer Gap',
    source: 'Personal Quick Note',
    sourceType: 'note',
    savedAgo: 'Yesterday',
    excerpt: 'People save 40x more content than they can recall. The bottleneck is not curation, it is semantic rediscovery.',
    tags: ['Startup Research', 'Cognition', 'Product'],
    connections: ['mem-1', 'mem-3', 'mem-6'],
    contextNote: 'Captured directly via MemShift ambient shortcut while browsing 20 open tabs.',
    confidenceScore: 96,
    highlightedPhrase: 'Bookmarks store dead URLs; human memory needs associative cues and context.'
  },
  {
    id: 'mem-6',
    title: 'Designing Minimal Interfaces for Complex Knowledge Tools',
    source: 'subconscious.substack.com/composable-thought',
    sourceType: 'article',
    savedAgo: '1 month ago',
    excerpt: 'Tools for thought fail when they demand excessive manual tagging. Friction kills the capture habit.',
    tags: ['Design', 'Tools for Thought', 'Cognition'],
    connections: ['mem-5', 'mem-2'],
    contextNote: 'Highlighted sentence on spatial layout vs linear feeds.',
    confidenceScore: 88,
    highlightedPhrase: 'The ideal tool is ambient: zero taxonomy upfront, emergent synthesis later.'
  },
  {
    id: 'mem-7',
    title: 'Local LLMs & On-Device Vector Search Optimization',
    source: 'github.com/ggerganov/llama.cpp/discussions',
    sourceType: 'website',
    savedAgo: '8 days ago',
    excerpt: 'Quantized embedding models running directly in WebAssembly for zero-latency local retrieval.',
    tags: ['Local Models', 'Vector DB', 'Systems'],
    connections: ['mem-3', 'mem-4', 'mem-1'],
    contextNote: 'Starred repository during weekend prototype tinkering.',
    confidenceScore: 85,
    highlightedPhrase: 'Sub-10ms similarity queries directly inside browser memory.'
  }
];

export const mockConnectionNodes: ConnectionNode[] = [
  {
    id: 'node-agents',
    label: 'AI Agents',
    category: 'ai',
    x: 50,
    y: 35,
    description: 'Autonomous reasoning loops, multi-agent frameworks, and persistent memory buffers.',
    connections: ['node-rag', 'node-vector', 'node-workflows', 'node-cognition'],
    contextBridge: {
      'node-rag': 'Agents query RAG stores to ground dynamic tool decisions in retrieved context.',
      'node-vector': 'Vector embeddings provide associative long-term memory for agent states.',
      'node-workflows': 'Structured workflows constrain non-deterministic agent tool execution.',
      'node-cognition': 'Agent architectures mirror biological working memory & cognitive reflection.'
    },
    color: '#06b6d4'
  },
  {
    id: 'node-rag',
    label: 'RAG Architecture',
    category: 'systems',
    x: 25,
    y: 50,
    description: 'Hierarchical chunking, parent-child retrieval, and dynamic context injection.',
    connections: ['node-agents', 'node-vector', 'node-startup'],
    contextBridge: {
      'node-agents': 'Provides accurate domain knowledge to prevent hallucinations during agent runs.',
      'node-vector': 'Relies on dense vector indices for semantic candidate retrieval.',
      'node-startup': 'RAG infrastructure is commoditizing into core application memory stacks.'
    },
    color: '#3b82f6'
  },
  {
    id: 'node-vector',
    label: 'Vector Databases',
    category: 'systems',
    x: 35,
    y: 75,
    description: 'High-dimensional embedding spaces, HNSW indexing, and hybrid lexical search.',
    connections: ['node-agents', 'node-rag', 'node-workflows', 'node-startup'],
    contextBridge: {
      'node-agents': 'Powers semantic memory recall across disparate user sessions.',
      'node-rag': 'Acts as the physical index layer for document chunk embeddings.',
      'node-workflows': 'Persists workflow states and previous query results.',
      'node-startup': 'High valuation compression shifting focus to contextual application layers.'
    },
    color: '#8b5cf6'
  },
  {
    id: 'node-workflows',
    label: 'Agent Workflows',
    category: 'ai',
    x: 75,
    y: 55,
    description: 'Deterministic graphs, checkpointing, human verification, and error recovery.',
    connections: ['node-agents', 'node-vector', 'node-cognition'],
    contextBridge: {
      'node-agents': 'Prevents unconstrained hallucination loops in production environments.',
      'node-vector': 'Maintains stateful checkpoint memory in persistent stores.',
      'node-cognition': 'Implements systematic deliberation akin to System 2 cognitive processing.'
    },
    color: '#10b981'
  },
  {
    id: 'node-startup',
    label: 'Startup Research',
    category: 'core',
    x: 20,
    y: 20,
    description: 'Market dynamics, browser extension adoption, and knowledge capture tools.',
    connections: ['node-rag', 'node-vector', 'node-cognition'],
    contextBridge: {
      'node-rag': 'Analyzing market need for turnkey retrieval solutions vs raw infrastructure.',
      'node-vector': 'Mapping database landscape and pricing models.',
      'node-cognition': 'Unlocking human memory augmentation as the next major software category.'
    },
    color: '#f59e0b'
  },
  {
    id: 'node-cognition',
    label: 'Cognitive Loops',
    category: 'cognition',
    x: 80,
    y: 25,
    description: 'Human memory mechanisms, associative priming, and cognitive load reduction.',
    connections: ['node-agents', 'node-workflows', 'node-startup'],
    contextBridge: {
      'node-agents': 'Applying psychological models of working memory to synthetic agents.',
      'node-workflows': 'Designing software pacing that matches human attention cycles.',
      'node-startup': 'The ultimate moat is augmenting natural human associative recall.'
    },
    color: '#ec4899'
  }
];

export const mockSearchPresets: SearchPreset[] = [
  {
    id: 'preset-1',
    query: 'That article I saw about AI agents',
    label: 'AI Agents & Memory',
    matchedMemoryIds: ['mem-1', 'mem-3'],
    explanation: 'Matched "Autonomous Agent Loops" (saved 12 days ago) and "Building Unbreakable Workflows" (5 days ago) based on semantic proximity to agent cognitive loops.'
  },
  {
    id: 'preset-2',
    query: 'Where did I read about vector databases?',
    label: 'Vector DBs vs RAG',
    matchedMemoryIds: ['mem-2', 'mem-4', 'mem-7'],
    explanation: 'Matched podcast note on Latent Space (18 days ago) and Hierarchical RAG guide (3 weeks ago) with cross-link to local WebAssembly search.'
  },
  {
    id: 'preset-3',
    query: 'Something I saved about startups',
    label: 'Startup Research & Theses',
    matchedMemoryIds: ['mem-5', 'mem-6'],
    explanation: 'Matched personal quick note "The Internet Memory Layer Gap" (saved yesterday) and essay on minimal knowledge tools.'
  },
  {
    id: 'preset-4',
    query: 'That diagram about cognitive architectures',
    label: 'Cognitive Loops',
    matchedMemoryIds: ['mem-1', 'mem-6'],
    explanation: 'Matched paper on associative memory structures and Subconscious essay on composable thought.'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is MemShift?',
    answer: 'MemShift is a personal memory layer for the internet that helps you rediscover and connect things you\'ve encountered online. Rather than letting saved tabs and bookmarks vanish into forgotten folders, MemShift continuously organizes context so you can recall ideas by thought, topic, or natural curiosity.'
  },
  {
    id: 'faq-2',
    question: 'Is MemShift another bookmarking app?',
    answer: 'No. The goal is not simply to store links. Bookmarks store static URLs that decay and lack meaning. MemShift focuses on helping you remember the context, insights, and organic connections between what you discover over time.'
  },
  {
    id: 'faq-3',
    question: 'Does MemShift use AI?',
    answer: 'The product is designed around intelligent organization and retrieval of your internet memories. It utilizes lightweight local semantic models to understand relationships between your discoveries without requiring tedious manual folders, tags, or hierarchies.'
  },
  {
    id: 'faq-4',
    question: 'When can I use MemShift?',
    answer: 'MemShift is currently being prepared for private beta launch. Early access is rolled out in cohorts to waitlist members. Join the waitlist above to claim your spot and receive early preview builds.'
  },
  {
    id: 'faq-5',
    question: 'How is my private reading and browsing data protected?',
    answer: 'MemShift adheres to a privacy-first ethos. Your indexed memories are end-to-end encrypted and belong strictly to you. We never train public foundation models on your private memory graph.'
  },
  {
    id: 'faq-6',
    question: 'Does MemShift work across my browser, mobile, and desktop?',
    answer: 'Yes. MemShift syncs seamlessly via a lightweight browser companion, mobile sharing extension, and native desktop ambient overlay (⌘K / Ctrl+K) for instant instant recall from anywhere on your machine.'
  }
];
