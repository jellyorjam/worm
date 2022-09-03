import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const wishlistSlice = createSlice({
  name: "bookClicked",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      return action.payload
    }
  }
});

export const { setWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer;