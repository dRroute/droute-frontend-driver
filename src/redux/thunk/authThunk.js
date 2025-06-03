import { createAsyncThunk } from "@reduxjs/toolkit";
import { completeProfileAPI, getDriverByDriverIdAPI, resetPasswordAPI, signInAPI } from "../../utils/api/authApi";
import { registerAPI } from "../../utils/api/authApi";
import { sendOtpAPI } from "../../utils/api/authApi";
import axios from "axios";

// Async Thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signInAPI(data);

      if (response?.status === 200 || response?.status === 201) {
        // console.log("API Response:", response.data);
        return response?.data;
      } else {
        throw new Error(response?.data?.message || "OTP not sent, try again");
      }
    } catch (error) {
      console.log("Error in postSignIn:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Get driver By Id Thunk
export const getDriverByDriverId = createAsyncThunk(
  "auth/getDriverByDriverId",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await getDriverByDriverIdAPI(driverId);

      if (response?.status === 200 || response?.status === 201) {
        // console.log("API Response:", response.data);
        return response?.data;
      } else {
        throw new Error(response?.data?.message || "OTP not sent, try again");
      }
    } catch (error) {
      console.log("Error in postSignIn:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Sign-up Thunk
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);
     console.log("this is response.status == "+response?.status);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "OTP verification failed"
        );
      }
    } catch (error) {
      
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

//Reset-Password Thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(data);
     console.log("this is response.status == "+response?.status);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "Failed to update Password"
        );
      }
    } catch (error) {
      
      return rejectWithValue(handleAxiosError(error));
    }
  }
);


//Complete-Profile Thunk
export const completeProfile = createAsyncThunk(
  "auth/completeProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await completeProfileAPI(data);
     console.log("this is response.status == "+response?.status);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "Failed to update Password"
        );
      }
    } catch (error) {
      
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Send OTP Thunk
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtpAPI(data);
      return response?.data;
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error occured in axios', error);

        if (error.response) {
          // Server responded with a status code outside 2xx
           console.log(error.response.data);
          return  error.response.data;

        } else if (error.request) {
          // No response received from the server
           console.log("Network Error: No response received", error.request);
          const data =  {
            message: "Oops! Something went wrong with the network. Please try again later.",
            statusCode: 500,
            data: null,
            errorCode: "NETWORK_ERROR",
            timestamp: Date.now(),
          }
          return data;
        } else {
          // Something happened while setting up the request
           console.log("Request Error:", error.message);
          return error.message;
        }
      } else {
        // Non-Axios error (e.g. bug in your code)
         console.log("Unexpected Error:", error);
      }

    }
  }
);


export const handleAxiosError = (error) => {
   if (axios.isAxiosError(error)) {
        console.log('error occured in axios', error);

        if (error.response) {
          // Server responded with a status code outside 2xx
           console.log(error.response.data);
          return  error.response.data;

        } else if (error.request) {
          // No response received from the server
          console.log("Network Error: No response received", error.request);
          const data =  {
            message: "Oops! Something went wrong with the network. Please try again later.",
            statusCode: 500,
            data: null,
            errorCode: "NETWORK_ERROR",
            timestamp: Date.now(),
          }
          return data;
        } else {
          // Something happened while setting up the request
           console.log("Request Error:", error.message);
          return error.message;
        }
      } else {
        // Non-Axios error (e.g. bug in your code)
        console.log("Unexpected Error:", error);
      }
}
