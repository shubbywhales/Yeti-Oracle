     1|import { getCloudflareContext } from '@opennextjs/cloudflare';
     2|import { NextRequest, NextResponse } from 'next/server';
     3|
     4|export async function POST(request: NextRequest) {
     5|  try {
     6|    const { env } = await getCloudflareContext();
     7|    const body = (await request.json()) as {
     8|      userId: string;
     9|      actionType: string;
    10|      xpEarned?: number;
    11|      description?: string;
    12|    };
    13|    const { userId, actionType, xpEarned = 0, description } = body;
    14|
    15|    if (!userId || !actionType) {
    16|      return NextResponse.json(
    17|        { error: 'userId and actionType required' },
    18|        { status: 400 }
    19|      );
    20|    }
    21|
    22|    // Get current user
    23|    const user = (await env.DB.prepare(
    24|      'SELECT * FROM users WHERE id = ?'
    25|    ).bind(userId).first()) as { id: string; xp: number; total_xp: number; level: number } | undefined;
    26|
    27|    if (!user) {
    28|      return NextResponse.json(
    29|        { error: 'User not found' },
    30|        { status: 404 }
    31|      );
    32|    }
    33|
    34|    // Log activity
    35|    const activityId = `activity_${Date.now()}`;
    36|    await env.DB.prepare(
    37|      'INSERT INTO activity_log (id, user_id, action_type, xp_earned, description) VALUES (?, ?, ?, ?, ?)'
    38|    ).bind(activityId, userId, actionType, xpEarned, description).run();
    39|
    40|    // Update user XP
    41|    const newXp = user.xp + xpEarned;
    42|    const newTotalXp = user.total_xp + xpEarned;
    43|    const newLevel = Math.floor(newTotalXp / 100) + 1;
    44|
    45|    await env.DB.prepare(
    46|      'UPDATE users SET xp = ?, total_xp = ?, level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    47|    ).bind(newXp, newTotalXp, newLevel, userId).run();
    48|
    49|    // Check for milestone completions
    50|    const milestonesResult = await env.DB.prepare(
    51|      'SELECT * FROM milestones WHERE xp_threshold <= ?'
    52|    ).bind(newTotalXp).all();
    53|
    54|    const newBadges: any[] = [];
    55|    for (const milestone of milestonesResult.results || []) {
    56|      const m = milestone as { id: string; badge_id?: string };
    57|      // Check if user already has this milestone
    58|      const existing = await env.DB.prepare(
    59|        'SELECT * FROM user_milestones WHERE user_id = ? AND milestone_id = ?'
    60|      ).bind(userId, m.id).first();
    61|
    62|      if (!existing) {
    63|        // Add milestone
    64|        const umId = `um_${Date.now()}_${Math.random()}`;
    65|        await env.DB.prepare(
    66|          'INSERT INTO user_milestones (id, user_id, milestone_id) VALUES (?, ?, ?)'
    67|        ).bind(umId, userId, m.id).run();
    68|
    69|        // Add badge if milestone has one
    70|        if (m.badge_id) {
    71|          const existing_badge = await env.DB.prepare(
    72|            'SELECT * FROM user_badges WHERE user_id = ? AND badge_id = ?'
    73|          ).bind(userId, m.badge_id).first();
    74|
    75|          if (!existing_badge) {
    76|            const ubId = `ub_${Date.now()}_${Math.random()}`;
    77|            await env.DB.prepare(
    78|              'INSERT INTO user_badges (id, user_id, badge_id) VALUES (?, ?, ?)'
    79|            ).bind(ubId, userId, m.badge_id).run();
    80|
    81|            const badge = await env.DB.prepare(
    82|              'SELECT * FROM badges WHERE id = ?'
    83|            ).bind(m.badge_id).first();
    84|            newBadges.push(badge);
    85|          }
    86|        }
    87|      }
    88|    }
    89|
    90|    return NextResponse.json({
    91|      success: true,
    92|      activity: {
    93|        id: activityId,
    94|        actionType,
    95|        xpEarned,
    96|      },
    97|      user: {
    98|        level: newLevel,
    99|        xp: newXp,
   100|        total_xp: newTotalXp,
   101|      },
   102|      newBadges,
   103|    });
   104|  } catch (error) {
   105|    console.error('Error logging activity:', error);
   106|    return NextResponse.json(
   107|      { error: 'Failed to log activity' },
   108|      { status: 500 }
   109|    );
   110|  }
   111|}
   112|
   113|export async function GET(request: NextRequest) {
   114|  try {
   115|    const { env } = await getCloudflareContext();
   116|    const userId = request.nextUrl.searchParams.get('userId');
   117|
   118|    if (!userId) {
   119|      return NextResponse.json(
   120|        { error: 'userId required' },
   121|        { status: 400 }
   122|      );
   123|    }
   124|
   125|    const activities = await env.DB.prepare(
   126|      'SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 20'
   127|    ).bind(userId).all();
   128|
   129|    return NextResponse.json({
   130|      activities: activities.results || [],
   131|    });
   132|  } catch (error) {
   133|    console.error('Error fetching activities:', error);
   134|    return NextResponse.json(
   135|      { error: 'Failed to fetch activities' },
   136|      { status: 500 }
   137|    );
   138|  }
   139|}
   140|