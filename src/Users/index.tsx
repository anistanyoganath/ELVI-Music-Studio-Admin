import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Staff" | "Customer";
  status: "Active" | "Inactive" | "Banned";
};

export const Users: React.FC = () => {
  const users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Staff",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "Customer",
      status: "Banned",
    },
    {
      id: 4,
      name: "Dana White",
      email: "dana@example.com",
      role: "Customer",
      status: "Active",
    },
  ];

  const [search, setSearch] = useState("");

  const RoleBadge = ({ role }: { role: User["role"] }) => {
    const color =
      role === "Admin"
        ? "bg-purple-500"
        : role === "Staff"
        ? "bg-blue-500"
        : "bg-green-500";
    return (
      <span
        className={`${color} text-white px-3 py-1 rounded-full text-xs font-medium`}
      >
        {role}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: User["status"] }) => {
    const color =
      status === "Active"
        ? "bg-green-500"
        : status === "Inactive"
        ? "bg-yellow-500"
        : "bg-red-500";
    return (
      <span
        className={`${color} text-white px-3 py-1 rounded-full text-xs font-medium`}
      >
        {status}
      </span>
    );
  };

  const columns: TableColumn<User>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id.toString(),
        sortable: true,
        width: "70px",
      },
      { name: "Name", selector: (row) => row.name, sortable: true },
      { name: "Email", selector: (row) => row.email, sortable: true },
      {
        name: "Role",
        cell: (row) => <RoleBadge role={row.role} />,
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

  const filteredData = users.filter((user) =>
    [user.name, user.email, user.role, user.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, role, or status..."
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
