import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../Utils/Const";
import type { User } from "../../Models/user_model";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/users/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "get",
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: "add",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: (user) => ({
        url: `update/${user.id}`,
        method: "PUT",
        body: { ...user, id: null },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = usersAPI;
