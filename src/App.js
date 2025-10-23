import React from 'react';
import { useLearnMateStore } from './store/learnmateStore';
import WelcomeScreen from './components/WelcomeScreen';
import StudentInfoForm from './components/StudentInfoForm';
import SkillAssessment from './components/SkillAssessment';
import LearningPath from './components/LearningPath';
import AIChat from './components/AIChat';
import './App.css';

function App() {
  const { uiState, student, reset } = useLearnMateStore();

  const renderStep = () => {
    switch (uiState.currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'student-info':
        return <StudentInfoForm />;
      case 'assessment':
        return <SkillAssessment />;
      case 'learning-path':
        return <LearningPath />;
      case 'chat':
        return <AIChat />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-brand">
          <div className="brand-icon">🎓</div>
          <span>LearnMate</span>
        </div>
        {student.name && (
          <div className="nav-user">
            <span className="user-name">{student.name}</span>
            <button onClick={reset} className="btn-reset">
              Reset
            </button>
          </div>
        )}
      </nav>

      <main className="app-main">
        {renderStep()}
      </main>

      <footer className="app-footer">
        <p>
          LearnMate - Your personalized AI learning coach | Powered by Gemini AI & IBM Cloud Services
        </p>
      </footer>
    </div>
  );
}

export default App;
