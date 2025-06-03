// DriverDashboard.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Animated,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { RefreshControl } from "react-native";
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from "../../constants/styles";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const UserHome = ({ navigation }) => {
   const scrollY = useRef(new Animated.Value(0)).current;
     const animatedTopContainerStyle = {
  
    borderBottomLeftRadius: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 30],
      extrapolate: "clamp",
    }),

     
  
  };
const animatedBottomContainerStyle = {
  
    borderTopRightRadius: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 30],
      extrapolate: "clamp",
    }),
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
   <View style={styles.upperBg}>
   <Animated.View style={[styles.upper, animatedTopContainerStyle]}>
    <View style={styles.headerContent}>
      <Text style={styles.headerTitle}></Text>
      <TouchableOpacity>
        <Icon name="bell" size={24} color={Colors.whiteColor} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.searchBox}
    >
      <MaterialIcons name="search" color={Colors.grayColor} size={24} />
      <Text
        numberOfLines={1}
        style={{
          ...Fonts.grayColor18Medium,
          flex: 1,
          marginLeft: Sizes.fixPadding,
        }}
      >
        Search for Vehicle
      </Text>
    </TouchableOpacity>
  </Animated.View>
</View>

<View style={styles.lowerBg}>
  <Animated.View style={[styles.lower, animatedBottomContainerStyle]}>
    <Animated.ScrollView
      refreshControl={
        <RefreshControl
          colors={["#9Bd35A", "#101942"]}
          tintColor="#101942"
        />
      }
      style={styles.content}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 200, backgroundColor: "teal", marginBottom: 2 }} />
      <View style={{ height: 200, backgroundColor: "cyan", marginBottom: 2 }} />
      <View style={{ height: 200, backgroundColor: "teal", marginBottom: 2 }} />
      <View style={{ height: 200, backgroundColor: "cyan", marginBottom: 2 }} />
    </Animated.ScrollView>
  </Animated.View>
</View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  upperBg: {
    height: 200,
    backgroundColor:Colors.whiteColor
  },
upper: {
    height: 200,
    backgroundColor:"#083c5d",
     borderBottomLeftRadius: 100,
  },
//#101942
  lowerBg: {
    flex: 1,
    backgroundColor: "#083c5d",
  },
 lower: {
    flex: 1,
    borderTopRightRadius: 100,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bodyBackColor,
    ...commonStyles.shadow,
    borderRadius: Sizes.fixPadding - 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
  },
   headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 35,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.whiteColor,
  },

});

export default UserHome;
