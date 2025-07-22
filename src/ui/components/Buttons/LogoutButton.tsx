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
    <div>
      <button className="bg-red-300" onClick={deleteUserData}>logout</button>
    </div>
  );
};

export default LogoutButton;
