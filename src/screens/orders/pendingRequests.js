// ViewAllUserPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Colors,
  screenWidth,
  commonStyles,
  Sizes,
  Fonts,
} from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNModal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RefreshControl } from "react-native";
import { UserCardLoader, UserInfo } from "../../components/userCards";

const USERS = [
  {
    id: 1,
    user_key: "user1key",
    owner_legal_name: "User One",
    mobile_number: "+910000000001",
    status: "New",
    role: "user",
  },
  {
    id: 2,
    user_key: "user2key",
    owner_legal_name: "User Two",
    mobile_number: "+910000000002",
    status: "Active",
    role: "user",
  },
  {
    id: 3,
    user_key: "user3key",
    owner_legal_name: "User Three",
    mobile_number: "+910000000003",
    status: "Inactive",
    role: "vendor",
  },
  {
    id: 4,
    user_key: "user4key",
    owner_legal_name: "User Four",
    mobile_number: "+910000000004",
    status: "Blocked",
    role: "vendor",
  },
  {
    id: 5,
    user_key: "user5key",
    owner_legal_name: "User Five",
    mobile_number: "+910000000005",
    status: "New",
    role: "user",
  },
  {
    id: 6,
    user_key: "user6key",
    owner_legal_name: "User Six",
    mobile_number: "+910000000006",
    status: "Active",
    role: "user",
  },
  {
    id: 7,
    user_key: "user7key",
    owner_legal_name: "User Seven",
    mobile_number: "+910000000007",
    status: "Inactive",
    role: "vendor",
  },
  {
    id: 8,
    user_key: "user8key",
    owner_legal_name: "User Eight",
    mobile_number: "+910000000008",
    status: "Blocked",
    role: "vendor",
  },
  {
    id: 9,
    user_key: "user9key",
    owner_legal_name: "User Nine",
    mobile_number: "+910000000009",
    status: "New",
    role: "user",
  },
  {
    id: 10,
    user_key: "user10key",
    owner_legal_name: "User Ten",
    mobile_number: "+910000000010",
    status: "Active",
    role: "vendor",
  },
];

const PendingRequests = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(USERS);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.owner_legal_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user?.mobile_number?.includes(searchQuery);
    return matchesSearch ;
  });

  const handleCardPress=()=>{
    navigation.navigate("RequestDetailScreen");
  // console.log("card pressed")
  }
  const handleRefresh = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar />

      {searchBar()}
      {isLoading ? (<UserCardLoader count={10} />):(
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={filteredUsers}
        renderItem={({ item }) => <UserInfo user={item} handleCardPress={handleCardPress}/>}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="account-search" size={60} color={Colors.grayColor} />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />)}
    </SafeAreaView>
  );



function searchBar() {
    return (
      <View
        style={{
          marginVertical:10,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={[styles.searchBar, { flex: 1 }]}>
          <MaterialIcons
            name="search"
            size={24}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search Users or Vendors...."
            placeholderTextColor="#888"
            style={{
              flex: 1,
              padding: 12,
              fontSize: 12,
            }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
    
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor,
    paddingHorizontal: Sizes.fixPadding * 0.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.bodyBackColor,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: Colors.blackColor,
  },
  listContainer: {
    paddingBottom: 16,
    flexGrow: 1
  },
  separator: {
    height: 1,
    backgroundColor: Colors.extraLightGrayColor,
    marginLeft: 78, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.grayColor,
    marginTop: 12,
  },

});

export default PendingRequests;
