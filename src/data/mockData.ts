import { MemoryItem, ConnectionNode, SearchPreset, FAQItem, TimelineEvent, OriginTrackingItem } from '../types';

export const mockMemories: MemoryItem[] = [
  {
    id: 'mem-redis',
    title: 'Redis Explained in 10 Minutes',
    source: 'YouTube • Fireship / Backend Deepdive',
    sourceType: 'video',
    savedAgo: '3 weeks ago',
    dateStr: 'August 3, 2026',
    excerpt: 'In-memory key-value store architecture, data structures, and how sub-millisecond lookups speed up applications.',
    tags: ['Redis', 'Caching', 'Performance'],
    connections: ['mem-caching', 'mem-db', 'mem-system-design'],
    contextNote: 'Watched while Sarah started learning how backend web servers handle heavy traffic.',
    confidenceScore: 99,
    highlightedPhrase: 'Redis keeps data in RAM, making it thousands of times faster than disk-based lookups.',
    encountersCount: 4,
    firstSeenDate: 'Aug 3, 2026',
    url: 'https://youtube.com/watch?v=redis-explained'
  },
  {
    id: 'mem-caching',
    title: 'How Caching Improves Application Performance',
    source: 'Engineering Blog • web-scale.io',
    sourceType: 'article',
    savedAgo: '2 weeks ago',
    dateStr: 'August 8, 2026',
    excerpt: 'Cache invalidation strategies, TTL expiry, and how keeping hot data close to the CPU prevents database crashes.',
    tags: ['Caching', 'Databases', 'Performance'],
    connections: ['mem-redis', 'mem-db'],
    contextNote: 'Read during lunch break after encountering slow API responses.',
    confidenceScore: 96,
    highlightedPhrase: 'The fastest database query is the one you never had to make.',
    encountersCount: 6,
    firstSeenDate: 'Aug 8, 2026',
    url: 'https://web-scale.io/caching-fundamentals'
  },
  {
    id: 'mem-db',
    title: 'Database Optimization: Keeping Queries Fast Under Load',
    source: 'Database Weekly Newsletter',
    sourceType: 'article',
    savedAgo: '10 days ago',
    dateStr: 'August 16, 2026',
    excerpt: 'Index tuning, connection pooling, and how read-through caches relieve query pressure.',
    tags: ['Databases', 'Performance', 'Redis'],
    connections: ['mem-caching', 'mem-system-design'],
    contextNote: 'Saved while researching indexing patterns for relational databases.',
    confidenceScore: 94,
    highlightedPhrase: 'Pairing relational databases with an in-memory layer delivers 99th percentile stability.',
    encountersCount: 3,
    firstSeenDate: 'Aug 16, 2026',
    url: 'https://databaseweekly.com/optimization-guide'
  },
  {
    id: 'mem-system-design',
    title: 'System Design: Scaling to 1 Million Users',
    source: 'Interactive Architecture Course',
    sourceType: 'course',
    savedAgo: '4 days ago',
    dateStr: 'August 22, 2026',
    excerpt: 'Load balancers, distributed caching nodes, database replication, and asynchronous job workers.',
    tags: ['System Design', 'Redis', 'Caching', 'Databases'],
    connections: ['mem-redis', 'mem-caching', 'mem-db'],
    contextNote: 'Reviewed in preparation for backend engineering mock interviews.',
    confidenceScore: 97,
    highlightedPhrase: 'A single cache layer can absorb up to 90% of read traffic before it touches your database.',
    encountersCount: 5,
    firstSeenDate: 'Aug 22, 2026',
    url: 'https://architecturecourse.dev/module-3'
  },
  {
    id: 'mem-oauth',
    title: 'OAuth 2.0 & Token Auth Explained Simply',
    source: 'YouTube • Security Bytes',
    sourceType: 'video',
    savedAgo: '3 weeks ago',
    dateStr: 'August 4, 2026',
    excerpt: 'Authorization code flows, refresh tokens, and preventing replay attacks with PKCE.',
    tags: ['Security', 'OAuth', 'Authentication'],
    connections: ['mem-auth-article'],
    contextNote: 'First encountered when building user login with Google Auth.',
    confidenceScore: 98,
    highlightedPhrase: 'OAuth lets users grant access to their data without ever giving away their password.',
    encountersCount: 3,
    firstSeenDate: 'Aug 4, 2026',
    url: 'https://youtube.com/watch?v=oauth-simplified'
  },
  {
    id: 'mem-java-concurrency',
    title: 'Java Concurrency: Threads, Locks & Synchronization',
    source: 'Java Performance Handbook',
    sourceType: 'article',
    savedAgo: '18 days ago',
    dateStr: 'August 8, 2026',
    excerpt: 'Virtual threads, synchronized blocks, atomic references, and thread-safe data structures.',
    tags: ['Java', 'Concurrency', 'Threads'],
    connections: ['mem-system-design'],
    contextNote: 'Saved during multithreading coursework; inactive for 18 days.',
    confidenceScore: 90,
    highlightedPhrase: 'Threads allow simultaneous execution, but require strict coordination to prevent race conditions.',
    encountersCount: 4,
    firstSeenDate: 'July 29, 2026',
    url: 'https://javahandbook.org/concurrency-primitives'
  }
];

