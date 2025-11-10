import { useState } from "react";

function StudentTable({ students, deleteStudent, updateStudent, isAdmin }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editScore, setEditScore] = useState("");

  const startEditing = (student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditScore(student.score);
  };

  const cancelEditing = () => setEditingId(null);

  const saveEdit = (id) => {
    updateStudent(id, { name: editName, score: Number(editScore) });
    setEditingId(null);
  };

  return (
    
    <table className="border-collapse border border-gray-300 w-80">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Score</th>
          {isAdmin && <th className="border p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td className="border p-2">
              {editingId === s.id ? (
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
              ) : (
                s.name
              )}
            </td>
            <td className="border p-2">
              {editingId === s.id ? (
                <input type="number" value={editScore} onChange={(e) => setEditScore(e.target.value)} />
              ) : (
                s.score
              )}
            </td>
            {isAdmin && (
              <td className="border p-2 space-x-2">
                {editingId === s.id ? (
                  <>
                    <button onClick={() => saveEdit(s.id)} className="bg-green-500 text-white px-2 rounded">Save</button>
                    <button onClick={cancelEditing} className="bg-gray-500 text-white px-2 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(s)} className="bg-blue-500 text-white px-2 rounded">Edit</button>
                    <button onClick={() => deleteStudent(s.id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
