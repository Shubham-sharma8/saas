import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { auth } from "@clerk/nextjs";

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId } = auth();
    
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        
    const requestBody = {
      input: body.prompt,
    }

    const response = await fetch('https://graphql.swiftask.ai/api/ai/fluxpro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SWIFTASK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`SwiftAsk AI API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.files && Array.isArray(data.files) && data.files.length > 0) {
      const imageData = data.files.map((file: any) => ({
        url: file.url,
        name: file.name,
        type: file.type
      }))
      return NextResponse.json(imageData)
    } else {
      throw new Error('No image files found in the response')
    }

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    )
  }
}
