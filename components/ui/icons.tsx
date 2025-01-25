"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

function IconLogo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("h-4 w-4 relative", className)} {...props}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-VPOiuifncEzyj5kKuHKzlbXFptn14f.png"
        alt="Logo"
        fill
        className="object-contain dark:hidden"
        priority
      />
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_white-Klgaru1s384NeCx8TdfU1CIcKB7JRM.png"
        alt="Logo"
        fill
        className="object-contain hidden dark:block"
        priority
      />
    </div>
  )
}

export { IconLogo }

