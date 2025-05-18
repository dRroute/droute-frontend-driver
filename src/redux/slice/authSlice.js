import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { postSignIn, signIn } from "../thunk/authThunk";

const initialState = {
  user: null,
  loading: false,
  errorMessage: null,
//   accessToken: null,
  userCoordinate: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {  
      state = initialState;
      AsyncStorage.removeItem("user_id");
    //   AsyncStorage.removeItem("accessToken");
      console.log("User logged out successfully");

    },
    
    // New reducer to update userCoordinate
    updateUserCoordinate: (state, action) => {
      state.userCoordinate = action.payload; // Update userCoordinate with the payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    }
});


export const {
  setAuthLoaderFalse,
  logoutUser,
  signUpUser,
  updateUserCoordinate,
} = authSlice.actions;

export default authSlice.reducer;


