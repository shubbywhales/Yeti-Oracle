     1|'use client';
     2|
     3|import Link from 'next/link';
     4|import { usePathname } from 'next/navigation';
     5|
     6|const MOCK_LEVEL = 12;
     7|const MOCK_XP = 1250;
     8|const MOCK_XP_MAX = 2000;
     9|
    10|const NAV_ITEMS = [
    11|  { href: '/ai-studio', label: 'AI Studio', icon: '🎨' },
    12|  { href: '/predictions', label: 'Prediction Hub', icon: '📊' },
    13|  { href: '/marketplace', label: 'Marketplace', icon: '🖼️' },
    14|  { href: '/badges', label: 'Badges', icon: '🏆' },
    15|  { href: '/profile', label: 'Profile', icon: '👤' },
    16|  { href: '/activity', label: 'Activity', icon: '📜' },
    17|  { href: '/leaderboard', label: 'Leaderboard', icon: '📈' },
    18|  { href: '/settings', label: 'Settings', icon: '⚙️' },
    19|];
    20|
    21|export function Sidebar() {
    22|  const pathname = usePathname();
    23|
    24|  return (
    25|    <aside className="flex w-64 shrink-0 flex-col gap-6 border-r border-white/5 bg-gradient-to-b from-background via-background to-background/80 px-4 py-6 backdrop-blur-lg">
    26|      {/* Logo */}
    27|      <div className="flex items-center gap-2">
    28|        <span className="text-2xl">❄️</span>
    29|        <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Yeti Oracle</span>
    30|      </div>
    31|
    32|      {/* Profile Section */}
    33|      <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3">
    34|        <div className="flex items-center gap-3">
    35|          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-lg">❄️</div>
    36|          <div className="flex-1">
    37|            <p className="text-sm font-semibold">Player Level</p>
    38|            <p className="text-xs text-muted-foreground">Lv. {MOCK_LEVEL}</p>
    39|          </div>
    40|        </div>
    41|        
    42|        {/* XP Bar */}
    43|        <div className="space-y-1">
    44|          <div className="flex justify-between text-xs">
    45|            <span className="text-muted-foreground">XP Progress</span>
    46|            <span className="text-cyan-400">{MOCK_XP}/{MOCK_XP_MAX}</span>
    47|          </div>
    48|          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    49|            <div 
    50|              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
    51|              style={{ width: `${(MOCK_XP / MOCK_XP_MAX) * 100}%` }}
    52|            />
    53|          </div>
    54|        </div>
    55|      </div>
    56|
    57|      {/* Nav items */}
    58|      <nav className="flex flex-col gap-2">
    59|        {NAV_ITEMS.map((item) => {
    60|          const isActive = pathname === `/${item.href.replace(/^\//,'')}` || pathname?.includes(item.href);
    61|          return (
    62|            <Link
    63|              key={item.href}
    64|              href={item.href}
    65|              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
    66|                isActive
    67|                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300'
    68|                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
    69|              }`}
    70|            >
    71|              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-lg bg-gradient-to-b from-cyan-400 to-purple-400" />}
    72|              <span className="text-lg">{item.icon}</span>
    73|              <span>{item.label}</span>
    74|            </Link>
    75|          );
    76|        })}
    77|      </nav>
    78|
    79|      {/* Footer */}
    80|      <div className="mt-auto pt-4 border-t border-white/10">
    81|        <p className="text-xs text-muted-foreground text-center">Create. Predict. Own.</p>
    82|      </div>
    83|    </aside>
    84|  );
    85|}
    86|