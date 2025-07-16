// pages/api/gemini.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Missing prompt in request body" });
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 250,
        }
      }),
    });

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.status(200).json({ advice: data.candidates[0].content.parts[0].text.trim() });
    } else {
      throw new Error(data?.error?.message || "Unexpected API response");
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}
