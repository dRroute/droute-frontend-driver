// RequestDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonAppBar } from '../../components/commonComponents';
import MyStatusBar from '../../components/myStatusBar';

// Define colors at the top for easy customization
const COLORS = {
  primary: '#003B5C', // Dark blue for buttons
  secondary: '#007AFF', // Blue for location markers
  background: '#FFFFFF',
  text: '#333333',
  textLight: '#757575',
  divider: '#EEEEEE',
  star: '#FFC107', // Yellow for star rating
  white: '#FFFFFF',
};

// Location component for reusability
const LocationItem = ({ title, address }) => (
  <View style={styles.locationItem}>
    <View style={styles.locationMarker}>
      <View style={styles.locationDot} />
    </View>
    <View style={styles.locationInfo}>
      <Text style={styles.locationTitle}>{title}</Text>
      <Text style={styles.locationAddress} numberOfLines={1}>{address}</Text>
    </View>
  </View>
);

// Package detail row component for reusability
const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const RequestDetailScreen = ({ navigation }) => {
  // Dummy data
  const requestData = {
    driver: {
      name: 'Driver Name',
      image: null, // Placeholder for driver image
      deliveredItems: 202,
      rating: 4.5,
    },
    description: 'Keep the parcel packed and ensure your phone is not in silent mode.',
    locations: [
      {
        title: 'Pune',
        address: 'Sky bay F wing mahalunge Balewadi...',
      },
      {
        title: 'Navi Mumbai',
        address: 'Sky bay F wing mahalunge Balewadi...',
      },
    ],
    packageDetails: [
      { label: 'Height', value: '10 ft.' },
      { label: 'Width', value: '5 ft.' },
      { label: 'Length', value: '12 ft.' },
      { label: 'Weight', value: '25 Kg' },
      { label: 'Value', value: '₹ 5000' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Request Detail",navigation)}
     
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
     
        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            {requestData.driver.image ? (
              <Image source={{ uri: requestData.driver.image }} style={styles.driverImage} />
            ) : (
              <View style={styles.driverImagePlaceholder}>
                <MaterialIcons name="person" size={30} color={COLORS.textLight} />
              </View>
            )}
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{requestData.driver.name}</Text>
              <Text style={styles.deliveredItems}>Delivered {requestData.driver.deliveredItems} items</Text>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              <MaterialIcons name="star" size={16} color={COLORS.star} />
              <Text style={styles.ratingText}>{requestData.driver.rating}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.reviewsLink}>See Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{requestData.description}</Text>
        </View>
        
        {/* Locations */}
        <View style={styles.locationsContainer}>
          {requestData.locations.map((location, index) => (
            <LocationItem 
              key={index}
              title={location.title}
              address={location.address}
            />
          ))}
        </View>
        
        {/* Package Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details:</Text>
          <View style={styles.detailsContainer}>
            {requestData.packageDetails.map((detail, index) => (
              <DetailRow 
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.negotiationButton}>
          <Text style={styles.buttonText}>Negotiation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
 
  content: {
    flex: 1,
  },
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverDetails: {
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  deliveredItems: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 4,
  },
  reviewsLink: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  locationsContainer: {
    paddingHorizontal: 16,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationMarker: {
    width: 24,
    alignItems: 'center',
  },
  locationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  negotiationButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 4,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestDetailScreen;