
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import colors from '../theme/colors';
let LottieView;
try {
  LottieView = require('lottie-react-native').default;
} catch (e) { LottieView = null; }

export default function Firework({ visible }) {
  if (!visible) return null;
  if (LottieView) {
    let source;
    try { source = require('../../assets/lottie/fireworks.json'); } catch (e) { source = null; }
    if (source) {
      return (
        <View pointerEvents="none" style={styles.overlay}>
          <LottieView source={source} autoPlay loop={false} style={{ width: 260, height: 260 }} />
        </View>
      );
    }
  }
  return <View pointerEvents="none" style={[styles.overlay, { backgroundColor: 'rgba(220,38,38,0.15)' }]} />;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: Platform.select({ ios: 120, android: 100 }), alignSelf: 'center',
    width: 260, height: 260, borderRadius: 130, justifyContent: 'center', alignItems: 'center', zIndex: 50,
  },
});
