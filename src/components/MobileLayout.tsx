import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Layers, BarChart3, Sparkles, Menu, User, CalendarDays, Bookmark, FlaskConical, Video, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const tabs = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/practice', label: 'Practice', icon: BookOpen },
  { path: '/topics', label: 'Topics', icon: Layers },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
];

const menuItems = [
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/study-plan', label: 'Study Plan', icon: CalendarDays },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { path: '/formulas', label: 'Formula Sheet', icon: FlaskConical },
];

export default function MobileLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  const hideNav = location.pathname.startsWith('/quiz');

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background max-w-lg mx-auto">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 h-12 flex items-center justify-between">
        <h1 className="text-base font-extrabold text-foreground">ExamForge 🎯</h1>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="p-4 pb-2 border-b border-border">
              <SheetTitle className="text-left text-base">Menu</SheetTitle>
            </SheetHeader>
            <div className="p-2 space-y-1">
              {menuItems.map(item => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Dark Mode Toggle */}
            <div className="mx-2 mt-4">
              <button
                onClick={toggle}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  {dark ? <Sun className="w-4.5 h-4.5 text-streak" /> : <Moon className="w-4.5 h-4.5 text-muted-foreground" />}
                  <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>
            </div>

            {/* Videos */}
            <div className="mx-2 mt-2">
              <button
                onClick={() => { navigate('/videos'); setMenuOpen(false); }}
                className="w-full p-4 rounded-xl bg-muted/60 border border-border text-left hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Video className="w-4.5 h-4.5 text-primary" />
                  <span className="text-sm font-bold text-foreground">Video Lessons</span>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Short explainer videos for every topic
                </p>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg border-t border-border safe-bottom z-50">
          <div className="max-w-lg mx-auto flex justify-around items-center h-16">
            {tabs.map(tab => {
              const active = location.pathname === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                    active ? 'text-nav-active' : 'text-nav-inactive'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                  <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
