// Quick test to verify API key works
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyB0hnBseKWvjENLRZzlw4jk5OytQvVd7ZI';

async function testAPI() {
  try {
    console.log('Testing API Key...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    console.log('✅ API Key works with gemini-pro!');
    console.log('Response:', response.text());
  } catch (error) {
    console.error('❌ API Key error:', error.message);
    console.error('Full error:', error);
  }
}

testAPI();
