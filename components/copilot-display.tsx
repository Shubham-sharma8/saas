"use client";

import React from "react";
import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { IconLogo } from "./ui/icons";

interface CopilotDisplayProps {
  content: string;
}

export function CopilotDisplay({ content }: CopilotDisplayProps) {
  try {
    const json = JSON.parse(content);
    const formDataEntries = Object.entries(json);
    const query = formDataEntries
      .filter(([key, value]) => value === "on" || key === "additional_query")
      .map(([key, value]) => (key === "additional_query" ? value : key))
      .join(", ");

    return (
      <Card className="p-3 md:p-4 w-full flex justify-between items-center">
        <h5 className="text-muted-foreground text-xs truncate">{query}</h5>
        <Check size={16} className="text-green-500 w-4 h-4" />
      </Card>
    );
  } catch (error) {
    return null;
  }
}
