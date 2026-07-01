     1|'use client';
     2|
     3|import { useState } from 'react';
     4|import { FloatingOracle } from '@/components/floating-oracle';
     5|
     6|const MOCK_MARKETS = [
     7|  { id: 1, title: 'Will SUI reach $5 by Q2 2025?', volume: '1,245 SUI', yesOdds: '62%', noOdds: '38%', category: 'Crypto' },
     8|  { id: 2, title: 'Will Ethereum outperform Bitcoin this quarter?', volume: '856 SUI', yesOdds: '45%', noOdds: '55%', category: 'Crypto' },
     9|  { id: 3, title: 'Will AI NFTs gain mainstream adoption by 2025?', volume: '2,103 SUI', yesOdds: '71%', noOdds: '29%', category: 'NFT' },
    10|];
    11|
    12|export default function PredictionsPage() {
    13|  const [selectedMarket, setSelectedMarket] = useState(MOCK_MARKETS[0]);
    14|  const [filter, setFilter] = useState('all');
    15|
    16|  return (
    17|    <div className="space-y-6 relative">
    18|      <FloatingOracle />
    19|      {/* Header */}
    20|      <div className="space-y-2">
    21|        <div className="flex items-center gap-2">
    22|          <span className="text-3xl">📊</span>
    23|          <h1 className="text-3xl font-bold gradient-text">Prediction Hub</h1>
    24|        </div>
    25|        <p className="text-muted-foreground">Trade predictions and earn rewards by predicting market outcomes</p>
    26|      </div>
    27|
    28|      {/* Filter & Create */}
    29|      <div className="flex gap-4">
    30|        <div className="card-glass flex items-center gap-2 px-4">
    31|          {['all', 'Crypto', 'NFT', 'Tech'].map((cat) => (
    32|            <button
    33|              key={cat}
    34|              onClick={() => setFilter(cat)}
    35|              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    36|                filter === cat
    37|                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
    38|                  : 'text-muted-foreground hover:text-foreground'
    39|              }`}
    40|            >
    41|              {cat}
    42|            </button>
    43|          ))}
    44|        </div>
    45|        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all glow-cyan">
    46|          + Create Market
    47|        </button>
    48|      </div>
    49|
    50|      {/* Main Grid */}
    51|      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    52|        {/* Market List */}
    53|        <div className="lg:col-span-1">
    54|          <div className="card-glass space-y-3">
    55|            <h2 className="text-lg font-semibold">Active Markets</h2>
    56|            <div className="space-y-2 max-h-96 overflow-y-auto">
    57|              {MOCK_MARKETS.map((market) => (
    58|                <button
    59|                  key={market.id}
    60|                  onClick={() => setSelectedMarket(market)}
    61|                  className={`w-full text-left p-3 rounded-lg border transition-all ${
    62|                    selectedMarket.id === market.id
    63|                      ? 'border-cyan-500/50 bg-cyan-500/10'
    64|                      : 'border-white/10 bg-white/5 hover:border-white/20'
    65|                  }`}
    66|                >
    67|                  <p className="text-xs font-medium mb-1">{market.title}</p>
    68|                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
    69|                    <span className="bg-white/5 px-2 py-1 rounded">{market.category}</span>
    70|                    <span>{market.volume}</span>
    71|                  </div>
    72|                </button>
    73|              ))}
    74|            </div>
    75|          </div>
    76|        </div>
    77|
    78|        {/* Market Details */}
    79|        <div className="lg:col-span-1">
    80|          <div className="card-glass space-y-4">
    81|            <h2 className="text-lg font-semibold">Market Details</h2>
    82|            <div className="space-y-3">
    83|              <div>
    84|                <p className="text-muted-foreground text-xs mb-1">Question</p>
    85|                <p className="text-sm font-medium">{selectedMarket.title}</p>
    86|              </div>
    87|              <div className="grid grid-cols-2 gap-2">
    88|                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
    89|                  <p className="text-muted-foreground text-xs">Volume</p>
    90|                  <p className="text-sm font-semibold text-cyan-400">{selectedMarket.volume}</p>
    91|                </div>
    92|                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
    93|                  <p className="text-muted-foreground text-xs">Category</p>
    94|                  <p className="text-sm font-semibold text-purple-400">{selectedMarket.category}</p>
    95|                </div>
    96|              </div>
    97|
    98|              {/* Odds */}
    99|              <div className="space-y-2">
   100|                <div>
   101|                  <div className="flex justify-between text-xs mb-1">
   102|                    <span>YES</span>
   103|                    <span className="text-cyan-400 font-semibold">{selectedMarket.yesOdds}</span>
   104|                  </div>
   105|                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
   106|                    <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: selectedMarket.yesOdds }} />
   107|                  </div>
   108|                </div>
   109|                <div>
   110|                  <div className="flex justify-between text-xs mb-1">
   111|                    <span>NO</span>
   112|                    <span className="text-purple-400 font-semibold">{selectedMarket.noOdds}</span>
   113|                  </div>
   114|                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
   115|                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: selectedMarket.noOdds }} />
   116|                  </div>
   117|                </div>
   118|              </div>
   119|
   120|              {/* Bet Buttons */}
   121|              <div className="grid grid-cols-2 gap-2 pt-2">
   122|                <button className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all">
   123|                  Predict YES
   124|                </button>
   125|                <button className="px-3 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all">
   126|                  Predict NO
   127|                </button>
   128|              </div>
   129|            </div>
   130|          </div>
   131|        </div>
   132|
   133|        {/* Oracle Analysis */}
   134|        <div className="lg:col-span-1">
   135|          <div className="card-glass space-y-3">
   136|            <h2 className="text-lg font-semibold">Oracle Analysis</h2>
   137|            <div className="space-y-3">
   138|              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
   139|                <p className="text-muted-foreground text-xs mb-1">Confidence</p>
   140|                <div className="flex items-end gap-2">
   141|                  <p className="text-2xl font-bold text-cyan-400">87%</p>
   142|                  <div className="flex-1 h-8 bg-white/10 rounded-lg flex items-end justify-around px-2 py-1">
   143|                    {[30, 60, 80, 100, 75].map((h, i) => (
   144|                      <div key={i} className="w-1 bg-cyan-500 rounded-t" style={{ height: `${h}%` }} />
   145|                    ))}
   146|                  </div>
   147|                </div>
   148|              </div>
   149|              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
   150|                <p className="text-muted-foreground text-xs mb-2">Analysis</p>
   151|                <p className="text-xs leading-relaxed">Based on on-chain metrics and social sentiment, this market shows strong conviction toward YES. Recent trading volume and liquidity patterns support bullish outlook.</p>
   152|              </div>
   153|              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
   154|                <p className="text-muted-foreground text-xs mb-2">Risk Assessment</p>
   155|                <p className="text-xs leading-relaxed">Medium risk. Market has significant liquidity but external factors could impact outcome.</p>
   156|              </div>
   157|            </div>
   158|          </div>
   159|        </div>
   160|      </div>
   161|    </div>
   162|  );
   163|}
   164|