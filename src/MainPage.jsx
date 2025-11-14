import { useState, useEffect } from "react";
import axios from "axios";
import App from "./App.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";

const API_URL = "http://localhost:5000";

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

  const handleLoginSuccess = (username, role) => {
    setUsername(username);
    setRole(role);
    setIsLoggedIn(true);
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setUsername("");
    setRole("");
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowSignUp(false);
  };

  // Show login/signup if user clicks login button
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

  if (isLoggedIn) {
    // Pass username & role to App (admin/student dashboard)
    return <App username={username} role={role} onLogout={handleLogout} />;
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Student Feedback Dashboard
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignUp(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            Student Sign Up
          </button>
        </div>
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
                <span className="font-semibold text-gray-700">
                  {f.studentUsername}
                </span>
                <span className="text-yellow-500 font-bold">
                  {"★".repeat(f.rating)}
                </span>
              </div>
              <p className="text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
