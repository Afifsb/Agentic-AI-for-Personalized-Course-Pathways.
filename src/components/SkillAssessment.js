import React, { useState, useEffect } from 'react';
import { useLearnMateStore } from '../store/learnmateStore';
import { geminiService } from '../services/geminiService';
import { ibmCloudService } from '../services/ibmCloudService';
import './SkillAssessment.css';

export const SkillAssessment = () => {
  const { student, setCurrentStep, setLearningPath, uiState } = useLearnMateStore();
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({
    experience: '',
    projects: '',
    challenges: '',
    strengths: ''
  });

  useEffect(() => {
    // Generate personalized assessment content
    generateAssessment();
  }, []);

  const generateAssessment = async () => {
    try {
      setLoading(true);
      
      // Simulate assessment generation
      const assessment = {
        questions: [
          {
            id: 1,
            question: 'How many projects have you completed in your area of interest?',
            type: 'text',
            placeholder: 'Describe your project experience...'
          },
          {
            id: 2,
            question: 'What are the biggest technical challenges you\'ve faced?',
            type: 'text',
            placeholder: 'Share your challenges...'
          },
          {
            id: 3,
            question: 'What are your technical strengths?',
            type: 'text',
            placeholder: 'Describe your strengths...'
          }
        ]
      };
      
      setAssessmentResult(assessment);
    } catch (error) {
      console.error('Error generating assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmitAssessment = async () => {
    try {
      setLoading(true);

      // Validate that student has interests
      if (!student.interests || student.interests.length === 0) {
        throw new Error('Please go back and select at least one interest area');
      }

      // Validate that student has a name
      if (!student.name) {
        throw new Error('Please go back and enter your name');
      }

      // Get skill assessment from Gemini
      await geminiService.assessSkillLevel(
        student.interests[0],
        JSON.stringify(answers)
      );

      // Generate course recommendations using IBM Cloud
      const courseDatabase = ibmCloudService.getCourseDatabase();
      const recommendedCourses = ibmCloudService.processRecommendationsLocally(
        student,
        courseDatabase
      );

      // Ensure we have courses
      if (!recommendedCourses || recommendedCourses.length === 0) {
        throw new Error('Unable to generate course recommendations. Please try again.');
      }

      // Create learning path
      const learningPath = {
        pathName: `${student.interests[0]} Mastery Path`,
        courses: recommendedCourses.slice(0, 5),
        milestones: [
          {
            id: 1,
            name: 'Foundation Building',
            description: 'Complete first 2 courses',
            duration: '4 weeks',
            status: 'in-progress'
          },
          {
            id: 2,
            name: 'Intermediate Skills',
            description: 'Build 2 projects',
            duration: '8 weeks',
            status: 'pending'
          },
          {
            id: 3,
            name: 'Advanced Specialization',
            description: 'Complete advanced course',
            duration: '12 weeks',
            status: 'pending'
          }
        ]
      };

      setLearningPath(learningPath);
      setCurrentStep('learning-path');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert(`Error: ${error.message || 'Unable to create learning path. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="skill-assessment loading-state">
        <div className="loader">
          <div className="spinner"></div>
          <p>Analyzing your skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-assessment">
      <div className="assessment-container">
        <h1>Skill Assessment</h1>
        <p className="assessment-subtitle">
          Help us understand your current skills in {student.interests[0]}
        </p>

        <form className="assessment-form">
          {assessmentResult?.questions.map(question => (
            <div key={question.id} className="assessment-question">
              <label htmlFor={`q-${question.id}`}>{question.question}</label>
              <textarea
                id={`q-${question.id}`}
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="form-textarea"
                rows="3"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmitAssessment}
            disabled={uiState.isLoading}
            className="btn-primary"
          >
            {uiState.isLoading ? 'Creating Your Path...' : 'Generate My Learning Path'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillAssessment;
