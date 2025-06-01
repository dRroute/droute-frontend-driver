import { apiPostRequest } from "../http/post";
import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";

const DRIVER_API_URL = 'https://ba36-2409-40d0-3034-b1bb-9c5f-b08d-66b5-ae62.ngrok-free.app'+"/api/driver";
const USER_API_URL = 'https://ba36-2409-40d0-3034-b1bb-9c5f-b08d-66b5-ae62.ngrok-free.app'+"/api/user";

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
