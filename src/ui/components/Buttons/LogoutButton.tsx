import store from "../../utils/electron-store";
import { LogOut } from "lucide-react";
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
    <div className="absolute top-6 right-8 z-50">
      <button
        className="flex items-center gap-2 px-6 py-2 tracking-wider rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer w-full"
        onClick={deleteUserData}
        title="Logout"
        style={{ minWidth: '120px' }}
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
