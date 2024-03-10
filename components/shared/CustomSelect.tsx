import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomizeSelectProps = {
  handleValueChange: (value: string) => void;
  title: string;
  selectItem1: string;
  selectItem2: string;
};

const CustomSelect = ({
  handleValueChange,
  selectItem1,
  selectItem2,
  title,
}: CustomizeSelectProps) => {
  return (
    <div className="w-full">
      <div className="p-bold-20 my-3  text-grey-600 dark:text-gray-300">
        <p>{title}</p>
      </div>
      <Select name="select" onValueChange={handleValueChange}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#191919]">
          <SelectItem
            className="select-item p-regular-14 dark:text-white dark:hover:bg-[#252525]"
            value={selectItem1}
          >
            {selectItem1}
          </SelectItem>
          <SelectItem
            className="select-item p-regular-14 dark:text-white dark:hover:bg-[#252525]"
            value={selectItem2}
          >
            {selectItem2}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
