import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MyStatusBar from "../../components/myStatusBar";
import { Colors } from "../../constants/styles";
import { selectUser } from "../../redux/selector/authSelector";
import { logoutUser } from "../../redux/slice/authSlice";

const PendingAccountScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <MyStatusBar />
      <Image
        source={require("../../../assets/images/sadCar.png")}
        style={styles.image}
      />

      {user?.profileStatus ? (
        <Text style={styles.title}>
          Oops! Your account is currently{" "}
          {(user?.profileStatus || "On Hold").toLowerCase()}
        </Text>
      ) : (
        <Text style={styles.title}>Unexpected Error Uccured</Text>
      )}

      <Text style={styles.subtitle}>
        Your access has been restricted. Please contact the administrator for
        further assistance or to resolve any issues.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HelpScreen")}
      >
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(logoutUser())}>
        <Text style={styles.goBackText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PendingAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: { width: 180, height: 180, resizeMode: "contain", marginBottom: 40 },
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
    backgroundColor: Colors.darkOrangeColor,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: { fontSize: 14, color: "white", fontWeight: "bold" },
  goBackText: {
    fontSize: 14,
    color: Colors.darkOrangeColor,
    textAlign: "center",
  },
});
