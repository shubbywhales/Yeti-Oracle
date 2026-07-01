     1|'use client';
     2|import { useState } from 'react';
     3|
     4|export function TopBar() {
     5|  const [walletConnected, setWalletConnected] = useState(false);
     6|  const [walletAddress, setWalletAddress] = useState('');
     7|
     8|  const handleConnectWallet = () => {
     9|    const mockAddress = '0x' + Math.random().toString(16).slice(2, 18);
    10|    setWalletAddress(mockAddress);
    11|    setWalletConnected(true);
    12|  };
    13|
    14|  return (
    15|    <div className="flex h-16 items-center justify-between border-b border-white/5 bg-background px-6 backdrop-blur-sm">
    16|      <div className="flex items-center gap-4">
    17|        <h2 className="text-lg font-semibold text-foreground">Yeti Oracle</h2>
    18|      </div>
    19|      
    20|      <div className="flex items-center gap-4">
    21|        {walletConnected ? (
    22|          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-green-500/30">
    23|            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    24|            <span className="text-sm text-green-400">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
    25|          </div>
    26|        ) : (
    27|          <button
    28|            onClick={handleConnectWallet}
    29|            className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition"
    30|          >
    31|            Connect Wallet
    32|          </button>
    33|        )}
    34|      </div>
    35|    </div>
    36|  );
    37|}
    38|