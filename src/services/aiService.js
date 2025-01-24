// src/services/aiService.js
import axios from 'axios';

const API_KEYS = {
  GOOGLE_CLOUD: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
  OPENAI: process.env.REACT_APP_OPENAI_API_KEY,
};

// Extract text from an image using Google Cloud Vision
export const extractTextFromImage = async (file) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEYS.GOOGLE_CLOUD}`;
  const base64Image = await toBase64(file);

  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image.split(',')[1], // Remove the data URL prefix
        },
        features: [
          {
            type: 'TEXT_DETECTION',
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, requestBody);
    return response.data.responses[0].fullTextAnnotation.text;
  } catch (error) {
    console.error('Error extracting text:', error);
    return null;
  }
};

// Summarize text using OpenAI GPT
export const summarizeText = async (text) => {
  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = `Summarize the following text in 3 sentences:\n\n${text}`;

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-4', // Use GPT-4 or GPT-3.5
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEYS.OPENAI}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error summarizing text:', error);
    return null;
  }
};

// Analyze an image using Google Cloud Vision
export const analyzeImage = async (file) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEYS.GOOGLE_CLOUD}`;
  const base64Image = await toBase64(file);

  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image.split(',')[1], // Remove the data URL prefix
        },
        features: [
          {
            type: 'LABEL_DETECTION',
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, requestBody);
    return response.data.responses[0].labelAnnotations.map((annotation) => annotation.description);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return null;
  }
};

// Ask a question about the document using OpenAI GPT
export const askQuestion = async (documentText, question) => {
  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = `Document:\n\n${documentText}\n\nQuestion: ${question}\nAnswer:`;

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-4', // Use GPT-4 or GPT-3.5
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEYS.OPENAI}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error asking question:', error);
    return 'Failed to get an answer. Please try again.';
  }
};

// Convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });