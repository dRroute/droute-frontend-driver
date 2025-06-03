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
  ButtonWithLoader,
  otpFields,
} from "../../components/commonComponents";
import MyStatusBar from "../../components/myStatusBar";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/slice/snackbarSlice";
import { resetPassword, sendOTP } from "../../redux/thunk/authThunk";

const ForgetPassword = ({ navigation }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [otpInput, setOtpInput] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const clearForm=()=>{
    setOtpSent(false);
    setVerified(false);
    setPassword(null);
    setEmail(null);
    setOtpInput(null);
    setConfirmPassword(null);
  }
  const VerifyOTP =async () => {
    if (otpSent === otpInput) {
      setVerified(true);
        await dispatch(showSnackbar({
        message: "OTP Verified Succesfully",
        type: "success",
        time: 3000,
      }));
    } else {
      await dispatch( showSnackbar({
        message: "Incorrect OTP",
        type: "error",
        time: 3000,
      }));
    }
  };

  const sendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      showSnackbar({
        message: "Invalid Email Entered",
        type: "error",
        time: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await dispatch(sendOTP({ email }));
      console.log("response = ", response?.payload?.data);
      if (
        response?.payload?.statusCode == 200 ||
        response?.payload?.statusCode == 201
      ) {
        const otp = response?.payload?.data;
        await dispatch(
          showSnackbar({
            message: response?.payload?.message,
            type: "success",
            time: 2000,
          })
        );
        setOtpSent(otp);
      } else {
        await dispatch(
          showSnackbar({
            message: response?.payload?.message || "Failed to send OTP",
            type: "error",
            time: 2000,
          })
        );
      }
    } catch (e) {
      dispatch(showSnackbar({ message: e.message, type: "error", time: 3000 }));
    } finally {
      setIsLoading(false);
    }
  };
  const hendleSubmit = async() => {
   
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (password != confirmPassword) {
    await   dispatch(showSnackbar({
        message: "New Password and Confirm Password Should be same",
        type: "error",
        time: 3000,
      }));
      return;
    }
    if (!strongPasswordRegex.test(password)) {
       await dispatch(showSnackbar({
        message:
          "Password must be 8–20 characters long and include at least one letter and one number",
        type: "error",
        time: 3000,
      }));
      return ;
    }
    const data={
     email,
     newPassword: password 
    } 
    setIsLoading(true);
    try {

     const response = await dispatch(resetPassword(data));
     if(resetPassword.fulfilled.match(response)){
      await dispatch(showSnackbar({
        message: response?.payload?.message,
        type: "success",
        time: 2000,
      }));
      clearForm();
       navigation.navigate("SignInScreen");
     }else{
       await dispatch(showSnackbar({
        message: response?.payload?.message,
        type: "error",
        time: 2000,
      }));
       clearForm();
     }
      
    } catch (e) {
      await dispatch(showSnackbar({
        message: e.message|| "Unexpected Error Occured , failed to Reset Password",
        type: "error",
        time: 3000,
      }));
    } 
    finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/transparentIcon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Forget Password</Text>
            {!otpSent && (
              <>
                {authInput(
                  "Email",
                  email,
                  setEmail,
                  "Enter Email Id Here",
                  "email"
                )}
                {ButtonWithLoader(
                  "Send OTP",
                  "Processing...",
                  isLoading,
                  sendOtp
                )}
              </>
            )}

            {!verified && otpSent && (
              <View style={{ marginBottom: 20 }}>
                {otpFields(otpInput, setOtpInput)}
                {ButtonWithLoader(
                  "Verify OTP",
                  "Processing...",
                  isLoading,
                  VerifyOTP
                )}
              </View>
            )}

            {verified && (
              <>
                {authPassword(
                  "New Password",
                  password,
                  setPassword,
                  "Enter New Password",
                  secureText,
                  setSecureText
                )}
                {authPassword(
                  "Confirm New Password",
                  confirmPassword,
                  setConfirmPassword,
                  "Confirm your New Password",
                  secureConfirmText,
                  setSecureConfirmText
                )}
                {ButtonWithLoader(
                  "Submit",
                  "Processing...",
                  isLoading,
                  hendleSubmit
                )}
              </>
            )}

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
    backgroundColor: Colors.whiteColor,
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
    marginTop: 10,
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
