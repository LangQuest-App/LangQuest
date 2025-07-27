import React, { useEffect, useState, useRef } from 'react';
import AttemptLesson from './AttemptLesson';
import type { Lesson } from '@/ui/lib/types/lesson';
import { toast } from 'sonner';
import {  Volume2 } from 'lucide-react';

interface MistakesProps {
  lessonId: string;
  lesson?: Lesson;
}

const MistakesViewer: React.FC<MistakesProps> = ({ lessonId, lesson }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMistakes, setShowMistakes] = useState(true);

  useEffect(() => {
    const fetchMistakes = async () => {
      setLoading(true);
      setError(null);
      // console.log("Fetching mistakes for lesson:", `${BACKEND_URL}/lesson/${lessonId}/get-mistakes`);
      try {
        const response = await window.electronAPI.fetchData(
          `${BACKEND_URL}/lesson/${lessonId}/get-mistake`,
          {},
          'GET'
        );
        if (response.status !== 200) {
          setError(response.message || 'Failed to fetch mistakes');
          setMistakes([]);
        } else {
          setMistakes(response.data);
          // console.log("Fetched mistakes:", response.data);
        }
      } catch (err: any) {
        setError(err?.message || 'Internal server error');
        setMistakes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMistakes();
  }, [lessonId]);

  if (!showMistakes && lesson) {
    return <AttemptLesson lesson={lesson} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-6xl font-bold text-green-800 text-shadow-2xl mb-8">Mistakes for Lesson</h2>
      <div className="mb-6">
        <button
          className="bg-green-600 text-white px-6 tracking-wider py-2 rounded-lg hover:bg-green-700 font-bold shadow-md mr-4"
          onClick={() => setShowMistakes(false)}
        >
          Attempt Lesson Again
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full py-24">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid mb-4"></div>
          <div className="text-lg text-yellow-700 font-bold">Loading mistakes...</div>
        </div>
      ) : error ? (
        <div className="text-lg text-red-600 font-bold py-12">{error}</div>
      ) : mistakes.length === 0 ? (
        <div className="text-lg text-gray-500">No mistakes found for this lesson.</div>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-green-100/40">
          <h3 className="text-2xl font-bold text-green-700 mb-4">Mistakes</h3>
          <div className="flex flex-col gap-6">
            {mistakes.map((mistake, idx) => (
              <div key={idx} className="mb-2 p-6 rounded-xl border border-gray-200 bg-gray-50 shadow flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-700">Q: <span className="font-normal text-gray-800">{mistake.question}</span></span>
                  {mistake.tts_url && (
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-700 shadow transition"
                      onClick={() => {
                        if (mistake.tts_url == 'TTS_URL_NOT_AVAILABLE') {
                          toast('No audio available for this question.', { description: 'Audio not found', position: 'bottom-right', duration: 2500 });
                          return;
                        }
                        const audioType = mistake.tts_url.split('.').pop();
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
                          audio.src = mistake.tts_url;
                          audio.play().catch(() => {
                            toast('Failed to play audio.', { description: 'Audio format not supported', position: 'bottom-right', duration: 2500 });
                          });
                        } catch (err) {
                          toast('Failed to play audio.', { description: 'Audio format not supported', position: 'bottom-right', duration: 2500 });
                        }
                      }}
                      title="Play audio"
                    >
                     <Volume2 className="w-6 h-6 text-green-700" />
                    </button>
                  )}
                </div>
                {mistake.userAnswer && (
                  <div className="text-base text-red-600">Your Answer: <span className="font-semibold text-gray-800">{mistake.userAnswer}</span></div>
                )}
                <div className="text-base text-green-700">Correct Answer: <span className="font-semibold text-gray-800">{mistake.correct_answer}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MistakesViewer;
