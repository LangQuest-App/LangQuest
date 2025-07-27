import { useUser } from '@/ui/lib/contextStores/userStore';
import LogoutButton from '../Buttons/LogoutButton';
import React from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
const Profile = () => {
  const { userData } = useUser();
  console.log("User data in Profile:", userData);
  // Fallback to email prefix if name not present
  const displayName = (userData?.email ? userData.email.split('@')[0] : 'User');
  const nativeLang = userData?.preferences?.native_lang || 'Unknown';
  const learnigLanguage = userData?.preferences?.language_to_learn||'Unknown';


  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 py-16">
      <LogoutButton  />
      <h1 className="text-8xl font-extrabold text-green-700 mb-4 font-fredoka-heading w-full text-left pl-8">{displayName}
        <span className="text-6xl text-green-500">.</span>
      </h1>
      <div className="w-full flex flex-col lg:flex-row gap-12 justify-between items-start px-8">
        {/* Cards Section - horizontal on large screens */}
        <div className="flex items-start flex-col lg:flex-row gap-8 w-full">
          {/* Native Language Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100/40 flex flex-col items-start w-full lg:w-1/3">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Native Language</h2>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-lg font-semibold shadow mb-2">{nativeLang.trim()}</span>
          </div>
          {/* Current Course Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100/40 flex flex-col items-start w-full lg:w-1/3">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Current Course</h2>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-lg font-semibold shadow mb-2">{learnigLanguage}</span>
          </div>
<button
  className="mt-4 ml-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-full shadow transition duration-200 border border-green-300/40 focus:outline-none focus:ring-2 focus:ring-green-400"
>
  Add Course
</button>
        </div>
  </div>

      <div>
        <h2 className="text-2xl font-bold text-green-700 mb-4 mt-12 pl-8">Activity Calendar</h2>
        <div className='flex justify-center'>
          <ActivityCalendar
            data={Array.from({ length: 365 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (364 - i));
              const iso = date.toISOString().slice(0, 10);
              // Only today is colored, rest are gray
              const todayIso = new Date().toISOString().slice(0, 10);
              return {
                date: iso,
                count: iso === todayIso ? 1 : 0,
                level: iso === todayIso ? 4 : 0
              };
            })}
            theme={{
              light: ["#fff", "#e0f2fe", "#e0f2fe", "#e0f2fe", "#22c55e"],
              dark: ["#F7F7F7", "#98ff8c", "#80fc72", "#38d925", "#22c55e"],
            }}
            style={{ width: '100%', minWidth: 320, maxWidth: '100vw' }}
            blockMargin={8}
            blockSize={24}
            labels={{
              months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              legend: { less: "Less", more: "More" }
            }}
            showWeekdayLabels={true}
            hideTotalCount={true}
          />
        </div>
        </div>
      </div>
  );
};

export default Profile;