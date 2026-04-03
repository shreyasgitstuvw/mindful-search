import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Brain, Search, Map, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const NAV_ITEMS = [
  { to: '/', label: 'Search', icon: Search },
  { to: '/brain-map', label: 'Brain Map', icon: Map },
  { to: '/admin', label: 'Ingest', icon: Settings },
];

export function AppHeader() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground text-sm tracking-tight">
            Neuro<span className="text-primary">Search</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-2 flex items-center gap-1">
            {user ? (
              <>
                <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 bg-accent">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground max-w-[100px] truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  location.pathname === '/auth'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <User className="h-3.5 w-3.5" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
