// SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Colors,commonStyles,Fonts, Sizes } from '../../constants/styles';
import { authInput, authPassword } from '../../components/commonComponents';

const SignInScreen = ({ navigation }) => {
  
 
  const [email, setEmail] = useState(null);
  
  const [password, setPassword] = useState(null);

  const [secureText, setSecureText] = useState(true);
 

  const handleSignIn = () => {
  navigation.navigate('CompleteProfileForm');
  }
  // Handle navigation to sign in
  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
             <Image
              source={require("../../../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign In</Text>
            {authInput('Email Id or Mobile Number', email, setEmail, 'Enter Email Id or Mobile Number', "email")}
            {authPassword("Password",password, setPassword, 'Enter Password',secureText,setSecureText)}
            
             <TouchableOpacity style={styles.forgetPassLink} onPress={()=>navigation.navigate('ForgetPassword')}>
              <Text style={styles.signInText}>
                Forgot Password ? <Text style={styles.signInHighlight}>Click here</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
              <Text style={styles.signUpButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInLink} onPress={navigateToSignUp}>
              <Text style={styles.signInText}>
                Are You New User? <Text style={styles.signInHighlight}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
 container: {
    flex: 1,
   backgroundColor: Colors.primaryColor,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  logoContainer: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
     flex: 1, 
  },
  logo: {
    width: 200,
    height:200,
  },
  formContainer: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blackColor,
    marginBottom: 20,
  },
  signUpButton: {
   ...commonStyles.button,

  },
  signUpButtonText: {
   ...commonStyles.buttonText,
  },
  signInLink: {
    marginTop: 20,
    alignItems: 'center',
  },
forgetPassLink: {
  marginBottom: 20,
  alignItems: 'flex-end', 
},

  signInText: {
    fontSize: 14,
    color: Colors.blackColor,
  },
  signInHighlight: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },
});

export default SignInScreen;