import { useState } from "react";
import axios from "axios";
import SignUp from "./SignUp.jsx";

const API_URL = "https://student-json-server-1.onrender.com";

export default function SignIn({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/users?username=${username}&password=${password}`
      );

      if (res.data.length === 0) {
        alert("Invalid credentials");
      } else {
        const user = res.data[0];

        // ⭐ SAVE LOGIN IN LOCAL STORAGE
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        onLoginSuccess(user.username, user.role);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showSignUp) {
    return <SignUp onSignUpSuccess={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md transition-all">

        <h2 className="text-3xl font-extrabold mb-6 text-gray-700 text-center">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center shadow-md transition"
          >
            {loading ? (
              <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
            className="text-green-600 font-semibold underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
