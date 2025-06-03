import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { getDriverByDriverId } from "../../redux/thunk/authThunk";
import { logoutUser } from "../../redux/slice/authSlice";
import { showSnackbar } from "../../redux/slice/snackbarSlice";
import { selectUser } from "../../redux/selector/authSelector";
import { ButtonWithLoader } from "../../components/commonComponents";

const PendingForApprovalScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(getDriverByDriverId(user.driverId));

      if (getDriverByDriverId.fulfilled.match(response) && response?.payload?.data?.profileStatus === 'ACTIVE') {


        await dispatch(
          showSnackbar({
            message: "Congrats your profile is approved..",
            type: "success",
            time: 2000,
          })
        );
      } else {
        await dispatch(
          showSnackbar({
            message: "Please wait till admin approve your profile.",
            type: "error",
            time: 3000,
          })
        );
      }
    } catch (error) {
      await dispatch(
        showSnackbar({
          message: error?.message,
          type: "error",
          time: 3000,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <Image
        source={require("../../../assets/images/completed.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Documents Submitted</Text>

      <Text style={styles.subtitle}>
        Please wait for approval from the admin.{"\n"}
        This process usually takes 2–3 business days.
      </Text>

      <Text style={[styles.subtitle, { color: "black", fontWeight: "700" }]}>
        Need help or support?{" "}
        <Text
          onPress={() => navigation.navigate("HelpScreen")}
          style={[styles.subtitle, { color: "blue" }]}
        >
          Click here
        </Text>
      </Text>
     <View style={{width:"100%",marginTop:30}}>
      {ButtonWithLoader("Continue" ,"Processing..",isLoading, handleContinue)}
     </View>
      <TouchableOpacity onPress={() => dispatch(logoutUser())}>
        <Text style={styles.goBackText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PendingForApprovalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "grey",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#F4721E",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  goBackText: {
    fontSize: 14,
    color: Colors.darkOrangeColor,
    textAlign: "center",
    marginTop: 30,
  },
});
