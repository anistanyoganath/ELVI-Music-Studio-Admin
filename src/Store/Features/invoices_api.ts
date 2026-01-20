import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Invoice } from "../../Models/invoice_model";
import { apiUrl } from "../../Utils/Const";

export const invoicesAPI = createApi({
  reducerPath: "invoicesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl + "admin/invoices/" }),
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    // Fetch all invoices
    getInvoices: builder.query<Invoice[], void>({
      query: () => "get",
      providesTags: ["Invoice"],
    }),

    // Fetch single invoice by ID
    getInvoice: builder.query<Invoice, string>({
      query: (id) => `get/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Invoice", id }],
    }),

    // Record a payment
    recordPayment: builder.mutation<void, any>({
      query: (body) => ({
        url: `pay/${body.invoiceId}`,
        method: "POST",
        body: { amount: body.amount },
      }),
      invalidatesTags: ["Invoice"],
    }),
    createInvoice: builder.mutation<Invoice, any>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoice"], // refresh list automatically
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useRecordPaymentMutation,
  useCreateInvoiceMutation,
} = invoicesAPI;
