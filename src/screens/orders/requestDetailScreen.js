
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { actionOverlay, commonAppBar } from '../../components/commonComponents';
import MyStatusBar from '../../components/myStatusBar';
import { Colors, commonStyles, Fonts } from '../../constants/styles';



const RequestDetailScreen = ({ navigation }) => {
  const [isAcceptModalVisible,setAcceptModalVisible]=useState(false);
  const [isRejectModalVisible,setRejectModalVisible]=useState(false);
  const image = null;
 const handleAccept=()=>{

 }
const handleReject=()=>{

}

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Request Detail", navigation)}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            {image ? (
              <Image source={{ uri: image }} style={styles.userImage} />
            ) : (
              <View style={styles.userImagePlaceholder}>
                <MaterialIcons name="person" size={26} color={Colors.grayColor} />
              </View>
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Alok</Text>
              <Text style={{...Fonts.grayColor12Medium,}}>+91 9767897556</Text>
            </View>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen")} style={styles.chatIcon}>
            <MaterialIcons name="chat" size={26} color="teal" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
         <View style={styles.locationsContainer}>
          <LocationItem title={"Pickup Address"} address={"Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041 Vadgaon Bk Pune 411041"} />
          <LocationItem title={"Delivery Addess"} address={"Vadgaon Bk Pune 411041 411041 Vadgaon Bk Pune 411041"} />
         </View>

        <View style={styles.section}>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Package Details:</Text>
          <View style={styles.divider} />
          <View style={{ marginTop: 8,}}>
            <DetailRow label={"Height"} value={"20 m"} />
            <DetailRow label={"Width"} value={"10 m"} />
            <DetailRow label={"Length"} value={"19 m"} />
            <DetailRow label={"Weight"} value={"20 Kg"} />
            <DetailRow label={"Expected Value"} value={"400 $"} />
            <DetailRow label={"Offered Value"} value={"500 $"} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={()=>setRejectModalVisible(true)} style={{...commonStyles.outlinedButton,flex: 1,}}>
          <Text style={{...commonStyles.outlinedButtonText}}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setAcceptModalVisible(true)} style={{...commonStyles.button,flex: 1,}}>
          <Text style={{...commonStyles.buttonText}}>Accept</Text>
        </TouchableOpacity>
      </View>
      {actionOverlay(handleAccept,isAcceptModalVisible,setAcceptModalVisible,"Do You Want to Accept ?",Colors.primaryColor)}
      {actionOverlay(handleReject,isRejectModalVisible,setRejectModalVisible,"Do You Want to Reject ?",Colors.darkOrangeColor)}
    </SafeAreaView>
  );
  function LocationItem ({ title, address }){
  return (
  <View style={styles.locationItem}>
    <View style={styles.locationMarker}>
      <MaterialIcons name="location-on" size={20} color="teal" />
    </View>
    <View style={styles.locationInfo}>
      <Text style={{ ...Fonts.blackColor14Bold, marginBottom: 4,}}>{title}</Text>
      <Text style={{...Fonts.grayColor12Medium,}} >{address}</Text>
    </View>
  </View>
)};
function DetailRow ({ label, value }){
  return(
  <View style={{ ...commonStyles.rowSpaceBetween,paddingVertical: 8,}}>
    <Text style={{ ...Fonts.blackColor12SemiBold,}}>{label}:</Text>
    <Text style={{ ...Fonts.blackColor12SemiBold,}}>{value}</Text>
  </View>)
};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  content: {
    flex: 1,
  },
  userContainer: {
  ...commonStyles.rowSpaceBetween,
    padding: 16,
  },
  userInfo: {
   ...commonStyles.rowAlignCenter
  },
  userImagePlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.extraLightGrayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    ...Fonts.blackColor16Bold,
    color: Colors.primaryColor,
    marginBottom: 4,
  },
  chatIcon: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.extraLightGrayColor,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
   ...Fonts.blackColor14Bold,
    marginVertical: 8,
  },
  locationsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationMarker: {
    width: 24,
    alignItems: 'center',
  },
  
  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },
 
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap:10,
    borderTopColor: Colors.extraLightGrayColor,
  },
 

});

export default RequestDetailScreen;
