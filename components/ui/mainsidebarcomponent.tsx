import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import Link from 'next/link';
  import  GradientButton  from "./buttongrad";
  import { ModeToggle } from '..//mode-toggle'


  
  export function AccordionDemo() {
    return (
        <div style={{ marginTop: '50px' }}>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>AI Services</AccordionTrigger>
          <AccordionContent>
            <Link href="/conversation" > 
            <GradientButton buttonText="Conversation" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/claude-3.5" > 
            <GradientButton buttonText="Claude 3.5 Sonnet" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/gpt-4o" > 
            <GradientButton buttonText="GPT-4o" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="https://try.cogify.social" > 
            <GradientButton buttonText="AdvacanceGPT" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/conversation" > 
            <GradientButton buttonText="Webai" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/image" > 
            <GradientButton buttonText="Image Generation" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/pdf" > 
            <GradientButton buttonText="PDF Chat" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/conversation" > 
            <GradientButton buttonText="Vision" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/audio" > 
            <GradientButton buttonText="Audio Insight" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/codetranslate" > 
            <GradientButton buttonText="AI Code Translator" />
          </Link>
          </AccordionContent>

          
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <Link href="/price" > 
            <GradientButton buttonText="Hobby" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/price" > 
            <GradientButton buttonText="Pro Plan" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/price" > 
            <GradientButton buttonText="Unlimited" />
          </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Contact Us</AccordionTrigger>

          <AccordionContent>
            <Link href="/feedback" > 
            <GradientButton buttonText="Feedback" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Help" > 
            <GradientButton buttonText="Help" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Refund" > 
            <GradientButton buttonText="Refund" />
          </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Join-Us" > 
            <GradientButton buttonText="Join Us" />
          </Link>

          </AccordionContent>
          <AccordionContent>
            <Link href="/about-us" > 
            <GradientButton buttonText="About Us" />
          </Link>
          </AccordionContent>
        </AccordionItem>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "24px", justifyContent: "center" }}>
  <ModeToggle />
  <span>Change theme</span>
</div>
      </Accordion>
      </div>
    )
  }
  