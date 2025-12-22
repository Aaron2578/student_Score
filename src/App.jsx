import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import AdminStudentTable from "./components/AdminStudentTable.jsx";
import AdminFeedbackTable from "./components/AdminFeedbackTable.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

function App() {
  const [session, setSession] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user);
      } else {
        setUserMetadata(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (user) => {
    try {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        // 🛡️ FALLBACK: Use Auth Metadata if profile row is missing
        setUserMetadata({
          username: user.user_metadata?.username || user.email?.split('@')[0],
          role: 'student', 
          designation: user.user_metadata?.designation || 'Not Set',
          total_marks: 0,
          out_of: 0
        });
      } else {
        setUserMetadata(profile);
        if (profile.role === "admin") {
          await fetchAdminData();
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student');
      
      const { data: feedbacksData } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      setStudents(studentsData || []);
      setFeedbacks(feedbacksData || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // 🧨 Force clear all Supabase keys from local storage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload(); // Hard refresh to reset app state
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-700 text-lg mt-4 text-center">
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (!session) {
    return showSignUp ? (
      <SignUp onSignUpSuccess={() => setShowSignUp(false)} />
    ) : (
      <SignIn onLoginSuccess={() => {}} onShowSignUp={() => setShowSignUp(true)} />
    );
  }

  const role = userMetadata?.role;
  const username = userMetadata?.username;

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
      {role === "student" && <StudentDashboard username={username} userId={session.user.id} />}
    </div>
  );
}

export default App;
