import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LessonCompletionProps {
  score: number;
  total: number;
  lesson_id: string;
  wrongQuestions: any[];
}

const LessonCompletion = ({ score, total, lesson_id, wrongQuestions }: LessonCompletionProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const reloadLessons = () => {
    navigate("/home");
  };

  useEffect(() => {
    const updateDbwithMistakes = async () => {
      setUpdating(true);
      setError(null);
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;
        const response = await window.electronAPI.fetchData(
          `${BACKEND_URL}/lesson/update`,
          { questions: wrongQuestions, lesson_id },
          "POST"
        );
        // console.log("Response from update:", response);
        if (response.status !== 200) {
          setError(response.message || "Failed to update mistakes");
        }
      } catch (err: any) {
        setError(err?.message || "Internal server error");
      } finally {
        setUpdating(false);
      }
    };
    updateDbwithMistakes();
  }, [wrongQuestions, lesson_id]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70">
      <div className="bg-white shadow-2xl rounded-2xl p-12 border border-green-100/40 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">Lesson Complete!</h2>
        <div className="text-2xl font-bold text-green-800 mb-4">Your Score: {score} / {total}</div>
        <div className="text-lg text-gray-700 mb-2">You answered {total - wrongQuestions.length} correctly.</div>
        <div className="text-lg text-gray-700 mb-8">Review and try again for better results!</div>
        {updating && (
          <div className="text-green-700 font-semibold mb-4">Updating mistakes...</div>
        )}
        {error && (
          <div className="text-red-600 font-semibold mb-4">{error}</div>
        )}
        <button
          onClick={reloadLessons}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
};

export default LessonCompletion;
