     1|'use client';
     2|
     3|import { useState } from 'react';
     4|
     5|const ORACLE_QUESTIONS = [
     6|  'Should I mint this NFT?',
     7|  'Explain this prediction market.',
     8|  'Summarize my wallet activity.',
     9|  'Suggest a fair price for my NFT.',
    10|  "What's trending in the marketplace?",
    11|];
    12|
    13|export function FloatingOracle() {
    14|  const [isOpen, setIsOpen] = useState(false);
    15|  const [messages, setMessages] = useState<Array<{ role: 'user' | 'oracle'; content: string }>>(
    16|    [
    17|      { role: 'oracle', content: "Hi! I'm Yeti Oracle. Ask me anything about predictions, NFTs, or the marketplace! 🔮" },
    18|    ]
    19|  );
    20|  const [input, setInput] = useState('');
    21|  const [isLoading, setIsLoading] = useState(false);
    22|
    23|  const handleQuickQuestion = (question: string) => {
    24|    setMessages(prev => [...prev, { role: 'user', content: question }]);
    25|    setIsLoading(true);
    26|    setTimeout(() => {
    27|      const responses = [
    28|        'Based on current market trends, this looks like a solid investment. The creator has strong history and demand is growing.',
    29|        'This market predicts whether SUI will reach $5 by Q2 2025. Users pool funds and split rewards based on their prediction outcome.',
    30|        "You've completed 12 predictions with 68% win rate. Total volume: 245 SUI. Most active in Crypto category.",
    31|        'Based on floor price of 2.45 SUI and recent sales, fair value is around 2.8-3.2 SUI depending on rarity.',
    32|      ];
    33|      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    34|      setMessages(prev => [...prev, { role: 'oracle', content: randomResponse }]);
    35|      setIsLoading(false);
    36|    }, 500);
    37|  };
    38|
    39|  const handleSendMessage = () => {
    40|    if (!input.trim()) return;
    41|    setMessages(prev => [...prev, { role: 'user', content: input }]);
    42|    setInput('');
    43|    setIsLoading(true);
    44|    setTimeout(() => {
    45|      const responses = [
    46|        "That's an interesting question! Based on market data and trends...",
    47|        'Great question! Let me analyze that for you...',
    48|        "I can help with that! Here's what I found...",
    49|      ];
    50|      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    51|      setMessages(prev => [...prev, { role: 'oracle', content: randomResponse }]);
    52|      setIsLoading(false);
    53|    }, 500);
    54|  };
    55|
    56|  return (
    57|    <div className="fixed bottom-6 right-6 z-40">
    58|      {isOpen && (
    59|        <div className="absolute bottom-20 right-0 w-80 bg-white/5 backdrop-filter backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col h-96 fade-in">
    60|          {/* Header */}
    61|          <div className="flex items-center justify-between p-4 border-b border-white/10">
    62|            <div className="flex items-center gap-2">
    63|              <span className="text-2xl">🔮</span>
    64|              <h3 className="font-semibold text-sm">Yeti Oracle</h3>
    65|            </div>
    66|            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-all">
    67|              ✕
    68|            </button>
    69|          </div>
    70|
    71|          {/* Messages */}
    72|          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
    73|            {messages.map((msg, i) => (
    74|              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    75|                <div
    76|                  className={`max-w-xs px-3 py-2 rounded-lg ${
    77|                    msg.role === 'user'
    78|                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-100'
    79|                      : 'bg-white/5 text-foreground'
    80|                  }`}
    81|                >
    82|                  {msg.content}
    83|                </div>
    84|              </div>
    85|            ))}
    86|            {isLoading && (
    87|              <div className="flex justify-start">
    88|                <div className="bg-white/5 px-3 py-2 rounded-lg text-sm text-muted-foreground">
    89|                  <span className="animate-pulse">Thinking...</span>
    90|                </div>
    91|              </div>
    92|            )}
    93|          </div>
    94|
    95|          {/* Quick Questions */}
    96|          {messages.length === 1 && (
    97|            <div className="px-4 py-2 border-t border-white/10 space-y-2 max-h-40 overflow-y-auto">
    98|              {ORACLE_QUESTIONS.map((q, i) => (
    99|                <button
   100|                  key={i}
   101|                  onClick={() => handleQuickQuestion(q)}
   102|                  className="w-full text-left text-xs p-2 rounded bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
   103|                >
   104|                  {q}
   105|                </button>
   106|              ))}
   107|            </div>
   108|          )}
   109|
   110|          {/* Input */}
   111|          <div className="p-4 border-t border-white/10 flex gap-2">
   112|            <input
   113|              type="text"
   114|              value={input}
   115|              onChange={(e) => setInput(e.target.value)}
   116|              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
   117|              placeholder="Ask me..."
   118|              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500/50 placeholder-muted-foreground"
   119|            />
   120|            <button
   121|              onClick={handleSendMessage}
   122|              disabled={isLoading || !input.trim()}
   123|              className="p-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white rounded-lg transition-all"
   124|            >
   125|              ➜
   126|            </button>
   127|          </div>
   128|        </div>
   129|      )}
   130|
   131|      {/* Floating Button */}
   132|      <button
   133|        onClick={() => setIsOpen(!isOpen)}
   134|        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all glow-cyan group"
   135|      >
   136|        {isOpen ? '✕' : '💬'}
   137|      </button>
   138|    </div>
   139|  );
   140|}
   141|