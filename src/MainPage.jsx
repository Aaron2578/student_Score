import { useState, useEffect } from "react";
import axios from "axios";
import App from "./App.jsx"; // After login

const API_URL = "https://student-json-server-1.onrender.com";

export default function MainPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/feedbacks?visible=true`)
      .then((res) => setFeedbacks(res.data))
      .catch(console.error);
  }, []);

  if (showLogin) {
    // After clicking login, show App page
    return <App />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Feedback Dashboard</h1>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Login
        </button>
      </header>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No feedback is available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div
              key={f.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">{f.studentUsername}</span>
                <span className="text-yellow-500 font-bold">{'★'.repeat(f.rating)}</span>
              </div>
              <p className="text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
