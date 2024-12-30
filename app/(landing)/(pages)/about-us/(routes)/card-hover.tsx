import { HoverEffect } from "@/components/pages/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-8xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Conversation",
    description:
    "At our core, we believe in making cutting-edge generative AI accessible to everyone, without barriers. With Gemini 2.0 Flash at the heart of our platform, we offer a truly free experience—no subscriptions, no hidden fees, no limits on usage. Plus, we prioritize a user-friendly environment, free from disruptive ads. We’re here to empower your creativity without distractions, giving you the freedom to explore AI's full potential effortlessly.",
        link: "/conversation",
  },
  {
    title: "Claude 3.5 Sonnet",
    description:
      "Our platform also features conversations powered by Claude 3.5 Sonnet, offering an intelligent and engaging AI experience. Whether you're seeking thoughtful discussions or in-depth answers, Claude 3.5 delivers high-quality interactions. Enjoy this distinct feature with no sign-ups, no limits, and absolutely no ads—just pure, seamless AI-driven conversation.",
    link: "/claude3.5",
  },
  {
    title: "Try Cogify Social",
    description:
      "Want to try without sign up? Our platform also offers GPT-4.0 with full internet access and intelligent image suggestions—ideal for generating articles and staying informed with the latest information. This feature is designed to enhance content creation, helping users write with accuracy and creativity. Best of all, you can try it without signing up, completely free, and without any limits.",
    link: "https://try.cogify.social",
  },

  {
    title: "GPT-4.0",
    description:
      "Our platform also offers powerful conversations with GPT-4.0, bringing you insightful, intelligent dialogues in real time. Whether you need assistance, brainstorming, or engaging interactions, GPT-4.0 delivers responsive, dynamic conversations. And as always, you can enjoy this feature with no sign-up, no ads, and no limits—just pure AI-driven conversation",
    link: "/chatgpt",
  },
  {
    title: "WebAi",
    description:
      "Experience the next level of conversational AI with WebAI, powered by Gemini 2.0 Flash(exp) and Google integration. Our platform offers real-time, accurate responses by seamlessly accessing up-to-date information from the web. Whether you're looking for instant insights, answers to complex questions, or engaging in natural conversation, we deliver it all—completely free, without limits.",
    link: "/conversation",
  },
  {
    title: "Image Generation",
    description:
      "DALL-E 3, enabling high-definition image generation from your prompts. Whether you need stunning visuals for articles, creative projects, or just for fun, DALL-E 3 brings your ideas to life with exceptional quality and detail. Experience the power of AI-driven creativity at your fingertips.",
    link: "/image",
  },
  {
    title: "PDF And Gemini",
    description:
      " Our chat with PDF feature, allowing you to interact with PDF documents effortlessly. Simply upload your PDF, and Gemini will answer any questions based on its content. This powerful tool provides quick access to information, making it easier than ever to extract insights and engage with your documents",
    link: "/conversation",
  },

  {
    title: "Vision- Image and Gemini",
    description:
      "Our platform includes a vision feature where you can upload any image, and Gemini will provide detailed answers to your questions about it. Whether it's identifying objects, offering context, or explaining details, this AI-powered tool delivers accurate and insightful responses, all at your fingertips",
    link: "/conversation",
  },
  {
    title: "Audio",
    description:
      "Our platform goes beyond just generative AI—we enable you to upload audio files and unlock their full potential. Whether you need to convert speech to text or extract specific data, our AI-powered tools provide accurate results quickly. No limits, no interruptions—just seamless access to all the insights your audio holds",
    link: "/conversation",
  },

  
  
  
  


 
 
  {
    title: "More?",
    description: "More stunning features comming soon.",
    link: "/coming-soon",
  },
];
