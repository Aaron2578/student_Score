import { useState } from "react";
import axios from "axios";

function StudentSignUp({ onSignUpSuccess }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0); // Students cannot edit score

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !password) return alert("Fill all fields");

    try {
      // 1️⃣ create user with role 'student'
      await axios.post("http://localhost:5000/users", { username, password, role: "student" });
      // 2️⃣ create student record (score = 0 initially)
      await axios.post("http://localhost:5000/students", { name, username, score: 0 });

      alert("Student account created!");
      setName("");
      setUsername("");
      setPassword("");
      onSignUpSuccess();
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-80">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Sign Up</button>
    </form>
  );
}

export default StudentSignUp;
