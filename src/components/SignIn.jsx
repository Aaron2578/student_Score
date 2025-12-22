import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignIn({ onLoginSuccess, onShowSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        // onLoginSuccess is still called for backward compatibility if needed, 
        // though App.jsx handles session changes now.
        onLoginSuccess(data.user.email, "user"); 
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md transition-all">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-700 text-center">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center shadow-md transition"
          >
            {loading ? (
              <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            onClick={onShowSignUp}
            className="text-green-600 font-semibold underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
