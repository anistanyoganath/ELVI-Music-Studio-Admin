import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../Utils/Const";

export const inventoryApi = createApi({
  reducerPath: "inventoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/inventory/" }),
  tagTypes: ["Inventory"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "get",
      providesTags: ["Inventory"],
    }),

    addItem: builder.mutation({
      query: (item) => ({
        url: "add",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Inventory"],
    }),

    editItem: builder.mutation({
      query: (item) => ({
        url: `update/${item.id}`,
        method: "PUT",
        body: { ...item, id: null },
      }),
      invalidatesTags: ["Inventory"],
    }),

    deleteItem: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = inventoryApi;
