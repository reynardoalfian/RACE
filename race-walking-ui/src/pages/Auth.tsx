import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/api/login" : "/api/register";
    const payload = { email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setMessage(data.message);

      if (isLogin) {
        // ✅ Store user data in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/profile"; // Redirect to profile page
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex justify-center space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isLogin ? "bg-black text-white" : "text-gray-500"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            !isLogin ? "bg-black text-white" : "text-gray-500"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
