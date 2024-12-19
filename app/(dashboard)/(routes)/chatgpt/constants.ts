import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  model: z.string().min(1),
});

export const modelOption = [
  {
    value: "gemini-1.5-flash-002",
    label: "Gemini-1.5-Flash-002",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-2 but is much more efficient—it generates text 2x faster. Up to Oct 2024"

  },
  {
    value: "gemini-1.5-pro-002",
    label: "Gemini-1.5-Pro-002",
  },
  {
    value: "gemini-1.5-flash-001",
    label: "Gemini-1.5-Flash-00",
  },
  {
    value: "gemini-1.0-pro-002",
    label: "Gemini-1.0-Pro-002",
  },
  {
    value: "gemini-1.5-pro-001",
    label: "Gemini-1.5-pro-001",
  },
  {
    value: "gemini-flash-experimental",
    label: "Gemini-Flash-Try",
  },
  {
    value: "gemini-pro-experimental",
    label: "Gemini-Pro-Try",
  },
]