import { Chat } from '@/components/chat'
import { nanoid } from 'ai'
import { AI } from '../../../actions'
import { Heading } from "@/components/heading";
import { MessageCircle } from 'lucide-react';


export const maxDuration = 60

export default function Page() {
  const id = nanoid()
  return (
    <div>
      <Heading
        title="Advance AI Chatbot"
        description="The most advanced AI chatbot with URL sharing and more."
        icon={MessageCircle}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      
      

    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
    </div>
    
  )
}
