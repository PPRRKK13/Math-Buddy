
import * as Localization from 'expo-localization';
import I18n from 'i18n-js';

const en = {
  appTitle: 'Math Buddy',
  screens: {
    onboardingTitle: 'Math Buddy – Skill Check',
    menuTitle: 'Choose Practice',
    quizTitle: 'Quiz',
    resultsTitle: 'Results',
  },
  common: {
    submit: 'Submit',
    yourAnswer: 'Your answer',
    backToMenu: 'Back to Menu',
    retrySame: 'Retry Same Settings',
    startQuiz10: 'Start 10‑Question Quiz',
    timeAffects: 'Time affects score',
    recommended: 'Recommended',
  },
  onboarding: {
    quickCheck: 'Quick Skill Check',
    questionOf: 'Question %{idx} of 10',
    helper: "We'll use your results to suggest a level.",
  },
  menu: {
    mode: 'Mode',
    multiply: 'Multiply',
    divide: 'Divide',
    range: 'Multiplication Range',
    difficulty: 'Difficulty',
    language: 'Language',
  },
  quiz: {
    qOf: 'Q %{idx}/10',
    score: 'Score',
    meta: 'Difficulty: %{difficulty} · Mode: %{mode} · Range: %{range}',
  },
  results: {
    greatJob: 'Great job!',
    correct: 'Correct',
    accuracy: 'Accuracy',
    totalTime: 'Total time',
    avg: 'avg',
    suggestion: {
      expert: 'Try Expert or a higher range.',
      hard: 'Move to Hard or keep going here.',
      medium: 'Stay on Medium and build speed.',
      easy: 'Start on Easy and practice fundamentals.',
    },
  },
  difficulties: ['Easy','Medium','Hard','Expert'],
};

const lv = {
  appTitle: 'Math Buddy',
  screens: {
    onboardingTitle: 'Math Buddy – Prasmju tests',
    menuTitle: 'Izvēlies uzdevumu',
    quizTitle: 'Tests',
    resultsTitle: 'Rezultāti',
  },
  common: {
    submit: 'Apstiprināt',
    yourAnswer: 'Tava atbilde',
    backToMenu: 'Atpakaļ uz izvēlni',
    retrySame: 'Mēģināt vēlreiz ar tiem pašiem iestatījumiem',
    startQuiz10: 'Sākt 10 jautājumu testu',
    timeAffects: 'Laiks ietekmē punktus',
    recommended: 'Ieteikums',
  },
  onboarding: {
    quickCheck: 'Ātrais prasmju tests',
    questionOf: 'Jautājums %{idx} no 10',
    helper: 'Pēc rezultātiem ieteiksim piemērotu līmeni.',
  },
  menu: {
    mode: 'Režīms',
    multiply: 'Reizināšana',
    divide: 'Dalīšana',
    range: 'Reizināšanas tabulas diapazons',
    difficulty: 'Grūtības pakāpe',
    language: 'Valoda',
  },
  quiz: {
    qOf: 'J %{idx}/10',
    score: 'Punkti',
    meta: 'Grūtība: %{difficulty} · Režīms: %{mode} · Diapazons: %{range}',
  },
  results: {
    greatJob: 'Lieliski padarīts!',
    correct: 'Pareizas',
    accuracy: 'Precizitāte',
    totalTime: 'Kopējais laiks',
    avg: 'vid.',
    suggestion: {
      expert: 'Pamēģini Eksperta līmeni vai lielāku diapazonu.',
      hard: 'Pārej uz Grūtu vai turpini šeit.',
      medium: 'Paliec Vidējā līmenī un trenē ātrumu.',
      easy: 'Sāc ar Vieglo līmeni un nostiprini pamatus.',
    },
  },
  difficulties: ['Viegli','Vidēji','Grūti','Eksperts'],
};

I18n.fallbacks = true;
I18n.translations = { en, lv };
const sys = Localization.getLocales?.()[0];
I18n.locale = (sys?.languageCode || 'en');

export const t = (k, opts) => I18n.t(k, opts);
export const setLocale = (locale) => { I18n.locale = locale; };
export const getLocale = () => I18n.locale;
export const isLatvian = () => I18n.locale.startsWith('lv');
export const locales = [
  { key: 'en', label: 'English' },
  { key: 'lv', label: 'Latviešu' },
];
