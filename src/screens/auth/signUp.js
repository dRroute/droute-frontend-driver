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
import { Colors,commonStyles,Fonts } from '../../constants/styles';
import { authInput, authPassword } from '../../components/commonComponents';

const SignUpScreen = ({ navigation }) => {
 
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleSignUp = () => {
    // Validate form
    // if (!email || !mobileNumber || !password || !confirmPassword || !fullName) {
    //   alert('Please fill in all fields');
    //   return;
    // }
    
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }
  
    
    //  alert('Sign up successful!');
     navigation.navigate('VerificationScreen');
  };

  const navigateToSignIn = () => {
     navigation.navigate('SignInScreen');
   
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
            <Text style={styles.title}>Sign Up</Text>
        
            {authInput('Full Name', fullName, setFullName, 'Enter Full Name',"default")}
            {authInput('Email', email, setEmail, 'Enter Email Id Here', "email")}
            {authInput('Mobile Number', mobileNumber, setMobileNumber, 'Enter Mobile Number Here', "number")}
            {authPassword("Password",password, setPassword, 'Enter Password',secureText,setSecureText)}
            {authPassword("Confirm Password",confirmPassword, setConfirmPassword, 'Confirm your Password',secureConfirmText,setSecureConfirmText)}

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInLink} onPress={navigateToSignIn}>
              <Text style={styles.signInText}>
                Already Have an Account? <Text style={styles.signInHighlight}>Sign In</Text>
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
      marginTop:10
  },
  signUpButtonText: {
   ...commonStyles.buttonText,
  },
  signInLink: {
    marginTop: 20,
    alignItems: 'center',
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

export default SignUpScreen;