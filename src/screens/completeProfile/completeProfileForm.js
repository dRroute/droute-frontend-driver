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
import { circularLoader, commonAppBar, commonLabel, fullImageContainer, ImageBottomSheet, inputBox, renderImageBox, textArea, typeSection } from "../../components/commonComponents";
import { showFullImageFunction } from "../../utils/commonMethods";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selector/authSelector";
const image = `https://drive.google.com/uc?export=view&id=...&t=${Date.now()}`;

const CompleteProfileForm = () => {

  const [imageloading, setImageLoading] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);
  const [currentImageLabel, setCurrentImageLabel] = useState(null);
  const navigation = useNavigation();
const dispatch=useDispatch();
const user= useSelector(selectUser);
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
  // console.log("this is user id",user.driverId);




  const handleSubmit = async () => {



  };

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
        {commonAppBar("Complete Detail",navigation)}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarSection}>
         
          {commonLabel("Upload Your Photo", true)}
          <Text style={styles.photoDescription}>
            It will Appear As Your Profile Page.
          </Text>
          <View style={styles.imageContainer}>
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
            
            )}
          </View>
        </View>

        {inputBox?.(legalName,setLegalName,"Enter Name As per Aadhaar or Legal Name","Name As per Aadhaar or Legal Name",false)}
        {inputBox?.(aadhaarNumber,setAadhaarNumber,"Enter Aadhaar Number","Aadhaar Number",false)}
        {inputBox?.(DLnumber,setDLNumber,"Enter Driving License Number","Driving License Number",false)}
        {inputBox?.(RCnumber,setRCNumber,"Enter RC Number","RC Number",false)}
        {textArea?.(address,setAddress,"Home/Street/Locality, City, State, Pincode","Address",false)}
        {docImageSection?.()}
        <TouchableOpacity
          style={{ ...commonStyles.button, marginBottom: 50 }}
          onPress={handleSubmit}
        >
          <Text style={{ ...commonStyles.buttonText }}>Submit</Text>
        </TouchableOpacity>
        {fullImageContainer(modalVisible,setModalVisible ,selectedImage)}
        <ImageBottomSheet
         currentImageSetter={currentImageSetter}
         currentImageLabel={currentImageLabel}
         isBottomSheetVisible={isBottomSheetVisible}
         setBottomSheetVisible={setBottomSheetVisible}
         setImageLoading={setImageLoading}
         user={user}
         dispatch={dispatch}/>
      </ScrollView>
     {circularLoader(isLoading)}
    </View>
  );

  function docImageSection() {
    return (
      <>
        {commonLabel("Upload Your Documents", false)}
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
            setModalVisible,
          )}
            {renderImageBox(
            "DL",
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

export default CompleteProfileForm;

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
