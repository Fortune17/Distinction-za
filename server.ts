import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Initialize Google Gemini AI with User-Agent header for telemetry
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Distinction ZA',
    developer: 'Dac Technologies',
    aiEnabled: Boolean(ai),
    timestamp: new Date().toISOString(),
  });
});

// AI Tutor endpoint
app.post('/api/tutor', async (req, res) => {
  try {
    const {
      prompt,
      grade,
      phase,
      subject,
      topic,
      language = 'English',
      mode = 'chat', // 'chat' | 'hint' | 'diagnose' | 'practice'
      context = '',
      conversationHistory = [],
      image = '', // base64 data URL
    } = req.body;

    if (!prompt && !image) {
      return res.status(400).json({ error: 'Prompt or image is required' });
    }

    if (!ai) {
      // Offline fallback response tailored for South African CAPS learners
      if (image) {
        return res.json({
          text: `📸 [Zola Visual Analysis • Offline CAPS Assistant]
I have received your uploaded photo for Grade ${grade || '12'} ${subject || 'Studies'}.

🔍 Image Review & CAPS Breakdown:
1. Problem Identification:
   Your photo shows a typical South African assessment/exam problem. In CAPS examinations, examiners reward systematic layout and clarity.

2. Step-by-Step Problem Solving Method:
   • Step 1: Write down all known data/variables given in the diagram or question stem.
   • Step 2: State the primary CAPS formula or scientific principle clearly (e.g., in Maths: standard form / derivative rules; in Physics: Newton's second law / work-energy theorem; in Life Sciences: identify cellular structures or genetic crosses).
   • Step 3: Perform algebraic substitution before rounding. Remember: DBE marking awards [M] Method marks for correct substitution, not just the final answer!
   • Step 4: Include correct SI units and directional vectors where applicable.

3. Study Advice:
   Double-check your working against your CAPS textbook formula sheet. Connect to live internet anytime for real-time multimodal deep analysis with Zola!`,
          source: 'local-fallback',
        });
      }
      return res.json({
        text: `[Offline CAPS Guide] Distinction ZA AI Tutor: You are studying Grade ${grade || '12'} ${subject || 'Curriculum'}. Remember to check your CAPS textbook guidelines, review your step-by-step methods, and write out your working carefully. Connect to the internet for live AI interactive tutoring!`,
        source: 'local-fallback',
      });
    }

    // Adapt pedagogical prompt according to South African Phase and Grade
    let personaGuidance = '';
    if (phase === 'foundation' || (Number(grade) >= 1 && Number(grade) <= 3)) {
      personaGuidance = `
You are talking to a Foundation Phase South African learner in Grade ${grade || 2}.
- Keep sentences short, very simple, encouraging, and warm.
- Use fun relatable examples (e.g., counting bananas, South African animals like lions and zebras, rands and cents, sunny days in Durban/Jozi).
- Break everything into 1 or 2 easy steps.
- Use happy, encouraging words (e.g. "Super star! Let's count together!").
- Do not use complex jargon.
`;
    } else if (phase === 'intermediate' || (Number(grade) >= 4 && Number(grade) <= 6)) {
      personaGuidance = `
You are talking to an Intermediate Phase South African learner in Grade ${grade || 5}.
- Use clear, engaging language with relatable South African analogies (e.g., soccer, tuck shop prices in Rands, seasons, provincial maps).
- Explain "why" things work, not just rules.
- Check their understanding with a quick friendly question at the end.
`;
    } else if (phase === 'senior' || (Number(grade) >= 7 && Number(grade) <= 9)) {
      personaGuidance = `
You are talking to a Senior Phase South African learner in Grade ${grade || 8}.
- Focus on conceptual reasoning and identifying foundational gaps (e.g. how fractions affect algebra, or basic atomic structure in Natural Sciences).
- Use Socratic guidance: ask questions to lead them to the answer rather than just giving it away.
- Use South African CAPS terminology.
`;
    } else {
      // Further Education and Training (FET) - Grades 10–12
      personaGuidance = `
You are tutoring a high school FET learner in Grade ${grade || 12} preparing for their CAPS assessments and National Senior Certificate (NSC) examinations.
- Provide rigorous, exam-aligned explanations reflecting Department of Basic Education (DBE) marking guidelines and diagnostic reports.
- Emphasize method marks, units, step-by-step mathematical/scientific derivations, definitions, and common examination pitfalls.
- Use formal CAPS terminology (e.g., in Physics: Newton's Laws, momentum, Doppler effect; in Maths: quadratic formula, calculus derivatives, Euclidean geometry reasons).
- Guide them to achieve distinction level (80%+ / Level 7) understanding!
`;
    }

    let modeInstruction = '';
    if (mode === 'hint') {
      modeInstruction = 'The learner asked for a HINT. DO NOT give the final answer! Give a smart guiding clue that helps them take the next step independently.';
    } else if (mode === 'diagnose') {
      modeInstruction = 'The learner got an answer wrong. Gently explain what common misconception or foundational gap likely caused this mistake without embarrassing them, and show the correct step-by-step method.';
    } else if (mode === 'practice') {
      modeInstruction = 'Generate 2 quick practice questions aligned with the South African CAPS curriculum for this topic. Include the questions clearly, and offer to check their answers when they reply.';
    }

    const systemInstruction = `
You are "Zola", the official AI CAPS Tutor on Distinction ZA, developed by Dac Technologies.
Your mission is to help every South African learner understand their schoolwork, build confidence, and achieve their academic distinction.
Tagline: "Learn Today. Improve Tomorrow. Achieve Your Distinction."

Current Learner Profile:
- Grade: ${grade || 'Not specified'}
- Phase: ${phase || 'General'}
- Subject: ${subject || 'General Studies'}
- Current Topic: ${topic || 'General Revision'}
- Preferred Language: ${language}

Key Rules:
1. Always align strictly with official South African Curriculum Assessment Policy Statements (CAPS).
2. If language is not English (e.g. isiZulu, Afrikaans, isiXhosa, Sesotho, Sepedi, Setswana), provide explanations in that language or bilingual explanations as helpful for South African learners.
3. Use South African real-world context (Rands and cents currency "R", South African provinces, cities like Soweto, Cape Town, Polokwane, Gqeberha, local culture and nature).
4. Socratic and encouraging: praise effort, break complex ideas down, give hints before final solutions.
6. Tone: inspiring, respectful, patient, culturally aware.

${image ? `
Visual / Photo Examination Guidance:
The learner has attached a photo of their schoolwork (textbook page, past exam paper, handwritten calculations, geometry diagram, synoptic chart, or biological diagram).
- Transcribe or summarize what is visible in the image.
- If handwritten working is shown, check each step for arithmetic, sign, or method errors. Point out exactly where the student went wrong or praise their good steps.
- Provide a complete, worked step-by-step solution aligned with Department of Basic Education (DBE) National Senior Certificate (NSC) marking rubrics, highlighting Method marks [M] and Accuracy marks [A].
- If it is a diagram, identify the components and explain their functions.
` : ''}

${personaGuidance}

${modeInstruction}
${context ? `Relevant Lesson/Question Context:\n${context}` : ''}
`;

    // Construct contents history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<any> }> = [];

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      for (const msg of conversationHistory.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(msg.content || msg.text || '') }],
        });
      }
    }

    // Construct current user parts (with optional photo)
    const userParts: Array<any> = [];
    if (image && typeof image === 'string') {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        userParts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }
    userParts.push({
      text: prompt && prompt.trim()
        ? prompt.trim()
        : 'Please review and solve this photo of my schoolwork step-by-step according to South African CAPS curriculum.',
    });

    contents.push({
      role: 'user',
      parts: userParts,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm here to help you achieve your distinction! Could you ask your question again?";
    res.json({ text, source: 'gemini-3.8-flash' });
  } catch (err: any) {
    console.error('Error in /api/tutor:', err);
    res.status(500).json({
      error: 'Unable to connect to AI tutor at this moment.',
      details: err.message,
      fallbackText: 'Distinction ZA Tutor: Please review the CAPS notes for this topic while we reconnect to the tutoring engine.',
    });
  }
});

// Mount Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Distinction ZA server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
