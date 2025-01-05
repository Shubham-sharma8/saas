import { Copilot } from '@/components/copilot'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { getModel } from '../utils/registry'

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
) {
  const objectStream = createStreamableValue<PartialInquiry>()
  uiStream.update(<Copilot inquiry={objectStream.value} />)

  let finalInquiry: PartialInquiry = {}

  const result = await streamObject({
    model: getModel(model),
    system: `As a professional researcher, your role is to assess user input and determine if further clarification is necessary. Only ask concise follow-up questions when information is insufficient or ambiguous.

Structure inquiries as follows:
{
  "question": "A clear question to clarify intent or gather specifics.",
  "options": [
    {"value": "option1", "label": "Option 1"},
    {"value": "option2", "label": "Option 2"}
  ],
  "allowsInput": true/false,
  "inputLabel": "Label for free-form input",
  "inputPlaceholder": "Placeholder text for input"
}

Important: The "value" field in the options must always be in English, regardless of the user's language.

For example:
{
  "question": "What specific information are you seeking about Rivian?",
  "options": [
    {"value": "history", "label": "History"},
    {"value": "products", "label": "Products"},
    {"value": "investors", "label": "Investors"},
    {"value": "partnerships", "label": "Partnerships"},
    {"value": "competitors", "label": "Competitors"}
  ],
  "allowsInput": true,
  "inputLabel": "If other, please specify",
  "inputPlaceholder": "e.g., Specifications"
}

Match the language of the question, labels, and placeholders to the user's language, but keep the "value" field in English. Your goal is to gather precise details to deliver accurate responses.
   `,
    messages,
    schema: inquirySchema
  })

  try {
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        objectStream.update(obj)
        finalInquiry = obj
      }
    }
  } finally {
    objectStream.done()
  }

  return finalInquiry
}
