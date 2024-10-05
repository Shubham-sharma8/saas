import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";

const SettingsPage = async () => {

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={<img src="https://www.gstatic.com/pantheon/images/aiplatform/model_garden/icons/icon-gemini.png" alt="Gemini Icon" className="w-full h-full object-contain" />} // Use the image as the icon
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        
        <SubscriptionButton  />
      </div>
    </div>
  );
};

export default SettingsPage;
