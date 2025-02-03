import * as z from "zod";

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, {
      message: "Prompt is required and must not be empty.",
    })
    .max(1000, {
      message: "Prompt must not exceed 1000 characters.",
    }),
  model: z.string().min(1, {
    message: "Model selection is required. ",
  }),
});

export const modelOption = [
  {
    value: "gemini-2.0-flash-exp",
    label: "Gemini-2.0-Flash (exp)",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024",
  },
  {
    value: "gemini-2.0-flash-thinking-exp-1219",
    label: "Gemini-2.0-Flash-Thinking",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024",
  },
  {
    value: "gemini-exp-1206",
    label: "Gemini-Exp-1206",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024",
  },
  {
    value: "gemini-1.5-pro-002",
    label: "Gemini-1.5-Pro",
  },
  {
    value: "gemini-1.5-flash-001",
    label: "Gemini-1.5-Flash",
  },
];
