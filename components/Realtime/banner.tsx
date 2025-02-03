"use client";

import { useTranslations } from "@/components/Realtime/translations-context";

export const Banner = () => {
  const { t } = useTranslations();

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 py-2"></div>
  );
};

export default Banner;
