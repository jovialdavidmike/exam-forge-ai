import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_SUBJECTS = new Set([
  "mathematics", "english", "physics", "chemistry", "biology",
  "government", "literature", "economics", "civic", "commerce",
]);

const MAX_SUBJECTS = 10;
const MAX_WEAK_TOPICS = 20;
const MAX_TOPIC_LENGTH = 100;

function validateStudyPlanInput(body: unknown): { valid: boolean; error?: string; data?: { examDate: string; subjects: string[]; weakTopics: string[] } } {
  if (typeof body !== "object" || body === null) return { valid: false, error: "Invalid request body" };
  const { examDate, subjects, weakTopics } = body as Record<string, unknown>;

  // Validate examDate as ISO date
  if (typeof examDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(examDate)) {
    return { valid: false, error: "examDate must be a valid date (YYYY-MM-DD)" };
  }
  const parsed = new Date(examDate);
  if (isNaN(parsed.getTime())) return { valid: false, error: "examDate is not a valid date" };

  // Validate subjects against whitelist
  if (!Array.isArray(subjects) || subjects.length === 0 || subjects.length > MAX_SUBJECTS) {
    return { valid: false, error: `subjects must be an array of 1-${MAX_SUBJECTS} items` };
  }
  const validatedSubjects: string[] = [];
  for (const s of subjects) {
    if (typeof s !== "string") return { valid: false, error: "each subject must be a string" };
    const lower = s.toLowerCase().trim();
    if (!VALID_SUBJECTS.has(lower)) return { valid: false, error: `unknown subject: ${s}` };
    validatedSubjects.push(s.trim().slice(0, 50));
  }

  // Validate weakTopics
  const validatedTopics: string[] = [];
  if (weakTopics !== undefined && weakTopics !== null) {
    if (!Array.isArray(weakTopics)) return { valid: false, error: "weakTopics must be an array" };
    if (weakTopics.length > MAX_WEAK_TOPICS) return { valid: false, error: `weakTopics exceeds maximum of ${MAX_WEAK_TOPICS}` };
    for (const t of weakTopics) {
      if (typeof t !== "string") return { valid: false, error: "each weak topic must be a string" };
      if (t.length > MAX_TOPIC_LENGTH) return { valid: false, error: `weak topic exceeds ${MAX_TOPIC_LENGTH} characters` };
      // Strip anything that isn't alphanumeric, spaces, hyphens, or common punctuation
      validatedTopics.push(t.replace(/[^\w\s\-.,&()'/]/g, "").trim().slice(0, MAX_TOPIC_LENGTH));
    }
  }

  return { valid: true, data: { examDate, subjects: validatedSubjects, weakTopics: validatedTopics } };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );
    const token = authHeader.replace("Bearer ", "");
    const { data, error: claimsError } = await supabase.auth.getUser(token);
    if (claimsError || !data?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const validation = validateStudyPlanInput(body);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { examDate, subjects, weakTopics } = validation.data!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const today = new Date().toISOString().split("T")[0];

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
            content: `You are a study plan generator for Nigerian exam students (JAMB/WAEC/NECO). Create a detailed, realistic daily study schedule. Return valid JSON only, no markdown.`,
          },
          {
            role: "user",
            content: `Create a study plan from ${today} to ${examDate} for these subjects: ${subjects.join(", ")}.
${weakTopics.length ? `Weak topics to focus on: ${weakTopics.join(", ")}` : ""}

Return JSON in this exact format:
{
  "totalDays": number,
  "plan": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "subject": "Subject Name",
      "topic": "Topic Name",
      "duration": "2 hours",
      "tasks": ["Read notes on X", "Practice 20 MCQs", "Review mistakes"]
    }
  ],
  "tips": ["tip1", "tip2"]
}

Limit to max 14 days of plan. Distribute subjects evenly, prioritize weak topics early.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("study-plan error:", response.status, t);
      return new Response(JSON.stringify({ error: "Failed to generate study plan." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    let plan;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
      plan = JSON.parse(jsonMatch[1].trim());
    } catch {
      plan = { error: "Could not parse study plan", raw: content };
    }

    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("study-plan error:", e);
    return new Response(JSON.stringify({ error: "An unexpected error occurred." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
