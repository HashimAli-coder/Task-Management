import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import {
  FiCalendar,
  FiEdit2,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task, onEdit, selectedTasks, setSelectedTasks }) => {
  const { deleteTask } = useContext(TaskContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isSelected = selectedTasks.includes(task._id);

  const toggleSelect = () => {
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== task._id));
    } else {
      setSelectedTasks([...selectedTasks, task._id]);
    }
  };

  const isOverdue =
    task.status !== "completed" && dayjs(task.dueDate).isBefore(dayjs(), "day");

  const priorityStyles = {
    low: {
      bar: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    medium: { bar: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
    high: { bar: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    setShowDeleteModal(false);
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl border border-gray-100
        shadow-xl transition-all duration-300
        overflow-hidden
        ${isSelected ? "ring-3 ring-black" : ""}
      `}
    >
      {/* Priority Left Accent */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5 ${
          priorityStyles[task.priority].bar
        }`}
      />

      <div className="p-6 pl-7">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
            
          </div>

          <input
            type="checkbox"
            checked={isSelected}
            onChange={toggleSelect}
            className="w-4 h-4 accent-indigo-600 mt-1"
          />
        </div>

        {/* Overdue Warning Block */}
        {isOverdue && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200 flex items-center text-rose-600 text-sm font-medium">
            <FiAlertTriangle size={16} />
            This task is overdue. Please take action.
          </div>
        )}

        {/* Details Section */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 text-sm">
          {/* Priority */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Priority
            </p>
            <div
              className={` inline-block px-3 rounded-lg text-sm font-medium ${
                priorityStyles[task.priority].bg
              } ${priorityStyles[task.priority].text}`}
            >
              {task.priority}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Status
            </p>
            <div className="mt-1 flex items-center text-gray-700 font-medium">
              {task.status === "completed" && (
                <FiCheckCircle className="text-emerald-500" size={16} />
              )}
              {task.status}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Deadline
            </p>
            <div className="mt-1 flex items-center text-gray-700 font-medium">
              <FiCalendar size={15} className="text-indigo-500" />
              {dayjs(task.dueDate).format("DD MMM YYYY")}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
          >
            <FiEdit2 size={14} />
            Edit Task
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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

export default TaskCard;
