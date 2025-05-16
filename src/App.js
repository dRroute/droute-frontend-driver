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
import CompleteProfileForm from './screens/completeProfile/completeProfileForm';
import PostJourney from './screens/journey/postJourney';
import Home from './screens/home/home';
import AllJourneyList from './screens/journey/allJourneyList';
import BottomNavigationBar from './components/bottomNavigationBar';
import TermsAndConditionsScreen from './screens/profile/termsAndCondition';
import PrivacyPolicyScreen from './screens/profile/privacyPolicy';
import ChangePassword from './screens/profile/changePassword';
import EditProfile from './screens/profile/editProfile';
import ChatScreen from './screens/chatScreen/chatScreen';
import PendingRequests from './screens/orders/pendingRequests';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
         
          <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="CompleteProfileForm" component={CompleteProfileForm} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} /> 
          <Stack.Screen name="PostJourney" component={PostJourney} /> 
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AllJourneyList" component={AllJourneyList} />
          <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
          <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
           <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
             <Stack.Screen name="ChatScreen" component={ChatScreen} />
             <Stack.Screen name="PendingRequests" component={PendingRequests} />
            
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
