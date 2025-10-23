import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

console.log('🔑 API Key loaded:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT FOUND');

if (!API_KEY) {
  console.warn('⚠️ REACT_APP_GEMINI_API_KEY is not set in environment variables');
}

let genAI = null;
try {
  genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
  console.log('✅ Gemini AI initialized:', genAI ? 'SUCCESS' : 'FAILED');
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error);
}

// Using gemini-1.5-flash as it's the latest stable model
const MODEL_NAME = 'gemini-1.5-flash';

// Fallback responses when API is not available
const fallbackResponses = {
  coaching: (profile) => `Welcome to LearnMate, ${profile.name}! 🎓

Based on your interests in ${profile.interests?.join(', ')}, I've created a personalized learning path for you.

**Your Learning Journey:**
- **Current Level**: ${profile.currentLevel}
- **Focus Areas**: ${profile.interests?.join(', ')}
- **Available Time**: ${profile.availableTime}

**Recommended Path:**
1. Start with foundational courses to build strong basics
2. Practice with hands-on projects
3. Progress to intermediate concepts
4. Master advanced techniques

**Next Steps:**
- Complete the skill assessment
- View your personalized course recommendations
- Start with the first course in your path

I'm here to guide you every step of the way! 💪`,

  assessment: (skillArea) => `**Skill Assessment Complete!** ✅

Based on your responses, here's your evaluation for ${skillArea}:

**Strengths Identified:**
- Good understanding of fundamental concepts
- Willingness to learn and grow
- Clear learning goals

**Areas for Improvement:**
- Build more hands-on projects
- Practice with real-world scenarios
- Deepen knowledge through advanced courses

**Recommendations:**
- Start with beginner-friendly courses
- Focus on practical implementation
- Join community projects and forums
- Build a portfolio of projects

**Suggested Resources:**
- Online courses from Udemy, Coursera
- Practice platforms like CodePen, GitHub
- Community forums and Discord groups

Keep learning and growing! 🚀`,

  chat: (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! 👋 I'm your LearnMate AI coach. I'm here to help you with your learning journey. How can I assist you today?";
    }
    
    if (lowerMessage.includes('course') || lowerMessage.includes('recommend')) {
      return "I'd be happy to recommend courses! Based on your learning path, I suggest:\n\n1. **Start with foundational courses** - Build your basics strong\n2. **Practice with projects** - Apply what you learn\n3. **Progress gradually** - Move from beginner to advanced\n4. **Stay consistent** - Regular practice is key\n\nCheck your Learning Path for personalized course recommendations!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
      return "Don't worry, getting stuck is part of learning! Here's how I can help:\n\n- **Break down complex topics** into simpler concepts\n- **Suggest resources** and practice exercises\n- **Guide you** through challenging areas\n- **Motivate you** to keep going\n\nWhat specific topic do you need help with?";
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return "Great question! Here's how to track your progress:\n\n✅ Complete courses in your Learning Path\n✅ Mark courses as completed\n✅ Build projects to apply your knowledge\n✅ Review your milestones regularly\n\nYour progress is saved automatically. Keep up the great work! 📊";
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
      return "Time management is crucial! Here are my tips:\n\n⏰ **Set a regular schedule** - Consistency beats intensity\n📅 **Start small** - Even 30 minutes daily helps\n🎯 **Focus on one topic** at a time\n🔄 **Take breaks** - Rest is important for learning\n\nBased on your availability, I've recommended courses that fit your schedule!";
    }
    
    return `Thanks for your question! While I'm running in fallback mode (Gemini API needs a valid key), I can still help you:\n\n- View your personalized learning path\n- Explore course recommendations\n- Track your progress\n- Get motivated to keep learning\n\nFor advanced AI-powered responses, please ensure you have a valid Gemini API key. Keep learning! 🚀`;
  }
};

const systemPrompt = `You are LearnMate, an Agentic AI coach specialized in creating personalized learning pathways. 

Your role is to:
1. Understand student interests, goals, and current skill levels
2. Assess technical background and learning preferences
3. Create dynamic, personalized course roadmaps
4. Recommend specific courses, resources, and learning milestones
5. Adapt recommendations based on progress and feedback
6. Provide motivational guidance and learning strategies

Available specializations:
- Frontend Development (React, Vue, Angular, HTML/CSS)
- Backend Development (Node.js, Python, Java, Go)
- Cybersecurity (Ethical Hacking, Network Security, Cloud Security)
- UI/UX Design (Figma, Design Systems, User Research)
- Data Science (Python, ML, Statistics, Deep Learning)
- Cloud Computing (AWS, Azure, Google Cloud)
- Mobile Development (React Native, Flutter, Swift)
- DevOps & Infrastructure

When a student interacts with you:
1. First, gather information about their interests and goals
2. Assess their current skill level (Beginner, Intermediate, Advanced)
3. Understand their learning style and time availability
4. Create a structured roadmap with clear milestones
5. Recommend specific courses from platforms like Udemy, Coursera, LinkedIn Learning, etc.
6. Track progress and provide adaptive recommendations

Always be encouraging, supportive, and provide actionable guidance.`;

