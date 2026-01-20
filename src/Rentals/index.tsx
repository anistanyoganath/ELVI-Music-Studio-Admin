import { useMemo, useState } from "react";
import {
  useAddRentalMutation,
  useDeleteRentalMutation,
  useEditRentalMutation,
  useGetRentalsQuery,
} from "../Store/Features/rentals_api";
import type { Rental } from "../Models/rental_model";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";
import { RentalDialog } from "./rental_dialog";
import { useGetUsersQuery } from "../Store/Features/users_api";
import { useGetItemsQuery } from "../Store/Features/inventory_api";

export const Rentals: React.FC = () => {
  const { data, isLoading, isError } = useGetRentalsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: items } = useGetItemsQuery({});
  const [addRental] = useAddRentalMutation();
  const [editRental] = useEditRentalMutation();
  const [deleteRental] = useDeleteRentalMutation();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);

  const [formData, setFormData] = useState<
    Omit<Rental, "id" | "createdAt" | "updatedAt">
  >({
    userId: "",
    itemId: "",
    startDate: new Date(),
    endDate: new Date(),
    totalCost: 0,
    status: "Active",
  });

  const columns: TableColumn<Rental>[] = useMemo(
    () => [
      { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
      { name: "User ID", selector: (row) => row.userId, sortable: true },
      { name: "Item ID", selector: (row) => row.itemId, sortable: true },
      {
        name: "Start Date",
        selector: (row) => row.startDate.toString().split("T")[0],
        sortable: true,
      },
      {
        name: "End Date",
        selector: (row) => row.endDate.toString().split("T")[0],
        sortable: true,
      },
      {
        name: "Total Cost",
        selector: (row) => row.totalCost.toString(),
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => (
          <span
            className={`${
              row.status === "Active"
                ? "bg-blue-500"
                : row.status === "Returned"
                  ? "bg-green-500"
                  : "bg-red-500"
            } text-white px-3 py-1 rounded-full text-xs font-medium`}
          >
            {row.status}
          </span>
        ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingRental(row);
                setFormData({ ...row });
              }}
              className="px-2 py-1 bg-yellow-400 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                if (confirm("Delete this rental?")) await deleteRental(row.id);
              }}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredData =
    data?.filter((r) =>
      [r.userId, r.itemId, r.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ) || [];

  const handleAdd = async () => {
    await addRental(formData);
    setShowAddModal(false);
    setFormData({
      userId: "",
      itemId: "",
      startDate: new Date(),
      endDate: new Date(),
      totalCost: 0,
      status: "Active",
    });
  };

  const handleEdit = async () => {
    if (!editingRental) return;
    await editRental({ ...editingRental, ...formData });
    setEditingRental(null);
  };

  if (isLoading) return <div className="p-6">Loading rentals...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load rentals</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rentals</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Add Rental
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user ID, item ID or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={{
          rows: { style: { minHeight: "60px" } },
          headCells: { style: { fontWeight: "bold", fontSize: "16px" } },
        }}
      />

      {showAddModal && (
        <RentalDialog
          users={users || []}
          items={items || []}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
          title="Add Rental"
        />
      )}

      {editingRental && (
        <RentalDialog
          users={users || []}
          items={items || []}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setEditingRental(null)}
          onSubmit={handleEdit}
          title="Edit Rental"
        />
      )}
    </div>
  );
};
