import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { examDate, subjects, weakTopics } = await req.json();
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
${weakTopics?.length ? `Weak topics to focus on: ${weakTopics.join(", ")}` : ""}

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

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Try to parse JSON from the response
    let plan;
    try {
      // Handle potential markdown code blocks
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
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
