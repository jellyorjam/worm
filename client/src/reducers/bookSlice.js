import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return action.payload
    },
    editBooks: (state, action) => {
    state[action.payload.index] = action.payload.newBookObj;
    }
  }
});

export const {setBooks, editBooks} = bookSlice.actions

export default bookSlice.reducer;