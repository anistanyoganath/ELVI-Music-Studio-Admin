// src/Store/Features/dashboard_api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../Utils/Const";
import type { Item } from "../../Models/item_model";
import type { Rental } from "../../Models/rental_model";

// Types (adapt based on your backend)
export type PendingReturn = {
  id: number;
  customer: string;
  instrument: string;
  dueDate: string;
};

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/dashboard/" }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getPendingReturns: builder.query<PendingReturn[], void>({
      query: () => "pending-returns",
      providesTags: ["Dashboard"],
    }),
    getAvailableInstruments: builder.query<Item[], void>({
      query: () => "available-instruments",
      providesTags: ["Dashboard"],
    }),
    getRentals: builder.query<Rental[], void>({
      query: () => "rentals",
      providesTags: ["Dashboard"],
    }),
    getRevenue: builder.query<any, void>({
      query: () => "revenue",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetPendingReturnsQuery,
  useGetAvailableInstrumentsQuery,
  useGetRentalsQuery,
  useGetRevenueQuery,
} = dashboardAPI;
