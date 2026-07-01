     1|'use client';
     2|import { useState } from 'react';
     3|import { buildNFTPurchasePayload } from '@/lib/contract-builders';
     4|
     5|interface PurchaseNFTRequest {
     6|  nftId: string;
     7|  price: number;
     8|  walletAddress: string;
     9|}
    10|
    11|export function usePurchaseNFT() {
    12|  const [isLoading, setIsLoading] = useState(false);
    13|  const [error, setError] = useState<string | null>(null);
    14|
    15|  const purchase = async ({ nftId, price, walletAddress }: PurchaseNFTRequest) => {
    16|    try {
    17|      setIsLoading(true);
    18|      setError(null);
    19|
    20|      const payload = buildNFTPurchasePayload(walletAddress, nftId, price);
    21|
    22|      const response = await fetch('/api/studio/purchase', {
    23|        method: 'POST',
    24|        headers: { 'Content-Type': 'application/json' },
    25|        body: JSON.stringify({
    26|          assetId: nftId,
    27|          nftId,
    28|          buyerWallet: walletAddress,
    29|          price,
    30|        }),
    31|      });
    32|
    33|      if (!response.ok) {
    34|        throw new Error(`Purchase failed: ${response.statusText}`);
    35|      }
    36|
    37|      const result = await response.json();
    38|      return result;
    39|    } catch (err) {
    40|      const message = err instanceof Error ? err.message : 'Unknown error';
    41|      setError(message);
    42|      throw err;
    43|    } finally {
    44|      setIsLoading(false);
    45|    }
    46|  };
    47|
    48|  return {
    49|    purchase,
    50|    isLoading,
    51|    error,
    52|  };
    53|}
    54|