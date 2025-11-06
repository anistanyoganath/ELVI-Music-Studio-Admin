import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";

type Rental = {
  id: number;
  customer: string;
  instrument: string;
  rentDate: string;
  returnDate: string;
  status: "Active" | "Returned" | "Overdue";
};

export const Rentals: React.FC = () => {
  // 🔹 Sample rentals (replace with API data)
  const rentals: Rental[] = [
    {
      id: 1,
      customer: "John Doe",
      instrument: "Electric Guitar",
      rentDate: "2025-09-01",
      returnDate: "2025-09-10",
      status: "Active",
    },
    {
      id: 2,
      customer: "Sarah Lee",
      instrument: "Drum Set",
      rentDate: "2025-08-20",
      returnDate: "2025-08-25",
      status: "Returned",
    },
    {
      id: 3,
      customer: "Mike Brown",
      instrument: "Keyboard",
      rentDate: "2025-08-30",
      returnDate: "2025-09-05",
      status: "Overdue",
    },
  ];

  const [search, setSearch] = useState("");

  // 🔹 Badge component for status
  const StatusBadge = ({ status }: { status: Rental["status"] }) => {
    const color =
      status === "Active"
        ? "bg-blue-500"
        : status === "Returned"
        ? "bg-green-500"
        : "bg-red-500";
    return (
      <span
        className={`${color} text-white px-3 py-1 rounded-full text-xs font-medium`}
      >
        {status}
      </span>
    );
  };

  // 🔹 Table columns
  const columns: TableColumn<Rental>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id.toString(),
        sortable: true,
        width: "70px",
      },
      { name: "Customer", selector: (row) => row.customer, sortable: true },
      { name: "Instrument", selector: (row) => row.instrument, sortable: true },
      { name: "Rent Date", selector: (row) => row.rentDate, sortable: true },
      {
        name: "Return Date",
        selector: (row) => row.returnDate,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => <StatusBadge status={row.status} />,
        sortable: true,
      },
    ],
    []
  );

  // 🔹 Filter rentals based on search
  const filteredData = rentals.filter((r) =>
    [r.customer, r.instrument, r.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Rentals</h1>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer, instrument, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 📊 Data Table */}
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
