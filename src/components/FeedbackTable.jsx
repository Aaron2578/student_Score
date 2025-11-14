export default function FeedbackTable({ feedbacks, toggleVisibility, isStudent }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">{isStudent ? "Visible Feedbacks" : "All Feedbacks"}</h3>
      <ul>
        {feedbacks.map(f => (
          <li key={f.id} className="flex justify-between items-center border-b py-2">
            <span>{f.text} <span className="text-sm text-gray-500">{f.visible ? "(Visible)" : "(Hidden)"}</span></span>
            {!isStudent && (
              <button
                onClick={() => toggleVisibility(f.id, f.visible)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
