
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const fetchProfile = async () => {
    try {
      const res = await axiosClient.get("/auth/profile");
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/tasks", {
        params: { search, status: statusFilter }
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await axiosClient.post("/tasks", { title: newTask });
      setTasks((prev) => [res.data, ...prev]);
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "done"
        : "pending";

    try {
      const res = await axiosClient.put(`/tasks/${task._id}`, {
        status: nextStatus
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axiosClient.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile section */}
      <section className="bg-black rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2 text-lg">Profile</h2>
        {profile ? (
          <div className="text-sm text-slate-700 space-y-1">
            <p>
              <span className="font-medium">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {profile.email}
            </p>
            {/* <p className="text-xs text-slate-500">
             
            </p> */}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Loading profile...</p>
        )}
      </section>

      {/* Task controls */}
      <section className="bg-black rounded-lg shadow p-4 space-y-4">
        <h2 className="font-semibold mb-2 text-lg">Tasks</h2>

        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Add new task (e.g. Analyze BTC orderbook)"
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-slate-500 text-pink text-sm"
          >
            Add
          </button>
        </form>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border rounded px-3 py-2 text-sm flex-1 bg-gray-100 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2 text-sm w-full sm:w-40 bg-gray-100 text-black"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="border-t pt-3 mt-2">
          {loading ? (
            <p className="text-sm text-yellow">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-yellow">No tasks found.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center justify-between bg-yellow rounded px-3 py-2"
                >
                  <div>
                    <p className="text-sm">{task.title}</p>
                    <p className="text-xs text-yellow">
                      Status: {task.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className="text-xs border rounded px-2 py-1"
                    >
                      Next status
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
