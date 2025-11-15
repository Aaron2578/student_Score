import { useState } from "react";
import axios from "axios";

const API_URL = "https://student-json-server-1.onrender.com";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    if (!name || !designation || !feedback) {
      alert("All fields are required");
      return;
    }

    axios.post(`${API_URL}/feedbacks`, {
      name,
      designation,
      feedback
    }).then(() => {
      alert("Feedback submitted!");
      setName("");
      setDesignation("");
      setFeedback("");
    });
  };

  return (
    <div className="container">
      <h2>Student Feedback</h2>

      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      >
        <option value="">Select Designation</option>
        <option value="college_student">College Student</option>
        <option value="working_professional">Working Professional</option>
        <option value="school_student">School Student</option>
        <option value="teacher">Teacher</option>
        <option value="it_professional">IT Working Professional</option>
      </select>

      <textarea
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
}
