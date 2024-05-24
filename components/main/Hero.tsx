"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { AuroraBackground } from "../ui/AuroraBackground";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-4xl max-w-6xl md:text-7xl font-bold dark:text-white text-center">
          Discover Precision, Power, and Beauty Below.
        </div>
        <div className="font-extralight max-w-5xl text-center text-base md:text-2xl dark:text-neutral-200 py-4">
          Dive into a World of Excellence: Unleashing Precision, Power, and
          Unparalleled Performance in Every Fin!
        </div>
        <Button
          asChild
          className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white rounded-sm font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg mt-10"
          size="lg"
        >
          <Link href="/shop">Explore Now</Link>
        </Button>
      </motion.div>
    </AuroraBackground>
  );
};

export default Hero;
