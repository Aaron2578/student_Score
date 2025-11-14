import { useState } from "react";

export default function StudentForm({ addStudent }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) return alert("Enter all fields");
    addStudent({ username, password });
    setUsername(""); setPassword("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Add Student</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
