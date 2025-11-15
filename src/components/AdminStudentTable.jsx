import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function AdminStudentTable({ students, fetchStudents }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [designation, setDesignation] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [outOf, setOutOf] = useState(0);

  // ⭐ NEW STATE FOR EDITING DESIGNATION
  const [editDesignation, setEditDesignation] = useState("");

  // Add new student
  const addStudent = async () => {
    if (!newUsername || !newPassword || !designation)
      return alert("Enter username, password and designation");

    try {
      await axios.post(`${API_URL}/users`, {
        username: newUsername,
        password: newPassword,
        role: "student",
        designation,
        totalMarks: 0,
        outOf: 0
      });

      setNewUsername("");
      setNewPassword("");
      setDesignation("");
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (student) => {
    setEditingId(student.id);
    setTotalMarks(student.totalMarks || 0);
    setOutOf(student.outOf || 0);

    // ⭐ LOAD CURRENT DESIGNATION FOR EDITING
    setEditDesignation(student.designation || "");
  };

  const saveMarks = async (id) => {
    try {
      await axios.patch(`${API_URL}/users/${id}`, {
        totalMarks: Number(totalMarks),
        outOf: Number(outOf),

        // ⭐ SAVE NEW DESIGNATION
        designation: editDesignation
      });

      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="bg-white shadow-xl rounded-xl p-6 mb-10 w-full max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Manage Students</h3>

      {/* Add Student */}
      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        />

        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        />

        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="">Select Designation</option>
          <option value="School Student">School Student</option>
          <option value="College Student">College Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="IT Working Professional">IT Working Professional</option>
          <option value="Working Professional">Non-IT Working Professional</option>
          <option value="Job Seeker">Job Seeker</option>
        </select>

        <button
          onClick={addStudent}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Total Marks</th>
              <th className="border px-4 py-2">Out Of</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.username}</td>

                {/* ⭐ CHANGE DESIGNATION WHEN EDITING */}
                <td className="border px-4 py-2">
                  {editingId === student.id ? (
                    <select
                      value={editDesignation}
                      onChange={(e) => setEditDesignation(e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="School Student">School Student</option>
                      <option value="College Student">College Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="IT Working Professional">IT Working Professional</option>
                      <option value="Working Professional">Non-IT Working Professional</option>
                      <option value="Job Seeker">Job Seeker</option>
                    </select>
                  ) : (
                    student.designation?.replace(/_/g, " ")
                  )}
                </td>

                {/* Editable MARKS */}
                <td className="border px-4 py-2 text-center">
                  {editingId === student.id ? (
                    <input
                      type="number"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      className="border p-1 rounded w-20 text-center"
                    />
                  ) : (
                    student.totalMarks
                  )}
                </td>

                {/* Editable OUT OF */}
                <td className="border px-4 py-2 text-center">
                  {editingId === student.id ? (
                    <input
                      type="number"
                      value={outOf}
                      onChange={(e) => setOutOf(e.target.value)}
                      className="border p-1 rounded w-20 text-center"
                    />
                  ) : (
                    student.outOf
                  )}
                </td>

                <td className="border px-4 py-2 flex gap-2 justify-center">
                  {editingId === student.id ? (
                    <button
                      onClick={() => saveMarks(student.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(student)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
