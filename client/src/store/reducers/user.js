import { createSlice } from "@reduxjs/toolkit";
import {
  dislikeSong,
  followArtist,
  isLoggedIn,
  likeSong,
  loginUser,
  resetPassword,
  signupUser,
  unfollowArtist,
  becomeArtist,
  updateUser,
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  logoutUser,
} from "../thunks/user";
import { dislikePlaylist, likePlaylist } from "../thunks/playlist";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    auth: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // Login user
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      })
      // Sign up
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      // Is loggedIn
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      }) // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data.name = action.payload.user.name;
        state.data.img = action.payload.user.img;
      })
      // Reset password
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload.data.user;
        state.auth = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.auth = false;
      })
      // Like song
      .addCase(likeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })
      // Dislike song
      .addCase(dislikeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })
      // Follow user
      .addCase(followArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      }) // Unfollow user
      .addCase(unfollowArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      }) // Become an Artist
      .addCase(becomeArtist.fulfilled, (state) => {
        state.data.role = "artist";
      }) // Create playlist
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      }) // Get All playlists
      .addCase(getAllPlaylists.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      }) // Delete playlist
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      }) // Like playlist
      .addCase(likePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      }) // Dislike playlist
      .addCase(dislikePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      });
  },
});

export default userSlice.reducer;