export const mockConnectionNodes: ConnectionNode[] = [
  {
    id: 'node-redis',
    label: 'Redis',
    category: 'backend',
    x: 30,
    y: 35,
    description: 'In-memory data store you use to deliver instant answers.',
    encounters: 'Seen 4 times across 3 sources',
    connections: ['node-caching', 'node-performance', 'node-databases'],
    contextBridge: {
      'node-caching': 'Redis is the primary tool used in the caching articles you read.',
      'node-performance': 'You saved 3 videos showing how Redis improves app response times.',
      'node-databases': 'Database guides recommend putting Redis in front of SQL databases.'
    },
    color: '#06b6d4'
  },
  {
    id: 'node-caching',
    label: 'Caching',
    category: 'performance',
    x: 50,
    y: 50,
    description: 'The central idea of storing frequently needed information close at hand.',
    encounters: 'Related to 6 things you saved',
    connections: ['node-redis', 'node-performance', 'node-databases', 'node-system-design'],
    contextBridge: {
      'node-redis': 'Redis acts as your fast cache in memory.',
      'node-performance': 'Caching directly reduces server response time by 90%.',
      'node-databases': 'Prevents databases from crashing under high traffic.',
      'node-system-design': 'Core pillar of all scalable system design diagrams you bookmarked.'
    },
    color: '#10b981'
  },
  {
    id: 'node-performance',
    label: 'Performance',
    category: 'performance',
    x: 70,
    y: 35,
    description: 'Making apps feel fast, stable, and responsive for everyone.',
    encounters: 'Appeared in 5 sources this month',
    connections: ['node-caching', 'node-redis', 'node-databases'],
    contextBridge: {
      'node-caching': 'Caching was the top performance optimization mentioned.',
      'node-redis': 'Redis was highlighted as the key performance accelerator.',
      'node-databases': 'Slow database queries were flagged as the #1 performance bottleneck.'
    },
    color: '#f59e0b'
  },
  {
    id: 'node-databases',
    label: 'Databases',
    category: 'systems',
    x: 35,
    y: 75,
    description: 'Where your core records and long-term customer data live permanently.',
    encounters: 'Encountered in 4 articles & podcasts',
    connections: ['node-redis', 'node-caching', 'node-system-design'],
    contextBridge: {
      'node-redis': 'Redis relieves read load from your SQL database.',
      'node-caching': 'Caching strategies protect your database connection pool.',
      'node-system-design': 'Replication and partitioning keep databases available during spikes.'
    },
    color: '#8b5cf6'
  },
  {
    id: 'node-system-design',
    label: 'System Design',
    category: 'systems',
    x: 68,
    y: 75,
    description: 'How all parts of an application fit together into a reliable whole.',
    encounters: 'Active focus topic for the last 2 weeks',
    connections: ['node-caching', 'node-databases', 'node-concurrency'],
    contextBridge: {
      'node-caching': 'System design courses place cache clusters at the front gate.',
      'node-databases': 'Covers database sharding and read replicas.',
      'node-concurrency': 'Explains how multiple servers safely handle concurrent user requests.'
    },
    color: '#ec4899'
  },
  {
    id: 'node-concurrency',
    label: 'Concurrency',
    category: 'concept',
    x: 88,
    y: 60,
    description: 'Handling multiple tasks, requests, and threads at the exact same moment.',
    encounters: '4 encounters (starting to fade: 18 days inactive)',
    connections: ['node-system-design'],
    contextBridge: {
      'node-system-design': 'Concurrency principles explain how servers process 10,000 requests per second without locks.'
    },
    color: '#6366f1'
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1',
    date: '2026-08-03',
    displayDate: 'AUG 03',
    concept: 'Redis',
    title: 'Redis in 10 Minutes',
    sourceType: 'video',
    sourceName: 'YouTube',
    durationOrLength: '47-min deep dive',
    connectedTo: ['Caching', 'Performance'],
    summary: 'You first encountered Redis while watching an introductory backend breakdown.',
    color: '#06b6d4'
  },
  {
    id: 'tl-2',
    date: '2026-08-08',
    displayDate: 'AUG 08',
    concept: 'Caching',
    title: 'How Caching Improves App Speed',
    sourceType: 'article',
    sourceName: 'Dev Article',
    durationOrLength: '6-min read',
    connectedTo: ['Redis', 'Performance'],
    summary: 'You read an article about caching. MemShift noticed this idea relates to Redis.',
    color: '#10b981'
  },
  {
    id: 'tl-3',
    date: '2026-08-16',
    displayDate: 'AUG 16',
    concept: 'Database Performance',
    title: 'Keeping Queries Fast Under Heavy Load',
    sourceType: 'article',
    sourceName: 'Engineering Blog',
    durationOrLength: '12-min read',
    connectedTo: ['Databases', 'Performance', 'Redis'],
    summary: 'MemShift linked database bottlenecks back to the caching concepts you saved.',
    color: '#f59e0b'
  },
  {
    id: 'tl-4',
    date: '2026-08-22',
    displayDate: 'AUG 22',
    concept: 'System Design (Redis again)',
    title: 'Scaling Web Architecture',
    sourceType: 'course',
    sourceName: 'Course Module',
    durationOrLength: 'Lesson 4',
    connectedTo: ['System Design', 'Redis', 'Caching'],
    summary: 'Redis appeared again. MemShift recognized your 4th encounter with this core topic.',
    color: '#8b5cf6'
  }
];

