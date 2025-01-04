import { auth } from '@clerk/nextjs'
import prisma from './prisma'

export async function saveChatUrl(chatId: string, title: string) {
  const { userId } = auth()
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

