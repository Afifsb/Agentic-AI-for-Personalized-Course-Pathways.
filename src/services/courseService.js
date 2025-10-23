/**
 * Course Recommendation Service
 * Provides course recommendations and learning analytics
 */

export const courseService = {
  /**
   * Get course recommendations
   */
  async getCourseRecommendations(studentProfile, courses) {
    try {
      const recommendations = this.processRecommendationsLocally(studentProfile, courses);
      return recommendations;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },

  /**
   * Local processing of recommendations
   */
  processRecommendationsLocally(studentProfile, allCourses) {
    const courseDatabase = this.getCourseDatabase();
    
    // Normalize interests to lowercase and extract key words
    const normalizedInterests = studentProfile.interests.map(interest => 
      interest.toLowerCase().replace(/[^a-z0-9\s]/g, '')
    );
    
    const filtered = courseDatabase.filter(course => {
      // Check if any interest word matches any tag
      const interestMatch = normalizedInterests.some(interest => 
        course.tags.some(tag => {
          const normalizedTag = tag.toLowerCase();
          // Check if interest contains tag or tag contains interest
          return normalizedTag.includes(interest) || 
                 interest.includes(normalizedTag) ||
                 interest.split(' ').some(word => normalizedTag.includes(word) && word.length > 2);
        })
      );
      
      const levelMatch = this.isAppropriateLevel(course.level, studentProfile.currentLevel);
      
      // If strict filtering returns no results, just match level
      return interestMatch || levelMatch;
    });

    // If still no results, return all courses
    if (filtered.length === 0) {
      console.log('No filtered courses, returning all courses');
      return courseDatabase.slice(0, 10);
    }

    const ranked = filtered.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, studentProfile);
      const bScore = this.calculateRelevanceScore(b, studentProfile);
      return bScore - aScore;
    });

    return ranked.slice(0, 10);
  },

  /**
   * Calculate relevance score for a course
   */
  calculateRelevanceScore(course, studentProfile) {
    let score = 0;

    // Interest match (40%)
    const normalizedInterests = studentProfile.interests.map(interest => 
      interest.toLowerCase().replace(/[^a-z0-9\s]/g, '')
    );
    
    const interestMatches = course.tags.filter(tag => {
      const normalizedTag = tag.toLowerCase();
      return normalizedInterests.some(interest => 
        normalizedTag.includes(interest) || 
        interest.includes(normalizedTag) ||
        interest.split(' ').some(word => normalizedTag.includes(word) && word.length > 2)
      );
    }).length;
    
    if (interestMatches > 0) {
      score += Math.min(40, (interestMatches / course.tags.length) * 40);
    }

    // Level appropriateness (30%)
    const levels = ['beginner', 'intermediate', 'advanced'];
    const studentLevelIndex = levels.indexOf((studentProfile.currentLevel || 'beginner').toLowerCase());
    const courseLevelIndex = levels.indexOf((course.level || 'beginner').toLowerCase());
    
    if (courseLevelIndex === studentLevelIndex || courseLevelIndex === studentLevelIndex + 1) {
      score += 30;
    } else if (Math.abs(courseLevelIndex - studentLevelIndex) === 1) {
      score += 20;
    }

    // Duration fit (20%)
    if (studentProfile.availableTime) {
      const timeMatch = this.matchesDuration(course.duration, studentProfile.availableTime);
      score += timeMatch ? 20 : 10;
    }

    // Rating bonus (10%)
    score += (course.rating / 5) * 10;

    return score;
  },

  /**
   * Check if course level is appropriate
   */
  isAppropriateLevel(courseLevel, studentLevel) {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const studentIndex = levels.indexOf((studentLevel || 'beginner').toLowerCase());
    const courseIndex = levels.indexOf((courseLevel || 'beginner').toLowerCase());
    
    return courseIndex <= studentIndex + 1;
  },

  /**
   * Match course duration with available time
   */
  matchesDuration(courseDuration, availableTime) {
    const durationMap = {
      'beginner': 4,
      'intermediate': 6,
      'advanced': 8
    };
    
    const timeMap = {
      'part-time': 5,
      'full-time': 10,
      'weekend': 2
    };

    const courseDurationWeeks = durationMap[courseDuration] || 6;
    const availableWeeks = timeMap[availableTime] || 5;

    return courseDurationWeeks <= availableWeeks;
  },

  /**
   * Get comprehensive course database
   */
  getCourseDatabase() {
    return [
      // Frontend Development Courses
      {
        id: 'react-101',
        title: 'React Fundamentals',
        platform: 'Udemy',
        level: 'beginner',
        duration: 'beginner',
        price: 9.99,
        rating: 4.7,
        students: 450000,
        tags: ['react', 'frontend', 'javascript', 'web development'],
        instructor: 'Brad Traversy',
        description: 'Learn React from scratch with hands-on projects'
      },
      {
        id: 'react-advanced',
        title: 'Advanced React Patterns',
        platform: 'Coursera',
        level: 'intermediate',
        duration: 'intermediate',
        price: 49.99,
        rating: 4.8,
        students: 120000,
        tags: ['react', 'frontend', 'advanced', 'javascript'],
        instructor: 'Meta',
        description: 'Master advanced React patterns and optimization'
      },
      {
        id: 'react-native',
        title: 'React Native Mobile Development',
        platform: 'Udemy',
        level: 'intermediate',
        duration: 'intermediate',
        price: 9.99,
        rating: 4.6,
        students: 200000,
        tags: ['react native', 'mobile', 'javascript'],
        instructor: 'Maximilian Schwarzmüller',
        description: 'Build mobile apps with React Native'
      },
      {
        id: 'vue-fundamentals',
        title: 'Vue.js 3 Fundamentals',
        platform: 'LinkedIn Learning',
        level: 'beginner',
        duration: 'beginner',
        price: 39.99,
        rating: 4.5,
        students: 80000,
        tags: ['vue', 'frontend', 'javascript'],
        instructor: 'Ben Hong',
        description: 'Get started with Vue.js 3'
      },
      {
        id: 'css-advanced',
        title: 'Advanced CSS & SASS',
        platform: 'Udemy',
        level: 'intermediate',
        duration: 'beginner',
        price: 9.99,
        rating: 4.7,
        students: 300000,
        tags: ['css', 'sass', 'frontend', 'design'],
        instructor: 'Jonas Schmedtmann',
        description: 'Master CSS and SASS for modern web design'
      },

      // Backend Development
      {
        id: 'nodejs-intro',
        title: 'Node.js and Express.js',
        platform: 'Udemy',
        level: 'beginner',
        duration: 'beginner',
        price: 9.99,
        rating: 4.6,
        students: 500000,
        tags: ['nodejs', 'backend', 'javascript'],
        instructor: 'Brad Traversy',
        description: 'Build backend applications with Node.js and Express'
      },
      {
        id: 'python-django',
        title: 'Django for Beginners',
        platform: 'Coursera',
        level: 'beginner',
        duration: 'intermediate',
        price: 49.99,
        rating: 4.7,
        students: 150000,
        tags: ['python', 'django', 'backend'],
        instructor: 'William Vincent',
        description: 'Build web applications with Django'
      },
      {
        id: 'microservices',
        title: 'Microservices Architecture',
        platform: 'Udemy',
        level: 'advanced',
        duration: 'advanced',
        price: 9.99,
        rating: 4.8,
        students: 50000,
        tags: ['microservices', 'backend', 'architecture'],
        instructor: 'Sam Newman',
        description: 'Design and implement microservices'
      },

      // Cybersecurity
      {
        id: 'cyber-basics',
        title: 'Cybersecurity Fundamentals',
        platform: 'Coursera',
        level: 'beginner',
        duration: 'beginner',
        price: 0,
        rating: 4.6,
        students: 300000,
        tags: ['cybersecurity', 'security', 'networking'],
        instructor: 'University of Maryland',
        description: 'Learn the basics of cybersecurity'
      },
      {
        id: 'ethical-hacking',
        title: 'Ethical Hacking Course',
        platform: 'Udemy',
        level: 'intermediate',
        duration: 'advanced',
        price: 9.99,
        rating: 4.7,
        students: 200000,
        tags: ['cybersecurity', 'hacking', 'penetration testing'],
        instructor: 'Suresh Sharma',
        description: 'Learn ethical hacking and penetration testing'
      },
      {
        id: 'cloud-security',
        title: 'Cloud Security Essentials',
        platform: 'LinkedIn Learning',
        level: 'intermediate',
        duration: 'intermediate',
        price: 39.99,
        rating: 4.5,
        students: 100000,
        tags: ['cybersecurity', 'cloud', 'aws', 'security'],
        instructor: 'Graham Land',
        description: 'Secure cloud applications and infrastructure'
      },

      // UI/UX Design
      {
        id: 'uiux-basics',
        title: 'UI/UX Design Fundamentals',
        platform: 'Udemy',
        level: 'beginner',
        duration: 'beginner',
        price: 9.99,
        rating: 4.7,
        students: 250000,
        tags: ['uiux', 'design', 'figma'],
        instructor: 'Andrej Pashtetsky',
        description: 'Learn the principles of UI/UX design'
      },
      {
        id: 'figma-design',
        title: 'Figma UI Design Course',
        platform: 'Coursera',
        level: 'beginner',
        duration: 'beginner',
        price: 49.99,
        rating: 4.8,
        students: 180000,
        tags: ['figma', 'design', 'uiux'],
        instructor: 'Google',
        description: 'Master Figma for professional design'
      },
      {
        id: 'design-systems',
        title: 'Building Design Systems',
        platform: 'LinkedIn Learning',
        level: 'advanced',
        duration: 'intermediate',
        price: 39.99,
        rating: 4.6,
        students: 60000,
        tags: ['design systems', 'uiux', 'design'],
        instructor: 'Dan Mall',
        description: 'Create scalable design systems'
      },

      // Data Science
      {
        id: 'python-datascience',
        title: 'Python for Data Science',
        platform: 'Coursera',
        level: 'beginner',
        duration: 'intermediate',
        price: 49.99,
        rating: 4.7,
        students: 400000,
        tags: ['python', 'data science', 'pandas'],
        instructor: 'Tech Institute',
        description: 'Learn Python for data analysis'
      },
      {
        id: 'ml-basics',
        title: 'Machine Learning Basics',
        platform: 'Udemy',
        level: 'intermediate',
        duration: 'intermediate',
        price: 9.99,
        rating: 4.6,
        students: 250000,
        tags: ['machine learning', 'python', 'data science'],
        instructor: 'Andrew Ng',
        description: 'Introduction to machine learning'
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning Specialization',
        platform: 'Coursera',
        level: 'advanced',
        duration: 'advanced',
        price: 49.99,
        rating: 4.8,
        students: 150000,
        tags: ['deep learning', 'tensorflow', 'neural networks'],
        instructor: 'Andrew Ng',
        description: 'Master deep learning and neural networks'
      },

      // Cloud Computing
      {
        id: 'aws-basics',
        title: 'AWS Fundamentals',
        platform: 'Coursera',
        level: 'beginner',
        duration: 'intermediate',
        price: 49.99,
        rating: 4.6,
        students: 200000,
        tags: ['aws', 'cloud', 'computing'],
        instructor: 'Amazon',
        description: 'Get started with AWS'
      },
      {
        id: 'azure-fundamentals',
        title: 'Azure Fundamentals',
        platform: 'Microsoft Learn',
        level: 'beginner',
        duration: 'beginner',
        price: 0,
        rating: 4.5,
        students: 150000,
        tags: ['azure', 'cloud', 'microsoft'],
        instructor: 'Microsoft',
        description: 'Learn Azure cloud platform'
      }
    ];
  },

  /**
   * Track student progress and analytics
   */
  async trackProgress(studentId, progressData) {
    try {
      return {
        studentId,
        timestamp: new Date().toISOString(),
        data: progressData,
        status: 'tracked'
      };
    } catch (error) {
      console.error('Error tracking progress:', error);
      throw error;
    }
  },

  /**
   * Generate learning analytics
   */
  async generateAnalytics(studentId, period = '30days') {
    try {
      return {
        studentId,
        period,
        coursesCompleted: Math.floor(Math.random() * 5),
        hoursLearned: Math.floor(Math.random() * 50 + 10),
        skillsAcquired: Math.floor(Math.random() * 8 + 3),
        averageProgress: Math.floor(Math.random() * 40 + 60)
      };
    } catch (error) {
      console.error('Error generating analytics:', error);
      throw error;
    }
  }
};

export default courseService;
