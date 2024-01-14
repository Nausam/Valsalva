import React from "react";
import { useSnapshot } from "valtio";

import state from "@/store";
import Image from "next/image";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 1 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div className="border bg-grey-500 rounded-lg p-1 cursor-pointer">
      <div
        key={tab.name}
        className={` ${
          isFilterTab ? "rounded-lg  cursor-pointer" : "rounded-4"
        }`}
        onClick={handleClick}
        style={activeStyles}
      >
        <Image
          src={tab.icon}
          alt={tab.name}
          // className={`${
          //   isFilterTab
          //     ? "w-[10px] h-[10px]"
          //     : "w-[10px] h-[10px] object-contain"
          // }`}
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default Tab;
