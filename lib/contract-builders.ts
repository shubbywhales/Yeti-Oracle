     1|// Contract transaction builders for Sui marketplace
     2|// These provide transaction payload structures ready for the Sui SDK
     3|// All function signatures and payloads are compatible with @mysten/sui/transactions
     4|
     5|/**
     6| * Build a transaction payload to purchase an NFT from the marketplace
     7| */
     8|export function buildNFTPurchasePayload(
     9|  buyerAddress: string,
    10|  nftId: string,
    11|  price: number,
    12|  packageId: string = '0xPACKAGE_ID',
    13|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
    14|) {
    15|  return {
    16|    target: `${marketPackageId}::marketplace::purchase_nft`,
    17|    arguments: [nftId, String(Math.floor(price * 1e9))],
    18|    typeArguments: [],
    19|    buyerAddress,
    20|  };
    21|}
    22|
    23|/**
    24| * Build a transaction payload to mint an NFT collectible
    25| */
    26|export function buildNFTMintPayload(
    27|  creatorAddress: string,
    28|  name: string,
    29|  description: string,
    30|  imageUrl: string,
    31|  packageId: string = '0xPACKAGE_ID'
    32|) {
    33|  return {
    34|    target: `${packageId}::collectible::mint`,
    35|    arguments: [name, description, imageUrl],
    36|    typeArguments: [],
    37|    creatorAddress,
    38|  };
    39|}
    40|
    41|/**
    42| * Build a transaction payload to create a prediction market
    43| */
    44|export function buildCreateMarketPayload(
    45|  creatorAddress: string,
    46|  question: string,
    47|  description: string,
    48|  resolutionTime: number,
    49|  category: string,
    50|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
    51|) {
    52|  return {
    53|    target: `${marketPackageId}::market::create_market`,
    54|    arguments: [question, description, String(resolutionTime), category],
    55|    typeArguments: [],
    56|    creatorAddress,
    57|  };
    58|}
    59|
    60|/**
    61| * Build a transaction payload to place a prediction bet
    62| */
    63|export function buildPlaceBetPayload(
    64|  bettor: string,
    65|  marketId: string,
    66|  outcome: 'yes' | 'no',
    67|  amount: number,
    68|  marketPackageId: string = '0xMARKET_PACKAGE_ID'
    69|) {
    70|  return {
    71|    target: `${marketPackageId}::market::place_bet`,
    72|    arguments: [marketId, outcome === 'yes' ? '1' : '0', String(Math.floor(amount * 1e9))],
    73|    typeArguments: [],
    74|    bettor,
    75|  };
    76|}
    77|