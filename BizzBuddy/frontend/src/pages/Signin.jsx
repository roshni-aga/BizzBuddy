import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signinUser } from "../app/services/api";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const data = await signinUser(form);

      login(data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050b1d] to-[#0b1c3b] px-4">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-700 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back 👋
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleSignin}
            className="w-full py-3 rounded-lg bg-blue-600 text-white"
          >
            Sign In
          </button>
        </div>

        <p className="text-slate-400 text-sm text-center mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
