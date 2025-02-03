import { useState, useEffect } from "react";

interface Settings {
  defaultModel: string;
  defaultImageModel: string;
  temperature: number;
  streamResponse: boolean;
}

const defaultSettings: Settings = {
  defaultModel: "openai",
  defaultImageModel: "dalle31",
  temperature: 0.8,
  streamResponse: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const storedSettings = localStorage.getItem("aiSettings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem("aiSettings", JSON.stringify(updatedSettings));
  };

  return { settings, updateSettings };
};
