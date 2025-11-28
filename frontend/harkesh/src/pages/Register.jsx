// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axiosClient from "../api/axiosClient.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password && form.password.length < 6)
      newErrors.password = "Min 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axiosClient.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-yellow rounded-lg shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>

      {apiError && (
        <p className="mb-3 text-sm text-red-600">{apiError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 text-yellow rounded py-2 text-sm"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
