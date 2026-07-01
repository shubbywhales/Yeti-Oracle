     1|'use client';
     2|
     3|import { useState } from 'react';
     4|import { FloatingOracle } from '@/components/floating-oracle';
     5|
     6|const MOCK_NFTS = [
     7|  { id: 1, title: 'Cyberpunk Yeti #001', price: '2.45 SUI', image: '🐻‍❄️✨', creator: 'artist.sui', rarity: 'Rare' },
     8|  { id: 2, title: 'Oracle Vision #042', price: '3.20 SUI', image: '🔮💜', creator: 'creator.sui', rarity: 'Epic' },
     9|  { id: 3, title: 'Winter Nights #156', price: '1.85 SUI', image: '❄️🌙', creator: 'designer.sui', rarity: 'Common' },
    10|  { id: 4, title: 'Neon Prophecy #089', price: '4.10 SUI', image: '⚡🔷', creator: 'artist.sui', rarity: 'Legendary' },
    11|  { id: 5, title: 'Frostbite Dreams #223', price: '2.75 SUI', image: '❄️💎', creator: 'creator.sui', rarity: 'Rare' },
    12|  { id: 6, title: 'Crypto Yeti #001', price: '5.50 SUI', image: '🐻‍❄️💻', creator: 'legend.sui', rarity: 'Legendary' },
    13|];
    14|
    15|export default function MarketplacePage() {
    16|  const [selectedNFT, setSelectedNFT] = useState<typeof MOCK_NFTS[0] | null>(null);
    17|  const [filter, setFilter] = useState('all');
    18|  const [search, setSearch] = useState('');
    19|
    20|  return (
    21|    <div className="space-y-6 relative">
    22|      <FloatingOracle />
    23|      {/* Header */}
    24|      <div className="space-y-2">
    25|        <div className="flex items-center gap-2">
    26|          <span className="text-3xl">🖼️</span>
    27|          <h1 className="text-3xl font-bold gradient-text">Marketplace</h1>
    28|        </div>
    29|        <p className="text-muted-foreground">Discover and collect unique NFTs from Yeti Oracle</p>
    30|      </div>
    31|
    32|      {/* Search & Filter */}
    33|      <div className="card-glass flex gap-4 p-4">
    34|        <input
    35|          type="text"
    36|          placeholder="Search NFTs..."
    37|          value={search}
    38|          onChange={(e) => setSearch(e.target.value)}
    39|          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50"
    40|        />
    41|        <div className="flex gap-2">
    42|          {['all', 'Common', 'Rare', 'Epic', 'Legendary'].map((r) => (
    43|            <button
    44|              key={r}
    45|              onClick={() => setFilter(r)}
    46|              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    47|                filter === r
    48|                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
    49|                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:border-white/20'
    50|              }`}
    51|            >
    52|              {r}
    53|            </button>
    54|          ))}
    55|        </div>
    56|      </div>
    57|
    58|      {/* NFT Grid */}
    59|      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    60|        {MOCK_NFTS.map((nft) => (
    61|          <button
    62|            key={nft.id}
    63|            onClick={() => setSelectedNFT(nft)}
    64|            className="card-glass p-4 space-y-3 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
    65|          >
    66|            <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
    67|              {nft.image}
    68|            </div>
    69|            <div className="space-y-2">
    70|              <p className="font-semibold text-sm">{nft.title}</p>
    71|              <div className="flex items-center justify-between">
    72|                <span className={`text-xs px-2 py-1 rounded ${
    73|                  nft.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-300' :
    74|                  nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-300' :
    75|                  nft.rarity === 'Rare' ? 'bg-cyan-500/20 text-cyan-300' :
    76|                  'bg-white/10 text-muted-foreground'
    77|                }`}>
    78|                  {nft.rarity}
    79|                </span>
    80|                <p className="text-sm font-bold text-cyan-400">{nft.price}</p>
    81|              </div>
    82|              <p className="text-xs text-muted-foreground">by {nft.creator}</p>
    83|              <button className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-xs font-medium hover:from-cyan-600 hover:to-purple-600 transition-all">
    84|                View Details
    85|              </button>
    86|            </div>
    87|          </button>
    88|        ))}
    89|      </div>
    90|
    91|      {/* Detail Modal */}
    92|      {selectedNFT && (
    93|        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    94|          <div className="card-glass max-w-md w-full space-y-4">
    95|            <div className="flex justify-between items-start">
    96|              <h2 className="text-xl font-bold">{selectedNFT.title}</h2>
    97|              <button onClick={() => setSelectedNFT(null)} className="text-2xl">✕</button>
    98|            </div>
    99|            <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg flex items-center justify-center text-6xl">
   100|              {selectedNFT.image}
   101|            </div>
   102|            <div className="space-y-3">
   103|              <div className="grid grid-cols-2 gap-2">
   104|                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
   105|                  <p className="text-muted-foreground text-xs">Price</p>
   106|                  <p className="font-semibold text-cyan-400">{selectedNFT.price}</p>
   107|                </div>
   108|                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
   109|                  <p className="text-muted-foreground text-xs">Rarity</p>
   110|                  <p className="font-semibold">{selectedNFT.rarity}</p>
   111|                </div>
   112|              </div>
   113|              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
   114|                <p className="text-muted-foreground text-xs mb-1">Creator</p>
   115|                <p className="text-sm font-medium">{selectedNFT.creator}</p>
   116|              </div>
   117|              <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all glow-cyan">
   118|                Purchase NFT
   119|              </button>
   120|            </div>
   121|          </div>
   122|        </div>
   123|      )}
   124|    </div>
   125|  );
   126|}
   127|