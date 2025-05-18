import { apiPostRequest } from "../http/post";
import { APP_BACKEND_API } from '@env';

const DRIVER_API_URL = 'https://1cd3-2409-40d0-3034-b1bb-2861-2e44-ebc-4ddd.ngrok-free.app'+"/api/driver";
const USER_API_URL = 'https://1cd3-2409-40d0-3034-b1bb-2861-2e44-ebc-4ddd.ngrok-free.app'+"/api/user";

// const accessToken = async ()=> await AsyncStorage.getItem("accessToken");
// API CALLS
export const signInAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/login`,
    content_type: "application/json",
    data: data,
    // accessToken,
  });

export const registerAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/signup`,
    content_type: "application/json",
    data: data,
  });

export const sendOtpAPI = (data) =>
  apiPostRequest({
    apiUrl: `${USER_API_URL}/auth/sendOTP`,
    content_type: "application/json",
    data: data,
  });
