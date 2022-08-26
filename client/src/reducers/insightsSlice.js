import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    setLongestBook: (state, action) => {
      state.longestBook = action.payload
    },
    setShortestBook: (state, action) => {
      state.shortestBook = action.payload
    },
    setSortedByYear: (state, action) => {
      state.sortedByYear = action.payload
    }
  }
});

export const {setLongestBook, setShortestBook, setSortedByYear} = insightsSlice.actions

export default insightsSlice.reducer;