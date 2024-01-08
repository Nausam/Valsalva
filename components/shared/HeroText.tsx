import React from "react";
import { MotionH1 } from "./MotionH1";
import { MotionP } from "./MotionP";
import { MotionDiv } from "./MotionDiv";

const defaultAnims = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const text = [
  "D",
  "i",
  "s",
  "c",
  "o",
  "v",
  "e",
  "r",
  "  ",
  "P",
  "r",
  "e",
  "c",
  "i",
  "s",
  "i",
  "o",
  "n",
  ",",
  "  ",
  "P",
  "o",
  "w",
  "e",
  "r",
  ",",
  " ",
  "a",
  "n",
  "d",
  " ",
  "B",
  "e",
  "a",
  "u",
  "t",
  "y",
  " ",
  "B",
  "e",
  "l",
  "o",
  "w",
];

const HeroText = () => {
  return (
    <MotionDiv initial="hidden" animate="visible">
      <MotionH1
        variants={defaultAnims}
        transition={{ staggerChildren: 0.1 }}
        className="h1-bold flex text-white drop-shadow-md"
      >
        {text.map((letter, index) => (
          <MotionP
            key={index}
            variants={defaultAnims}
            transition={{ staggerChildren: 0.1 }}
          >
            {letter}
          </MotionP>
        ))}
      </MotionH1>
    </MotionDiv>
  );
};

export default HeroText;
