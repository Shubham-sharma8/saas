import * as z from "zod";

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, {
      message: "Prompt is required and must not be empty.",
    })
    .max(100000, {
      message: "Prompt must not exceed 100000 characters.",
    }),
  model: z.string().min(1, {
    message: "Model selection is required.",
  }),
});

export const modelOption = [
  {
    value: "o3-mini",
    label: "o3-Mini",
    data: "o3-mini is our most recent small reasoning model, providing high intelligence",
  },
  {
    value: "o1",
    label: "o1",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "o1-preview",
    label: "o1-Preview",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "o1-mini",
    label: "o1 Mini",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "gpt-4.5-preview",
    label: "GPT 4.5",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "chatgpt-4o-latest",
    label: "CHATGPT 4o Latest",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "gpt-4o-2024-11-20",
    label: "GPT 4o",
    data: "Our Most advanced model and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster. Up to Oct 2023",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT 4o Mini",
    data: "GPT-4 Turbo may not be the swiftest, but it epitomizes precision and currency in its outputs. With each interaction, it delivers the latest and most accurate information. Up to Dec 2023",
  },
];
