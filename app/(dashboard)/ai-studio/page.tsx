     1|'use client';
     2|
     3|import { useState } from 'react';
     4|import { FloatingOracle } from '@/components/floating-oracle';
     5|
     6|const MOCK_CREATIONS = [
     7|  { id: 1, title: 'Cyberpunk Yeti', image: '🐻‍❄️✨', price: '2.45 SUI' },
     8|  { id: 2, title: 'Neon Oracle', image: '🔮💜', price: '3.20 SUI' },
     9|  { id: 3, title: 'Winter Warrior', image: '⛸️❄️', price: '1.85 SUI' },
    10|];
    11|
    12|const MOCK_GENERATION_HISTORY = [
    13|  { id: 1, prompt: 'A cozy yeti relaxing in a cyberpunk city', timestamp: '2 hours ago', status: 'Minted' },
    14|  { id: 2, prompt: 'Oracle yeti studying holographic markets', timestamp: '5 hours ago', status: 'Minted' },
    15|  { id: 3, prompt: 'Yeti with neon headphones', timestamp: '1 day ago', status: 'Minted' },
    16|];
    17|
    18|export default function AIStudioPage() {
    19|  const [prompt, setPrompt] = useState('A mystical yeti oracle in a cyberpunk city with neon lights');
    20|  const [style, setStyle] = useState('Anime');
    21|  const [isGenerating, setIsGenerating] = useState(false);
    22|  const [selectedCreation, setSelectedCreation] = useState(MOCK_CREATIONS[0]);
    23|
    24|  const handleGenerate = () => {
    25|    setIsGenerating(true);
    26|    setTimeout(() => setIsGenerating(false), 2000);
    27|  };
    28|
    29|  return (
    30|    <div className="space-y-6 relative">
    31|      <FloatingOracle />
    32|      {/* Header */}
    33|      <div className="space-y-2">
    34|        <div className="flex items-center gap-2">
    35|          <span className="text-3xl">✨</span>
    36|          <h1 className="text-3xl font-bold gradient-text">AI Image Studio</h1>
    37|        </div>
    38|        <p className="text-muted-foreground">Create unique art and mint it as NFTs on Sui</p>
    39|      </div>
    40|
    41|      {/* Main Grid */}
    42|      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    43|        {/* Prompt & Settings Panel */}
    44|        <div className="lg:col-span-1 space-y-4">
    45|          <div className="card-glass space-y-4">
    46|            <h2 className="text-lg font-semibold">Create Your Art</h2>
    47|            
    48|            {/* Prompt Input */}
    49|            <div className="space-y-2">
    50|              <label className="text-sm font-medium text-muted-foreground">Prompt</label>
    51|              <textarea
    52|                value={prompt}
    53|                onChange={(e) => setPrompt(e.target.value)}
    54|                placeholder="Describe your artwork..."
    55|                className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 resize-none"
    56|              />
    57|              <p className="text-xs text-muted-foreground">{prompt.length}/300</p>
    58|            </div>
    59|
    60|            {/* Style Selector */}
    61|            <div className="space-y-2">
    62|              <label className="text-sm font-medium text-muted-foreground">Art Style</label>
    63|              <div className="grid grid-cols-2 gap-2">
    64|                {['Anime', 'Cyberpunk', 'Fantasy', 'Realistic'].map((s) => (
    65|                  <button
    66|                    key={s}
    67|                    onClick={() => setStyle(s)}
    68|                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
    69|                      style === s
    70|                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300'
    71|                        : 'bg-white/5 border border-white/10 text-muted-foreground hover:border-white/20'
    72|                    }`}
    73|                  >
    74|                    {s}
    75|                  </button>
    76|                ))}
    77|              </div>
    78|            </div>
    79|
    80|            {/* Generate Button */}
    81|            <button
    82|              onClick={handleGenerate}
    83|              disabled={isGenerating}
    84|              className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 glow-cyan"
    85|            >
    86|              {isGenerating ? (
    87|                <>
    88|                  <span className="animate-spin">⚡</span>
    89|                  Generating...
    90|                </>
    91|              ) : (
    92|                <>
    93|                  <span>🎨</span>
    94|                  Generate Art
    95|                </>
    96|              )}
    97|            </button>
    98|            <p className="text-xs text-muted-foreground text-center">Each generation costs ~0.02 SUI</p>
    99|          </div>
   100|        </div>
   101|
   102|        {/* Preview Panel */}
   103|        <div className="lg:col-span-1">
   104|          <div className="card-glass space-y-4 h-full">
   105|            <h2 className="text-lg font-semibold">Preview</h2>
   106|            <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg border border-white/10 flex items-center justify-center text-6xl">
   107|              {isGenerating ? (
   108|                <div className="animate-pulse">✨</div>
   109|              ) : (
   110|                selectedCreation.image
   111|              )}
   112|            </div>
   113|            <div className="space-y-3 pt-2">
   114|              <div>
   115|                <p className="text-xs text-muted-foreground">Title</p>
   116|                <input
   117|                  type="text"
   118|                  placeholder="Name your creation..."
   119|                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/50"
   120|                />
   121|              </div>
   122|              <div className="flex gap-2 pt-2">
   123|                <button className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-white/20 transition-all flex items-center justify-center gap-2">
   124|                  🔄 Regenerate
   125|                </button>
   126|                <button className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-white/20 transition-all flex items-center justify-center gap-2">
   127|                  ⬇️ Download
   128|                </button>
   129|              </div>
   130|            </div>
   131|          </div>
   132|        </div>
   133|
   134|        {/* My Creations & History Panel */}
   135|        <div className="lg:col-span-1 space-y-4">
   136|          {/* My Creations */}
   137|          <div className="card-glass space-y-3">
   138|            <div className="flex items-center justify-between">
   139|              <h2 className="text-lg font-semibold">My Creations</h2>
   140|              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">12 Total</span>
   141|            </div>
   142|            <div className="space-y-2 max-h-48 overflow-y-auto">
   143|              {MOCK_CREATIONS.map((creation) => (
   144|                <button
   145|                  key={creation.id}
   146|                  onClick={() => setSelectedCreation(creation)}
   147|                  className={`w-full text-left p-3 rounded-lg border transition-all ${
   148|                    selectedCreation.id === creation.id
   149|                      ? 'border-cyan-500/50 bg-cyan-500/10'
   150|                      : 'border-white/10 bg-white/5 hover:border-white/20'
   151|                  }`}
   152|                >
   153|                  <div className="flex items-center gap-3">
   154|                    <div className="text-2xl">{creation.image}</div>
   155|                    <div className="flex-1 min-w-0">
   156|                      <p className="text-xs font-medium truncate">{creation.title}</p>
   157|                      <p className="text-xs text-cyan-400">{creation.price}</p>
   158|                    </div>
   159|                  </div>
   160|                </button>
   161|              ))}
   162|            </div>
   163|          </div>
   164|
   165|          {/* Generation History */}
   166|          <div className="card-glass space-y-3">
   167|            <h2 className="text-lg font-semibold text-sm">Generation History</h2>
   168|            <div className="space-y-2 max-h-48 overflow-y-auto">
   169|              {MOCK_GENERATION_HISTORY.map((item) => (
   170|                <div key={item.id} className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
   171|                  <p className="text-muted-foreground truncate">{item.prompt}</p>
   172|                  <div className="flex items-center justify-between mt-1">
   173|                    <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
   174|                    <span className="text-[10px] text-cyan-400 font-medium">{item.status}</span>
   175|                  </div>
   176|                </div>
   177|              ))}
   178|            </div>
   179|          </div>
   180|        </div>
   181|      </div>
   182|    </div>
   183|  );
   184|}
   185|