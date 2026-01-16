import React from "react";
import { useDispatch } from "react-redux";
import { useLoginAdminMutation } from "../Store/Features/auth_api";
import { setUser } from "../Store/Slices/auth_slice";
import { useNavigate } from "react-router-dom";
import { localStorageKeys } from "../Utils/LocalStoragekeys";

export const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [login] = useLoginAdminMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = { email, password };
      const result = await login(data).unwrap();

      if (result?.admin && result?.token) {
        dispatch(setUser(result.admin));
        localStorage.setItem(localStorageKeys.token, result?.token);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Music Studio Login
        </h1>
        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
