     1|import { NextRequest, NextResponse } from 'next/server';
     2|import { getCloudflareContext } from '@opennextjs/cloudflare';
     3|
     4|interface PurchaseRequest {
     5|  assetId: string;
     6|  nftId: string;
     7|  buyerWallet: string;
     8|  price: number;
     9|}
    10|
    11|export async function POST(request: NextRequest) {
    12|  try {
    13|    const { env } = await getCloudflareContext();
    14|    const body = (await request.json()) as PurchaseRequest;
    15|
    16|    const { assetId, nftId, buyerWallet, price } = body;
    17|
    18|    if (!assetId || !nftId || !buyerWallet || price === undefined) {
    19|      return NextResponse.json(
    20|        { error: 'Missing required fields' },
    21|        { status: 400 }
    22|      );
    23|    }
    24|
    25|    // Contract interaction payload
    26|    // This structure is ready for real contract calls
    27|    const purchasePayload = {
    28|      packageId: env.NEXT_PUBLIC_PACKAGE_ID || '0xPACKAGE_ID',
    29|      marketPackageId: env.NEXT_PUBLIC_MARKET_PACKAGE_ID || '0xMARKET_PACKAGE_ID',
    30|      nftId,
    31|      buyer: buyerWallet,
    32|      price: price * 1e9, // Convert to smallest unit (assuming 9 decimals like MIST)
    33|      timestamp: Date.now(),
    34|    };
    35|
    36|    // Log purchase for demo purposes
    37|    console.log('NFT Purchase initiated:', purchasePayload);
    38|
    39|    // Return transaction-ready payload
    40|    return NextResponse.json({
    41|      ok: true,
    42|      purchasePayload,
    43|      message: 'Purchase ready for contract execution',
    44|      estimatedGas: '5000000', // Placeholder
    45|      totalCost: price,
    46|    });
    47|  } catch (error) {
    48|    console.error('Purchase error:', error);
    49|    return NextResponse.json(
    50|      { error: 'Purchase failed' },
    51|      { status: 500 }
    52|    );
    53|  }
    54|}
    55|