// src/Store/Features/rentals_api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../Utils/Const";
import type { Rental } from "../../Models/rental_model";

export const rentalsApi = createApi({
  reducerPath: "rentalsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/rentals/" }),
  tagTypes: ["Rental"],
  endpoints: (builder) => ({
    getRentals: builder.query<Rental[], void>({
      query: () => "get",
      providesTags: ["Rental"],
    }),
    addRental: builder.mutation({
      query: (rental: Omit<Rental, "id">) => ({
        url: "add",
        method: "POST",
        body: rental,
      }),
      invalidatesTags: ["Rental"],
    }),
    editRental: builder.mutation({
      query: (rental: Rental) => ({
        url: `update/${rental.id}`,
        method: "PUT",
        body: rental,
      }),
      invalidatesTags: ["Rental"],
    }),
    deleteRental: builder.mutation({
      query: (id: string) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rental"],
    }),
  }),
});

export const {
  useGetRentalsQuery,
  useAddRentalMutation,
  useEditRentalMutation,
  useDeleteRentalMutation,
} = rentalsApi;
