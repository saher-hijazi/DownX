import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// API endpoint for getting video info
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { url } = body;

    // Validate URL
    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: 'URL is required',
          errorCode: 'MISSING_URL'
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid URL format',
          errorCode: 'INVALID_URL'
        },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const response = await axios.post('http://localhost:3001/api/download/info', { url }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    // Return the response from the backend API
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error in /api/download/info route:', error);

    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json(
        {
          success: false,
          error: error.response.data?.error || 'Error from backend API',
          errorCode: error.response.data?.errorCode || 'API_ERROR',
          details: error.response.data
        },
        { status: error.response.status || 500 }
      );
    } else if (error.request) {
      // The request was made but no response was received
      return NextResponse.json(
        {
          success: false,
          error: 'No response from backend API. The server might be down.',
          errorCode: 'API_TIMEOUT'
        },
        { status: 503 }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Unknown error occurred',
          errorCode: 'UNKNOWN_ERROR'
        },
        { status: 500 }
      );
    }
  }
}
