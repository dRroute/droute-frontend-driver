import { apiPostRequest } from "../http/post";
// import { APP_BACKEND_API } from '@env';
import {apiGetRequest} from '../http/get';
import { apiPutRequest } from "../http/put";
import Key from "../../constants/key"; // Import Key object

// Constants
const { DRIVER_API_URL, ORDER_API_URL } = Key;



// Get All journey Orders API
export const getAllJourneyOrdersAPI = (journeyId) =>
  apiGetRequest({
    apiUrl: `${ORDER_API_URL}/journey/${journeyId}?status=ALL`,     
    content_type: "application/json",
    accessToken: null,
}); 

// Update Order status API
export const updateOrderRequestStatusAPI = (data) =>
  apiPutRequest({
    apiUrl: `${ORDER_API_URL}/${data?.orderId}?status=${data?.status}`,     
    content_type: "application/json",
    accessToken: null,
}); 