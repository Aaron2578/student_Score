import { useState } from "react";
import axios from "axios";

function SignUp({ onSignUpSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Fill all fields!");

    try {
      // Check if user already exists
      const res = await axios.get(`http://localhost:5000/users?username=${username}`);
      if (res.data.length > 0) {
        return alert("Username already exists!");
      }

      // Create new user
      await axios.post("http://localhost:5000/users", { username, password });
      alert("User registered successfully!");
      onSignUpSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-80 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg">
        Register
      </button>
    </form>
  );
}

export default SignUp;
