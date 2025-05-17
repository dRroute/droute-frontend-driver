import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { Alert } from "react-native";
import Key from "../constants/key";
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

export const openGallery = async (currentImageSetter,label, setImageLoading, setBottomSheetVisible) => {
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
      currentImageSetter(imageUri);
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

export const openCamera = async (currentImageSetter,label, setImageLoading, setBottomSheetVisible) => {
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
      currentImageSetter(imageUri)
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






export const getUserLocation = async ({ setRegion, setCurrentLocation, mapRef, setErrorMsg }) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      const fallback = {
        latitude: 28.6139,
        longitude: 77.209,
      };
      setRegion({ ...fallback, latitudeDelta: 0.05, longitudeDelta: 0.05 });
      setCurrentLocation(fallback);
      return fallback; 
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setRegion({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 });
    setCurrentLocation({ latitude, longitude });

    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: { latitude, longitude },
          zoom: 15,
        },
        { duration: 0 }
      );
    }
   console.log("user Current location",latitude, longitude );
    return { latitude, longitude };
  } catch (error) {
    console.error("Error requesting location:", error);
    const fallback = {
      latitude: 28.6139,
      longitude: 77.209,
    };
    setRegion({ ...fallback, latitudeDelta: 0.05, longitudeDelta: 0.05 });
    setCurrentLocation(fallback);
    return fallback;
  }
};


export const fetchAddressFromCoordinates = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Key.mapApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};


export const fetchCity = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Key.mapApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      const fullAddress = data.results[0].formatted_address;

      // Extract a keyword (e.g., city or locality)
      const locationComponents = data.results[0].address_components;
      const cityComponent = locationComponents.find(component =>
        component.types.includes("locality")
      );
      const city = cityComponent ? cityComponent.long_name : "nature";

      return { fullAddress, city };
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};


export const fetchImageForCity = async () => {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=truck&orientation=landscape&client_id=${Key.unsplashApiKey}`);
  const data = await response.json();
  if (data && data.urls) {
   return data.urls.regular; 
}};

export const trimText = (text, maxLength) => {
  if (typeof text !== 'string') return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
