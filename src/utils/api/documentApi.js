import { apiPostRequest } from "../http/post";
import { APP_BACKEND_API } from "@env";
import { apiGetRequest } from "../http/get";
import { apiPutRequest } from "../http/put";
import Key from "../../constants/key"; // Import Key object

// Constants
const { DRIVER_API_URL } = Key;
// API CALLS
export const uploadSingleDocumentAPI = (data) =>
  apiPostRequest({
    apiUrl: `${DRIVER_API_URL}/document/uploadToGoogleDrive?driverId=${data?.driverId}&documentName=${data?.documentName}`,
    content_type: "multipart/form-data",
    data: data?.file,
    accessToken: null,
  });
