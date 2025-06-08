import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "./authThunk";
import { getAllJourneyOrdersAPI, updateOrderRequestStatusAPI } from '../../utils/api/orderApi';

// Post journey Thunk
export const getAllJourneyOrders = createAsyncThunk(
  "order/getAllJourneyOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAllJourneyOrdersAPI(data);
      return response?.data;
    } catch (error) {
      console.log("Error in getAllJourneyOrders:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export const updateOrderRequestStatus = createAsyncThunk(
  "order/updateOrderRequestStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateOrderRequestStatusAPI(data);
      return response?.data;
    } catch (error) {
      console.log("Error in updateOrderRequestStatus:", error);
      return rejectWithValue(handleAxiosError(error));
    }
  }
);