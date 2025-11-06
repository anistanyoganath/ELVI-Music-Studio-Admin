import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appSlice.actions;
export const getIsLoading = (state: any) => state.app.isLoading as boolean;
export default appSlice.reducer;
