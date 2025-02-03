import { Button } from "@/components/ui/button";
import { Eye, EyeOff, X } from "lucide-react";

interface ToggleRobotButtonProps {
  isRobotVisible: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

export function ToggleRobotButton({
  isRobotVisible,
  onToggle,
  onRemove,
}: ToggleRobotButtonProps) {
  return (
    <div className="absolute top-4 right-4 z-20 flex space-x-2">
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        aria-label={isRobotVisible ? "Hide Robot" : "Show Robot"}
      >
        {isRobotVisible ? (
          <>
            <EyeOff className="mr-2 h-4 w-4" />
            Hide Robot
          </>
        ) : (
          <>
            <Eye className="mr-2 h-4 w-4" />
            Show Robot
          </>
        )}
      </Button>
      <Button
        onClick={onRemove}
        variant="outline"
        size="sm"
        aria-label="Remove Robot"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
