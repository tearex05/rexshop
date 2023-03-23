import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searh",
  initialState: "",
  reducers: {
    addString: (state, action) => {
      return state = action.payload
    },
  },
});

export const { addString } = searchSlice.actions;

export default searchSlice.reducer;
