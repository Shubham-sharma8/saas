"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";

export function NavbarDemo() {
  return (
    <div>
      <Navbar />
    </div>
  );
}


function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div
      >
  
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="AI Services">
            <div className="  text-sm grid grid-cols-2 gap-10 p-2">
              <ProductItem
                title="Chat with the AIs"
                href="/conversation"
                src="/conversation.jpg"
                
                description= "Unlimited Chat with O1-Preview, Claude 3.5, Gemini, Mistral, Perplexity, Llama 3,3 70B, Cohere and More ."
              />
               <ProductItem
                title="Realtime Voice"
                href="/realtime"
                src="/realtime.jpg"
                description="Realtime Voice Conversation with GPT-4o Realtime Voice. No Sign Up Required just Click and Talk."
              />
              <ProductItem
                title="Advance Search"
                href="/advance"
                src="/advance.jpg"
                description= "Web Search Search with GPT-4, Claude 3.5, Gemini, Mistral. WEB Scrapping and more advance features."
              />
              <ProductItem
                title="Image Generation"
                href="/image"
                src="/image.jpg"
                description="Unlimited Image Generation with Dall E 3, Imagen 3, Flux and More. Highest Quality Images and More."
              />
              
              <ProductItem
                title="OCR Document"
                href="/ocr"
                src="/ocr.jpg"
                description="Scan any Document and get it in any format. No signup, Get Mathtype and Latex Support."
              />
             
              <ProductItem
                title="Code Translation"
                href="/codetranslate"
                src="/code.jpg"
                description="Translate any Code into 30 languages with AI. Translate into Assembly Language as well."
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Price">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/price">Hobby</HoveredLink>
              <HoveredLink href="/price">Pro Plan</HoveredLink>
              <HoveredLink href="/price">Unlimited</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Contact Us">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/feedback">Feedback</HoveredLink>
              <HoveredLink href="/help">Help</HoveredLink>
              <HoveredLink href="/refund">Refund</HoveredLink>
              <HoveredLink href="/join-us">Join Us</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/about-us">About Us</HoveredLink>
              <HoveredLink href="https://wallpalette.studio">Blog/Articles</HoveredLink>
              <HoveredLink href="/faqs">FAQs</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    );
  }
  