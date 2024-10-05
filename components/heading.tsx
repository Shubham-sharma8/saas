import { Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Allow for any React node, including images
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon, // The icon (or image) passed as a prop
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        {icon && (
          <div className={cn("w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10", iconColor)}>
            {icon} {/* Render the icon here */}
          </div>
        )}
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-1">{title}</h2> {/* Add margin bottom to title */}
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
