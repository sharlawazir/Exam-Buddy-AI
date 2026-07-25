import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type Feature =
  | "study-planner"
  | "quiz-generator"
  | "topic-explainer"
  | "notes-summarizer"
  | "study-coach"
  | "exam-buddy";

interface AiRequest {
  feature: Feature;
  payload: Record<string, string>;
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiMessage {
  role: "user" | "model";
  parts: GeminiPart[];
}

const FORMATTING_RULES =
  "Output rules you MUST follow: " +
  "Return clean, readable plain text only. " +
  "Never use Markdown (no asterisks, hashes, underscores, backticks, or dashes for formatting). " +
  "Never use LaTeX or math delimiters such as $...$ or \\(...\\). " +
  "Never output JSON, code blocks, or HTML. " +
  "For emphasis, use blank lines and capital letters only. " +
  "Use plain hyphens (-) at the start of bullet lines, nothing else. " +
  "Keep everything a non-technical student can read directly.";

const SYSTEM_PROMPTS: Record<Feature, string> = {
  "exam-buddy":
    "You are Exam Buddy AI, a friendly AI study assistant for university students. " +
    "You help students understand concepts, solve problems, generate quizzes, create study plans, and provide motivation. " +
    "Always answer in simple English. " +
    "Use headings (in plain capital letters) and bullet points where appropriate. " +
    "Never answer with raw Markdown, JSON, or LaTeX. " +
    "Keep responses clear, organised, and beginner-friendly.",

  "study-planner":
    "You are an expert academic study planner for university students. " +
    "Given a subject, the number of days until the exam, and hours available per day, " +
    "create a day-by-day study plan covering ONLY those exact days. " +
    "Divide the subject's topics realistically across the available days based on the hours per day. " +
    "Never generate extra days or days beyond the exam date. " +
    "If there is only 1 day, produce a 1-day plan. If there are 2 days, produce a 2-day plan, and so on. " +
    "Use a clear heading for each day (for example, 'Day 1') followed by bullet points listing the topics, time blocks, and a short review task. " +
    "Keep the language plain and motivating. " +
    FORMATTING_RULES,

  "quiz-generator":
    "You are a university-level quiz generator. " +
    "Given a topic, produce exactly 10 multiple-choice questions. " +
    "Every question must have exactly four options labelled A, B, C, and D. " +
    "After each question, state the correct answer on its own line as 'Correct answer: X' and add a one-line explanation. " +
    "Do not use LaTeX, Markdown symbols, or mathematical formatting such as $...$. " +
    "Write all math and symbols in plain text words. " +
    "Number the questions 1 to 10. " +
    FORMATTING_RULES,

  "topic-explainer":
    "You are a patient university tutor. " +
    "Given a topic, explain it in simple English for a student. " +
    "Use short paragraphs and everyday examples. " +
    "Cover: a short definition, the key ideas, a simple worked example, common mistakes students make, and a quick recap. " +
    "Avoid technical formatting, jargon, and long blocks of text. " +
    FORMATTING_RULES,

  "notes-summarizer":
    "You are a notes summarizer for university students. " +
    "Given raw notes, return three clearly labelled sections: " +
    "Summary (a few plain sentences), Key Points (bullet points), and Revision Tips (bullet points of practical ways to revise the material). " +
    "Use the section names as headings and bullet points under each. " +
    FORMATTING_RULES,

  "study-coach":
    "You are an encouraging study coach for university students. " +
    "Give personalised motivation and one piece of practical study advice. " +
    "Keep the response positive, warm, and concise (under 120 words). " +
    "Do not use any formatting symbols. " +
    FORMATTING_RULES,
};

function daysUntilExam(examDate: string): number | null {
  if (!examDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(examDate + "T00:00:00");
  if (isNaN(exam.getTime())) return null;
  const diffMs = exam.getTime() - today.getTime();
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return days < 0 ? 0 : days;
}

function buildUserPrompt(feature: Feature, payload: Record<string, string>): string {
  switch (feature) {
    case "study-planner": {
      const days = daysUntilExam(payload.examDate);
      const daysText = days === null ? "unknown" : String(days);
      return (
        `Subject: ${payload.subject || "General"}\n` +
        `Days until exam: ${daysText}\n` +
        `Hours available per day: ${payload.hours || "2"}\n\n` +
        `Create a study plan that covers exactly ${daysText} day(s). ` +
        `Do not include any day beyond the exam. Divide the topics across only these days.`
      );
    }
    case "quiz-generator":
      return `Topic: ${payload.topic || "General knowledge"}\n\nGenerate exactly 10 multiple-choice questions with options A, B, C, D and the correct answer after each. No Markdown or LaTeX.`;
    case "topic-explainer":
      return `Topic: ${payload.topic || "the topic"}\n\nExplain this topic in simple English with short paragraphs and examples.`;
    case "notes-summarizer":
      return `Notes:\n${payload.notes || ""}\n\nSummarize these notes into Summary, Key Points, and Revision Tips sections using bullet points.`;
    case "study-coach":
      return `Give me motivation and one practical study tip to study today. Keep it positive and concise.`;
    case "exam-buddy":
      return payload.message || "Hello!";
  }
}

function fallbackResponse(feature: Feature, payload: Record<string, string>): string {
  switch (feature) {
    case "study-planner": {
      const subject = payload.subject || "your subject";
      const hours = payload.hours || "2";
      const days = daysUntilExam(payload.examDate);
      const dayCount = days === null ? 2 : Math.max(1, days);
      let plan = `Study Plan: ${subject}\n\n(Preview mode - connect the Gemini API key for a personalized plan.)\n\nBased on ${hours} hours of study per day:\n`;
      for (let i = 1; i <= dayCount; i++) {
        plan += `\nDay ${i}\n`;
        if (i === dayCount) {
          plan += `- Light review of all summaries and key formulas\n- Self-test with practice questions\n- Rest well before the exam\n`;
        } else {
          plan += `- Review foundational concepts and terminology\n- Deep-dive into core topics with practice problems\n- Short review of the day's material\n`;
        }
      }
      plan += `\nTips\n- Break each session into 50-minute focus blocks with 10-minute breaks\n- Active recall beats re-reading, so test yourself often\n- Sleep well the night before the exam`;
      return plan;
    }
    case "quiz-generator": {
      const topic = payload.topic || "this topic";
      return (
        `Quiz: ${topic}\n\n(Preview mode - connect the Gemini API key for a real generated quiz.)\n\n` +
        `1. Which best describes the core idea of ${topic}?\nA. Option one\nB. Option two\nC. Option three\nD. Option four\nCorrect answer: B\nExplanation placeholder.\n\n` +
        `2. A second sample question about ${topic}?\nA. Option one\nB. Option two\nC. Option three\nD. Option four\nCorrect answer: A\nExplanation placeholder.\n\n` +
        `(Connect Gemini to generate all 10 questions.)`
      );
    }
    case "topic-explainer": {
      const topic = payload.topic || "this topic";
      return (
        `${topic}\n\n(Preview mode - connect the Gemini API key for a full explanation.)\n\n` +
        `Definition\nA short, clear definition of ${topic} in plain words.\n\n` +
        `Key ideas\n${topic} can be understood by connecting a few simple ideas. Think of it like a recipe: each step builds on the last.\n\n` +
        `Worked example\nA basic example showing ${topic} in everyday life.\n\n` +
        `Common mistakes\nOne thing people often get wrong about ${topic} is confusing the core idea with a related one.\n\n` +
        `Recap\n${topic} is best understood by connecting the definition to the worked example.`
      );
    }
    case "notes-summarizer": {
      return (
        `Summary\n\n(Preview mode - connect the Gemini API key to summarize your notes.)\n\n` +
        `Summary\nA concise summary of the pasted notes would appear here.\n\n` +
        `Key Points\n- First key point from the notes\n- Second key point from the notes\n- Third key point from the notes\n\n` +
        `Revision Tips\n- Rewrite the key points from memory and check against the original\n- Make flashcards for the most important terms\n- Explain each point aloud as if teaching a friend`
      );
    }
    case "study-coach": {
      return (
        `You have got this. Every expert was once a beginner who refused to give up, and today's study session is one step closer to mastery.\n\n` +
        `Practical tip: pick one small, specific task and finish it before moving on. Momentum beats motivation every time.\n\n` +
        `You are capable, prepared, and more ready than you feel. Take a breath, open the book, and begin.`
      );
    }
    case "exam-buddy": {
      return (
        `Hi there. I am Exam Buddy AI, your study assistant.\n\n` +
        `I can help you understand concepts, solve problems, generate quizzes, build study plans, and stay motivated.\n\n` +
        `What would you like to work on today?`
      );
    }
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { feature, payload } = (await req.json()) as AiRequest;
    const validFeatures: Feature[] = [
      "study-planner",
      "quiz-generator",
      "topic-explainer",
      "notes-summarizer",
      "study-coach",
      "exam-buddy",
    ];
    if (!feature || !validFeatures.includes(feature)) {
      return new Response(
        JSON.stringify({ error: "Invalid feature requested." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("gemini_key");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          content: fallbackResponse(feature, payload || {}),
          preview: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[feature];
    const userPrompt = buildUserPrompt(feature, payload || {});

    const contents: GeminiContent = {
      parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [contents],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${geminiRes.status} — ${errText}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiRes.json();
    const content =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
      fallbackResponse(feature, payload || {});

    return new Response(
      JSON.stringify({ content, preview: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Unexpected server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
