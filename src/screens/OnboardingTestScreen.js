
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../theme/colors';
import { generateQuestion, scoreForQuestion, assessLevel } from '../utils/logic';
import TimerBar from '../components/TimerBar';
import Firework from '../components/Firework';
import * as Haptics from 'expo-haptics';
import { t, setLocale, getLocale, isLatvian } from '../i18n';

export default function OnboardingTestScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [running, setRunning] = useState(true);
  const [showFirework, setShowFirework] = useState(false);
  const [stats, setStats] = useState({ totalScore: 0, correct: 0, totalTime: 0 });
  const startTime = useRef(Date.now());

  const current = useMemo(() => {
    const ranges = ['1-3', '4-6', '7-9', '10-12'];
    const mode = Math.random() < 0.5 ? 'Multiply' : 'Divide';
    const rangeGroup = ranges[Math.floor(Math.random() * ranges.length)];
    return generateQuestion({ mode, rangeGroup, difficulty: 'Medium' });
  }, [index]);

  useEffect(() => {
    setQuestion(current);
    setRunning(true);
    startTime.current = Date.now();
  }, [current]);

  function nextQuestion(correctFlag, elapsed) {
    const perScore = scoreForQuestion({ correct: correctFlag, elapsed, timeLimit: question.timeLimit });
    setStats(s => ({ totalScore: s.totalScore + perScore, correct: s.correct + (correctFlag ? 1 : 0), totalTime: s.totalTime + elapsed }));
    if (index >= 9) {
      const avg = (stats.totalTime + elapsed) / 10;
      const level = assessLevel({ correctCount: stats.correct + (correctFlag ? 1 : 0), avgSeconds: avg });
      navigation.replace('Menu', { suggestedLevel: level });
      return;
    }
    setIndex(i => i + 1);
    setAnswer('');
  }

  function submit() {
    if (!question) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    const userVal = parseInt(answer, 10);
    const correctFlag = userVal === question.correctAnswer;

    if (correctFlag) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      nextQuestion(true, elapsed);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShowFirework(true);
      setTimeout(() => { setShowFirework(false); nextQuestion(false, elapsed); }, 900);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Firework visible={showFirework} />
      <View style={styles.card}>
        <Text style={styles.title}>{t('onboarding.quickCheck')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.questionOf', { idx: index + 1 })}</Text>
        {question && (
          <>
            <View style={{ marginVertical: 12 }}>
              <TimerBar seconds={question.timeLimit} running={running} onElapsed={() => submit()} />
            </View>
            <Text style={styles.question}>{question.questionText}</Text>
            <TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder={t('common.yourAnswer')} keyboardType="numeric" returnKeyType="done" onSubmitEditing={submit} />
            <TouchableOpacity style={styles.btn} onPress={submit}>
              <Text style={styles.btnText}>{t('common.submit')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={styles.helper}>{t('onboarding.helper')}</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, justifyContent: 'center' },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 14, color: colors.subtext, marginTop: 4 },
  question: { fontSize: 34, fontWeight: '700', textAlign: 'center', color: colors.text, marginVertical: 18 },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 20, textAlign: 'center' },
  btn: { backgroundColor: colors.primary, padding: 14, borderRadius: 10, marginTop: 14 },
  btnText: { color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 16 },
  helper: { textAlign: 'center', marginTop: 12, color: colors.subtext },
});
