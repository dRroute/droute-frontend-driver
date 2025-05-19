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
import { ButtonWithLoader, otpFields } from "../../components/commonComponents";

const VerificationScreen = ({ navigation, route }) => {
  const { data, otp } = route?.params;
  const [otpInput, setOtpInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const VerifyOTP = () => {
    alert(otpInput);
    if (otpInput === otp) {
      navigation.navigate("InstructionToComplete");
    }
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
            <Text style={{ ...Fonts.whiteColor14Medium }}>
              Please check your email
            </Text>
            <Text style={{ ...Fonts.whiteColor10Medium, marginTop: 5 }}>
              (Kindly check your spam folder as well)
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Verify OTP</Text>

            {otpFields(otpInput, setOtpInput)}
            {ButtonWithLoader("Submit", "Processing...", isLoading, VerifyOTP)}
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
    marginTop: 10,
    marginBottom: 30,
  },

  signUpButtonText: {
    ...commonStyles.buttonText,
  },
});

export default VerificationScreen;
