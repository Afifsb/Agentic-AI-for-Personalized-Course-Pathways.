import React, { useState, useRef, useEffect } from 'react';
import { useLearnMateStore } from '../store/learnmateStore';
import { geminiService } from '../services/geminiService';
import Markdown from 'react-markdown';
import './AIChat.css';

export const AIChat = () => {
  const { student, conversationHistory, addToConversation } = useLearnMateStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      text: message
    };
    addToConversation(userMessage);
    setMessage('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await geminiService.chat(message, conversationHistory);
      
      // Add AI response
      addToConversation({
        sender: 'ai',
        text: aiResponse
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      addToConversation({
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please make sure your Gemini API key is properly configured. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What should I focus on next?',
    'Can you explain this concept in simpler terms?',
    'How am I progressing?',
    'Suggest a project for me',
    'What are common mistakes in this field?'
  ];

  const handleSuggestedQuestion = async (question) => {
    setMessage(question);
    // Simulate sending the message
    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <div className="ai-chat">
      <div className="chat-container">
        <div className="chat-header">
          <h1>💬 AI Learning Coach</h1>
          <p>Ask me anything about your learning path or the topics you're studying</p>
        </div>

        <div className="chat-messages">
          {conversationHistory.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to Your AI Coach!</h2>
              <p>I'm here to help you with your learning journey in {student.interests[0]}.</p>
              <div className="suggested-questions">
                <p className="suggestion-title">Suggested questions:</p>
                <div className="suggestions-grid">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            conversationHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message ai typing">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
              className="chat-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="send-button"
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
