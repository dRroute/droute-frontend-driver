import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Colors, commonStyles } from "../../constants/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyStatusBar from "../../components/myStatusBar";
import { actionOverlay, circularLoader, commonAppBar, commonLabel, fullImageContainer, ImageBottomSheet, inputBox, renderImageBox, textArea, typeSection } from "../../components/commonComponents";
import { showFullImageFunction } from "../../utils/commonMethods";
const image = "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg";


const EditProfile= () => {

  const [imageloading, setImageLoading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);
  const [currentImageLabel, setCurrentImageLabel] = useState(null);
  const navigation = useNavigation();
  const [showDialogue, setshowDialogue] = useState(false);
//  these are payload 
  const [legalName, setLegalName] = useState(null);
  const [address, setAddress] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [avatarURI, setAvatarURI] = useState(null);
  const [aadhaarImageURI, setAadhaarImageURI] = useState(image);
  const [DLImageURI, setDLImageURI] = useState(image);
  const[DLnumber,setDLNumber] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState(null);
  const[RCnumber,setRCNumber] = useState(null);
  const[RCimageURI,setRCImageURI] = useState(image);

  const handleSubmit = async () => {};

  const selectOnMap = () => {
    navigation.push("PickLocation", {
      addressFor: "stationAddress",
      setAddress: (newAddress) => setAddress(newAddress),
      setCoordinate: (newCoordinate) => setCoordinate(newCoordinate),
    });
  };



  return (
    <View style={styles.mainContainer}>
        <MyStatusBar />
        {commonAppBar("Edit Profile",navigation)}
      <ScrollView contentContainerStyle={styles.container}>
        
            {renderImageBox(
              "avatar",
              setAvatarURI,
              avatarURI,
              showFullImageFunction,
              setCurrentImageSetter,
              setCurrentImageLabel,
              setBottomSheetVisible,
              imageloading,
              setSelectedImage,
              setModalVisible,
              true
            )}
       
    
        {inputBox?.(legalName,setLegalName,"Enter Name As per Aadhaar or Legal Name","Name As per Aadhaar or Legal Name",true,"default")}
        {inputBox?.(aadhaarNumber,setAadhaarNumber,"Enter Aadhaar Number","Aadhaar Number",true,"numeric")}
        {inputBox?.(DLnumber,setDLNumber,"Enter Driving License Number","Driving License Number",true,"default")}
        {inputBox?.(RCnumber,setRCNumber,"Enter RC Number","RC Number",true,"default")}
        {textArea?.(address,setAddress,"Home/Street/Locality, City, State, Pincode","Address",true,)}
        {docImageSection?.()}
        <TouchableOpacity
          style={{ ...commonStyles.button, marginBottom: 50 }}
         onPress={() => {
              setshowDialogue(true);
            }} 
        >
          <Text style={{ ...commonStyles.buttonText }}>Submit</Text>
        </TouchableOpacity>
        {fullImageContainer(modalVisible,setModalVisible ,selectedImage)}
        {ImageBottomSheet(currentImageSetter,currentImageLabel,isBottomSheetVisible,setBottomSheetVisible,setImageLoading)}
      </ScrollView>
      {circularLoader(isLoading)}
      {actionOverlay(handleSubmit,showDialogue,setshowDialogue,"Are you sure you want to update?",Colors.primaryColor)}
    </View>
  );
  function docImageSection() {
    return (
      <>
        {commonLabel("Upload Your Documents", true)}
        <View style={styles.imageContainer}>
          {renderImageBox(
            "Aadhaar",
            setAadhaarImageURI,
            aadhaarImageURI,
            showFullImageFunction,
            setCurrentImageSetter,
            setCurrentImageLabel,
            setBottomSheetVisible,
            imageloading,
            setSelectedImage,
            setModalVisible
          )}
            {renderImageBox(
            "Drivering License",
            setDLImageURI,
            DLImageURI,
            showFullImageFunction,
            setCurrentImageSetter,
            setCurrentImageLabel,
            setBottomSheetVisible,
            imageloading,
            setSelectedImage,
            setModalVisible
          )}
          {renderImageBox(
                "RC",
                setRCImageURI,
                RCimageURI,
                showFullImageFunction,
                setCurrentImageSetter,
                setCurrentImageLabel,
                setBottomSheetVisible,
                imageloading,
                setSelectedImage,
              setModalVisible
            )}
        </View>
      </>
    );
  }
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 20,
  },

  backButton: {
    marginLeft: 10,
    marginRight: 15,
  },


 
  photoDescription: {
    fontSize: 10,
    color: "#666",
    // marginBottom: 12,
  },
  imageContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
    flexWrap: "wrap",
  },




});
