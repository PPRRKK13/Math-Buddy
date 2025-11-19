
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];
export const RANGE_GROUPS = [
  { key: '1-3', min: 1, max: 3 },
  { key: '4-6', min: 4, max: 6 },
  { key: '7-9', min: 7, max: 9 },
  { key: '10-12', min: 10, max: 12 },
];

export function difficultyConfig(diff) {
  switch (diff) {
    case 'Easy':
      return { timeLimit: 20, otherFactorMax: 9 };
    case 'Medium':
      return { timeLimit: 15, otherFactorMax: 12 };
    case 'Hard':
      return { timeLimit: 12, otherFactorMax: 12 };
    case 'Expert':
      return { timeLimit: 8, otherFactorMax: 12 };
    default:
      return { timeLimit: 15, otherFactorMax: 12 };
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateQuestion({ mode = 'Multiply', rangeGroup, difficulty }) {
  const cfg = difficultyConfig(difficulty);
  const rg = RANGE_GROUPS.find(r => r.key === rangeGroup) || RANGE_GROUPS[0];

  const a = randInt(rg.min, rg.max);
  const b = randInt(1, cfg.otherFactorMax);

  if (mode === 'Multiply') {
    const correct = a * b;
    return {
      a, b, correctAnswer: correct,
      operation: '×',
      questionText: `${a} × ${b} = ?`,
      explanation: `${a} × ${b} = ${correct}`,
      timeLimit: cfg.timeLimit,
    };
  } else {
    const product = a * b;
    const correct = b; // product ÷ a = b
    return {
      a: product, b: a, correctAnswer: correct,
      operation: '÷',
      questionText: `${product} ÷ ${a} = ?`,
      explanation: `${product} ÷ ${a} = ${b}`,
      timeLimit: cfg.timeLimit,
    };
  }
}

export function scoreForQuestion({ correct, elapsed, timeLimit }) {
  if (!correct) return 0;
  const ratio = Math.max(0, Math.min(1, 1 - (elapsed / timeLimit)));
  const timeBonus = Math.round(50 * ratio);
  return 100 + timeBonus;
}

export function assessLevel({ correctCount, avgSeconds }) {
  const acc = correctCount / 10;
  if (acc >= 0.9 && avgSeconds <= 7) return 'Expert';
  if (acc >= 0.8 && avgSeconds <= 10) return 'Hard';
  if (acc >= 0.6 && avgSeconds <= 13) return 'Medium';
  return 'Easy';
}
