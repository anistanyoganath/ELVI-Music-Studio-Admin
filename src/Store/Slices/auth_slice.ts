import { createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "../../Utils/LocalStoragekeys";

function checkLoginStatus() {
  const sessionString = localStorage.getItem(localStorageKeys.isLoggedIn);
  return sessionString ? JSON.parse(sessionString) === true : false;
}

function getStoredUser() {
  const userString = localStorage.getItem(localStorageKeys.profile);
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  }
  return null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getStoredUser(),
    isLoggedIn: checkLoginStatus(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem(localStorageKeys.isLoggedIn, "true");
      localStorage.setItem(
        localStorageKeys.profile,
        JSON.stringify(action.payload)
      );
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem(localStorageKeys.isLoggedIn);
      localStorage.removeItem(localStorageKeys.profile);
      localStorage.removeItem(localStorageKeys.token);
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export const getIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export default authSlice.reducer;
