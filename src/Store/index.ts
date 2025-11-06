import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth_slice";
import appReducer from "./Slices/app_slice";
import { authApi } from "./Features/auth_api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
