     1|'use client';
     2|
     3|import { useState } from 'react';
     4|
     5|interface Market {
     6|  id: string;
     7|  title: string;
     8|  description: string;
     9|  category: string;
    10|  yesOdds: number;
    11|  noOdds: number;
    12|  poolSize: number;
    13|  endsAt: number;
    14|  createdBy: string;
    15|}
    16|
    17|export default function PredictionsSection() {
    18|  const [activeMarket, setActiveMarket] = useState<Market | null>(null);
    19|  const [markets, setMarkets] = useState<Market[]>([
    20|    {
    21|      id: '1',
    22|      title: 'Will Sui reach $5 by EOY?',
    23|      description: 'Sui network token price prediction',
    24|      category: 'crypto',
    25|      yesOdds: 62,
    26|      noOdds: 38,
    27|      poolSize: 125000,
    28|      endsAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    29|      createdBy: '0x1234...5678',
    30|    },
    31|    {
    32|      id: '2',
    33|      title: 'Will AI Studio generate 1M images?',
    34|      description: 'Community adoption milestone',
    35|      category: 'adoption',
    36|      yesOdds: 45,
    37|      noOdds: 55,
    38|      poolSize: 85000,
    39|      endsAt: Date.now() + 60 * 24 * 60 * 60 * 1000,
    40|      createdBy: '0x5678...1234',
    41|    },
    42|  ]);
    43|  const [category, setCategory] = useState('all');
    44|
    45|  const filteredMarkets =
    46|    category === 'all' ? markets : markets.filter((m) => m.category === category);
    47|
    48|  const formatDate = (timestamp: number) => {
    49|    const days = Math.ceil((timestamp - Date.now()) / (24 * 60 * 60 * 1000));
    50|    return `${days}d remaining`;
    51|  };
    52|
    53|  return (
    54|    <div className="flex gap-6 p-8 h-full bg-background">
    55|      {/* Left: Market List */}
    56|      <div className="w-80 flex flex-col gap-4 bg-card rounded-lg p-6 border border-border overflow-auto">
    57|        <h2 className="text-xl font-bold text-foreground">Active Markets</h2>
    58|
    59|        <div>
    60|          <select
    61|            value={category}
    62|            onChange={(e) => setCategory(e.target.value)}
    63|            className="w-full bg-background border border-border rounded p-2 text-foreground text-sm focus:outline-none focus:border-primary"
    64|          >
    65|            <option value="all">All Categories</option>
    66|            <option value="crypto">Crypto</option>
    67|            <option value="adoption">Adoption</option>
    68|          </select>
    69|        </div>
    70|
    71|        <div className="flex flex-col gap-3">
    72|          {filteredMarkets.map((market) => (
    73|            <div
    74|              key={market.id}
    75|              onClick={() => setActiveMarket(market)}
    76|              className={`p-3 rounded border cursor-pointer transition ${
    77|                activeMarket?.id === market.id
    78|                  ? 'bg-primary bg-opacity-10 border-primary'
    79|                  : 'bg-background border-border hover:border-primary'
    80|              }`}
    81|            >
    82|              <p className="font-semibold text-sm text-foreground">{market.title}</p>
    83|              <p className="text-xs text-muted-foreground mt-1">{market.description}</p>
    84|              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
    85|                <span>Yes: {market.yesOdds}%</span>
    86|                <span>No: {market.noOdds}%</span>
    87|              </div>
    88|            </div>
    89|          ))}
    90|        </div>
    91|      </div>
    92|
    93|      {/* Center: Market Detail */}
    94|      {activeMarket ? (
    95|        <div className="flex-1 flex flex-col gap-4 bg-card rounded-lg p-6 border border-border">
    96|          <div>
    97|            <h2 className="text-2xl font-bold text-foreground">{activeMarket.title}</h2>
    98|            <p className="text-muted-foreground mt-2">{activeMarket.description}</p>
    99|          </div>
   100|
   101|          <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
   102|            <div className="bg-background rounded p-4">
   103|              <p className="text-muted-foreground text-sm">Pool Size</p>
   104|              <p className="text-lg font-bold text-foreground mt-1">${activeMarket.poolSize.toLocaleString()}</p>
   105|            </div>
   106|            <div className="bg-background rounded p-4">
   107|              <p className="text-muted-foreground text-sm">Ends In</p>
   108|              <p className="text-lg font-bold text-foreground mt-1">{formatDate(activeMarket.endsAt)}</p>
   109|            </div>
   110|          </div>
   111|
   112|          <div className="grid grid-cols-2 gap-4">
   113|            <button className="bg-primary text-primary-foreground py-3 rounded font-semibold hover:opacity-90">
   114|              Bet YES ({activeMarket.yesOdds}%)
   115|            </button>
   116|            <button className="bg-background border border-border text-foreground py-3 rounded font-semibold hover:border-primary">
   117|              Bet NO ({activeMarket.noOdds}%)
   118|            </button>
   119|          </div>
   120|
   121|          <div className="bg-background rounded p-4 mt-4">
   122|            <h3 className="font-bold text-foreground mb-3">Oracle Analysis</h3>
   123|            <p className="text-sm text-muted-foreground">
   124|              Based on market sentiment and technical indicators, the oracle indicates a {activeMarket.yesOdds}% probability of this event occurring within the forecast window.
   125|            </p>
   126|            <p className="text-xs text-muted-foreground mt-3">Confidence: High</p>
   127|          </div>
   128|        </div>
   129|      ) : (
   130|        <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border text-muted-foreground">
   131|          Select a market to view details
   132|        </div>
   133|      )}
   134|
   135|      {/* Right: Create & Profile */}
   136|      <div className="w-80 flex flex-col gap-4">
   137|        {/* Create Market */}
   138|        <div className="bg-card rounded-lg p-6 border border-border">
   139|          <h3 className="font-bold text-foreground mb-4">Create Market</h3>
   140|          <div className="flex flex-col gap-3">
   141|            <input
   142|              type="text"
   143|              placeholder="Market question..."
   144|              className="bg-background border border-border rounded p-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
   145|            />
   146|            <button className="bg-primary text-primary-foreground py-2 rounded font-semibold text-sm hover:opacity-90">
   147|              Create
   148|            </button>
   149|          </div>
   150|        </div>
   151|
   152|        {/* Profile */}
   153|        <div className="bg-card rounded-lg p-6 border border-border flex-1">
   154|          <h3 className="font-bold text-foreground mb-4">Your Stats</h3>
   155|          <div className="space-y-3">
   156|            <div className="flex justify-between text-sm">
   157|              <span className="text-muted-foreground">Level</span>
   158|              <span className="text-foreground font-semibold">5</span>
   159|            </div>
   160|            <div className="flex justify-between text-sm">
   161|              <span className="text-muted-foreground">XP</span>
   162|              <span className="text-foreground font-semibold">2,450</span>
   163|            </div>
   164|            <div className="flex justify-between text-sm">
   165|              <span className="text-muted-foreground">Badges</span>
   166|              <span className="text-foreground font-semibold">3</span>
   167|            </div>
   168|            <div className="bg-background rounded p-2 mt-3">
   169|              <div className="flex gap-2">
   170|                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
   171|                <div className="w-6 h-6 rounded-full bg-purple-500"></div>
   172|                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
   173|              </div>
   174|            </div>
   175|          </div>
   176|        </div>
   177|      </div>
   178|    </div>
   179|  );
   180|}
   181|