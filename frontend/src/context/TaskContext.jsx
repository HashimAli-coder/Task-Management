import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (params = {}) => {
    setLoading(true);
    try {
      const res = await API.get("/tasks", { params });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const res = await API.post("/tasks", taskData);
      setTasks((prev) => [res.data, ...prev]);
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await API.put(`/tasks/${id}`, data);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
