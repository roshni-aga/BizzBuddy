import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../app/services/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = await signupUser(form);

      login(data.token);

      navigate("/dashboard");
    } catch {
      alert("Signup failed");
    }
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050b1d] to-[#0b1c3b] px-4">
      <div className="w-full max-w-md bg-[#0f172a] border border-slate-700 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
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
            onClick={handleSignup}
            className="w-full py-3 rounded-lg bg-blue-600 text-white"
          >
            Sign Up
          </button>
        </div>

        <p className="text-slate-400 text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400">
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
}
