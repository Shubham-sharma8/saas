"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { ModelSelector } from "@/components/ModelSelector";
import { AISettings } from "@/components/AISettings";
import { useSettings } from "@/hooks/useSettings";
import { Sidebar } from "@/components/SettingSidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Import toast
import Link from "next/link";

const SettingsPage = () => {
  const { user } = useUser();
  const { settings, updateSettings } = useSettings();
  const [activeSection, setActiveSection] = useState("model");
  const router = useRouter();

  // State variables for model selections
  const [selectedChatModel, setSelectedChatModel] = useState(
    settings.defaultModel
  );
  const [selectedImageModel, setSelectedImageModel] = useState(
    settings.defaultImageModel
  );

  useEffect(() => {
    // Update the selected models when settings change
    setSelectedChatModel(settings.defaultModel);
    setSelectedImageModel(settings.defaultImageModel);
  }, [settings]);

  if (!user) return null;

  const handleSaveModelSelections = () => {
    // Update settings with the selected models
    updateSettings({
      defaultModel: selectedChatModel,
      defaultImageModel: selectedImageModel,
    });
    toast.success("Model selections saved successfully");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "model":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold dark:text-white mb-4">
              AI Model Settings
            </h2>

            {/* Model Selector for Chat */}
            <ModelSelector
              type="chat"
              currentModel={selectedChatModel}
              onModelChange={setSelectedChatModel}
              searchTerm={""}
              setSearchTerm={function (term: string): void {
                throw new Error("Function not implemented.");
              }}
            />

            {/* Model Selector for Image */}
            <ModelSelector
              type="image"
              currentModel={selectedImageModel}
              onModelChange={setSelectedImageModel}
              searchTerm={""}
              setSearchTerm={function (term: string): void {
                throw new Error("Function not implemented.");
              }}
            />

            {/* Single Save Button */}
            <Button
              className="w-full mt-5 dark:text-black"
              variant="Sketch"
              onClick={handleSaveModelSelections}
            >
              Save Model Selections
            </Button>
            <div className="flex justify-end">
              <Button
                className="w-[300px] mt-5 dark:text-black"
                variant="Sketch"
                size="sm"
                asChild
              >
                <Link href="https://artificialanalysis.ai">
                  AI Model Analysis
                </Link>
              </Button>
            </div>

            <AISettings settings={settings} updateSettings={updateSettings} />
          </motion.div>
        );
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl dark:text-white font-semibold mb-4">
              Profile Settings
            </h2>
            <UserProfile />
          </motion.div>
        );
      case "help":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl dark:text-white font-semibold mb-4">
              Help Center
            </h2>
            <p className="mb-4 dark:text-white">
              Need assistance? Visit our help center for more information.
            </p>
            <Button
              variant="Sketch"
              className=" dark:text-black w-full mt-5"
              onClick={() => router.push("/help")}
            >
              Get Help
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
