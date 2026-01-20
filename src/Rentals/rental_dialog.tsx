import type { Rental } from "../Models/rental_model";
import type { User } from "../Models/user_model";
import type { Item } from "../Models/item_model";

type RentalDialogProps = {
  formData: Omit<Rental, "id" | "createdAt" | "updatedAt">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<Rental, "id" | "createdAt" | "updatedAt">>
  >;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  users: User[]; // list of users for dropdown
  items: Item[]; // list of items for dropdown
};

export const RentalDialog: React.FC<RentalDialogProps> = ({
  formData,
  setFormData,
  onClose,
  onSubmit,
  title,
  users,
  items,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User Dropdown */}
          <select
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            className="p-2 border rounded w-full"
          >
            <option value="">Select Customer</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {/* Item Dropdown */}
          <select
            value={formData.itemId}
            onChange={(e) =>
              setFormData({ ...formData, itemId: e.target.value })
            }
            className="p-2 border rounded w-full"
          >
            <option value="">Select Item</option>
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} - ${i.pricePerDay}/day
              </option>
            ))}
          </select>

          {/* Start / End Dates */}
          <input
            type="date"
            value={formData.startDate?.toISOString().split("T")[0] || ""}
            onChange={(e) =>
              setFormData({ ...formData, startDate: new Date(e.target.value) })
            }
            className="p-2 border rounded w-full"
          />
          <input
            type="date"
            value={formData.endDate?.toISOString().split("T")[0] || ""}
            onChange={(e) =>
              setFormData({ ...formData, endDate: new Date(e.target.value) })
            }
            className="p-2 border rounded w-full"
          />

          {/* Total Cost */}
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
            className="p-2 border rounded w-full"
          />

          {/* Status */}
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="p-2 border rounded w-full"
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
