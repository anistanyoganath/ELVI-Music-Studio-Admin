import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Report = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
};

export const Reports: React.FC = () => {
  const reports: Report[] = [
    {
      id: 1,
      date: "2025-09-01",
      category: "Rental",
      description: "Electric Guitar",
      amount: 150,
    },
    {
      id: 2,
      date: "2025-09-02",
      category: "Sale",
      description: "Drum Sticks",
      amount: 20,
    },
    {
      id: 3,
      date: "2025-09-05",
      category: "Rental",
      description: "Keyboard",
      amount: 180,
    },
    {
      id: 4,
      date: "2025-09-07",
      category: "Maintenance",
      description: "Guitar String Replacement",
      amount: -30,
    },
    {
      id: 5,
      date: "2025-09-09",
      category: "Rental",
      description: "Violin",
      amount: 100,
    },
  ];

  const [search, setSearch] = useState("");

  const columns: TableColumn<Report>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id.toString(),
        sortable: true,
        width: "70px",
      },
      { name: "Date", selector: (row) => row.date, sortable: true },
      { name: "Category", selector: (row) => row.category, sortable: true },
      {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
      },
      {
        name: "Amount ($)",
        cell: (row) => (
          <span className={row.amount >= 0 ? "text-green-600" : "text-red-600"}>
            {row.amount >= 0 ? `+$${row.amount}` : `-$${Math.abs(row.amount)}`}
          </span>
        ),
        sortable: true,
        right: true,
      },
    ],
    []
  );

  const filteredData = reports.filter((r) =>
    [r.category, r.description]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalIncome = reports
    .filter((r) => r.amount > 0)
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = reports
    .filter((r) => r.amount < 0)
    .reduce((sum, r) => sum + r.amount, 0);
  const totalTransactions = reports.length;

  const categoryTotals = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + r.amount;
    return acc;
  }, {});
  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "Reports.xlsx"
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm uppercase">Total Income</p>
          <p className="text-2xl font-bold text-green-600">${totalIncome}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm uppercase">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">
            ${Math.abs(totalExpense)}
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm uppercase">Transactions</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalTransactions}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Download Excel
        </button>
      </div>

      <div className="bg-white shadow rounded-2xl p-4">
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
    </div>
  );
};
