import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import API from "../api/axios";
import toast from "react-hot-toast";

const BulkActions = ({ selectedTasks, setSelectedTasks }) => {
  const { fetchTasks, fetchStats } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(""); // "complete" or "delete"

  const handleAction = async () => {
    setLoading(true);
    try {
      if (actionType === "complete") {
        await API.patch("/tasks/bulk-update", {
          taskIds: selectedTasks,
          status: "completed",
        });
        toast.success("Selected tasks marked as completed!");
      } else if (actionType === "delete") {
        await API.delete("/tasks/bulk-delete", {
          data: { taskIds: selectedTasks },
        });
        toast.success("Selected tasks deleted successfully!");
      }
      setSelectedTasks([]);
      fetchTasks();
      fetchStats();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setActionType("");
    }
  };

  const hasSelection = selectedTasks.length > 0;

  return (
    <div className="mb-4 flex flex-col gap-2">
      {/* Full-width buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => { setActionType("complete"); setShowConfirm(true); }}
          disabled={!hasSelection || loading}
          className={`w-full py-3 rounded-lg text-white transition ${
            hasSelection
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-300 cursor-not-allowed"
          }`}
        >
          Mark as Completed
        </button>
        <button
          onClick={() => { setActionType("delete"); setShowConfirm(true); }}
          disabled={!hasSelection || loading}
          className={`w-full py-3 rounded-lg text-white transition ${
            hasSelection
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-300 cursor-not-allowed"
          }`}
        >
          Delete Selected
        </button>
      </div>

      <span className="text-gray-700 mt-1">{selectedTasks.length} selected</span>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {actionType === "delete"
                ? "Confirm Deletion"
                : "Mark Tasks as Completed"}
            </h3>
            <p className="text-gray-600 mb-6">
              {actionType === "delete"
                ? "Are you sure you want to permanently delete the selected tasks? This action cannot be undone."
                : "Are you sure you want to mark the selected tasks as completed?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className={`px-4 py-2 rounded-lg text-white ${
                  actionType === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                } transition disabled:opacity-70`}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : actionType === "delete"
                  ? "Delete"
                  : "Mark Completed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
