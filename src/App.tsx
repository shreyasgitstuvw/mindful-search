import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { AppHeader } from "@/components/AppHeader";
import SearchPage from "./pages/SearchPage";
import BrainMapPage from "./pages/BrainMapPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <AppHeader />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/brain-map" element={<BrainMapPage />} />
              <Route path="/content/:id" element={<ContentDetailPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
