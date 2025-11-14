import { useState } from "react";

export default function FeedbackForm({ submitFeedback }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return alert("Please enter your feedback.");

    setLoading(true);

    // Simulate short delay to show UX feedback
    setTimeout(() => {
      submitFeedback(text.trim());
      setText("");
      setLoading(false);
    }, 300);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 mb-6 transition-all">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Submit Feedback
      </h3>

      <textarea
        className="border w-full p-3 rounded-md mb-4 text-sm sm:text-base
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   min-h-[120px] resize-none"
        placeholder="Write your feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className={`w-full sm:w-auto px-5 py-2 rounded-md text-white font-medium 
          transition-all
          ${
            loading || !text.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
