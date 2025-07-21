import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../lib/contextStores/userStore";
import Onborading from "./Onboarding";
const Lesson = () => {
  const { userData } = useUser();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  useEffect(() => {
    console.log(userData);
    if (userData && !userData.preferences) {
      setShowOnboarding(true);
    }
  }, [userData]);
  return (
    <div>
      <Link to="/home" className="absolute z-100 top-4 left-4">
        <button className="bg-[#a1e788] text-white px-4 py-2 rounded-lg font-semibold text-base shadow hover:bg-[#369a14] transition">
          Back to home
        </button>
      </Link>
      {showOnboarding && <Onborading />}
      {!showOnboarding && <div>Lessons comming soon...</div>}
    </div>
  );
};

export default Lesson;
