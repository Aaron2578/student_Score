import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";
// const API_URL = "https://student-json-server-1.onrender.com";

export default function StudentTable({ students, fetchStudents }) {
  const [editingId, setEditingId] = useState(null);
  const [marks, setMarks] = useState(0);

  const startEditing = (student) => {
    setEditingId(student.id);
    setMarks(student.marks || 0);
  };

  const saveMarks = (id) => {
    axios.patch(`${API_URL}/users/${id}`, { marks: Number(marks) })
      .then(() => {
        setEditingId(null);
        fetchStudents(); // Refresh list
      })
      .catch(console.error);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Students List</h3>
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
          {students.map(student => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
