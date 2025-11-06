import React, { useState } from "react";

export const Settings: React.FC = () => {
  const tabs = [
    "General",
    "Rental Policies",
    "Inventory",
    "Payments",
    "Notifications",
  ];
  const [activeTab, setActiveTab] = useState("General");

  const renderTab = () => {
    switch (activeTab) {
      case "General":
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Business Name</span>
              <input
                type="text"
                className="mt-1 block w-full border rounded p-2"
                placeholder="ELVI Music"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Currency</span>
              <select className="mt-1 block w-full border rounded p-2">
                <option>LKR</option>
                <option>USD</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Timezone</span>
              <input
                type="text"
                className="mt-1 block w-full border rounded p-2"
                placeholder="Asia/Colombo"
              />
            </label>
          </div>
        );
      case "Rental Policies":
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">
                Default Rental Period (days)
              </span>
              <input
                type="number"
                className="mt-1 block w-full border rounded p-2"
                placeholder="7"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Late Fee (LKR/day)</span>
              <input
                type="number"
                className="mt-1 block w-full border rounded p-2"
                placeholder="50"
              />
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-5 w-5" />
              <span className="text-gray-700">Enable Security Deposit</span>
            </label>
          </div>
        );
      case "Inventory":
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Low Stock Threshold</span>
              <input
                type="number"
                className="mt-1 block w-full border rounded p-2"
                placeholder="5"
              />
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-5 w-5" />
              <span className="text-gray-700">Allow Negative Stock</span>
            </label>
          </div>
        );
      case "Payments":
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Accepted Methods</span>
              <input
                type="text"
                className="mt-1 block w-full border rounded p-2"
                placeholder="Cash, Card"
              />
            </label>
          </div>
        );
      case "Notifications":
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">SMTP Host</span>
              <input
                type="text"
                className="mt-1 block w-full border rounded p-2"
                placeholder="smtp.example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">SMTP User</span>
              <input
                type="text"
                className="mt-1 block w-full border rounded p-2"
                placeholder="user@example.com"
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">{renderTab()}</div>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Settings
        </button>
      </div>
    </div>
  );
};
