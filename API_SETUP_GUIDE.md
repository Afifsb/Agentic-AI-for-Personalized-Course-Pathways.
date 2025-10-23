# 🔑 API Setup Guide - LearnMate

This guide will help you set up a valid Google Gemini API key for LearnMate.

## ⚡ Quick Start

LearnMate works in **two modes**:

1. **Demo Mode** (Current) - Works without API key, uses intelligent fallback responses
2. **Full AI Mode** - Requires valid Gemini API key for advanced AI features

## 🚀 Getting Your Gemini API Key

### Step 1: Visit Google AI Studio

Go to: **https://aistudio.google.com/app/apikey**

### Step 2: Sign In

- Sign in with your Google account
- Accept the terms of service if prompted

### Step 3: Create API Key

1. Click **"Create API Key"** button
2. Select **"Create API key in new project"** (recommended)
3. Wait for the key to be generated
4. Copy the API key (starts with `AIza...`)

### Step 4: Verify Your API Key

Before using the key, verify it works:

```bash
# Run this test in your project directory
node test-api-key.js
```

If you see ✅ "API Key works!", proceed to the next step.

### Step 5: Add to Environment File

Open the `.env` file in your project root and update:

```bash
REACT_APP_GEMINI_API_KEY=YOUR_API_KEY_HERE
REACT_APP_IBM_API_KEY=optional_ibm_key
REACT_APP_IBM_API_URL=https://api.us-south.assistant.watson.cloud.ibm.com
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

### Step 6: Restart the Application

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm start
```

## ❌ Troubleshooting

### Issue 1: "404 Not Found" Error

**Cause**: API key doesn't have access to Gemini models

**Solution**:
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Enable the **Generative Language API**
3. Create a new API key
4. Try again

### Issue 2: API Key Invalid

**Cause**: Key might be revoked or expired

**Solution**:
1. Delete the old API key in Google AI Studio
2. Create a brand new API key
3. Update your `.env` file
4. Restart the application

### Issue 3: Rate Limit Exceeded

**Cause**: Too many requests

**Solution**:
1. Wait a few minutes
2. The app will continue to work in Demo Mode
3. Consider upgrading your API quota if needed

### Issue 4: Application Still Uses Demo Mode

**Cause**: Environment variable not loaded

**Solution**:
1. Make sure the file is named `.env` (not `.env.txt`)
2. Restart the development server
3. Hard refresh browser (Ctrl+Shift+R)
4. Check browser console for any errors

## 🆓 Free Tier Limits

Google Gemini API Free Tier includes:
- ✅ 60 requests per minute
- ✅ Unlimited requests per day
- ✅ No credit card required

Perfect for personal learning projects!

## 🔒 Security Best Practices

1. **Never commit API keys to Git**
   - `.env` is already in `.gitignore`
   - Keep your keys private

2. **Regenerate keys if exposed**
   - Delete compromised keys immediately
   - Generate new ones

3. **Use environment variables**
   - Always use `.env` files
   - Never hardcode keys in source code

## 📚 Additional Resources

- **Google AI Studio**: https://aistudio.google.com
- **Gemini API Docs**: https://ai.google.dev/docs
- **API Key Management**: https://aistudio.google.com/app/apikey

## ✅ Verification Checklist

Before using the app:
- [ ] Created API key from Google AI Studio
- [ ] Copied the key correctly (no spaces)
- [ ] Updated `.env` file
- [ ] Restarted the development server
- [ ] Refreshed the browser
- [ ] Checked console for errors

## 💡 Demo Mode Features

Even without an API key, LearnMate provides:
- ✅ Student profile creation
- ✅ Skill assessment with intelligent responses
- ✅ Course recommendations (20+ courses)
- ✅ Learning path generation
- ✅ Smart chat responses
- ✅ Progress tracking
- ✅ Full UI/UX experience

## 🚀 Upgrade to Full AI Mode

Once you add a valid API key:
- 🤖 Advanced AI-powered responses
- 📝 Personalized coaching advice
- 🎯 Dynamic skill assessments
- 💬 Context-aware chat conversations
- 📊 AI-generated learning insights

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for errors
2. Verify the API key in Google AI Studio
3. Ensure the Generative Language API is enabled
4. Try creating a fresh API key

---

**Remember**: LearnMate works great in Demo Mode too! The AI features enhance the experience but aren't required to explore and use the application.
