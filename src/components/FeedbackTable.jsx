export default function FeedbackTable({ feedbacks, toggleVisibility, isStudent }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 mb-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        {isStudent ? "Visible Feedbacks" : "All Feedbacks"}
      </h3>

      <ul className="space-y-3">
        {feedbacks.map((f) => (
          <li
            key={f.id}
            className="
              flex flex-col sm:flex-row sm:justify-between sm:items-center 
              border-b pb-3 pt-1
            "
          >
            {/* Feedback text */}
            <span className="text-gray-700 text-sm sm:text-base">
              {f.text}{" "}
              <span className="text-xs text-gray-500">
                {f.visible ? "(Visible)" : "(Hidden)"}
              </span>
            </span>

            {/* Toggle Button (Admin only) */}
            {!isStudent && (
              <button
                onClick={() => toggleVisibility(f.id, f.visible)}
                className="
                  mt-2 sm:mt-0 
                  bg-purple-500 hover:bg-purple-600 
                  text-white px-4 py-1.5 
                  rounded-md text-sm
                "
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
