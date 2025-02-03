import React from 'react';
import { cn } from "@/lib/utilsAdvace";
import Image from "next/image"
import Link from "next/link"
import { Montserrat } from "next/font/google";
import { TextRevealCardPreview } from "./ui/TextRevealCard";
import { Button } from '@/components/ui/button'


const font = Montserrat({ weight: '600', subsets: ['latin'] });
export const Footer = () => {
    
  return (
    <div>
      <hr className="line" />

      <footer className="footer ">
        <div className=" flex-col space-y-2 flex px-2">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" 
           className="block dark:hidden"
           src="/logo.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
               <Image
            fill
            alt="Dark Mode Logo"
            src="/logo_white.png"
            className="hidden dark:block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
            </div>
            <h1 className={cn("text-2xl font-light ", font.className)}>
              Cogify
            </h1>
          </Link>
          <div className="text">
            
          </div>

          <div className="text">
            <p>© 2025 Cogify. All rights reserved</p>
          </div>
        </div>
        <div className="center items-center justify-center"> {/* Added flex and justify-center classes */}
          <TextRevealCardPreview />
        </div> 
        
        <div className="flex-col space-y-2 flex " >
          <div className="right flex-col space-y-2 flex ">
            <Link href="/about-us" >
            <Button className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm dark:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                About us 
            </Button>
            </Link>
            

            <Link href="/privacy-policy" className="flex items-center">
            <Button className="px-4 py-2 rounded-md border border-black bg-white dark:text-black text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                Privacy Policy
                </Button>
            </Link>
            <Link href="/term-of-service" className="flex items-center">
            <Button className="px-4 py-2 rounded-md border border-black bg-white dark:text-black text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    Terms of Service
</Button>
            </Link>
            <Link href="/refund" className="flex items-center">
            <Button className="px-4 py-2 rounded-md border border-black bg-white dark:text-black text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    Refund 
</Button>

            </Link>
            <Link href="/" className="flex items-center">
            <Button className="px-4 py-2 rounded-md border border-black bg-white dark:text-black text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    Careers
</Button>

            </Link>
            
          </div>
        </div>
      </footer>
      
    </div>
  );
}
