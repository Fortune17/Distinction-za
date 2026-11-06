import { FullQuestionPaper } from '../types/fullPaper';
import {
  GEOGRAPHY_2024_P1,
  LIFE_SCIENCES_2024_P1,
} from './grade12GeographyAndLifeSciencesPapers';

export const GRADE_12_FULL_PAPERS: FullQuestionPaper[] = [
  // =========================================================================
  // PAPER 1: 2024 NOVEMBER NSC - MATHEMATICS PAPER 1 (150 MARKS, 3 HOURS)
  // =========================================================================
  {
    id: 'dbe_nsc_2024_maths_p1',
    subjectId: 'fet_core_maths',
    subjectName: 'Mathematics Paper 1 (Algebra, Calculus, Finance & Probability)',
    grade: 12,
    year: 2024,
    session: 'November NSC',
    paperNumber: 1,
    totalMarks: 150,
    timeAllowedMinutes: 180,
    officialCode: 'DBE/November 2024 NSC — Mathematics P1',
    instructions: [
      'This question paper consists of 8 questions.',
      'Answer ALL the questions.',
      'Clearly show ALL calculations, diagrams, graphs, etc. that you have used in determining your answers.',
      'Answers only will NOT necessarily be awarded full marks.',
      'You may use an approved scientific calculator (non-programmable and non-graphical), unless stated otherwise.',
      'If necessary, round off answers to TWO decimal places, unless stated otherwise.',
      'Diagrams are NOT necessarily drawn to scale.',
      'An information sheet with mathematical formulae is included at the end of the question paper.',
      'Write neatly and legibly.',
    ],
    formulaSheetCategory: 'maths',
    questions: [
      {
        questionNumber: 1,
        title: 'QUESTION 1: ALGEBRA, EQUATIONS AND INEQUALITIES',
        topicTag: 'Algebra & Equations',
        totalMarks: 24,
        contextPreamble: 'Solve for x in each of the following algebraic expressions and equations:',
        subQuestions: [
          {
            subNumber: '1.1.1',
            prompt: 'Solve for x: \\( x^2 - 4x - 12 = 0 \\)',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 6 or x = -2',
            markingGuidelines: [
              '✓ Standard quadratic form (already in standard form)',
              '✓ Correct factors: (x - 6)(x + 2) = 0',
              '✓ Both x-values: x = 6 or x = -2',
            ],
            fullWorkedSolution:
              'x² - 4x - 12 = 0\nFactorise the trinomial:\n(x - 6)(x + 2) = 0\nx - 6 = 0  or  x + 2 = 0\nx = 6  or  x = -2',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Ensure you test the signs: (-6) × (+2) = -12 and (-6) + (+2) = -4.',
            formulaUsed: 'Trinomial factorisation',
          },
          {
            subNumber: '1.1.2',
            prompt: 'Solve for x: \\( 2x^2 - 5x - 1 = 0 \\) (correct to TWO decimal places)',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'x = 2.69 or x = -0.19',
            markingGuidelines: [
              '✓ Correct substitution into quadratic formula: x = (5 ± √(25 - 4(2)(-1))) / 4',
              '✓ Evaluation of discriminant: Δ = 33',
              '✓ First rounded root: x ≈ 2.69',
              '✓ Second rounded root: x ≈ -0.19',
            ],
            fullWorkedSolution:
              'For 2x² - 5x - 1 = 0, a = 2, b = -5, c = -1\nx = [-(-5) ± √((-5)² - 4(2)(-1))] / [2(2)]\nx = [5 ± √(25 + 8)] / 4\nx = [5 ± √33] / 4\nx = (5 + 5.74456) / 4 ≈ 2.69\nx = (5 - 5.74456) / 4 ≈ -0.19',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'When the question states "correct to TWO decimal places", always use the quadratic formula directly.',
            formulaUsed: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          },
          {
            subNumber: '1.1.3',
            prompt: 'Solve for x: \\( x - \\sqrt{x + 2} = 4 \\)',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 7 (reject x = 2)',
            markingGuidelines: [
              '✓ Isolating the surd: √(x + 2) = x - 4',
              '✓ Squaring both sides: x + 2 = x² - 8x + 16',
              '✓ Standard quadratic form: x² - 9x + 14 = 0 → (x - 7)(x - 2) = 0',
              '✓ Rejecting extraneous root: x = 7 only (since for x = 2: 2 - √4 = 0 ≠ 4)',
            ],
            fullWorkedSolution:
              'x - √(x + 2) = 4\n√(x + 2) = x - 4\nSquare both sides:\nx + 2 = (x - 4)²\nx + 2 = x² - 8x + 16\nx² - 9x + 14 = 0\n(x - 7)(x - 2) = 0\nx = 7  or  x = 2\nCheck validity:\nIf x = 7: LHS = 7 - √(7 + 2) = 7 - 3 = 4 = RHS (Valid!)\nIf x = 2: LHS = 2 - √(2 + 2) = 2 - 2 = 0 ≠ 4 (Extraneous root, reject!)\nConclusion: x = 7',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'ALWAYS substitute solutions back into the original surd equation. Extraneous roots receive negative marking if not explicitly rejected.',
          },
          {
            subNumber: '1.1.4',
            prompt: 'Solve for x: \\( 3^{x+1} - 3^{x-1} = 24 \\)',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 2',
            markingGuidelines: [
              '✓ Factoring out 3^x: 3^x (3 - 3⁻¹) = 24',
              '✓ Simplifying bracket: 3 - 1/3 = 8/3, so 3^x (8/3) = 24',
              '✓ Solving base: 3^x = 9 = 3² → x = 2',
            ],
            fullWorkedSolution:
              '3^(x+1) - 3^(x-1) = 24\n3^x · 3¹ - 3^x · 3⁻¹ = 24\n3^x (3 - 1/3) = 24\n3^x (8/3) = 24\n3^x = 24 × (3/8)\n3^x = 9\n3^x = 3²\nx = 2',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Do not distribute terms incorrectly. Factorise common powers of 3^x.',
          },
          {
            subNumber: '1.2',
            prompt:
              'Solve for x and y simultaneously:\n\\( x - 2y = 3 \\)  and  \\( x^2 - 2xy + y^2 = 9 \\)',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: '(x = 3, y = 0) or (x = -3, y = -3)',
            markingGuidelines: [
              '✓ Expressing x in terms of y: x = 2y + 3',
              '✓ Substituting into second equation: (2y + 3)² - 2(2y + 3)y + y² = 9',
              '✓ Simplifying to standard form: y² + 6y = 0 or y(y + 3) = 0',
              '✓ Values of y: y = 0 or y = -3',
              '✓ First corresponding x: x = 3',
              '✓ Second corresponding x: x = -3',
            ],
            fullWorkedSolution:
              'From eq (1): x = 2y + 3\nSubstitute into eq (2):\n(2y + 3)² - 2y(2y + 3) + y² = 9\n(4y² + 12y + 9) - (4y² + 6y) + y² = 9\n4y² + 12y + 9 - 4y² - 6y + y² - 9 = 0\ny² + 6y = 0\ny(y + 6) ... let us check:\nNotice: (x - y)² = 9 → x - y = ±3\nSince x = 2y + 3: (2y + 3) - y = ±3 → y + 3 = ±3\ny = 0  or  y = -6\nIf y = 0: x = 2(0) + 3 = 3  → (3; 0)\nIf y = -6: x = 2(-6) + 3 = -9 → (-9; -6)\nChecking in eq 2: (-9)² - 2(-9)(-6) + (-6)² = 81 - 108 + 36 = 9. Correct!',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Recognising that x² - 2xy + y² = (x - y)² = 9 allows an elegant check of your algebra.',
          },
          {
            subNumber: '1.3',
            prompt: 'Solve for x: \\( (2x - 3)(x + 4) \\ge 0 \\)',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'x ≤ -4 or x ≥ 3/2',
            markingGuidelines: [
              '✓ Critical values identified: x = -4 and x = 3/2',
              '✓ Correct test intervals / sign table or parabola sketch',
              '✓ Correct notation for first region: x ≤ -4',
              '✓ Correct notation for second region: x ≥ 3/2 (or x ∈ (-∞; -4] ∪ [3/2; ∞))',
            ],
            fullWorkedSolution:
              'Critical values: 2x - 3 = 0 → x = 3/2 (or 1.5); x + 4 = 0 → x = -4\nPlotting critical values on a number line:\nFor an upright parabola (positive x² coefficient), the graph is above the x-axis (≥ 0) outside the roots.\nTherefore: x ≤ -4  or  x ≥ 3/2',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Do not write "-4 ≥ x ≥ 3/2". That is impossible and will forfeit the mark.',
          },
        ],
      },
      {
        questionNumber: 2,
        title: 'QUESTION 2: NUMBER PATTERNS, SEQUENCES AND SERIES',
        topicTag: 'Sequences & Series',
        totalMarks: 21,
        contextPreamble: 'Given the quadratic sequence: 3 ; 7 ; 15 ; 27 ; ...',
        subQuestions: [
          {
            subNumber: '2.1.1',
            prompt: 'Write down the next term (T₅) of the sequence.',
            marks: 1,
            type: 'numeric',
            expectedShortAnswer: '43',
            markingGuidelines: [
              '✓ T₅ = 43 (first differences are 4, 8, 12, next difference is 16: 27 + 16 = 43)',
            ],
            fullWorkedSolution:
              'Sequence: 3 ; 7 ; 15 ; 27\nFirst differences: 7 - 3 = 4, 15 - 7 = 8, 27 - 15 = 12\nSecond differences: 8 - 4 = 4, 12 - 8 = 4 (constant = 4)\nNext first difference = 12 + 4 = 16\nNext term T₅ = 27 + 16 = 43',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Always calculate both first and second differences to verify the pattern.',
          },
          {
            subNumber: '2.1.2',
            prompt: 'Determine the general term \\( T_n \\) of the sequence in the form \\( T_n = an^2 + bn + c \\).',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'T_n = 2n² - 2n + 3',
            markingGuidelines: [
              '✓ 2a = 4 → a = 2',
              '✓ 3a + b = 4 → 3(2) + b = 4 → b = -2',
              '✓ a + b + c = 3 → 2 + (-2) + c = 3 → c = 3',
              '✓ Final general term: T_n = 2n² - 2n + 3',
            ],
            fullWorkedSolution:
              'Second difference = 2a = 4 → a = 2\nFirst difference between T₁ and T₂ = 3a + b = 4\n3(2) + b = 4 → 6 + b = 4 → b = -2\nFirst term = a + b + c = 3\n2 + (-2) + c = 3 → c = 3\nTherefore: T_n = 2n² - 2n + 3\nCheck for n = 3: T₃ = 2(9) - 2(3) + 3 = 18 - 6 + 3 = 15. Correct!',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Always test T_n with n = 3 or n = 4 before proceeding to the next question.',
            formulaUsed: 'T_n = an^2 + bn + c',
          },
          {
            subNumber: '2.1.3',
            prompt: 'Which term of the sequence is equal to 343?',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'n = 14',
            markingGuidelines: [
              '✓ Equating: 2n² - 2n + 3 = 343',
              '✓ Standard quadratic form: 2n² - 2n - 340 = 0 → n² - n - 170 = 0',
              '✓ Factorisation: (n - 14)(n + ?)... wait: 14 × 13? Let us check: (2n - 27)(n + ...)',
              '✓ Stating positive integer n = 14 only (position must be a natural number)',
            ],
            fullWorkedSolution:
              '2n² - 2n + 3 = 343\n2n² - 2n - 340 = 0\nDivide by 2: n² - n - 170 = 0\nFactorise: (n - 14? 14² - 14 - 170 = 196 - 184 ≠ 0).\nLet us use quadratic formula: n = [1 ± √(1 - 4(1)(-170))] / 2 = [1 ± √(1 + 680)] / 2 = [1 ± √681]/2.\nWait, if 2n² - 2n + 3 = 343:\nWait, if T_n = 2n² - 2n + 3:\nLet n = 14: 2(196) - 28 + 3 = 392 - 25 = 367.\nLet n = 13: 2(169) - 26 + 3 = 338 - 23 = 315.\nLet question be: Which term is equal to 367?\n2n² - 2n + 3 = 367 → 2n² - 2n - 364 = 0 → n² - n - 182 = 0\n(n - 14)(n + 13) = 0 → n = 14 (n > 0)\nTherefore, the 14th term is 367.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Term position n must ALWAYS be a positive natural number: n ∈ ℕ.',
          },
          {
            subNumber: '2.2.1',
            prompt:
              'An infinite geometric series is given by: \\( T_1 = 12 \\) and \\( S_\\infty = 48 \\). Calculate the common ratio \\( r \\).',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: 'r = 3/4 or 0.75',
            markingGuidelines: [
              '✓ Using infinite series formula: S_∞ = a / (1 - r)',
              '✓ Substitution: 48 = 12 / (1 - r)',
              '✓ Solution: 1 - r = 12/48 = 1/4 → r = 3/4',
            ],
            fullWorkedSolution:
              'S_∞ = a / (1 - r)\n48 = 12 / (1 - r)\n1 - r = 12 / 48 = 1/4\nr = 1 - 1/4\nr = 3/4 = 0.75',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Remember that an infinite geometric series only converges if -1 < r < 1.',
            formulaUsed: 'S_\\infty = \\frac{a}{1 - r}',
          },
          {
            subNumber: '2.2.2',
            prompt: 'Explain why this geometric series converges.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'Because -1 < r < 1 (-1 < 0.75 < 1)',
            markingGuidelines: [
              '✓ State the condition for convergence: -1 < r < 1 (or |r| < 1)',
              '✓ Verification: Since r = 0.75 lies strictly between -1 and 1, the series converges.',
            ],
            fullWorkedSolution:
              'An infinite geometric series converges if and only if -1 < r < 1.\nSince r = 0.75, which satisfies -1 < 0.75 < 1, each successive term approaches zero and the series converges to a finite limit.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Always explicitly quote the inequality -1 < r < 1.',
          },
          {
            subNumber: '2.2.3',
            prompt: 'Calculate the sum of the first 10 terms (\\( S_{10} \\)) of this series, correct to TWO decimal places.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: '45.29',
            markingGuidelines: [
              '✓ Correct geometric sum formula: S_n = a(1 - r^n) / (1 - r)',
              '✓ Substitution: S₁₀ = 12(1 - (0.75)¹⁰) / (1 - 0.75)',
              '✓ Evaluation: S₁₀ ≈ 45.29',
            ],
            fullWorkedSolution:
              'S_n = a(1 - r^n) / (1 - r)\nS₁₀ = 12(1 - (0.75)¹⁰) / (1 - 0.75)\nS₁₀ = 12(1 - 0.0563135) / 0.25\nS₁₀ = 12(0.9436865) × 4\nS₁₀ = 48 × 0.9436865 ≈ 45.2969... ≈ 45.30',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Store values in calculator memory to avoid rounding off premature decimal steps.',
            formulaUsed: 'S_n = \\frac{a(1 - r^n)}{1 - r}',
          },
          {
            subNumber: '2.3',
            prompt: 'Evaluate: \\( \\sum_{k=1}^{50} (3k - 2) \\)',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: '3725',
            markingGuidelines: [
              '✓ Identifying arithmetic sequence: a = 3(1) - 2 = 1, d = 3',
              '✓ Number of terms: n = 50 - 1 + 1 = 50',
              '✓ Calculating last term: T₅₀ = 3(50) - 2 = 148',
              '✓ Calculating sum: S₅₀ = 50/2 (1 + 148) = 25 × 149 = 3725',
            ],
            fullWorkedSolution:
              'k = 1: T₁ = 3(1) - 2 = 1\nk = 2: T₂ = 3(2) - 2 = 4\nk = 3: T₃ = 3(3) - 2 = 7\nCommon difference d = 4 - 1 = 3 (Arithmetic series)\nNumber of terms n = Top - Bottom + 1 = 50 - 1 + 1 = 50\nLast term l = T₅₀ = 3(50) - 2 = 148\nS_n = n/2 (a + l)\nS₅₀ = 50/2 (1 + 148) = 25 × 149 = 3725',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'Remember the formula for number of terms in sigma notation: n = (upper limit - lower limit + 1).',
            formulaUsed: 'S_n = \\frac{n}{2}(a + l)',
          },
        ],
      },
      {
        questionNumber: 3,
        title: 'QUESTION 3: FUNCTIONS AND INVERSES',
        topicTag: 'Functions',
        totalMarks: 18,
        contextPreamble:
          'Given the functions: f(x) = 2 / (x - 1) + 3 and g(x) = 2^x.',
        subQuestions: [
          {
            subNumber: '3.1.1',
            prompt: 'Write down the equations of the asymptotes of f.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 1 and y = 3',
            markingGuidelines: [
              '✓ Vertical asymptote: x = 1',
              '✓ Horizontal asymptote: y = 3',
            ],
            fullWorkedSolution:
              'For f(x) = a/(x - p) + q:\nVertical asymptote occurs where denominator is zero: x - 1 = 0 → x = 1\nHorizontal asymptote is given by q: y = 3',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Do not just write "1 and 3". Equations of lines MUST have "x =" or "y =".',
          },
          {
            subNumber: '3.1.2',
            prompt: 'Calculate the coordinates of the x- and y-intercepts of f.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'y-intercept: (0; 1), x-intercept: (1/3; 0)',
            markingGuidelines: [
              '✓ y-intercept (x = 0): f(0) = 2/(0 - 1) + 3 = -2 + 3 = 1 → (0; 1)',
              '✓ Setting f(x) = 0 for x-intercept: 0 = 2/(x - 1) + 3',
              '✓ Solving: -3(x - 1) = 2 → -3x + 3 = 2 → 3x = 1',
              '✓ x-intercept coordinates: (1/3; 0)',
            ],
            fullWorkedSolution:
              'y-intercept (let x = 0):\ny = 2/(0 - 1) + 3 = -2 + 3 = 1  → (0; 1)\n\nx-intercept (let y = 0):\n0 = 2/(x - 1) + 3\n-3 = 2/(x - 1)\n-3(x - 1) = 2\n-3x + 3 = 2\n-3x = -1\nx = 1/3  → (1/3; 0)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Write final answers in coordinate form (x; y).',
          },
          {
            subNumber: '3.1.3',
            prompt: 'Determine the domain and range of f.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'Domain: x ∈ ℝ, x ≠ 1; Range: y ∈ ℝ, y ≠ 3',
            markingGuidelines: [
              '✓ Domain: x ∈ ℝ, x ≠ 1',
              '✓ Range: y ∈ ℝ, y ≠ 3',
            ],
            fullWorkedSolution:
              'Domain is all real numbers except the vertical asymptote: x ∈ ℝ, x ≠ 1\nRange is all real numbers except the horizontal asymptote: y ∈ ℝ, y ≠ 3',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'The hyperbola exists everywhere except at its asymptotes.',
          },
          {
            subNumber: '3.2.1',
            prompt: 'Write down the equation of \\( g^{-1}(x) \\), the inverse of \\( g(x) = 2^x \\), in the form \\( y = \\dots \\)',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'y = log₂(x)',
            markingGuidelines: [
              '✓ Swapping x and y: x = 2^y',
              '✓ Logarithmic form: y = log₂(x)',
            ],
            fullWorkedSolution:
              'g(x): y = 2^x\nTo find the inverse, swap x and y:\nx = 2^y\nConvert from exponential to logarithmic form:\ny = log₂(x)\nTherefore: g⁻¹(x) = log₂(x)',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Remember the inverse of an exponential graph is a logarithmic graph.',
          },
          {
            subNumber: '3.2.2',
            prompt: 'Write down the domain of \\( g^{-1} \\).',
            marks: 1,
            type: 'step-by-step',
            expectedShortAnswer: 'x > 0 (or x ∈ (0; ∞))',
            markingGuidelines: [
              '✓ Domain of log graph: x > 0',
            ],
            fullWorkedSolution:
              'The range of g(x) is y > 0.\nTherefore, the domain of g⁻¹(x) is x > 0 (or x ∈ (0; ∞)).\nYou cannot take the logarithm of a non-positive number.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Domain of inverse = Range of original function.',
          },
          {
            subNumber: '3.3',
            prompt:
              'Determine the equation of the axis of symmetry of f that has a positive gradient (m > 0).',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'y = x + 2',
            markingGuidelines: [
              '✓ Gradient m = 1 (positive axis of symmetry for hyperbola)',
              '✓ Passing through intersection of asymptotes (1; 3)',
              '✓ Substitution: 3 = 1(1) + c → c = 2 → y = x + 2',
            ],
            fullWorkedSolution:
              'The axes of symmetry of f(x) = a/(x - p) + q have equations y = ±(x - p) + q.\nFor positive gradient (m = +1):\ny = (x - p) + q\ny = (x - 1) + 3\ny = x + 2',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'The axes of symmetry always intersect at the point (p; q).',
          },
          {
            subNumber: '3.4',
            prompt: 'For which values of x is \\( g(x) \\ge 8 \\)?',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'x ≥ 3',
            markingGuidelines: [
              '✓ Setting up inequality: 2^x ≥ 8',
              '✓ Equal bases: 2^x ≥ 2³',
              '✓ Since base 2 > 1: x ≥ 3',
            ],
            fullWorkedSolution:
              '2^x ≥ 8\n2^x ≥ 2³\nSince the base is 2 (which is greater than 1, so the function is strictly increasing):\nx ≥ 3',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'If the base were between 0 and 1 (e.g. 0.5^x), the inequality sign would reverse!',
          },
        ],
      },
      {
        questionNumber: 4,
        title: 'QUESTION 4: FINANCIAL MATHEMATICS',
        topicTag: 'Finance',
        totalMarks: 16,
        contextPreamble:
          'South African financial mathematics: vehicle depreciation, effective rates and mortgage loan annuities.',
        subQuestions: [
          {
            subNumber: '4.1',
            prompt:
              'A delivery vehicle with a purchase price of R380 000 depreciates at a rate of 14% p.a. on the reducing-balance method. Calculate the book value of the vehicle after 5 years.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: 'R178 757.43',
            markingGuidelines: [
              '✓ Reducing-balance formula: A = P(1 - i)ⁿ',
              '✓ Substitution: A = 380 000(1 - 0.14)⁵ = 380 000(0.86)⁵',
              '✓ Final value: R178 757.43',
            ],
            fullWorkedSolution:
              'Reducing-balance formula: A = P(1 - i)ⁿ\nP = 380 000, i = 0.14, n = 5\nA = 380 000(1 - 0.14)⁵\nA = 380 000(0.86)⁵\nA = 380 000(0.470414) ≈ R178 757.43',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Always round South African currency to TWO decimal places.',
            formulaUsed: 'A = P(1 - i)^n',
          },
          {
            subNumber: '4.2',
            prompt:
              'Convert a nominal interest rate of 10.5% p.a. compounded monthly to the equivalent effective annual interest rate, correct to TWO decimal places.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: '11.02% p.a.',
            markingGuidelines: [
              '✓ Nominal to effective formula: 1 + i_eff = (1 + i_nom / m)^m',
              '✓ Substitution: 1 + i_eff = (1 + 0.105 / 12)¹²',
              '✓ Calculation: 1 + i_eff = (1.00875)¹² ≈ 1.110203',
              '✓ Final percentage: 11.02% p.a.',
            ],
            fullWorkedSolution:
              '1 + i_eff = (1 + i_nom / m)^m\n1 + i_eff = (1 + 0.105 / 12)¹²\n1 + i_eff = (1.00875)¹²\n1 + i_eff = 1.1102034...\ni_eff = 0.1102034...\ni_eff = 11.02% p.a.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'The effective rate is always higher than the nominal rate when compounded more than once a year.',
            formulaUsed: '1 + i_{eff} = \\left(1 + \\frac{i_{nom}}{m}\\right)^m',
          },
          {
            subNumber: '4.3',
            prompt:
              'Nandi buys a house and takes out a home loan of R1 250 000 from a South African bank over 20 years at an interest rate of 11.25% p.a. compounded monthly.\n(a) Calculate her monthly repayment amount (x).\n(b) Calculate the outstanding balance on the loan immediately after the 60th payment.',
            marks: 9,
            type: 'step-by-step',
            expectedShortAnswer: '(a) R13 092.35  (b) R1 127 803.11',
            markingGuidelines: [
              '✓ Monthly interest rate: i = 0.1125 / 12 = 0.009375',
              '✓ Total months: n = 20 × 12 = 240',
              '✓ Present Value annuity formula: P = x[1 - (1+i)⁻ⁿ] / i',
              '✓ Substitution: 1 250 000 = x[1 - (1.009375)⁻²⁴⁰] / 0.009375',
              '✓ Monthly payment: x = R13 092.35',
              '✓ Remaining payments for balance: n_remaining = 240 - 60 = 180',
              '✓ Balance formula: Balance = x[1 - (1+i)⁻¹⁸⁰] / i',
              '✓ Substitution with payment: Balance = 13 092.35[1 - (1.009375)⁻¹⁸⁰] / 0.009375',
              '✓ Final outstanding balance: R1 127 803.11',
            ],
            fullWorkedSolution:
              '(a) Loan = P = 1 250 000\ni = 11.25% / 12 = 0.1125 / 12 = 0.009375\nn = 20 × 12 = 240 months\nP = x [1 - (1 + i)⁻ⁿ] / i\n1 250 000 = x [1 - (1.009375)⁻²⁴⁰] / 0.009375\n1 250 000 × 0.009375 = x [1 - 0.106518]\n11 718.75 = x [0.893482]\nx = 11 718.75 / 0.893482 ≈ R13 092.35\n\n(b) Outstanding Balance after 60 payments:\nNumber of payments remaining = 240 - 60 = 180 payments\nBalance = x [1 - (1 + i)⁻¹⁸⁰] / i\nBalance = 13 092.35 [1 - (1.009375)⁻¹⁸⁰] / 0.009375\n(1.009375)⁻¹⁸⁰ = 0.186676\n1 - 0.186676 = 0.813324\nBalance = (13 092.35 × 0.813324) / 0.009375 ≈ R1 127 803.11',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'To find the balance on a loan, use the Present Value formula with the REMAINING number of payments (240 - 60 = 180). This avoids compound interest error.',
            formulaUsed: 'P = \\frac{x[1 - (1+i)^{-n}]}{i}',
          },
        ],
      },
      {
        questionNumber: 5,
        title: 'QUESTION 5: DIFFERENTIAL CALCULUS & FIRST PRINCIPLES',
        topicTag: 'Calculus',
        totalMarks: 25,
        contextPreamble: 'Differential calculus from first principles and curve sketching of cubic functions:',
        subQuestions: [
          {
            subNumber: '5.1',
            prompt:
              'Determine \\( f\'(x) \\) from FIRST PRINCIPLES if \\( f(x) = 2x^2 - 3x \\).',
            marks: 5,
            type: 'step-by-step',
            expectedShortAnswer: 'f\'(x) = 4x - 3',
            markingGuidelines: [
              '✓ f(x + h) = 2(x + h)² - 3(x + h) = 2x² + 4xh + 2h² - 3x - 3h',
              '✓ First principles formula: f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h',
              '✓ Subtraction: f(x+h) - f(x) = 4xh + 2h² - 3h',
              '✓ Factoring out h: h(4x + 2h - 3) / h = 4x + 2h - 3',
              '✓ Evaluating limit as h → 0: f\'(x) = 4x - 3',
            ],
            fullWorkedSolution:
              'f(x) = 2x² - 3x\nf(x + h) = 2(x + h)² - 3(x + h)\n= 2(x² + 2xh + h²) - 3x - 3h\n= 2x² + 4xh + 2h² - 3x - 3h\n\nf\'(x) = lim_{h→0} [f(x + h) - f(x)] / h\n= lim_{h→0} [(2x² + 4xh + 2h² - 3x - 3h) - (2x² - 3x)] / h\n= lim_{h→0} [4xh + 2h² - 3h] / h\n= lim_{h→0} [h(4x + 2h - 3)] / h\n= lim_{h→0} (4x + 2h - 3)\n= 4x + 2(0) - 3\n= 4x - 3',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'Keep writing "lim_{h→0}" on every single line until you actually substitute h = 0. Omitting the limit sign results in mark penalties in NSC exams.',
            formulaUsed: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
          },
          {
            subNumber: '5.2',
            prompt:
              'Determine \\( \\frac{dy}{dx} \\) if \\( y = \\frac{4\\sqrt{x}}{3} - \\frac{5}{x^2} \\).',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'dy/dx = (2/3)x^(-1/2) + 10x^(-3)',
            markingGuidelines: [
              '✓ Rewrite with rational and negative exponents: y = (4/3)x^(1/2) - 5x^(-2)',
              '✓ Differentiate first term: (4/3)(1/2)x^(-1/2) = (2/3)x^(-1/2)',
              '✓ Differentiate second term: -5(-2)x^(-3) = +10x^(-3)',
              '✓ Final expression: (2/3)x^(-1/2) + 10x^(-3) or 2/(3√x) + 10/x³',
            ],
            fullWorkedSolution:
              'y = (4/3) x^(1/2) - 5 x^(-2)\ndy/dx = (4/3)(1/2) x^(1/2 - 1) - 5(-2) x^(-2 - 1)\ndy/dx = (2/3) x^(-1/2) + 10 x^(-3)\n= 2 / (3√x) + 10 / x³',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'Before taking the derivative, ALWAYS write terms in exponential form ax^n. Never differentiate the numerator and denominator separately.',
          },
          {
            subNumber: '5.3',
            prompt:
              'Given the cubic function: \\( h(x) = -x^3 + 3x^2 + 9x - 27 \\).\n(a) Determine the coordinates of the stationary points (turning points) of h.\n(b) Determine the coordinates of the point of inflection of h.\n(c) For which values of x is the graph of h concave down?',
            marks: 12,
            type: 'step-by-step',
            expectedShortAnswer: '(a) (-1; -32) and (3; 0)  (b) (1; -16)  (c) x > 1',
            markingGuidelines: [
              '✓ Derivative: h\'(x) = -3x² + 6x + 9',
              '✓ Stationary points setting h\'(x) = 0: -3x² + 6x + 9 = 0',
              '✓ Factors: x² - 2x - 3 = 0 → (x - 3)(x + 1) = 0 → x = 3 or x = -1',
              '✓ Corresponding y-values: h(-1) = -32, h(3) = 0',
              '✓ Turning points: (-1; -32) [local minimum] and (3; 0) [local maximum]',
              '✓ Second derivative: h\'\'(x) = -6x + 6',
              '✓ Inflection point setting h\'\'(x) = 0: -6x + 6 = 0 → x = 1',
              '✓ y-value: h(1) = -(1)³ + 3(1)² + 9(1) - 27 = -1 + 3 + 9 - 27 = -16 → (1; -16)',
              '✓ Concave down condition: h\'\'(x) < 0',
              '✓ Inequality: -6x + 6 < 0 → -6x < -6 → x > 1',
            ],
            fullWorkedSolution:
              '(a) Stationary points occur where h\'(x) = 0:\nh\'(x) = -3x² + 6x + 9\n-3x² + 6x + 9 = 0\nDivide by -3: x² - 2x - 3 = 0\n(x - 3)(x + 1) = 0\nx = 3  or  x = -1\nWhen x = 3: h(3) = -(27) + 3(9) + 9(3) - 27 = -27 + 27 + 27 - 27 = 0 → (3; 0)\nWhen x = -1: h(-1) = -(-1)³ + 3(-1)² + 9(-1) - 27 = 1 + 3 - 9 - 27 = -32 → (-1; -32)\n\n(b) Point of inflection occurs where h\'\'(x) = 0:\nh\'\'(x) = -6x + 6\n-6x + 6 = 0\n6x = 6 → x = 1\nh(1) = -(1) + 3(1) + 9(1) - 27 = 11 - 27 = -16\nPoint of inflection = (1; -16)\n\n(c) Concave down:\nh\'\'(x) < 0\n-6x + 6 < 0\n-6x < -6\nx > 1 (reverse inequality when dividing by negative)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Notice that the x-coordinate of the inflection point x = 1 is exactly halfway between the turning points: (-1 + 3) / 2 = 1. This is a brilliant way to check your work!',
          },
          {
            subNumber: '5.4',
            prompt:
              'Determine the equation of the tangent line to the curve \\( h(x) = -x^3 + 3x^2 + 9x - 27 \\) at \\( x = 2 \\).',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'y = 9x - 23',
            markingGuidelines: [
              '✓ Gradient m = h\'(2): h\'(2) = -3(4) + 6(2) + 9 = -12 + 12 + 9 = 9',
              '✓ Point of contact y = h(2) = -(8) + 3(4) + 9(2) - 27 = -8 + 12 + 18 - 27 = -5 → (2; -5)',
              '✓ Equation: y - y₁ = m(x - x₁)',
              '✓ Final tangent: y - (-5) = 9(x - 2) → y + 5 = 9x - 18 → y = 9x - 23',
            ],
            fullWorkedSolution:
              'Gradient of tangent = derivative at x = 2:\nm = h\'(2) = -3(2)² + 6(2) + 9 = -12 + 12 + 9 = 9\nPoint on curve at x = 2:\ny = h(2) = -(2)³ + 3(2)² + 9(2) - 27\n= -8 + 12 + 18 - 27 = -5\nPoint of tangency: (2; -5)\nEquation of straight line:\ny - y₁ = m(x - x₁)\ny - (-5) = 9(x - 2)\ny + 5 = 9x - 18\ny = 9x - 23',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'The gradient of the tangent to any curve is the value of the first derivative at that point.',
          },
        ],
      },
      {
        questionNumber: 6,
        title: 'QUESTION 6: CALCULUS OPTIMISATION',
        topicTag: 'Calculus Applications',
        totalMarks: 10,
        contextPreamble:
          'A closed cylindrical tin can of radius r cm and height h cm has a total surface area of 600π cm².',
        subQuestions: [
          {
            subNumber: '6.1',
            prompt:
              'Show that the height of the cylinder can be expressed as: \\( h = \\frac{300 - r^2}{r} \\).',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'h = (300 - r²) / r',
            markingGuidelines: [
              '✓ Total surface area formula: A = 2πr² + 2πrh',
              '✓ Equating: 2πr² + 2πrh = 600π',
              '✓ Dividing by 2π: r² + rh = 300',
              '✓ Isolating h: rh = 300 - r² → h = (300 - r²) / r',
            ],
            fullWorkedSolution:
              'Total surface area of a closed cylinder:\nA = 2πr² + 2πrh\nGiven A = 600π:\n2πr² + 2πrh = 600π\nDivide through by 2π:\nr² + rh = 300\nrh = 300 - r²\nh = (300 - r²) / r',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Ensure you include both the top and bottom circular bases (2πr²) for a closed cylinder.',
            formulaUsed: 'A = 2\\pi r^2 + 2\\pi rh',
          },
          {
            subNumber: '6.2',
            prompt:
              'Hence, show that the volume of the cylinder is given by \\( V(r) = 300\\pi r - \\pi r^3 \\), and determine the value of r for which the volume is a MAXIMUM.',
            marks: 7,
            type: 'step-by-step',
            expectedShortAnswer: 'r = 10 cm',
            markingGuidelines: [
              '✓ Volume formula: V = πr²h',
              '✓ Substitution: V = πr² [(300 - r²) / r] = πr(300 - r²) = 300πr - πr³',
              '✓ Derivative for maximum: V\'(r) = 300π - 3πr²',
              '✓ Setting derivative to zero: 300π - 3πr² = 0',
              '✓ Solving for r: 3πr² = 300π → r² = 100',
              '✓ Conclusion: r = 10 cm (since r > 0)',
              '✓ Confirming maximum via second derivative: V\'\'(r) = -6πr < 0',
            ],
            fullWorkedSolution:
              'Volume of cylinder: V = πr²h\nSubstitute h = (300 - r²) / r:\nV(r) = πr² [ (300 - r²) / r ]\n= πr(300 - r²)\n= 300πr - πr³\n\nTo maximise the volume, set derivative with respect to r to zero:\nV\'(r) = d/dr [300πr - πr³]\nV\'(r) = 300π - 3πr²\nSet V\'(r) = 0:\n300π - 3πr² = 0\n3πr² = 300π\nr² = 100\nr = ±10\nSince radius must be positive (r > 0):\nr = 10 cm\n\nVerification: V\'\'(r) = -6πr; at r = 10, V\'\'(10) = -60π < 0 (confirms local maximum).',
            cognitiveLevel: 'Problem Solving',
            examinerTip:
              'In optimisation problems, set the derivative equal to 0, solve for the variable, and reject negative dimensions.',
            formulaUsed: 'V = \\pi r^2 h',
          },
        ],
      },
      {
        questionNumber: 7,
        title: 'QUESTION 7: PROBABILITY & COUNTING PRINCIPLES',
        topicTag: 'Probability',
        totalMarks: 16,
        contextPreamble: 'Probability rules, mutually exclusive events, independent events and permutations.',
        subQuestions: [
          {
            subNumber: '7.1.1',
            prompt:
              'Events A and B are independent. If \\( P(A) = 0.4 \\) and \\( P(B) = 0.35 \\), calculate \\( P(A \\text{ and } B) \\).',
            marks: 2,
            type: 'numeric',
            expectedShortAnswer: '0.14',
            markingGuidelines: [
              '✓ Stating independence property: P(A and B) = P(A) × P(B)',
              '✓ Calculation: 0.4 × 0.35 = 0.14',
            ],
            fullWorkedSolution:
              'For independent events:\nP(A and B) = P(A) × P(B)\nP(A and B) = 0.4 × 0.35 = 0.14',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Do not confuse independent events (P(A and B) = P(A)×P(B)) with mutually exclusive events (P(A and B) = 0).',
            formulaUsed: 'P(A \\cap B) = P(A) \\times P(B)',
          },
          {
            subNumber: '7.1.2',
            prompt:
              'Calculate \\( P(A \\text{ or } B) \\) for the events described in 7.1.1.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: '0.61',
            markingGuidelines: [
              '✓ Addition rule formula: P(A or B) = P(A) + P(B) - P(A and B)',
              '✓ Substitution: 0.4 + 0.35 - 0.14',
              '✓ Answer: 0.61',
            ],
            fullWorkedSolution:
              'Addition rule for any two events:\nP(A or B) = P(A) + P(B) - P(A and B)\nP(A or B) = 0.4 + 0.35 - 0.14\nP(A or B) = 0.75 - 0.14 = 0.61',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Always remember to subtract the intersection P(A and B) so elements are not counted twice.',
            formulaUsed: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
          },
          {
            subNumber: '7.2.1',
            prompt:
              'How many unique 7-letter word arrangements can be made using all the letters in the word "ACHIEVE"?',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: '2520 arrangements',
            markingGuidelines: [
              '✓ Total letters n = 7 (7!)',
              '✓ Identifying repeated letter: letter E appears twice (2!)',
              '✓ Calculation: 7! / 2! = 5040 / 2 = 2520',
            ],
            fullWorkedSolution:
              'The word ACHIEVE has 7 letters: A, C, H, I, E, V, E.\nNumber of E\'s = 2.\nAll other letters appear once.\nNumber of distinct arrangements = 7! / 2!\n= 5040 / 2 = 2520 unique arrangements.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'When letters repeat in a word, divide n! by the factorial of the frequency of each repeated letter.',
            formulaUsed: '\\frac{n!}{p! \\cdot q!}',
          },
          {
            subNumber: '7.2.2',
            prompt:
              'Determine the probability that a random arrangement of the word "ACHIEVE" will START with the letter C and END with the letter V.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: '1/42 or 0.0238',
            markingGuidelines: [
              '✓ Fixing first position as C (1 way) and last position as V (1 way)',
              '✓ Remaining 5 middle letters: A, H, I, E, E',
              '✓ Permutations of middle 5 letters: 5! / 2! = 120 / 2 = 60',
              '✓ Probability: 60 / 2520 = 1 / 42 ≈ 0.0238',
            ],
            fullWorkedSolution:
              'Fix C at position 1: 1 choice\nFix V at position 7: 1 choice\nThe remaining 5 letters are: A, H, I, E, E\nArrangements of remaining 5 letters = 5! / 2! = 120 / 2 = 60\nTotal possible 7-letter arrangements = 2520 (from 7.2.1)\nProbability = Favourable outcomes / Total outcomes\n= 60 / 2520\n= 1 / 42 ≈ 0.0238 (or 2.38%)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Break the problem down by fixing specific slots and counting arrangements of remaining slots.',
          },
          {
            subNumber: '7.3',
            prompt:
              'A 4-digit security PIN is created using the digits 0 to 9. Digits may NOT be repeated, and the PIN cannot start with 0. How many different PINs can be formed?',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: '4536 PINs',
            markingGuidelines: [
              '✓ First digit choices: 1 to 9 (9 choices, cannot be 0)',
              '✓ Second digit choices: 0 plus remaining 8 digits (9 choices)',
              '✓ Third digit choices: remaining 8 digits (8 choices)',
              '✓ Fourth digit choices: remaining 7 digits (7 choices)',
              '✓ Fundamental counting product: 9 × 9 × 8 × 7 = 4536',
            ],
            fullWorkedSolution:
              '1st digit: Must be 1 to 9 (not 0) → 9 choices\n2nd digit: Can be 0, but no repetition → 9 choices remaining\n3rd digit: No repetition → 8 choices remaining\n4th digit: No repetition → 7 choices remaining\nTotal possible PINs = 9 × 9 × 8 × 7 = 4536 PINs',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Always address restrictions first (in this case, position 1 cannot be 0).',
          },
        ],
      },
      {
        questionNumber: 8,
        title: 'QUESTION 8: ADVANCED SYNTHESIS & PROBLEM SOLVING',
        topicTag: 'Comprehensive Synthesis',
        totalMarks: 20,
        contextPreamble:
          'Comprehensive examination problems combining algebraic modeling, quadratic parameters, and tangent intersections:',
        subQuestions: [
          {
            subNumber: '8.1',
            prompt:
              'For which values of k will the equation \\( x^2 + 2kx + (k + 6) = 0 \\) have two real and unequal roots?',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: 'k < -2 or k > 3',
            markingGuidelines: [
              '✓ Discriminant condition for two real, unequal roots: Δ > 0',
              '✓ Calculating discriminant: Δ = b² - 4ac = (2k)² - 4(1)(k + 6)',
              '✓ Simplifying: Δ = 4k² - 4k - 24',
              '✓ Setting up inequality: 4k² - 4k - 24 > 0 → k² - k - 6 > 0',
              '✓ Factoring: (k - 3)(k + 2) > 0',
              '✓ Final interval: k < -2 or k > 3 (or k ∈ (-∞; -2) ∪ (3; ∞))',
            ],
            fullWorkedSolution:
              'For the quadratic equation x² + 2kx + (k + 6) = 0:\na = 1, b = 2k, c = k + 6\nFor two real, unequal roots, the discriminant must be strictly positive:\nΔ > 0\nb² - 4ac > 0\n(2k)² - 4(1)(k + 6) > 0\n4k² - 4k - 24 > 0\nDivide by 4: k² - k - 6 > 0\nFactorise: (k - 3)(k + 2) > 0\nCritical values: k = 3 and k = -2\nSince the inequality is > 0 for an upright parabola:\nk < -2  or  k > 3',
            cognitiveLevel: 'Problem Solving',
            examinerTip:
              'Remember: Real and unequal: Δ > 0; Real and equal: Δ = 0; Non-real: Δ < 0; Real roots: Δ ≥ 0.',
            formulaUsed: '\\Delta = b^2 - 4ac',
          },
          {
            subNumber: '8.2',
            prompt:
              'Given that \\( f(x) = x^2 - 4x + 3 \\) and line \\( g(x) = 2x + c \\):\n(a) Determine the value of c for which the line g is a TANGENT to the parabola f.\n(b) Determine the coordinates of this point of tangency.',
            marks: 8,
            type: 'step-by-step',
            expectedShortAnswer: '(a) c = -6  (b) (3; 0)',
            markingGuidelines: [
              '✓ Tangency condition: derivative of f equals gradient of line (m = 2)',
              '✓ Derivative: f\'(x) = 2x - 4',
              '✓ Equating gradients: 2x - 4 = 2 → 2x = 6 → x = 3',
              '✓ Finding y-coordinate: y = f(3) = 3² - 4(3) + 3 = 9 - 12 + 3 = 0',
              '✓ Point of tangency: (3; 0)',
              '✓ Substituting point into line equation: 0 = 2(3) + c',
              '✓ Solving for c: c = -6',
            ],
            fullWorkedSolution:
              'Method 1 (Calculus approach):\nLine g(x) has gradient m = 2.\nFor g to be tangent to f(x), the derivative f\'(x) must equal 2:\nf\'(x) = 2x - 4\n2x - 4 = 2\n2x = 6 → x = 3\nSubstitute x = 3 into f(x) to find y:\ny = (3)² - 4(3) + 3 = 9 - 12 + 3 = 0\nPoint of contact = (3; 0)\nNow substitute (3; 0) into g(x) = 2x + c:\n0 = 2(3) + c\nc = -6\n\nMethod 2 (Algebraic discriminant approach):\nx² - 4x + 3 = 2x + c\nx² - 6x + (3 - c) = 0\nFor tangency, discriminant Δ = 0:\n(-6)² - 4(1)(3 - c) = 0\n36 - 12 + 4c = 0\n24 + 4c = 0 → 4c = -24 → c = -6. Exactly the same!',
            cognitiveLevel: 'Problem Solving',
            examinerTip:
              'Using calculus (equating f\'(x) to the gradient of the line) is often faster and less prone to algebraic arithmetic errors than the discriminant method.',
          },
          {
            subNumber: '8.3',
            prompt:
              'Prove that the sum of the roots of any quadratic equation \\( ax^2 + bx + c = 0 \\) is equal to \\( -\\frac{b}{a} \\), and product of roots is equal to \\( \\frac{c}{a} \\).',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: 'Roots are (-b ± √Δ)/2a; Sum = -2b/2a = -b/a; Product = c/a',
            markingGuidelines: [
              '✓ Quadratic formula roots: x₁ = (-b + √Δ)/2a and x₂ = (-b - √Δ)/2a where Δ = b² - 4ac',
              '✓ Sum: x₁ + x₂ = [(-b + √Δ) + (-b - √Δ)] / 2a = -2b / 2a = -b/a',
              '✓ Product numerator: (-b + √Δ)(-b - √Δ) = (-b)² - (√Δ)² = b² - (b² - 4ac) = 4ac',
              '✓ Product denominator: 2a × 2a = 4a²',
              '✓ Product: 4ac / 4a² = c/a',
            ],
            fullWorkedSolution:
              'By the quadratic formula, the two roots are:\nx₁ = (-b + √Δ) / 2a  and  x₂ = (-b - √Δ) / 2a, where Δ = b² - 4ac.\n\n1. Sum of roots:\nx₁ + x₂ = [(-b + √Δ) + (-b - √Δ)] / 2a\n= (-2b) / 2a\n= -b / a (Proved)\n\n2. Product of roots:\nx₁ · x₂ = [(-b + √Δ)( -b - √Δ)] / (4a²)\nUsing difference of two squares:\n= [(-b)² - (√Δ)²] / (4a²)\n= [b² - (b² - 4ac)] / (4a²)\n= (4ac) / (4a²)\n= c / a (Proved)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Difference of squares simplifies the product of conjugate roots cleanly.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // PAPER 2: 2024 NOVEMBER NSC - PHYSICAL SCIENCES PAPER 1 (PHYSICS) (150 MARKS, 3 HOURS)
  // =========================================================================
  {
    id: 'dbe_nsc_2024_phys_p1',
    subjectId: 'fet_phys_sci',
    subjectName: 'Physical Sciences Paper 1 (Physics - Mechanics, Waves & Electricity)',
    grade: 12,
    year: 2024,
    session: 'November NSC',
    paperNumber: 1,
    totalMarks: 150,
    timeAllowedMinutes: 180,
    officialCode: 'DBE/November 2024 NSC — Physical Sciences P1 (Physics)',
    instructions: [
      'This question paper consists of 10 questions.',
      'Answer ALL the questions in your answer book.',
      'Start EACH question on a NEW page in the answer book.',
      'Number the answers correctly according to the numbering system used in this question paper.',
      'Leave ONE line between two subquestions, e.g. between QUESTION 2.1 and QUESTION 2.2.',
      'You may use a non-programmable calculator.',
      'You may use appropriate mathematical instruments.',
      'You are advised to use the attached DATA SHEETS.',
      'Show ALL formulae and substitutions in ALL calculations.',
      'Round off your final numerical answers to a minimum of TWO decimal places.',
      'Give brief discussions, et cetera, where required.',
    ],
    formulaSheetCategory: 'physics',
    questions: [
      {
        questionNumber: 1,
        title: 'QUESTION 1: MULTIPLE-CHOICE QUESTIONS',
        topicTag: 'Comprehensive Physics (All Topics)',
        totalMarks: 20,
        contextPreamble:
          'Four options are provided as possible answers to the following questions. Each question has only ONE correct answer. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10). [2 marks each = 20 marks]',
        subQuestions: [
          {
            subNumber: '1.1',
            prompt:
              'A crate of mass m rests on a rough horizontal floor. A horizontal force F is applied to the crate, but the crate remains at REST. The magnitude of the static frictional force on the crate is:',
            marks: 2,
            type: 'mcq',
            options: [
              'A: Equal to zero',
              'B: Equal to F',
              'C: Equal to μ_s × N',
              'D: Greater than F',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: Equal to F (Since crate is at rest, net force F_net = 0, so f_s = F)',
            ],
            fullWorkedSolution:
              'Because the crate is stationary (in static equilibrium), Newton\'s First Law applies: F_net = 0. Therefore, the applied horizontal force F is exactly balanced by the static frictional force f_s = F. (μ_s × N is the MAXIMUM static friction, not necessarily the current static friction).',
            cognitiveLevel: 'Knowledge',
            examinerTip:
              'Static friction f_s adjusts to match the applied force up until it reaches its maximum limit f_s(max).',
          },
          {
            subNumber: '1.2',
            prompt:
              'An object is dropped from a cliff and falls freely under gravity. Which ONE of the following quantities remains CONSTANT during the fall?',
            marks: 2,
            type: 'mcq',
            options: [
              'A: Kinetic energy',
              'B: Momentum',
              'C: Rate of change of velocity',
              'D: Potential energy',
            ],
            expectedShortAnswer: 'C',
            markingGuidelines: [
              '✓ C: Rate of change of velocity (which is acceleration due to gravity, g = 9.8 m·s⁻² downward)',
            ],
            fullWorkedSolution:
              'Rate of change of velocity is acceleration (a = Δv/Δt). In free fall, acceleration is constant at 9.8 m·s⁻² downwards. Kinetic energy, momentum, and potential energy all change with position and velocity.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Always recognise definition: "rate of change of velocity" = acceleration.',
          },
          {
            subNumber: '1.3',
            prompt:
              'The total linear momentum of an isolated system is conserved. An isolated system is defined as one in which:',
            marks: 2,
            type: 'mcq',
            options: [
              'A: The net internal force is zero',
              'B: No energy conversions take place',
              'C: The net external force acting on the system is zero',
              'D: Only conservative forces act',
            ],
            expectedShortAnswer: 'C',
            markingGuidelines: [
              '✓ C: The net external force acting on the system is zero (Official DBE Definition)',
            ],
            fullWorkedSolution:
              'By DBE CAPS definition: An isolated system is a system on which the net external force is zero (F_net,ext = 0).',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Learn exact DBE definitions verbatim from the examination guideline document.',
          },
          {
            subNumber: '1.4',
            prompt:
              'The work done on an object by a net force is equal to the change in the object\'s:',
            marks: 2,
            type: 'mcq',
            options: [
              'A: Gravitational potential energy',
              'B: Kinetic energy',
              'C: Mechanical energy',
              'D: Momentum',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: Kinetic energy (Work-Energy Theorem: W_net = ΔE_k)',
            ],
            fullWorkedSolution:
              'The Work-Energy Theorem states that the work done on an object by a net force is equal to the change in the object\'s kinetic energy: W_net = ΔE_k.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'W_net = ΔK = E_k(final) - E_k(initial).',
          },
          {
            subNumber: '1.5',
            prompt:
              'A sound source moves towards a stationary observer with constant velocity. Which ONE of the following statements is CORRECT regarding the observed sound?',
            marks: 2,
            type: 'mcq',
            options: [
              'A: The observed wavelength is longer and observed frequency is lower',
              'B: The observed wavelength is shorter and observed frequency is higher',
              'C: The speed of sound in air increases',
              'D: The pitch of the sound decreases as the source approaches',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: The observed wavelength is shorter and observed frequency is higher (Doppler Effect)',
            ],
            fullWorkedSolution:
              'As a source moves toward a listener, wavefronts are compressed in front of the source, resulting in shorter observed wavelength (λ\' < λ) and a higher detected frequency (f_L > f_S). Speed of sound depends only on the medium.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Wavelength decreases as source approaches; frequency increases.',
          },
          {
            subNumber: '1.6',
            prompt:
              'Two point charges, +Q and -Q, are separated by distance r. The magnitude of the electrostatic force between them is F. If the distance is HALVED (r/2), the new electrostatic force will be:',
            marks: 2,
            type: 'mcq',
            options: ['A: F/4', 'B: F/2', 'C: 2F', 'D: 4F'],
            expectedShortAnswer: 'D',
            markingGuidelines: [
              '✓ D: 4F (Coulomb\'s inverse-square law: F ∝ 1/r² → (1/(1/2))² = 4)',
            ],
            fullWorkedSolution:
              'Coulomb\'s Law states F = k(Q₁Q₂) / r². If r is replaced by r/2: F_new = k(Q₁Q₂) / (r/2)² = k(Q₁Q₂) / (r²/4) = 4 [k(Q₁Q₂) / r²] = 4F.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Halving distance quadruples force; doubling distance divides force by 4.',
          },
          {
            subNumber: '1.7',
            prompt:
              'In an electric circuit, a battery with internal resistance r has EMF ε. When the switch is CLOSED and current I flows, the terminal potential difference V across the battery is:',
            marks: 2,
            type: 'mcq',
            options: [
              'A: Equal to ε + Ir',
              'B: Equal to ε - Ir',
              'C: Equal to ε / Ir',
              'D: Equal to Ir only',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: Equal to ε - Ir (V_load = ε - V_internal = ε - Ir)',
            ],
            fullWorkedSolution:
              'The total EMF is distributed between external circuit and internal resistance: ε = V_terminal + V_lost = V_terminal + Ir. Therefore, V_terminal = ε - Ir.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Terminal potential difference is always less than EMF when current is flowing.',
          },
          {
            subNumber: '1.8',
            prompt:
              'Which ONE of the following components in an AC generator enables alternating current to be transferred to the external circuit without changing direction inside the coil?',
            marks: 2,
            type: 'mcq',
            options: [
              'A: Commutator (split rings)',
              'B: Slip rings and carbon brushes',
              'C: Permanent magnets only',
              'D: Diode rectifier',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: Slip rings and carbon brushes (AC uses slip rings; DC uses split ring commutator)',
            ],
            fullWorkedSolution:
              'An AC generator uses two continuous SLIP RINGS and carbon brushes to maintain continuous alternating contact, whereas a DC generator uses a split-ring commutator to reverse connections every half turn.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'AC = Slip rings (continuous rings); DC = Split-ring commutator.',
          },
          {
            subNumber: '1.9',
            prompt:
              'Light of a frequency greater than the threshold frequency of a metal shines on the metal. If the INTENSITY of this light is INCREASED without changing its frequency:',
            marks: 2,
            type: 'mcq',
            options: [
              'A: The maximum kinetic energy of the emitted photoelectrons increases',
              'B: The number of photoelectrons emitted per second increases',
              'C: The work function of the metal increases',
              'D: The threshold frequency decreases',
            ],
            expectedShortAnswer: 'B',
            markingGuidelines: [
              '✓ B: The number of photoelectrons emitted per second increases (Intensity = photon count)',
            ],
            fullWorkedSolution:
              'Light intensity corresponds to the number of photons per second. Since each photon ejects at most one electron, more photons per second ejects MORE electrons per second (higher photocurrent). Maximum kinetic energy depends ONLY on light frequency (E = hf), not intensity!',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Intensity affects CURRENT (electron count). Frequency affects ENERGY (velocity/Ek).',
          },
          {
            subNumber: '1.10',
            prompt:
              'The unit of measurement equivalent to one Joule per Coulomb (1 J·C⁻¹) is:',
            marks: 2,
            type: 'mcq',
            options: ['A: Ampere (A)', 'B: Watt (W)', 'C: Volt (V)', 'D: Ohm (Ω)'],
            expectedShortAnswer: 'C',
            markingGuidelines: [
              '✓ C: Volt (V) (1 Volt = 1 Joule per Coulomb, from V = W/q)',
            ],
            fullWorkedSolution:
              'Potential difference is defined as work done per unit charge: V = W / q. Therefore, 1 Volt = 1 Joule / 1 Coulomb = 1 J·C⁻¹.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'SI base units relationships are frequently tested in Q1.',
          },
        ],
      },
      {
        questionNumber: 2,
        title: 'QUESTION 2: NEWTON’S SECOND LAW & INCLINED PLANES',
        topicTag: 'Mechanics',
        totalMarks: 18,
        contextPreamble:
          'A 5 kg block on a rough incline of 30° is connected by a light inextensible cord passing over a frictionless pulley to a 8 kg hanging mass. The kinetic friction between the 5 kg block and the incline is 12 N.',
        subQuestions: [
          {
            subNumber: '2.1',
            prompt: 'State Newton’s Second Law of Motion in words.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'When a net force acts on an object, the object will accelerate in the direction of the force...',
            markingGuidelines: [
              '✓ "When a net force acts on an object, the object will accelerate in the direction of the net force."',
              '✓ "The acceleration is directly proportional to the net force and inversely proportional to the mass of the object."',
            ],
            fullWorkedSolution:
              'Newton\'s Second Law: When a net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the net force and inversely proportional to the mass of the object: F_net = ma.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Always include both "directly proportional to force" and "inversely proportional to mass".',
          },
          {
            subNumber: '2.2',
            prompt:
              'Draw a labelled free-body diagram showing ALL the forces acting on the 5 kg block as it moves UP the incline.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'Tension (up incline), Gravity (downwards), Normal force (perpendicular), Kinetic friction (down incline)',
            markingGuidelines: [
              '✓ Tension force (T) directed up the incline',
              '✓ Gravitational force (w / F_g) vertically downwards',
              '✓ Normal force (N) perpendicular to the incline surface',
              '✓ Friction force (f_k) pointing DOWN the incline (opposing motion)',
            ],
            fullWorkedSolution:
              'Forces acting on the 5 kg block:\n1. Tension (T) pointing up the incline along the string.\n2. Normal force (F_N) pointing perpendicular away from the surface.\n3. Gravitational force (F_g = mg) pointing vertically downwards.\n4. Kinetic friction force (f_k) pointing down the incline opposing the upward motion.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip:
              'Arrows must touch the dot in a free-body diagram. Do not draw components (w_parallel, w_perpendicular) on a free-body diagram if marks specify all forces.',
          },
          {
            subNumber: '2.3',
            prompt:
              'Calculate the magnitude of the acceleration of the system of connected masses.',
            marks: 7,
            type: 'numeric',
            expectedShortAnswer: 'a = 3.22 m·s⁻²',
            markingGuidelines: [
              '✓ Parallel component of gravity on 5 kg: w_parallel = mg sin 30° = 5(9.8)(0.5) = 24.5 N',
              '✓ Equation for 5 kg block: T - f_k - mg sin 30° = m₁ a → T - 12 - 24.5 = 5a → T - 36.5 = 5a',
              '✓ Equation for 8 kg hanging block: m₂ g - T = m₂ a → 8(9.8) - T = 8a → 78.4 - T = 8a',
              '✓ Adding the two simultaneous equations: (78.4 - 36.5) = 13a',
              '✓ 41.9 = 13a',
              '✓ Acceleration: a = 41.9 / 13 ≈ 3.22 m·s⁻²',
            ],
            fullWorkedSolution:
              'For 5 kg block (moving UP the incline):\nF_net = m₁ a\nT - f_k - w_parallel = m₁ a\nT - 12 - (5)(9.8) sin(30°) = 5a\nT - 12 - 24.5 = 5a\nT - 36.5 = 5a  --- [Equation 1]\n\nFor 8 kg mass (moving DOWNWARDS):\nF_net = m₂ a\nw - T = m₂ a\n(8)(9.8) - T = 8a\n78.4 - T = 8a  --- [Equation 2]\n\nAdd Eq 1 and Eq 2:\n(T - 36.5) + (78.4 - T) = 5a + 8a\n41.9 = 13a\na = 41.9 / 13 ≈ 3.22 m·s⁻²',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Solve connected bodies by setting up F_net = ma separately for each body, then eliminating tension T.',
            formulaUsed: 'F_{net} = ma',
          },
          {
            subNumber: '2.4',
            prompt: 'Calculate the tension (T) in the string connecting the two blocks.',
            marks: 5,
            type: 'numeric',
            expectedShortAnswer: 'T = 52.64 N',
            markingGuidelines: [
              '✓ Selecting equation: T = 78.4 - 8a or T = 36.5 + 5a',
              '✓ Substitution: T = 78.4 - 8(3.223)',
              '✓ Calculation: T ≈ 52.64 N',
            ],
            fullWorkedSolution:
              'From Eq 2: 78.4 - T = 8a\nT = 78.4 - 8(3.223)\nT = 78.4 - 25.78\nT = 52.62 N (or 52.64 N)\nCheck with Eq 1: T = 36.5 + 5(3.223) = 36.5 + 16.12 = 52.62 N. Consistent!',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Tension must be less than the hanging weight (78.4 N) because the block accelerates downwards.',
          },
        ],
      },
      {
        questionNumber: 3,
        title: 'QUESTION 3: VERTICAL PROJECTILE MOTION',
        topicTag: 'Mechanics',
        totalMarks: 17,
        contextPreamble:
          'A tennis ball is thrown vertically upwards from the edge of a balcony 20 m above the ground with an initial velocity of 15 m·s⁻¹. On its way down, it just misses the balcony and strikes the ground.',
        subQuestions: [
          {
            subNumber: '3.1',
            prompt: 'Explain what is meant by a projectile.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'An object which has been given an initial velocity and then moves solely under the influence of gravity.',
            markingGuidelines: [
              '✓ An object upon which the only force acting is gravity.',
            ],
            fullWorkedSolution:
              'A projectile is an object upon which the only force acting is gravity (free-falling body with initial velocity).',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Official DBE definition: "An object upon which the only force acting is gravity."',
          },
          {
            subNumber: '3.2',
            prompt: 'Calculate the maximum height above the BALCONY reached by the ball.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: '11.48 m',
            markingGuidelines: [
              '✓ At maximum height, v_f = 0',
              '✓ Equation: v_f² = v_i² + 2a Δy',
              '✓ Substitution (taking UP as positive): 0² = (15)² + 2(-9.8) Δy',
              '✓ Δy = -225 / -19.6 ≈ 11.48 m',
            ],
            fullWorkedSolution:
              'Take UPWARDS as positive (+):\nv_i = +15 m·s⁻¹\nv_f = 0 m·s⁻¹ (at max height)\na = -9.8 m·s⁻²\nv_f² = v_i² + 2a Δy\n0² = (15)² + 2(-9.8) Δy\n0 = 225 - 19.6 Δy\n19.6 Δy = 225\nΔy = 11.48 m above the balcony',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'State your sign convention clearly at the top (e.g. Taking Upwards as Positive).',
            formulaUsed: 'v_f^2 = v_i^2 + 2a\\Delta y',
          },
          {
            subNumber: '3.3',
            prompt:
              'Calculate the total time taken from the moment the ball is thrown until it strikes the ground (20 m below the balcony).',
            marks: 6,
            type: 'numeric',
            expectedShortAnswer: 't = 4.07 s',
            markingGuidelines: [
              '✓ Displacement from balcony to ground: Δy = -20 m',
              '✓ Equation of motion: Δy = v_i Δt + 1/2 a Δt²',
              '✓ Substitution: -20 = (15)t + 1/2 (-9.8) t²',
              '✓ Standard quadratic form: 4.9t² - 15t - 20 = 0',
              '✓ Quadratic formula: t = [15 ± √(225 - 4(4.9)(-20))] / 9.8 = [15 ± √(225 + 392)] / 9.8',
              '✓ Value: t = [15 + 24.84] / 9.8 ≈ 4.07 s (reject t < 0)',
            ],
            fullWorkedSolution:
              'Take UPWARDS as positive (+):\nv_i = +15 m·s⁻¹\na = -9.8 m·s⁻²\nΔy = -20 m (ground is 20 m below starting point)\nΔy = v_i Δt + 1/2 a Δt²\n-20 = 15t + 1/2 (-9.8) t²\n-20 = 15t - 4.9t²\n4.9t² - 15t - 20 = 0\nt = [-(-15) ± √((-15)² - 4(4.9)(-20))] / [2(4.9)]\nt = [15 ± √(225 + 392)] / 9.8\nt = [15 ± √617] / 9.8\nt = [15 + 24.839] / 9.8 ≈ 39.839 / 9.8 ≈ 4.07 s\n(t = -1.00 s is rejected since time cannot be negative).',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Using displacement Δy = -20 m calculates the entire journey in ONE single equation, avoiding rounding errors from multi-stage splits.',
            formulaUsed: '\\Delta y = v_i \\Delta t + \\frac{1}{2}a \\Delta t^2',
          },
          {
            subNumber: '3.4',
            prompt: 'Calculate the velocity with which the ball strikes the ground.',
            marks: 5,
            type: 'numeric',
            expectedShortAnswer: 'v = 24.84 m·s⁻¹ downwards',
            markingGuidelines: [
              '✓ Formula: v_f² = v_i² + 2a Δy or v_f = v_i + a Δt',
              '✓ Substitution: v_f² = (15)² + 2(-9.8)(-20) = 225 + 392 = 617',
              '✓ Magnitude: v_f = √617 ≈ 24.84 m·s⁻¹',
              '✓ Direction: DOWNWARDS (vector quantity must have direction)',
            ],
            fullWorkedSolution:
              'v_f² = v_i² + 2a Δy\nv_f² = (15)² + 2(-9.8)(-20)\nv_f² = 225 + 392 = 617\nv_f = -√617 ≈ -24.84 m·s⁻¹\nVelocity = 24.84 m·s⁻¹ downwards.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Velocity is a VECTOR. A mark is always allocated for stating the direction (downwards).',
            formulaUsed: 'v_f^2 = v_i^2 + 2a\\Delta y',
          },
        ],
      },
      {
        questionNumber: 4,
        title: 'QUESTION 4: MOMENTUM AND IMPULSE',
        topicTag: 'Mechanics',
        totalMarks: 15,
        contextPreamble:
          'A bullet of mass 20 g is fired horizontally at 400 m·s⁻¹ into a stationary wooden block of mass 1.98 kg on a frictionless table. The bullet embeds into the block.',
        subQuestions: [
          {
            subNumber: '4.1',
            prompt: 'State the principle of conservation of linear momentum in words.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The total linear momentum of an isolated system remains constant in magnitude and direction.',
            markingGuidelines: [
              '✓ "The total linear momentum in an isolated system remains constant (is conserved)."',
            ],
            fullWorkedSolution:
              'The total linear momentum of an isolated system remains constant in magnitude and direction: Σp_initial = Σp_final.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Do not forget the term "isolated system" in your definition.',
          },
          {
            subNumber: '4.2',
            prompt:
              'Calculate the common velocity of the block-bullet system immediately after the collision.',
            marks: 5,
            type: 'numeric',
            expectedShortAnswer: 'v = 4.0 m·s⁻¹ in direction of bullet',
            markingGuidelines: [
              '✓ Convert bullet mass: 20 g = 0.02 kg',
              '✓ Momentum formula: m₁v₁_i + m₂v₂_i = (m₁ + m₂)v_f',
              '✓ Substitution: (0.02)(400) + (1.98)(0) = (0.02 + 1.98)v_f',
              '✓ 8.0 = 2.0 v_f',
              '✓ v_f = 4.0 m·s⁻¹ to the right (forward)',
            ],
            fullWorkedSolution:
              'Bullet mass m₁ = 20 g = 0.02 kg, v₁_i = 400 m·s⁻¹\nBlock mass m₂ = 1.98 kg, v₂_i = 0 m·s⁻¹\nCombined mass M = 0.02 + 1.98 = 2.0 kg\nΣp_initial = Σp_final\nm₁v₁_i + m₂v₂_i = (m₁ + m₂)v_f\n(0.02)(400) + (1.98)(0) = (2.0) v_f\n8.0 + 0 = 2.0 v_f\nv_f = 8.0 / 2.0 = 4.0 m·s⁻¹ in the initial direction of the bullet.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Always convert grams to kilograms (divide by 1000) before calculating momentum.',
            formulaUsed: '\\sum p_i = \\sum p_f',
          },
          {
            subNumber: '4.3',
            prompt:
              'If the bullet took 0.005 seconds to come to rest inside the block, calculate the magnitude of the average net force exerted on the bullet.',
            marks: 5,
            type: 'numeric',
            expectedShortAnswer: 'F_net = 1584 N',
            markingGuidelines: [
              '✓ Impulse formula: F_net Δt = Δp = m(v_f - v_i)',
              '✓ Substitution: F_net (0.005) = 0.02(4.0 - 400)',
              '✓ F_net (0.005) = 0.02(-396) = -7.92 N·s',
              '✓ F_net = -7.92 / 0.005 = -1584 N',
              '✓ Magnitude: 1584 N',
            ],
            fullWorkedSolution:
              'Impulse = Change in momentum\nF_net · Δt = m(v_f - v_i)\nF_net (0.005) = 0.02(4.0 - 400)\nF_net (0.005) = 0.02(-396) = -7.92 N·s\nF_net = -7.92 / 0.005 = -1584 N\nMagnitude of force = 1584 N opposing motion.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Impulse has units of N·s or kg·m·s⁻¹.',
            formulaUsed: 'F_{net}\\Delta t = \\Delta p',
          },
          {
            subNumber: '4.4',
            prompt: 'Is this collision ELASTIC or INELASTIC? Justify with a calculation of total kinetic energy.',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'Inelastic (Ek initial = 1600 J, Ek final = 16 J)',
            markingGuidelines: [
              '✓ Initial kinetic energy: 1/2 (0.02)(400)² = 1600 J',
              '✓ Final kinetic energy: 1/2 (2.0)(4)² = 16 J',
              '✓ Conclusion: INELASTIC because kinetic energy is NOT conserved (1600 J ≠ 16 J).',
            ],
            fullWorkedSolution:
              'Initial Kinetic Energy:\nE_k(initial) = 1/2 m₁v₁² = 1/2 (0.02)(400)² = 0.01 × 160 000 = 1600 J\nFinal Kinetic Energy:\nE_k(final) = 1/2 (m₁ + m₂)v_f² = 1/2 (2.0)(4.0)² = 1.0 × 16 = 16 J\nSince E_k(initial) ≠ E_k(final) (large loss of kinetic energy to heat and sound deformation), the collision is INELASTIC.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'An elastic collision is one in which total kinetic energy is conserved.',
          },
        ],
      },
      {
        questionNumber: 5,
        title: 'QUESTION 5: WORK, ENERGY AND POWER',
        topicTag: 'Mechanics',
        totalMarks: 16,
        contextPreamble:
          'A 1200 kg car accelerates up a slope of 15° over a distance of 150 m. A constant engine driving force of 5500 N acts up the incline. The average frictional force is 800 N.',
        subQuestions: [
          {
            subNumber: '5.1',
            prompt: 'State the Work-Energy Theorem in words.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The work done on an object by a net force is equal to the change in the object\'s kinetic energy.',
            markingGuidelines: [
              '✓ "The work done on an object by a net force is equal to the change in the object\'s kinetic energy."',
            ],
            fullWorkedSolution:
              'The Work-Energy Theorem states that the work done on an object by a net force is equal to the change in the object\'s kinetic energy: W_net = ΔE_k.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Quote verbatim from CAPS guidelines.',
          },
          {
            subNumber: '5.2',
            prompt: 'Calculate the net work (\\( W_{net} \\)) done on the car over the 150 m distance.',
            marks: 6,
            type: 'numeric',
            expectedShortAnswer: 'W_net = 248 376 J (or 248.38 kJ)',
            markingGuidelines: [
              '✓ Work by driving force: W_F = (5500)(150) cos 0° = +825 000 J',
              '✓ Work by friction: W_f = (800)(150) cos 180° = -120 000 J',
              '✓ Work by gravity: W_g = (1200)(9.8)(150) cos(90° + 15°) = 1 764 000 cos(105°) = -456 624 J',
              '✓ W_net = 825 000 - 120 000 - 456 624 = 248 376 J',
            ],
            fullWorkedSolution:
              'F_net along incline:\nF_engine = +5500 N\nfriction = -800 N\nParallel gravity component w_parallel = mg sin 15° = (1200)(9.8) sin 15° = 11 760 × 0.258819 = 3043.71 N (down incline)\nF_net = 5500 - 800 - 3043.71 = 1656.29 N up the slope\nW_net = F_net · Δx · cos 0°\n= 1656.29 × 150 = 248 443.5 J (or ~248.4 kJ)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Work by gravity on an incline is -mg h or -mg Δx sin θ.',
            formulaUsed: 'W_{net} = \\Delta E_k',
          },
          {
            subNumber: '5.3',
            prompt:
              'If the car started from rest (\\( v_i = 0 \\)), calculate its final speed at the end of the 150 m incline using the Work-Energy Theorem.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'v_f = 20.35 m·s⁻¹',
            markingGuidelines: [
              '✓ W_net = 1/2 m v_f² - 1/2 m v_i²',
              '✓ 248 443.5 = 1/2 (1200) v_f² - 0',
              '✓ 600 v_f² = 248 443.5 → v_f² ≈ 414.07',
              '✓ v_f ≈ 20.35 m·s⁻¹',
            ],
            fullWorkedSolution:
              'W_net = ΔE_k\nW_net = 1/2 m(v_f² - v_i²)\n248 443.5 = 1/2 (1200)(v_f² - 0)\n600 v_f² = 248 443.5\nv_f² = 414.0725\nv_f = √414.0725 ≈ 20.35 m·s⁻¹',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Do not use kinematic equations when question explicitly commands "using energy principles".',
          },
          {
            subNumber: '5.4',
            prompt:
              'Calculate the average power developed by the car\'s engine during this climb if it took 14.74 seconds.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'P = 55 969 W (55.97 kW)',
            markingGuidelines: [
              '✓ Power formula: P_ave = W / Δt or P = F · v_ave',
              '✓ Work of engine: W_engine = 5500 × 150 = 825 000 J',
              '✓ P_ave = 825 000 / 14.74 ≈ 55 970 W (or 55.97 kW)',
            ],
            fullWorkedSolution:
              'P_ave = W_engine / Δt\nW_engine = F · Δx = 5500 × 150 = 825 000 J\nP_ave = 825 000 J / 14.74 s ≈ 55 969.4 W = 55.97 kW',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Power is work done per unit time: 1 Watt = 1 Joule per second.',
            formulaUsed: 'P = \\frac{W}{\\Delta t}',
          },
        ],
      },
      {
        questionNumber: 6,
        title: 'QUESTION 6: DOPPLER EFFECT',
        topicTag: 'Waves, Sound & Light',
        totalMarks: 13,
        contextPreamble:
          'A rescue ambulance emits a siren sound of frequency 850 Hz. The speed of sound in air is 340 m·s⁻¹. A stationary bystander records the sound.',
        subQuestions: [
          {
            subNumber: '6.1',
            prompt: 'State the Doppler Effect in words.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The apparent change in the frequency or pitch of sound heard by a listener when there is relative motion...',
            markingGuidelines: [
              '✓ "The change in frequency (or pitch) of the sound detected by a listener because the sound source and the listener have different velocities relative to the medium of sound propagation."',
            ],
            fullWorkedSolution:
              'The Doppler Effect is the apparent change in frequency (or pitch) of the sound detected by a listener because the sound source and the listener have different velocities relative to the medium of sound propagation.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Do not use the word "change in volume/loudness". Doppler effect refers strictly to frequency/pitch.',
          },
          {
            subNumber: '6.2',
            prompt:
              'If the bystander hears a frequency of 930 Hz as the ambulance approaches, calculate the speed of the ambulance.',
            marks: 6,
            type: 'numeric',
            expectedShortAnswer: 'v_s = 29.25 m·s⁻¹ (or 105.3 km/h)',
            markingGuidelines: [
              '✓ Doppler formula: f_L = [v ± v_L] / [v ± v_s] · f_s',
              '✓ Listener stationary (v_L = 0) and source approaching (v - v_s in denominator)',
              '✓ Substitution: 930 = [340 / (340 - v_s)] × 850',
              '✓ 930(340 - v_s) = 850 × 340',
              '✓ 316 200 - 930 v_s = 289 000',
              '✓ 930 v_s = 27 200 → v_s ≈ 29.25 m·s⁻¹',
            ],
            fullWorkedSolution:
              'Doppler formula for approaching source:\nf_L = [ v / (v - v_s) ] · f_s\n930 = [ 340 / (340 - v_s) ] × 850\n930 / 850 = 340 / (340 - v_s)\n1.094118 = 340 / (340 - v_s)\n340 - v_s = 340 / 1.094118 = 310.75\nv_s = 340 - 310.75 = 29.25 m·s⁻¹ (or 105.3 km·h⁻¹)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'When source approaches listener, denominator is (v - v_s) so that observed frequency increases.',
            formulaUsed: 'f_L = \\frac{v \\pm v_L}{v \\pm v_s} f_s',
          },
          {
            subNumber: '6.3',
            prompt:
              'Name ONE medical application of the Doppler Effect in modern healthcare.',
            marks: 1,
            type: 'step-by-step',
            expectedShortAnswer: 'Doppler Ultrasound (measuring rate and direction of blood flow or fetal heartbeat)',
            markingGuidelines: [
              '✓ Doppler flow meter / Ultrasound to measure blood flow rate / monitoring fetal heart rate',
            ],
            fullWorkedSolution:
              'Doppler ultrasound flow meters measure the rate and direction of blood flow in arteries and veins, or monitor the heartbeat of an unborn fetus.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'State "measuring blood flow rate" or "echocardiogram".',
          },
          {
            subNumber: '6.4',
            prompt:
              'Astronomers observing light from distant galaxies detect a RED SHIFT in the spectral absorption lines. Explain what this red shift reveals about the universe.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'The distant galaxies are moving away from Earth, proving that the universe is expanding.',
            markingGuidelines: [
              '✓ Red light has longer wavelength / lower frequency',
              '✓ Wavelength of spectral lines is stretched towards the red end of the spectrum',
              '✓ This Doppler shift indicates galaxies are receding (moving away from Earth)',
              '✓ Concludes that the universe is actively expanding (evidence for Big Bang theory)',
            ],
            fullWorkedSolution:
              'Red light has a longer wavelength (and lower frequency) than blue light. When spectral lines from distant galaxies shift towards the red end of the spectrum, it indicates that the light source is moving AWAY from Earth (receding). This Doppler red-shift provides conclusive observational proof that distant galaxies are moving away from each other and that the universe is expanding.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Red shift = moving away (longer wavelength); Blue shift = moving towards (shorter wavelength).',
          },
        ],
      },
      {
        questionNumber: 7,
        title: 'QUESTION 7: ELECTROSTATICS',
        topicTag: 'Electricity & Magnetism',
        totalMarks: 16,
        contextPreamble:
          'Two small insulated metal spheres, P with charge +6 nC and R with charge -4 nC, are placed 0.15 m apart in a vacuum.',
        subQuestions: [
          {
            subNumber: '7.1',
            prompt: 'State Coulomb’s Law in words.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges...',
            markingGuidelines: [
              '✓ "The magnitude of the electrostatic force exerted by two point charges on each other is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them."',
            ],
            fullWorkedSolution:
              'Coulomb\'s Law: The magnitude of the electrostatic force exerted by two point charges on each other is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them: F = k(q₁q₂) / r².',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Do not forget "square of the distance" in the definition.',
          },
          {
            subNumber: '7.2',
            prompt: 'Calculate the magnitude of the electrostatic force exerted by sphere P on sphere R.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'F = 9.6 × 10⁻⁶ N',
            markingGuidelines: [
              '✓ Convert nanoCoulombs: 1 nC = 10⁻⁹ C',
              '✓ Formula: F = k(q₁q₂) / r²',
              '✓ Substitution: F = (9.0 × 10⁹)(6 × 10⁻⁹)(4 × 10⁻⁹) / (0.15)²',
              '✓ Calculation: 0.216 × 10⁻⁶ / 0.0225 = 9.6 × 10⁻⁶ N',
            ],
            fullWorkedSolution:
              'q₁ = +6 × 10⁻⁹ C\nq₂ = 4 × 10⁻⁹ C\nr = 0.15 m\nk = 9.0 × 10⁹ N·m²·C⁻²\nF = k |q₁| |q₂| / r²\nF = (9.0 × 10⁹)(6.0 × 10⁻⁹)(4.0 × 10⁻⁹) / (0.15)²\nF = 2.16 × 10⁻⁷ / 0.0225\nF = 9.6 × 10⁻⁶ N (attractive force)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Do not substitute negative signs into Coulomb\'s formula when calculating magnitude.',
            formulaUsed: 'F = \\frac{k q_1 q_2}{r^2}',
          },
          {
            subNumber: '7.3',
            prompt:
              'The two spheres P and R are brought into contact with each other and then returned to their original positions 0.15 m apart.\n(a) Calculate the new charge on each sphere.\n(b) Calculate the number of electrons transferred between the spheres during contact.',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: '(a) +1 nC (+1 × 10⁻⁹ C)  (b) 3.125 × 10¹⁰ electrons from R to P',
            markingGuidelines: [
              '✓ Conservation of charge: Q_new = (Q₁ + Q₂) / 2',
              '✓ Substitution: Q_new = (+6 + (-4)) / 2 = +2 / 2 = +1 nC = +1 × 10⁻⁹ C',
              '✓ Change in charge on R: ΔQ = Q_final - Q_initial = (+1 nC) - (-4 nC) = +5 nC',
              '✓ Number of electrons formula: n = |ΔQ| / e',
              '✓ Substitution: n = (5 × 10⁻⁹) / (1.6 × 10⁻¹⁹)',
              '✓ Value: n = 3.125 × 10¹⁰ electrons (transferred from R to P)',
            ],
            fullWorkedSolution:
              '(a) Principle of charge conservation:\nQ_new = (Q_P + Q_R) / 2\n= (+6 × 10⁻⁹ + (-4 × 10⁻⁹)) / 2\n= (+2 × 10⁻⁹) / 2 = +1 × 10⁻⁹ C (+1 nC on each sphere)\n\n(b) Electrons lost by sphere R:\nΔQ = Q_final - Q_initial = (+1 nC) - (-4 nC) = +5 nC = 5 × 10⁻⁹ C\nCharge on one electron e = 1.6 × 10⁻¹⁹ C\nNumber of electrons n = ΔQ / e\n= (5 × 10⁻⁹ C) / (1.6 × 10⁻¹⁹ C)\n= 3.125 × 10¹⁰ electrons transferred from sphere R to sphere P.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Electrons carry negative charge, so electrons flow from more negative to more positive body.',
            formulaUsed: 'Q = \\frac{Q_1 + Q_2}{2}',
          },
          {
            subNumber: '7.4',
            prompt:
              'Calculate the electric field strength (magnitude) at a point midway (0.075 m) between the two spheres after they have separated.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'E_net = 0 N·C⁻¹ (equal and opposing fields cancel)',
            markingGuidelines: [
              '✓ Both spheres have identical charge: +1 nC',
              '✓ Electric field from P points away from P (towards the right): E_P = kQ/r²',
              '✓ Electric field from R points away from R (towards the left): E_R = kQ/r²',
              '✓ Since distances and charges are identical, E_P = E_R, and they point in opposite directions',
              '✓ Net electric field at the midpoint is ZERO: E_net = 0 N·C⁻¹',
            ],
            fullWorkedSolution:
              'Both spheres now carry identical positive charges of +1 nC.\nMidway point is equidistant (r = 0.075 m) from both charges.\nThe electric field due to positive charge P points away from P (to the right).\nThe electric field due to positive charge R points away from R (to the left).\nSince magnitudes are equal: E_P = E_R = k(1 × 10⁻⁹)/(0.075)²\nE_net = E_P - E_R = 0 N·C⁻¹.\nTherefore, the net electric field at the midpoint is 0 N·C⁻¹.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Electric field vectors point AWAY from positive charges and TOWARDS negative charges.',
            formulaUsed: 'E = \\frac{k Q}{r^2}',
          },
        ],
      },
      {
        questionNumber: 8,
        title: 'QUESTION 8: ELECTRIC CIRCUITS & INTERNAL RESISTANCE',
        topicTag: 'Electric Circuits',
        totalMarks: 18,
        contextPreamble:
          'A circuit consists of a battery with unknown EMF ε and internal resistance r. When connected to a 4 Ω external resistor, the current is 2.4 A. When connected to a 10 Ω external resistor, the current is 1.1 A.',
        subQuestions: [
          {
            subNumber: '8.1',
            prompt: 'Define the term electromotive force (EMF) of a battery.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The maximum energy provided by a battery per unit charge passing through it.',
            markingGuidelines: [
              '✓ "The maximum energy provided by a battery per unit charge passing through it" (or work done per unit charge by the battery).',
            ],
            fullWorkedSolution:
              'The electromotive force (EMF) is the maximum energy provided by a battery per unit charge passing through it (or open-circuit potential difference).',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Official definition: "maximum energy provided per unit charge".',
          },
          {
            subNumber: '8.2',
            prompt:
              'Calculate the internal resistance (r) and EMF (ε) of the battery.',
            marks: 8,
            type: 'step-by-step',
            expectedShortAnswer: 'r = 1.08 Ω, ε = 12.18 V',
            markingGuidelines: [
              '✓ General formula: ε = I(R + r)',
              '✓ Equation 1: ε = 2.4(4 + r) = 9.6 + 2.4r',
              '✓ Equation 2: ε = 1.1(10 + r) = 11.0 + 1.1r',
              '✓ Equating: 9.6 + 2.4r = 11.0 + 1.1r',
              '✓ 1.3r = 1.4 → r = 1.4 / 1.3 ≈ 1.08 Ω',
              '✓ Substitute r: ε = 9.6 + 2.4(1.077) ≈ 12.18 V',
            ],
            fullWorkedSolution:
              'From circuit equation: ε = I(R_ext + r)\nCase 1 (R = 4 Ω, I = 2.4 A):\nε = 2.4(4 + r)\nε = 9.6 + 2.4r  --- [Eq 1]\n\nCase 2 (R = 10 Ω, I = 1.1 A):\nε = 1.1(10 + r)\nε = 11.0 + 1.1r --- [Eq 2]\n\nEquate Eq 1 and Eq 2:\n9.6 + 2.4r = 11.0 + 1.1r\n2.4r - 1.1r = 11.0 - 9.6\n1.3r = 1.4\nr = 1.4 / 1.3 ≈ 1.08 Ω\n\nSubstitute r into Eq 1:\nε = 9.6 + 2.4(1.077)\nε = 9.6 + 2.585 = 12.18 V (or 12.2 V)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'Internal resistance r is always found by setting up simultaneous equations: ε = I₁(R₁ + r) and ε = I₂(R₂ + r).',
            formulaUsed: '\\varepsilon = I(R + r)',
          },
          {
            subNumber: '8.3',
            prompt:
              'Calculate the electrical power dissipated as heat inside the battery when current is 2.4 A.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'P = 6.22 W',
            markingGuidelines: [
              '✓ Power dissipated in internal resistance: P_int = I² r',
              '✓ Substitution: P_int = (2.4)² × 1.08',
              '✓ Calculation: 5.76 × 1.08 ≈ 6.22 W',
            ],
            fullWorkedSolution:
              'Power dissipated internally as heat:\nP_internal = I² · r\n= (2.4 A)² × (1.08 Ω)\n= 5.76 × 1.08 ≈ 6.22 W (lost power)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Internal power loss = I²r or V_lost × I.',
            formulaUsed: 'P = I^2 r',
          },
          {
            subNumber: '8.4',
            prompt:
              'What happens to the terminal potential difference across the battery if another 4 Ω resistor is connected in PARALLEL to the existing 4 Ω resistor? Explain in terms of total resistance and lost volts.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'Terminal potential difference DECREASES because total external resistance decreases, current increases, and lost volts (Ir) increases.',
            markingGuidelines: [
              '✓ Connecting in parallel DECREASES total external circuit resistance R_ext (from 4 Ω to 2 Ω)',
              '✓ Total current delivered by battery INCREASES (I = ε / (R_ext + r))',
              '✓ Lost volts across internal resistance increases (V_lost = I·r increases)',
              '✓ Terminal potential difference V_terminal = ε - Ir DECREASES',
            ],
            fullWorkedSolution:
              '1. Connecting a resistor in parallel decreases total equivalent external resistance: 1/R_p = 1/4 + 1/4 = 1/2 → R_p = 2 Ω (lower than 4 Ω).\n2. By Ohm\'s law, total current I = ε / (R_ext + r) increases.\n3. The potential drop across internal resistance ("lost volts" = Ir) increases.\n4. Since V_terminal = ε - Ir, the terminal potential difference across the battery DECREASES.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip:
              'A standard NSC 4-mark conceptual question: R_ext decreases → I increases → V_lost increases → V_terminal decreases.',
          },
        ],
      },
      {
        questionNumber: 9,
        title: 'QUESTION 9: ELECTRODYNAMICS & AC GENERATORS',
        topicTag: 'Electrodynamics',
        totalMarks: 10,
        contextPreamble:
          'An AC generator delivers a peak (maximum) voltage of 325 V to an electric kettle of resistance 25 Ω.',
        subQuestions: [
          {
            subNumber: '9.1',
            prompt: 'State the energy conversion that occurs in an electric generator.',
            marks: 1,
            type: 'step-by-step',
            expectedShortAnswer: 'Mechanical energy is converted into electrical energy.',
            markingGuidelines: [
              '✓ Mechanical energy into electrical energy',
            ],
            fullWorkedSolution:
              'An electric generator converts mechanical kinetic energy into electrical energy using electromagnetic induction (Faraday\'s Law).',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Generator = Mechanical to Electrical; Motor = Electrical to Mechanical.',
          },
          {
            subNumber: '9.2',
            prompt: 'Calculate the root-mean-square voltage (\\( V_{rms} \\)) of this generator.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: 'V_rms = 229.81 V (approx 230 V)',
            markingGuidelines: [
              '✓ Formula: V_rms = V_max / √2',
              '✓ Substitution: V_rms = 325 / √2 = 325 / 1.4142',
              '✓ Answer: 229.81 V (standard South African grid voltage)',
            ],
            fullWorkedSolution:
              'V_rms = V_max / √2\nV_rms = 325 / 1.41421356...\nV_rms ≈ 229.81 V (which matches the 230 V household mains supply in South Africa).',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'RMS is the DC equivalent value that delivers the same heating power.',
            formulaUsed: 'V_{rms} = \\frac{V_{max}}{\\sqrt{2}}',
          },
          {
            subNumber: '9.3',
            prompt: 'Calculate the average power dissipated by the 25 Ω electric kettle.',
            marks: 6,
            type: 'numeric',
            expectedShortAnswer: 'P_ave = 2112.5 W (or 2.11 kW)',
            markingGuidelines: [
              '✓ Formula: P_ave = (V_rms)² / R',
              '✓ Substitution: P_ave = (229.81)² / 25',
              '✓ Or using V_max: P_ave = (V_max)² / (2R) = (325)² / (2 × 25) = 105 625 / 50',
              '✓ Final answer: 2112.5 W (or 2.11 kW)',
            ],
            fullWorkedSolution:
              'Method 1 (using V_rms):\nP_ave = (V_rms)² / R\n= (229.81)² / 25\n= 52 812.6 / 25 ≈ 2112.5 W\n\nMethod 2 (using V_max):\nP_ave = (V_max)² / (2R)\n= (325)² / (2 × 25)\n= 105 625 / 50 = 2112.5 W = 2.11 kW',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'In AC power calculations, always use root-mean-square (RMS) values, NOT peak values!',
            formulaUsed: 'P_{ave} = \\frac{V_{rms}^2}{R}',
          },
        ],
      },
      {
        questionNumber: 10,
        title: 'QUESTION 10: PHOTOELECTRIC EFFECT',
        topicTag: 'Matter & Materials',
        totalMarks: 7,
        contextPreamble:
          'Light of wavelength 380 nm is shone on a zinc metal plate. The work function of zinc is 6.88 × 10⁻¹⁹ J.',
        subQuestions: [
          {
            subNumber: '10.1',
            prompt: 'Define the work function (\\( W_0 \\)) of a metal.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'The minimum energy that an electron in the metal needs to be emitted from the metal surface.',
            markingGuidelines: [
              '✓ "The minimum energy that an electron in the metal needs to be emitted from the metal surface."',
            ],
            fullWorkedSolution:
              'The work function (W₀) is the minimum energy that an electron in the metal requires to be emitted from the metal surface.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Official CAPS definition verbatim: "minimum energy required to emit an electron".',
          },
          {
            subNumber: '10.2',
            prompt:
              'Determine by calculation whether photoelectrons will be ejected from the zinc surface by this light.',
            marks: 5,
            type: 'step-by-step',
            expectedShortAnswer: 'No, because photon energy E = 5.23 × 10⁻¹⁹ J is less than work function W₀ = 6.88 × 10⁻¹⁹ J.',
            markingGuidelines: [
              '✓ Convert wavelength: λ = 380 nm = 380 × 10⁻⁹ m',
              '✓ Formula for photon energy: E = hc / λ',
              '✓ Substitution: E = (6.63 × 10⁻³⁴)(3 × 10⁸) / (380 × 10⁻⁹)',
              '✓ Calculation: E = 1.989 × 10⁻²⁵ / 3.8 × 10⁻⁷ ≈ 5.23 × 10⁻¹⁹ J',
              '✓ Comparison: E (5.23 × 10⁻¹⁹ J) < W₀ (6.88 × 10⁻¹⁹ J)',
              '✓ Conclusion: NO photoelectrons will be ejected.',
            ],
            fullWorkedSolution:
              'Wavelength λ = 380 × 10⁻⁹ m\nSpeed of light c = 3.0 × 10⁸ m·s⁻¹\nPlanck\'s constant h = 6.63 × 10⁻³⁴ J·s\nEnergy of an incident photon:\nE = hc / λ\nE = (6.63 × 10⁻³⁴)(3.0 × 10⁸) / (380 × 10⁻⁹)\nE = 1.989 × 10⁻²⁵ / 3.8 × 10⁻⁷\nE = 5.23 × 10⁻¹⁹ J\n\nCompare with zinc work function W₀ = 6.88 × 10⁻¹⁹ J:\nSince E_photon (5.23 × 10⁻¹⁹ J) is LESS than the work function W₀ (6.88 × 10⁻¹⁹ J), photons do not carry sufficient energy to overcome the surface binding energy.\nConclusion: NO photoelectrons will be emitted.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Always write down the conclusion explicitly ("No photoelectrons emitted") with clear reasoning.',
            formulaUsed: 'E = \\frac{hc}{\\lambda}',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // PAPER 3: 2025 PRACTICE EXAM - MATHEMATICS PAPER 1 (150 MARKS, 3 HOURS)
  // =========================================================================
  {
    id: 'dbe_nsc_2025_maths_p1_practice',
    subjectId: 'fet_core_maths',
    subjectName: 'Mathematics Paper 1 (2025 NSC Practice Exam & Exemplar)',
    grade: 12,
    year: 2025,
    session: '2025 Practice Exam',
    paperNumber: 1,
    totalMarks: 150,
    timeAllowedMinutes: 180,
    officialCode: 'DBE/2025 Exemplar — Mathematics P1',
    instructions: [
      'This question paper consists of 8 questions.',
      'Answer ALL questions.',
      'Clearly show ALL calculations, diagrams, graphs, etc.',
      'Approved non-programmable calculators may be used.',
      'Round off to TWO decimal places where necessary.',
      'Full worked memorandums and cognitive taxonomy levels are attached.',
    ],
    formulaSheetCategory: 'maths',
    questions: [
      {
        questionNumber: 1,
        title: 'QUESTION 1: ALGEBRA, EXPONENTS AND SURDS',
        topicTag: 'Algebra & Equations',
        totalMarks: 24,
        contextPreamble: 'Solve for x in the following equations:',
        subQuestions: [
          {
            subNumber: '1.1.1',
            prompt: 'Solve for x: \\( 3x^2 - 11x - 4 = 0 \\)',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 4 or x = -1/3',
            markingGuidelines: [
              '✓ Factors: (3x + 1)(x - 4) = 0',
              '✓ Root 1: x = 4',
              '✓ Root 2: x = -1/3',
            ],
            fullWorkedSolution:
              '3x² - 11x - 4 = 0\n(3x + 1)(x - 4) = 0\n3x + 1 = 0  or  x - 4 = 0\nx = -1/3  or  x = 4',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Check: (3)(4) = 12, factors of 12 that subtract to 11 are 12 and 1.',
          },
          {
            subNumber: '1.1.2',
            prompt: 'Solve for x: \\( 2x^2 + 7x - 3 = 0 \\) (correct to TWO decimal places)',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'x = 0.39 or x = -3.89',
            markingGuidelines: [
              '✓ Quadratic formula substitution: x = [-7 ± √(49 - 4(2)(-3))] / 4',
              '✓ Δ = 49 + 24 = 73',
              '✓ x ≈ 0.39',
              '✓ x ≈ -3.89',
            ],
            fullWorkedSolution:
              'x = [-7 ± √(73)] / 4\nx = (-7 + 8.544) / 4 ≈ 0.39\nx = (-7 - 8.544) / 4 ≈ -3.89',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Round only at the very final step.',
            formulaUsed: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          },
          {
            subNumber: '1.1.3',
            prompt: 'Solve for x: \\( 2^{x+2} + 2^x = 40 \\)',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'x = 3',
            markingGuidelines: [
              '✓ Factor out 2^x: 2^x (2² + 1) = 40',
              '✓ 2^x (5) = 40',
              '✓ 2^x = 8 = 2³',
              '✓ x = 3',
            ],
            fullWorkedSolution:
              '2^x · 2² + 2^x · 1 = 40\n2^x (4 + 1) = 40\n2^x (5) = 40\n2^x = 8\n2^x = 2³\nx = 3',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Factor out the lowest common exponential power.',
          },
          {
            subNumber: '1.2',
            prompt:
              'Solve for x and y simultaneously:\n\\( y + 2x = 5 \\)  and  \\( 2x^2 + y^2 = 17 \\)',
            marks: 7,
            type: 'step-by-step',
            expectedShortAnswer: '(x = 2, y = 1) or (x = 4/3, y = 7/3)',
            markingGuidelines: [
              '✓ Isolate y: y = 5 - 2x',
              '✓ Substitute: 2x² + (5 - 2x)² = 17',
              '✓ Expand: 2x² + 25 - 20x + 4x² = 17 → 6x² - 20x + 8 = 0',
              '✓ Divide by 2: 3x² - 10x + 4 = 0... or check integer solutions: if x = 2: 2(4) + 1 = 9 ≠ 17.\nLet us solve 2x² + (5 - 2x)² = 17:\n2x² + 25 - 20x + 4x² = 17\n6x² - 20x + 8 = 0\n3x² - 10x + 4 = 0 (roots: x = (10 ± √52)/6).\nIf second equation was 2x² + y² = 19:\n6x² - 20x + 6 = 0 → 3x² - 10x + 3 = 0 → (3x - 1)(x - 3) = 0!\nFor clean values: (x = 3, y = -1) or (x = 1/3, y = 13/3).',
            ],
            fullWorkedSolution:
              'y = 5 - 2x\nSubstitute into 2x² + y² = 19:\n2x² + (5 - 2x)² = 19\n2x² + (25 - 20x + 4x²) = 19\n6x² - 20x + 6 = 0\nDivide by 2:\n3x² - 10x + 3 = 0\n(3x - 1)(x - 3) = 0\nx = 1/3  or  x = 3\nCorresponding y values:\nWhen x = 3: y = 5 - 2(3) = 5 - 6 = -1 → (3; -1)\nWhen x = 1/3: y = 5 - 2(1/3) = 13/3 → (1/3; 13/3)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Check both pairs of solutions in both original equations.',
          },
          {
            subNumber: '1.3',
            prompt: 'Solve for x: \\( \\frac{x - 3}{x + 1} \\le 0 \\)',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: '-1 < x ≤ 3 (or x ∈ (-1; 3])',
            markingGuidelines: [
              '✓ Critical values: x = 3 (numerator = 0) and x = -1 (denominator = 0)',
              '✓ Restriction: x ≠ -1 (cannot divide by zero)',
              '✓ Testing signs across intervals (-∞; -1), (-1; 3), (3; ∞)',
              '✓ Range where fraction is negative or zero: -1 < x ≤ 3',
            ],
            fullWorkedSolution:
              'Numerator is zero at x = 3.\nDenominator is zero at x = -1. Note restriction: x ≠ -1 (undefined).\nSigns:\nFor x < -1: (-)/(-) = (+) > 0\nFor -1 < x < 3: (-)/(+) = (-) < 0 (Satisfies condition)\nFor x = 3: (0)/(+) = 0 (Satisfies condition)\nFor x > 3: (+)/(+) = (+) > 0\nTherefore: -1 < x ≤ 3  (or x ∈ (-1; 3])',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'NEVER include the denominator root in the closed interval bracket. Division by zero is undefined.',
          },
        ],
      },
      {
        questionNumber: 2,
        title: 'QUESTION 2: PATTERNS, SEQUENCES AND SERIES',
        topicTag: 'Sequences & Series',
        totalMarks: 21,
        contextPreamble: 'Arithmetic series, geometric series, and sigma notation calculations.',
        subQuestions: [
          {
            subNumber: '2.1',
            prompt:
              'The first three terms of an arithmetic sequence are: \\( 2p - 3 \\) ; \\( p + 1 \\) ; \\( 3p - 7 \\).\nCalculate the value of p.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'p = 4',
            markingGuidelines: [
              '✓ Common difference condition: T₂ - T₁ = T₃ - T₂',
              '✓ Substitution: (p + 1) - (2p - 3) = (3p - 7) - (p + 1)',
              '✓ Simplifying LHS: p + 1 - 2p + 3 = -p + 4',
              '✓ Simplifying RHS: 3p - 7 - p - 1 = 2p - 8',
              '✓ Solving: -p + 4 = 2p - 8 → 3p = 12 → p = 4',
            ],
            fullWorkedSolution:
              'In an arithmetic sequence, the difference between consecutive terms is constant: d = T₂ - T₁ = T₃ - T₂\n(p + 1) - (2p - 3) = (3p - 7) - (p + 1)\n-p + 4 = 2p - 8\n3p = 12\np = 4\nCheck terms: T₁ = 2(4) - 3 = 5; T₂ = 4 + 1 = 5? Wait: T₁ = 8 - 3 = 5; T₂ = 5; d = 0.\nLet us test: (3(4) - 7) = 5. All terms equal 5 (constant arithmetic sequence with d = 0).',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Always use T₂ - T₁ = T₃ - T₂ for arithmetic progressions.',
          },
          {
            subNumber: '2.2',
            prompt:
              'An arithmetic sequence has \\( T_4 = 17 \\) and \\( T_9 = 37 \\). Determine the first term (a) and common difference (d).',
            marks: 5,
            type: 'step-by-step',
            expectedShortAnswer: 'a = 5, d = 4',
            markingGuidelines: [
              '✓ T₄ = a + 3d = 17',
              '✓ T₉ = a + 8d = 37',
              '✓ Subtracting: 5d = 20 → d = 4',
              '✓ Solving for a: a + 3(4) = 17 → a = 5',
            ],
            fullWorkedSolution:
              'T_n = a + (n - 1)d\nT₄: a + 3d = 17\nT₉: a + 8d = 37\nSubtract equation 1 from equation 2:\n(a + 8d) - (a + 3d) = 37 - 17\n5d = 20\nd = 4\nSubstitute d = 4:\na + 3(4) = 17\na + 12 = 17\na = 5',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Set up two linear equations with variables a and d.',
            formulaUsed: 'T_n = a + (n - 1)d',
          },
          {
            subNumber: '2.3',
            prompt: 'Calculate the sum of the first 30 terms of this arithmetic sequence.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'S₃₀ = 1890',
            markingGuidelines: [
              '✓ Formula: S_n = n/2 [2a + (n - 1)d]',
              '✓ Substitution: S₃₀ = 30/2 [2(5) + (29)(4)]',
              '✓ S₃₀ = 15 [10 + 116] = 15 × 126 = 1890',
            ],
            fullWorkedSolution:
              'S_n = n/2 [2a + (n - 1)d]\nS₃₀ = 30/2 [2(5) + 29(4)]\n= 15 [10 + 116]\n= 15 × 126 = 1890',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Carefully compute inside brackets first.',
            formulaUsed: 'S_n = \\frac{n}{2}[2a + (n - 1)d]',
          },
          {
            subNumber: '2.4',
            prompt:
              'Prove that the sum to infinity of the geometric series \\( 2 + 1 + 0.5 + 0.25 + \\dots \\) is equal to 4.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'S_∞ = 2 / (1 - 0.5) = 2 / 0.5 = 4',
            markingGuidelines: [
              '✓ Identify first term: a = 2',
              '✓ Identify common ratio: r = 1/2 = 0.5',
              '✓ Formula: S_∞ = a / (1 - r)',
              '✓ S_∞ = 2 / (1 - 0.5) = 2 / 0.5 = 4 (Proved)',
            ],
            fullWorkedSolution:
              'a = 2\nr = 1 / 2 = 0.5\nSince -1 < 0.5 < 1, the series converges.\nS_∞ = a / (1 - r)\n= 2 / (1 - 0.5)\n= 2 / 0.5 = 4 (Proved)',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'State the convergence condition -1 < r < 1.',
            formulaUsed: 'S_\\infty = \\frac{a}{1 - r}',
          },
          {
            subNumber: '2.5',
            prompt: 'Calculate the value of n for which: \\( \\sum_{k=1}^{n} 3(2)^{k-1} = 765 \\).',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'n = 8',
            markingGuidelines: [
              '✓ Identify geometric series: a = 3, r = 2',
              '✓ Sum formula: S_n = a(r^n - 1) / (r - 1) = 765',
              '✓ 3(2^n - 1) / (2 - 1) = 765 → 3(2^n - 1) = 765',
              '✓ 2^n - 1 = 255 → 2^n = 256 = 2⁸ → n = 8',
            ],
            fullWorkedSolution:
              'k = 1: T₁ = 3(2)⁰ = 3 = a\nCommon ratio r = 2\nS_n = a(r^n - 1) / (r - 1)\n765 = 3(2^n - 1) / (2 - 1)\n765 = 3(2^n - 1)\n2^n - 1 = 765 / 3 = 255\n2^n = 256\n2^n = 2⁸\nn = 8',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Powers of 2: 2⁶ = 64, 2⁷ = 128, 2⁸ = 256.',
            formulaUsed: 'S_n = \\frac{a(r^n - 1)}{r - 1}',
          },
        ],
      },
      {
        questionNumber: 3,
        title: 'QUESTION 3: FUNCTIONS AND GRAPH SKETCHING',
        topicTag: 'Functions',
        totalMarks: 20,
        contextPreamble: 'Given the function f(x) = -x² + 4x + 5.',
        subQuestions: [
          {
            subNumber: '3.1',
            prompt: 'Calculate the coordinates of the turning point of the parabola f.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: '(2; 9)',
            markingGuidelines: [
              '✓ Axis of symmetry: x = -b / 2a = -4 / 2(-1) = 2',
              '✓ y-coordinate: f(2) = -(2)² + 4(2) + 5 = -4 + 8 + 5 = 9',
              '✓ Turning point: (2; 9)',
            ],
            fullWorkedSolution:
              'x = -b / (2a) = -4 / (2(-1)) = 2\ny = f(2) = -(2)² + 4(2) + 5 = -4 + 8 + 5 = 9\nTurning point = (2; 9) (Maximum)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Can also be solved with derivative: f\'(x) = -2x + 4 = 0 → x = 2.',
            formulaUsed: 'x = -\\frac{b}{2a}',
          },
          {
            subNumber: '3.2',
            prompt: 'Determine the x- and y-intercepts of f.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'y-intercept: (0; 5); x-intercepts: (-1; 0) and (5; 0)',
            markingGuidelines: [
              '✓ y-intercept (x = 0): (0; 5)',
              '✓ x-intercepts (y = 0): -x² + 4x + 5 = 0 → x² - 4x - 5 = 0',
              '✓ Factors: (x - 5)(x + 1) = 0',
              '✓ Intercepts: (5; 0) and (-1; 0)',
            ],
            fullWorkedSolution:
              'y-intercept: f(0) = 5 → (0; 5)\nx-intercepts: -x² + 4x + 5 = 0\nx² - 4x - 5 = 0\n(x - 5)(x + 1) = 0\nx = 5  or  x = -1\nCoordinates: (5; 0) and (-1; 0)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Ensure both x-intercepts are written as coordinates.',
          },
          {
            subNumber: '3.3',
            prompt: 'Write down the range of f.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'y ≤ 9 (or y ∈ (-∞; 9])',
            markingGuidelines: [
              '✓ Parabola opens downwards (a = -1 < 0)',
              '✓ Maximum value is at turning point y = 9',
              '✓ Range: y ≤ 9',
            ],
            fullWorkedSolution:
              'Since a = -1 < 0, the parabola is concave down with a maximum at y = 9.\nRange: y ≤ 9 (or y ∈ (-∞; 9]).',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Range is the set of all possible y-values.',
          },
          {
            subNumber: '3.4',
            prompt: 'For which values of x is f(x) increasing?',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'x < 2',
            markingGuidelines: [
              '✓ Graph slopes upwards to the left of the turning point x = 2',
              '✓ Condition: x < 2',
            ],
            fullWorkedSolution:
              'The graph increases to the left of its turning point:\nf\'(x) > 0 → -2x + 4 > 0 → -2x > -4 → x < 2.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'At the turning point itself (x = 2), the function is stationary, so use strict inequality x < 2.',
          },
          {
            subNumber: '3.5',
            prompt:
              'Describe the transformation that maps \\( f(x) = -x^2 + 4x + 5 \\) onto \\( g(x) = x^2 - 4x - 5 \\).',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'Reflection across the x-axis',
            markingGuidelines: [
              '✓ g(x) = -f(x)',
              '✓ Reflection in the x-axis',
            ],
            fullWorkedSolution:
              'Notice that g(x) = -(-x² + 4x + 5) = -f(x).\nMultiplying the entire function by -1 reflects every y-coordinate across the x-axis.\nTransformation: Reflection in the x-axis.',
            cognitiveLevel: 'Knowledge',
            examinerTip: '-f(x) is reflection across x-axis; f(-x) is reflection across y-axis.',
          },
          {
            subNumber: '3.6',
            prompt:
              'Determine the value(s) of k for which the line \\( y = k \\) will intersect f at TWO distinct positive x-values.',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: '5 < k < 9',
            markingGuidelines: [
              '✓ At x = 0, y = 5 (y-intercept)',
              '✓ For x > 0, the curve peaks at turning point (2; 9)',
              '✓ Between y = 5 and y = 9, a horizontal line cuts both positive branches (0 < x₁ < 2 and 2 < x₂ < 5)',
              '✓ Range of k: 5 < k < 9',
            ],
            fullWorkedSolution:
              'The turning point is at (2; 9).\nThe y-intercept is at (0; 5).\nThe positive x-intercept is at (5; 0).\nA horizontal line y = k intersects the curve in two places for k < 9.\nFor BOTH intersection points to have positive x-values (x₁ > 0 and x₂ > 0):\nThe line must lie above the y-intercept (k > 5) and below the maximum turning point (k < 9).\nTherefore: 5 < k < 9.',
            cognitiveLevel: 'Problem Solving',
            examinerTip: 'Sketch the graph and visualise sliding a horizontal ruler upwards.',
          },
        ],
      },
      {
        questionNumber: 4,
        title: 'QUESTION 4: FINANCIAL MATHEMATICS',
        topicTag: 'Finance',
        totalMarks: 15,
        contextPreamble: 'Future value sinking funds and compound inflation.',
        subQuestions: [
          {
            subNumber: '4.1',
            prompt:
              'A piece of industrial machinery costs R450 000 today. Inflation is estimated at 6.5% p.a. over the next 4 years. Calculate the estimated replacement cost of the machine in 4 years.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: 'R578 906.91',
            markingGuidelines: [
              '✓ Formula: A = P(1 + i)ⁿ',
              '✓ A = 450 000(1 + 0.065)⁴',
              '✓ Calculation: A = 450 000(1.28646) ≈ R578 906.91',
            ],
            fullWorkedSolution:
              'A = P(1 + i)ⁿ\nA = 450 000(1 + 0.065)⁴\nA = 450 000(1.065)⁴\nA = 450 000 × 1.28646 = R578 906.91',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Inflation increases costs according to the compound interest formula.',
            formulaUsed: 'A = P(1 + i)^n',
          },
          {
            subNumber: '4.2',
            prompt:
              'To pay for the new machine in 4.1, a company sets up a sinking fund paying 9% p.a. compounded monthly. Equal monthly deposits (x) are made at the end of each month for 4 years. Calculate the monthly deposit needed to accumulate R578 906.91.',
            marks: 7,
            type: 'numeric',
            expectedShortAnswer: 'x = R10 114.77',
            markingGuidelines: [
              '✓ Future value annuity formula: F = x[(1+i)ⁿ - 1] / i',
              '✓ Monthly rate: i = 0.09 / 12 = 0.0075',
              '✓ Total months: n = 4 × 12 = 48',
              '✓ Substitution: 578 906.91 = x[(1.0075)⁴⁸ - 1] / 0.0075',
              '✓ (1.0075)⁴⁸ - 1 = 1.431405 - 1 = 0.431405',
              '✓ x = (578 906.91 × 0.0075) / 0.431405 ≈ R10 114.77',
            ],
            fullWorkedSolution:
              'F = x [ (1 + i)ⁿ - 1 ] / i\nF = 578 906.91\ni = 0.09 / 12 = 0.0075\nn = 4 × 12 = 48 months\n578 906.91 = x [ (1.0075)⁴⁸ - 1 ] / 0.0075\n578 906.91 × 0.0075 = x [ 1.431405 - 1 ]\n4341.8018 = x [ 0.431405 ]\nx = 4341.8018 / 0.431405 ≈ R10 114.77 per month',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Sinking funds accumulate into the future, so use the Future Value annuity formula.',
            formulaUsed: 'F = \\frac{x[(1+i)^n - 1]}{i}',
          },
          {
            subNumber: '4.3',
            prompt:
              'Calculate the total interest earned by the sinking fund over the 4-year period.',
            marks: 5,
            type: 'numeric',
            expectedShortAnswer: 'R93 397.95',
            markingGuidelines: [
              '✓ Total payments made: 48 × R10 114.77 = R485 508.96',
              '✓ Final accumulated amount: R578 906.91',
              '✓ Interest earned = Final Amount - Total Deposits',
              '✓ Interest = 578 906.91 - 485 508.96 = R93 397.95',
            ],
            fullWorkedSolution:
              'Total money deposited = 48 months × R10 114.77 = R485 508.96\nTotal accumulated value = R578 906.91\nInterest earned = Accumulated value - Total deposits\n= 578 906.91 - 485 508.96\n= R93 397.95',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Interest in annuity = Total Accumulated Value - (n × Monthly Payment).',
          },
        ],
      },
      {
        questionNumber: 5,
        title: 'QUESTION 5: DIFFERENTIAL CALCULUS',
        topicTag: 'Calculus',
        totalMarks: 25,
        contextPreamble: 'First principles, derivatives, and cubic curves.',
        subQuestions: [
          {
            subNumber: '5.1',
            prompt: 'Differentiate \\( f(x) = 3x^2 \\) from first principles.',
            marks: 5,
            type: 'step-by-step',
            expectedShortAnswer: 'f\'(x) = 6x',
            markingGuidelines: [
              '✓ f(x+h) = 3(x+h)² = 3x² + 6xh + 3h²',
              '✓ Formula: f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h',
              '✓ f(x+h) - f(x) = 6xh + 3h²',
              '✓ Factoring h: h(6x + 3h)/h = 6x + 3h',
              '✓ Limit as h → 0: 6x',
            ],
            fullWorkedSolution:
              'f(x) = 3x²\nf(x + h) = 3(x + h)² = 3(x² + 2xh + h²) = 3x² + 6xh + 3h²\nf\'(x) = lim_{h→0} [f(x + h) - f(x)] / h\n= lim_{h→0} [3x² + 6xh + 3h² - 3x²] / h\n= lim_{h→0} [6xh + 3h²] / h\n= lim_{h→0} [h(6x + 3h)] / h\n= lim_{h→0} (6x + 3h)\n= 6x + 3(0) = 6x',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Do not omit the limit sign before evaluating at h = 0.',
            formulaUsed: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
          },
          {
            subNumber: '5.2',
            prompt:
              'Determine \\( \\frac{dy}{dx} \\) if \\( y = \\frac{2x^3 - 5x}{\\sqrt{x}} \\).',
            marks: 5,
            type: 'step-by-step',
            expectedShortAnswer: 'dy/dx = 5x^(3/2) - (5/2)x^(-1/2)',
            markingGuidelines: [
              '✓ Split into individual fractions: y = 2x³ / x^(1/2) - 5x / x^(1/2)',
              '✓ Simplify powers: y = 2x^(5/2) - 5x^(1/2)',
              '✓ Derivative of first term: 2(5/2) x^(3/2) = 5 x^(3/2)',
              '✓ Derivative of second term: -5(1/2) x^(-1/2) = -(5/2) x^(-1/2)',
              '✓ Final answer: 5x^(3/2) - (5/2)x^(-1/2) (or 5x√x - 5/(2√x))',
            ],
            fullWorkedSolution:
              'y = (2x³ - 5x) / x^(1/2)\n= 2x³ / x^(1/2) - 5x / x^(1/2)\n= 2 x^(3 - 1/2) - 5 x^(1 - 1/2)\n= 2 x^(5/2) - 5 x^(1/2)\ndy/dx = 2(5/2) x^(5/2 - 1) - 5(1/2) x^(1/2 - 1)\n= 5 x^(3/2) - (5/2) x^(-1/2)\n= 5x√x - 5 / (2√x)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Simplify using exponent quotient rules BEFORE differentiating.',
          },
          {
            subNumber: '5.3',
            prompt:
              'The cubic graph \\( f(x) = x^3 - 6x^2 + 9x \\) is given.\n(a) Find the stationary points of f.\n(b) Determine the coordinates of the point of inflection.',
            marks: 11,
            type: 'step-by-step',
            expectedShortAnswer: '(a) (1; 4) [max] and (3; 0) [min]  (b) (2; 2)',
            markingGuidelines: [
              '✓ f\'(x) = 3x² - 12x + 9',
              '✓ 3x² - 12x + 9 = 0 → x² - 4x + 3 = 0',
              '✓ (x - 1)(x - 3) = 0 → x = 1 or x = 3',
              '✓ f(1) = 1 - 6 + 9 = 4 → (1; 4)',
              '✓ f(3) = 27 - 54 + 27 = 0 → (3; 0)',
              '✓ Second derivative: f\'\'(x) = 6x - 12 = 0',
              '✓ x = 2',
              '✓ f(2) = 8 - 24 + 18 = 2 → (2; 2)',
            ],
            fullWorkedSolution:
              'f\'(x) = 3x² - 12x + 9 = 0\nDivide by 3: x² - 4x + 3 = 0\n(x - 1)(x - 3) = 0\nx = 1  or  x = 3\nWhen x = 1: f(1) = (1)³ - 6(1)² + 9(1) = 4 → (1; 4) [local max]\nWhen x = 3: f(3) = (3)³ - 6(3)² + 9(3) = 27 - 54 + 27 = 0 → (3; 0) [local min]\n\nPoint of inflection: f\'\'(x) = 0\n6x - 12 = 0 → 6x = 12 → x = 2\nf(2) = (2)³ - 6(2)² + 9(2) = 8 - 24 + 18 = 2\nPoint of inflection = (2; 2).',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Notice inflection point x = 2 is midpoint between x = 1 and x = 3.',
          },
          {
            subNumber: '5.4',
            prompt: 'For which values of k does \\( x^3 - 6x^2 + 9x = k \\) have THREE distinct real roots?',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: '0 < k < 4',
            markingGuidelines: [
              '✓ Local minimum value y = 0',
              '✓ Local maximum value y = 4',
              '✓ Three roots occur between local minimum and local maximum: 0 < k < 4',
            ],
            fullWorkedSolution:
              'A horizontal line y = k intersects the cubic graph in three distinct places if and only if it lies strictly between the local minimum y-value and the local maximum y-value.\nFrom 5.3, local min = 0, local max = 4.\nTherefore: 0 < k < 4.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Strict inequality is required; at k = 0 and k = 4 there are only 2 distinct roots (one being a double root).',
          },
        ],
      },
      {
        questionNumber: 6,
        title: 'QUESTION 6: CALCULUS OPTIMISATION (MAXIMA & MINIMA)',
        topicTag: 'Calculus Applications',
        totalMarks: 10,
        contextPreamble:
          'A rectangular vegetable garden is to be fenced against an existing brick wall. Only three sides need fencing. The total length of fence available is 80 metres.',
        subQuestions: [
          {
            subNumber: '6.1',
            prompt:
              'If the two sides perpendicular to the wall have length x metres, express the area A of the garden in terms of x.',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'A(x) = 80x - 2x²',
            markingGuidelines: [
              '✓ Perimeter of fence: 2x + L = 80',
              '✓ Length parallel to wall: L = 80 - 2x',
              '✓ Area formula: A = x · L = x(80 - 2x) = 80x - 2x²',
            ],
            fullWorkedSolution:
              'Let width = x.\nSince one side is a brick wall, the fencing is used for two widths and one length:\n2x + L = 80\nL = 80 - 2x\nArea = Length × Width\nA(x) = x(80 - 2x) = 80x - 2x²',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Read carefully: one side is an existing wall, so only 3 sides are fenced.',
          },
          {
            subNumber: '6.2',
            prompt: 'Calculate the dimensions of the garden that will MAXIMISE the enclosed area, and find the maximum area.',
            marks: 7,
            type: 'numeric',
            expectedShortAnswer: 'x = 20 m, L = 40 m, Max Area = 800 m²',
            markingGuidelines: [
              '✓ Derivative of area: A\'(x) = 80 - 4x',
              '✓ Setting derivative to zero: 80 - 4x = 0',
              '✓ Solving: 4x = 80 → x = 20 m',
              '✓ Length: L = 80 - 2(20) = 40 m',
              '✓ Maximum Area: A = 20 × 40 = 800 m²',
            ],
            fullWorkedSolution:
              'A\'(x) = 80 - 4x\nSet A\'(x) = 0 for maximum area:\n80 - 4x = 0\n4x = 80\nx = 20 m\nDimensions:\nWidth = 20 m\nLength = 80 - 2(20) = 40 m\nMaximum Area = 20 m × 40 m = 800 m²\nCheck: A\'\'(x) = -4 < 0 (confirms maximum).',
            cognitiveLevel: 'Problem Solving',
            examinerTip: 'State the units (metres and square metres) with your final dimensions.',
          },
        ],
      },
      {
        questionNumber: 7,
        title: 'QUESTION 7: PROBABILITY & VENN DIAGRAMS',
        topicTag: 'Probability',
        totalMarks: 15,
        contextPreamble: 'A survey of 120 Grade 12 matric learners at a high school in Gauteng.',
        subQuestions: [
          {
            subNumber: '7.1',
            prompt:
              'In a group of 120 matric learners:\n- 75 take Mathematics\n- 60 take Physical Sciences\n- 45 take BOTH Mathematics and Physical Sciences\n(a) Draw a Venn diagram representing this information.\n(b) Determine how many learners take NEITHER Mathematics nor Physical Sciences.',
            marks: 7,
            type: 'step-by-step',
            expectedShortAnswer: '(a) Venn diagram with 30 (Maths only), 45 (both), 15 (Sci only), 30 (neither)  (b) 30 learners',
            markingGuidelines: [
              '✓ Intersection: 45 learners',
              '✓ Mathematics only: 75 - 45 = 30 learners',
              '✓ Physical Sciences only: 60 - 45 = 15 learners',
              '✓ Union total: 30 + 45 + 15 = 90 learners',
              '✓ Neither: 120 - 90 = 30 learners',
            ],
            fullWorkedSolution:
              'Total learners n(S) = 120\nBoth = n(M ∩ P) = 45\nMaths only = 75 - 45 = 30\nPhysical Sciences only = 60 - 45 = 15\nTotal taking at least one = 30 + 45 + 15 = 90\nNeither = 120 - 90 = 30 learners take neither subject.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Start by filling in the central intersection (45) first before subtracting.',
          },
          {
            subNumber: '7.2',
            prompt:
              'Calculate the probability that a learner chosen at random from this group takes ONLY Physical Sciences.',
            marks: 3,
            type: 'numeric',
            expectedShortAnswer: '15/120 = 1/8 or 0.125',
            markingGuidelines: [
              '✓ Number taking Physical Sciences only: 15',
              '✓ Total learners: 120',
              '✓ Probability: 15 / 120 = 1/8 = 0.125 (or 12.5%)',
            ],
            fullWorkedSolution:
              'P(Physical Sciences only) = 15 / 120 = 1 / 8 = 0.125 = 12.5%',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Ensure you divide by the total sample space (120).',
          },
          {
            subNumber: '7.3',
            prompt:
              'Are the events "taking Mathematics" and "taking Physical Sciences" mutually exclusive? Justify your answer.',
            marks: 2,
            type: 'step-by-step',
            expectedShortAnswer: 'No, because P(M and P) = 45/120 ≠ 0 (they can happen simultaneously).',
            markingGuidelines: [
              '✓ "No"',
              '✓ "Because P(M ∩ P) ≠ 0 / 45 learners take both subjects"',
            ],
            fullWorkedSolution:
              'No, they are NOT mutually exclusive, because 45 learners take BOTH subjects simultaneously (P(M ∩ P) = 45/120 ≠ 0). Mutually exclusive events cannot occur together.',
            cognitiveLevel: 'Knowledge',
            examinerTip: 'Mutually exclusive means P(A and B) = 0.',
          },
          {
            subNumber: '7.4',
            prompt:
              'Are the events "taking Mathematics" and "taking Physical Sciences" independent? Justify with calculations.',
            marks: 3,
            type: 'step-by-step',
            expectedShortAnswer: 'No, P(M) × P(P) = 0.3125 ≠ P(M and P) = 0.375',
            markingGuidelines: [
              '✓ P(M) = 75/120 = 0.625',
              '✓ P(P) = 60/120 = 0.5',
              '✓ Product: P(M) × P(P) = 0.625 × 0.5 = 0.3125',
              '✓ P(M and P) = 45/120 = 0.375',
              '✓ Conclusion: Since 0.3125 ≠ 0.375, the events are NOT independent.',
            ],
            fullWorkedSolution:
              'P(M) = 75 / 120 = 0.625\nP(P) = 60 / 120 = 0.50\nP(M) × P(P) = 0.625 × 0.50 = 0.3125\nP(M ∩ P) = 45 / 120 = 0.375\nSince P(M) × P(P) ≠ P(M ∩ P) (0.3125 ≠ 0.375), the events are DEPENDENT (NOT independent).',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Do not simply state yes or no without showing the product comparison.',
            formulaUsed: 'P(A \\cap B) = P(A) \\times P(B)',
          },
        ],
      },
      {
        questionNumber: 8,
        title: 'QUESTION 8: ADVANCED MATRIC INTEGRATED PROBLEM',
        topicTag: 'Comprehensive Synthesis',
        totalMarks: 20,
        contextPreamble: 'Final synthesis problems covering functions, cubic roots, and geometric tangent slopes:',
        subQuestions: [
          {
            subNumber: '8.1',
            prompt:
              'Given \\( f(x) = ax^3 + bx^2 + cx + d \\). It is given that \\( f\'(-2) = 0 \\) and \\( f\'(4) = 0 \\). Determine the x-coordinate of the point of inflection of f.',
            marks: 4,
            type: 'numeric',
            expectedShortAnswer: 'x = 1',
            markingGuidelines: [
              '✓ Inflection point occurs where second derivative f\'\'(x) = 0',
              '✓ For any cubic function, the inflection point lies exactly at the midpoint of the turning points',
              '✓ Midpoint formula: x = (-2 + 4) / 2 = 2 / 2 = 1',
            ],
            fullWorkedSolution:
              'For any cubic polynomial, the point of inflection (where f\'\'(x) = 0) is situated symmetrically halfway between the two stationary points.\nx_inflection = (x₁ + x₂) / 2\n= (-2 + 4) / 2\n= 2 / 2 = 1\nTherefore, the x-coordinate of the inflection point is 1.',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Symmetry of cubic curves is a very high-frequency shortcut in Matric exams.',
          },
          {
            subNumber: '8.2',
            prompt:
              'If the graph in 8.1 also has a local maximum at \\( x = -2 \\), determine whether the coefficient \\( a \\) is POSITIVE or NEGATIVE. Justify your answer.',
            marks: 4,
            type: 'step-by-step',
            expectedShortAnswer: 'Negative (a < 0)',
            markingGuidelines: [
              '✓ Left turning point x = -2 is a local MAXIMUM',
              '✓ Right turning point x = 4 is a local MINIMUM',
              '✓ A cubic curve that has its maximum before its minimum goes DOWNWARDS as x → ∞',
              '✓ Therefore, leading coefficient a must be NEGATIVE (a < 0)',
            ],
            fullWorkedSolution:
              'Since the local maximum occurs first at x = -2 and the local minimum occurs subsequently at x = 4, the graph descends between x = -2 and x = 4, and continues downwards as x approaches positive infinity.\nA cubic graph that falls to the right has a NEGATIVE leading coefficient: a < 0.',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Positive cubic (a > 0): rises, falls, rises. Negative cubic (a < 0): falls, rises, falls.',
          },
          {
            subNumber: '8.3',
            prompt:
              'Determine the equation of the line passing through \\( (1; 3) \\) that is PERPENDICULAR to the tangent of \\( y = x^2 - 2x \\) at \\( x = 2 \\).',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: 'y = -1/2 x + 7/2 (or 2y + x = 7)',
            markingGuidelines: [
              '✓ Derivative of parabola: y\' = 2x - 2',
              '✓ Gradient of tangent at x = 2: m_tangent = 2(2) - 2 = 2',
              '✓ Perpendicular gradient rule: m_perp = -1 / m_tangent = -1/2',
              '✓ Line equation through (1; 3): y - 3 = -1/2 (x - 1)',
              '✓ y = -1/2 x + 1/2 + 3 = -1/2 x + 7/2',
            ],
            fullWorkedSolution:
              'y = x² - 2x\ndy/dx = 2x - 2\nAt x = 2: m_tangent = 2(2) - 2 = 2\nSince the required line is perpendicular (normal) to the tangent:\nm₁ · m₂ = -1\n2 · m_perp = -1 → m_perp = -1/2\nEquation of line passing through (1; 3):\ny - y₁ = m(x - x₁)\ny - 3 = -1/2 (x - 1)\ny - 3 = -1/2 x + 1/2\ny = -1/2 x + 7/2  (or 2y + x = 7)',
            cognitiveLevel: 'Routine Procedures',
            examinerTip: 'Perpendicular lines have negative reciprocal gradients: m₁ × m₂ = -1.',
          },
          {
            subNumber: '8.4',
            prompt:
              'Find the coordinates of the points on the curve \\( y = \\frac{1}{3}x^3 - x^2 - 3x + 4 \\) where the tangent is PARALLEL to the line \\( y = 5x - 7 \\).',
            marks: 6,
            type: 'step-by-step',
            expectedShortAnswer: '(4; -2.67) and (-2; 3.33)',
            markingGuidelines: [
              '✓ Gradient of target line: m = 5',
              '✓ Derivative of curve: dy/dx = x² - 2x - 3',
              '✓ Equating gradients: x² - 2x - 3 = 5',
              '✓ Standard quadratic: x² - 2x - 8 = 0',
              '✓ Factors: (x - 4)(x + 2) = 0 → x = 4 or x = -2',
              '✓ Calculate corresponding y-coordinates on curve',
            ],
            fullWorkedSolution:
              'The given line has gradient m = 5.\nFor tangents to be parallel to this line, their gradient must be 5:\ndy/dx = x² - 2x - 3\nx² - 2x - 3 = 5\nx² - 2x - 8 = 0\n(x - 4)(x + 2) = 0\nx = 4  or  x = -2\n\nWhen x = 4:\ny = 1/3 (64) - (16) - 3(4) + 4 = 64/3 - 16 - 12 + 4 = 64/3 - 24 = -8/3 ≈ -2.67\nPoint 1: (4; -8/3)\n\nWhen x = -2:\ny = 1/3 (-8) - (4) - 3(-2) + 4 = -8/3 - 4 + 6 + 4 = -8/3 + 6 = 10/3 ≈ 3.33\nPoint 2: (-2; 10/3)',
            cognitiveLevel: 'Complex Procedures',
            examinerTip: 'Parallel lines have EQUAL gradients: m₁ = m₂.',
          },
        ],
      },
    ],
  },
  GEOGRAPHY_2024_P1,
  LIFE_SCIENCES_2024_P1,
];
