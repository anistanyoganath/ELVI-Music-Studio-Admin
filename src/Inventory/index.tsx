import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import {
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} from "../Store/Features/inventory_api";

type Item = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  description?: string;
  countryOfOrigin?: string;
  dateOfPurchase?: string;
  purchasedCost?: number;
  warrantyPeriod?: string;
  pricePerDay: number;
  isAvailable: boolean;
};

export const Inventory: React.FC = () => {
  const { data, isLoading, isError } = useGetItemsQuery({});
  const [addItem] = useAddItemMutation();
  const [editItem] = useEditItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    countryOfOrigin: "",
    dateOfPurchase: "",
    purchasedCost: "",
    warrantyPeriod: "",
    pricePerDay: "",
    isAvailable: true,
  });

  const columns: TableColumn<Item>[] = useMemo(
    () => [
      { name: "Name", selector: (row) => row.name, sortable: true },
      { name: "Category", selector: (row) => row.category, sortable: true },
      { name: "Brand", selector: (row) => row.brand || "-", sortable: true },
      {
        name: "Price / Day ($)",
        selector: (row) => row.pricePerDay.toFixed(2),
        sortable: true,
        right: true,
      },
      {
        name: "Available",
        selector: (row) => (row.isAvailable ? "✅" : "❌"),
        center: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => setEditingItem(row)}
              className="px-2 py-1 bg-yellow-400 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const filteredData =
    data?.filter(
      (item: Item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.brand?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleAddItem = async () => {
    const body = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay),
      purchasedCost: parseFloat(formData.purchasedCost),
    };
    await addItem(body);
    setShowAddModal(false);
    setFormData({
      name: "",
      category: "",
      brand: "",
      description: "",
      countryOfOrigin: "",
      dateOfPurchase: "",
      purchasedCost: "",
      warrantyPeriod: "",
      pricePerDay: "",
      isAvailable: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this item?")) {
      await deleteItem(id);
    }
  };

  if (isLoading) return <div className="p-6">Loading inventory...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load data</div>;

  return (
    <>
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Name"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                placeholder="Category"
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                placeholder="Brand"
                value={editingItem.brand || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, brand: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                placeholder="Country of Origin"
                value={editingItem.countryOfOrigin || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    countryOfOrigin: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Date of Purchase"
                value={
                  editingItem.dateOfPurchase
                    ? new Date(editingItem.dateOfPurchase)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    dateOfPurchase: new Date(e.target.value).toISOString(),
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Purchased Cost"
                value={editingItem.purchasedCost || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    purchasedCost: parseFloat(e.target.value),
                  })
                }
                className="p-2 border rounded"
              />
              <input
                placeholder="Warranty Period"
                value={editingItem.warrantyPeriod || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    warrantyPeriod: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price / Day"
                value={editingItem.pricePerDay}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    pricePerDay: parseFloat(e.target.value),
                  })
                }
                className="p-2 border rounded"
              />
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={editingItem.isAvailable}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    isAvailable: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span>Available for Rent</span>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (editingItem) {
                    await editItem(editingItem);
                    setEditingItem(null);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add Item
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, category or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
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

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Country of Origin"
                  value={formData.countryOfOrigin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      countryOfOrigin: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="Date of Purchase"
                  value={formData.dateOfPurchase}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfPurchase: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Purchased Cost"
                  value={formData.purchasedCost}
                  onChange={(e) =>
                    setFormData({ ...formData, purchasedCost: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Warranty Period (e.g. 2 years)"
                  value={formData.warrantyPeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, warrantyPeriod: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price / Day"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerDay: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isAvailable: e.target.checked })
                  }
                  className="mr-2"
                />
                <span>Available for Rent</span>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
