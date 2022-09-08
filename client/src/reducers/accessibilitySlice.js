import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showText: false
};

export const accessibilitySlice = createSlice({
  name: "bookClicked",
  initialState,
  reducers: {
    setShowText: (state, action) => {
      state.showText = action.payload
    }
  }
});

export const { setShowText } = accessibilitySlice.actions

export default accessibilitySlice.reducer;