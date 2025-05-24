import React from "react";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded shadow-lg p-6 w-auto">
        <h2 className="text-lg font-semibold mb-2">{title || "Xác nhận"}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
            onClick={onConfirm}
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}
