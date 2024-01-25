import React, { useState } from "react";

import { motion } from "framer-motion";

const AnimatedLink = ({ title }: { title: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer text-black dark:text-white"
    >
      <AnimatedWord
        title={title}
        animation={letterAnimation}
        isHovered={isHovered}
      />
      <div className="absolute top-0 ">
        <AnimatedWord
          title={title}
          animation={letterAnimationTwo}
          isHovered={isHovered}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedLink;

const titleAnimations = {
  rest: {
    transition: {
      staggerChildren: 0.009,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.009,
    },
  },
};

const letterAnimation = {
  rest: {
    y: 0,
  },
  hover: {
    y: -25,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};

const letterAnimationTwo = {
  rest: {
    y: 25,
  },
  hover: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",
    },
  },
};

const AnimatedWord = ({
  title,
  animation,
  isHovered,
}: {
  title: string;
  animation: any;
  isHovered: boolean;
}) => {
  return (
    <motion.span
      variants={titleAnimations}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      className="whitespace-nowrap relative"
    >
      {title.split("").map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;</span>
        ) : (
          <motion.span
            key={index}
            variants={animation}
            className="relative inline-block whitespace-nowrap"
          >
            {char}
          </motion.span>
        )
      )}
    </motion.span>
  );
};
