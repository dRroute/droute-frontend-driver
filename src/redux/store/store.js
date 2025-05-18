import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import authReducer, { restoreUser } from ;
import authReducer, { restoreUser } from "../slice/authSlice";
import snackbarReducer, { showSnackbar } from "../slice/snackbarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const loadUserData = async () => {
  try {
    const user_id = await AsyncStorage.getItem("user_id");
    // const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("user key in store", user_id);
    // console.log("Access token in store", accessToken);
    // if (user_id && accessToken) {
    if (user_id) {
      await store.dispatch(getUserByKey(user_id));
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    store.dispatch(
      showSnackbar({ message: "Logged-In failed. Try again", type: "error" })
    );
  }
};

loadUserData();

export default store;
