import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Brain, Search, Map, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Search', icon: Search },
  { to: '/brain-map', label: 'Brain Map', icon: Map },
  { to: '/admin', label: 'Ingest', icon: Settings },
];

export function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground text-sm tracking-tight">
            Neuro<span className="text-primary">Search</span>
          </span>
        </Link>

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
      </div>
    </header>
  );
}
