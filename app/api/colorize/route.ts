import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const imageUrl = body.imageUrl
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    console.log('Sending image URL to API:', imageUrl)

    // Make the request to SwiftAsk AI API
    const response = await fetch('https://graphql.swiftask.ai/api/ai/magiccolor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SWIFTASK_API_KEY}`
      },
      body: JSON.stringify({
        input: "Color",
        files: [
            {url: imageUrl}],
        documentAnalysisMode: "SIMPLE"
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', errorText)
      throw new Error(`SwiftAsk AI API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response:', JSON.stringify(data, null, 2))

    if (data.files && data.files.length > 0) {
      const colorizedUrls = data.files.map((file: any) => file.url)
      return NextResponse.json({ colorizedUrls })
    } else if (data.error) {
      throw new Error(data.error.message || 'Unknown error from API')
    } else {
      throw new Error('Invalid response format from API')
    }

  } catch (error) {
    console.error('[COLORIZE_ERROR]', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to colorize image'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

