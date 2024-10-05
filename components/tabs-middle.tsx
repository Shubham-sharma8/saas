"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";
import Link from "next/link";

export function TabsDemo() {
  const tabs = [
    {
      title: "Conversation",
      value: "product",
      content: (
        <Link href={'/conversation'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Conversation</p>
          <DummyContent src="/con.svg"/>
        </div>
        </Link>
      ),

    },
    {
      title: "Image Generation",
      value: "playground",
      content: (
        <Link href={'/image'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Image Generation</p>
          <DummyContent src="/imag.svg" />

        </div>
        </Link>
      ),
    },
    {
      title: "Webai",
      value: "webai",
      content: (
        <Link href={'/webai'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>WebAI</p>
          <DummyContent src="/webgpt_tab.svg" />
        </div>
        </Link>
      ),
    },
    
    {
      title: "Pdf Chat",
      value: "Pdf Chat",
      content: (
        <Link href={'/pdf'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Pdf Chat</p>
          <DummyContent src="/pdf.svg" />
        </div>
        </Link>
      ),
    },
   
    
   
    {
      title: "Vision",
      value: "Money",
      content: (
        <Link href={'/vision'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Vision</p>
          <DummyContent src="/vision.svg" />
        </div>
        </Link>
      ),
    },
    {
      title: "Claude 3.5 Sonnet",
      value: "services",
      content: (
        <Link href={'/claude-3.5'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Claude 3.5 Sonnet</p>
          <DummyContent src="/claude.svg" />
        </div>
        </Link>
      ),
    },
    {
      title: "Audio",
      value: "Audio",
      content: (
        <Link href={'/audio'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Audio</p>
          <DummyContent src="/audio.svg" />
          
        </div>
        </Link>
      ),
    },
    
    // {
    //   title: "AI Code Translator",
    //   value: "content",
    //   content: (
    //     <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //       <p>AI Code Translator </p>
    //       <DummyContent src="/coding.svg" />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Code Generation",
    //   value: "random",
    //   content: (
    //     <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //       <p>Code Generation</p>
    //       <DummyContent src="/code.svg" />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-center justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
  
}

const DummyContent = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
