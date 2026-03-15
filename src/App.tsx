import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import { AdProvider } from "./contexts/AdContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import InterstitialAd from "./components/ads/InterstitialAd";
import RewardedAd from "./components/ads/RewardedAd";
import UnlockContentAd from "./components/ads/UnlockContentAd";
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
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AboutPage from "./pages/AboutPage";
import InstallPage from "./pages/InstallPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AdProvider>
            <Toaster />
            <Sonner />
            <InterstitialAd />
            <RewardedAd />
            <UnlockContentAd />
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
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MobileLayout>
          </AdProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
