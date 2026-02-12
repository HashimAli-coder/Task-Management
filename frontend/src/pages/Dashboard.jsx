import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import Filters from "../components/Filters";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import BulkActions from "../components/BulkActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    tasks,
    stats,
    loading,
    fetchTasks,
    fetchStats,
  } = useContext(TaskContext);

  const navigate = useNavigate();

  // Logout with redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    fetchTasks({
      search,
      status: statusFilter,
      priority: priorityFilter,
      startDate: dateRange.start,
      endDate: dateRange.end,
      sortBy,
    });
    fetchStats();
  }, [search, statusFilter, priorityFilter, dateRange, sortBy]);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} logout={handleLogout} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <button
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Task
        </button>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Filters */}
        <Filters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />

        {/* Task List */}
        <div className="mt-6 min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-600 mb-2">
                No tasks found
              </p>
              <p className="text-gray-500">
                Start by creating a new task using the “+ Add Task” button.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={() => handleEdit(task)}
                  selectedTasks={selectedTasks}
                  setSelectedTasks={setSelectedTasks}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Task Modal */}
        {showModal && (
          <TaskModal task={selectedTask} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
