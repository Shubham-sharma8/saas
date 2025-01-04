import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const exampleMessages = [
  
    { heading: "What's new in AI for 2025?", message: "What's new in AI for 2025?" },
    { heading: "How do solar panels work?", message: "How do solar panels work?" },
    { heading: "What is blockchain technology?", message: "What is blockchain technology?" },
    { heading: "Who is the fastest person in the world?", message: "Who is the fastest person in the world?" },
    { heading: "What is the metaverse?", message: "What is the metaverse?" },
    { heading: "Why is climate change a big issue?", message: "Why is climate change a big issue?" },
    { heading: "Can you explain cryptocurrency?", message: "Can you explain cryptocurrency?" },
    { heading: "What is the history of the Eiffel Tower?", message: "What is the history of the Eiffel Tower?" },
    { heading: "How do rockets work?", message: "How do rockets work?" },
    { heading: "What are the best books of all time?", message: "What are the best books of all time?" },
    { heading: "How does 5G technology work?", message: "How does 5G technology work?" },
    { heading: "Why is mental health important?", message: "Why is mental health important?" },
    { heading: "What are the most popular coding languages?", message: "What are the most popular coding languages?" },
    { heading: "What is the future of electric cars?", message: "What is the future of electric cars?" },
    { heading: "Who is the richest person in the world?", message: "Who is the richest person in the world?" },
    { heading: "What are the top universities in the world?", message: "What are the top universities in the world?" },
    { heading: "How does ChatGPT learn?", message: "How does ChatGPT learn?" },
    { heading: "What is quantum entanglement?", message: "What is quantum entanglement?" },
    { heading: "Why do we dream?", message: "Why do we dream?" },
    { heading: "What are the health benefits of meditation?", message: "What are the health benefits of meditation?" },
    { heading: "Who wrote 'To Kill a Mockingbird'?", message: "Who wrote 'To Kill a Mockingbird'?" },
    { heading: "What is dark matter?", message: "What is dark matter?" },
    { heading: "How do vaccines work?", message: "How do vaccines work?" },
    { heading: "What are the top programming frameworks in 2025?", message: "What are the top programming frameworks in 2025?" },
    { heading: "What is the history of the Olympics?", message: "What is the history of the Olympics?" },
    { heading: "How can I reduce my carbon footprint?", message: "How can I reduce my carbon footprint?" },
    { heading: "What are the most iconic movies ever made?", message: "What are the most iconic movies ever made?" },
    { heading: "What makes Tesla unique?", message: "What makes Tesla unique?" },
    { heading: "How do airplanes fly?", message: "How do airplanes fly?" },
    { heading: "What is the significance of the Mona Lisa?", message: "What is the significance of the Mona Lisa?" },
    { heading: "What is the difference between AI and machine learning?", message: "What is the difference between AI and machine learning?" },
    { heading: "Why is space exploration important?", message: "Why is space exploration important?" },
    { heading: "What are NFTs, and how do they work?", message: "What are NFTs, and how do they work?" },
    { heading: "Who is Albert Einstein?", message: "Who is Albert Einstein?" },
    { heading: "What is the Great Wall of China?", message: "What is the Great Wall of China?" },
    { heading: "How do I invest in stocks?", message: "How do I invest in stocks?" },
    { heading: "What are the best travel destinations?", message: "What are the best travel destinations?" },
    { heading: "Why is biodiversity important?", message: "Why is biodiversity important?" },
    { heading: "What are the latest trends in gaming?", message: "What are the latest trends in gaming?" },
    { heading: "What is the theory of relativity?", message: "What is the theory of relativity?" },
    { heading: "What are the benefits of a plant-based diet?", message: "What are the benefits of a plant-based diet?" },
    { heading: "How does a computer process information?", message: "How does a computer process information?" },
    { heading: "What is the origin of Halloween?", message: "What is the origin of Halloween?" },
    { heading: "What are the effects of global warming?", message: "What are the effects of global warming?" },
    { heading: "What is the role of the United Nations?", message: "What is the role of the United Nations?" },
    { heading: "How do magnets work?", message: "How do magnets work?" },
    { heading: "What are the uses of ChatGPT in education?", message: "What are the uses of ChatGPT in education?" },
    { heading: "What is the significance of Leonardo da Vinci?", message: "What is the significance of Leonardo da Vinci?" },
    { heading: "How does the internet work?", message: "How does the internet work?" },
    { heading: "What is the history of jazz music?", message: "What is the history of jazz music?" },
    { heading: "What is virtual reality?", message: "What is virtual reality?" },
    { heading: "Why is water essential for life?", message: "Why is water essential for life?" },
    { heading: "Who was Mahatma Gandhi?", message: "Who was Mahatma Gandhi?" },
    { heading: "What is the importance of cybersecurity?", message: "What is the importance of cybersecurity?" },
    { heading: "How do plants convert sunlight into energy?", message: "How do plants convert sunlight into energy?" },
    { heading: "What are the top tourist spots in Japan?", message: "What are the top tourist spots in Japan?" },
    { heading: "How does music affect our brain?", message: "How does music affect our brain?" },
    { heading: "What are the basics of coding?", message: "What are the basics of coding?" },
    { heading: "What is augmented reality?", message: "What is augmented reality?" },
    { heading: "How does gravity work?", message: "How does gravity work?" },
    { heading: "What are the top sports in the world?", message: "What are the top sports in the world?" },
    { heading: "What are the health benefits of running?", message: "What are the health benefits of running?" },
    { heading: "How do satellites stay in orbit?", message: "How do satellites stay in orbit?" },
    { heading: "What is the Big Bang Theory?", message: "What is the Big Bang Theory?" },
    { heading: "How can I start a successful blog?", message: "How can I start a successful blog?" },
    { heading: "What are the best ways to save money?", message: "What are the best ways to save money?" },
    { heading: "What are the benefits of renewable energy?", message: "What are the benefits of renewable energy?" },
    { heading: "What is the history of smartphones?", message: "What is the history of smartphones?" },
    { heading: "What are the signs of a healthy relationship?", message: "What are the signs of a healthy relationship?" },
    { heading: "What are the mysteries of the universe?", message: "What are the mysteries of the universe?" },
    { heading: "How does human memory work?", message: "How does human memory work?" },
    { heading: "What is the significance of the pyramids?", message: "What is the significance of the pyramids?" },
    { heading: "What are the top careers in 2025?", message: "What are the top careers in 2025?" },
    { heading: "What is the history of artificial intelligence?", message: "What is the history of artificial intelligence?" },
    { heading: "What is the role of genetics in health?", message: "What is the role of genetics in health?" },
    { heading: "How do humans influence ecosystems?", message: "How do humans influence ecosystems?" },
    { heading: "What are the latest health and wellness trends?", message: "What are the latest health and wellness trends?" },
    { heading: "What is the history of space travel?", message: "What is the history of space travel?" },
    { heading: "What is the significance of art in society?", message: "What is the significance of art in society?" },
    { heading: "How can I improve my public speaking skills?", message: "How can I improve my public speaking skills?" },
    { heading: "What are the best ways to learn online?", message: "What are the best ways to learn online?" },
    { heading: "What are the benefits of lifelong learning?", message: "What are the benefits of lifelong learning?" },
    { heading: "What is the future of work with AI?", message: "What is the future of work with AI?" },
    { heading: "How do animals communicate?", message: "How do animals communicate?" },
    { heading: "What is the role of music in culture?", message: "What is the role of music in culture?" },
    { heading: "How do ecosystems maintain balance?", message: "How do ecosystems maintain balance?" }
  
  
];

// Utility function to get 5 random messages
function getRandomMessages(messages: { heading: string; message: string; }[], count = 5) {
  const shuffled = [...messages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const randomMessages = getRandomMessages(exampleMessages);

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {randomMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base dark:text-white"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
