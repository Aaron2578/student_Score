import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentSignUp from "./components/StudentSignUp";
import SignIn from "./components/SignIn";

function App() {
  // Initialize state from localStorage to persist login on refresh
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [showSignUp, setShowSignUp] = useState(false);
  const [students, setStudents] = useState([]);

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  }, [isLoggedIn, username, role]);

  // Handle login
  const handleLoginSuccess = (username, role) => {
    setUsername(username);
    setRole(role);
    setIsLoggedIn(true);
  };

  const handleSignUpSuccess = () => setShowSignUp(false);

  // Fetch students for admin or current student
  const fetchStudents = () => {
    if (role === "admin") {
      axios.get("http://localhost:5000/students")
        .then(res => setStudents(res.data))
        .catch(err => console.error(err));
    } else {
      axios.get(`http://localhost:5000/students?username=${username}`)
        .then(res => setStudents(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchStudents();
  }, [isLoggedIn, username, role]);

  // Add student (only admin)
  const addStudent = (student) => {
    const studentWithUser = { ...student, username }; // attach admin username
    axios.post("http://localhost:5000/students", studentWithUser)
      .then(res => setStudents([...students, res.data]))
      .catch(err => console.error(err));
  };

  // Delete student (only admin)
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => setStudents(students.filter(s => s.id !== id)))
      .catch(err => console.error(err));
  };

  // Update student (only admin)
  const updateStudent = (id, updatedData) => {
    axios.patch(`http://localhost:5000/students/${id}`, updatedData)
      .then(() => fetchStudents())
      .catch(err => console.error(err));
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
    setStudents([]);
    localStorage.clear();
  };

  // Login/Signup screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-8">
        {showSignUp ? (
          <>
            <StudentSignUp onSignUpSuccess={handleSignUpSuccess} />
            <p className="mt-4 text-gray-700">
              Already have an account?{" "}
              <button onClick={() => setShowSignUp(false)} className="text-blue-500 underline">
                Sign In
              </button>
            </p>
          </>
        ) : (
          <>
            <SignIn onLoginSuccess={handleLoginSuccess} />
            <p className="mt-4 text-gray-700">
              Don't have an account?{" "}
              <button onClick={() => setShowSignUp(true)} className="text-green-500 underline">
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Main App for logged-in user
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center p-8">
      <div className="flex justify-between w-full mb-4">
        <p className="text-gray-700 font-semibold">Welcome, {username}!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">🎓 Student Score Tracker</h1>

      {/* Admin can add students */}
      {role === "admin" && <StudentForm addStudent={addStudent} />}

      {/* Table of students */}
      <StudentTable
        students={students}
        deleteStudent={deleteStudent}
        updateStudent={updateStudent}
        isAdmin={role === "admin"}
      />
    </div>
  );
}

export default App;
