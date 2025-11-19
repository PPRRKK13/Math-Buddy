
# Math Buddy (LV) – React Native/Expo

A kid‑friendly math practice app focused on multiplication/division tables with a quick skill test, time‑based scoring, and **Latvian language UI**. Built with **Expo** + **React Navigation** + **Lottie** + **i18n‑js**.

## ✨ Features
- 10‑question **Onboarding Skill Test** to suggest starting level
- Practice by **range** (1–3, 4–6, 7–9, 10–12) and **difficulty** (Easy/Medium/Hard/Expert)
- **Multiply/Divide** modes
- **Timer** + time‑based **scoring**, accuracy, and detailed results
- **Firework** animation + **haptics** on incorrect answers
- **Latvian UI** with a language toggle (auto‑detects device locale)

## 📱 Quick Start (iOS/Android)

1. Install prerequisites: Node.js LTS and Expo Go on your phone.
2. Clone this repo and install deps:

```bash
npm i -g expo-cli # optional; you can also use npx
npm install
# align native deps to your Expo SDK
npx expo install
```

3. Add animations (optional but recommended):
   - Download a fireworks Lottie JSON (e.g., from lottiefiles.com) to `assets/lottie/fireworks.json`.

4. Run the app:

```bash
npm run start
```

Scan the QR code with **Expo Go** on your iPhone.

## 🧭 Navigation & Screens
- `OnboardingTestScreen` → 10 mixed questions to suggest a difficulty.
- `MenuScreen` → choose range, difficulty, mode, language, and start a 10‑question quiz.
- `QuizScreen` → per‑question timer, scoring, and feedback.
- `ResultsScreen` → score, accuracy, time, and next‑step suggestion.

## 🌐 i18n (Latvian)
- Implemented with `expo-localization` + `i18n-js` (`src/i18n`).
- Auto‑detects device language; manual toggle in the menu (English/Latviešu).
- Add/modify translations in `src/i18n/index.js`.

## 🔧 Tech
- Expo SDK 51 (compatible)
- React Navigation (native‑stack)
- Lottie (optional, graceful fallback)
- Expo Haptics

## 📦 Project Structure
```
src/
  components/      # TimerBar, Firework
  screens/         # Onboarding, Menu, Quiz, Results
  utils/           # math logic, scoring
  i18n/            # translations (en, lv)
  theme/           # colors
assets/
  lottie/          # fireworks.json (add your file)
```

## 🐙 Publish to GitHub
```bash
git init
git add .
git commit -m "feat: initial Latvian UI app"
git branch -M main
gh repo create math-buddy-lv --public --source=. --remote=origin --push # requires GitHub CLI
# or manually create repo on GitHub and then:
git remote add origin https://github.com/<your-user>/math-buddy-lv.git
git push -u origin main
```

## 🧪 Notes
- If Lottie asset is missing, the app shows a simple red flash instead of fireworks.
- Tweak time limits and difficulty in `src/utils/logic.js`.
- Scoring formula lives in `scoreForQuestion()`.

## 📄 License
MIT
