import React, { useState } from "react";

export const Dashboard: React.FC = () => {
  // Stats configuration
  const stats = [
    {
      key: "pending",
      label: "Pending Returns",
      value: 8,
      color: "bg-yellow-500",
    },
    {
      key: "available",
      label: "Available Instruments",
      value: 45,
      color: "bg-green-500",
    },
    {
      key: "rentals",
      label: "Total Rentals",
      value: 120,
      color: "bg-blue-500",
    },
    {
      key: "revenue",
      label: "Revenue",
      value: "$12,340",
      color: "bg-purple-500",
    },
  ];

  // Default selected card: Pending Returns
  const [selectedKey, setSelectedKey] = useState("pending");

  // Dummy content data (you can replace with API data later)
  const tables = {
    pending: [
      {
        id: 1,
        customer: "John Doe",
        instrument: "Guitar",
        dueDate: "2025-11-10",
      },
      {
        id: 2,
        customer: "Jane Smith",
        instrument: "Violin",
        dueDate: "2025-11-09",
      },
    ],
    available: [
      { id: 1, name: "Acoustic Guitar", condition: "Good" },
      { id: 2, name: "Electric Piano", condition: "Excellent" },
    ],
    rentals: [
      {
        id: 1,
        user: "John Doe",
        instrument: "Drum Set",
        startDate: "2025-10-12",
      },
      {
        id: 2,
        user: "Jane Smith",
        instrument: "Flute",
        startDate: "2025-11-01",
      },
    ],
    revenue: [
      { id: 1, month: "October", amount: "$5,600" },
      { id: 2, month: "November", amount: "$6,740" },
    ],
  };

  // Render table for selected section
  const renderTable = () => {
    switch (selectedKey) {
      case "pending":
        return (
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Pending Returns
            </h2>
            <table className="min-w-full text-sm">
              <thead className="border-b font-medium text-gray-600">
                <tr>
                  <th className="py-2 text-left">Customer</th>
                  <th className="py-2 text-left">Instrument</th>
                  <th className="py-2 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tables.pending.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2">{row.customer}</td>
                    <td className="py-2">{row.instrument}</td>
                    <td className="py-2">{row.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "available":
        return (
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Available Instruments
            </h2>
            <table className="min-w-full text-sm">
              <thead className="border-b font-medium text-gray-600">
                <tr>
                  <th className="py-2 text-left">Instrument</th>
                  <th className="py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody>
                {tables.available.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2">{row.name}</td>
                    <td className="py-2">{row.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "rentals":
        return (
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Total Rentals
            </h2>
            <table className="min-w-full text-sm">
              <thead className="border-b font-medium text-gray-600">
                <tr>
                  <th className="py-2 text-left">Customer</th>
                  <th className="py-2 text-left">Instrument</th>
                  <th className="py-2 text-left">Start Date</th>
                </tr>
              </thead>
              <tbody>
                {tables.rentals.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2">{row.user}</td>
                    <td className="py-2">{row.instrument}</td>
                    <td className="py-2">{row.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "revenue":
        return (
          <div className="mt-6 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Revenue
            </h2>
            <table className="min-w-full text-sm">
              <thead className="border-b font-medium text-gray-600">
                <tr>
                  <th className="py-2 text-left">Month</th>
                  <th className="py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tables.revenue.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-2">{row.month}</td>
                    <td className="py-2">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const isSelected = selectedKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={`rounded-2xl shadow-md p-6 bg-white flex flex-col items-center justify-center transition-all duration-200 
                ${
                  isSelected
                    ? "ring-4 ring-blue-400 scale-105"
                    : "hover:shadow-lg"
                }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ${item.color}`}
              >
                {typeof item.value === "number" ? item.value : item.value[0]}
              </div>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-xl font-semibold text-gray-800 mt-1">
                {item.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Table */}
      {renderTable()}
    </div>
  );
};
