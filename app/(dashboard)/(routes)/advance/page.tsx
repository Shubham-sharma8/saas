import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from '@/app/actions'
import { ShareActions } from '@/components/share-actions'

export const maxDuration = 60

export default function Page() {
  const id = generateId()
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <ShareActions />
      </div>
      <AI initialAIState={{ chatId: id, messages: [] }}>
        <Chat id={id} />
      </AI>
    </div>
  )
}
