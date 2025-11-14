import { useState } from "react";
import axios from "axios";

// const API_URL = "http://localhost:5000";
const API_URL = "https://student-json-server-1.onrender.com";

export default function AdminStudentTable({ students, fetchStudents }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [marks, setMarks] = useState(0);

  // Add new student
  const addStudent = async () => {
    if (!newUsername || !newPassword) return alert("Enter username and password");
    try {
      await axios.post(`${API_URL}/users`, {
        username: newUsername,
        password: newPassword,
        role: "student",
        marks: 0
      });
      setNewUsername("");
      setNewPassword("");
      fetchStudents(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing marks
  const startEditing = (student) => {
    setEditingId(student.id);
    setMarks(student.marks || 0);
  };

  // Save marks
  const saveMarks = async (id) => {
    try {
      await axios.patch(`${API_URL}/users/${id}`, { marks: Number(marks) });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Manage Students</h3>

      {/* Add Student */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={addStudent}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Students Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Marks</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.username}</td>
              <td className="border px-4 py-2">
                {editingId === student.id ? (
                  <input
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="border p-1 rounded w-20"
                  />
                ) : (
                  student.marks
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === student.id ? (
                  <button
                    onClick={() => saveMarks(student.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(student)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
