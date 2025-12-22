import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminStudentTable({ students, fetchStudents }) {
  const [newUsername, setNewUsername] = useState("");
  const [designation, setDesignation] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [outOf, setOutOf] = useState(0);

  // ⭐ NEW STATE FOR EDITING DESIGNATION
  const [editDesignation, setEditDesignation] = useState("");

  // Update profile
  const saveMarks = async (id) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          total_marks: Number(totalMarks),
          out_of: Number(outOf),
          designation: editDesignation
        })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete this student's profile? Auth user will remain.")) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (student) => {
    setEditingId(student.id);
    setTotalMarks(student.total_marks || 0);
    setOutOf(student.out_of || 0);
    setEditDesignation(student.designation || "");
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mb-10 w-full max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Manage Students</h3>

      <p className="mb-4 text-sm text-gray-500 italic">
        Note: Use Supabase Dashboard to manage Auth Users. This table manages user profiles.
      </p>

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
              <th className="border px-4 py-2">Percentage</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(students || []).map((student) => {
              const percentage =
                student.out_of > 0
                  ? ((student.total_marks / student.out_of) * 100).toFixed(2)
                  : "0";

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-xs">{student.id}</td>
                  <td className="border px-4 py-2">{student.username}</td>

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

                  <td className="border px-4 py-2 text-center">
                    {editingId === student.id ? (
                      <input
                        type="number"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        className="border p-1 rounded w-20 text-center"
                      />
                    ) : (
                      student.total_marks
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editingId === student.id ? (
                      <input
                        type="number"
                        value={outOf}
                        onChange={(e) => setOutOf(e.target.value)}
                        className="border p-1 rounded w-20 text-center"
                      />
                    ) : (
                      student.out_of
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">{percentage}%</td>

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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
