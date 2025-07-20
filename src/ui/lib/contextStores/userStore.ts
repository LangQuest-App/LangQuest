import {create} from "zustand"
import type { userStateType, userDataType } from "../types/user";
import store from '../../utils/electron-store'

const userState: userStateType = {
  userData: null,
  userLoading: false,
  isLoaded: false,
};

interface UserStoreActions {
  setUserData: () => Promise<void>;
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
      
      if (username || email) {
        const userData: userDataType = {
          name: username || email?.split('@')[0] || 'User',
          email, 
          isLoggedIn
        };
        set({ 
          userData, 
          userLoading: false,
          isLoaded: true 
        });
      } else {
        set({ 
          userData: null, 
          userLoading: false,
          isLoaded: true 
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      set({ 
        userData: null, 
        userLoading: false,
        isLoaded: true 
      });
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
      isLoaded: false 
    });
  },

  setLoading: (loading: boolean) => {
    set({ userLoading: loading });
  },

  setLoaded: (isLoaded: boolean) => {
    set({ isLoaded });
  },
}));