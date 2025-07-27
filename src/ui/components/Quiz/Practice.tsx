


import React, { useEffect, useState } from 'react';
import { toast } from '@/ui/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type Mistake = {
  question: string;
  user_answer?: string;
  correct_answer?: string;
  options: string[];
  tts_url?: string;
  phonetic?: string;
  answer_type?: string;
  [key: string]: any;
};

const Practice = () => {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [locked, setLocked] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMistakes = async () => {
      setLoading(true);
      setError(null);
      try {
        const BACKEND_URL = "https://langquest-backend.onrender.com";
        const response = await window.electronAPI.fetchData(
          `${BACKEND_URL}/lesson/get-all-mistakes`,
          {},
          'GET'
        );
        // console.log(response)
        if (response.status !== 200) {
          throw new Error(response.message || 'Failed to fetch mistakes');
        }
        setMistakes(response.data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Internal server error';
        setError(errorMsg);
        setMistakes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMistakes();
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrent(0);
    setAnswers({});
    setLocked({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number) => {
    if (!locked[idx]) {
      setAnswers({ ...answers, [idx]: e.target.value });
    }
  };

  const handleOptionChange = (idx: number, option: string) => {
    if (!locked[idx]) {
      setAnswers({ ...answers, [idx]: option });
      checkAnswer(idx, option);
    }
  };

  const checkAnswer = (idx: number, value?: string) => {
    const mistake = mistakes[idx];
    const answer = value !== undefined ? value : answers[idx];
    setLocked((prev) => ({ ...prev, [idx]: true }));
    if (mistake.answer_type === 'multiple_choice') {
      if (answer?.trim().toLowerCase() === mistake.correct_answer?.trim().toLowerCase()) {
        toast.success({ title: 'Correct!', description: 'Great job! You remembered the right answer.' });
      } else {
        toast.error({ title: 'Incorrect', description: `Correct answer: ${mistake.correct_answer}` });
      }
    } else {
      if (answer?.trim().toLowerCase() === mistake.correct_answer?.trim().toLowerCase()) {
        toast.success({ title: 'Correct!', description: 'Great job! You remembered the right answer.' });
      } else {
        toast.error({ title: 'Incorrect', description: `Correct answer: ${mistake.correct_answer}` });
      }
    }
  };

  const handleNext = () => {
    if (current < mistakes.length - 1) setCurrent(current + 1);
  };


  // Remove Previous button logic

  // Motivational header and quiz UI
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70">
      <h2 className="text-5xl font-bold text-green-700 mb-4">Relearn & Improve!</h2>
      <div className="mb-6 text-lg text-gray-700 max-w-xl text-center">Mistakes are proof that you are trying. Review your mistakes and practice again to master them!</div>
      {loading ? (
        <div className="text-lg text-yellow-700 font-bold">Loading mistakes...</div>
      ) : error ? (
        <div className="text-lg text-red-600 font-bold">{error}</div>
      ) : mistakes.length === 0 ? (
        <div className="text-lg text-gray-500">No mistakes found.</div>
      ) : !quizStarted ? (
        <>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-green-700 text-xl" onClick={startQuiz}>
            Start Quiz
          </button>
        </>
      ) : (
        current < mistakes.length ? (
          <div className="w-full max-w-2xl flex flex-col items-center bg-white shadow-2xl rounded-2xl p-8 border border-green-100/40">
            <div className="w-full text-right text-green-700 text-sm mb-2">Question {current + 1} of {mistakes.length}</div>
            <div className="flex items-center gap-3 mb-6 w-full">
              {mistakes[current].phonetic && (
                <span className="text-lg font-bold text-green-800">{mistakes[current].phonetic}</span>
              )}
            </div>
            <h3 className="text-2xl font-extrabold text-zinc-700 mb-4 w-full text-left">{mistakes[current].question}</h3>
            {mistakes[current].answer_type === 'text_input' && (
              <div className="w-full flex flex-col gap-4">
                <input
                  type="text"
                  className="w-full border border-green-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={answers[current] || ''}
                  onChange={(e) => handleInputChange(e, current)}
                  placeholder="Type your answer..."
                  disabled={locked[current]}
                />
                {!locked[current] && (
                  <button
                    onClick={() => checkAnswer(current)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
                  >
                    Check
                  </button>
                )}
                {locked[current] && (
                  <div className={`mt-2 text-lg font-bold ${answers[current]?.trim().toLowerCase() === mistakes[current].correct_answer?.trim().toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                    {answers[current]?.trim().toLowerCase() === mistakes[current].correct_answer?.trim().toLowerCase() ? 'Correct!' : `Wrong! Correct answer: ${mistakes[current].correct_answer}`}
                  </div>
                )}
              </div>
            )}
            {mistakes[current].answer_type === 'multiple_choice' && Array.isArray(mistakes[current].options) && (
              <div className="flex flex-col gap-3 w-full mt-2">
                {mistakes[current].options.length >0 && mistakes[current].options.map((opt: string, idx: number) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`option-${current}`}
                      value={opt}
                      checked={answers[current] === opt}
                      onChange={() => handleOptionChange(current, opt)}
                      className="accent-green-600"
                      disabled={locked[current]}
                    />
                    <span className="text-lg text-zinc-700">{opt}</span>
                  </label>
                ))}
                {locked[current] && (
                  <div className={`mt-2 text-lg font-bold ${answers[current]?.trim().toLowerCase() === mistakes[current].correct_answer?.trim().toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                    {answers[current]?.trim().toLowerCase() === mistakes[current].correct_answer?.trim().toLowerCase() ? 'Correct!' : `Wrong! Correct answer: ${mistakes[current].correct_answer}`}
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end w-full mt-8">
              <button
                onClick={() => {
                  if (current === mistakes.length - 1) {
                    setCurrent(current + 1); // Show Quiz Complete
                  } else {
                    handleNext();
                  }
                }}
                disabled={!locked[current]}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 disabled:opacity-50"
              >
                {current === mistakes.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl flex flex-col items-center justify-center bg-white shadow-2xl rounded-2xl p-12 border border-green-100/40">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Quiz Complete!</h2>
            <div className="text-lg text-gray-700 mb-8 text-center">Great job! You have reviewed all your mistakes. Would you like to try again or go back to home?</div>
            <div className="flex gap-6 mt-4">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-green-700 text-lg"
                onClick={() => {
                  setQuizStarted(false);
                  setCurrent(0);
                  setAnswers({});
                  setLocked({});
                }}
              >
                Reattempt Quiz
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-300 text-lg"
                onClick={() => navigate('/lessons')}
              >
                Back to Home
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Practice;