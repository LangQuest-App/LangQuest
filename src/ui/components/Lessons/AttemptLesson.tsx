import React, { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import LessonCompletion from './LessonCompletion';
import MultilingualKeyboard from '../KeyBoard';
import { useUser } from '@/ui/lib/contextStores/userStore';
import { toast } from 'sonner';

const AttemptLesson = ({ lesson }: any) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [locked, setLocked] = useState<{ [key: number]: boolean }>({});
  const [wrongQuestions, setWrongQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const questions = lesson?.questions || [];
  const inputRef = useRef<HTMLInputElement>(null);
  const {userData} = useUser();
  // console.log("User Data in AttemptLesson:", userData?.preferences?.native_lang);

    const handleVirtualKeyPress = (key: string) => {
      const input = inputRef.current;
      if (!input) return;
      if (key === "{bksp}") {
        input.value = input.value.slice(0, -1);
      } else if (key === "{space}") {
        input.value += " ";
      } else if (key.length === 1 || /^[^\{\}]+$/.test(key)) {
        input.value += key;
      }
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
    const q = questions[idx];
    const answer = value !== undefined ? value : answers[idx];
    setLocked((prev) => ({ ...prev, [idx]: true }));
    if (answer?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase()) {
      setScore((prev) => prev + 1);
    } else {
      setWrongQuestions((prev) => [...prev, q]);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const playAudio = (url: string) => {
    if (!url || url === 'TTS_URL_NOT_AVAILABLE') {
      toast('No audio available for this question.', { description: 'Audio not found', position: 'bottom-right', duration: 2500 });
      return;
    }
    const audioType = url.split('.').pop();
    const audio = new Audio();
    let mimeType = '';
    if (audioType === 'mp3') mimeType = 'audio/mpeg';
    else if (audioType === 'wav') mimeType = 'audio/wav';
    else if (audioType === 'ogg') mimeType = 'audio/ogg';
    if (mimeType && audio.canPlayType(mimeType) === '') {
      toast('Audio format not supported in your browser.', { description: 'Cannot play this audio', position: 'bottom-right', duration: 2500 });
      return;
    }
    try {
      audio.src = url;
      audio.play().catch(() => {
        toast('Failed to play audio.', { description: 'Audio format not supported', position: 'bottom-right', duration: 2500 });
      });
    } catch (err) {
      toast('Failed to play audio.', { description: 'Audio format not supported', position: 'bottom-right', duration: 2500 });
    }
  };

  React.useEffect(() => {
    if (!q?.tts_url || q.tts_url === 'TTS_URL_NOT_AVAILABLE') {
      toast('No audio available for this question.', { description: 'Audio not found', position: 'bottom-right', duration: 2500 });
    } else {
      playAudio(q.tts_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const q = questions[current];

  if (current >= questions.length) {
    return <LessonCompletion score={score} lesson_id={lesson.id} total={questions.length} wrongQuestions={wrongQuestions} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 py-12 px-4 flex flex-col items-center overflow-hidden relative">
      {/* Background theme elements as in LessonList */}
      <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-60 -left-60 w-[900px] h-[900px] bg-gradient-to-tr from-green-300/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-200/20 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="h-4 bg-green-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-right text-green-700 text-sm mt-1">Question {current + 1} of {questions.length}</div>
      </div>

      {/* Quiz Card */}
      <div className="flex flex-col items-center z-40 bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 border border-green-100/40">
        <div className="flex items-center gap-3 mb-6 w-full">
          <span className="text-lg font-bold text-green-800">{q?.phonetic}</span>
          {q?.tts_url && (
            <button onClick={() => playAudio(q.tts_url)} className="bg-green-100 hover:bg-green-200 p-2 rounded-full">
              <Volume2 className="text-green-700 w-6 h-6" />
            </button>
          )}
        </div>
        <h3 className="text-2xl font-extrabold text-zinc-700 mb-4 w-full text-left">{q?.question}</h3>

        {/* Input type handling */}
        {q?.answer_type === 'text_input' && (
          <div className="w-full flex flex-col gap-4">
            <input
              ref={inputRef}
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
            <MultilingualKeyboard language={userData?.preferences?.native_lang.toLowerCase()|| "english"} onKeyPress={handleVirtualKeyPress} />
            {locked[current] && (
              <div className={`mt-2 text-lg font-bold ${answers[current]?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                {answers[current]?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase() ? 'Correct!' : `Wrong! Correct answer: ${q.correct_answer}`}
              </div>
            )}
          </div>
        )}
        {q?.answer_type === 'multiple_choice' && Array.isArray(q.options) && (
          <div className="flex flex-col gap-3 w-full mt-2">
            {q.options.map((opt: string, idx: number) => (
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
              <div className={`mt-2 text-lg font-bold ${answers[current]?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                {answers[current]?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase() ? 'Correct!' : `Wrong! Correct answer: ${q.correct_answer}`}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-end w-full mt-8">
          <button
            onClick={() => handleNextOrFinish()}
            disabled={!locked[current]}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 disabled:opacity-50"
          >
            {current === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );

  function handleNextOrFinish() {
    if (current === questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleNext();
    }
  }
};

export default AttemptLesson;