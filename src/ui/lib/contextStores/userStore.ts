import {create} from "zustand"
import type { userStateType, userDataType, IUserPreference } from "../types/user";
import store from '../../utils/electron-store'

const userState: userStateType = {
  userData: null,
  userLoading: false,
  isLoaded: false,
};

interface UserStoreActions {
  setUserData: () => Promise<void>;
  setUserPreference: (data:IUserPreference) => Promise<void>;
  loadUserData: () => Promise<void>;
  updateUserData: (userData: userDataType) => void;
  clearUserData: () => void;
  setLoading: (loading: boolean) => void;
  setLoaded: (isLoaded: boolean) => void;
}

export const useUser = create<userStateType & UserStoreActions>((set, get) => ({
  ...userState,

  setUserData: async () => {
    set({ userLoading: true });
    try {
      const username = await store.get("username");
      const email = await store.get("lastSignedInEmail");
      const isLoggedIn = await store.get("isLoggedIn");
      const preferences = await store.get("preferences");

      if (username || email) {
        const userDetails: userDataType = {
          name: username || email?.split("@")[0] || "User",
          email,
          isLoggedIn,
          preferences:preferences? preferences: null,
        };
        set({
          userData:userDetails,
          userLoading: false,
          isLoaded: true,
        });
      } else {
        set({
          userData: null,
          userLoading: false,
          isLoaded: true,
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      set({
        userData: null,
        userLoading: false,
        isLoaded: true,
      });
    }
  },

  setUserPreference: async (data: IUserPreference) => {
    set({ userLoading: true });
    const { userData } = get();
    if (userData) {
      // console.log(data)
      userData.preferences = data;
      set({ userData });
    } else {
      set({});
    }
  },

  loadUserData: async () => {
    const { setUserData } = get();
    await setUserData();
  },

  updateUserData: (userData: userDataType) => {
    set({ userData });
  },

  clearUserData: () => {
    set({
      userData: null,
      userLoading: false,
      isLoaded: false,
    });
  },

  setLoading: (loading: boolean) => {
    set({ userLoading: loading });
  },

  setLoaded: (isLoaded: boolean) => {
    set({ isLoaded });
  },
}));