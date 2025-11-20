import { memo } from "react";
import { Wallet } from "lucide-react";
import { useHeader } from "./useHeader";
import type { HeaderProps } from "./types";

export default memo(function Header({ title, subtitle }: HeaderProps) {
  const { title: headerTitle, subtitle: headerSubtitle } = useHeader({
    title,
    subtitle,
  });

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600 rounded-xl shadow-lg text-white">
          <Wallet size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{headerTitle}</h1>
          <p className="text-sm text-gray-500">{headerSubtitle}</p>
        </div>
      </div>
    </header>
  );
});
