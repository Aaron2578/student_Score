import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function StudentDashboard({ username }) {
  const [student, setStudent] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch student info
  const fetchStudent = () => {
    axios
      .get(`${API_URL}/users?username=${username}`)
      .then((res) => setStudent(res.data[0]))
      .catch(console.error);
  };

  // Fetch student's own feedbacks
  const fetchFeedbacks = () => {
    axios
      .get(`${API_URL}/feedbacks?studentUsername=${username}`)
      .then((res) => setFeedbacks(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchStudent();
    fetchFeedbacks();
  }, []);

  // Submit new feedback
  const submitFeedback = async () => {
    if (!feedbackText.trim()) return alert("Feedback cannot be empty!");

    try {
      await axios.post(`${API_URL}/feedbacks`, {
        studentUsername: username,
        text: feedbackText,
        rating: Number(rating),
        visible: false, // Admin will approve
      });
      setFeedbackText("");
      setRating(5);
      fetchFeedbacks();
      alert("Feedback submitted! Waiting for admin approval.");
    } catch (err) {
      console.error(err);
    }
  };

  if (!student) return <p>Loading student data...</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-purple-50 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome, {student.username}!
      </h1>

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Your Marks:</span> {student.marks || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Add Feedback</h2>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full border p-2 rounded mb-2"
        />
        <div className="flex items-center mb-2 space-x-2">
          <label className="font-semibold">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded p-1"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={submitFeedback}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Your Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">You have not submitted any feedback yet.</p>
        ) : (
          feedbacks.map((f) => (
            <div
              key={f.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <p>{f.text}</p>
              <span className="text-yellow-500 font-bold">{'★'.repeat(f.rating)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
