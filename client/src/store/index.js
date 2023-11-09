import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import artistReducer from "./reducers/artist";
import playerReducer from "./reducers/player";
import playlistReducer from "./reducers/playlist";
import queueReducer from "./reducers/queue";
import adminReducer from "./reducers/admin";
import musicReducer from "./reducers/music";

export const store = configureStore({
  reducer: {
    user: userReducer,
    artist: artistReducer,
    player: playerReducer,
    playlist: playlistReducer,
    queue: queueReducer,
    admin: adminReducer,
    music: musicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
