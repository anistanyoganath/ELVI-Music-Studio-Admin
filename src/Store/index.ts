import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth_slice";
import appReducer from "./Slices/app_slice";
import { authApi } from "./Features/auth_api";
import { inventoryApi } from "./Features/inventory_api";
import { rentalsApi } from "./Features/rentals_api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [rentalsApi.reducerPath]: rentalsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      inventoryApi.middleware,
      rentalsApi.middleware
    ),
});
