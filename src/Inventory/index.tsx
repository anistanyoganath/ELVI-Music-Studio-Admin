import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";

type Item = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
};

export const Inventory: React.FC = () => {
  // 🔹 Sample inventory data (replace with API data)
  const inventoryData: Item[] = [
    {
      id: 1,
      name: "Electric Guitar",
      category: "String",
      quantity: 12,
      price: 350,
    },
    {
      id: 2,
      name: "Drum Set",
      category: "Percussion",
      quantity: 5,
      price: 800,
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronic",
      quantity: 8,
      price: 600,
    },
    { id: 4, name: "Violin", category: "String", quantity: 15, price: 200 },
    { id: 5, name: "Flute", category: "Wind", quantity: 10, price: 150 },
  ];

  const [search, setSearch] = useState("");

  // 🔹 Table columns
  const columns: TableColumn<Item>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id.toString(),
        sortable: true,
        width: "70px",
      },
      { name: "Name", selector: (row) => row.name, sortable: true },
      { name: "Category", selector: (row) => row.category, sortable: true },
      {
        name: "Quantity",
        selector: (row) => row.quantity.toString(),
        sortable: true,
        right: true,
      },
      {
        name: "Price ($)",
        selector: (row) => row.price.toString(),
        sortable: true,
        right: true,
      },
    ],
    []
  );

  // 🔹 Filtered data based on search
  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Inventory</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
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
    </div>
  );
};
