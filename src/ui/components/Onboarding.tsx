import React, { useEffect } from "react";
import questions from "../lib/onboard-question.json";
import type { IUserPreference } from "../lib/types/user";
import { useUser } from "../lib/contextStores/userStore";
import FrogSide from "/images/frog-side.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import store from "../utils/electron-store"
const Onborading = () => {
  interface questionType {
    question: string;
    type: string;
    options: string[];
  }
  const navigate = useNavigate();
  const [preferences, setPreferences] = React.useState<IUserPreference>({
    native_lang: "",
    language_to_learn: "",
    current_experience: "",
    aim: "",
    prefered_way: "",
  });
  const [stage, setStage] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState<questionType[]>(
    []
  );
  const { setUserPreference } = useUser();

  useEffect(() => {
    if (stage < questions.length) {
      setCurrentQuestion([questions[stage]]);
    }
  }, [stage]);

  const handleNext = async () => {
    if (stage < questions.length - 1) {
      setStage(stage + 1);
    } else {
      console.log("Preferences saved:", preferences);
    }
  };

  const handlePrevious = () => {
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  const handleInputChange = async (value: string) => {
    const key = Object.keys(preferences)[stage] as keyof IUserPreference;
    await store.set('preferences',preferences)
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmission = async () => {
    await setUserPreference(preferences);
    // add zod validation here 
    console.log("Preferences submitted:", preferences);
    // AXIOS
    setTimeout(() => {
      console.log("Updating the db with preferences");
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 overflow-hidden relative">
      {/* Centered Question and Options */}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto relative z-10 mt-12">
        {currentQuestion.map((question, index) => (
          <div key={index} className="mb-8 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-black text-[#3eab16] mb-8 font-fredoka-heading animate-fade-in text-center">
              {question.question}
            </h2>
            {/* For select Element */}
            {question.type === "select" && (
              <select
                value={preferences[Object.keys(preferences)[stage] as keyof IUserPreference] || ""}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                  console.log("selected", e.target.value);
                }}
                className="border-2 border-green-400 rounded-xl p-4 text-2xl md:text-3xl font-semibold text-emerald-700 bg-green-50 focus:border-green-500 focus:ring-0 focus:outline-none transition-all duration-300 mb-6 w-full max-w-xl mx-auto"
              >
                {question.options.map((option, idx) => (
                  <option
                    key={idx}
                    value={option}
                    className="text-xl md:text-2xl"
                  >
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.type === "radio" && (
              <div className="flex flex-col items-center gap-4 mt-4">
                {question.options.map((option, idx) => (
                  <label
                    key={idx}
                    htmlFor={option}
                    className="flex items-center gap-4 text-2xl md:text-3xl font-semibold text-green-700 cursor-pointer"
                  >
                    <input
                      onChange={() => {
                        handleInputChange(option);
                        console.log("selected", option);
                      }}
                      checked={preferences[Object.keys(preferences)[stage] as keyof IUserPreference] === option}
                      type="radio"
                      name={question.question}
                      id={option}
                      className="w-6 h-6 accent-emerald-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-8 justify-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={stage === 0}
            className={`w-16 h-16 rounded-full flex items-center justify-center bg-[#44bb1937] hover:bg-green-400/30  active:bg-green-400/30  shadow-lg backdrop-blur-md transition-all duration-300 border-2 border-emerald-300 ${
              stage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous"
            style={{ boxShadow: "0 4px 24px 0 rgba(16,185,129,0.15)" }}
          >
            <ArrowLeft className="w-8 h-8 text-emerald-700" />
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-[#44bb1937] hover:bg-green-400/30  active:bg-green-400/30 shadow-lg backdrop-blur-md transition-all duration-300 border-2 border-green-300 ${stage === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
            aria-label={stage < questions.length - 1 ? "Next" : "Finish"}
            style={{ boxShadow: "0 4px 24px 0 rgba(16,185,129,0.15)" }}
          >
            {stage < questions.length - 1 ? (
              <ArrowRight className="w-8 h-8 text-emerald-700" />
            ) : (
              <span
                onClick={() => handleSubmission()}
                className="font-bold text-3xl text-emerald-700"
              >
                ✓
              </span>
            )}
          </button>
        </div>
        {/* FrogSide Image absolutely to the right of the question/options */}
        <img
          src={FrogSide}
          alt="Frog Side"
          className="absolute left-[90%] top-[80%] -translate-y-1/2 w-48 md:w-64 lg:w-80 xl:w-96 object-contain drop-shadow-2xl "
          style={{ filter: "drop-shadow(0px 16px 32px rgba(16,185,129,0.3))" }}
        />
      </div>
      {/* Optional: Add floating background elements for smooth onboarding */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wider gradient orbs */}
        <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-60 -left-60 w-[900px] h-[900px] bg-gradient-to-tr from-green-300/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-green-200/20 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-emerald-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce delay-1100"></div>
      </div>
    </div>
  );
};
export default Onborading;
