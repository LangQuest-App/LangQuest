import React, { useEffect } from "react";
import { useUser } from "../lib/contextStores/userStore";
import Onborading from "./Onboarding";
import LessonList from "./Lessons/LessonList";
import BackToHome from "./BackToHome";

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
      <BackToHome/>
      {showOnboarding && <Onborading />}
      {!showOnboarding && <LessonList/>}

    </div>
  );
};

export default Lesson;
