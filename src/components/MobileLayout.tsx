import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Layers, BarChart3, User } from 'lucide-react';

const tabs = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/practice', label: 'Practice', icon: BookOpen },
  { path: '/topics', label: 'Topics', icon: Layers },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function MobileLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide bottom nav during quiz
  const hideNav = location.pathname.startsWith('/quiz');

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background max-w-lg mx-auto">
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
