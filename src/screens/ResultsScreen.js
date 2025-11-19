
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { t } from '../i18n';

export default function ResultsScreen({ navigation, route }) {
  const { score, correct, totalTime, difficulty, mode, rangeKey } = route.params;
  const accuracy = Math.round((correct / 10) * 100);
  const avg = totalTime / 10;

  let suggestion = t('results.suggestion.easy');
  if (accuracy >= 90 && avg <= 8) suggestion = t('results.suggestion.expert');
  else if (accuracy >= 80) suggestion = t('results.suggestion.hard');
  else if (accuracy >= 60) suggestion = t('results.suggestion.medium');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('results.greatJob')}</Text>
        <Text style={styles.big}>{score} pts</Text>
        <Text style={styles.row}>{t('results.correct')}: <Text style={styles.bold}>{correct}/10</Text></Text>
        <Text style={styles.row}>{t('results.accuracy')}: <Text style={styles.bold}>{accuracy}%</Text></Text>
        <Text style={styles.row}>{t('results.totalTime')}: <Text style={styles.bold}>{totalTime.toFixed(1)}s</Text> ({t('results.avg')} {avg.toFixed(1)}s)</Text>
        <Text style={[styles.row, { marginTop: 8 }]}>Mode: {mode} · Range: {rangeKey} · Difficulty: {difficulty}</Text>

        <View style={{ height: 12 }} />
        <Text style={styles.suggestion}>{suggestion}</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Menu', { suggestedLevel: difficulty })}>
          <Text style={styles.btnText}>{t('common.backToMenu')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={() => navigation.replace('Quiz', { mode, difficulty, rangeKey, timeScoring: true })}>
          <Text style={[styles.btnText, { color: '#fff' }]}>{t('common.retrySame')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, justifyContent: 'center' },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 18, color: colors.subtext },
  big: { fontSize: 42, fontWeight: '800', color: colors.text, textAlign: 'center', marginVertical: 12 },
  row: { color: colors.text, fontSize: 16, marginTop: 4 },
  bold: { fontWeight: '700' },
  suggestion: { color: colors.subtext, marginVertical: 8 },
  btn: { marginTop: 10, backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, padding: 14, borderRadius: 10 },
  btnText: { textAlign: 'center', fontWeight: '700', color: colors.text },
});
