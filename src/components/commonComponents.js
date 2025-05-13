import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from "../constants/styles";

import OTPTextView from "react-native-otp-textinput";
import RNModal from "react-native-modal";
import { openCamera, openGallery, removeImage } from "../utils/commonMethods";
export function authInput(label, value, setter, placeholder, type) {
  const keyboardType =
    type === "number"
      ? "phone-pad"
      : type === "email"
      ? "email-address"
      : "default";

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

export function authPassword(
  label,
  value,
  setter,
  placeholder,
  secureText,
  setSecureText
) {
  return (
    <View
      style={[
        styles.inputContainer,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
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
export function otpFields(otpInput, setOtpInput) {
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

export const renderImageBox = (
  label,
  setter,
  apiRespUri,
  showFullImage,
  setCurrentImageSetter,
  setCurrentImageLabel,
  setBottomSheetVisible,
  imageloading
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (apiRespUri) {
          showFullImage(apiRespUri);
        }
      }}
      style={{ alignItems: "center", marginBottom: 20 }}
    >
      <View style={[styles.imageBox, { borderRadius: 4 }]}>
        {imageloading === label ? (
          <ActivityIndicator size={40} color="#ccc" />
        ) : apiRespUri ? (
          <Image
            source={{ uri: apiRespUri }}
            style={[styles.imageStyle, { borderRadius: 4 }]}
          />
        ) : (
          <Ionicons name="image-outline" size={50} color="#bbb" />
        )}

        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => {
            setCurrentImageSetter(() => setter);
            setCurrentImageLabel(label);
            setBottomSheetVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {label !== "avatar" && <Text style={styles.imageLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};

 export function ImageBottomSheet(currentImageSetter,currentImageLabel,isBottomSheetVisible,setBottomSheetVisible,setImageLoading) {
    return (
      <RNModal
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setBottomSheetVisible(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.sheetOption}
            onPress={() => openCamera(currentImageSetter,currentImageLabel,setBottomSheetVisible,setImageLoading)}
          >
            <Ionicons name="camera" size={22} color={Colors.primaryColor} />
            <Text style={styles.sheetOptionText}>Use Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetOption}
            onPress={() => openGallery(currentImageSetter, currentImageLabel,setBottomSheetVisible,setImageLoading)}
          >
            <Ionicons name="image" size={22} color={Colors.primaryColor} />
            <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetOption}
            onPress={() => removeImage(currentImageSetter,setBottomSheetVisible)}
          >
            <Ionicons name="trash-outline" size={22} color="red" />
            <Text style={[styles.sheetOptionText, { color: "red" }]}>
              Remove Image
            </Text>
          </TouchableOpacity>
        </View>
      </RNModal>
    );
  }


export function commonLabel(label, optional) {
  return (
    <Text style={styles.sectionLabel}>
      {label}
      {optional ? (
        <Text style={styles.optional}> (Optional)</Text>
      ) : (
        <Text style={styles.label}>*</Text>
      )}
    </Text>
  );
}

export function typeSection(type, setType, label, value1, value2, optional) {
  return (
    <>
      {commonLabel(label, optional)}
      <View style={styles.TypeContainer}>
        <TouchableOpacity
          style={[styles.TypeButton, type === value1 && styles.selectedButton]}
          onPress={() => {
            setType(value1);
          }}
        >
          <Text
            style={[
              styles.TypebuttonText,
              type === value1 && styles.selectedButtonText,
            ]}
          >
            Individual
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.TypeButton, type === value2 && styles.selectedButton]}
          onPress={() => setType(value2)}
        >
          <Text
            style={[
              styles.TypebuttonText,
              type === value2 && styles.selectedButtonText,
            ]}
          >
            Organization
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function textArea(value, setter, placeholder, label, optional) {
  return (
    <>
      {commonLabel(label, optional)}
      <TextInput
        style={[styles.boxInput, styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        multiline
        value={value}
        onChangeText={(text) => {
          setter(text);
        }}
        // maxLength={100}
      />
    </>
  );
}
export function inputBox(value, setter, placeholder, label, optional) {
  return (
    <>
      {commonLabel(label, optional)}
      <TextInput
        style={styles.boxInput}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={(text) => {
          setter(text);
        }}
      />
    </>
  );
}
export function commonAppBar(label, navigation) {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{label}</Text>
      <View style={{ width: 20 }} />
    </View>
  );
}



export function fullImageContainer(
  modalVisible,
  setModalVisible,
  selectedImage
) {
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setModalVisible(false)}
        >
          <Ionicons name="close-circle-outline" size={50} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export function circularLoader(isLoading) {
  if (!isLoading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
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
    fontWeight: "700",
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
  imageBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#f9f9f9",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  editIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    padding: 3,
  },
  imageLabel: {
    textAlign: "center",
    marginTop: 6,
    color: "#444",
    fontSize: 12,
  },
  TypeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  TypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },

  TypebuttonText: {
    fontSize: 12,
    color: "#555",
  },
  selectedButton: {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
  },
  selectedButtonText: {
    color: "white",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: "#F4721E",
    marginBottom: 5,
  },
  optional: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#888",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  boxInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
    height: 45,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.bodyBackColor,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0eb",
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
    fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
  },
    bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  sheetOptionText: {
    fontSize: 16,
    marginLeft: 12,
    color: Colors.primaryColor,
  },
   loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(67, 92, 128, 0.43)', // Optional: semi-transparent overlay
    zIndex: 999,
  },
});
