import { Toaster as Sonner } from "../ui/components/ui/sonner";
import { TooltipProvider } from "../ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./lib/contextStores/userStore";
import Index from "../ui/pages/index";
import NotFound from "./pages/NotFound";
import ElectronDemo from "./components/ElectronDemo";
import Hero from "./components/HomePage";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await setUserData();
        console.log('User data initialized on app mount');
      } catch (error) {
        console.error('Error initializing user data:', error);
      }
    };

    initializeUser();
  }, [setUserData]);

  return (
    <>
    {
      userData?.isLoggedIn &&
      <Navbar/>
    }
      <Sonner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/electron-demo" element={<ElectronDemo />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
