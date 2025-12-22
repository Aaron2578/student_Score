import { supabase } from "../supabaseClient";

export default function AdminFeedbackTable({ feedbacks, fetchFeedbacks }) {
  // Toggle visibility
  const toggleVisibility = async (id, visible) => {
    try {
      const { error } = await supabase
        .from('feedbacks')
        .update({ visible: !visible })
        .eq('id', id);
      
      if (error) throw error;
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Error updating feedback visibility");
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const { error } = await supabase
        .from('feedbacks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mb-6 w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
        Manage Feedbacks
      </h3>

      <ul className="space-y-4">
        {(feedbacks || []).map((f) => (
          <li
            key={f.id}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            {/* Feedback Content */}
            <div className="text-gray-700">
              <span className="font-semibold">{f.student_username}:</span>{" "}
              <span>{f.text} </span>

              <span className="text-yellow-500 font-bold">
                {"★".repeat(f.rating)}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {f.visible ? "(Visible)" : "(Hidden)"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => toggleVisibility(f.id, f.visible)}
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium shadow
                  ${
                    f.visible
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }
                `}
              >
                {f.visible ? "Hide" : "Approve"}
              </button>

              <button
                onClick={() => deleteFeedback(f.id)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium shadow"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
