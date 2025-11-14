import { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./components/SignIn.jsx";
import AdminStudentTable from "./components/AdminStudentTable.jsx";
import AdminFeedbackTable from "./components/AdminFeedbackTable.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

// API URL
const API_URL = "https://student-json-server-1.onrender.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false); // Spinner state

  // Fetch admin data
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
      fetchAdminData(); // Fetch data only once on admin login
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
  };

  // Spinner while loading admin data
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4"></div>
        <p className="text-gray-700 text-lg">Loading data, please wait...</p>
      </div>
    );
  }

  if (!isLoggedIn) return <SignIn onLoginSuccess={handleLogin} />;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {username} ({role})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {role === "admin" && (
        <>
          <AdminStudentTable students={students} fetchStudents={fetchAdminData} />
          <AdminFeedbackTable feedbacks={feedbacks} fetchFeedbacks={fetchAdminData} />
        </>
      )}

      {role === "student" && <StudentDashboard username={username} />}
    </div>
  );
}

export default App;
