import { createSlice } from "@reduxjs/toolkit";
import { getSongs, uploadSong } from "../thunks/admin";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "playlist",
  initialState: {
    songs: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get playlist
      .addCase(getSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
      }) // Upload song
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.songs = [...state.songs, action.payload];
      })
      .addCase(uploadSong.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      });
  },
});

export default adminSlice.reducer;
