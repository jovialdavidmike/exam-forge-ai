export interface Question {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  premium?: boolean; // locked behind premium/rewarded ad
}

export interface Topic {
  id: string;
  subject: string;
  name: string;
  notes: string;
  examples: string[];
  premium?: boolean; // locked behind premium/rewarded ad
}

export const subjects = [
  { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'hsl(210, 100%, 52%)' },
  { id: 'english', name: 'English', icon: '📖', color: 'hsl(280, 70%, 55%)' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: 'hsl(140, 70%, 40%)' },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: 'hsl(38, 92%, 50%)' },
  { id: 'physics', name: 'Physics', icon: '⚡', color: 'hsl(0, 80%, 55%)' },
];

export const topics: Topic[] = [
  // ── Mathematics ──────────────────────────────────────
  {
    id: 'algebra',
    subject: 'mathematics',
    name: 'Algebra',
    notes: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In algebra, letters like x, y, and z represent unknown values.\n\nKey concepts:\n• Variables represent unknown numbers\n• Equations show that two expressions are equal\n• You solve equations by isolating the variable',
    examples: [
      'Solve: 2x + 5 = 15 → 2x = 10 → x = 5',
      'Simplify: 3(x + 2) = 3x + 6',
      'If x = 3, then 2x² + 1 = 2(9) + 1 = 19',
    ],
  },
  {
    id: 'quadratic-equations',
    subject: 'mathematics',
    name: 'Quadratic Equations',
    notes: 'A quadratic equation has the form ax² + bx + c = 0 where a ≠ 0.\n\nMethods of solving:\n• Factorization\n• Completing the square\n• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a',
    examples: [
      'x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 or x = 3',
      'Using formula for x² + 3x - 4 = 0: x = (-3 ± √25)/2 = 1 or -4',
    ],
  },
  {
    id: 'geometry',
    subject: 'mathematics',
    name: 'Geometry',
    notes: 'Geometry deals with shapes, sizes, positions, and properties of space.\n\nKey formulas:\n• Area of triangle = ½ × base × height\n• Area of circle = πr²\n• Circumference of circle = 2πr\n• Area of trapezium = ½(a + b) × h\n• Pythagoras theorem: a² + b² = c²',
    examples: [
      'Area of a circle with r = 7cm: π × 7² = 154 cm²',
      'Right triangle with sides 3 and 4: hypotenuse = √(9+16) = 5',
      'Area of trapezium with parallel sides 5cm and 9cm, height 4cm: ½(5+9) × 4 = 28 cm²',
    ],
  },
  {
    id: 'trigonometry',
    subject: 'mathematics',
    name: 'Trigonometry',
    premium: true,
    notes: 'Trigonometry studies the relationships between the sides and angles of triangles.\n\nSOH-CAH-TOA:\n• Sin θ = Opposite / Hypotenuse\n• Cos θ = Adjacent / Hypotenuse\n• Tan θ = Opposite / Adjacent\n\nSpecial angles: 30°, 45°, 60°\n• Sin 30° = ½, Cos 30° = √3/2, Tan 30° = 1/√3\n• Sin 45° = √2/2, Cos 45° = √2/2, Tan 45° = 1\n• Sin 60° = √3/2, Cos 60° = ½, Tan 60° = √3',
    examples: [
      'In a right triangle with hypotenuse 10 and opposite 6: sin θ = 6/10 = 0.6, θ = 36.87°',
      'Find height of a tree if angle of elevation is 60° and distance from base is 20m: h = 20 × tan60° = 20√3 ≈ 34.64m',
    ],
  },
  {
    id: 'statistics',
    subject: 'mathematics',
    name: 'Statistics & Probability',
    premium: true,
    notes: 'Statistics involves collecting, organizing, and interpreting data.\n\nMeasures of central tendency:\n• Mean = sum of values ÷ number of values\n• Median = middle value when arranged in order\n• Mode = most frequent value\n\nProbability:\n• P(event) = Number of favorable outcomes ÷ Total outcomes\n• 0 ≤ P(event) ≤ 1\n• P(A or B) = P(A) + P(B) - P(A and B)',
    examples: [
      'Mean of 2, 4, 6, 8, 10: (2+4+6+8+10)/5 = 6',
      'Probability of rolling a 3 on a fair die: 1/6',
      'Median of 3, 7, 9, 12, 15: 9 (middle value)',
    ],
  },
  {
    id: 'logarithms',
    subject: 'mathematics',
    name: 'Logarithms & Indices',
    premium: true,
    notes: 'Indices (powers) and logarithms are inverse operations.\n\nLaws of indices:\n• aᵐ × aⁿ = aᵐ⁺ⁿ\n• aᵐ ÷ aⁿ = aᵐ⁻ⁿ\n• (aᵐ)ⁿ = aᵐⁿ\n• a⁰ = 1\n• a⁻ⁿ = 1/aⁿ\n\nLogarithm laws:\n• log(ab) = log a + log b\n• log(a/b) = log a - log b\n• log(aⁿ) = n log a',
    examples: [
      'Simplify 2³ × 2⁴ = 2⁷ = 128',
      'If log₁₀ 2 = 0.301, then log₁₀ 8 = log₁₀ 2³ = 3 × 0.301 = 0.903',
      'Solve 3ˣ = 81: x = log₃ 81 = 4 (since 3⁴ = 81)',
    ],
  },

  // ── Chemistry ────────────────────────────────────────
  {
    id: 'mole-concept',
    subject: 'chemistry',
    name: 'Mole Concept',
    notes: 'A mole is a unit that measures the amount of substance. One mole contains 6.022 × 10²³ particles (Avogadro\'s number).\n\nKey formulas:\n• Number of moles = mass / molar mass\n• Number of particles = moles × 6.022 × 10²³\n• Molar mass is the mass of one mole of a substance (in g/mol)',
    examples: [
      'Moles of 36g of water (H₂O): 36/18 = 2 moles',
      'Mass of 0.5 mol NaCl: 0.5 × 58.5 = 29.25g',
      'Particles in 2 mol of O₂: 2 × 6.022 × 10²³ = 1.2044 × 10²⁴',
    ],
  },
  {
    id: 'electrolysis',
    subject: 'chemistry',
    name: 'Electrolysis',
    notes: 'Electrolysis is the process of using electric current to drive a non-spontaneous chemical reaction.\n\nComponents:\n• Electrolyte (ionic compound in solution or molten)\n• Anode (positive electrode) - oxidation occurs\n• Cathode (negative electrode) - reduction occurs',
    examples: [
      'Electrolysis of brine produces chlorine gas at anode, hydrogen at cathode',
      'Copper purification: impure copper anode dissolves, pure copper deposits at cathode',
    ],
  },
  {
    id: 'chemical-bonding',
    subject: 'chemistry',
    name: 'Chemical Bonding',
    notes: 'Chemical bonds hold atoms together in compounds. The three main types are:\n\n1. Ionic bonds: Transfer of electrons between metals and non-metals\n2. Covalent bonds: Sharing of electrons between non-metals\n3. Metallic bonds: Sharing of free electrons among metal atoms\n\nThe octet rule states atoms tend to gain, lose or share electrons to have 8 electrons in their outer shell.',
    examples: [
      'NaCl: Na loses 1 electron → Na⁺, Cl gains 1 electron → Cl⁻ (Ionic)',
      'H₂O: Oxygen shares electrons with two hydrogen atoms (Covalent)',
      'Copper wire: Cu atoms share free electrons (Metallic)',
    ],
  },
  {
    id: 'acids-bases',
    subject: 'chemistry',
    name: 'Acids, Bases & Salts',
    notes: 'Acids produce H⁺ ions in water, bases produce OH⁻ ions.\n\npH Scale: 0-14\n• pH < 7: Acidic\n• pH = 7: Neutral\n• pH > 7: Basic/Alkaline\n\nNeutralization: Acid + Base → Salt + Water\nHCl + NaOH → NaCl + H₂O\n\nIndicators:\n• Litmus: Red in acid, blue in base\n• Methyl orange: Red in acid, yellow in base\n• Phenolphthalein: Colorless in acid, pink in base',
    examples: [
      'HCl + NaOH → NaCl + H₂O (neutralization)',
      'H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O',
      'pH of lemon juice ≈ 2 (acidic), blood ≈ 7.4 (slightly basic)',
    ],
  },
  {
    id: 'organic-chemistry',
    subject: 'chemistry',
    name: 'Organic Chemistry',
    premium: true,
    notes: 'Organic chemistry studies carbon compounds.\n\nHomologous series:\n• Alkanes (CₙH₂ₙ₊₂): Single bonds only — methane, ethane, propane\n• Alkenes (CₙH₂ₙ): One double bond — ethene, propene\n• Alkynes (CₙH₂ₙ₋₂): One triple bond — ethyne, propyne\n• Alkanols (alcohols): Contains -OH group\n\nFunctional groups determine chemical properties.\nISomerism: Same molecular formula, different structural formula.',
    examples: [
      'Methane CH₄ + 2O₂ → CO₂ + 2H₂O (combustion)',
      'Ethene C₂H₄ + Br₂ → C₂H₄Br₂ (addition reaction — decolorizes bromine water)',
      'Ethanol C₂H₅OH is used as a biofuel and solvent',
    ],
  },
  {
    id: 'gas-laws',
    subject: 'chemistry',
    name: 'Gas Laws',
    premium: true,
    notes: 'Gas laws describe the behavior of gases under different conditions.\n\n• Boyle\'s Law: PV = constant (at constant T)\n  P₁V₁ = P₂V₂\n• Charles\'s Law: V/T = constant (at constant P)\n  V₁/T₁ = V₂/T₂\n• General Gas Law: P₁V₁/T₁ = P₂V₂/T₂\n• Ideal Gas Law: PV = nRT\n\nSTP: 0°C (273K), 1 atm. Molar volume at STP = 22.4 dm³',
    examples: [
      'A gas at 2 atm occupies 5L. At 1 atm: V₂ = (2×5)/1 = 10L',
      'At 273K a gas is 10L. At 546K: V₂ = 10 × 546/273 = 20L',
    ],
  },

  // ── Biology ──────────────────────────────────────────
  {
    id: 'cell-biology',
    subject: 'biology',
    name: 'Cell Biology',
    notes: 'Cells are the basic units of life. There are two main types:\n\n• Prokaryotic cells (bacteria) - no membrane-bound nucleus\n• Eukaryotic cells (plants, animals) - have a nucleus\n\nKey organelles:\n• Nucleus: Controls cell activities, contains DNA\n• Mitochondria: Powerhouse - produces energy (ATP)\n• Cell membrane: Controls what enters/leaves the cell\n• Ribosomes: Makes proteins',
    examples: [
      'Plant cells have cell walls and chloroplasts; animal cells do not',
      'Red blood cells have no nucleus to carry more hemoglobin',
    ],
  },
  {
    id: 'genetics',
    subject: 'biology',
    name: 'Genetics & Heredity',
    notes: 'Genetics is the study of how traits are inherited from parents to offspring through genes.\n\nKey terms:\n• Gene: A segment of DNA that codes for a trait\n• Allele: Different forms of a gene (dominant/recessive)\n• Genotype: The genetic makeup (e.g., Aa)\n• Phenotype: The physical expression (e.g., tall)',
    examples: [
      'If Tt × Tt → TT, Tt, Tt, tt (3 tall : 1 short ratio)',
      'Sickle cell is a recessive genetic disorder (HbS HbS)',
    ],
  },
  {
    id: 'ecology',
    subject: 'biology',
    name: 'Ecology & Ecosystems',
    notes: 'Ecology studies the interactions between organisms and their environment.\n\nKey concepts:\n• Ecosystem: A community of organisms and their physical environment\n• Food chain: Shows energy flow — Producer → Primary consumer → Secondary consumer\n• Food web: Interconnected food chains\n• Trophic levels: Producers, primary consumers, secondary consumers, decomposers\n\nBiomes: Tropical rainforest, savanna, desert, aquatic\nNutrient cycling: Carbon cycle, nitrogen cycle, water cycle',
    examples: [
      'Grass → Grasshopper → Lizard → Hawk (food chain)',
      'Decomposers like fungi and bacteria break down dead matter and recycle nutrients',
    ],
  },
  {
    id: 'photosynthesis-respiration',
    subject: 'biology',
    name: 'Photosynthesis & Respiration',
    premium: true,
    notes: 'Photosynthesis: How plants make food using sunlight.\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\nOccurs in chloroplasts. Requires: light, water, CO₂, chlorophyll.\n\nRespiration: How cells release energy from food.\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)\n\nAerobic respiration (with O₂) produces more ATP.\nAnaerobic respiration (without O₂):\n• In animals: glucose → lactic acid + little energy\n• In yeast: glucose → ethanol + CO₂ + little energy (fermentation)',
    examples: [
      'Plants appear green because chlorophyll reflects green light and absorbs red and blue',
      'During exercise, muscles may respire anaerobically, producing lactic acid (causing cramps)',
    ],
  },
  {
    id: 'human-body-systems',
    subject: 'biology',
    name: 'Human Body Systems',
    premium: true,
    notes: 'Major body systems:\n\n• Circulatory: Heart pumps blood; arteries carry oxygenated blood, veins carry deoxygenated\n• Respiratory: Lungs exchange O₂ and CO₂\n• Digestive: Breaks down food — mouth, stomach, small intestine, large intestine\n• Nervous: Brain, spinal cord, nerves — control and coordinate body functions\n• Excretory: Kidneys filter blood, produce urine\n\nThe heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle.',
    examples: [
      'Blood flow: Body → Right atrium → Right ventricle → Lungs → Left atrium → Left ventricle → Body',
      'Enzymes in digestion: Amylase (starch → maltose), Pepsin (protein → peptides)',
    ],
  },
  {
    id: 'reproduction',
    subject: 'biology',
    name: 'Reproduction',
    premium: true,
    notes: 'Reproduction is the process of producing new organisms.\n\nAsexual reproduction: One parent, offspring are clones\n• Binary fission (bacteria), budding (yeast), vegetative propagation (plants)\n\nSexual reproduction: Two parents, offspring show variation\n• Involves fusion of gametes (sperm + egg = zygote)\n• Fertilization can be internal or external\n\nPlant reproduction: Pollination → Fertilization → Seed formation → Dispersal → Germination',
    examples: [
      'Amoeba reproduces by binary fission — splits into two',
      'In humans, the zygote develops into an embryo in the uterus over 9 months',
    ],
  },

  // ── Physics ──────────────────────────────────────────
  {
    id: 'motion',
    subject: 'physics',
    name: 'Motion & Forces',
    notes: 'Motion is a change in position over time. Newton\'s Laws govern motion:\n\n1st Law: An object stays at rest or in motion unless acted on by a force\n2nd Law: F = ma (Force = mass × acceleration)\n3rd Law: Every action has an equal and opposite reaction\n\nKey equations:\n• v = u + at\n• s = ut + ½at²\n• v² = u² + 2as',
    examples: [
      'A car accelerates from 0 to 20 m/s in 5s: a = 20/5 = 4 m/s²',
      'Force on 3kg object at 4 m/s²: F = 3 × 4 = 12 N',
    ],
  },
  {
    id: 'electricity',
    subject: 'physics',
    name: 'Electricity',
    notes: 'Electric current is the flow of charged particles (electrons) through a conductor.\n\nKey formulas:\n• Ohm\'s Law: V = IR (Voltage = Current × Resistance)\n• Power: P = IV = I²R = V²/R\n• Series: R_total = R₁ + R₂\n• Parallel: 1/R_total = 1/R₁ + 1/R₂',
    examples: [
      'If V = 12V, R = 4Ω → I = 12/4 = 3A',
      'Power of a 2A current through 5Ω: P = 2² × 5 = 20W',
    ],
  },
  {
    id: 'waves',
    subject: 'physics',
    name: 'Waves & Sound',
    notes: 'A wave is a disturbance that transfers energy without transferring matter.\n\nTypes:\n• Transverse waves: Vibration perpendicular to direction (light, water)\n• Longitudinal waves: Vibration parallel to direction (sound)\n\nWave equation: v = fλ\n• v = velocity (m/s)\n• f = frequency (Hz)\n• λ = wavelength (m)\n\nProperties: Reflection, refraction, diffraction, interference',
    examples: [
      'Sound wave with f = 500Hz and λ = 0.68m: v = 500 × 0.68 = 340 m/s',
      'Light travels at 3 × 10⁸ m/s in a vacuum',
    ],
  },
  {
    id: 'energy-work-power',
    subject: 'physics',
    name: 'Energy, Work & Power',
    premium: true,
    notes: 'Energy is the ability to do work.\n\nForms: Kinetic, potential, thermal, chemical, electrical, nuclear, light, sound\n\nKey formulas:\n• Work = Force × Distance (W = Fd) in Joules\n• Kinetic Energy: KE = ½mv²\n• Potential Energy: PE = mgh\n• Power = Work/Time (P = W/t) in Watts\n• Efficiency = (useful output / total input) × 100%\n\nLaw of conservation of energy: Energy cannot be created or destroyed, only transformed.',
    examples: [
      'Work done lifting 5kg through 3m: W = 5 × 10 × 3 = 150J',
      'KE of 2kg moving at 4m/s: KE = ½ × 2 × 16 = 16J',
      'Power of a machine doing 500J in 10s: P = 500/10 = 50W',
    ],
  },
  {
    id: 'heat-temperature',
    subject: 'physics',
    name: 'Heat & Temperature',
    premium: true,
    notes: 'Heat is a form of energy transferred due to temperature difference.\n\nHeat capacity: Q = mcΔT\n• Q = heat energy (J)\n• m = mass (kg)\n• c = specific heat capacity (J/kg°C)\n• ΔT = temperature change\n\nLatent heat: Energy for phase change without temperature change\n• Q = mL (L = specific latent heat)\n\nHeat transfer: Conduction (solids), Convection (fluids), Radiation (electromagnetic waves)',
    examples: [
      'Heat needed to raise 2kg of water by 50°C: Q = 2 × 4200 × 50 = 420,000J',
      'Melting 0.5kg of ice (L = 334,000 J/kg): Q = 0.5 × 334,000 = 167,000J',
    ],
  },
  {
    id: 'optics',
    subject: 'physics',
    name: 'Light & Optics',
    premium: true,
    notes: 'Light is an electromagnetic wave that enables vision.\n\nReflection: angle of incidence = angle of reflection\nRefraction: Bending of light when passing between media (Snell\'s law: n₁sinθ₁ = n₂sinθ₂)\n\nLenses:\n• Convex (converging): Brings parallel rays to a focal point\n• Concave (diverging): Spreads parallel rays apart\n\nLens formula: 1/f = 1/u + 1/v\nMagnification: m = v/u = image height / object height',
    examples: [
      'Refractive index of glass ≈ 1.5: light bends toward normal when entering glass',
      'Convex lens with f=10cm, object at 30cm: 1/v = 1/10 - 1/30 = 2/30, v = 15cm',
    ],
  },

  // ── English ──────────────────────────────────────────
  {
    id: 'comprehension',
    subject: 'english',
    name: 'Comprehension & Summary',
    notes: 'Comprehension involves understanding and interpreting written text.\n\nTips for answering comprehension questions:\n• Read the passage carefully at least twice\n• Identify the main idea of each paragraph\n• Look for keywords in the questions\n• Answer in your own words unless asked to quote\n• For summary, identify the key points only',
    examples: [
      'Main idea questions: What is the passage mainly about?',
      'Inference questions: What can you infer from the text?',
    ],
  },
  {
    id: 'parts-of-speech',
    subject: 'english',
    name: 'Parts of Speech',
    notes: 'The 8 parts of speech are:\n\n1. Noun: Names of people, places, things (boy, Lagos, table)\n2. Pronoun: Replaces a noun (he, she, it, they)\n3. Verb: Action or state of being (run, is, have)\n4. Adjective: Describes a noun (tall, beautiful, red)\n5. Adverb: Modifies a verb/adjective (quickly, very, well)\n6. Preposition: Shows relationship (in, on, at, between)\n7. Conjunction: Joins words/clauses (and, but, or)\n8. Interjection: Expresses emotion (Oh! Wow!)',
    examples: [
      '"The tall boy runs quickly" → The(article), tall(adj), boy(noun), runs(verb), quickly(adv)',
      '"She and I went to the market" → She(pronoun), and(conjunction), I(pronoun), to(preposition)',
    ],
  },
  {
    id: 'tenses',
    subject: 'english',
    name: 'Tenses',
    notes: 'Tenses show the time of an action.\n\nPresent Tenses:\n• Simple present: She reads every day\n• Present continuous: She is reading now\n• Present perfect: She has read the book\n\nPast Tenses:\n• Simple past: She read yesterday\n• Past continuous: She was reading when I called\n• Past perfect: She had read before I arrived\n\nFuture Tenses:\n• Simple future: She will read tomorrow\n• Future continuous: She will be reading at 8pm',
    examples: [
      '"I have eaten" (present perfect) vs "I ate" (simple past)',
      '"She was cooking when the phone rang" — past continuous + simple past',
    ],
  },
  {
    id: 'figures-of-speech',
    subject: 'english',
    name: 'Figures of Speech',
    premium: true,
    notes: 'Figures of speech are special ways of using language for effect.\n\n• Simile: Comparison using "like" or "as" — "He runs like the wind"\n• Metaphor: Direct comparison — "Life is a journey"\n• Personification: Giving human qualities to non-human things — "The wind whispered"\n• Hyperbole: Exaggeration — "I\'m so hungry I could eat a horse"\n• Alliteration: Repetition of initial consonant sounds — "Peter Piper picked"\n• Onomatopoeia: Words that imitate sounds — "buzz, hiss, splash"\n• Irony: Saying the opposite of what is meant\n• Oxymoron: Contradictory terms — "deafening silence"',
    examples: [
      '"Her smile was as bright as the sun" — Simile',
      '"The classroom was a zoo" — Metaphor',
      '"The flowers danced in the breeze" — Personification',
    ],
  },
  {
    id: 'essay-writing',
    subject: 'english',
    name: 'Essay Writing',
    premium: true,
    notes: 'Types of essays:\n\n1. Narrative: Tell a story — use past tense, vivid descriptions\n2. Descriptive: Describe a place, person, or event\n3. Argumentative: Present arguments for/against a topic\n4. Expository: Explain a topic clearly\n5. Letter writing: Formal and informal letters\n\nStructure:\n• Introduction: Hook + thesis statement\n• Body paragraphs: Topic sentence + supporting details + examples\n• Conclusion: Summary + final thought\n\nTips: Plan before writing, use transitional words, proofread for errors.',
    examples: [
      'Transitional words: However, Furthermore, In addition, On the other hand, In conclusion',
      'Formal letter format: Address → Date → Salutation → Body → Complimentary close → Signature',
    ],
  },
  {
    id: 'vocabulary',
    subject: 'english',
    name: 'Vocabulary & Word Usage',
    premium: true,
    notes: 'Building a strong vocabulary is essential for exams.\n\nKey areas:\n• Synonyms: Words with similar meanings (big = large, enormous)\n• Antonyms: Words with opposite meanings (hot ≠ cold)\n• Homophones: Words that sound the same but differ in meaning (their/there/they\'re)\n• Idioms: Phrases with figurative meanings ("break a leg" = good luck)\n• Phrasal verbs: Verb + preposition combinations (look up, give in, put off)\n• Register: Formal vs informal language use',
    examples: [
      'Synonyms of "happy": joyful, elated, ecstatic, content, delighted',
      'Idiom: "Burning the midnight oil" means studying late at night',
      'Homophones: "write" and "right", "flour" and "flower"',
    ],
  },
];

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════
  // MATHEMATICS
  // ═══════════════════════════════════════════════════

  // — Algebra —
  { id: 'math-1', subject: 'mathematics', topic: 'Algebra', difficulty: 'easy',
    question: 'Solve for x: 3x + 7 = 22',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 4'], correctIndex: 1,
    explanation: 'Step 1: Subtract 7 from both sides → 3x = 15\nStep 2: Divide both sides by 3 → x = 5' },
  { id: 'math-2', subject: 'mathematics', topic: 'Algebra', difficulty: 'medium',
    question: 'If 2(x - 3) = 4x + 2, find x.',
    options: ['x = -4', 'x = -2', 'x = 2', 'x = 4'], correctIndex: 0,
    explanation: 'Expand: 2x - 6 = 4x + 2\nCollect: -2x = 8 → x = -4' },
  { id: 'math-4', subject: 'mathematics', topic: 'Algebra', difficulty: 'easy',
    question: 'Simplify: 5x + 3x - 2x',
    options: ['6x', '8x', '10x', '4x'], correctIndex: 0,
    explanation: 'Combine like terms: 5x + 3x = 8x, then 8x - 2x = 6x' },
  { id: 'math-6', subject: 'mathematics', topic: 'Algebra', difficulty: 'hard',
    question: 'Solve the simultaneous equations: 2x + y = 7 and x - y = 2',
    options: ['x = 3, y = 1', 'x = 2, y = 3', 'x = 4, y = -1', 'x = 1, y = 5'], correctIndex: 0,
    explanation: 'Add both equations: 3x = 9 → x = 3\nSubstitute: 3 - y = 2 → y = 1' },
  { id: 'math-7', subject: 'mathematics', topic: 'Algebra', difficulty: 'medium',
    question: 'If 3ᵡ = 27, what is x?',
    options: ['2', '3', '9', '4'], correctIndex: 1,
    explanation: '27 = 3³, so 3ˣ = 3³, therefore x = 3' },

  // — Quadratic Equations —
  { id: 'math-3', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'medium',
    question: 'Solve: x² - 7x + 12 = 0',
    options: ['x = 2, 6', 'x = 3, 4', 'x = 1, 12', 'x = -3, -4'], correctIndex: 1,
    explanation: 'Find two numbers that multiply to 12 and add to -7: -3 and -4\n(x - 3)(x - 4) = 0 → x = 3 or x = 4' },
  { id: 'math-5', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'hard',
    question: 'What is the discriminant of 2x² + 5x - 3 = 0?',
    options: ['49', '25', '37', '1'], correctIndex: 0,
    explanation: 'D = b² - 4ac = 25 - 4(2)(-3) = 25 + 24 = 49\nSince D > 0, two real roots.' },
  { id: 'math-8', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'easy',
    question: 'Which is a quadratic equation?',
    options: ['2x + 3 = 0', 'x² + 5x + 6 = 0', '3x³ = 27', 'x/2 = 4'], correctIndex: 1,
    explanation: 'A quadratic equation has the highest power of x as 2. x² + 5x + 6 = 0 fits this.' },
  { id: 'math-9', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'hard',
    question: 'Using the quadratic formula, solve x² - 4x + 1 = 0. What is x (to 2 d.p.)?',
    options: ['x = 3.73 or 0.27', 'x = 2.00 or -2.00', 'x = 4.00 or 1.00', 'x = 1.73 or -1.73'], correctIndex: 0,
    explanation: 'x = (4 ± √(16-4))/2 = (4 ± √12)/2 = (4 ± 3.46)/2\nx = 3.73 or 0.27' },

  // — Geometry —
  { id: 'math-10', subject: 'mathematics', topic: 'Geometry', difficulty: 'easy',
    question: 'What is the area of a circle with radius 7 cm? (π = 22/7)',
    options: ['44 cm²', '154 cm²', '88 cm²', '22 cm²'], correctIndex: 1,
    explanation: 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²' },
  { id: 'math-11', subject: 'mathematics', topic: 'Geometry', difficulty: 'medium',
    question: 'A right triangle has legs of 5 cm and 12 cm. What is the hypotenuse?',
    options: ['17 cm', '13 cm', '15 cm', '10 cm'], correctIndex: 1,
    explanation: 'Pythagoras: c² = 5² + 12² = 25 + 144 = 169\nc = √169 = 13 cm' },
  { id: 'math-12', subject: 'mathematics', topic: 'Geometry', difficulty: 'easy',
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'], correctIndex: 1,
    explanation: 'A hexagon has 6 sides. Hexa- means six.' },
  { id: 'math-13', subject: 'mathematics', topic: 'Geometry', difficulty: 'hard',
    question: 'The interior angle sum of a polygon is 1080°. How many sides does it have?',
    options: ['6', '7', '8', '9'], correctIndex: 2,
    explanation: 'Sum = (n-2) × 180°\n1080 = (n-2) × 180\nn-2 = 6 → n = 8 sides (octagon)' },

  // — Trigonometry (Premium) —
  { id: 'math-14', subject: 'mathematics', topic: 'Trigonometry', difficulty: 'easy', premium: true,
    question: 'What is sin 30°?',
    options: ['1', '0.5', '√3/2', '0'], correctIndex: 1,
    explanation: 'sin 30° = ½ = 0.5. This is one of the special angles you should memorize.' },
  { id: 'math-15', subject: 'mathematics', topic: 'Trigonometry', difficulty: 'medium', premium: true,
    question: 'In a right triangle, the opposite side is 8 and hypotenuse is 10. Find sin θ.',
    options: ['0.6', '0.8', '1.25', '0.75'], correctIndex: 1,
    explanation: 'sin θ = Opposite/Hypotenuse = 8/10 = 0.8' },
  { id: 'math-16', subject: 'mathematics', topic: 'Trigonometry', difficulty: 'hard', premium: true,
    question: 'Find the value of tan 60°.',
    options: ['1', '√3', '1/√3', '2'], correctIndex: 1,
    explanation: 'tan 60° = sin 60° / cos 60° = (√3/2) / (1/2) = √3 ≈ 1.732' },

  // — Statistics (Premium) —
  { id: 'math-17', subject: 'mathematics', topic: 'Statistics & Probability', difficulty: 'easy', premium: true,
    question: 'What is the mean of 4, 6, 8, 10, 12?',
    options: ['6', '8', '10', '40'], correctIndex: 1,
    explanation: 'Mean = (4+6+8+10+12)/5 = 40/5 = 8' },
  { id: 'math-18', subject: 'mathematics', topic: 'Statistics & Probability', difficulty: 'medium', premium: true,
    question: 'What is the probability of getting a head when a fair coin is tossed?',
    options: ['1', '0.5', '0.25', '0'], correctIndex: 1,
    explanation: 'P(Head) = Favorable outcomes / Total outcomes = 1/2 = 0.5' },
  { id: 'math-19', subject: 'mathematics', topic: 'Statistics & Probability', difficulty: 'hard', premium: true,
    question: 'Find the median of: 3, 7, 2, 9, 5, 1, 8',
    options: ['5', '7', '9', '3'], correctIndex: 0,
    explanation: 'Arrange in order: 1, 2, 3, 5, 7, 8, 9\nMedian is the middle value (4th of 7) = 5' },

  // — Logarithms (Premium) —
  { id: 'math-20', subject: 'mathematics', topic: 'Logarithms & Indices', difficulty: 'easy', premium: true,
    question: 'Simplify: 2³ × 2⁴',
    options: ['2⁷', '2¹²', '4⁷', '2¹'], correctIndex: 0,
    explanation: 'Law of indices: aᵐ × aⁿ = aᵐ⁺ⁿ\n2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128' },
  { id: 'math-21', subject: 'mathematics', topic: 'Logarithms & Indices', difficulty: 'medium', premium: true,
    question: 'If log₁₀ 2 = 0.301, find log₁₀ 8.',
    options: ['0.602', '0.903', '2.408', '0.301'], correctIndex: 1,
    explanation: 'log₁₀ 8 = log₁₀ 2³ = 3 × log₁₀ 2 = 3 × 0.301 = 0.903' },
  { id: 'math-22', subject: 'mathematics', topic: 'Logarithms & Indices', difficulty: 'hard', premium: true,
    question: 'Solve: 5ˣ = 125',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'], correctIndex: 1,
    explanation: '125 = 5³, so 5ˣ = 5³ → x = 3' },

  // ═══════════════════════════════════════════════════
  // CHEMISTRY
  // ═══════════════════════════════════════════════════

  // — Mole Concept —
  { id: 'chem-1', subject: 'chemistry', topic: 'Mole Concept', difficulty: 'easy',
    question: 'How many moles are in 44g of CO₂? (C=12, O=16)',
    options: ['0.5 mol', '1 mol', '2 mol', '1.5 mol'], correctIndex: 1,
    explanation: 'Molar mass of CO₂ = 12 + (16 × 2) = 44 g/mol\nMoles = 44/44 = 1 mol' },
  { id: 'chem-2', subject: 'chemistry', topic: 'Mole Concept', difficulty: 'medium',
    question: 'What is the mass of 0.25 moles of NaOH? (Na=23, O=16, H=1)',
    options: ['10g', '8g', '12g', '40g'], correctIndex: 0,
    explanation: 'Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol\nMass = 0.25 × 40 = 10g' },
  { id: 'chem-6', subject: 'chemistry', topic: 'Mole Concept', difficulty: 'hard',
    question: 'How many molecules are in 2 moles of H₂O?',
    options: ['6.022 × 10²³', '12.044 × 10²³', '3.011 × 10²³', '18.066 × 10²³'], correctIndex: 1,
    explanation: 'Number of molecules = moles × Avogadro\'s number\n= 2 × 6.022 × 10²³ = 12.044 × 10²³' },

  // — Chemical Bonding —
  { id: 'chem-3', subject: 'chemistry', topic: 'Chemical Bonding', difficulty: 'easy',
    question: 'Which type of bonding exists in NaCl?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Van der Waals'], correctIndex: 1,
    explanation: 'NaCl is formed between a metal (Na) and a non-metal (Cl). Sodium transfers one electron to chlorine, forming ionic bonds.' },
  { id: 'chem-5', subject: 'chemistry', topic: 'Chemical Bonding', difficulty: 'medium',
    question: 'How many covalent bonds does carbon form?',
    options: ['2', '3', '4', '1'], correctIndex: 2,
    explanation: 'Carbon has 4 electrons in its outer shell and needs 4 more to complete its octet, so it forms 4 covalent bonds.' },
  { id: 'chem-7', subject: 'chemistry', topic: 'Chemical Bonding', difficulty: 'hard',
    question: 'Which compound has both ionic and covalent bonds?',
    options: ['NaCl', 'H₂O', 'NaOH', 'CH₄'], correctIndex: 2,
    explanation: 'In NaOH: Na⁺ and OH⁻ are held by ionic bonds, but within OH⁻, O and H share electrons (covalent bond).' },

  // — Electrolysis —
  { id: 'chem-4', subject: 'chemistry', topic: 'Electrolysis', difficulty: 'medium',
    question: 'During electrolysis, oxidation occurs at the:',
    options: ['Cathode', 'Anode', 'Electrolyte', 'Salt bridge'], correctIndex: 1,
    explanation: 'Remember: AN OX (Anode = Oxidation). At the anode, atoms lose electrons (oxidation).' },
  { id: 'chem-8', subject: 'chemistry', topic: 'Electrolysis', difficulty: 'easy',
    question: 'What type of substance can be electrolyzed?',
    options: ['Covalent solids', 'Ionic compounds in solution/molten state', 'Noble gases', 'Metals in solid state'], correctIndex: 1,
    explanation: 'Only ionic compounds can conduct electricity when dissolved in water or melted, because their ions are free to move.' },

  // — Acids, Bases & Salts —
  { id: 'chem-9', subject: 'chemistry', topic: 'Acids, Bases & Salts', difficulty: 'easy',
    question: 'What is the pH of a neutral solution?',
    options: ['0', '7', '14', '1'], correctIndex: 1,
    explanation: 'A neutral solution has pH 7. Below 7 is acidic, above 7 is alkaline/basic.' },
  { id: 'chem-10', subject: 'chemistry', topic: 'Acids, Bases & Salts', difficulty: 'medium',
    question: 'What is the product of HCl + NaOH?',
    options: ['NaCl + H₂O', 'NaH + ClO', 'NaCl + O₂', 'Na₂O + HCl'], correctIndex: 0,
    explanation: 'Acid + Base → Salt + Water\nHCl + NaOH → NaCl + H₂O (neutralization reaction)' },
  { id: 'chem-11', subject: 'chemistry', topic: 'Acids, Bases & Salts', difficulty: 'easy',
    question: 'Which indicator turns pink in alkaline solutions?',
    options: ['Litmus', 'Methyl orange', 'Phenolphthalein', 'Universal indicator'], correctIndex: 2,
    explanation: 'Phenolphthalein is colorless in acidic solutions and turns pink/magenta in alkaline solutions.' },

  // — Organic Chemistry (Premium) —
  { id: 'chem-12', subject: 'chemistry', topic: 'Organic Chemistry', difficulty: 'easy', premium: true,
    question: 'What is the general formula for alkanes?',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], correctIndex: 1,
    explanation: 'Alkanes are saturated hydrocarbons with single bonds only. Their general formula is CₙH₂ₙ₊₂.' },
  { id: 'chem-13', subject: 'chemistry', topic: 'Organic Chemistry', difficulty: 'medium', premium: true,
    question: 'What is the functional group in alkanols (alcohols)?',
    options: ['-COOH', '-OH', '-CHO', '-CO-'], correctIndex: 1,
    explanation: 'Alkanols (alcohols) contain the hydroxyl group (-OH). Example: Ethanol = C₂H₅OH' },
  { id: 'chem-14', subject: 'chemistry', topic: 'Organic Chemistry', difficulty: 'hard', premium: true,
    question: 'Ethene decolorizes bromine water because it undergoes:',
    options: ['Substitution', 'Addition', 'Elimination', 'Combustion'], correctIndex: 1,
    explanation: 'Alkenes undergo addition reactions. The C=C double bond breaks and adds Br₂:\nC₂H₄ + Br₂ → C₂H₄Br₂ (1,2-dibromoethane)' },

  // — Gas Laws (Premium) —
  { id: 'chem-15', subject: 'chemistry', topic: 'Gas Laws', difficulty: 'easy', premium: true,
    question: 'Which law states that PV = constant at constant temperature?',
    options: ['Charles\'s Law', 'Boyle\'s Law', 'Gay-Lussac\'s Law', 'Avogadro\'s Law'], correctIndex: 1,
    explanation: 'Boyle\'s Law: At constant temperature, the volume of a gas is inversely proportional to its pressure. P₁V₁ = P₂V₂' },
  { id: 'chem-16', subject: 'chemistry', topic: 'Gas Laws', difficulty: 'medium', premium: true,
    question: 'A gas occupies 6L at 2 atm. What volume will it occupy at 3 atm (constant T)?',
    options: ['9L', '4L', '3L', '12L'], correctIndex: 1,
    explanation: 'Using Boyle\'s Law: P₁V₁ = P₂V₂\n2 × 6 = 3 × V₂ → V₂ = 12/3 = 4L' },

  // ═══════════════════════════════════════════════════
  // BIOLOGY
  // ═══════════════════════════════════════════════════

  // — Cell Biology —
  { id: 'bio-1', subject: 'biology', topic: 'Cell Biology', difficulty: 'easy',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correctIndex: 2,
    explanation: 'Mitochondria produce ATP (adenosine triphosphate), the energy currency of the cell.' },
  { id: 'bio-2', subject: 'biology', topic: 'Cell Biology', difficulty: 'medium',
    question: 'Which of these is found in plant cells but NOT in animal cells?',
    options: ['Mitochondria', 'Cell wall', 'Cell membrane', 'Nucleus'], correctIndex: 1,
    explanation: 'Plant cells have a rigid cell wall made of cellulose. Animal cells only have a cell membrane.' },
  { id: 'bio-4', subject: 'biology', topic: 'Cell Biology', difficulty: 'easy',
    question: 'Which part of the cell controls its activities?',
    options: ['Cell membrane', 'Cytoplasm', 'Nucleus', 'Ribosome'], correctIndex: 2,
    explanation: 'The nucleus is the control center of the cell. It contains DNA with genetic instructions.' },
  { id: 'bio-5', subject: 'biology', topic: 'Cell Biology', difficulty: 'hard',
    question: 'Which of these is NOT a difference between prokaryotic and eukaryotic cells?',
    options: ['Prokaryotes lack a nucleus', 'Prokaryotes are smaller', 'Prokaryotes lack ribosomes', 'Prokaryotes lack membrane-bound organelles'], correctIndex: 2,
    explanation: 'Both prokaryotes and eukaryotes have ribosomes (for protein synthesis). Prokaryotic ribosomes are just smaller (70S vs 80S).' },

  // — Genetics —
  { id: 'bio-3', subject: 'biology', topic: 'Genetics & Heredity', difficulty: 'medium',
    question: 'In a monohybrid cross Tt × Tt, what fraction of offspring will be homozygous recessive?',
    options: ['3/4', '1/2', '1/4', '0'], correctIndex: 2,
    explanation: 'Punnett square: TT, Tt, Tt, tt\nHomozygous recessive (tt) = 1/4' },
  { id: 'bio-6', subject: 'biology', topic: 'Genetics & Heredity', difficulty: 'easy',
    question: 'What is a genotype?',
    options: ['The physical appearance of an organism', 'The genetic makeup of an organism', 'A type of gene mutation', 'The number of chromosomes'], correctIndex: 1,
    explanation: 'Genotype is the genetic makeup (e.g., Tt, AA). Phenotype is the physical expression (e.g., tall, short).' },
  { id: 'bio-7', subject: 'biology', topic: 'Genetics & Heredity', difficulty: 'hard',
    question: 'Sickle cell trait is expressed in individuals with genotype:',
    options: ['HbA HbA', 'HbA HbS', 'HbS HbS', 'Both B and C'], correctIndex: 1,
    explanation: 'HbA HbS = sickle cell trait (carrier, usually healthy)\nHbS HbS = sickle cell disease\nHbA HbA = normal' },

  // — Ecology —
  { id: 'bio-8', subject: 'biology', topic: 'Ecology & Ecosystems', difficulty: 'easy',
    question: 'In a food chain, the organism that makes its own food is called a:',
    options: ['Consumer', 'Decomposer', 'Producer', 'Predator'], correctIndex: 2,
    explanation: 'Producers (like green plants) make their own food through photosynthesis. They form the base of every food chain.' },
  { id: 'bio-9', subject: 'biology', topic: 'Ecology & Ecosystems', difficulty: 'medium',
    question: 'Which of these is a decomposer?',
    options: ['Grasshopper', 'Eagle', 'Mushroom', 'Cow'], correctIndex: 2,
    explanation: 'Mushrooms (fungi) are decomposers — they break down dead organic matter and recycle nutrients back into the soil.' },
  { id: 'bio-10', subject: 'biology', topic: 'Ecology & Ecosystems', difficulty: 'hard',
    question: 'In an ecological pyramid, which trophic level has the most energy?',
    options: ['Tertiary consumers', 'Secondary consumers', 'Primary consumers', 'Producers'], correctIndex: 3,
    explanation: 'Producers have the most energy. About 10% of energy is passed to each successive trophic level (10% rule).' },

  // — Photosynthesis & Respiration (Premium) —
  { id: 'bio-11', subject: 'biology', topic: 'Photosynthesis & Respiration', difficulty: 'easy', premium: true,
    question: 'What gas is produced during photosynthesis?',
    options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctIndex: 2,
    explanation: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\nOxygen is released as a by-product of photosynthesis.' },
  { id: 'bio-12', subject: 'biology', topic: 'Photosynthesis & Respiration', difficulty: 'medium', premium: true,
    question: 'Where does photosynthesis occur in a plant cell?',
    options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Cell wall'], correctIndex: 2,
    explanation: 'Chloroplasts contain chlorophyll which absorbs light energy for photosynthesis.' },
  { id: 'bio-13', subject: 'biology', topic: 'Photosynthesis & Respiration', difficulty: 'hard', premium: true,
    question: 'What is the end product of anaerobic respiration in yeast?',
    options: ['Lactic acid + energy', 'Ethanol + CO₂ + energy', 'Water + CO₂', 'Glucose + O₂'], correctIndex: 1,
    explanation: 'In yeast (fermentation): Glucose → Ethanol + CO₂ + Energy\nThis is used in baking and brewing.' },

  // — Human Body Systems (Premium) —
  { id: 'bio-14', subject: 'biology', topic: 'Human Body Systems', difficulty: 'easy', premium: true,
    question: 'How many chambers does the human heart have?',
    options: ['2', '3', '4', '5'], correctIndex: 2,
    explanation: 'The heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle.' },
  { id: 'bio-15', subject: 'biology', topic: 'Human Body Systems', difficulty: 'medium', premium: true,
    question: 'Which organ is responsible for filtering blood and producing urine?',
    options: ['Liver', 'Lungs', 'Kidney', 'Heart'], correctIndex: 2,
    explanation: 'The kidneys filter waste products from the blood and produce urine for excretion.' },

  // — Reproduction (Premium) —
  { id: 'bio-16', subject: 'biology', topic: 'Reproduction', difficulty: 'easy', premium: true,
    question: 'Which type of reproduction produces genetically identical offspring?',
    options: ['Sexual', 'Asexual', 'Cross-pollination', 'Fertilization'], correctIndex: 1,
    explanation: 'Asexual reproduction involves one parent and produces clones (genetically identical offspring).' },
  { id: 'bio-17', subject: 'biology', topic: 'Reproduction', difficulty: 'medium', premium: true,
    question: 'What is the fusion of male and female gametes called?',
    options: ['Pollination', 'Germination', 'Fertilization', 'Ovulation'], correctIndex: 2,
    explanation: 'Fertilization is the fusion of sperm (male gamete) and egg (female gamete) to form a zygote.' },

  // ═══════════════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════════════

  // — Motion & Forces —
  { id: 'phy-1', subject: 'physics', topic: 'Motion & Forces', difficulty: 'easy',
    question: 'A car accelerates from rest to 30 m/s in 6 seconds. What is its acceleration?',
    options: ['3 m/s²', '5 m/s²', '6 m/s²', '180 m/s²'], correctIndex: 1,
    explanation: 'a = (v - u)/t = (30 - 0)/6 = 5 m/s²' },
  { id: 'phy-2', subject: 'physics', topic: 'Motion & Forces', difficulty: 'medium',
    question: 'What is the net force on a 5 kg object accelerating at 3 m/s²?',
    options: ['8 N', '15 N', '1.67 N', '2 N'], correctIndex: 1,
    explanation: 'F = ma = 5 × 3 = 15 N' },
  { id: 'phy-5', subject: 'physics', topic: 'Motion & Forces', difficulty: 'hard',
    question: 'A ball is thrown upward at 20 m/s. How high does it go? (g = 10 m/s²)',
    options: ['20 m', '10 m', '40 m', '30 m'], correctIndex: 0,
    explanation: 'At max height, v = 0\nv² = u² - 2gs → 0 = 400 - 20s → s = 20 m' },
  { id: 'phy-6', subject: 'physics', topic: 'Motion & Forces', difficulty: 'easy',
    question: 'Newton\'s first law is also called the law of:',
    options: ['Acceleration', 'Inertia', 'Reaction', 'Gravity'], correctIndex: 1,
    explanation: 'Newton\'s first law (law of inertia): An object remains at rest or in uniform motion unless acted on by an external force.' },

  // — Electricity —
  { id: 'phy-3', subject: 'physics', topic: 'Electricity', difficulty: 'easy',
    question: 'According to Ohm\'s law, if V = 24V and R = 8Ω, what is the current?',
    options: ['3 A', '4 A', '16 A', '32 A'], correctIndex: 0,
    explanation: 'V = IR → I = V/R = 24/8 = 3 A' },
  { id: 'phy-4', subject: 'physics', topic: 'Electricity', difficulty: 'medium',
    question: 'Two resistors of 6Ω and 3Ω are connected in parallel. What is the total resistance?',
    options: ['9Ω', '2Ω', '4.5Ω', '3Ω'], correctIndex: 1,
    explanation: '1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 → R = 2Ω' },
  { id: 'phy-7', subject: 'physics', topic: 'Electricity', difficulty: 'hard',
    question: 'What is the power dissipated by a 4Ω resistor carrying 3A?',
    options: ['12W', '36W', '7W', '48W'], correctIndex: 1,
    explanation: 'P = I²R = 3² × 4 = 9 × 4 = 36 W' },

  // — Waves & Sound —
  { id: 'phy-8', subject: 'physics', topic: 'Waves & Sound', difficulty: 'easy',
    question: 'Sound is what type of wave?',
    options: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Standing'], correctIndex: 1,
    explanation: 'Sound is a longitudinal wave — the vibration is parallel to the direction of wave travel. It requires a medium to travel.' },
  { id: 'phy-9', subject: 'physics', topic: 'Waves & Sound', difficulty: 'medium',
    question: 'A wave has frequency 200 Hz and wavelength 1.7 m. What is its speed?',
    options: ['340 m/s', '117.6 m/s', '200 m/s', '1.7 m/s'], correctIndex: 0,
    explanation: 'v = fλ = 200 × 1.7 = 340 m/s (this is approximately the speed of sound in air!)' },
  { id: 'phy-10', subject: 'physics', topic: 'Waves & Sound', difficulty: 'hard',
    question: 'Which property of waves explains why you can hear someone around a corner?',
    options: ['Reflection', 'Refraction', 'Diffraction', 'Interference'], correctIndex: 2,
    explanation: 'Diffraction is the bending of waves around obstacles or through openings. Sound waves diffract around corners, which is why you can hear around walls.' },

  // — Energy, Work & Power (Premium) —
  { id: 'phy-11', subject: 'physics', topic: 'Energy, Work & Power', difficulty: 'easy', premium: true,
    question: 'What is the SI unit of work?',
    options: ['Watt', 'Newton', 'Joule', 'Pascal'], correctIndex: 2,
    explanation: 'Work is measured in Joules (J). W = Force × Distance. 1 J = 1 N × 1 m' },
  { id: 'phy-12', subject: 'physics', topic: 'Energy, Work & Power', difficulty: 'medium', premium: true,
    question: 'What is the kinetic energy of a 4 kg object moving at 5 m/s?',
    options: ['50 J', '20 J', '100 J', '10 J'], correctIndex: 0,
    explanation: 'KE = ½mv² = ½ × 4 × 25 = 50 J' },
  { id: 'phy-13', subject: 'physics', topic: 'Energy, Work & Power', difficulty: 'hard', premium: true,
    question: 'A machine does 600J of work in 30 seconds. What is its power?',
    options: ['18000 W', '20 W', '570 W', '200 W'], correctIndex: 1,
    explanation: 'P = W/t = 600/30 = 20 W' },

  // — Heat & Temperature (Premium) —
  { id: 'phy-14', subject: 'physics', topic: 'Heat & Temperature', difficulty: 'easy', premium: true,
    question: 'Heat is transferred through a solid mainly by:',
    options: ['Convection', 'Conduction', 'Radiation', 'Evaporation'], correctIndex: 1,
    explanation: 'Conduction is the transfer of heat through a solid by vibrating particles. Metals are good conductors of heat.' },
  { id: 'phy-15', subject: 'physics', topic: 'Heat & Temperature', difficulty: 'medium', premium: true,
    question: 'Calculate heat needed to raise 3 kg of water by 20°C (c = 4200 J/kg°C).',
    options: ['252,000 J', '126,000 J', '25,200 J', '84,000 J'], correctIndex: 0,
    explanation: 'Q = mcΔT = 3 × 4200 × 20 = 252,000 J' },

  // — Light & Optics (Premium) —
  { id: 'phy-16', subject: 'physics', topic: 'Light & Optics', difficulty: 'easy', premium: true,
    question: 'What happens when light passes from air into glass?',
    options: ['It speeds up', 'It slows down and bends toward the normal', 'Nothing changes', 'It reflects completely'], correctIndex: 1,
    explanation: 'Glass is optically denser than air. Light slows down and bends toward the normal (refraction).' },
  { id: 'phy-17', subject: 'physics', topic: 'Light & Optics', difficulty: 'medium', premium: true,
    question: 'Which type of lens is used to correct short-sightedness (myopia)?',
    options: ['Convex lens', 'Concave lens', 'Bifocal lens', 'Cylindrical lens'], correctIndex: 1,
    explanation: 'A concave (diverging) lens is used for myopia. It diverges light rays so they focus on the retina instead of in front of it.' },

  // ═══════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════

  // — Parts of Speech —
  { id: 'eng-1', subject: 'english', topic: 'Parts of Speech', difficulty: 'easy',
    question: 'Identify the verb in: "The students studied hard for the exam."',
    options: ['students', 'studied', 'hard', 'exam'], correctIndex: 1,
    explanation: '"Studied" is the verb — it describes the action performed by the students.' },
  { id: 'eng-2', subject: 'english', topic: 'Parts of Speech', difficulty: 'medium',
    question: 'Which word is an adverb in: "She speaks fluently in three languages"?',
    options: ['She', 'speaks', 'fluently', 'languages'], correctIndex: 2,
    explanation: '"Fluently" modifies the verb "speaks" — tells us HOW she speaks. Adverbs often end in -ly.' },
  { id: 'eng-4', subject: 'english', topic: 'Parts of Speech', difficulty: 'easy',
    question: 'Which is a conjunction: "I wanted to go but it rained."',
    options: ['wanted', 'go', 'but', 'rained'], correctIndex: 2,
    explanation: '"But" is a conjunction — it connects two clauses.' },
  { id: 'eng-5', subject: 'english', topic: 'Parts of Speech', difficulty: 'hard',
    question: 'In "The old man\'s walking stick broke", what part of speech is "walking"?',
    options: ['Verb', 'Adjective', 'Noun', 'Adverb'], correctIndex: 1,
    explanation: 'Here "walking" describes the type of stick (walking stick). It functions as an adjective modifying the noun "stick".' },

  // — Comprehension —
  { id: 'eng-3', subject: 'english', topic: 'Comprehension & Summary', difficulty: 'easy',
    question: 'What does "to infer" mean in comprehension?',
    options: ['To copy from the text', 'To guess randomly', 'To draw a conclusion from clues in the text', 'To summarize the passage'], correctIndex: 2,
    explanation: 'To infer means to reach a conclusion based on evidence and reasoning — reading between the lines.' },
  { id: 'eng-6', subject: 'english', topic: 'Comprehension & Summary', difficulty: 'medium',
    question: 'Which of these is the best summary technique?',
    options: ['Copy the first sentence of each paragraph', 'Identify key points and restate in your own words', 'Include every detail from the passage', 'Use the author\'s exact words throughout'], correctIndex: 1,
    explanation: 'Good summaries capture only the main points, restated in your own words. They should be shorter than the original.' },

  // — Tenses —
  { id: 'eng-7', subject: 'english', topic: 'Tenses', difficulty: 'easy',
    question: 'Which sentence is in the simple past tense?',
    options: ['She is reading a book', 'She reads every day', 'She read the book yesterday', 'She will read tomorrow'], correctIndex: 2,
    explanation: 'Simple past tense describes a completed action. "Read" (past tense of read) + "yesterday" indicates past.' },
  { id: 'eng-8', subject: 'english', topic: 'Tenses', difficulty: 'medium',
    question: '"She has been studying for three hours" is which tense?',
    options: ['Present perfect', 'Present perfect continuous', 'Past continuous', 'Simple present'], correctIndex: 1,
    explanation: 'Present perfect continuous: has/have + been + verb-ing. Shows an action that started in the past and continues to the present.' },
  { id: 'eng-9', subject: 'english', topic: 'Tenses', difficulty: 'hard',
    question: '"By the time he arrived, she had already left." The underlined verb is in which tense?',
    options: ['Simple past', 'Past perfect', 'Past continuous', 'Present perfect'], correctIndex: 1,
    explanation: 'Past perfect (had + past participle) is used for an action completed before another past action.' },

  // — Figures of Speech (Premium) —
  { id: 'eng-10', subject: 'english', topic: 'Figures of Speech', difficulty: 'easy', premium: true,
    question: '"He runs like the wind" is an example of:',
    options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'], correctIndex: 1,
    explanation: 'A simile uses "like" or "as" to compare two things. Here, his running speed is compared to the wind using "like".' },
  { id: 'eng-11', subject: 'english', topic: 'Figures of Speech', difficulty: 'medium', premium: true,
    question: '"The flowers danced in the breeze" is an example of:',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'], correctIndex: 2,
    explanation: 'Personification gives human qualities to non-human things. Flowers can\'t literally dance — this is a human action.' },
  { id: 'eng-12', subject: 'english', topic: 'Figures of Speech', difficulty: 'hard', premium: true,
    question: '"It was a deafening silence" is an example of:',
    options: ['Hyperbole', 'Oxymoron', 'Irony', 'Metaphor'], correctIndex: 1,
    explanation: 'An oxymoron combines two contradictory words. "Deafening" (loud) and "silence" (quiet) are opposites used together for effect.' },

  // — Essay Writing (Premium) —
  { id: 'eng-13', subject: 'english', topic: 'Essay Writing', difficulty: 'easy', premium: true,
    question: 'Which essay type tells a story?',
    options: ['Argumentative', 'Expository', 'Narrative', 'Descriptive'], correctIndex: 2,
    explanation: 'A narrative essay tells a story, usually from a personal point of view, with a beginning, middle, and end.' },
  { id: 'eng-14', subject: 'english', topic: 'Essay Writing', difficulty: 'medium', premium: true,
    question: 'What is the correct order for a formal letter?',
    options: ['Salutation → Address → Body → Date', 'Address → Date → Salutation → Body', 'Date → Address → Body → Salutation', 'Body → Salutation → Date → Address'], correctIndex: 1,
    explanation: 'Formal letter format: Writer\'s address → Date → Recipient\'s address → Salutation → Body → Complimentary close → Signature' },

  // — Vocabulary (Premium) —
  { id: 'eng-15', subject: 'english', topic: 'Vocabulary & Word Usage', difficulty: 'easy', premium: true,
    question: 'Which word is a synonym of "enormous"?',
    options: ['Tiny', 'Huge', 'Average', 'Narrow'], correctIndex: 1,
    explanation: 'Synonyms have similar meanings. Enormous and huge both mean very large.' },
  { id: 'eng-16', subject: 'english', topic: 'Vocabulary & Word Usage', difficulty: 'medium', premium: true,
    question: 'What does the idiom "burning the midnight oil" mean?',
    options: ['Wasting resources', 'Studying or working late at night', 'Setting fire to something', 'Being very angry'], correctIndex: 1,
    explanation: 'This idiom means working or studying late into the night. It comes from the time when people used oil lamps for light.' },
  { id: 'eng-17', subject: 'english', topic: 'Vocabulary & Word Usage', difficulty: 'hard', premium: true,
    question: 'Choose the correct word: "The principal/principle addressed the students."',
    options: ['Principal (head of school)', 'Principle (rule or belief)', 'Either is correct', 'Neither is correct'], correctIndex: 0,
    explanation: 'Principal = head of a school or main/chief. Principle = a rule, law, or belief. Here we need the school head → principal.' },
];
