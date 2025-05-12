import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, commonStyles, Fonts,screenWidth, Sizes } from '../constants/styles';

import OTPTextView from "react-native-otp-textinput";

export function authInput(label ,value, setter, placeholder, type) {
  const keyboardType =
    type === "number" ? "phone-pad" :
    type === "email" ? "email-address" :
    "default";

  const handleChangeText = (text) => {
    if (type === "email") {
      setter(text.toLowerCase());
    } else {
      setter(text);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}:</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleChangeText}
      />
    </View>
  );
}

export function authPassword(label,value, setter, placeholder, secureText, setSecureText) {
  return (
    <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.inputLabel}>{label}:</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureText}
          value={value}
          onChangeText={setter}
        />
      </View>
      <Ionicons
        name={secureText ? "eye-off" : "eye"}
        size={20}
        color={Colors.grayColor}
        onPress={() => setSecureText(!secureText)}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
}
 export function otpFields(otpInput,setOtpInput) {
    return (
      <OTPTextView
        containerStyle={{
          margin: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.0,
       
        }}
        handleTextChange={setOtpInput}
        inputCount={4}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.extraLightGrayColor}
        textInputStyle={styles.textFieldStyle}
      />
    );
  }
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.extraLightGrayColor,
  },
  inputLabel: {
    ...Fonts.blackColor14SemiBold,
    fontWeight: '700',
  },
  input: {
    paddingVertical: 10,
    ...Fonts.grayColor12Medium,
  },
      textFieldStyle: {
      width: screenWidth / 9,
      height: 45,
      textAlign: "center",
      borderRadius: Sizes.fixPadding - 5.0,
      backgroundColor: Colors.whiteColor,
      borderColor: Colors.primaryColor,
      borderWidth: 1.5,
      ...Fonts.blackColor16SemiBold,
      ...commonStyles.shadow,
      marginHorizontal: Sizes.fixPadding / 2,
    },
});
