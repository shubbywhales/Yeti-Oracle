     1|import { getCloudflareContext } from '@opennextjs/cloudflare';
     2|
     3|export async function POST(request: Request) {
     4|  try {
     5|    const { prompt } = await request.json() as { prompt: string };
     6|
     7|    if (!prompt || typeof prompt !== 'string') {
     8|      return Response.json(
     9|        { ok: false, error: { code: 'INVALID_PROMPT', message: 'Prompt is required' } },
    10|        { status: 400 }
    11|      );
    12|    }
    13|
    14|    const { env } = await getCloudflareContext();
    15|    const geminiKey = env.GEMINI_API_KEY;
    16|
    17|    if (!geminiKey) {
    18|      return Response.json(
    19|        { ok: false, error: { code: 'NO_API_KEY', message: 'Gemini API key not configured' } },
    20|        { status: 500 }
    21|      );
    22|    }
    23|
    24|    // Call Gemini API for image generation
    25|    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateImage', {
    26|      method: 'POST',
    27|      headers: {
    28|        'Content-Type': 'application/json',
    29|        'x-goog-api-key': geminiKey,
    30|      },
    31|      body: JSON.stringify({
    32|        prompt: `Generate a unique collectible Yeti Oracle character from this description: ${prompt}. Style: lofi, mystical, oracle-themed. Use soft colors and mystical aura.`,
    33|      }),
    34|    });
    35|
    36|    if (!response.ok) {
    37|      const error = await response.text();
    38|      console.error('Gemini API error:', error);
    39|      return Response.json(
    40|        { ok: false, error: { code: 'GENERATION_FAILED', message: 'Failed to generate image' } },
    41|        { status: 500 }
    42|      );
    43|    }
    44|
    45|    const data = await response.json() as { images?: Array<{ image: string }> };
    46|    const imageBase64 = data.images?.[0]?.image;
    47|
    48|    if (!imageBase64) {
    49|      return Response.json(
    50|        { ok: false, error: { code: 'NO_IMAGE', message: 'No image returned from Gemini' } },
    51|        { status: 500 }
    52|      );
    53|    }
    54|
    55|    return Response.json({
    56|      ok: true,
    57|      imageBase64,
    58|      prompt,
    59|    });
    60|  } catch (error) {
    61|    console.error('Studio generate error:', error);
    62|    return Response.json(
    63|      { ok: false, error: { code: 'SERVER_ERROR', message: 'Internal server error' } },
    64|      { status: 500 }
    65|    );
    66|  }
    67|}
    68|