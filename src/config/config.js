/**
 * LearnMate Configuration
 * Centralized configuration for easy customization
 */

export const config = {
  // Application Meta
  app: {
    name: 'LearnMate',
    title: 'LearnMate - Your AI Learning Coach',
    description: 'Personalized learning pathways powered by AI',
    version: '1.0.0'
  },

  // UI Configuration
  ui: {
    theme: {
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      accentColor: '#f59e0b',
      successColor: '#10b981',
      dangerColor: '#ef4444',
      warningColor: '#f97316'
    },
    animations: {
      enabled: true,
      duration: 300
    }
  },

  // Learning Domains
  domains: [
    {
      id: 'frontend',
      name: 'Frontend Development',
      emoji: '🎨',
      description: 'React, Vue, Angular, HTML/CSS'
    },
    {
      id: 'backend',
      name: 'Backend Development',
      emoji: '⚙️',
      description: 'Node.js, Python, Java, Go'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      emoji: '🔒',
      description: 'Ethical Hacking, Network Security'
    },
    {
      id: 'uiux',
      name: 'UI/UX Design',
      emoji: '🎭',
      description: 'Figma, Design Systems, UX Research'
    },
    {
      id: 'datascience',
      name: 'Data Science',
      emoji: '📊',
      description: 'Python, ML, Statistics, Deep Learning'
    },
    {
      id: 'cloud',
      name: 'Cloud Computing',
      emoji: '☁️',
      description: 'AWS, Azure, Google Cloud'
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      emoji: '📱',
      description: 'React Native, Flutter, Swift'
    },
    {
      id: 'devops',
      name: 'DevOps & Infrastructure',
      emoji: '🚀',
      description: 'Docker, Kubernetes, CI/CD'
    }
  ],

  // Skill Levels
  skillLevels: [
    {
      value: 'beginner',
      label: 'Beginner - I\'m just starting',
      description: 'No or minimal experience'
    },
    {
      value: 'intermediate',
      label: 'Intermediate - I have some experience',
      description: 'Some hands-on experience'
    },
    {
      value: 'advanced',
      label: 'Advanced - I have strong experience',
      description: 'Significant professional experience'
    }
  ],

  // Time Availability
  timeOptions: [
    {
      value: 'part-time',
      label: '5-10 hours/week',
      hoursPerWeek: 7.5
    },
    {
      value: 'full-time',
      label: '15+ hours/week',
      hoursPerWeek: 20
    },
    {
      value: 'weekend',
      label: 'Weekends only',
      hoursPerWeek: 4
    }
  ],

  // Learning Paths Configuration
  learningPaths: {
    milestonesPerPath: 3,
    coursesPerMilestone: 2,
    milestoneNames: [
      'Foundation Building',
      'Intermediate Skills',
      'Advanced Specialization'
    ],
    milestoneDescriptions: [
      'Learn fundamentals and build strong foundation',
      'Develop intermediate skills with practical projects',
      'Master advanced concepts and specialization'
    ]
  },

  // API Configuration
  api: {
    gemini: {
      model: 'gemini-pro',
      maxTokens: 1024,
      temperature: 0.7,
      topP: 1,
      topK: 40
    },
    ibm: {
      model: 'granite-13b-chat-v2',
      timeout: 30000
    }
  },

  // Course Platforms
  platforms: [
    {
      id: 'udemy',
      name: 'Udemy',
      icon: '🎬',
      url: 'https://udemy.com'
    },
    {
      id: 'coursera',
      name: 'Coursera',
      icon: '📚',
      url: 'https://coursera.org'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Learning',
      icon: '💼',
      url: 'https://linkedin.com/learning'
    },
    {
      id: 'microsoft',
      name: 'Microsoft Learn',
      icon: '🪟',
      url: 'https://microsoft.com/learn'
    }
  ],

  // Conversation Settings
  chat: {
    maxHistoryLength: 50,
    suggestedQuestions: [
      'What should I focus on next?',
      'Can you explain this concept in simpler terms?',
      'How am I progressing?',
      'Suggest a project for me',
      'What are common mistakes in this field?',
      'How long will it take to master this?',
      'What prerequisites do I need?',
      'Can you recommend resources?'
    ]
  },

  // Storage Configuration
  storage: {
    useLocalStorage: true,
    storageKey: 'learnmate_'
  },

  // Feature Flags
  features: {
    enableChat: true,
    enableAnalytics: true,
    enableNotifications: true,
    enableOfflineMode: false,
    enableSocialSharing: false
  }
};

export default config;
