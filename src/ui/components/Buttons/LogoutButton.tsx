import store from "../../utils/electron-store";
const LogoutButton = () => {
  const deleteUserData = async () => {
    console.log("Deleting user data from store...");
    try {
      await store.delete("lastSignedInEmail");
      await store.delete("username");
      await store.delete("lastSignInTime");
      await store.delete("isLoggedIn");
      await store.delete("isLoggedIn");
      await store.delete("preferences");
      window.location.href = '/signup';
    } catch (error) {
      console.error("Error saving user data to store:", error);
    }
  };
  return (
    <div className="flex justify-end w-full">
      <button
        className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-red-400 via-red-500 to-rose-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={deleteUserData}
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m9 0-3-3m3 3-3 3"/></svg>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
