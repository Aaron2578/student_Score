import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function SignUp({ onSignUpSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      // Check if username already exists
      const res = await axios.get(`${API_URL}/users?username=${username}`);
      if (res.data.length > 0) {
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSignUpSuccess}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
