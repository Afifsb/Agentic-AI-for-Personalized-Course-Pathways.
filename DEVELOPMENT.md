# Development Guide - LearnMate

## Project Structure

```
learnmate/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.js
│   │   ├── WelcomeScreen.css
│   │   ├── StudentInfoForm.js
│   │   ├── StudentInfoForm.css
│   │   ├── SkillAssessment.js
│   │   ├── SkillAssessment.css
│   │   ├── LearningPath.js
│   │   ├── LearningPath.css
│   │   ├── AIChat.js
│   │   ├── AIChat.css
│   │   └── index.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── ibmCloudService.js
│   ├── store/
│   │   └── learnmateStore.js
│   ├── config/
│   │   └── config.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── SETUP.md
└── DEVELOPMENT.md (this file)
```

## Development Setup

### 1. Initial Setup
```bash
cd c:\Soft_Computing
npm install
cp .env.example .env.local
```

### 2. Configure Environment
Edit `.env.local`:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### 3. Start Development Server
```bash
npm start
```

### 4. Open in Browser
```
http://localhost:3000
```

## Project Architecture

### Component Hierarchy
```
App
├── WelcomeScreen
├── StudentInfoForm
├── SkillAssessment
├── LearningPath
└── AIChat
```

### Data Flow
```
User Input
    ↓
StudentInfoForm
    ↓
learnmateStore (Zustand)
    ↓
SkillAssessment / LearningPath / AIChat
    ↓
Services (Gemini / IBM Cloud)
    ↓
AI Response
    ↓
Store Update
    ↓
Component Re-render
```

### State Management
Using Zustand for global state:
- `student`: User profile data
- `learningPath`: Generated learning path
- `conversationHistory`: Chat messages
- `uiState`: Current step and loading states

## Key Services

### geminiService.js
Handles all Gemini AI interactions:
- `startCoachingSession()`: Initial AI assessment
- `generateCourseRecommendations()`: Course suggestions
- `provideStudyGuidance()`: Learning guidance
- `assessSkillLevel()`: Skill evaluation
- `chat()`: Conversation with AI

### ibmCloudService.js
IBM Cloud integration:
- `initializeGraniteModel()`: Set up Granite model
- `getGraniteRecommendations()`: Advanced recommendations
- `processRecommendationsLocally()`: Local processing
- `trackProgress()`: Analytics tracking
- `generateAnalytics()`: Learning analytics

## Adding New Features

### Add a New Component
1. Create component file:
```bash
touch src/components/NewComponent.js
touch src/components/NewComponent.css
```

2. Implement component:
```javascript
import React from 'react';
import './NewComponent.css';

export const NewComponent = () => {
  return (
    <div className="new-component">
      {/* Your JSX here */}
    </div>
  );
};

export default NewComponent;
```

3. Add to App.js:
```javascript
import NewComponent from './components/NewComponent';

// In renderStep():
case 'new-step':
  return <NewComponent />;
```

### Add New Store Actions
Edit `src/store/learnmateStore.js`:
```javascript
export const useLearnMateStore = create((set, get) => ({
  // ... existing state
  
  // New action
  myNewAction: (data) => {
    set((state) => ({
      // Update state
    }));
  }
}));
```

### Add New API Service
Create new file:
```javascript
// src/services/myService.js
export const myService = {
  async myMethod() {
    // Implementation
  }
};
```

## Styling Guidelines

### CSS Architecture
- Component-scoped CSS files
- BEM naming convention
- Mobile-first approach
- Consistent spacing (8px grid)

### Color Scheme
```css
/* Primary */
--primary: #667eea;
--secondary: #764ba2;

/* Status */
--success: #10b981;
--warning: #f97316;
--danger: #ef4444;

/* Neutral */
--text-primary: #333;
--text-secondary: #666;
--bg-light: #f8f9ff;
--border: #e0e0e0;
```

### Responsive Breakpoints
```css
/* Mobile */
< 768px

/* Tablet */
768px - 1024px

/* Desktop */
> 1024px
```

