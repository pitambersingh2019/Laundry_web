import { X } from "lucide-react";

export default function DeleteConfirmModal({
  title = "Delete Order",
  description,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-red-600">
            {title}
          </h2>
          <button onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <div className="p-5 text-sm text-gray-600">
          {description}
          <p className="text-red-500 font-medium mt-2">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
