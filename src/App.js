import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import OnboardingScreen from './screens/onBoardingScreens/onBoardingScreen';
import MyStatusBar from './components/myStatusBar';
import SignUpScreen from './screens/auth/signUp';
import SignInScreen from './screens/auth/signIn';
import VerificationScreen from './screens/auth/verificationScreen';
import ForgetPassword from './screens/auth/forgetPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
