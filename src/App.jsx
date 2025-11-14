import { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./components/SignIn.jsx";
import AdminStudentTable from "./components/AdminStudentTable.jsx";
import AdminFeedbackTable from "./components/AdminFeedbackTable.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

const API_URL = "https://student-json-server-1.onrender.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const studentsRes = await axios.get(`${API_URL}/users?role=student`);
      const feedbacksRes = await axios.get(`${API_URL}/feedbacks`);

      setStudents(studentsRes.data);
      setFeedbacks(feedbacksRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);

    if (role === "admin") {
      fetchAdminData();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
  };

  // ⭐ Modern Spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-700 text-lg mt-4 text-center">
          Loading data, please wait...
        </p>
      </div>
    );
  }

  // Login Page
  if (!isLoggedIn) return <SignIn onLoginSuccess={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Welcome, {username} ({role})
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Admin Dashboard */}
      {role === "admin" && (
        <div className="space-y-6">
          <AdminStudentTable
            students={students}
            fetchStudents={fetchAdminData}
          />
          <AdminFeedbackTable
            feedbacks={feedbacks}
            fetchFeedbacks={fetchAdminData}
          />
        </div>
      )}

      {/* Student Dashboard */}
      {role === "student" && <StudentDashboard username={username} />}
    </div>
  );
}

export default App;
