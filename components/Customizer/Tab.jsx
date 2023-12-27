import React from "react";
import { useSnapshot } from "valtio";

import state from "@/store";
import Image from "next/image";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism cursor-pointer" : "rounded-4"
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <Image
        src={tab.icon}
        alt={tab.name}
        className={`${
          isFilterTab ? "w-[20px] h-[20px]" : "w-[20px] h-[20px] object-contain"
        }`}
      />
    </div>
  );
};

export default Tab;
