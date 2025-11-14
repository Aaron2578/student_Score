import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function SignUp({ onSignUpSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      setLoading(true);

      // Check if username exists
      const res = await axios.get(`${API_URL}/users?username=${username}`);
      if (res.data.length > 0) {
        setLoading(false);
        return alert("Username already exists!");
      }

      // Create student
      await axios.post(`${API_URL}/users`, {
        username,
        password,
        role: "student",
        marks: 0
      });

      alert("Signup successful!");
      onSignUpSuccess(); // go back to login
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">

        <h2 className="text-3xl font-extrabold mb-6 text-gray-700 text-center">
          Sign Up
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
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center shadow-md transition"
          >
            {loading ? (
              <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onSignUpSuccess}
            className="text-blue-600 font-semibold underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
