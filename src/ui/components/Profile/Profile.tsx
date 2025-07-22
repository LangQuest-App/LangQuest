import React from 'react';
import { useUser } from '@/ui/lib/contextStores/userStore';
import LogoutButton from '../Buttons/LogoutButton';
const Profile = () => {
  const { userData } = useUser();
  console.log("User data in Profile:", userData);
  // Fallback to email prefix if name not present
  const displayName = (userData?.email ? userData.email.split('@')[0] : 'User');
  const nativeLang = userData?.preferences?.native_lang || 'Unknown';

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 py-16">
    <LogoutButton  />
      <h1 className="text-8xl font-extrabold text-green-700 mb-4 font-fredoka-heading w-full text-left pl-8">{displayName}
        <span className="text-6xl text-green-500">.</span>
      </h1>
      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-lg font-semibold mb-8 shadow w-fit m-4 pl-8">{nativeLang.trim()}</span>

      <div className="w-full flex flex-row gap-8 justify-start items-start pl-8">
        {/* Dictionary Section */}
        <div className="flex-1 min-w-[320px] max-w-md bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100/40 flex items-center justify-between group cursor-pointer transition hover:scale-[1.01]">
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Dictionary</h2>
            <div className="text-gray-600">Your saved words and phrases will appear here.</div>
          </div>
          <span className="ml-4 text-green-600 group-hover:translate-x-2 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6"/></svg>
          </span>
        </div>
        {/* Attempted Lessons Section */}
        <div className="flex-1 min-w-[320px] max-w-md bg-white rounded-2xl shadow-lg p-8 border border-green-100/40 flex items-center justify-between group cursor-pointer transition hover:scale-[1.01]">
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Attempted Lessons</h2>
            <div className="text-gray-600">Lessons you've completed will be listed here.</div>
          </div>
          <span className="ml-4 text-green-600 group-hover:translate-x-2 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6"/></svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;