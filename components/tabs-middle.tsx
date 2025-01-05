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
          <DummyContent src="/15.png"/>
        </div>
        </Link>
      ),

    },
    {
      title: "Realtime Voice",
      value: "Realtime Voice",
      content: (
        <Link href={'/realtime'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Realtime</p>
          <DummyContent src="/17.png" />
        </div>
        </Link>
      ),
    },
    {
      title: "Advance Search",
      value: "Advance Search",
      content: (
        <Link href={'/advance'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Advance Search</p>
          <DummyContent src="/16.png" />
        </div>
        </Link>
      ),
    },
  
    
   
   
    {
      title: "Image Colorization",
      value: "Image Colorization",
      content: (
        <Link href={'/colorize'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Image Colorization</p>
          <DummyContent src="/19.png" />
        </div>
        </Link>
      ),
    },
   
    {
      title: "OCR Document",
      value: "OCR Document",
      content: (
        <Link href={'/ocr'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>OCR Document</p>
          <DummyContent src="/18.png" />
        </div>
        </Link>
      ),
    },
    
    // {
    //   title: "Gpt-4o",
    //   value: "GPT-4o",
    //   content: (
    //     <Link href={'/chatgpt'}> 
    //     <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
    //       <p>Gpt-4o</p>
    //       <DummyContent src="/Gpt.svg" />
    //     </div>
    //     </Link>
    //   ),
    // },
    {
      title: "AI Code Translator",
      value: "content",
      content: (
        <Link href={'/codetranslate'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>AI Code Translator </p>
          <DummyContent src="/20.png" />
        </div>
        </Link>
      ),
    },
    {
      title: "Settings",
      value: "settings",
      content: (
        <Link href={'/settings'}> 
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Settings</p>
          <DummyContent src="/14.png" />
          
        </div>
        </Link>
      ),
    },
    
   
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
