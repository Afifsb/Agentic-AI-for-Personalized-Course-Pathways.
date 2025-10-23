import React, { useState, useEffect } from 'react';
import { useLearnMateStore } from '../store/learnmateStore';
import './WelcomeScreen.css';

export const WelcomeScreen = () => {
  const { setCurrentStep } = useLearnMateStore();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleStart = () => {
    setCurrentStep('student-info');
  };

  return (
    <div className={`welcome-screen ${isAnimating ? 'animate-in' : ''}`}>
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="logo">🎓</div>
          <h1>LearnMate</h1>
          <p className="tagline">Your Personalized AI Learning Coach</p>
        </div>

        <div className="welcome-description">
          <h2>Welcome to Your Learning Journey</h2>
          <p>
            LearnMate is an intelligent AI coach that creates personalized learning pathways
            tailored to your interests, goals, and skill level. Whether you're interested in
            Frontend Development, Cybersecurity, UI/UX Design, or Data Science, we'll guide
            you every step of the way.
          </p>
          {!process.env.REACT_APP_GEMINI_API_KEY && (
            <div className="api-notice">
              ℹ️ Running in demo mode. For full AI features, add a valid Gemini API key to .env file.
            </div>
          )}
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Coaching</h3>
            <p>Get personalized recommendations based on your goals</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Adaptive Learning</h3>
            <p>Your path evolves with your progress and preferences</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Goal-Oriented</h3>
            <p>Clear milestones and actionable learning steps</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📈</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your growth with detailed analytics</p>
          </div>
        </div>

        <button onClick={handleStart} className="btn-start">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
