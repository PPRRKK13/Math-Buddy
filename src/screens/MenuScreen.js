
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import colors from '../theme/colors';
import { DIFFICULTIES, RANGE_GROUPS } from '../utils/logic';
import { t, locales, setLocale, getLocale, isLatvian } from '../i18n';

export default function MenuScreen({ navigation, route }) {
  const suggested = route.params?.suggestedLevel || 'Medium';
  const [mode, setMode] = useState('Multiply');
  const [difficulty, setDifficulty] = useState(suggested);
  const [rangeKey, setRangeKey] = useState('1-3');
  const [timeScoring, setTimeScoring] = useState(true);
  const [lang, setLang] = useState(getLocale().startsWith('lv') ? 'lv' : 'en');

  function startQuiz() {
    navigation.navigate('Quiz', { mode, difficulty, rangeKey, timeScoring });
  }

  function toggleLang() {
    const next = lang === 'lv' ? 'en' : 'lv';
    setLang(next);
    setLocale(next);
    // force re-render by updating state
    setRangeKey(r => r);
  }

  const diffLabels = isLatvian() ? ['Viegli','Vidēji','Grūti','Eksperts'] : DIFFICULTIES;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>{t('common.recommended')}: <Text style={{ color: colors.primary }}>{difficulty}</Text></Text>

        <Text style={styles.section}>{t('menu.mode')}</Text>
        <View style={styles.row}>
          {[{ key: 'Multiply', label: t('menu.multiply') }, { key: 'Divide', label: t('menu.divide') }].map(m => (
            <TouchableOpacity key={m.key} onPress={() => setMode(m.key)} style={[styles.pill, mode === m.key && styles.pillActive]}>
              <Text style={[styles.pillText, mode === m.key && styles.pillTextActive]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>{t('menu.range')}</Text>
        <View style={styles.rowWrap}>
          {RANGE_GROUPS.map(r => (
            <TouchableOpacity key={r.key} onPress={() => setRangeKey(r.key)} style={[styles.pill, rangeKey === r.key && styles.pillActive]}>
              <Text style={[styles.pillText, rangeKey === r.key && styles.pillTextActive]}>{r.key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>{t('menu.difficulty')}</Text>
        <View style={styles.rowWrap}>
          {diffLabels.map(d => (
            <TouchableOpacity key={d} onPress={() => setDifficulty(d)} style={[styles.pill, difficulty === d && styles.pillActive]}>
              <Text style={[styles.pillText, difficulty === d && styles.pillTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.row, { marginTop: 8, alignItems: 'center', justifyContent: 'space-between' }]}>
          <Text style={{ color: colors.text, fontSize: 16 }}>{t('common.timeAffects')}</Text>
          <Switch value={timeScoring} onValueChange={setTimeScoring} />
        </View>

        <View style={[styles.row, { marginTop: 8, alignItems: 'center', justifyContent: 'space-between' }]}>
          <Text style={{ color: colors.text, fontSize: 16 }}>{t('menu.language')}</Text>
          <TouchableOpacity onPress={toggleLang} style={[styles.pill, styles.langPill]}>
            <Text style={styles.pillText}>{lang === 'lv' ? 'Latviešu' : 'English'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={startQuiz}>
          <Text style={styles.startTxt}>{t('common.startQuiz10')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  header: { fontSize: 16, color: colors.subtext, marginBottom: 8 },
  section: { fontSize: 14, color: colors.subtext, marginTop: 12, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 8 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { borderWidth: 1, borderColor: colors.border, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff' },
  pillActive: { backgroundColor: colors.primary },
  pillText: { color: colors.text, fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  startBtn: { marginTop: 18, backgroundColor: colors.primaryDark, padding: 14, borderRadius: 12 },
  startTxt: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '700' },
  langPill: { paddingVertical: 8, paddingHorizontal: 12 },
});
