import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import { AdProvider } from "./contexts/AdContext";
import InterstitialAd from "./components/ads/InterstitialAd";
import RewardedAd from "./components/ads/RewardedAd";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import TopicsPage from "./pages/TopicsPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import FormulaSheetPage from "./pages/FormulaSheetPage";
import BookmarksPage from "./pages/BookmarksPage";
import AITutorPage from "./pages/AITutorPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import VideosPage from "./pages/VideosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdProvider>
        <Toaster />
        <Sonner />
        <InterstitialAd />
        <RewardedAd />
        <BrowserRouter>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/topics" element={<TopicsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/formulas" element={<FormulaSheetPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/ai-tutor" element={<AITutorPage />} />
              <Route path="/study-plan" element={<StudyPlanPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileLayout>
        </BrowserRouter>
      </AdProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
