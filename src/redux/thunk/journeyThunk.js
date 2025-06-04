import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "./authThunk";
import { postJourneyAPI } from "../../utils/api/journeyAPI";


// Upload Single File Thunk
export const postJourney = createAsyncThunk(
  "journey/post",
  async (data, { rejectWithValue }) => {
   try {
         const response = await postJourneyAPI(data);
         return response.data;
       } catch (error) {
         console.log("Error in postSignIn:", error);
         return rejectWithValue(handleAxiosError(error));
       }
  }
);