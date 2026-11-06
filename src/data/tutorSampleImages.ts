// Distinction ZA - Preset Homework & Exam Photos for AI Tutor Zola
// Realistic visual problem representations encoded as SVG Data URLs

// 1. Grade 12 Mathematics P1 - Calculus Stationary Points & Working
const mathSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.7"/>
    </pattern>
  </defs>
  <!-- Notebook Page Background -->
  <rect width="600" height="420" fill="#fdfbf7"/>
  <rect width="600" height="420" fill="url(#grid)"/>
  <line x1="60" y1="0" x2="60" y2="420" stroke="#fca5a5" stroke-width="1.5"/>

  <!-- Exam Header -->
  <text x="75" y="38" font-family="monospace" font-size="13" font-weight="bold" fill="#0f172a">DBE NSC GR12 MATHS P1 — QUESTION 8.2 (5 Marks)</text>
  <rect x="75" y="46" width="500" height="1.5" fill="#cbd5e1"/>

  <!-- Question Stem -->
  <text x="75" y="70" font-family="sans-serif" font-size="12" font-style="italic" fill="#334155">Given: f(x) = 2x³ - 3x² - 12x + 5</text>
  <text x="75" y="88" font-family="sans-serif" font-size="12" fill="#334155">8.2.1 Determine the coordinates of the turning points of f.</text>
  <text x="75" y="106" font-family="sans-serif" font-size="12" fill="#334155">8.2.2 State the values of x for which f is strictly concave upward.</text>

  <!-- Handwritten Student Working (Simulated blue pen) -->
  <rect x="75" y="122" width="500" height="275" rx="8" fill="#ffffff" fill-opacity="0.8" stroke="#cbd5e1" stroke-dasharray="3 3"/>
  <text x="90" y="145" font-family="monospace" font-size="11" font-weight="bold" fill="#1e40af">My Working (Thabo M. - Gr 12):</text>

  <text x="90" y="172" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">At turning points: f'(x) = 0</text>
  <text x="90" y="196" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">f'(x) = 6x² - 6x - 12</text>
  <text x="90" y="220" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">6x² - 6x - 12 = 0   [÷ 6]</text>
  <text x="90" y="244" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">x² - x - 2 = 0</text>
  <text x="90" y="268" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">(x - 2)(x + 1) = 0  ⇒  x = 2  or  x = -1</text>
  <text x="90" y="296" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">y₁ = 2(2)³ - 3(2)² - 12(2) + 5 = 16 - 12 - 24 + 5 = -15  ⇒ (2 ; -15)</text>
  <text x="90" y="322" font-family="'Comic Sans MS', cursive, sans-serif" font-size="13" fill="#1d4ed8">y₂ = 2(-1)³ - 3(-1)² - 12(-1) + 5 = -2 - 3 + 12 + 5 = 12   ⇒ (-1 ; 12)</text>
  <text x="90" y="352" font-family="'Comic Sans MS', cursive, sans-serif" font-size="12" fill="#b91c1c">❓ Question for Zola: How do I test concavity for 8.2.2? Do I use f''(x) > 0?</text>

  <!-- Watermark badge -->
  <rect x="440" y="365" width="125" height="22" rx="4" fill="#1e293b"/>
  <text x="448" y="380" font-family="sans-serif" font-size="10" font-weight="bold" fill="#f8fafc">📸 PHOTO ATTACHED</text>
