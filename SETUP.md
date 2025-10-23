# LearnMate Setup Guide

## Quick Start (5 minutes)

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Setup Project
```bash
# Navigate to project directory
cd c:\Soft_Computing

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Step 3: Add API Key
Open `.env.local` and add:
```
REACT_APP_GEMINI_API_KEY=your_copied_key_here
```

### Step 4: Run Application
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## Detailed Setup

### System Requirements
- Node.js v14+
- npm v6+
- Modern browser (Chrome, Firefox, Safari, Edge)
- 200MB free disk space

### Installation Steps

#### 1. Install Node.js
- Download from [nodejs.org](https://nodejs.org)
- Choose LTS version
- Follow installation wizard
- Verify: `node --version` & `npm --version`

#### 2. Navigate to Project
```powershell
cd c:\Soft_Computing
```

#### 3. Install Dependencies
```powershell
npm install
```

This installs:
- React 18
- Zustand (state management)
- @google/generative-ai (Gemini)
- react-markdown
- axios
- uuid

#### 4. Get API Keys

##### Gemini API (Required)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Select or create project
5. Copy the generated key

##### IBM Cloud (Optional)
1. Create account at [ibm.com/cloud](https://cloud.ibm.com)
2. Create Lite plan
3. Set up Granite model
4. Get API credentials

#### 5. Configure Environment
Create `.env.local`:
```bash
REACT_APP_GEMINI_API_KEY=paste_your_key_here
REACT_APP_IBM_API_KEY=optional_ibm_key
REACT_APP_IBM_API_URL=https://api.us-south.assistant.watson.cloud.ibm.com
```

#### 6. Run Development Server
```powershell
npm start
```

Application opens at `http://localhost:3000`

---

## Usage Guide

### Step 1: Welcome Screen
- Click "Start Your Journey"
- Learn about LearnMate features

### Step 2: Student Profile
- Enter your name and email
- Select interests (Frontend, Cybersecurity, etc.)
- Choose skill level (Beginner/Intermediate/Advanced)
- Write learning goals
- Select available time
- Click "Create My Learning Path"

### Step 3: Skill Assessment
- Answer questions about your experience
- Describe technical challenges
- List your strengths
- Click "Generate My Learning Path"

### Step 4: Learning Path
- Review your personalized roadmap
- See milestones and course recommendations
- Click course cards for details
- Enroll in courses or mark as complete

### Step 5: AI Chat
- Click "Chat with AI Coach"
- Ask questions about your learning path
- Get personalized guidance
- Use suggested questions

---

## Features Overview

### 🎯 Personalization
- Analyzes interests and goals
- Assesses current skill level
- Creates adaptive learning paths
- Recommends suitable courses

### 🤖 AI Coaching
- Chat with intelligent AI
- Get learning strategies
- Receive course guidance
- Ask concept explanations

### 📊 Progress Tracking
- Monitor completion status
- Track milestones
- View analytics
- Measure improvements

### 📚 Course Database
- 20+ recommended courses
- Multiple platforms (Udemy, Coursera)
- Real ratings and reviews
- Detailed course information

---

## Troubleshooting

### Issue: "Module not found" error
**Solution:**
```bash
rm -r node_modules
npm install
```

### Issue: API Key not working
**Solution:**
1. Check `.env.local` has correct key
2. Visit Google AI Studio to verify key
3. Ensure key isn't restricted
4. Regenerate key if needed

### Issue: Chat not responding
**Solution:**
1. Check browser console (F12)
2. Verify internet connection
3. Confirm API key is valid
4. Check Google API quotas

### Issue: Port 3000 already in use
**Solution:**
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or use different port
set PORT=3001 && npm start
```

### Issue: Styles not loading
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Restart dev server
4. Check CSS file paths

---

## Building for Production

### Create Production Build
```bash
npm run build
```

Creates optimized build in `/build` folder.

### Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload 'build' folder to Netlify
```

### Deploy to Your Server
```bash
npm run build
# Copy 'build' folder to server
# Serve with web server (Apache, Nginx, etc)
```

---

## Advanced Configuration

### Custom Course Database
Edit `src/services/ibmCloudService.js`:
```javascript
getCourseDatabase() {
  return [
    // Add your courses here
    {
      id: 'custom-course',
      title: 'My Course',
      // ... other properties
    }
  ];
}
```

### Customize AI System Prompt
Edit `src/services/geminiService.js`:
```javascript
const systemPrompt = `Your custom instructions here...`;
```

### Change Theme Colors
Edit component CSS files:
```css
/* Change gradient colors */
background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
```

---

## Performance Tips

1. **Optimize Images**: Use compressed images
2. **Code Splitting**: Already implemented with React
3. **API Caching**: Consider caching API responses
4. **CDN**: Deploy build to CDN for faster delivery
5. **Monitoring**: Add analytics to track usage

---

## Security Best Practices

1. **Never commit `.env` files**
2. **Rotate API keys regularly**
3. **Use HTTPS in production**
4. **Validate all user inputs**
5. **Keep dependencies updated**: `npm audit fix`

---

## Next Steps

1. Customize course database
2. Add more specializations
3. Integrate with course platforms
4. Add user authentication
5. Deploy to production
6. Monitor analytics
7. Gather user feedback

---

## Support Resources

- [React Documentation](https://react.dev)
- [Gemini API Docs](https://ai.google.dev)
- [IBM Cloud Docs](https://cloud.ibm.com/docs)
- [GitHub Issues](https://github.com)

---

## FAQ

**Q: Can I use LearnMate offline?**
A: No, it requires internet for AI features.

**Q: How many free API calls do I get?**
A: Gemini API has generous free tier (60 requests/min).

**Q: Can I modify the courses list?**
A: Yes, edit `ibmCloudService.js` getCourseDatabase() function.

**Q: Is user data saved?**
A: No, data is only stored in browser's Zustand store.

**Q: Can I deploy to production?**
A: Yes, follow "Building for Production" section.

---

## Version Info

- React: 18.2.0
- Node: 14+
- npm: 6+
- Gemini API: v1 (latest)

---

Happy Learning! 🎓
