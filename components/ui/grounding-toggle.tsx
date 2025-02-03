"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { InfoIcon as InfoCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GroundingToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function GroundingToggle({ enabled, onToggle }: GroundingToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoCircle className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Grounding connects model output to verifiable sources of
                information. This is useful in situations where accuracy and
                reliability are important
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="grounding" checked={enabled} onCheckedChange={onToggle} />
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Source:</span>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4"
          />
          <span>Google Search</span>
        </div>
      </div>
    </div>
  );
}