</svg>`;

// 2. Grade 12 Life Sciences P1 - Meiosis Diagram
const lifeSciencesSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <rect width="600" height="420" fill="#f8fafc"/>
  
  <!-- Header -->
  <rect x="20" y="15" width="560" height="35" rx="6" fill="#065f46"/>
  <text x="35" y="38" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ecfdf5">DBE LIFE SCIENCES P1 — DIAGRAM QUESTION: MEIOSIS</text>

  <!-- Border Box -->
  <rect x="20" y="60" width="560" height="340" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>

  <!-- Question Stem -->
  <text x="40" y="85" font-family="sans-serif" font-size="12" fill="#0f172a" font-weight="bold">Study the diagram below representing a specific phase in Meiosis I:</text>

  <!-- Cell Membrane Outline -->
  <ellipse cx="230" cy="225" rx="150" ry="110" fill="#f0fdf4" stroke="#059669" stroke-width="2.5" stroke-dasharray="6 4"/>
  <ellipse cx="230" cy="225" rx="110" ry="80" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>

  <!-- Centrosomes & Spindle Fibers -->
  <circle cx="120" cy="225" r="7" fill="#f59e0b"/>
  <circle cx="340" cy="225" r="7" fill="#f59e0b"/>
  <line x1="120" y1="225" x2="200" y2="190" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="120" y1="225" x2="200" y2="250" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="340" y1="225" x2="260" y2="190" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="340" y1="225" x2="260" y2="250" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2"/>

  <!-- Homologous Chromosome Pair crossing over -->
  <!-- Chromosome 1 (Blue) -->
  <path d="M 195 160 Q 210 200 215 225 Q 210 250 195 285" fill="none" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
  <path d="M 215 160 Q 220 200 225 225 Q 220 250 215 285" fill="none" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
  <!-- Chromosome 2 (Red/Orange) -->
  <path d="M 235 160 Q 230 200 225 225 Q 230 250 235 285" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>
  <path d="M 255 160 Q 240 200 235 225 Q 240 250 255 285" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>

  <!-- Centromere dots -->
  <circle cx="215" cy="225" r="4.5" fill="#facc15"/>
  <circle cx="235" cy="225" r="4.5" fill="#facc15"/>

  <!-- Labels -->
  <!-- Label A: Chiasma (Crossing over point) -->
  <line x1="225" y1="205" x2="280" y2="150" stroke="#334155" stroke-width="1.5"/>
  <rect x="280" y="140" width="22" height="18" fill="#1e293b" rx="3"/>
  <text x="286" y="154" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">A</text>

  <!-- Label B: Centromere -->
  <line x1="215" y1="225" x2="160" y2="150" stroke="#334155" stroke-width="1.5"/>
  <rect x="145" y="140" width="22" height="18" fill="#1e293b" rx="3"/>
  <text x="151" y="154" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">B</text>

  <!-- Label C: Spindle fibre -->
  <line x1="310" y1="225" x2="340" y2="270" stroke="#334155" stroke-width="1.5"/>
  <rect x="340" y="260" width="22" height="18" fill="#1e293b" rx="3"/>
  <text x="346" y="274" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff">C</text>

  <!-- Questions Pane on Right -->
  <rect x="400" y="95" width="165" height="285" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="410" y="118" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Questions for Zola:</text>
  <text x="410" y="140" font-family="sans-serif" font-size="10" fill="#334155">1. Identify the phase</text>
  <text x="410" y="155" font-family="sans-serif" font-size="10" fill="#334155">   shown above.</text>
  <text x="410" y="180" font-family="sans-serif" font-size="10" fill="#334155">2. Name parts A, B, C.</text>
  <text x="410" y="205" font-family="sans-serif" font-size="10" fill="#334155">3. State the biological</text>
  <text x="410" y="220" font-family="sans-serif" font-size="10" fill="#334155">   importance of</text>
  <text x="410" y="235" font-family="sans-serif" font-size="10" fill="#334155">   process at A for</text>
  <text x="410" y="250" font-family="sans-serif" font-size="10" fill="#334155">   genetic variation.</text>
  <text x="410" y="280" font-family="sans-serif" font-size="10" font-style="italic" fill="#059669">4. What is non-disjunction?</text>
</svg>`;

