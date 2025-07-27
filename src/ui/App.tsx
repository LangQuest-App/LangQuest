import { Toaster } from 'sonner';
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./lib/contextStores/userStore";
import NotFound from "./pages/NotFound";
// import ElectronDemo from "./components/ElectronDemo";
import Hero from "./components/HomePage";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Scene from "./components/SceneNew";
import Lesson from "./components/Lessons/Lesson";
import Practice from "./components/Quiz/Practice";
import Profile from "./components/Profile/Profile";

const queryClient = new QueryClient();

const AppContent = () => {
  const { userData, setUserData, isLoaded } = useUser();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await setUserData();
        // console.log('User data initialized on app mount', userData);
      } catch (error) {
        console.error('Error initializing user data:', error);
      }
    };

    initializeUser();
  }, [setUserData]);
 
  if (!isLoaded) return null;
 
  return (
    <>
    {
      userData?.isLoggedIn &&
      <Navbar/>
    }
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/scene" element={<Scene />} />
        {/* <Route path="/electron-demo" element={<ElectronDemo />} /> */}
        {/* <Route path="/electron-demo" element={<ElectronDemo />} /> */}
        <Route path="/lessons" element={<Lesson />} />
        <Route path="/quiz" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
