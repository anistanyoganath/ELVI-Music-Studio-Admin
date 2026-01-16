// src/Store/Features/categories_api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../Utils/Const";
import type { Category } from "../../Models/category_model";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/categories/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "get",
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation<Category, Omit<Category, "id">>({
      query: (category) => ({
        url: "add",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    editCategory: builder.mutation<Category, Category>({
      query: (category) => ({
        url: `update/${category.id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesAPI;
