import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AISettingsProps {
  settings: {
    defaultModel: string;

    streamResponse: boolean;
  };
  updateSettings: (newSettings: Partial<AISettingsProps["settings"]>) => void;
}

export const AISettings: React.FC<AISettingsProps> = ({
  settings,
  updateSettings,
}) => {
  return <div className=" space-y-6"></div>;
};
