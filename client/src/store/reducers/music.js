import { createSlice } from "@reduxjs/toolkit";
import { getMusic, getSongs, uploadSong } from "../thunks/admin";
import { toast } from "react-toastify";
import { getAllArtists } from "../thunks/user";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    music: null,
    artists: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get playlist
      .addCase(getMusic.fulfilled, (state, action) => {
        state.music = action.payload;
      })
      .addCase(getAllArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
      });
  },
});

export default musicSlice.reducer;
