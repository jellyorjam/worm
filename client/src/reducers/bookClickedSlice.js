import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const bookClickedSlice = createSlice({
  name: "bookClicked",
  initialState,
  reducers: {
    setBookClicked: (state, action) => {
      state.book = action.payload
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload
    },
    setLibrary: (state, action) => {
      state.library = action.payload
    },
    resetBookClicked: () => initialState
  }
});

export const {setBookClicked, setWishlist, setLibrary, resetBookClicked} = bookClickedSlice.actions

export default bookClickedSlice.reducer;