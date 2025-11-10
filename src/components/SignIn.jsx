import { useState } from "react";
import axios from "axios";

function SignIn({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLoginSuccess(user.username, user.role);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Sign In</button>
    </form>
  );
}

export default SignIn;
