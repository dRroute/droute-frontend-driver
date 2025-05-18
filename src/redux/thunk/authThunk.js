import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInAPI } from "../../utils/api/authApi";
import { registerAPI } from "../../utils/api/authApi";
import { sendOtpAPI } from "../../utils/api/authApi";
// Async Thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signInAPI(data);

      if (response.status === 200 || response.status === 201) {
        // console.log("API Response:", response.data);
        return response.data;
      } else {
        throw new Error(response.data?.message || "OTP not sent, try again");
      }
    } catch (error) {
      console.log("Error in postSignIn:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);

      if (response.data.code === 200 || response.data.code === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "OTP verification failed"
        );
      }
    } catch (error) {
      console.log("Error in register:", error);

      // Always extract message properly even in catch
      const errorMessage =
        error?.response?.data?.message || // API sent error message
        error?.message || // JS error message
        "Registration failed"; // fallback message

      return rejectWithValue(errorMessage);
    }
  }
);
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtpAPI(data);
      return response?.data;
      // if (response.status === 200 || response.status === 201) {
      //   return response?.data;
      // } else {
      //   return rejectWithValue(
      //     response?.data?.message || "OTP verification failed"
      //   );
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code outside 2xx
          console.error(
            "Server Error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // No response received from the server
          console.error("Network Error: No response received", error.request);
        } else {
          // Something happened while setting up the request
          console.error("Request Error:", error.message);
        }
      } else {
        // Non-Axios error (e.g. bug in your code)
        console.error("Unexpected Error:", error);
      }

      console.log("Error in register:", error);

      // Always extract message properly even in catch
      const errorMessage =
        error?.response?.data?.message || // API sent error message
        error?.message || // JS error message
        "OTP verification failed"; // fallback message

      return rejectWithValue(errorMessage);
    }
  }
);
