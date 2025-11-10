import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

function StudentSignUp({ onSignUpSuccess }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !password) return alert("Fill all fields");
    setLoading(true);

    try {
      // Check if username already exists
      const res = await axios.get(`${API_URL}/users?username=${username}`);
      if (res.data.length > 0) {
        setLoading(false);
        return alert("Username already exists!");
      }

      // 1️⃣ create user with role 'student'
      await axios.post(`${API_URL}/users`, { username, password, role: "student" });
      // 2️⃣ create student record (score = 0 initially)
      await axios.post(`${API_URL}/students`, { name, username, score: 0 });

      alert("Student account created!");
      setName("");
      setUsername("");
      setPassword("");
      onSignUpSuccess();
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-80 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}

export default StudentSignUp;