## API Integration

### Using Gemini API
```javascript
import { geminiService } from '../services/geminiService';

// In your component
const response = await geminiService.chat(message, history);
```

### Using IBM Cloud
```javascript
import { ibmCloudService } from '../services/ibmCloudService';

// Get recommendations
const courses = ibmCloudService.processRecommendationsLocally(
  studentProfile,
  courseDatabase
);
```

## Debugging

### Browser DevTools
1. Press `F12` to open DevTools
2. Console tab: Check for errors
3. Network tab: Monitor API calls
4. React DevTools: Inspect component state

### Zustand DevTools
```javascript
// In store
import { devtools } from 'zustand/middleware';

export const useLearnMateStore = create(
  devtools((set, get) => ({
    // ...
  }))
);
```

### Console Logging
```javascript
// In services
console.log('Debug message:', data);
console.error('Error message:', error);
```

## Testing

### Manual Testing Checklist
- [ ] Welcome screen renders
- [ ] Form validation works
- [ ] API calls succeed
- [ ] Chat responds correctly
- [ ] Progress tracking updates
- [ ] Mobile responsive
- [ ] No console errors

### Test Scenarios
1. **Profile Creation**
   - Valid inputs
   - Empty inputs
   - Special characters

2. **Learning Path Generation**
   - Different skill levels
   - Multiple interests
   - Various time commitments

3. **AI Chat**
   - Various questions
   - Long conversations
   - Network errors

## Performance Optimization

### Code Splitting
Already implemented with React Router (if added):
```javascript
const Component = React.lazy(() => import('./Component'));
```

### Memoization
```javascript
import { useMemo } from 'react';

const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

### Debouncing
```javascript
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
```

## Environment Variables

### Required
```
REACT_APP_GEMINI_API_KEY
```

### Optional
```
REACT_APP_IBM_API_KEY
REACT_APP_IBM_API_URL
```

### Adding New Variables
1. Add to `.env.local`
2. Access via `process.env.REACT_APP_VARIABLE_NAME`
3. Prefix with `REACT_APP_` for safety

## Deployment Checklist

- [ ] Remove console.logs
- [ ] Update .env with production keys
- [ ] Run npm run build
- [ ] Test build locally
- [ ] Check performance
- [ ] Verify all features work
- [ ] Test on mobile
- [ ] Check accessibility

## Troubleshooting Guide

### Issue: Hot reload not working
```bash
# Clear cache and restart
rm -r node_modules package-lock.json
npm install
npm start
```

### Issue: Module import errors
```bash
# Check import paths
# Verify files exist
# Restart dev server
```

### Issue: API 403 errors
```bash
# Check API key validity
# Verify quota limits
# Check time-based restrictions
```

### Issue: State not updating
```javascript
// Use immutable updates
set((state) => ({
  data: { ...state.data, newValue }
}));
```

## Code Style

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_CASE
- CSS classes: kebab-case

### Comments
```javascript
// Single line comment

/*
 * Multi-line comment
 * Explain complex logic
 */

/**
 * JSDoc comment
 * @param {string} name - Description
 * @returns {Promise<string>} - Description
 */
```

## Git Workflow

### Branch Naming
- `feature/feature-name`
- `fix/bug-name`
- `docs/documentation`

### Commit Messages
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
```

## Resources

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Gemini API Docs](https://ai.google.dev)
- [IBM Cloud Docs](https://cloud.ibm.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

## Support

For development help:
1. Check existing code
2. Review documentation
3. Check GitHub issues
4. Consult official docs

## Quick Commands

```bash
# Start development
npm start

# Build for production
npm run build

# Run tests
npm test

# Check code quality
npm run lint

# Format code
npm run format

# Clean install
npm ci
```

## Next Steps

1. Understand the architecture
2. Explore component structure
3. Review services implementation
4. Try modifying components
5. Add new features
6. Deploy to production

Happy coding! 🚀
