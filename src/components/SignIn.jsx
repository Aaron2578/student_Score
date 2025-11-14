import { useState } from "react";
import axios from "axios";
import SignUp from "./SignUp.jsx";

const API_URL = "http://localhost:5000";

export default function SignIn({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      const res = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
      if (res.data.length === 0) {
        alert("Invalid credentials");
      } else {
        const user = res.data[0];
        onLoginSuccess(user.username, user.role);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (showSignUp) {
    return <SignUp onSignUpSuccess={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>
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
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
            className="text-green-500 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
