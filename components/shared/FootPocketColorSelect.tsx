import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  name: string;
}

interface FootPocketColorSelectProps {
  onSelectColor: (color: string) => void;
}

const categories: Category[] = [
  {
    name: "White",
  },
  {
    name: "Black",
  },
];

const FootPocketColorSelect: React.FC<FootPocketColorSelectProps> = ({
  onSelectColor,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <Select onValueChange={(value: string) => handleColorSelect(value)}>
      <SelectTrigger className="select-field dark:text-black">
        <SelectValue placeholder="Select Color" />
      </SelectTrigger>
      <SelectContent className="dark:bg-[#191919]">
        {categories.map((category: Category) => (
          <SelectItem
            value={category.name}
            key={category.name}
            className="select-item p-regular-14 dark:text-white dark:bg-[#191919] dark:hover:bg-[#252525] z-50"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FootPocketColorSelect;
