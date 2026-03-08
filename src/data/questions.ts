export interface Question {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Topic {
  id: string;
  subject: string;
  name: string;
  notes: string;
  examples: string[];
}

export const subjects = [
  { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'hsl(210, 100%, 52%)' },
  { id: 'english', name: 'English', icon: '📖', color: 'hsl(280, 70%, 55%)' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: 'hsl(140, 70%, 40%)' },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: 'hsl(38, 92%, 50%)' },
  { id: 'physics', name: 'Physics', icon: '⚡', color: 'hsl(0, 80%, 55%)' },
];

export const topics: Topic[] = [
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
    notes: 'Electrolysis is the process of using electric current to drive a non-spontaneous chemical reaction. It decomposes electrolytes into their component elements.\n\nComponents:\n• Electrolyte (ionic compound in solution or molten)\n• Anode (positive electrode) - oxidation occurs\n• Cathode (negative electrode) - reduction occurs',
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
];

export const questions: Question[] = [
  // Mathematics
  {
    id: 'math-1', subject: 'mathematics', topic: 'Algebra', difficulty: 'easy',
    question: 'Solve for x: 3x + 7 = 22',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 4'],
    correctIndex: 1,
    explanation: 'Step 1: Subtract 7 from both sides → 3x = 15\nStep 2: Divide both sides by 3 → x = 5\n\nAlways isolate the variable by doing the same operation on both sides.',
  },
  {
    id: 'math-2', subject: 'mathematics', topic: 'Algebra', difficulty: 'medium',
    question: 'If 2(x - 3) = 4x + 2, find x.',
    options: ['x = -4', 'x = -2', 'x = 2', 'x = 4'],
    correctIndex: 0,
    explanation: 'Step 1: Expand → 2x - 6 = 4x + 2\nStep 2: Collect like terms → 2x - 4x = 2 + 6\nStep 3: -2x = 8 → x = -4',
  },
  {
    id: 'math-3', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'medium',
    question: 'Solve: x² - 7x + 12 = 0',
    options: ['x = 2, 6', 'x = 3, 4', 'x = 1, 12', 'x = -3, -4'],
    correctIndex: 1,
    explanation: 'Find two numbers that multiply to give 12 and add to give -7.\nThose numbers are -3 and -4.\nSo (x - 3)(x - 4) = 0\nTherefore x = 3 or x = 4',
  },
  {
    id: 'math-4', subject: 'mathematics', topic: 'Algebra', difficulty: 'easy',
    question: 'Simplify: 5x + 3x - 2x',
    options: ['6x', '8x', '10x', '4x'],
    correctIndex: 0,
    explanation: 'Combine like terms: 5x + 3x = 8x, then 8x - 2x = 6x\nAll terms have the same variable (x), so we just add/subtract the coefficients.',
  },
  {
    id: 'math-5', subject: 'mathematics', topic: 'Quadratic Equations', difficulty: 'hard',
    question: 'What is the discriminant of 2x² + 5x - 3 = 0?',
    options: ['49', '25', '37', '1'],
    correctIndex: 0,
    explanation: 'The discriminant = b² - 4ac\nHere a = 2, b = 5, c = -3\nD = 5² - 4(2)(-3) = 25 + 24 = 49\nSince D > 0, the equation has two real roots.',
  },
  // Chemistry
  {
    id: 'chem-1', subject: 'chemistry', topic: 'Mole Concept', difficulty: 'easy',
    question: 'How many moles are in 44g of CO₂? (C=12, O=16)',
    options: ['0.5 mol', '1 mol', '2 mol', '1.5 mol'],
    correctIndex: 1,
    explanation: 'Molar mass of CO₂ = 12 + (16 × 2) = 44 g/mol\nNumber of moles = mass/molar mass = 44/44 = 1 mol',
  },
  {
    id: 'chem-2', subject: 'chemistry', topic: 'Mole Concept', difficulty: 'medium',
    question: 'What is the mass of 0.25 moles of NaOH? (Na=23, O=16, H=1)',
    options: ['10g', '8g', '12g', '40g'],
    correctIndex: 0,
    explanation: 'Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol\nMass = moles × molar mass = 0.25 × 40 = 10g',
  },
  {
    id: 'chem-3', subject: 'chemistry', topic: 'Chemical Bonding', difficulty: 'easy',
    question: 'Which type of bonding exists in NaCl?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Van der Waals'],
    correctIndex: 1,
    explanation: 'NaCl is formed between a metal (Na) and a non-metal (Cl).\nSodium transfers one electron to chlorine.\nThis transfer of electrons forms ionic bonds.',
  },
  {
    id: 'chem-4', subject: 'chemistry', topic: 'Electrolysis', difficulty: 'medium',
    question: 'During electrolysis, oxidation occurs at the:',
    options: ['Cathode', 'Anode', 'Electrolyte', 'Salt bridge'],
    correctIndex: 1,
    explanation: 'Remember: AN OX (Anode = Oxidation)\nAt the anode, atoms lose electrons (oxidation).\nAt the cathode, ions gain electrons (reduction).',
  },
  {
    id: 'chem-5', subject: 'chemistry', topic: 'Chemical Bonding', difficulty: 'medium',
    question: 'How many covalent bonds does carbon form?',
    options: ['2', '3', '4', '1'],
    correctIndex: 2,
    explanation: 'Carbon has 4 electrons in its outer shell and needs 4 more to complete its octet.\nSo it forms 4 covalent bonds by sharing 4 pairs of electrons with other atoms.',
  },
  // Biology
  {
    id: 'bio-1', subject: 'biology', topic: 'Cell Biology', difficulty: 'easy',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'],
    correctIndex: 2,
    explanation: 'Mitochondria produce ATP (adenosine triphosphate), which is the energy currency of the cell.\nThis is why they are called the "powerhouse of the cell".',
  },
  {
    id: 'bio-2', subject: 'biology', topic: 'Cell Biology', difficulty: 'medium',
    question: 'Which of these is found in plant cells but NOT in animal cells?',
    options: ['Mitochondria', 'Cell wall', 'Cell membrane', 'Nucleus'],
    correctIndex: 1,
    explanation: 'Plant cells have a rigid cell wall made of cellulose that provides support and shape.\nAnimal cells only have a cell membrane, not a cell wall.\nBoth have mitochondria, cell membrane, and nucleus.',
  },
  {
    id: 'bio-3', subject: 'biology', topic: 'Genetics & Heredity', difficulty: 'medium',
    question: 'In a monohybrid cross Tt × Tt, what fraction of offspring will be homozygous recessive?',
    options: ['3/4', '1/2', '1/4', '0'],
    correctIndex: 2,
    explanation: 'Using a Punnett square:\n   T    t\nT  TT   Tt\nt  Tt   tt\n\nResults: TT, Tt, Tt, tt\nHomozygous recessive (tt) = 1 out of 4 = 1/4',
  },
  {
    id: 'bio-4', subject: 'biology', topic: 'Cell Biology', difficulty: 'easy',
    question: 'Which part of the cell controls its activities?',
    options: ['Cell membrane', 'Cytoplasm', 'Nucleus', 'Ribosome'],
    correctIndex: 2,
    explanation: 'The nucleus is the control center of the cell.\nIt contains DNA which carries genetic instructions for all cell activities, including growth, reproduction, and protein synthesis.',
  },
  // Physics
  {
    id: 'phy-1', subject: 'physics', topic: 'Motion & Forces', difficulty: 'easy',
    question: 'A car accelerates from rest to 30 m/s in 6 seconds. What is its acceleration?',
    options: ['3 m/s²', '5 m/s²', '6 m/s²', '180 m/s²'],
    correctIndex: 1,
    explanation: 'Using a = (v - u) / t\nwhere u = 0 (from rest), v = 30 m/s, t = 6s\na = (30 - 0) / 6 = 5 m/s²',
  },
  {
    id: 'phy-2', subject: 'physics', topic: 'Motion & Forces', difficulty: 'medium',
    question: 'What is the net force on a 5 kg object accelerating at 3 m/s²?',
    options: ['8 N', '15 N', '1.67 N', '2 N'],
    correctIndex: 1,
    explanation: 'Using Newton\'s Second Law: F = ma\nF = 5 kg × 3 m/s² = 15 N\nForce is measured in Newtons (N).',
  },
  {
    id: 'phy-3', subject: 'physics', topic: 'Electricity', difficulty: 'easy',
    question: 'According to Ohm\'s law, if V = 24V and R = 8Ω, what is the current?',
    options: ['3 A', '4 A', '16 A', '32 A'],
    correctIndex: 0,
    explanation: 'Ohm\'s Law: V = IR, so I = V/R\nI = 24/8 = 3 Amperes\nCurrent is measured in Amperes (A).',
  },
  {
    id: 'phy-4', subject: 'physics', topic: 'Electricity', difficulty: 'medium',
    question: 'Two resistors of 6Ω and 3Ω are connected in parallel. What is the total resistance?',
    options: ['9Ω', '2Ω', '4.5Ω', '3Ω'],
    correctIndex: 1,
    explanation: 'For parallel: 1/R = 1/R₁ + 1/R₂\n1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2\nTherefore R = 2Ω\nIn parallel, total resistance is always less than the smallest resistor.',
  },
  // English
  {
    id: 'eng-1', subject: 'english', topic: 'Parts of Speech', difficulty: 'easy',
    question: 'Identify the verb in: "The students studied hard for the exam."',
    options: ['students', 'studied', 'hard', 'exam'],
    correctIndex: 1,
    explanation: '"Studied" is the verb because it describes the action performed by the subject (students).\nVerbs tell us what someone does or what happens.',
  },
  {
    id: 'eng-2', subject: 'english', topic: 'Parts of Speech', difficulty: 'medium',
    question: 'Which word is an adverb in: "She speaks fluently in three languages"?',
    options: ['She', 'speaks', 'fluently', 'languages'],
    correctIndex: 2,
    explanation: '"Fluently" is an adverb because it modifies the verb "speaks" — it tells us HOW she speaks.\nAdverbs often end in -ly and answer questions like how, when, where, or to what extent.',
  },
  {
    id: 'eng-3', subject: 'english', topic: 'Comprehension & Summary', difficulty: 'easy',
    question: 'What does "to infer" mean in comprehension?',
    options: ['To copy from the text', 'To guess randomly', 'To draw a conclusion from clues in the text', 'To summarize the passage'],
    correctIndex: 2,
    explanation: 'To infer means to reach a conclusion based on evidence and reasoning from the text, not just what is directly stated.\nIt\'s like reading between the lines.',
  },
  {
    id: 'eng-4', subject: 'english', topic: 'Parts of Speech', difficulty: 'easy',
    question: 'Which is a conjunction: "I wanted to go but it rained."',
    options: ['wanted', 'go', 'but', 'rained'],
    correctIndex: 2,
    explanation: '"But" is a conjunction — it connects two clauses: "I wanted to go" and "it rained".\nCommon conjunctions include: and, but, or, so, yet, because, although.',
  },
];
