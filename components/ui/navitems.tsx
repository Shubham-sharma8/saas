"use client"

import * as React from "react"
import Link from "next/link"


import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Open AI",
    href: "/conversation",
    description:
      "Every model with OpenAI, including O1-Preview, O1-Mini, GPT-4o, GPT-4 Turbo and more.",
  },
  {
    title: "Anthropic",
    href: "/conversation",
    description:
      "Every model with Anthropic, including Claude 3.5 Sonnet, Haiku, Opus, and more.",
  },
  {
    title: "Gemini",
    href: "/conversation",
    description:
      "Every model with Gemini, including Gemini 2 Flash, Gemini 2 Pro, and more.",
  },
  {
    title: "Llama 3.3 70B",
    href: "/conversation",
    description: "Unlimited Chat conversaiton with Meta's Latest Llama 3.3.",
  },
  {
    title: "Mistral",
    href: "/conversation",
    description:
      "Unlimited Chat conversaiton with Mistral Large-2411.",
  },
  {
    title: "More Models",
    href: "/conversation",
    description:
      "Unlimited Chat conversaiton with models like Perpexility, Cohere etc.",
  },
]
const componentsPart2: { title: string; href: string; description: string }[] = [
  {
    title: "Dall-E 3",
    href: "/image",
    description:
      "Unlimited High Quality Image Generation with OpenAI's Dall-E 3.",
  },
  {
    title: "Google Imagen 3",
    href: "/image",
    description:
      "Unlimited High Quality Image Generation with Google's Imagen 3.",
  },
  {
    title: "Flux Pro",
    href: "/image",
    description:
      "Unlimited High Quality Image Generation with Flux Pro.",
  },
  {
    title: "Stable Diffusion",
    href: "/image",
    description: "Unlimited High Quality Image Generation with Stable Diffusion.",
  },
  {
    title: "Image Colorization",
    href: "/colorize",
    description:
      "Fill Colour in your images with AI powered Image Colorization.",
  },
  {
    title: "OCR Scanner",
    href: "/ocr",
    description:
      "Get Equations and Text from Images in HTML, LaTeX, and more.",
  },
]

export function NavigationMenuMain() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image 
                      alt="Cogify.Social"
                      src="/logo.png"
                      width={24}
                      height={24}
                      layout="fixed"
                     className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Cogify.Social
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Enjoy unlimited AI generations, including text, images, Documents and Audio without ads
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/realtime" title="Realtime Voice">
               Conversational support realtime audio inputs and outputs, voice activation detection, and much more.
              </ListItem>
              <ListItem href="/settings" title="Text Conversation">
                Text-based chatbots and conversational agents.
              </ListItem>
              <ListItem href="/image" title="Image Generation">
                Generate High quality images from text input.
              </ListItem>
              <ListItem href="/ocr" title="OCR Scanner">
              AI powered OCR document processor that extracts text, math equations, and tables from images.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Conversation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Image Generation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {componentsPart2.map((componentsPart2) => (
                <ListItem
                  key={componentsPart2.title}
                  title={componentsPart2.title}
                  href={componentsPart2.href}
                >
                  {componentsPart2.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/price" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Price
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
