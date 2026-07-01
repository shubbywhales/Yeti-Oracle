     1|'use client';
     2|
     3|import { useState } from 'react';
     4|
     5|export default function StudioSection() {
     6|  const [prompt, setPrompt] = useState('');
     7|  const [style, setStyle] = useState('mystical');
     8|  const [generated, setGenerated] = useState<{ url: string; prompt: string } | null>(null);
     9|  const [loading, setLoading] = useState(false);
    10|
    11|  const handleGenerate = async () => {
    12|    if (!prompt) return;
    13|    
    14|    setLoading(true);
    15|    try {
    16|      const res = await fetch('/api/studio/generate', {
    17|        method: 'POST',
    18|        headers: { 'Content-Type': 'application/json' },
    19|        body: JSON.stringify({ prompt, style }),
    20|      });
    21|      
    22|      if (!res.ok) {
    23|        const error = await res.json();
    24|        throw new Error(error?.error?.message || 'Generation failed');
    25|      }
    26|      const data = await res.json();
    27|      const imageUrl = data.imageBase64 ? `data:image/png;base64,${data.imageBase64}` : data.url;
    28|      setGenerated({ url: imageUrl, prompt });
    29|    } catch (error) {
    30|      alert(`Error: ${error instanceof Error ? error.message : 'Generation failed'}`);
    31|      console.error('Generation error:', error);
    32|    } finally {
    33|      setLoading(false);
    34|    }
    35|  };
    36|
    37|  return (
    38|    <div className="flex gap-6 p-8 h-full bg-background">
    39|      {/* Left: Prompt Panel */}
    40|      <div className="w-80 flex flex-col gap-4 bg-card rounded-lg p-6 border border-border">
    41|        <h2 className="text-xl font-bold text-foreground">Create Collectible</h2>
    42|        
    43|        <div>
    44|          <label className="block text-sm text-muted-foreground mb-2">Describe Your Vision</label>
    45|          <textarea
    46|            value={prompt}
    47|            onChange={(e) => setPrompt(e.target.value)}
    48|            placeholder="A mystical oracle with glowing eyes..."
    49|            className="w-full h-24 bg-background border border-border rounded p-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
    50|          />
    51|        </div>
    52|
    53|        <div>
    54|          <label className="block text-sm text-muted-foreground mb-2">Style</label>
    55|          <select
    56|            value={style}
    57|            onChange={(e) => setStyle(e.target.value)}
    58|            className="w-full bg-background border border-border rounded p-2 text-foreground focus:outline-none focus:border-primary"
    59|          >
    60|            <option value="mystical">Mystical</option>
    61|            <option value="neon">Neon</option>
    62|            <option value="vintage">Vintage</option>
    63|            <option value="abstract">Abstract</option>
    64|          </select>
    65|        </div>
    66|
    67|        <button
    68|          onClick={handleGenerate}
    69|          disabled={loading || !prompt}
    70|          className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90 disabled:opacity-50"
    71|        >
    72|          {loading ? 'Generating...' : 'Generate'}
    73|        </button>
    74|      </div>
    75|
    76|      {/* Center: Preview */}
    77|      <div className="flex-1 flex flex-col gap-4 bg-card rounded-lg p-6 border border-border">
    78|        <h3 className="text-lg font-bold text-foreground">Preview</h3>
    79|        {generated ? (
    80|          <div className="flex-1 flex flex-col gap-4">
    81|            <img
    82|              src={generated.url}
    83|              alt="Generated"
    84|              className="w-full h-64 object-cover rounded bg-background"
    85|            />
    86|            <p className="text-sm text-muted-foreground">{generated.prompt}</p>
    87|            <button
    88|              onClick={() => setPrompt('')}
    89|              className="bg-primary text-primary-foreground py-2 rounded font-semibold hover:opacity-90"
    90|            >
    91|              Create Another
    92|            </button>
    93|          </div>
    94|        ) : (
    95|          <div className="flex-1 flex items-center justify-center text-muted-foreground rounded bg-background">
    96|            Your creation will appear here
    97|          </div>
    98|        )}
    99|      </div>
   100|
   101|      {/* Right: Gallery */}
   102|      <div className="w-80 flex flex-col gap-4 bg-card rounded-lg p-6 border border-border">
   103|        <h3 className="text-lg font-bold text-foreground">My Creations</h3>
   104|        <div className="flex-1 flex flex-col gap-4 overflow-auto">
   105|          {generated && (
   106|            <div className="bg-background rounded p-3 border border-border cursor-pointer hover:border-primary">
   107|              <img
   108|                src={generated.url}
   109|                alt="Creation"
   110|                className="w-full h-20 object-cover rounded mb-2"
   111|              />
   112|              <p className="text-xs text-muted-foreground truncate">{generated.prompt}</p>
   113|              <button className="w-full mt-2 bg-primary text-primary-foreground py-1 text-xs rounded hover:opacity-90">
   114|                Mint NFT
   115|              </button>
   116|            </div>
   117|          )}
   118|        </div>
   119|      </div>
   120|    </div>
   121|  );
   122|}
   123|