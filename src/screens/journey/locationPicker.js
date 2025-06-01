import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import Key from "../../constants/key";
import { Colors, Fonts, commonStyles } from "../../constants/styles";
import { fetchAddressFromCoordinates } from "../../utils/commonMethods";
import { circularLoader } from "../../components/commonComponents";
import { DottedBlackLoader } from "../../components/lottieLoader/loaderView";


const LocationPickerScreen = ({navigation}) => {
  const mapRef = useRef(null);


  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [activeInput, setActiveInput] = useState(null);
  const [sourceText, setSourceText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [sourceCoordinate, setSourceCoordinate] = useState(null);
  const [destinationCoordinate, setDestinationCoordinate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserLocation("source");
  }, []);

  const getUserLocation = async (target) => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Using default location (Delhi).");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const address = await fetchAddressFromCoordinates(latitude, longitude);
    //   setSourceCoordinate()
      if (target === "source") {
        setSourceCoordinate({ latitude, longitude });
        setSourceText(address);
      } else if (target === "destination") {
        setDestinationCoordinate({ latitude, longitude });
        setDestinationText(address);
      }

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: { latitude, longitude },
          zoom: 15,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    } finally {
      setIsLoading(false);
    }
  };



  const fetchSuggestions = async (text, setter) => {
    setter(text);
    if (!text.trim()) {
      setter === setSourceText
        ? setSourceSuggestions([])
        : setDestinationSuggestions([]);
      return;
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        text
      )}&key=${Key.mapApiKey}&components=country:in`;
      const response = await fetch(url);
      const data = await response.json();
      setter === setSourceText
        ? setSourceSuggestions(data.predictions || [])
        : setDestinationSuggestions(data.predictions || []);
    } catch (error) {
       console.log("Autocomplete error:", error);
    }
  };

  const selectPlace = async (placeId, description, type) => {
    setIsLoading(true);
    type === "source"
      ? setSourceSuggestions([])
      : setDestinationSuggestions([]);

    type === "source"
      ? setSourceText(description)
      : setDestinationText(description);

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${Key.mapApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const position = { latitude: lat, longitude: lng };
        if (type === "source") {
          setSourceCoordinate(position);
        } else {
          setDestinationCoordinate(position);
        }
        mapRef.current?.animateCamera({
          center: position,
          zoom: 14,
        });
      }
    } catch (error) {
       console.log("Place details error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapPress = async (event) => {
    setIsLoading(true);
    try {
      if (activeInput === null) {
        Alert.alert("Error", "Please select any Input first.");
        return;
      }

      const { latitude, longitude } = event.nativeEvent.coordinate;
      const address = await fetchAddressFromCoordinates(latitude, longitude);

      if (activeInput === "source") {
        setSourceCoordinate({ latitude, longitude });
        setSourceText(address);
      } else if (activeInput === "destination") {
        setDestinationCoordinate({ latitude, longitude });
        setDestinationText(address);
      }

      setSourceSuggestions([]);
      setDestinationSuggestions([]);
      const position = { latitude: latitude, longitude: longitude };
      mapRef.current?.animateCamera({
        center: position,
        zoom: 14,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log(destinationCoordinate,sourceCoordinate,destinationText,sourceText);
    if(!sourceText && !sourceCoordinate){
        Alert.alert("Source Location is Not selected");
        return;
    }
    if(!destinationText && !destinationCoordinate){
        Alert.alert("Destination Location is Not selected");
        return;
    }
    const data ={
     destinationCoordinate:destinationCoordinate,
     sourceCoordinate:sourceCoordinate,
     destinationAddress:destinationText,
     sourceAddress:sourceText   
    }
    if(destinationCoordinate &&sourceCoordinate && destinationText && sourceText){
    navigation.navigate("PostJourney",{data});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View
          style={[
            styles.inputWrapper,
            activeInput === "source" && {
              borderColor: Colors.primaryColor,
              borderWidth: 2,
            },
          ]}
        >
          <TextInput
            placeholder="Source Location"
            value={sourceText}
            onFocus={() => {
              setActiveInput("source");
              mapRef.current?.animateCamera({
                center: sourceCoordinate,
                zoom: 14,
              });
            }}
            onChangeText={(text) => fetchSuggestions(text, setSourceText)}
            style={[styles.input]}
            placeholderTextColor="#888"
          />
          {!sourceText.length > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => getUserLocation("source")}
            >
              <Ionicons name="locate" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setSourceText("");
                setSourceCoordinate(null);
                setSourceSuggestions([]);
              }}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {sourceSuggestions.length > 0 && (
          <FlatList
            data={sourceSuggestions}
            keyExtractor={(item) => item.place_id}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <Pressable
                style={styles.suggestionItem}
                onPress={() =>
                  selectPlace(item.place_id, item.description, "source")
                }
              >
                <Text>{item.description}</Text>
              </Pressable>
            )}
          />
        )}

        <View
          style={[
            styles.inputWrapper,
            activeInput === "destination" && {
              borderColor: Colors.primaryColor,
              borderWidth: 2,
            },
          ]}
        >
          <TextInput
            placeholder="Destination Location"
            value={destinationText}
            onFocus={() => {
              setActiveInput("destination");
              mapRef.current?.animateCamera({
                center: destinationCoordinate,
                zoom: 14,
              });
            }}
            onChangeText={(text) => fetchSuggestions(text, setDestinationText)}
            style={[styles.input]}
            placeholderTextColor="#888"
          />
          {!destinationText > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => getUserLocation("destination")}
            >
              <Ionicons name="locate" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setDestinationText("");
                setDestinationCoordinate(null);
                setDestinationSuggestions([]);
              }}
            >
              <Ionicons name="close" size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
          )}
        </View>

        {destinationSuggestions.length > 0 && (
          <FlatList
            data={destinationSuggestions}
            keyExtractor={(item) => item.place_id}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <Pressable
                style={styles.suggestionItem}
                onPress={() =>
                  selectPlace(item.place_id, item.description, "destination")
                }
              >
                <Text>{item.description}</Text>
              </Pressable>
            )}
          />
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        onPress={(event) => handleMapPress(event, activeInput)}
      >
        {sourceCoordinate && (
          <Marker coordinate={sourceCoordinate} pinColor="blue" />
        )}

        {destinationCoordinate && (
          <Marker coordinate={destinationCoordinate} pinColor="red" />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => getUserLocation("source")}
      >
        <Ionicons name="locate-outline" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[commonStyles.outlinedButton, styles.submitButton,]}
        onPress={handleSubmit}
      >
        <Text style={{...commonStyles.outlinedButtonText}}>Next</Text>
      
      </TouchableOpacity>
     
      {isLoading&& <DottedBlackLoader />}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchWrapper: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    zIndex: 2,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: "#000",
  },
  suggestionList: {
    backgroundColor: "white",
    maxHeight: 200,
    borderRadius: 4,
    elevation: 5,
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: "absolute",
    bottom: 160,
    right: 20,
    backgroundColor:Colors.primaryColor,
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  submitButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,

  },
});

export default LocationPickerScreen;
