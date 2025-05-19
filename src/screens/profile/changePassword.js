import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";

import {
  Colors,
  commonStyles,
} from "../../constants/styles";

import { actionOverlay, circularLoader, commonAppBar, renderPassword } from "../../components/commonComponents";

const ChangePassword = ({ route, navigation }) => {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [secureCurrentPass, setSecureCurrentPass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);
  const [secureNewpass, setSecureNewPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialogue, setshowDialogue] = useState(false);


  const handleSubmit = async () => {
   
  };


  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      {commonAppBar("Change Password",navigation,)}
      <ScrollView contentContainerStyle={styles.container}>
        {renderPassword(
          "Current Password",
          currentPassword,
          setCurrentPassword,
          "Enter Your Current Password",
          secureCurrentPass,
          setSecureCurrentPass
        )}
        {renderPassword(
          "New Password",
          newPassword,
          setNewPassword,
          "Enter New Password",
          secureNewpass,
          setSecureNewPass
        )}
        {renderPassword(
          "Confirm Password",
          confirmPassword,
          setConfirmPassword,
          "Confirm Your Password",
          secureConfirmPass,
          setSecureConfirmPass
        )}
          <TouchableOpacity
            onPress={() => {
              setshowDialogue(true);
            }} style={{ ...commonStyles.button } }>
            <Text style={{...commonStyles.buttonText}}>Update</Text>
          </TouchableOpacity>
     
        {actionOverlay(handleSubmit,showDialogue,setshowDialogue,"Are you sure you want to update?",Colors.primaryColor)}
      </ScrollView>
       {circularLoader(isLoading)}
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingBottom: 50,
  },


 

});

export default ChangePassword;
