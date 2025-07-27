import React, { useEffect } from "react";
import { useUser } from "../../lib/contextStores/userStore";
import Onborading from "../Onboarding";
import LessonList from "./LessonList";
import BackToHome from "../Buttons/BackToHome";

const Lesson = () => {
  const { userData } = useUser();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      //  console.log(userData);
    if (userData && !userData.preferences) {
      setShowOnboarding(true);
    }
    if(!userData)
    {
      setShowOnboarding(true);
    }
    }, 1000);   
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
