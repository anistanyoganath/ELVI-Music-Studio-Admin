import type { Rental } from "../Models/rental_model";

type RentalModalProps = {
  formData: Omit<Rental, "id" | "createdAt" | "updatedAt">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<Rental, "id" | "createdAt" | "updatedAt">>
  >;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
};

export const RentalDialog: React.FC<RentalModalProps> = ({
  formData,
  setFormData,
  onClose,
  onSubmit,
  title,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="User ID"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            placeholder="Item ID"
            value={formData.itemId}
            onChange={(e) =>
              setFormData({ ...formData, itemId: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={formData.startDate?.toString().split("T")[0] || ""}
            onChange={(e) =>
              setFormData({ ...formData, startDate: new Date(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="End Date"
            value={formData.endDate?.toString().split("T")[0] || ""}
            onChange={(e) =>
              setFormData({ ...formData, endDate: new Date(e.target.value) })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Total Cost"
            value={formData.totalCost || 0}
            onChange={(e) =>
              setFormData({
                ...formData,
                totalCost: parseFloat(e.target.value),
              })
            }
            className="p-2 border rounded"
          />
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
