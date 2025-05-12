// SignUpScreen.js
import React, { useState } from "react";
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
} from "react-native";
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from "../../constants/styles";
import {
  authInput,
  authPassword,
  otpFields,
} from "../../components/commonComponents";

const ForgetPassword = ({ navigation }) => {
 const [otpSent, setOtpSent] = useState(false);
 const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [otpInput, setOtpInput] = useState(null);
  const [email, setEmail] = useState(null);

  const VerifyOTP = () => {
    alert(otpInput);
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Text style={styles.title}>Forget Password</Text>
            {!otpSent &&<>
            {authInput(
              "Email",
              email,
              setEmail,
              "Enter Email Id Here",
              "email"
            )}
             <TouchableOpacity style={styles.signUpButton } onPress={VerifyOTP}>
              <Text style={styles.signUpButtonText}>Send OTP</Text>
            </TouchableOpacity>
            </>}

            {!verified && otpSent &&<>
            {otpFields(otpInput, setOtpInput)}
            <TouchableOpacity style={[styles.signUpButton,{marginBottom:20,} ]} onPress={VerifyOTP}>
              <Text style={styles.signUpButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            </>}

          {verified &&<>
           {authPassword(
              "Password",
              password,
              setPassword,
              "Enter Password",
              secureText,
              setSecureText
            )}
            {authPassword(
              "Confirm Password",
              confirmPassword,
              setConfirmPassword,
              "Confirm your Password",
              secureConfirmText,
              setSecureConfirmText
            )}
            <TouchableOpacity style={styles.signUpButton } onPress={VerifyOTP}>
              <Text style={styles.signUpButtonText}>Submit</Text>
            </TouchableOpacity>
           </>}

            <TouchableOpacity
              style={styles.signInLink}
              onPress={navigateToSignUp}
            >
              <Text style={styles.signInText}>
                Are You New User?{" "}
                <Text style={styles.signInHighlight}>Sign Up</Text>
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
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
    fontWeight: "bold",
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
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    color: Colors.blackColor,
  },
  signInHighlight: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
});

export default ForgetPassword;
