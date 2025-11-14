import { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./components/SignIn.jsx";
import AdminStudentTable from "./components/AdminStudentTable.jsx";
import AdminFeedbackTable from "./components/AdminFeedbackTable.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

const API_URL = "https://student-json-server-1.onrender.com";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  }, [isLoggedIn, role, username]);

  const fetchStudents = () => {
    axios.get(`${API_URL}/users?role=student`)
      .then(res => setStudents(res.data))
      .catch(console.error);
  };

  const fetchFeedbacks = () => {
    axios.get(`${API_URL}/feedbacks`)
      .then(res => setFeedbacks(res.data))
      .catch(console.error);
  };

  const handleLogin = (username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
    if (role === "admin") {
      fetchStudents();
      fetchFeedbacks();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    localStorage.clear(); // clear persistent login
  };

  if (!isLoggedIn) return <SignIn onLoginSuccess={handleLogin} />;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {username} ({role})</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {role === "admin" && (
        <>
          <AdminStudentTable students={students} fetchStudents={fetchStudents} />
          <AdminFeedbackTable feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
        </>
      )}

      {role === "student" && <StudentDashboard username={username} />}
    </div>
  );
}

export default App;
