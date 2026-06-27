import React from "react";
const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-4">
        <p className="text-gray-700 mb-4">{content}</p>
        <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={onDelete}
            >
              Delete
            </button>
        </div>
    </div>
  );
};

export default DeleteAlertContent;
