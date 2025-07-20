import { Toaster as Sonner } from "../ui/components/ui/sonner";
import { TooltipProvider } from "../ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../ui/pages/index";
import NotFound from "./pages/NotFound";
import ElectronDemo from "./components/ElectronDemo";
import Hero from "./components/Hero";
import Auth from "./components/Auth/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/electron-demo" element={<ElectronDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
