
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../theme/colors';
import TimerBar from '../components/TimerBar';
import Firework from '../components/Firework';
import { generateQuestion, scoreForQuestion } from '../utils/logic';
import * as Haptics from 'expo-haptics';
import { t } from '../i18n';

export default function QuizScreen({ navigation, route }) {
  const { mode, difficulty, rangeKey, timeScoring } = route.params;
  const [qIndex, setQIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [running, setRunning] = useState(true);
  const [showFirework, setShowFirework] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const q = generateQuestion({ mode, rangeGroup: rangeKey, difficulty });
    setQuestion(q);
    startTime.current = Date.now();
    setRunning(true);
  }, [qIndex, mode, rangeKey, difficulty]);

  function next(correctFlag, elapsed) {
    const gained = timeScoring ? scoreForQuestion({ correct: correctFlag, elapsed, timeLimit: question.timeLimit }) : (correctFlag ? 100 : 0);
    const newScore = score + gained;
    const newCorrect = correctCount + (correctFlag ? 1 : 0);
    const newTime = totalTime + elapsed;

    if (qIndex >= 9) {
      navigation.replace('Results', { score: newScore, correct: newCorrect, totalTime: newTime, difficulty, mode, rangeKey });
      return;
    }
    setScore(newScore);
    setCorrectCount(newCorrect);
    setTotalTime(newTime);
    setQIndex(i => i + 1);
    setAnswer('');
  }

  function submit() {
    if (!question) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    const userVal = parseInt(answer, 10);
    const correctFlag = userVal === question.correctAnswer;

    if (correctFlag) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      next(true, elapsed);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShowFirework(true);
      setTimeout(() => { setShowFirework(false); next(false, elapsed); }, 900);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Firework visible={showFirework} />
      <View style={styles.topRow}>
        <Text style={styles.meta}>{t('quiz.qOf', { idx: qIndex + 1 })}</Text>
        <Text style={styles.meta}>{t('quiz.score')}: {score}</Text>
      </View>

      <View style={styles.card}>
        {question && (
          <>
            <TimerBar seconds={question.timeLimit} running={running} onElapsed={() => submit()} />
            <Text style={styles.question}>{question.questionText}</Text>
            <TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder={t('common.yourAnswer')} keyboardType="numeric" returnKeyType="done" onSubmitEditing={submit} />
            <TouchableOpacity style={styles.btn} onPress={submit}>
              <Text style={styles.btnText}>{t('common.submit')}</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>{t('quiz.meta', { difficulty, mode, range: rangeKey })}</Text>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  meta: { color: colors.subtext, fontSize: 14 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border, flex: 1, justifyContent: 'center' },
  question: { fontSize: 40, fontWeight: '800', textAlign: 'center', color: colors.text, marginVertical: 18 },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 22, textAlign: 'center' },
  btn: { backgroundColor: colors.primary, padding: 14, borderRadius: 10, marginTop: 14 },
  btnText: { color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 16 },
  hint: { textAlign: 'center', color: colors.subtext, marginTop: 10 },
});
