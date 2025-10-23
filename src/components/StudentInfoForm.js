import React, { useState } from 'react';
import { useLearnMateStore } from '../store/learnmateStore';
import './StudentInfoForm.css';

const INTERESTS = [
  'Frontend Development',
  'Backend Development',
  'Cybersecurity',
  'UI/UX Design',
  'Data Science',
  'Cloud Computing',
  'Mobile Development',
  'DevOps'
];

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner - I\'m just starting' },
  { value: 'intermediate', label: 'Intermediate - I have some experience' },
  { value: 'advanced', label: 'Advanced - I have strong experience' }
];

const TIME_OPTIONS = [
  { value: 'part-time', label: '5-10 hours/week' },
  { value: 'full-time', label: '15+ hours/week' },
  { value: 'weekend', label: 'Weekends only' }
];

export const StudentInfoForm = () => {
  const { student, setStudent, setCurrentStep, uiState } = useLearnMateStore();
  const [formData, setFormData] = useState({
    name: student.name || '',
    email: student.email || '',
    interests: student.interests || [],
    currentLevel: student.currentLevel || 'beginner',
    goals: student.goals || '',
    availableTime: student.availableTime || 'part-time',
    learningStyle: student.learningStyle || 'visual'
  });

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLevelChange = (e) => {
    setFormData({ ...formData, currentLevel: e.target.value });
  };

  const handleTimeChange = (e) => {
    setFormData({ ...formData, availableTime: e.target.value });
  };

  const handleGoalsChange = (e) => {
    setFormData({ ...formData, goals: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (formData.interests.length === 0) {
      alert('Please select at least one interest');
      return;
    }
    if (!formData.goals.trim()) {
      alert('Please describe your learning goals');
      return;
    }

    // Save student info
    setStudent(formData);
    
    // Move to next step
    setCurrentStep('assessment');
  };

  return (
    <div className="student-info-form">
      <div className="form-container">
        <h1>Let's Get to Know You</h1>
        <p className="form-subtitle">
          Tell us about yourself so we can create your personalized learning path
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">What's your name?</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleNameChange}
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Your email address</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleEmailChange}
              className="form-input"
            />
          </div>

          {/* Interests */}
          <div className="form-group">
            <label>What are your interests? (Select all that apply)</label>
            <div className="interests-grid">
              {INTERESTS.map(interest => (
                <div key={interest} className="interest-checkbox">
                  <input
                    type="checkbox"
                    id={`interest-${interest}`}
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  />
                  <label htmlFor={`interest-${interest}`}>{interest}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div className="form-group">
            <label>What's your current skill level?</label>
            <div className="radio-group">
              {SKILL_LEVELS.map(level => (
                <div key={level.value} className="radio-option">
                  <input
                    type="radio"
                    id={`level-${level.value}`}
                    name="skillLevel"
                    value={level.value}
                    checked={formData.currentLevel === level.value}
                    onChange={handleLevelChange}
                  />
                  <label htmlFor={`level-${level.value}`}>{level.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="form-group">
            <label htmlFor="goals">What are your learning goals?</label>
            <textarea
              id="goals"
              placeholder="Describe what you want to achieve in the next 6 months..."
              value={formData.goals}
              onChange={handleGoalsChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          {/* Available Time */}
          <div className="form-group">
            <label>How much time can you dedicate to learning per week?</label>
            <div className="radio-group">
              {TIME_OPTIONS.map(option => (
                <div key={option.value} className="radio-option">
                  <input
                    type="radio"
                    id={`time-${option.value}`}
                    name="availableTime"
                    value={option.value}
                    checked={formData.availableTime === option.value}
                    onChange={handleTimeChange}
                  />
                  <label htmlFor={`time-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={uiState.isLoading}
            >
              {uiState.isLoading ? 'Creating Your Profile...' : 'Create My Learning Path'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInfoForm;
