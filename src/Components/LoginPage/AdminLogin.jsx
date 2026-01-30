import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/login?isAdmin=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      onLogin();
      navigate("/");
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[360px]">

        <h2 className="text-2xl font-bold text-center mb-6 text-[#1C3F6E]">
          LaundryPad Admin
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-[#1C3F6E]"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-[#1C3F6E]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#1C3F6E] text-white py-3 rounded-lg hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}
