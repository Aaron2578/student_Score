import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function AdminFeedbackTable({ feedbacks, fetchFeedbacks }) {
  // Toggle visibility
  const toggleVisibility = async (id, visible) => {
    try {
      await axios.patch(`${API_URL}/feedbacks/${id}`, { visible: !visible });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`${API_URL}/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Manage Feedbacks</h3>
      <ul>
        {feedbacks.map(f => (
          <li key={f.id} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="font-semibold">{f.studentUsername}:</span>{" "}
              <span>{f.text} </span>
              <span className="text-yellow-500 font-bold">{'★'.repeat(f.rating)}</span>
              {f.visible ? " (Visible)" : " (Hidden)"}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => toggleVisibility(f.id, f.visible)}
                className={`px-3 py-1 rounded text-white ${
                  f.visible ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {f.visible ? "Hide" : "Approve"}
              </button>
              <button
                onClick={() => deleteFeedback(f.id)}
                className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
