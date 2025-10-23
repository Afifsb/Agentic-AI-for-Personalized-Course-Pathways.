import React, { useState } from 'react';
import { useLearnMateStore } from '../store/learnmateStore';
import './LearningPath.css';

export const LearningPath = () => {
  const { learningPath, setCurrentStep, addCompletedCourse } = useLearnMateStore();
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const handleCourseClick = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const handleMilestoneClick = (milestoneId) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const handleEnrollCourse = (courseId) => {
    alert('Redirecting to course platform...');
    // In a real application, this would redirect to the actual course
  };

  const handleCompleteCourse = (courseId) => {
    addCompletedCourse(courseId);
    alert('Course marked as completed!');
  };

  return (
    <div className="learning-path">
      <div className="path-container">
        <div className="path-header">
          <h1>Your Personalized Learning Path</h1>
          <p className="path-subtitle">
            A curated roadmap for {learningPath.pathName}
          </p>
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="progress-stat">
            <div className="stat-number">{learningPath.progressPercentage}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
          <div className="progress-stat">
            <div className="stat-number">{learningPath.completedCourses.length}</div>
            <div className="stat-label">Courses Completed</div>
          </div>
          <div className="progress-stat">
            <div className="stat-number">{learningPath.courses.length}</div>
            <div className="stat-label">Recommended Courses</div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${learningPath.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Milestones Section */}
        <section className="milestones-section">
          <h2>🎯 Learning Milestones</h2>
          <div className="milestones-list">
            {learningPath.milestones?.map((milestone, index) => (
              <div key={milestone.id} className="milestone-card">
                <div
                  className="milestone-header"
                  onClick={() => handleMilestoneClick(milestone.id)}
                >
                  <div className="milestone-info">
                    <div className="milestone-number">{index + 1}</div>
                    <div className="milestone-details">
                      <h3>{milestone.name}</h3>
                      <span className={`milestone-status ${milestone.status}`}>
                        {milestone.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="milestone-duration">{milestone.duration}</div>
                </div>
                {expandedMilestone === milestone.id && (
                  <div className="milestone-content">
                    <p>{milestone.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <h2>📚 Recommended Courses</h2>
          <div className="courses-grid">
            {learningPath.courses?.map(course => (
              <div
                key={course.id}
                className={`course-card ${expandedCourse === course.id ? 'expanded' : ''}`}
              >
                <div
                  className="course-header"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <div className="course-meta">
                      <span className="platform-badge">{course.platform}</span>
                      <span className="level-badge">{course.level}</span>
                    </div>
                  </div>
                  <div className="course-rating">⭐ {course.rating}</div>
                </div>

                {expandedCourse === course.id && (
                  <div className="course-content">
                    <p className="course-description">{course.description}</p>
                    <div className="course-stats">
                      <div className="stat">
                        <span className="label">Instructor:</span>
                        <span className="value">{course.instructor}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Students:</span>
                        <span className="value">{(course.students / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="stat">
                        <span className="label">Price:</span>
                        <span className="value">${course.price}</span>
                      </div>
                    </div>
                    <div className="course-actions">
                      <button
                        className="btn-enroll"
                        onClick={() => handleEnrollCourse(course.id)}
                      >
                        Enroll Now
                      </button>
                      <button
                        className="btn-complete"
                        onClick={() => handleCompleteCourse(course.id)}
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chat Section */}
        <section className="chat-section">
          <button
            className="btn-chat"
            onClick={() => setCurrentStep('chat')}
          >
            💬 Chat with AI Coach
          </button>
        </section>

        {/* Action Buttons */}
        <div className="path-actions">
          <button
            className="btn-secondary"
            onClick={() => setCurrentStep('student-info')}
          >
            Update Profile
          </button>
          <button
            className="btn-primary"
            onClick={() => setCurrentStep('chat')}
          >
            Get Guidance
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
