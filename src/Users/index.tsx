import React, { useState, useMemo } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../Store/Features/users_api";
import { useEditItemMutation } from "../Store/Features/inventory_api";
import type { User } from "../Models/user_model";

export const Users: React.FC = () => {
  const { data: users = [], refetch } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [editUser] = useEditItemMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    role: "CUSTOMER",
    phone: "",
    id: "",
  });

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setForm(user);
    setIsEditOpen(true);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const RoleBadge = ({ role }: { role: User["role"] }) => {
    const color =
      role === "ADMIN"
        ? "bg-purple-500"
        : role === "STAFF"
        ? "bg-blue-500"
        : "bg-green-500";

    return (
      <span className={`${color} text-white px-3 py-1 rounded-full text-xs`}>
        {role}
      </span>
    );
  };

  const columns: TableColumn<User>[] = useMemo(
    () => [
      { name: "ID", selector: (row) => row.id.toString(), sortable: true },
      { name: "Name", selector: (row) => row.name, sortable: true },
      { name: "Email", selector: (row) => row.email, sortable: true },
      {
        name: "Role",
        cell: (row) => <RoleBadge role={row.role} />,
        sortable: true,
      },

      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => openEdit(row)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => openDelete(row)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const filteredData = users.filter((user) =>
    [user.name, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    const { id, ...formWithoutId } = form;
    await addUser(formWithoutId as User);
    setIsAddOpen(false);
    refetch();
  };

  const handleEdit = async () => {
    if (!selectedUser) return;
    await editUser({ ...form, id: selectedUser.id });
    setIsEditOpen(false);
    refetch();
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.id);
    setIsDeleteOpen(false);
    refetch();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              role: "CUSTOMER",
              phone: "",
              id: "",
            });
            setIsAddOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="w-full sm:w-1/3 p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />

      {/* ADD / EDIT DIALOG */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {isAddOpen ? "Add User" : "Edit User"}
            </h2>

            <div className="grid gap-3">
              <input
                className="border p-2 rounded"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="border p-2 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <select
                className="border p-2 rounded"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value as User["role"] })
                }
              >
                <option>Admin</option>
                <option>Staff</option>
                <option>Customer</option>
              </select>
            </div>

            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setIsEditOpen(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={isAddOpen ? handleAdd : handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isAddOpen ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Delete user?</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete <b>{selectedUser?.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
