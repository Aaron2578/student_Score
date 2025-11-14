import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function StudentTable({ students, fetchStudents }) {
  const [editingId, setEditingId] = useState(null);
  const [marks, setMarks] = useState(0);

  const startEditing = (student) => {
    setEditingId(student.id);
    setMarks(student.marks || 0);
  };

  const saveMarks = async (id) => {
    try {
      await axios.patch(`${API_URL}/users/${id}`, { marks: Number(marks) });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Students List</h3>

      {/* Desktop Table */}
      <table className="hidden sm:table table-auto w-full border-collapse">
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

              <td className="border px-4 py-2">
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

      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <p><span className="font-semibold">ID:</span> {student.id}</p>
            <p><span className="font-semibold">Username:</span> {student.username}</p>

            <p className="mt-2">
              <span className="font-semibold">Marks:</span>{" "}
              {editingId === student.id ? (
                <input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="border p-1 rounded w-24 mt-1"
                />
              ) : (
                student.marks
              )}
            </p>

            <button
              onClick={() =>
                editingId === student.id
                  ? saveMarks(student.id)
                  : startEditing(student)
              }
              className={`mt-3 w-full text-white py-2 rounded ${
                editingId === student.id
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editingId === student.id ? "Save" : "Edit"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
