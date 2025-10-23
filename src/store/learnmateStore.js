import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useLearnMateStore = create((set, get) => ({
  // Student State
  student: {
    id: null,
    name: '',
    email: '',
    interests: [],
    currentLevel: 'beginner',
    goals: '',
    availableTime: 'part-time',
    learningStyle: 'visual'
  },

  // Learning Path State
  learningPath: {
    id: null,
    createdAt: null,
    pathName: '',
    courses: [],
    milestones: [],
    completedCourses: [],
    currentCourse: null,
    progressPercentage: 0
  },

  // Conversation History
  conversationHistory: [],

  // UI State
  uiState: {
    currentStep: 'welcome',
    isLoading: false,
    error: null,
    successMessage: null
  },

  // Actions
  setStudent: (studentData) => {
    set((state) => ({
      student: {
        ...state.student,
        id: studentData.id || uuidv4(),
        ...studentData
      }
    }));
  },

  setLearningPath: (pathData) => {
    set((state) => ({
      learningPath: {
        ...state.learningPath,
        id: pathData.id || uuidv4(),
        createdAt: pathData.createdAt || new Date().toISOString(),
        ...pathData
      }
    }));
  },

  addToConversation: (message) => {
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        {
          id: uuidv4(),
          sender: message.sender,
          text: message.text,
          timestamp: new Date().toISOString()
        }
      ]
    }));
  },

  clearConversation: () => {
    set({ conversationHistory: [] });
  },

  addCompletedCourse: (courseId) => {
    set((state) => ({
      learningPath: {
        ...state.learningPath,
        completedCourses: [
          ...state.learningPath.completedCourses,
          {
            id: courseId,
            completedAt: new Date().toISOString()
          }
        ],
        progressPercentage: Math.min(
          100,
          state.learningPath.progressPercentage + 10
        )
      }
    }));
  },

  setCurrentStep: (step) => {
    set((state) => ({
      uiState: {
        ...state.uiState,
        currentStep: step
      }
    }));
  },

  setLoading: (isLoading) => {
    set((state) => ({
      uiState: {
        ...state.uiState,
        isLoading
      }
    }));
  },

  setError: (error) => {
    set((state) => ({
      uiState: {
        ...state.uiState,
        error
      }
    }));
  },

  setSuccessMessage: (message) => {
    set((state) => ({
      uiState: {
        ...state.uiState,
        successMessage: message
      }
    }));
  },

  clearError: () => {
    set((state) => ({
      uiState: {
        ...state.uiState,
        error: null
      }
    }));
  },

  reset: () => {
    set({
      student: {
        id: null,
        name: '',
        email: '',
        interests: [],
        currentLevel: 'beginner',
        goals: '',
        availableTime: 'part-time',
        learningStyle: 'visual'
      },
      learningPath: {
        id: null,
        createdAt: null,
        pathName: '',
        courses: [],
        milestones: [],
        completedCourses: [],
        currentCourse: null,
        progressPercentage: 0
      },
      conversationHistory: [],
      uiState: {
        currentStep: 'welcome',
        isLoading: false,
        error: null,
        successMessage: null
      }
    });
  }
}));
