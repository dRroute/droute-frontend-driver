import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllJourneyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚧 Under Development</Text>
      <Text style={styles.description}>
        This feature is currently under development. Please check back later.
      </Text>
    </View>
  );
};

export default AllJourneyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
