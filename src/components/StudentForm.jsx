import { useState } from "react";

export default function StudentForm({ addStudent }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    addStudent({ username: username.trim(), password: password.trim() });
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Add Student</h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <input
          type="password"
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold shadow"
        >
          Add
        </button>
      </div>
    </div>
  );
}
