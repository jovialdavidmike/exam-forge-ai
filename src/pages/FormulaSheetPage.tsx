import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = [
  {
    title: 'General Formulas',
    formulas: [
      { name: 'Number of moles', formula: 'n = mass / molar mass' },
      { name: 'Avogadro\'s number', formula: 'N_A = 6.022 × 10²³ mol⁻¹' },
      { name: 'Number of particles', formula: 'N = n × N_A' },
      { name: 'Molar volume (STP)', formula: '22.4 dm³/mol' },
      { name: 'Concentration', formula: 'C = n / V (mol/dm³)' },
    ],
  },
  {
    title: 'Gas Laws',
    formulas: [
      { name: 'Boyle\'s Law', formula: 'P₁V₁ = P₂V₂ (at constant T)' },
      { name: 'Charles\'s Law', formula: 'V₁/T₁ = V₂/T₂ (at constant P)' },
      { name: 'General Gas Law', formula: 'P₁V₁/T₁ = P₂V₂/T₂' },
      { name: 'Ideal Gas Equation', formula: 'PV = nRT' },
      { name: 'Gas constant (R)', formula: '8.314 J/(mol·K)' },
    ],
  },
  {
    title: 'Acids, Bases & Salts',
    formulas: [
      { name: 'pH', formula: 'pH = -log[H⁺]' },
      { name: 'pOH', formula: 'pOH = -log[OH⁻]' },
      { name: 'pH + pOH', formula: '= 14 (at 25°C)' },
      { name: 'Dilution', formula: 'C₁V₁ = C₂V₂' },
    ],
  },
  {
    title: 'Electrochemistry',
    formulas: [
      { name: 'Faraday\'s 1st Law', formula: 'm = ZIt' },
      { name: 'Faraday\'s constant', formula: 'F = 96,500 C/mol' },
      { name: 'Electrochemical equiv.', formula: 'Z = A / (nF)' },
    ],
  },
  {
    title: 'Thermochemistry',
    formulas: [
      { name: 'Heat energy', formula: 'Q = mcΔT' },
      { name: 'Enthalpy change', formula: 'ΔH = H(products) - H(reactants)' },
      { name: 'Hess\'s Law', formula: 'ΔH_total = ΣΔH (of steps)' },
    ],
  },
  {
    title: 'Common Ions & Charges',
    formulas: [
      { name: 'Group I metals', formula: '+1 (Na⁺, K⁺, Li⁺)' },
      { name: 'Group II metals', formula: '+2 (Ca²⁺, Mg²⁺, Ba²⁺)' },
      { name: 'Halogens', formula: '-1 (Cl⁻, Br⁻, I⁻)' },
      { name: 'Sulphate', formula: 'SO₄²⁻' },
      { name: 'Nitrate', formula: 'NO₃⁻' },
      { name: 'Carbonate', formula: 'CO₃²⁻' },
      { name: 'Hydroxide', formula: 'OH⁻' },
      { name: 'Ammonium', formula: 'NH₄⁺' },
    ],
  },
];

export default function FormulaSheetPage() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-4 pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-foreground">⚗️ Chemistry Formulas</h1>
          <p className="text-xs text-muted-foreground">Quick reference for JAMB, WAEC & NECO</p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{section.title}</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {section.formulas.map((f, i) => (
              <div key={i} className="flex items-start gap-2 px-3.5 py-2.5">
                <span className="text-xs text-muted-foreground font-medium min-w-[100px] flex-shrink-0">{f.name}</span>
                <span className="text-xs font-semibold text-foreground font-mono">{f.formula}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
