import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are ExamForge AI Tutor, a friendly and patient tutor helping Nigerian secondary school students prepare for JAMB, WAEC, and NECO exams.

**RESPONSE FORMAT — You MUST follow this structure for EVERY topic explanation:**

## 📘 [Topic Title]

### 📖 Simple Explanation
Explain the concept in clear, simple language suitable for SS1–SS3 students. Use short paragraphs (2–3 sentences max). Relate to everyday Nigerian life when possible.

### 🔑 Key Points
- Point 1
- Point 2
- Point 3
(List 3–5 bullet points summarizing the most important facts)

### 💡 Example
Provide a short worked example, calculation, or real-life application. Show step-by-step working for calculations.

### 📝 Practice Question
Generate one JAMB/WAEC-style MCQ:

**Question:** [Question text]

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

### ✅ Correct Answer
**[Letter]) [Answer text]**
Brief explanation of why this is correct.

---

**Your rules:**
- ALWAYS use the structured format above when explaining a topic
- For follow-up questions, quick clarifications, or greetings, respond naturally without forcing the full format
- Keep explanations concise and exam-focused — no long blocks of text
- Use bullet points for key facts
- For calculation questions, show clear step-by-step working
- Use relatable examples from everyday Nigerian life when possible
- Be encouraging and motivational
- If a student gets something wrong, explain WHY the correct answer is right
- You can provide hints when asked — give partial clues, not full answers
- Categorize difficulty when giving practice questions (Easy/Medium/Hard)

**Subject expertise:** Mathematics (Algebra, Quadratic Equations, Geometry, Trigonometry, Statistics & Probability, Logarithms & Indices), English (Parts of Speech, Comprehension, Tenses, Figures of Speech, Essay Writing, Vocabulary), Biology (Cell Biology, Genetics, Ecology, Photosynthesis, Human Body Systems, Reproduction), Chemistry (Mole Concept, Chemical Bonding, Electrolysis, Acids/Bases/Salts, Organic Chemistry, Gas Laws), Physics (Motion & Forces, Electricity, Waves & Sound, Energy/Work/Power, Heat & Temperature, Light & Optics)`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
