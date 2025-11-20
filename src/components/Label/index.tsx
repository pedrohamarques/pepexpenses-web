import { memo } from "react";
import { CATEGORY_ICON_MAP } from "./constants";

export default memo(function Label({ category }: { category: string }) {
  function renderIcon() {
    const Icon = CATEGORY_ICON_MAP[category] || CATEGORY_ICON_MAP["Other"];
    return <Icon size={14} />;
  }
  return (
    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
      {renderIcon()}
      {category}
    </span>
  );
});
