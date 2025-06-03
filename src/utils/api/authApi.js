import { apiPostRequest } from "../http/post";
import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";

export const DRIVER_API_URL = 'https://f411-2409-40d0-3034-b1bb-78d8-5b72-4d91-64db.ngrok-free.app'+"/api/driver";
export const USER_API_URL = 'https://f411-2409-40d0-3034-b1bb-78d8-5b72-4d91-64db.ngrok-free.app'+"/api/user";

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

export const getDriverByDriverIdAPI = (driverId) =>
  apiGetRequest({
    apiUrl: `${DRIVER_API_URL}/${driverId}`,
    content_type: "application/json",
  });

export const sendOtpAPI = (data) =>
  apiPostRequest({
    apiUrl: `${USER_API_URL}/auth/sendOTP`,
    content_type: "application/json",
    data: data,
  });
export const resetPasswordAPI = (data) =>
  apiPutRequest({
    apiUrl: `${DRIVER_API_URL}/reset-password`,
    content_type: "application/json",
    data: data,
  });
