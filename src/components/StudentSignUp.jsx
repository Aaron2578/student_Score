import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

function StudentSignUp({ onSignUpSuccess }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !username.trim() || !password.trim()) {
      return setErrorMsg("All fields are required.");
    }

    if (password.length < 4) {
      return setErrorMsg("Password must be at least 4 characters.");
    }

    setErrorMsg("");
    setLoading(true);

    try {
      // Check username availability
      const res = await axios.get(`${API_URL}/users?username=${username.trim()}`);
      if (res.data.length > 0) {
        setLoading(false);
        return setErrorMsg("Username already exists!");
      }

      // Create user login record
      await axios.post(`${API_URL}/users`, {
        username: username.trim(),
        password: password.trim(),
        role: "student",
      });

      // Create student academic record
      await axios.post(`${API_URL}/students`, {
        name: name.trim(),
        username: username.trim(),
        score: 0,
      });

      setName("");
      setUsername("");
      setPassword("");

      onSignUpSuccess();
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-3"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2">Student Sign Up</h2>

      {errorMsg && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {errorMsg}
        </p>
      )}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password (min 4 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        } text-white px-4 py-2 rounded w-full transition`}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}

export default StudentSignUp;
