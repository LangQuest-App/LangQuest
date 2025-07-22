import { useNavigate } from "react-router-dom";
const LessonCompletion = ({
  score,
  total,
  wrongQuestions,
}: {
  score: number;
  total: number;
  wrongQuestions: any[];
}) => {
  const navigate = useNavigate();
  const reloadLessons = () => {
    navigate("/home");
  };
  console.log(wrongQuestions);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70">
      <div className="bg-white shadow-2xl rounded-2xl p-12 border border-green-100/40 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">
          Lesson Complete!
        </h2>
        <div className="text-2xl font-bold text-green-800 mb-4">
          Your Score: {score} / {total}
        </div>
        <div className="text-lg text-gray-700 mb-2">
          You answered {total - wrongQuestions.length} correctly.
        </div>
        <div className="text-lg text-gray-700 mb-8">
          Review and try again for better results!
        </div>
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
