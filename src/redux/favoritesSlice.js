import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  items: []
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: INITIAL_STATE,
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export const favoritesReducer =  favoriteSlice.reducer;
