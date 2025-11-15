import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function StudentDashboard({ username }) {
  const [student, setStudent] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState("");

  // Fetch student info
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${API_URL}/users?username=${username}`);
      setStudent(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch student's feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/feedbacks?studentUsername=${username}`
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchStudent(), fetchFeedbacks()]).then(() =>
      setLoading(false)
    );
  }, []);

  const submitFeedback = async () => {
    if (!feedbackText.trim()) return alert("Feedback cannot be empty!");

    try {
      await axios.post(`${API_URL}/feedbacks`, {
        studentUsername: username,
        text: feedbackText,
        rating: Number(rating),
        designation,
        visible: false,
      });

      setFeedbackText("");
      setRating(5);
      fetchFeedbacks();
      alert("Feedback submitted! Waiting for admin approval.");
    } catch (err) {
      console.error(err);
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-r from-blue-50 to-purple-50 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Welcome */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 text-center md:text-left">
          Welcome, {student.username}!
        </h1>

        {/* Marks Card */}
        <div className="mb-6 bg-white p-5 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-1">
            <span className="font-semibold">Your Marks: </span>
            {student.marks || 0}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold">Out Of: </span>
            {student.outOf || 0}
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-700">
            Add Feedback
          </h2>

          {/* Designation */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-3">
            <label className="font-semibold text-gray-700">Designation:</label>

            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Select Designation</option>
              <option value="School Student">School Student</option>
              <option value="College Student">College Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="IT Working Professional">
                IT Working Professional
              </option>
              <option value="Working Professional">Non-IT Working Professional</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </div>

          {/* Feedback Text */}
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full border p-3 rounded-lg mb-3 resize-none"
            rows="3"
          />

          {/* Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-3">
            <label className="font-semibold text-gray-700">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border rounded p-2"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow w-full sm:w-auto"
          >
            Submit Feedback
          </button>
        </div>

        {/* Feedback List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-700">
            Your Feedbacks
          </h2>

          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedback submitted yet.</p>
          ) : (
            feedbacks.map((f) => (
              <div
                key={f.id}
                className="border-b py-3 flex flex-col sm:flex-row justify-between"
              >
                <p className="text-gray-700">{f.text}</p>
                <span className="text-yellow-500 font-bold mt-2 sm:mt-0">
                  {"★".repeat(f.rating)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
