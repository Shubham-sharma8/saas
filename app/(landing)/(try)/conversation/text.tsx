"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";

export function HeroHighlights() {
  
  const { isSignedIn } = useAuth();
 
 
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <div className="text-white font-bold py-10 text-center space-y-5">
          <div className="text-4xl sm:text-5xl dark:text-white text-zinc-900 md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            The Best AI Tool with
            <div className="bg-clip-text text-blue-500 dark:text-blue-500">
              <TypewriterComponent
                options={{
                  strings: [
                        "o3-Mini",
                        "o1-Preview",
                        "Claude 3.5 Sonnet",
                        "LLama-3.3",
                        "Mistral Large",
                        "Gemini",
                        "Cohere",
                        "DALL-E 3",
                        "AI Code Translator",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="space-x-10 ">
          <Link href={isSignedIn ? "/conversation" : "/sign-up"}>
          <Button className="w-60 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm ">
            Start Generating For Free
          </Button>
        </Link>
        
        </div>
        

          <div className="text-zinc-400 text-xs md:text-sm font-normal">
          <Link href={"/realtime"}>
          <Button 
          
          className="w-60 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm ">
            Try our Realtime Conversation
          </Button>
        </Link>
          </div>
        </div>
      </motion.h1>
      <div className="flex flex-col justify-center space-y-6"> 
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        at <Cover>warp speed</Cover>
      </h1>
      </div>
      <div>

      
      </div>
    </HeroHighlight>
    
  );
}
