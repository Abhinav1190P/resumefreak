"use server";

export interface JDMatchResult {
  score: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  sections: {
    skills: number;
    experience: number;
    education: number;
  };
}

async function askGroq(prompt: string): Promise<string> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    }
  );
  const data = await response.json();
  return data.choices[0].message.content;
}

export async function analyzeJDMatch(
  resumeText: string,
  jobDescription: string
): Promise<JDMatchResult> {
  const prompt = `You are an expert ATS (Applicant Tracking System) and resume analyzer.

Analyze this resume against the job description and return a JSON object.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY a raw JSON object (no markdown, no backticks) with this exact structure:
{
  "score": <number 0-100 representing overall match percentage>,
  "summary": "<2-3 sentence honest assessment of fit>",
  "matchedKeywords": ["<keyword1>", "<keyword2>", ...],
  "missingKeywords": ["<keyword1>", "<keyword2>", ...],
  "suggestions": ["<specific actionable suggestion 1>", "<suggestion 2>", "<suggestion 3>", "<suggestion 4>"],
  "sections": {
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "education": <number 0-100>
  }
}

Be honest and specific. matchedKeywords should list skills/technologies found in both. missingKeywords should list important JD requirements missing from resume. suggestions should be specific actionable improvements.`;

  const result = await askGroq(prompt);
  const match = result.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in response");
  return JSON.parse(match[0]);
}