// 3. Grade 12 Geography P1 - Synoptic Weather Chart
const geographySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
  <rect width="600" height="420" fill="#e0f2fe"/>

  <!-- Title Banner -->
  <rect x="20" y="12" width="560" height="34" rx="6" fill="#0369a1"/>
  <text x="35" y="34" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f0f9ff">SOUTH AFRICAN WEATHER SERVICE (SAWS) — SYNOPTIC CHART 14:00 SAST</text>

  <!-- Landmass Outline (Southern Africa) -->
  <path d="M 120 180 Q 150 140 280 130 Q 420 130 470 190 Q 480 260 410 320 Q 320 370 200 360 Q 150 330 120 270 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="280" y="230" font-family="sans-serif" font-size="12" font-weight="bold" fill="#78350f" opacity="0.6">SOUTH AFRICA</text>

  <!-- Cities -->
  <circle cx="165" cy="340" r="3.5" fill="#b91c1c"/>
  <text x="145" y="358" font-family="sans-serif" font-size="9" font-weight="bold" fill="#0f172a">Cape Town (14°C)</text>

  <circle cx="430" cy="270" r="3.5" fill="#b91c1c"/>
  <text x="440" y="274" font-family="sans-serif" font-size="9" font-weight="bold" fill="#0f172a">Durban (24°C)</text>

  <circle cx="340" cy="200" r="3.5" fill="#b91c1c"/>
  <text x="350" y="204" font-family="sans-serif" font-size="9" font-weight="bold" fill="#0f172a">Johannesburg</text>

  <!-- Isobars -->
  <path d="M 60 280 Q 120 310 180 340 Q 240 370 320 380" fill="none" stroke="#0284c7" stroke-width="1.8"/>
  <text x="65" y="275" font-family="monospace" font-size="9" fill="#0369a1">1016 hPa</text>

  <path d="M 60 320 Q 130 350 200 380 Q 260 400 340 405" fill="none" stroke="#0284c7" stroke-width="1.8"/>
  <text x="65" y="315" font-family="monospace" font-size="9" fill="#0369a1">1012 hPa</text>

  <!-- High Pressure Cell (South Atlantic Anticyclone) -->
  <circle cx="90" cy="180" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
  <text x="83" y="185" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1d4ed8">H</text>
  <text x="70" y="198" font-family="sans-serif" font-size="8" fill="#1d4ed8">1028 hPa</text>

  <!-- Mid-Latitude Cyclone & Cold Front approaching SW Cape -->
  <!-- Barbed cold front line -->
  <path d="M 80 400 Q 140 350 170 320 Q 200 290 230 250" fill="none" stroke="#2563eb" stroke-width="3"/>
  <!-- Front triangles -->
  <polygon points="120,365 130,358 132,370" fill="#2563eb"/>
  <polygon points="155,335 165,328 167,340" fill="#2563eb"/>
  <polygon points="190,300 200,293 202,305" fill="#2563eb"/>

  <!-- Cold Front Label -->
  <rect x="75" y="360" width="85" height="18" fill="#1e3a8a" rx="4"/>
  <text x="80" y="373" font-family="sans-serif" font-size="9" font-weight="bold" fill="#ffffff">COLD FRONT X</text>

  <!-- Wind Arrow Cape Town (backing from NW to SW) -->
  <line x1="165" y1="340" x2="135" y2="360" stroke="#0f172a" stroke-width="2"/>
  <line x1="135" y1="360" x2="142" y2="350" stroke="#0f172a" stroke-width="1.5"/>

  <!-- Legend / Questions box -->
  <rect x="360" y="60" width="215" height="120" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="370" y="80" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">CAPS Past Paper Question:</text>
  <text x="370" y="98" font-family="sans-serif" font-size="10" fill="#334155">1. Identify Weather System X.</text>
  <text x="370" y="114" font-family="sans-serif" font-size="10" fill="#334155">2. Predict the wind direction and</text>
  <text x="370" y="128" font-family="sans-serif" font-size="10" fill="#334155">   temperature change in Cape Town.</text>
  <text x="370" y="146" font-family="sans-serif" font-size="10" fill="#334155">3. Name the cloud type and rain</text>
  <text x="370" y="160" font-family="sans-serif" font-size="10" fill="#334155">   associated with this front.</text>
</svg>`;

export interface SampleHomeworkPhoto {
  id: string;
  title: string;
  grade: number;
  subject: string;
  prompt: string;
  dataUrl: string;
}

export const SAMPLE_HOMEWORK_PHOTOS: SampleHomeworkPhoto[] = [
  {
    id: 'math_calculus',
    title: '📐 Calculus Turning Points (Handwritten)',
    grade: 12,
    subject: 'Mathematics P1',
    prompt: 'Zola, please check my handwritten calculus working in this photo for Question 8.2. Are my turning points correct, and how do I solve 8.2.2 for concavity?',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(mathSvg)}`,
  },
  {
    id: 'life_sciences_meiosis',
    title: '🧬 Meiosis Prophase I Diagram (Past Paper)',
    grade: 12,
    subject: 'Life Sciences P1',
    prompt: 'Zola, please identify the phase in this meiosis diagram, label structures A, B, and C, and explain the significance of the process occurring at A.',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(lifeSciencesSvg)}`,
  },
  {
    id: 'geography_synoptic',
    title: '🗺️ Synoptic Weather Chart (Cold Front)',
    grade: 12,
    subject: 'Geography P1',
    prompt: 'Zola, please analyze this South African synoptic chart photo. What weather changes will Cape Town experience as Cold Front X passes through?',
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(geographySvg)}`,
  },
];
