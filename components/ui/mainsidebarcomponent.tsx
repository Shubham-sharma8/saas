import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import GradientButton from "./buttongrad";
import { ModeToggle } from "..//mode-toggle";

export function AccordionDemo() {
  return (
    <div style={{ marginTop: "50px" }}>
      <Accordion type="single" collapsible className="w-full left-0">
        <AccordionItem value="item-1">
          <AccordionTrigger>Try without Sign-Up</AccordionTrigger>
          <AccordionContent>
            <Link href="/realtime">
              <GradientButton buttonText="Realtime Voice" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="https://try.cogify.social">
              <GradientButton buttonText="Try.Cogify" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/ocr">
              <GradientButton buttonText="OCR Document" />
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Conversation </AccordionTrigger>
          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="O1-Preview" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Claude 3.5 Sonnet" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Gemini" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/advance">
              <GradientButton buttonText="Advance Search" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Llama 3.3 70B" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Mistral Large" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Perpexility" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/conversation">
              <GradientButton buttonText="Cohere Command R+" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/codetranslate">
              <GradientButton buttonText="AI Code Translator" />
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Image Generation</AccordionTrigger>

          <AccordionContent>
            <Link href="/colorize">
              <GradientButton buttonText="Image Colorization" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/image">
              <GradientButton buttonText="Dall-E-3" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/image">
              <GradientButton buttonText="Imagen 3" />
            </Link>
          </AccordionContent>

          <AccordionContent>
            <Link href="/image">
              <GradientButton buttonText="Flux" />
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <Link href="/price">
              <GradientButton buttonText="Hobby" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/price">
              <GradientButton buttonText="Pro Plan" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/price">
              <GradientButton buttonText="Unlimited" />
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Contact Us</AccordionTrigger>

          <AccordionContent>
            <Link href="/feedback">
              <GradientButton buttonText="Feedback" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Help">
              <GradientButton buttonText="Help" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Refund">
              <GradientButton buttonText="Refund" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/Join-Us">
              <GradientButton buttonText="Join Us" />
            </Link>
          </AccordionContent>
          <AccordionContent>
            <Link href="/about-us">
              <GradientButton buttonText="About Us" />
            </Link>
          </AccordionContent>
        </AccordionItem>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            marginTop: "24px",
            justifyContent: "center",
          }}
        >
          <ModeToggle />
          <span>Change theme</span>
        </div>
      </Accordion>
    </div>
  );
}
