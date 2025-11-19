
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingTestScreen from './src/screens/OnboardingTestScreen';
import MenuScreen from './src/screens/MenuScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingTestScreen} options={{ title: 'Math Buddy – Skill Check' }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Choose Practice' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