export const mockOriginItems: OriginTrackingItem[] = [
  {
    id: 'origin-redis',
    concept: 'Redis',
    firstFound: {
      platform: 'YouTube',
      date: 'August 3, 2026',
      title: 'Redis Explained in 10 Minutes',
      format: '47-minute video'
    },
    encounters: [
      {
        platform: 'YouTube',
        date: 'August 3',
        title: 'Redis Explained in 10 Minutes',
        note: 'First learned what in-memory storage means.'
      },
      {
        platform: 'Article',
        date: 'August 8',
        title: 'How caching improves performance',
        note: 'Learned why Redis is paired with databases.'
      },
      {
        platform: 'Reddit',
        date: 'August 16',
        title: 'r/webdev discussion on session stores',
        note: 'Saw developers debating Redis vs Memcached.'
      }
    ],
    relatedConcepts: ['Caching', 'Performance', 'Databases']
  },
  {
    id: 'origin-oauth',
    concept: 'OAuth 2.0',
    firstFound: {
      platform: 'YouTube',
      date: 'August 4, 2026',
      title: 'OAuth 2.0 & Token Auth Explained Simply',
      format: '22-minute video'
    },
    encounters: [
      {
        platform: 'YouTube',
        date: 'August 4',
        title: 'OAuth 2.0 & Token Auth Explained',
        note: 'First encountered authorization code flows.'
      },
      {
        platform: 'Article',
        date: 'August 10',
        title: 'Securing Web APIs with PKCE',
        note: 'Learned how refresh tokens are stored safely.'
      },
      {
        platform: 'Reddit',
        date: 'August 17',
        title: 'r/programming: Common Auth Mistakes',
        note: 'Read engineer stories about token expiration bugs.'
      }
    ],
    relatedConcepts: ['Security', 'Authentication', 'Tokens']
  }
];

export const mockSearchPresets: SearchPreset[] = [
  {
    id: 'preset-redis-video',
    query: 'Where did I watch that video about Redis?',
    label: 'Redis Video Origin',
    matchedMemoryIds: ['mem-redis', 'mem-caching'],
    explanation: 'Found the 47-minute YouTube video from August 3, plus connected articles on caching and database speed.'
  },
  {
    id: 'preset-caching',
    query: 'That article about caching databases',
    label: 'Database Caching',
    matchedMemoryIds: ['mem-caching', 'mem-db'],
    explanation: 'Found the August 8 article on caching and the August 16 guide on database query performance.'
  },
  {
    id: 'preset-oauth',
    query: 'Where did I learn about OAuth?',
    label: 'OAuth 2.0 Origin',
    matchedMemoryIds: ['mem-oauth'],
    explanation: 'First encountered on YouTube on August 4, then linked to articles and Reddit discussions.'
  },
  {
    id: 'preset-system-design',
    query: 'How does Redis fit into system design?',
    label: 'System Design & Redis',
    matchedMemoryIds: ['mem-system-design', 'mem-redis', 'mem-db'],
    explanation: 'Connected your architecture course notes to the 3 previous times you encountered Redis.'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is MemShift in simple words?',
    answer: 'MemShift is a memory companion for everything you watch and read on the internet. Instead of saving links you will never open again, MemShift remembers what was inside them, connects related ideas together, and helps you find where you learned something weeks later.'
  },
  {
    id: 'faq-2',
    question: 'How is this different from regular bookmarks or browser history?',
    answer: 'Browser history is just a long list of web addresses you cannot search by meaning. Bookmarks require you to organize folders manually. MemShift understands the actual ideas in the content—so you can search by what you remember (e.g. "that video where someone explained caching") and find the exact source.'
  },
  {
    id: 'faq-3',
    question: 'Do I have to organize tags, folders, or categories?',
    answer: 'No. MemShift handles all organizing automatically. It figures out the topics and notices when a new article connects to a video you watched last week.'
  },
  {
    id: 'faq-4',
    question: 'What does "knowledge fade" mean?',
    answer: 'When you haven\'t reviewed or used a topic in a while, MemShift gently highlights it and asks if you still want to keep it fresh. MemShift never deletes anything on its own—you are always in complete control.'
  },
  {
    id: 'faq-5',
    question: 'Is my reading data private and secure?',
    answer: 'Yes. MemShift is being designed with a local-first approach. Your memories belong strictly to you, nothing is secretly tracked, and you have complete control over what MemShift can see and remember.'
  },
  {
    id: 'faq-6',
    question: 'When will I get access?',
    answer: 'We are rolling out early access in batches to our waitlist members. Join the waitlist with your email to claim your spot in Cohort 01.'
  }
];
