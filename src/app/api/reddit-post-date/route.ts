import { NextRequest, NextResponse } from 'next/server';

// Reddit API response type
interface RedditApiResponse {
  data?: {
    children?: Array<{
      data?: {
        created_utc?: number;
      };
    }>;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  // Extract subreddit and post ID from URL
  const urlPattern = /reddit\.com\/r\/([^/]+)\/comments\/([a-z0-9]+)/i;
  const match = url.match(urlPattern);

  if (!match) {
    return NextResponse.json(
      { error: 'Invalid Reddit URL format' },
      { status: 400 }
    );
  }

  const subreddit = match[1];
  const postId = match[2];

  try {
    // Fetch post data from Reddit's JSON API
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}/.json`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch post data from Reddit. The post may not exist or may be private.' },
        { status: response.status }
      );
    }

    const data = await response.json() as RedditApiResponse[];
    const postData = data[0]?.data?.children?.[0]?.data;

    if (!postData || !postData.created_utc) {
      return NextResponse.json(
        { error: 'Could not extract post date from Reddit response' },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(postData.created_utc * 1000);

    // Validate timestamp
    const minTimestamp = new Date('2005-06-01').getTime(); // Reddit founded June 2005
    const maxTimestamp = Date.now() + 86400000; // Allow 1 day in future for clock skew

    if (timestamp < minTimestamp || timestamp > maxTimestamp) {
      return NextResponse.json(
        { error: 'Invalid post timestamp. Please verify the Reddit URL.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      timestamp,
      postId
    });
  } catch (error) {
    console.error('Error fetching Reddit post:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching post data' },
      { status: 500 }
    );
  }
}
