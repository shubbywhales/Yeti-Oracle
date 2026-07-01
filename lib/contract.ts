     1|import { Transaction } from '@mysten/sui/transactions';
     2|import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
     3|
     4|const networks = {
     5|  testnet: { url: getFullnodeUrl('testnet') },
     6|  mainnet: { url: getFullnodeUrl('mainnet') },
     7|};
     8|
     9|const network = 'testnet' as const;
    10|const suiClient = new SuiClient({ url: networks[network].url });
    11|
    12|/**
    13| * Build a transaction to purchase an NFT from the marketplace
    14| */
    15|export function buildNFTPurchaseTransaction(
    16|  buyerAddress: string,
    17|  nftId: string,
    18|  price: number,
    19|  packageId: string = '0xPACKAGE_ID',
    20|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
    21|) {
    22|  const tx = new Transaction();
    23|
    24|  // Build contract call
    25|  // This is a placeholder structure - will be replaced with actual contract module names
    26|  tx.moveCall({
    27|    target: `${marketPackageId}::marketplace::purchase_nft`,
    28|    arguments: [
    29|      tx.pure.address(nftId),
    30|      tx.pure.u64(Math.floor(price * 1e9)), // Convert to smallest unit
    31|    ],
    32|    typeArguments: [],
    33|  });
    34|
    35|  return tx;
    36|}
    37|
    38|/**
    39| * Build a transaction to mint an NFT collectible
    40| */
    41|export function buildNFTMintTransaction(
    42|  creatorAddress: string,
    43|  name: string,
    44|  description: string,
    45|  imageUrl: string,
    46|  packageId: string = '0xPACKAGE_ID',
    47|  traits: Record<string, string> = {}
    48|) {
    49|  const tx = new Transaction();
    50|
    51|  // Build mint transaction
    52|  tx.moveCall({
    53|    target: `${packageId}::collectible::mint`,
    54|    arguments: [
    55|      tx.pure.string(name),
    56|      tx.pure.string(description),
    57|      tx.pure.string(imageUrl),
    58|    ],
    59|    typeArguments: [],
    60|  });
    61|
    62|  return tx;
    63|}
    64|
    65|/**
    66| * Build a transaction to create a prediction market
    67| */
    68|export function buildCreateMarketTransaction(
    69|  creatorAddress: string,
    70|  question: string,
    71|  description: string,
    72|  resolutionTime: number,
    73|  category: string,
    74|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
    75|) {
    76|  const tx = new Transaction();
    77|
    78|  tx.moveCall({
    79|    target: `${marketPackageId}::market::create_market`,
    80|    arguments: [
    81|      tx.pure.string(question),
    82|      tx.pure.string(description),
    83|      tx.pure.u64(resolutionTime),
    84|      tx.pure.string(category),
    85|    ],
    86|    typeArguments: [],
    87|  });
    88|
    89|  return tx;
    90|}
    91|
    92|/**
    93| * Build a transaction to place a prediction bet
    94| */
    95|export function buildPlaceBetTransaction(
    96|  bettor: string,
    97|  marketId: string,
    98|  outcome: 'yes' | 'no',
    99|  amount: number,
   100|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
   101|) {
   102|  const tx = new Transaction();
   103|
   104|  tx.moveCall({
   105|    target: `${marketPackageId}::market::place_bet`,
   106|    arguments: [
   107|      tx.pure.address(marketId),
   108|      tx.pure.string(outcome === 'yes' ? '1' : '0'),
   109|      tx.pure.u64(Math.floor(amount * 1e9)),
   110|    ],
   111|    typeArguments: [],
   112|  });
   113|
   114|  return tx;
   115|}
   116|
   117|/**
   118| * Get the Sui client for the configured network
   119| */
   120|export function getSuiClient() {
   121|  return suiClient;
   122|}
   123|
   124|/**
   125| * Get the configured network
   126| */
   127|export function getNetwork() {
   128|  return network;
   129|}
   130|