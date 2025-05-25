import React from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  handleSave,
  //   width = "w-96",
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`bg-white rounded shadow-lg p-6 w-96 relative max-h-[90vh] overflow-y-auto`}
      >
        <button
          className="absolute text-3xl top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Đóng"
        >
          ×
        </button>
        {title && (
          <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
        )}
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
