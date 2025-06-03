import { apiPostRequest } from "../http/post";
import { APP_BACKEND_API } from "@env";
import { apiGetRequest } from "../http/get";
import { apiPutRequest } from "../http/put";
import { DRIVER_API_URL } from "./authApi";


// const USER_API_URL = 'https://ba36-2409-40d0-3034-b1bb-9c5f-b08d-66b5-ae62.ngrok-free.app'+"/api/user";

// const accessToken = async ()=> await AsyncStorage.getItem("accessToken");
// API CALLS
export const uploadSingleDocumentAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/document/uploadToGoogleDrive?driverId=${data?.driverId}&documentName=${data?.documentName}`,
    content_type: "multipart/form-data",
    data: data?.file,
    accessToken: null,
  });
