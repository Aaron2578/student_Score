import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("School Student");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !username || !password) return alert("All fields are required!");

    try {
      setLoading(true);

      // 1. Auth Sign Up with Metadata
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            designation,
          },
        },
      });

      if (authError) throw authError;

      alert("Signup successful! Please check your email for confirmation (if enabled).");
      onSignUpSuccess(); // go back to login
    } catch (err) {

      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-700 text-center">
          Sign Up
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border w-full p-3 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="School Student">School Student</option>
            <option value="College Student">College Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="IT Working Professional">IT Working Professional</option>
            <option value="Working Professional">Non-IT Working Professional</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center shadow-md transition"
          >
            {loading ? (
              <div className="border-2 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onSignUpSuccess}
            className="text-blue-600 font-semibold underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