export const geminiService = {
  async startCoachingSession(studentProfile) {
    try {
      // Check if API is available
      if (!genAI || !API_KEY) {
        console.log('Using fallback response - Gemini API not available');
        return fallbackResponses.coaching(studentProfile);
      }

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `${systemPrompt}

New student profile:
- Name: ${studentProfile.name || 'Student'}
- Interests: ${studentProfile.interests?.join(', ') || 'Not specified'}
- Current Level: ${studentProfile.currentLevel || 'Not assessed'}
- Goals: ${studentProfile.goals || 'Not specified'}
- Available Time: ${studentProfile.availableTime || 'Not specified'}

Please provide:
1. A brief assessment of the student
2. Recommended specialization focus
3. High-level learning pathway (3-6 months)
4. First 3 courses to get started with
5. Estimated timeline and milestones`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      console.log('Falling back to offline response');
      return fallbackResponses.coaching(studentProfile);
    }
  },

  async generateCourseRecommendations(studentData, currentProgress) {
    try {
      // Check if API is available
      if (!genAI || !API_KEY) {
        console.log('Using fallback response - Gemini API not available');
        return fallbackResponses.coaching(studentData);
      }

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `${systemPrompt}

Student Current Status:
- Profile: ${JSON.stringify(studentData)}
- Completed Courses: ${currentProgress?.completedCourses?.join(', ') || 'None'}
- Current Level Achieved: ${currentProgress?.currentLevel || 'Beginner'}
- Learning Path: ${currentProgress?.chosenPath || 'Not started'}

Based on the student's progress and profile, provide:
1. Assessment of current progress
2. Next recommended courses (2-3)
3. Advanced topics to explore
4. Projects to build for portfolio
5. Estimated time to reach next level
6. Skill gaps to address`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      console.log('Falling back to offline response');
      return fallbackResponses.coaching(studentData);
    }
  },

  async provideStudyGuidance(topic, studentContext) {
    try {
      // Check if API is available
      if (!genAI || !API_KEY) {
        console.log('Using fallback response - Gemini API not available');
        return `**Study Guidance for ${topic}** 📚\n\nHere's how to approach learning ${topic}:\n\n1. **Start with basics** - Understand core concepts\n2. **Practice regularly** - Hands-on experience is key\n3. **Build projects** - Apply what you learn\n4. **Join communities** - Learn from others\n5. **Stay consistent** - Regular practice matters\n\nKeep going! You're doing great! 🚀`;
      }

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `${systemPrompt}

Student is struggling with: ${topic}
Student Context: 
- Current Level: ${studentContext.level}
- Background: ${studentContext.background}
- Learning Style: ${studentContext.learningStyle}

Provide:
1. Simple explanation of the topic
2. Step-by-step learning approach
3. Practical examples and use cases
4. Common mistakes to avoid
5. Resources and projects to practice
6. Tips for mastering this topic`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error providing study guidance:', error);
      console.log('Falling back to offline response');
      return `**Study Guidance for ${topic}** 📚\n\nHere's how to approach learning ${topic}:\n\n1. **Start with basics** - Understand core concepts\n2. **Practice regularly** - Hands-on experience is key\n3. **Build projects** - Apply what you learn\n4. **Join communities** - Learn from others\n5. **Stay consistent** - Regular practice matters\n\nKeep going! You're doing great! 🚀`;
    }
  },

  async assessSkillLevel(skillArea, assessment) {
    try {
      // Check if API is available
      if (!genAI || !API_KEY) {
        console.log('Using fallback response - Gemini API not available');
        return fallbackResponses.assessment(skillArea);
      }

      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `${systemPrompt}

Assess the student's skill level in ${skillArea}:
Assessment answers:
${assessment}

Provide:
1. Current skill level (Beginner/Intermediate/Advanced/Expert)
2. Strengths identified
3. Areas for improvement
4. Specific recommendations
5. Suggested learning resources`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error assessing skill level:', error);
      console.log('Falling back to offline response');
      return fallbackResponses.assessment(skillArea);
    }
  },

  async chat(message, conversationHistory) {
    try {
      console.log('💬 Chat called with message:', message);
      console.log('📜 Conversation history length:', conversationHistory.length);
      console.log('🔍 API_KEY exists:', !!API_KEY);
      console.log('🔍 genAI exists:', !!genAI);
      
      // Check if API is available
      if (!genAI || !API_KEY) {
        console.warn('⚠️ Using fallback response - Gemini API not available');
        return fallbackResponses.chat(message);
      }

      console.log('✅ Using real Gemini API');
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const formattedHistory = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in chat:', error);
      console.log('Falling back to offline response');
      return fallbackResponses.chat(message);
    }
  }
};

export default geminiService;
