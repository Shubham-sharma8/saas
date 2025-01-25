
import { Chat } from "@/components/chat"
import { generateId } from 'ai'

export default function Page() {
  const id = generateId()
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 container py-16">
        <div className="max-w-[980px] mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Advance Search {" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Cogify</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Search anything realted to any topic, and get the best results.
          </p>
          
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl" />
          </div>
          <Chat id={id} />
        </div>
      </main>
    </div>
  )
}

