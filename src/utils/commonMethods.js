import * as ImagePicker from 'expo-image-picker';
  export const setupImagePicker = (file) => {
  // console.log("inside setup image");
  const fileExtension = file.split(".").pop().toLowerCase(); // Get the file extension
  const supportedFormats = ["jpg", "jpeg", "png"]; // Supported formats

  if (!supportedFormats.includes(fileExtension)) {
    throw new Error(
      "Unsupported file format. Please upload a JPG or PNG image."
    );
  }
  // console.log("File extension passed:", fileExtension);
  const mimeType = `image/${fileExtension}`; // Dynamically set MIME type
  const fileName = `avatar.${fileExtension}`; // Dynamically set file name

  // Prepare the form data for the API call
  const formData = new FormData();
  formData.append("file", {
    uri: file,
    name: fileName,
    type: mimeType,
  });

  return formData;
};

export const openGallery = async (label, setImageLoading, setBottomSheetVisible) => {
  setImageLoading(label);
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: label === "avatar" ? [1, 1] : undefined,
      quality: 0.1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await setupImagePicker(imageUri); 
      return imageUri;
    }
  } catch (error) {
    console.log("Error uploading file:", error);
    Alert.alert("Error", "Upload failed. Please try again.");
  } finally {
    setImageLoading(null);
    setBottomSheetVisible(false);
  }

  return null;
};

export const openCamera = async (label, setImageLoading, setBottomSheetVisible) => {
  setImageLoading(label);
  try {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      allowsEditing: true,
      aspect: label === "avatar" ? [1, 1] : undefined,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await setupImagePicker(imageUri); 
      return imageUri;
    }
  } catch (error) {
    console.log("Error uploading file:", error);
    Alert.alert("Error", "Upload failed. Please try again.");
  } finally {
    setImageLoading(null);
    setBottomSheetVisible(false);
  }

  return null;
};


 export const removeImage = (setter,setBottomSheetVisible) => {
    setter(null);
    setBottomSheetVisible(false);
  };

   export const showFullImageFunction = (uri,setSelectedImage,setModalVisible) => {
      if (!uri) return;
      setSelectedImage(uri);
      setModalVisible(true);
    };