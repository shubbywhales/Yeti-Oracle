     1|'use client';
     2|
     3|import { useState } from 'react';
     4|
     5|const MARKETPLACE_NFTS = [
     6|  { id: 1, name: 'Frost Yeti', rarity: 'Rare', price: 250, creator: '@arcticwisdom', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(-20deg) saturate(1.2)' },
     7|  { id: 2, name: 'Aurora Phoenix', rarity: 'Epic', price: 500, creator: '@lightbringer', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(20deg) brightness(1.1)' },
     8|  { id: 3, name: 'Crystal Wolf', rarity: 'Rare', price: 300, creator: '@frostkeeper', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(200deg) saturate(1.5)' },
     9|  { id: 4, name: 'Storm Dragon', rarity: 'Legendary', price: 1000, creator: '@skymaster', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(270deg) brightness(0.9)' },
    10|  { id: 5, name: 'Starlight Unicorn', rarity: 'Epic', price: 600, creator: '@celestial', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(60deg) brightness(1.2)' },
    11|  { id: 6, name: 'Mystic Raven', rarity: 'Uncommon', price: 150, creator: '@shadowseer', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'saturate(0.5) brightness(0.8)' },
    12|  { id: 7, name: 'Golden Phoenix', rarity: 'Epic', price: 550, creator: '@sunbringer', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'hue-rotate(40deg) brightness(1.3)' },
    13|  { id: 8, name: 'Shadow Sentinel', rarity: 'Rare', price: 280, creator: '@darkguard', image: '/cdn/uploads/7cb306b8-768c-4a74-b85f-599b28b3e315.jpg', filter: 'brightness(0.7) contrast(1.2)' },
    14|];
    15|
    16|const LEADERBOARD_DATA = [
    17|  { rank: 1, username: '@oracle_master', level: 28, wins: 156, predictions: 345 },
    18|  { rank: 2, username: '@prophecy_king', level: 25, wins: 142, predictions: 298 },
    19|  { rank: 3, username: '@mystic_seer', level: 23, wins: 138, predictions: 276 },
    20|  { rank: 4, username: '@future_caller', level: 21, wins: 125, predictions: 234 },
    21|  { rank: 5, username: '@destiny_weaver', level: 19, wins: 112, predictions: 198 },
    22|];
    23|
    24|const BADGES_DATA = [
    25|  { icon: '🏆', name: 'Creator', desc: 'Created 5 NFTs' },
    26|  { icon: '🎯', name: 'Prophet', desc: 'Made 10 predictions' },
    27|  { icon: '💎', name: 'Legend', desc: 'Reached Level 20' },
    28|  { icon: '⚡', name: 'Streak', desc: '5 wins in a row' },
    29|  { icon: '🔮', name: 'Oracle', desc: 'Correct 50 predictions' },
    30|  { icon: '🌟', name: 'Collector', desc: 'Owned 10 NFTs' },
    31|];
    32|
    33|const GAMES = [
    34|  { id: 'oracle-cards', name: 'Oracle Cards', icon: '🎴', desc: 'Flip mystical cards for rewards', reward: '+100 XP' },
    35|  { id: 'rune-prophecy', name: 'Rune Prophecy', icon: '📖', desc: 'Solve oracle logic puzzles', reward: '+150 XP' },
    36|  { id: 'prediction-dice', name: 'Prediction Dice', icon: '🎲', desc: 'Roll for epic rewards', reward: '+100 XP' },
    37|  { id: 'mystical-memory', name: 'Mystical Memory', icon: '🧠', desc: 'Match moving magical cards', reward: '+60 XP' },
    38|  { id: 'oracle-quiz', name: 'Oracle Quiz', icon: '🧠', desc: '10 questions about oracle wisdom', reward: '+80 XP' },
    39|];
    40|
    41|export default function HomePage() {
    42|  const [activeNav, setActiveNav] = useState('studio');
    43|  const [userLevel, setUserLevel] = useState(12);
    44|  const [userXP, setUserXP] = useState(1250);
    45|  const [duoTokens, setDuoTokens] = useState(5000);
    46|  const [ownedNFTs, setOwnedNFTs] = useState([1, 3, 5]);
    47|  const [createdNFTs, setCreatedNFTs] = useState([]);
    48|  const [prompt, setPrompt] = useState('');
    49|  const [selectedStyle, setSelectedStyle] = useState('lofi');
    50|  const [generatedImage, setGeneratedImage] = useState('');
    51|  const [loading, setLoading] = useState(false);
    52|  const [selectedNFT, setSelectedNFT] = useState(null);
    53|  const [markets, setMarkets] = useState([
    54|    { id: 1, title: 'Will Sui reach $5 by Q4?', category: 'crypto', yesPool: 45000, noPool: 35000, endTime: '2024-12-31', yes: 56, no: 44 },
    55|    { id: 2, title: 'Will AI become mainstream?', category: 'tech', yesPool: 28000, noPool: 22000, endTime: '2024-11-30', yes: 62, no: 38 },
    56|    { id: 3, title: 'Will NFT market recover?', category: 'market', yesPool: 15000, noPool: 18000, endTime: '2024-10-15', yes: 45, no: 55 },
    57|  ]);
    58|  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
    59|  const [newMarketTitle, setNewMarketTitle] = useState('');
    60|  const [newMarketCategory, setNewMarketCategory] = useState('crypto');
    61|  const [activeGame, setActiveGame] = useState(null);
    62|  const [cardsFlipped, setCardsFlipped] = useState({});
    63|  const [gameReward, setGameReward] = useState('');
    64|
    65|  const handleGenerateNFT = async () => {
    66|    if (!prompt.trim()) return;
    67|    setLoading(true);
    68|    try {
    69|      const res = await fetch('/api/studio/generate', {
    70|        method: 'POST',
    71|        headers: { 'Content-Type': 'application/json' },
    72|        body: JSON.stringify({ prompt, style: selectedStyle }),
    73|      });
    74|      const data = await res.json();
    75|      if (data.imageBase64) {
    76|        setGeneratedImage(`data:image/png;base64,${data.imageBase64}`);
    77|      }
    78|    } catch (err) {
    79|      console.error('Failed to generate:', err);
    80|    } finally {
    81|      setLoading(false);
    82|    }
    83|  };
    84|
    85|  const handleSaveNFT = () => {
    86|    if (!generatedImage) return;
    87|    const nft = {
    88|      id: Date.now(),
    89|      prompt,
    90|      style: selectedStyle,
    91|      image: generatedImage,
    92|      createdAt: new Date().toLocaleDateString(),
    93|    };
    94|    setCreatedNFTs([nft, ...createdNFTs]);
    95|    setPrompt('');
    96|    setGeneratedImage('');
    97|  };
    98|
    99|  const handleCreateMarket = () => {
   100|    if (!newMarketTitle.trim()) return;
   101|    const market = {
   102|      id: markets.length + 1,
   103|      title: newMarketTitle,
   104|      category: newMarketCategory,
   105|      yesPool: 10000,
   106|      noPool: 10000,
   107|      endTime: '2024-12-31',
   108|      yes: 50,
   109|      no: 50,
   110|    };
   111|    setMarkets([market, ...markets]);
   112|    setSelectedMarket(market);
   113|    setNewMarketTitle('');
   114|  };
   115|
   116|  const playGame = (gameId) => {
   117|    const rewards = ['100 XP', '500 DUO', 'NFT Mystery Box', '+25 Level'];
   118|    const reward = rewards[Math.floor(Math.random() * rewards.length)];
   119|    setGameReward(reward);
   120|    setUserXP(userXP + 100);
   121|    setTimeout(() => {
   122|      setActiveGame(null);
   123|      setGameReward('');
   124|    }, 2000);
   125|  };
   126|
   127|  return (
   128|    <div className="flex h-screen bg-background text-foreground">
   129|      {/* Left Sidebar */}
   130|      <aside className="w-80 border-r border-border bg-card p-6 flex flex-col gap-8 overflow-y-auto">
   131|        {/* Logo */}
   132|        <div className="flex flex-col items-center">
   133|          <img 
   134|            src="/cdn/uploads/893333ba-cdba-4738-ac23-b32693d53d66.jpg" 
   135|            alt="Yeti Oracle" 
   136|            className="w-48 h-auto rounded-lg mb-4" 
   137|          />
   138|          <p className="text-xs text-center text-muted-foreground font-semibold tracking-wider">CREATE • PREDICT • EARN</p>
   139|        </div>
   140|
   141|        {/* User Card */}
   142|        <div className="bg-background rounded-lg p-4 border border-border/50">
   143|          <div className="text-4xl mb-3">🧊</div>
   144|          <p className="text-sm font-bold mb-2">Level {userLevel}</p>
   145|          <div className="w-full bg-background rounded-full h-3 border border-border/50 overflow-hidden mb-2">
   146|            <div className="bg-gradient-to-r from-primary to-purple-500 h-full" style={{ width: `${(userXP / 2000) * 100}%` }}></div>
   147|          </div>
   148|          <p className="text-xs text-muted-foreground mb-4">{userXP.toLocaleString()} / 2000 XP</p>
   149|          
   150|          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
   151|            <div className="text-center">
   152|              <p className="text-lg font-bold text-primary">{ownedNFTs.length}</p>
   153|              <p className="text-xs text-muted-foreground">NFTs</p>
   154|            </div>
   155|            <div className="text-center">
   156|              <p className="text-lg font-bold text-primary">23</p>
   157|              <p className="text-xs text-muted-foreground">Predictions</p>
   158|            </div>
   159|            <div className="text-center">
   160|              <p className="text-lg font-bold text-primary">15</p>
   161|              <p className="text-xs text-muted-foreground">Wins</p>
   162|            </div>
   163|          </div>
   164|
   165|          <div className="mt-4 pt-4 border-t border-border/50">
   166|            <p className="text-xs font-bold text-primary mb-1">💎 DUO TOKENS</p>
   167|            <p className="text-2xl font-bold text-primary">{duoTokens.toLocaleString()}</p>
   168|          </div>
   169|        </div>
   170|
   171|        {/* Navigation */}
   172|        <nav className="flex-1 space-y-3">
   173|          <p className="text-xs font-bold text-muted-foreground px-2 mb-2 tracking-wider">MENU</p>
   174|          {[
   175|            { id: 'studio', label: 'AI Studio', icon: '✨' },
   176|            { id: 'predictions', label: 'Prediction Hub', icon: '🔮' },
   177|            { id: 'marketplace', label: 'Marketplace', icon: '💎' },
   178|            { id: 'games', label: 'Games', icon: '🎮' },
   179|            { id: 'profile', label: 'Profile', icon: '👤' },
   180|            { id: 'leaderboard', label: 'Leaderboard', icon: '🏅' },
   181|            { id: 'badges', label: 'Badges', icon: '🏆' },
   182|            { id: 'activity', label: 'Activity', icon: '📊' },
   183|          ].map((item) => (
   184|            <button
   185|              key={item.id}
   186|              onClick={() => setActiveNav(item.id)}
   187|              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
   188|                activeNav === item.id
   189|                  ? 'bg-primary/90 text-white'
   190|                  : 'text-foreground hover:bg-background'
   191|              }`}
   192|            >
   193|              {item.icon} {item.label}
   194|            </button>
   195|          ))}
   196|        </nav>
   197|
   198|        {/* AI Oracle Chat */}
   199|        <div className="border-t border-border/50 pt-4">
   200|          <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg p-4 border border-primary/30">
   201|            <p className="text-sm font-semibold mb-2">🔮 AI Oracle</p>
   202|            <p className="text-xs text-muted-foreground mb-3">Ask anything about the future...</p>
   203|            <input
   204|              type="text"
   205|              placeholder="Your question..."
   206|              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
   207|            />
   208|          </div>
   209|        </div>
   210|      </aside>
   211|
   212|      {/* Main Content */}
   213|      <main className="flex-1 flex flex-col overflow-hidden">
   214|        {/* Top Bar */}
   215|        <div className="border-b border-border/50 bg-card p-4 flex items-center justify-between">
   216|          <div className="flex gap-4">
   217|            <button
   218|              onClick={() => setActiveNav('studio')}
   219|              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
   220|                activeNav === 'studio'
   221|                  ? 'bg-primary text-white'
   222|                  : 'bg-background text-foreground hover:bg-border/20'
   223|              }`}
   224|            >
   225|              AI Studio
   226|            </button>
   227|            <button
   228|              onClick={() => setActiveNav('predictions')}
   229|              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
   230|                activeNav === 'predictions'
   231|                  ? 'bg-primary text-white'
   232|                  : 'bg-background text-foreground hover:bg-border/20'
   233|              }`}
   234|            >
   235|              Prediction Hub
   236|            </button>
   237|          </div>
   238|          <div className="flex items-center gap-4">
   239|            <div className="text-right">
   240|              <p className="text-xs text-muted-foreground">Connected Wallet</p>
   241|              <p className="text-sm font-mono font-semibold">0x1234...5678</p>
   242|            </div>
   243|            <div className="text-right">
   244|              <p className="text-xs text-muted-foreground">SUI Balance</p>
   245|              <p className="text-sm font-bold">12.45 SUI</p>
   246|            </div>
   247|            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition">
   248|              Connect
   249|            </button>
   250|          </div>
   251|        </div>
   252|
   253|        {/* Content Area */}
   254|        <div className="flex-1 overflow-hidden">
   255|          {activeNav === 'studio' && (
   256|            <div className="h-full p-6 overflow-y-auto">
   257|              <div className="grid grid-cols-3 gap-6 h-full">
   258|                {/* Left: Prompt & Style */}
   259|                <div className="flex flex-col gap-4">
   260|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   261|                    <h3 className="text-lg font-bold mb-4">AI Image Studio</h3>
   262|                    <div>
   263|                      <label className="text-sm font-semibold text-foreground mb-2 block">Describe your NFT</label>
   264|                      <textarea
   265|                        value={prompt}
   266|                        onChange={(e) => setPrompt(e.target.value)}
   267|                        placeholder="A mystical yeti in a frost-covered landscape with aurora borealis..."
   268|                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary mb-4 h-32"
   269|                      />
   270|                    </div>
   271|
   272|                    <div>
   273|                      <label className="text-sm font-semibold text-foreground mb-2 block">Art Style</label>
   274|                      <div className="grid grid-cols-2 gap-2">
   275|                        {['Lofi', 'Cyberpunk', 'Fantasy', 'Anime'].map((style) => (
   276|                          <button
   277|                            key={style}
   278|                            onClick={() => setSelectedStyle(style.toLowerCase())}
   279|                            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
   280|                              selectedStyle === style.toLowerCase()
   281|                                ? 'bg-primary text-white'
   282|                                : 'bg-background border border-border text-foreground hover:border-primary'
   283|                            }`}
   284|                          >
   285|                            {style}
   286|                          </button>
   287|                        ))}
   288|                      </div>
   289|                    </div>
   290|
   291|                    <button
   292|                      onClick={handleGenerateNFT}
   293|                      disabled={loading || !prompt.trim()}
   294|                      className="w-full mt-4 px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition"
   295|                    >
   296|                      {loading ? 'Generating...' : 'Generate Art'}
   297|                    </button>
   298|                  </div>
   299|                </div>
   300|
   301|                {/* Middle: Preview */}
   302|                <div className="flex flex-col gap-4">
   303|                  <div className="bg-card rounded-lg p-6 border border-border/50 flex-1 flex items-center justify-center">
   304|                    {generatedImage ? (
   305|                      <div className="w-full">
   306|                        <img src={generatedImage} alt="Generated" className="w-full rounded-lg mb-4" />
   307|                        <button
   308|                          onClick={handleSaveNFT}
   309|                          className="w-full px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
   310|                        >
   311|                          Save to Collection
   312|                        </button>
   313|                      </div>
   314|                    ) : (
   315|                      <div className="text-center">
   316|                        <p className="text-muted-foreground">Generated art will appear here</p>
   317|                      </div>
   318|                    )}
   319|                  </div>
   320|                </div>
   321|
   322|                {/* Right: Gallery */}
   323|                <div className="flex flex-col gap-4">
   324|                  <div className="bg-card rounded-lg p-6 border border-border/50 flex-1 overflow-y-auto">
   325|                    <h3 className="text-lg font-bold mb-4">My Creations</h3>
   326|                    {createdNFTs.length === 0 ? (
   327|                      <p className="text-muted-foreground text-sm">No NFTs created yet</p>
   328|                    ) : (
   329|                      <div className="space-y-3">
   330|                        {createdNFTs.map((nft) => (
   331|                          <div key={nft.id} className="bg-background rounded-lg p-3 border border-border/50">
   332|                            <img src={nft.image} alt="Created NFT" className="w-full rounded-lg mb-2 h-20 object-cover" />
   333|                            <p className="text-xs text-muted-foreground truncate">{nft.prompt}</p>
   334|                            <p className="text-xs text-primary font-semibold">{nft.style}</p>
   335|                          </div>
   336|                        ))}
   337|                      </div>
   338|                    )}
   339|                  </div>
   340|                </div>
   341|              </div>
   342|            </div>
   343|          )}
   344|
   345|          {activeNav === 'predictions' && (
   346|            <div className="h-full p-6 overflow-y-auto">
   347|              <div className="grid grid-cols-3 gap-6 h-full">
   348|                {/* Left: Market List */}
   349|                <div className="flex flex-col gap-4">
   350|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   351|                    <h3 className="text-lg font-bold mb-4">Active Markets</h3>
   352|                    <div className="space-y-3">
   353|                      {markets.map((market) => (
   354|                        <button
   355|                          key={market.id}
   356|                          onClick={() => setSelectedMarket(market)}
   357|                          className={`w-full text-left p-4 rounded-lg border-2 transition ${
   358|                            selectedMarket.id === market.id
   359|                              ? 'bg-primary/10 border-primary'
   360|                              : 'bg-background border-border/50 hover:border-primary/50'
   361|                          }`}
   362|                        >
   363|                          <p className="text-sm font-semibold text-foreground truncate">{market.title}</p>
   364|                          <p className="text-xs text-muted-foreground mt-1">Pool: ${(market.yesPool + market.noPool).toLocaleString()}</p>
   365|                          <div className="flex gap-2 mt-2">
   366|                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Yes: {market.yes}%</span>
   367|                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">No: {market.no}%</span>
   368|                          </div>
   369|                        </button>
   370|                      ))}
   371|                    </div>
   372|                  </div>
   373|                </div>
   374|
   375|                {/* Middle: Market Detail */}
   376|                <div className="flex flex-col gap-4">
   377|                  {selectedMarket && (
   378|                    <div className="bg-card rounded-lg p-6 border border-border/50">
   379|                      <h3 className="text-lg font-bold mb-4">{selectedMarket.title}</h3>
   380|                      <div className="space-y-4">
   381|                        <div>
   382|                          <p className="text-xs text-muted-foreground mb-2">YES Pool</p>
   383|                          <p className="text-xl font-bold text-green-400">${selectedMarket.yesPool.toLocaleString()}</p>
   384|                        </div>
   385|                        <div>
   386|                          <p className="text-xs text-muted-foreground mb-2">NO Pool</p>
   387|                          <p className="text-xl font-bold text-red-400">${selectedMarket.noPool.toLocaleString()}</p>
   388|                        </div>
   389|                        <div className="pt-4 border-t border-border/50">
   390|                          <p className="text-xs text-muted-foreground mb-2">Ends: {selectedMarket.endTime}</p>
   391|                          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-bold mb-2 hover:bg-green-700 transition">
   392|                            Bet YES
   393|                          </button>
   394|                          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">
   395|                            Bet NO
   396|                          </button>
   397|                        </div>
   398|                      </div>
   399|
   400|                      {/* AI Analysis */}
   401|                      <div className="mt-6 pt-6 border-t border-border/50">
   402|                        <p className="text-sm font-bold mb-2">🔮 AI Oracle Analysis</p>
   403|                        <p className="text-xs text-muted-foreground mb-3">Based on market data and sentiment analysis...</p>
   404|                        <div className="bg-background rounded-lg p-3 text-xs text-foreground">
   405|                          <p className="mb-2">The Oracle sees {selectedMarket.yes}% confidence in YES outcome.</p>
   406|                          <p className="text-primary font-semibold">Confidence: High</p>
   407|                        </div>
   408|                      </div>
   409|                    </div>
   410|                  )}
   411|                </div>
   412|
   413|                {/* Right: Create & Badges */}
   414|                <div className="flex flex-col gap-4">
   415|                  {/* Create New Market */}
   416|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   417|                    <h3 className="text-lg font-bold mb-4">Create Market</h3>
   418|                    <input
   419|                      type="text"
   420|                      value={newMarketTitle}
   421|                      onChange={(e) => setNewMarketTitle(e.target.value)}
   422|                      placeholder="Market question..."
   423|                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary mb-3"
   424|                    />
   425|                    <select
   426|                      value={newMarketCategory}
   427|                      onChange={(e) => setNewMarketCategory(e.target.value)}
   428|                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary mb-3"
   429|                    >
   430|                      <option value="crypto">Crypto</option>
   431|                      <option value="tech">Tech</option>
   432|                      <option value="market">Market</option>
   433|                    </select>
   434|                    <button
   435|                      onClick={handleCreateMarket}
   436|                      className="w-full px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
   437|                    >
   438|                      Create Market
   439|                    </button>
   440|                  </div>
   441|
   442|                  {/* Daily Quests */}
   443|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   444|                    <h3 className="text-lg font-bold mb-3">Daily Quests</h3>
   445|                    <div className="space-y-2 text-sm">
   446|                      <div className="flex gap-2 items-start">
   447|                        <span>✅</span>
   448|                        <div>
   449|                          <p className="font-semibold">Create 1 NFT</p>
   450|                          <p className="text-xs text-muted-foreground">+50 XP</p>
   451|                        </div>
   452|                      </div>
   453|                      <div className="flex gap-2 items-start">
   454|                        <span>⏳</span>
   455|                        <div>
   456|                          <p className="font-semibold">Make 3 Predictions</p>
   457|                          <p className="text-xs text-muted-foreground">+100 XP (1/3)</p>
   458|                        </div>
   459|                      </div>
   460|                    </div>
   461|                  </div>
   462|
   463|                  {/* Badges */}
   464|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   465|                    <h3 className="text-lg font-bold mb-3">Badges</h3>
   466|                    <div className="grid grid-cols-3 gap-2">
   467|                      <div className="text-center">
   468|                        <p className="text-2xl">🏆</p>
   469|                        <p className="text-xs font-semibold">Creator</p>
   470|                      </div>
   471|                      <div className="text-center">
   472|                        <p className="text-2xl">🎯</p>
   473|                        <p className="text-xs font-semibold">Prophet</p>
   474|                      </div>
   475|                      <div className="text-center opacity-50">
   476|                        <p className="text-2xl">💎</p>
   477|                        <p className="text-xs font-semibold">Legend</p>
   478|                      </div>
   479|                    </div>
   480|                  </div>
   481|                </div>
   482|              </div>
   483|            </div>
   484|          )}
   485|
   486|          {activeNav === 'marketplace' && (
   487|            <div className="h-full p-6 overflow-y-auto">
   488|              <div className="grid grid-cols-2 gap-6 h-full">
   489|                {/* Left: NFT Grid */}
   490|                <div className="flex flex-col gap-4">
   491|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   492|                    <h3 className="text-lg font-bold mb-4">Browse NFTs</h3>
   493|                    <div className="grid grid-cols-2 gap-4">
   494|                      {MARKETPLACE_NFTS.map((nft) => (
   495|                        <button
   496|                          key={nft.id}
   497|                          onClick={() => setSelectedNFT(nft)}
   498|                          className={`p-4 rounded-lg border-2 transition text-left ${
   499|                            selectedNFT?.id === nft.id
   500|                              ? 'bg-primary/10 border-primary'
   501|                              : 'bg-background border-border/50 hover:border-primary/50'
   502|                          }`}
   503|                        >
   504|                          <div className="w-full h-24 rounded-lg mb-2 overflow-hidden bg-background">
   505|                            <img 
   506|                              src={nft.image} 
   507|                              alt={nft.name}
   508|                              style={{ filter: nft.filter }}
   509|                              className="w-full h-full object-cover"
   510|                            />
   511|                          </div>
   512|                          <p className="text-sm font-bold">{nft.name}</p>
   513|                          <p className="text-xs text-primary font-semibold">{nft.rarity}</p>
   514|                          <p className="text-sm font-bold mt-2 text-primary">{nft.price} DUO</p>
   515|                        </button>
   516|                      ))}
   517|                    </div>
   518|                  </div>
   519|                </div>
   520|
   521|                {/* Right: NFT Detail & Purchase */}
   522|                <div className="flex flex-col gap-4">
   523|                  {selectedNFT ? (
   524|                    <>
   525|                      <div className="bg-card rounded-lg p-6 border border-border/50">
   526|                        <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-background">
   527|                          <img 
   528|                            src={selectedNFT.image} 
   529|                            alt={selectedNFT.name}
   530|                            style={{ filter: selectedNFT.filter }}
   531|                            className="w-full h-full object-cover"
   532|                          />
   533|                        </div>
   534|                        <p className="text-2xl font-bold mb-2">{selectedNFT.name}</p>
   535|                        <p className="text-sm text-muted-foreground mb-4">by {selectedNFT.creator}</p>
   536|                        
   537|                        <div className="space-y-3 pb-4 border-b border-border/50">
   538|                          <div>
   539|                            <p className="text-xs text-muted-foreground mb-1">Rarity</p>
   540|                            <p className="text-lg font-bold text-primary">{selectedNFT.rarity}</p>
   541|                          </div>
   542|                          <div>
   543|                            <p className="text-xs text-muted-foreground mb-1">Price</p>
   544|                            <p className="text-2xl font-bold text-primary">{selectedNFT.price} DUO</p>
   545|                          </div>
   546|                        </div>
   547|
   548|                        <div className="mt-4">
   549|                          <button
   550|                            onClick={() => {
   551|                              if (duoTokens >= selectedNFT.price) {
   552|                                setDuoTokens(duoTokens - selectedNFT.price);
   553|                                setOwnedNFTs([...ownedNFTs, selectedNFT.id]);
   554|                                setSelectedNFT(null);
   555|                              }
   556|                            }}
   557|                            disabled={duoTokens < selectedNFT.price}
   558|                            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition"
   559|                          >
   560|                            {duoTokens >= selectedNFT.price ? 'Purchase NFT' : 'Insufficient Tokens'}
   561|                          </button>
   562|                        </div>
   563|                      </div>
   564|                    </>
   565|                  ) : (
   566|                    <div className="bg-card rounded-lg p-6 border border-border/50 flex items-center justify-center h-full">
   567|                      <p className="text-muted-foreground">Select an NFT to view details</p>
   568|                    </div>
   569|                  )}
   570|
   571|                  {/* Owned NFTs */}
   572|                  <div className="bg-card rounded-lg p-6 border border-border/50">
   573|                    <h3 className="text-lg font-bold mb-4">Your Collection ({ownedNFTs.length})</h3>
   574|                    <div className="grid grid-cols-3 gap-3">
   575|                      {ownedNFTs.map((nftId) => {
   576|                        const nft = MARKETPLACE_NFTS.find((n) => n.id === nftId);
   577|                        return nft ? (
   578|                          <div key={nftId} className="p-2 rounded-lg bg-background border border-border/50">
   579|                            <img 
   580|                              src={nft.image} 
   581|                              alt={nft.name}
   582|                              style={{ filter: nft.filter }}
   583|                              className="w-full h-16 object-cover rounded-lg mb-2"
   584|                            />
   585|                            <p className="text-xs font-semibold truncate">{nft.name}</p>
   586|                          </div>
   587|                        ) : null;
   588|                      })}
   589|                    </div>
   590|                  </div>
   591|                </div>
   592|              </div>
   593|            </div>
   594|          )}
   595|
   596|          {activeNav === 'games' && (
   597|            <div className="h-full p-6 overflow-y-auto">
   598|              <div className="grid grid-cols-2 gap-6">
   599|                {/* Games Grid */}
   600|                {GAMES.map((game) => (
   601|                  <div key={game.id} className="bg-card rounded-lg p-6 border border-border/50">
   602|                    <div className="text-6xl mb-4">{game.icon}</div>
   603|                    <h3 className="text-xl font-bold mb-2">{game.name}</h3>
   604|                    <p className="text-sm text-muted-foreground mb-4">{game.desc}</p>
   605|                    <p className="text-primary font-bold mb-4">{game.reward}</p>
   606|                    <button
   607|                      onClick={() => {
   608|                        setActiveGame(game.id);
   609|                        playGame(game.id);
   610|                      }}
   611|                      className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
   612|                    >
   613|                      {activeGame === game.id ? 'Playing...' : 'Play Now'}
   614|                    </button>
   615|                    {activeGame === game.id && gameReward && (
   616|                      <div className="mt-4 p-3 bg-primary/20 rounded-lg text-center">
   617|                        <p className="text-primary font-bold">🎉 Won: {gameReward}</p>
   618|                      </div>
   619|                    )}
   620|                  </div>
   621|                ))}
   622|              </div>
   623|            </div>
   624|          )}
   625|
   626|          {activeNav === 'profile' && (
   627|            <div className="h-full p-6 overflow-y-auto">
   628|              <div className="grid grid-cols-3 gap-6">
   629|                {/* Profile Stats */}
   630|                <div className="bg-card rounded-lg p-6 border border-border/50">
   631|                  <p className="text-sm font-bold text-muted-foreground mb-4 tracking-wider">YOUR PROFILE</p>
   632|                  <div className="flex flex-col items-center mb-6 pb-6 border-b border-border/50">
   633|                    <p className="text-5xl mb-3">🧊</p>
   634|                    <p className="text-2xl font-bold">Level {userLevel}</p>
   635|                    <p className="text-xs text-muted-foreground mt-2">Collector</p>
   636|                  </div>
   637|                  <div className="space-y-4">
   638|                    <div>
   639|                      <p className="text-xs text-muted-foreground mb-2">Experience</p>
   640|                      <p className="text-2xl font-bold text-primary">{userXP}/2000 XP</p>
   641|                      <div className="w-full bg-background rounded-full h-2 border border-border/50 overflow-hidden mt-2">
   642|                        <div className="bg-gradient-to-r from-primary to-purple-500 h-full" style={{ width: `${(userXP / 2000) * 100}%` }}></div>
   643|                      </div>
   644|                    </div>
   645|                    <div className="pt-4 border-t border-border/50">
   646|                      <p className="text-xs text-muted-foreground mb-2">DUO Tokens</p>
   647|                      <p className="text-2xl font-bold text-primary">{duoTokens.toLocaleString()}</p>
   648|                    </div>
   649|                  </div>
   650|                </div>
   651|
   652|                {/* Stats Grid */}
   653|                <div className="grid grid-rows-3 gap-4">
   654|                  <div className="bg-card rounded-lg p-4 border border-border/50">
   655|                    <p className="text-xs text-muted-foreground mb-2">NFTs Created</p>
   656|                    <p className="text-3xl font-bold text-primary">{createdNFTs.length}</p>
   657|                  </div>
   658|                  <div className="bg-card rounded-lg p-4 border border-border/50">
   659|                    <p className="text-xs text-muted-foreground mb-2">NFTs Owned</p>
   660|                    <p className="text-3xl font-bold text-primary">{ownedNFTs.length}</p>
   661|                  </div>
   662|                  <div className="bg-card rounded-lg p-4 border border-border/50">
   663|                    <p className="text-xs text-muted-foreground mb-2">Predictions Made</p>
   664|                    <p className="text-3xl font-bold text-primary">23</p>
   665|                  </div>
   666|                </div>
   667|
   668|                {/* Badges */}
   669|                <div className="bg-card rounded-lg p-6 border border-border/50">
   670|                  <p className="text-sm font-bold text-muted-foreground mb-4 tracking-wider">EARNED BADGES</p>
   671|                  <div className="grid grid-cols-3 gap-3">
   672|                    {BADGES_DATA.map((badge, i) => (
   673|                      <div key={i} className="text-center p-3 rounded-lg bg-background border border-border/50">
   674|                        <p className="text-2xl mb-2">{badge.icon}</p>
   675|                        <p className="text-xs font-bold">{badge.name}</p>
   676|                        <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
   677|                      </div>
   678|                    ))}
   679|                  </div>
   680|                </div>
   681|              </div>
   682|            </div>
   683|          )}
   684|
   685|          {activeNav === 'leaderboard' && (
   686|            <div className="h-full p-6 overflow-y-auto">
   687|              <div className="bg-card rounded-lg p-6 border border-border/50 max-w-2xl">
   688|                <p className="text-sm font-bold text-muted-foreground mb-6 tracking-wider">GLOBAL LEADERBOARD</p>
   689|                <div className="space-y-3">
   690|                  {LEADERBOARD_DATA.map((player) => (
   691|                    <div key={player.rank} className="flex items-center justify-between p-4 rounded-lg bg-background border border-border/50">
   692|                      <div className="flex items-center gap-4 flex-1">
   693|                        <p className="text-2xl font-bold text-primary w-10 text-center">#{player.rank}</p>
   694|                        <div>
   695|                          <p className="font-bold text-foreground">{player.username}</p>
   696|                          <p className="text-xs text-muted-foreground">Level {player.level}</p>
   697|                        </div>
   698|                      </div>
   699|                      <div className="text-right">
   700|                        <p className="text-sm font-bold text-primary">{player.wins} Wins</p>
   701|                        <p className="text-xs text-muted-foreground">{player.predictions} Predictions</p>
   702|                      </div>
   703|                    </div>
   704|                  ))}
   705|                </div>
   706|              </div>
   707|            </div>
   708|          )}
   709|
   710|          {activeNav === 'badges' && (
   711|            <div className="h-full p-6 overflow-y-auto">
   712|              <div className="grid grid-cols-4 gap-6">
   713|                {BADGES_DATA.map((badge, i) => (
   714|                  <div key={i} className="bg-card rounded-lg p-6 border border-border/50 text-center">
   715|                    <p className="text-6xl mb-4">{badge.icon}</p>
   716|                    <p className="text-lg font-bold mb-2">{badge.name}</p>
   717|                    <p className="text-sm text-muted-foreground">{badge.desc}</p>
   718|                  </div>
   719|                ))}
   720|              </div>
   721|            </div>
   722|          )}
   723|
   724|          {activeNav === 'activity' && (
   725|            <div className="h-full p-6 overflow-y-auto">
   726|              <div className="bg-card rounded-lg p-6 border border-border/50 max-w-2xl">
   727|                <p className="text-sm font-bold text-muted-foreground mb-6 tracking-wider">RECENT ACTIVITY</p>
   728|                <div className="space-y-3">
   729|                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
   730|                    <p className="text-2xl">🎨</p>
   731|                    <div className="flex-1">
   732|                      <p className="font-bold">Generated NFT</p>
   733|                      <p className="text-xs text-muted-foreground">Created a new collectible - 2 hours ago</p>
   734|                    </div>
   735|                    <p className="text-primary font-bold">+50 XP</p>
   736|                  </div>
   737|                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
   738|                    <p className="text-2xl">💎</p>
   739|                    <div className="flex-1">
   740|                      <p className="font-bold">Purchased NFT</p>
   741|                      <p className="text-xs text-muted-foreground">Bought Frost Yeti - 4 hours ago</p>
   742|                    </div>
   743|                    <p className="text-primary font-bold">-250 DUO</p>
   744|                  </div>
   745|                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
   746|                    <p className="text-2xl">🔮</p>
   747|                    <div className="flex-1">
   748|                      <p className="font-bold">Created Prediction</p>
   749|                      <p className="text-xs text-muted-foreground">Market: Will Sui reach $5? - 6 hours ago</p>
   750|                    </div>
   751|                    <p className="text-primary font-bold">+25 XP</p>
   752|                  </div>
   753|                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
   754|                    <p className="text-2xl">✅</p>
   755|                    <div className="flex-1">
   756|                      <p className="font-bold">Prediction Resolved</p>
   757|                      <p className="text-xs text-muted-foreground">Correct! Won 500 DUO - 1 day ago</p>
   758|                    </div>
   759|                    <p className="text-primary font-bold">+500 DUO</p>
   760|                  </div>
   761|                </div>
   762|              </div>
   763|            </div>
   764|          )}
   765|        </div>
   766|      </main>
   767|    </div>
   768|  );
   769|}
   770|