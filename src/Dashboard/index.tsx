import React from "react";

export const Dashboard: React.FC = () => {
  // Sample data (replace with real API data or props)
  const stats = [
    { label: "Total Rentals", value: 120, color: "bg-blue-500" },
    { label: "Available Instruments", value: 45, color: "bg-green-500" },
    { label: "Pending Returns", value: 8, color: "bg-yellow-500" },
    { label: "Revenue", value: "$12,340", color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl shadow-md p-6 bg-white flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
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
          </div>
        ))}
      </div>
    </div>
  );
};
