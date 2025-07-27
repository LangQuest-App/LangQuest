import type { Lesson } from '@/ui/lib/types/lesson';
import React, { useEffect } from 'react';
import AttemptLesson from './AttemptLesson';
import MistakesViewer from './MistakesViewer';

const LessonList = () => {
  const BACKEND_URL = "https://langquest-backend.onrender.com";
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [attempting, setAttempting] = React.useState<number | null>(null);
  const [viewMistakesIdx, setViewMistakesIdx] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchLesson = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await window.electronAPI.fetchData(
        `${BACKEND_URL}/lesson/get/3`,
        {},
        'GET'
      );
      if (response.status !== 200) {
        setError(response.message || 'Failed to fetch lessons');
        setLessons([]);
      } else {
        setLessons(response.data);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Internal server error');
      setLessons([]);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLesson();
  }, []);

  if (viewMistakesIdx !== null && lessons[viewMistakesIdx]) {
    return <MistakesViewer lessonId={lessons[viewMistakesIdx].id} lesson={lessons[viewMistakesIdx]} />;
  }
  if (attempting !== null) {
    return <AttemptLesson lesson={lessons[attempting]} />;
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br py-12 px-4 flex flex-col items-center overflow-hidden relative">
      <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-60 -left-60 w-[900px] h-[900px] bg-gradient-to-tr from-green-300/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-200/20 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      <h2 className="text-7xl font-bold text-green-700 font-family-fredoka mb-8">Your Lessons</h2>
      <div className="flex flex-col gap-8 items-center w-full max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid mb-4"></div>
            <div className="text-lg text-green-700 font-bold">Loading lessons...</div>
          </div>
        ) : error ? (
          <div className="text-lg text-red-600 font-bold py-12">{error}</div>
        ) : lessons.length === 0 ? (
          <div className="text-lg text-gray-500">No lessons found.</div>
        ) : (
          lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className=" z-40 flex flex-row bg-white items-center shadow-2xl rounded-2xl overflow-hidden w-full min-h-[120px] max-w-4xl transition hover:scale-[1.03] border border-green-100/40"
            >
              <div className="flex flex-row items-center justify-between w-full p-8">
                <div>
                  <h3 className="text-2xl font-family-fredoka font-extrabold text-zinc-700 mb-2">{lesson.title}</h3>
                  <p className="text-base font-family-fredoka text-gray-600">{lesson.questions.length} Questions</p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-family-fredoka tracking-wider transition font-medium shadow-md"
                    onClick={() => setAttempting(index)}
                  >
                    {lesson.attempted ? 'Reattempt' : 'Attempt Lesson'}
                  </button>
                  {lesson.attempted && (
                    <button
                      className="bg-yellow-400 text-zinc-900 px-6 py-2 rounded-lg hover:bg-yellow-500 font-family-fredoka tracking-wider transition font-medium shadow-md border-2 border-yellow-600"
                      onClick={() => setViewMistakesIdx(index)}
                      title="View Mistakes"
                    >
                      View Mistakes
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonList;