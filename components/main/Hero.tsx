"use client";

import LogoCanvas from "../Canvas/LogoCanvas";
import { Suspense } from "react";

const Hero = () => {
  return (
    <section className="mt-20 nav-height relative">
      {/* <div className="wrapper h-5/6 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8 relative z-10">
          <h1 className="h1-bold drop-shadow-md">
            Discover Precision, Power, and Beauty Below.
          </h1>

          <p className="p-regular-20 md:p-regular-24 text-gray-700 dark:text-gray-300">
            Dive into a World of Excellence: Unleashing Precision, Power, and
            Unparalleled Performance in Every Fin!
          </p>
          <Button
            asChild
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white rounded-sm font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
            size="lg"
          >
            <Link href="/shop">Explore Now</Link>
          </Button>
        </div>
      </div> */}
      <div className="wrapper w-full h-full">
        <div className="flex items-center justify-center h-full relative">
          <Suspense fallback={<div>Loading...</div>}>
            <LogoCanvas />
          </Suspense>
        </div>
        <h1 className="text-center absolute bottom-20 right-0 left-0 mx-auto items-center justify-center h1-bold2 drop-shadow-md">
          Discover Precision, Power, and Beauty Below.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
