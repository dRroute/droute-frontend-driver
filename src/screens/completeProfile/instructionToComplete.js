import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { logoutUser } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selector/authSelector";

const InstructionToComplete = ({navigation}) => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
        <MyStatusBar/>
      <Image
        source={require("../../../assets/images/instruction.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Complete Your{"\n"}Profile</Text>
      <Text style={styles.subtitle}>
        Kindly fill in all the required details to proceed.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CompleteProfileForm")}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      <TouchableOpacity 
         onPress={() => dispatch(logoutUser())}
      >
        <Text style={styles.goBackText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstructionToComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: { width: 150, height: 150, resizeMode: "contain", marginBottom: 40 },
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
    backgroundColor:Colors.darkOrangeColor,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: { fontSize: 14, color: "white", fontWeight: "bold" },
  goBackText: { fontSize: 14, color:Colors.darkOrangeColor, textAlign: "center" },
});
