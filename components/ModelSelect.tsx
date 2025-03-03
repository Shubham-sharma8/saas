import { OpenAIModel } from "@/types/types";
import { FC } from "react";

interface Props {
  model: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel);
  };

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={model}
      onChange={handleChange}
    >
      <option value="gpt-4o">GPT-4o</option>
      <option value="gpt-4.5-preview">GPT-4.5</option>
      <option value="gpt-4o-2024-11-20">GPT-4 Nov 24</option>
      <option value="chatgpt-4o-latest">Chatgpt-4o Latest</option>
      <option value="gpt-4">GPT-4</option>
      <option value="gpt-4o-mini">GPT-4o Mini</option>
    </select>
  );
};
