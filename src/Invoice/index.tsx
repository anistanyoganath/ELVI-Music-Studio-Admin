import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
  useRecordPaymentMutation,
} from "../Store/Features/invoices_api";
import type { Invoice } from "../Models/invoice_model";
import { useGetUsersQuery } from "../Store/Features/users_api";
import { useGetRentalsQuery } from "../Store/Features/dashboard_api";

export const InvoicePage: React.FC = () => {
  // Queries & Mutations
  const { data: invoices, isLoading, isError } = useGetInvoicesQuery();
  const { data: users } = useGetUsersQuery();
  const { data: rentals } = useGetRentalsQuery();
  const [recordPayment] = useRecordPaymentMutation();
  const [createInvoice] = useCreateInvoiceMutation();

  // State
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    rentalId: "",
    userId: "",
    issueDate: "",
    dueDate: "",
    discount: 0,
  });

  // Filter invoices by search
  const filteredInvoices = useMemo(() => {
    if (!invoices) return [];
    return invoices.filter(
      (inv) =>
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [invoices, search]);

  // Handlers
  const handleRecordPayment = async () => {
    if (!selectedInvoice) return;
    await recordPayment({
      invoiceId: selectedInvoice.id,
      amount: paymentAmount,
    });
    setSelectedInvoice(null);
    setPaymentAmount(0);
  };

  const handleCreateInvoice = async () => {
    if (!newInvoice.userId || !newInvoice.rentalId) {
      alert("Please select a customer and a rental.");
      return;
    }
    await createInvoice(newInvoice);
    setShowAddInvoiceModal(false);
    setNewInvoice({
      rentalId: "",
      userId: "",
      issueDate: "",
      dueDate: "",
      discount: 0,
    });
  };

  // Table Columns
  const columns: TableColumn<Invoice>[] = useMemo(
    () => [
      {
        name: "Invoice #",
        selector: (row) => row.invoiceNumber,
        sortable: true,
      },
      { name: "Customer", selector: (row) => row.user.name, sortable: true },
      { name: "Item", selector: (row) => row.rental.item.name, sortable: true },
      {
        name: "Period",
        selector: (row) =>
          `${new Date(row.rental.startDate).toLocaleDateString()} - ${new Date(row.rental.endDate).toLocaleDateString()}`,
      },
      {
        name: "Total ($)",
        selector: (row) => row.totalAmount,
        sortable: true,
        right: true,
      },
      { name: "Status", selector: (row) => row.status, sortable: true },
      {
        name: "Actions",
        cell: (row) => (
          <button
            onClick={() => setSelectedInvoice(row)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          >
            View / Pay
          </button>
        ),
      },
    ],
    [],
  );

  if (isLoading) return <div className="p-6">Loading invoices...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load invoices</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Invoice Modal */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Invoice</h2>
            <div className="grid gap-4">
              {/* User dropdown */}
              <select
                value={newInvoice.userId}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, userId: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="">Select Customer</option>
                {users?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>

              {/* Rental dropdown */}
              <select
                value={newInvoice.rentalId}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, rentalId: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="">Select Rental</option>
                {rentals?.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.id} ({new Date(r.startDate).toLocaleDateString()} -{" "}
                    {new Date(r.endDate).toLocaleDateString()})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newInvoice.issueDate}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, issueDate: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, dueDate: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <input
                type="number"
                placeholder="Discount"
                value={newInvoice.discount}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    discount: Number(e.target.value),
                  })
                }
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddInvoiceModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddInvoiceModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Invoice
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by invoice number or customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredInvoices}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* Record Payment Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Invoice #{selectedInvoice.invoiceNumber}
            </h2>
            <p>
              <strong>Customer:</strong> {selectedInvoice.user.name} (
              {selectedInvoice.user.email})
            </p>
            <p>
              <strong>Rental Period:</strong>{" "}
              {new Date(selectedInvoice.rental.startDate).toLocaleDateString()}{" "}
              - {new Date(selectedInvoice.rental.endDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Item:</strong> {selectedInvoice.rental.item.name}
            </p>
            <p>
              <strong>Subtotal:</strong> ${selectedInvoice.subtotal}
            </p>
            <p>
              <strong>Discount:</strong> ${selectedInvoice.discount}
            </p>
            <p>
              <strong>Late Fee:</strong> ${selectedInvoice.lateFee}
            </p>
            <p className="font-bold">
              <strong>Total:</strong> ${selectedInvoice.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedInvoice.status}
            </p>

            <h3 className="mt-2 font-semibold">Payments:</h3>
            {selectedInvoice.payments.length === 0 ? (
              <p>No payments recorded</p>
            ) : (
              <ul className="list-disc ml-5 mb-2">
                {selectedInvoice.payments.map((p, i) => (
                  <li key={i}>
                    ${p.amount} via {p.method} on{" "}
                    {new Date(p.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}

            {selectedInvoice.status !== "PAID" && (
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Payment amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="p-2 border rounded w-full mb-2"
                />
                <button
                  onClick={handleRecordPayment}
                  className="w-full bg-green-600 text-white py-2 rounded-md"
                >
                  Record Payment
                </button>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
