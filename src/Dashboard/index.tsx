// src/Components/Dashboard.tsx
import React, { useState } from "react";
import {
  useGetAvailableInstrumentsQuery,
  useGetPendingReturnsQuery,
  useGetRentalsQuery,
  useGetRevenueQuery,
} from "../Store/Features/dashboard_api";

export const Dashboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("pending");

  // Fetch data from APIs
  const {
    data: pending,
    isLoading: loadingPending,
    error: errorPending,
  } = useGetPendingReturnsQuery();
  const {
    data: instruments,
    isLoading: loadingAvailable,
    error: errorAvailable,
  } = useGetAvailableInstrumentsQuery();
  const {
    data: rentals,
    isLoading: loadingRentals,
    error: errorRentals,
  } = useGetRentalsQuery();
  const {
    data: revenue,
    isLoading: loadingRevenue,
    error: errorRevenue,
  } = useGetRevenueQuery();

  // Stats can be dynamic based on API
  const stats = [
    {
      key: "pending",
      label: "Pending Returns",
      value: pending?.length || 0,
      color: "bg-yellow-500",
    },
    {
      key: "available",
      label: "Available Instruments",
      value: instruments?.length || 0,
      color: "bg-green-500",
    },
    {
      key: "rentals",
      label: "Total Rentals",
      value: rentals?.length || 0,
      color: "bg-blue-500",
    },
    {
      key: "revenue",
      label: "Revenue",
      value: Number(revenue?.totalRevenue || 0),
      color: "bg-purple-500",
    },
  ];

  const renderTable = () => {
    switch (selectedKey) {
      case "pending":
        if (loadingPending) return <p>Loading...</p>;
        if (errorPending) return <p>Error loading pending returns.</p>;
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
                {pending?.map((row) => (
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
        if (loadingAvailable) return <p>Loading...</p>;
        if (errorAvailable) return <p>Error loading available instruments.</p>;
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
                {instruments?.map((row) => (
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
        if (loadingRentals) return <p>Loading...</p>;
        if (errorRentals) return <p>Error loading rentals.</p>;
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
                {rentals?.map((row) => (
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
        if (loadingRevenue) return <p>Loading...</p>;
        if (errorRevenue) return <p>Error loading revenue.</p>;
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
                {revenue?.map((row: any) => (
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
                ${isSelected ? "ring-4 ring-blue-400 scale-105" : "hover:shadow-lg"}`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ${item.color}`}
              >
                {item.value}
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
