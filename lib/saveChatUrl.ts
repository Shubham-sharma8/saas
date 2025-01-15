import { auth, getAuth } from '@clerk/nextjs/server'
import prisma from './prisma'

export async function saveChatUrl(chatId: string, title: string) {
  const { userId } = await auth()
  if (!userId) {
    console.error('User not authenticated')
    return
  }

  const path = `/advance/search/${chatId}`
  const createdAt = new Date()

  try {
    await prisma.chatUrl.create({
      data: {
        id: chatId,
        userId,
        title,
        path,
        createdAt
      }
    })
    console.log('Chat URL saved successfully')
  } catch (error) {
    console.error('Error saving chat URL:', error)
  }
}

