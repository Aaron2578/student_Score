import { useState, useEffect } from "react";
import axios from "axios";
import App from "./App.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";

const API_URL = "https://student-json-server-1.onrender.com";

export default function MainPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/feedbacks?visible=true`)
      .then((res) => setFeedbacks(res.data))
      .catch(console.error);
  }, []);

  // ✔ FIXED login
  const handleLoginSuccess = (username, role) => {
    setUsername(username);
    setRole(role);
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setUsername("");
    setRole("");
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowSignUp(false);
  };

  // Render Login / Sign Up page
  if (!isLoggedIn && (showLogin || showSignUp)) {
    return showSignUp ? (
      <SignUp onSignUpSuccess={handleLoginSuccess} />
    ) : (
      <SignIn
        onLoginSuccess={handleLoginSuccess}
        onShowSignUp={() => setShowSignUp(true)}
      />
    );
  }

  // If logged in → go to Dashboard
  if (isLoggedIn) {
    return <App username={username} role={role} onLogout={handleLogout} />;
  }

  // -----------------------------
  // LANDING PAGE (Home Page)
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-12 font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
          Student Feedback Dashboard
        </h1>

        <div className="space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg transition"
          >
            Login
          </button>

          <button
            onClick={() => setShowSignUp(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-lg transition"
          >
            Student Sign Up
          </button>
        </div>
      </header>

      {/* FEEDBACK CARDS */}
      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-16">
          No feedback available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div
              key={f.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl border border-gray-100 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {f.studentUsername}
                </span>

                <span className="text-yellow-500 font-bold text-lg">
                  {"★".repeat(f.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                <strong>Designation:</strong> {f.designation || "Not Provided"}
              </p>

              <p className="text-gray-600 text-sm md:text-base"><strong>Feedback :</strong>{f.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
