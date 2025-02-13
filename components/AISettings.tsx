import React from "react";

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
