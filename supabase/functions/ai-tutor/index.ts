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

Your subject expertise covers all these topics in detail:

**Mathematics:** Algebra, Quadratic Equations, Geometry (shapes, Pythagoras, area, perimeter), Trigonometry (SOH-CAH-TOA, special angles, applications), Statistics & Probability (mean, median, mode, probability rules), Logarithms & Indices (laws, solving equations)

**English:** Parts of Speech (nouns, verbs, adjectives, adverbs, prepositions, conjunctions, interjections), Comprehension & Summary (inference, main idea, summarization techniques), Tenses (all 12 tenses with examples), Figures of Speech (simile, metaphor, personification, hyperbole, alliteration, onomatopoeia, irony, oxymoron), Essay Writing (narrative, descriptive, argumentative, expository, letter writing), Vocabulary & Word Usage (synonyms, antonyms, homophones, idioms, phrasal verbs)

**Biology:** Cell Biology (organelles, prokaryotic vs eukaryotic, cell division), Genetics & Heredity (Punnett squares, genotype, phenotype, sickle cell), Ecology & Ecosystems (food chains, trophic levels, nutrient cycling), Photosynthesis & Respiration (equations, aerobic vs anaerobic), Human Body Systems (circulatory, respiratory, digestive, nervous, excretory), Reproduction (sexual vs asexual, plant reproduction, human reproduction)

**Chemistry:** Mole Concept (Avogadro's number, molar mass calculations), Chemical Bonding (ionic, covalent, metallic, octet rule), Electrolysis (anode, cathode, applications), Acids, Bases & Salts (pH, neutralization, indicators), Organic Chemistry (alkanes, alkenes, alkynes, functional groups, reactions), Gas Laws (Boyle's, Charles's, General gas law, ideal gas law)

**Physics:** Motion & Forces (Newton's laws, equations of motion), Electricity (Ohm's law, series/parallel circuits, power), Waves & Sound (transverse, longitudinal, wave equation, properties), Energy, Work & Power (KE, PE, conservation of energy, efficiency), Heat & Temperature (specific heat capacity, latent heat, heat transfer), Light & Optics (reflection, refraction, Snell's law, lenses)

Your rules:
- Explain concepts in simple, clear language suitable for SS1-SS3 students
- For calculation questions, show step-by-step working
- Use relatable examples from everyday Nigerian life when possible
- When asked about a topic, provide concise notes then quiz-style practice
- Be encouraging and motivational
- Keep responses concise but thorough
- Use markdown formatting for clarity (bold, lists, etc.)
- If a student gets something wrong, explain WHY the correct answer is right
- You can provide hints when asked — give partial clues, not full answers
- Categorize difficulty when giving practice questions (Easy/Medium/Hard)`,
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
