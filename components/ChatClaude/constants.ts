import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required and must not be empty."
  }).max(1000, {
    message: "Prompt must not exceed 1000 characters."
  }),
  model: z.string().min(1, {
    message: "Model selection is required. "
  }),
});

export const modelOption = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude-3-5-Sonnet-20241022",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024"
  },
  {
    value: "claude-3-5-sonnet-20240620",
    label: "claude-3-5-sonnet-20240620",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024"

  },
  {
    value: "claude-3-5-haiku-20241022",
    label: "claude-3-5-haiku-20241022",
    data: "Our Most advanced model and it has the same high intelligence as Gemini-1.5 but is much more efficient—it generates text 2x faster. Up to Oct 2024"

  },
  {
    value: "claude-3-opus-20240229",
    label: "claude-3-opus-20240229",
  },
  {
    value: "claude-3-sonnet-20240229",
    label: "claude-3-sonnet-20240229",
  },
  {
    value: "claude-3-haiku-20240307",
    label: "claude-3-haiku-20240307",
  },
]