import { useState } from "react";

export default function FeedbackForm({ submitFeedback }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text) return alert("Enter feedback");
    submitFeedback(text);
    setText("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Submit Feedback</h3>
      <textarea
        className="border w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your feedback..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow font-semibold"
      >
        Submit
      </button>
    </div>
  );
}
