import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(chats)
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
