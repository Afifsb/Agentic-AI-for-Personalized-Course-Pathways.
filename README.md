# LearnMate - Agentic AI for Personalized Course Pathways

LearnMate is an intelligent AI-powered learning coach that creates personalized course pathways tailored to your interests, skill level, and learning goals. Built with React, Gemini AI, and IBM Cloud services.

**⚠️ Note**: The application works in two modes:
- **Full AI Mode**: Requires a valid Google Gemini API key for advanced AI features
- **Demo Mode**: Works without API key with intelligent fallback responses

## 🎯 Overview

LearnMate solves the challenge of course selection paralysis by:
- **Understanding Your Profile**: Analyzes your interests and skill level
- **Assessing Current Skills**: Evaluates your current expertise
- **Building Adaptive Paths**: Creates personalized learning roadmaps
- **Providing Guidance**: Offers AI-powered coaching and recommendations
- **Tracking Progress**: Monitors your learning journey

## 🌟 Features

### 1. **Personalized Student Profiling**
- Interests selection from 8+ tech domains
- Current skill level assessment
- Learning time availability
- Clear goal definition

### 2. **AI-Powered Assessment**
- Skill level evaluation
- Personalized recommendations
- Course pathway generation

### 3. **Intelligent Course Recommendations**
- Smart course ranking algorithm
- IBM Cloud integration for enhanced recommendations
- Multi-platform course options (Udemy, Coursera, LinkedIn Learning)
- Real-time course database with ratings and student reviews

### 4. **Learning Path Management**
- Visual milestone tracking
- Course recommendations with detailed information
- Progress monitoring
- Expandable course cards with full details

### 5. **AI Coaching Chat**
- Real-time conversation with AI coach
- Gemini AI integration
- Suggested questions for guidance
- Markdown-formatted responses

### 6. **IBM Cloud Integration**
- IBM Granite model for advanced NLP
- Course database management
- Progress tracking and analytics
- Scalable infrastructure

## 🛠️ Tech Stack

- **Frontend**: React 18
- **AI/ML**: Google Gemini API
- **Cloud**: IBM Cloud Lite Services
- **State Management**: Zustand
- **UI**: Custom CSS with responsive design
- **Markdown**: react-markdown for AI responses

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gemini API Key (from Google AI Studio)
- IBM Cloud account (optional, for enhanced features)

### Installation

1. **Clone or navigate to the repository**
   ```bash
   cd c:\Soft_Computing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local and add your keys
   ```

4. **Get your Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste into `.env.local`

5. **Get IBM Cloud Credentials (Optional)**
   - Create an [IBM Cloud account](https://cloud.ibm.com)
   - Set up Lite services
   - Add credentials to `.env.local`

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 📋 Available Learning Domains

- Frontend Development (React, Vue, Angular)
- Backend Development (Node.js, Python, Java)
- Cybersecurity
- UI/UX Design
- Data Science
- Cloud Computing
- Mobile Development
- DevOps & Infrastructure

## 🎓 Supported Specializations

### Frontend Development
- React Fundamentals
- Advanced React Patterns
- Vue.js & Angular
- CSS & SASS Mastery

### Backend Development
- Node.js & Express
- Python & Django
- Microservices Architecture

### Cybersecurity
- Cybersecurity Fundamentals
- Ethical Hacking
- Cloud Security

### UI/UX Design
- UI/UX Fundamentals
- Figma Mastery
- Design Systems

### Data Science
- Python for Data Science
- Machine Learning
- Deep Learning

### Cloud Computing
- AWS Fundamentals
- Azure Platform
- Google Cloud

## 📊 How It Works

1. **Welcome Screen**: Introduction to LearnMate
2. **Student Profile**: User provides interests, goals, and skill level
3. **Skill Assessment**: AI evaluates current expertise
4. **Learning Path Generation**: Personalized roadmap with milestones and courses
5. **AI Coaching**: Chat with your AI coach for guidance and support

## 🤖 AI Coach Features

The AI coach can help with:
- Course recommendations
- Concept explanations
- Learning strategies
- Project suggestions
- Progress assessment
- Skill gap identification

## 🔐 Security & Privacy

- API keys stored in environment variables
- No personal data stored on servers
- HTTPS recommended for production
- Compliant with data protection practices

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'build' folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 Responsive Design

LearnMate is fully responsive and works on:
- Desktop (1920x1080+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔄 State Management

All application state is managed through Zustand store:
- Student profile
- Learning path
- Conversation history
- UI state
- Progress tracking

## 📚 Course Database

The application includes 20+ pre-configured courses across different platforms:
- **Udemy**: Affordable, diverse courses
- **Coursera**: University-level content
- **LinkedIn Learning**: Professional development
- **Microsoft Learn**: Free Azure courses

## 🎨 Customization

### Adding New Specializations
Edit `ibmCloudService.js` and add courses to `getCourseDatabase()`

### Changing Colors
Modify CSS variables in component `.css` files

### Updating AI Prompts
Edit `systemPrompt` in `geminiService.js`

## 🐛 Troubleshooting

### API Key Issues
- Verify key in `.env.local`
- Check key hasn't expired
- Ensure key has proper permissions

### Chat Not Working
- Check browser console for errors
- Verify Gemini API key is valid
- Check internet connection

### Course Recommendations Not Loading
- Verify IBM Cloud connection
- Check console for errors
- Try refreshing the page

## 📝 Environment Variables

```
REACT_APP_GEMINI_API_KEY      - Your Gemini API key
REACT_APP_IBM_API_KEY         - IBM Cloud API key (optional)
REACT_APP_IBM_API_URL         - IBM Cloud API endpoint (optional)
```

## 📊 Analytics & Tracking

IBM Cloud integration provides:
- User engagement metrics
- Learning completion rates
- Time spent per course
- Progress analytics
- Skill acquisition tracking

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use in personal and commercial projects

## 🙋 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors
4. Consult Gemini API documentation

## 🎯 Roadmap

Future enhancements:
- [ ] Video course integration
- [ ] Certification tracking
- [ ] Peer learning communities
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Real-time progress sync
- [ ] Social sharing features
- [ ] Gamification elements

## 🏆 Success Metrics

Track your learning journey:
- Courses completed
- Skills acquired
- Projects built
- Time invested
- Progress percentage
- Milestone achievements

## 📞 Contact

For more information about LearnMate:
- Documentation: Check README files
- Issues: Report via GitHub Issues
- Feedback: Suggestions welcome!

---

**LearnMate** - Your personalized AI learning coach 🎓

Built with ❤️ using React, Gemini AI, and IBM Cloud Services
