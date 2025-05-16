
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
import { Overlay } from "@rneui/themed";
import {
  Colors,
  commonStyles,
  Fonts,
  screenWidth,
  Sizes,
} from "../constants/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export   function UserInfo({ user ,handleCardPress}) {
    return (
      <TouchableOpacity
        onPress={handleCardPress}
        style={styles.userItem}
      >
        {user?.avatar ? (
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        ) : (
          <Icon
            name="account-circle"
            size={50}
            color="#ccc"
            style={styles.avatar}
          />
        )}

          <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.owner_legal_name || "N/A"}</Text>
          <Text style={styles.userMobile}>{user?.mobile_number || "N/A"}</Text>
         </View>

        <View style={[styles.timeBadge]}>
          <Text
            style={[
              styles.timeText,
              { color: Colors.grayColor},
            ]}
          >
           20 min ago
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
export function UserCardLoader({ count = 5 }) {
  return (<></>
    
  );
}



const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 3,
    ...commonStyles.shadow,
    borderColor: Colors.extraLightGrayColor,
    borderWidth: 0.1,
    borderTopWidth: 1.0,
  },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    userInfo: {
      flex: 1,
      marginLeft: 12,
    },
    userName: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors.primaryColor,
      marginBottom: 4,
    },
    userMobile: {
      fontSize: 12,
      color: Colors.grayColor,
    },
    timeBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
      timeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
    
})