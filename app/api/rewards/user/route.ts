     1|import { getCloudflareContext } from '@opennextjs/cloudflare';
     2|import { NextRequest, NextResponse } from 'next/server';
     3|
     4|export async function GET(request: NextRequest) {
     5|  try {
     6|    const { env } = await getCloudflareContext();
     7|    const walletAddress = request.nextUrl.searchParams.get('wallet');
     8|
     9|    if (!walletAddress) {
    10|      return NextResponse.json(
    11|        { error: 'Wallet address required' },
    12|        { status: 400 }
    13|      );
    14|    }
    15|
    16|    // Get or create user
    17|    const user = await env.DB.prepare(
    18|      'SELECT * FROM users WHERE wallet_address = ?'
    19|    ).bind(walletAddress).first();
    20|
    21|    if (!user) {
    22|      // Create new user
    23|      const userId = `user_${Date.now()}`;
    24|      await env.DB.prepare(
    25|        'INSERT INTO users (id, wallet_address, level, xp, total_xp) VALUES (?, ?, 1, 0, 0)'
    26|      ).bind(userId, walletAddress).run();
    27|
    28|      return NextResponse.json({
    29|        id: userId,
    30|        wallet_address: walletAddress,
    31|        level: 1,
    32|        xp: 0,
    33|        total_xp: 0,
    34|        badges: [],
    35|        milestones: [],
    36|      });
    37|    }
    38|
    39|    // Get user badges
    40|    const badgesResult = await env.DB.prepare(`
    41|      SELECT b.* FROM badges b
    42|      JOIN user_badges ub ON b.id = ub.badge_id
    43|      WHERE ub.user_id = ?
    44|    `).bind(user.id).all();
    45|
    46|    // Get completed milestones
    47|    const milestonesResult = await env.DB.prepare(`
    48|      SELECT m.* FROM milestones m
    49|      JOIN user_milestones um ON m.id = um.milestone_id
    50|      WHERE um.user_id = ?
    51|    `).bind(user.id).all();
    52|
    53|    return NextResponse.json({
    54|      id: user.id,
    55|      wallet_address: user.wallet_address,
    56|      level: user.level,
    57|      xp: user.xp,
    58|      total_xp: user.total_xp,
    59|      badges: badgesResult.results || [],
    60|      milestones: milestonesResult.results || [],
    61|    });
    62|  } catch (error) {
    63|    console.error('Error fetching user:', error);
    64|    return NextResponse.json(
    65|      { error: 'Failed to fetch user data' },
    66|      { status: 500 }
    67|    );
    68|  }
    69|}
    70|