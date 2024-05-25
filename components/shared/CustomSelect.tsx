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
  selectItems: string[];
};

const CustomSelect = ({
  handleValueChange,
  selectItems,
  title,
}: CustomizeSelectProps) => {
  return (
    <div className="md:w-[250px] w-full">
      <div className="p-bold-20 my-3  text-grey-600 dark:text-gray-300">
        <p>{title}</p>
      </div>
      <Select name="select" onValueChange={handleValueChange}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#191919]">
          {selectItems.map((item, index) => (
            <SelectItem
              key={item}
              className="select-item p-regular-14 dark:text-white dark:hover:bg-[#252525]"
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
