
import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function TimerBar({ seconds, running, onElapsed }) {
  const widthAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    widthAnim.setValue(1);
    if (running) {
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: seconds * 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && onElapsed) onElapsed();
      });
    }
  }, [seconds, running]);

  const barWidth = widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: barWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 6, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: colors.primary },
});
