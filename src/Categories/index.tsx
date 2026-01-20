import { useMemo, useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../Store/Features/categories_api";
import type { Category } from "../Models/category_model";
import type { TableColumn } from "react-data-table-component";
import DataTable from "react-data-table-component";

export const Categories: React.FC = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState<Omit<Category, "id">>({
    name: "",
    color: "#000000",
  });

  const columns: TableColumn<Category>[] = useMemo(
    () => [
      { name: "Name", selector: (row) => row.name, sortable: true },

      {
        name: "Color",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-full border"
              style={{ backgroundColor: row.color }}
            />
            <span className="text-sm">{row.color}</span>
          </div>
        ),
        sortable: true,
      },

      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingCategory(row);
                setFormData({ name: row.name, color: row.color });
              }}
              className="px-2 py-1 bg-yellow-400 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                if (confirm("Delete this category?")) {
                  await deleteCategory(row.id);
                }
              }}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredData =
    data?.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) ||
    [];

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    if (editingCategory) {
      await editCategory({ ...editingCategory, ...formData });
      setEditingCategory(null);
    } else {
      await addCategory(formData);
    }

    setFormData({ name: "", color: "#000000" });
  };

  if (isLoading) return <div className="p-6">Loading categories...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load categories</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full sm:w-1/3"
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="h-10 w-12 p-1 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingCategory ? "Update" : "Add"}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};
