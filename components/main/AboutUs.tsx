import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="wrapper flex flex-wrap gap-10 md:mt-0 mt-28">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0 items-center justify-center ">
        <div className="lg:hidden flex-col justify-center gap-8 flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            About Us
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 text-start">
            Welcome to Valsalva, your premium destination for customizable
            snorkel fins tailored to meet your exact preferences and needs. At
            Valsalva, we are passionate about providing snorkel enthusiasts with
            the ultimate experience in comfort, performance, and style.
          </p>
          <Button
            size="lg"
            asChild
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg mt-5"
          >
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">
              Customize Now
            </Link>
          </Button>
        </div>

        <div className="mt-20">
          <Image
            src="/assets/images/logo_white.png"
            alt="hero"
            width={250}
            height={250}
            className="object-contain object-center mx-auto invert dark:invert-0 hidden md:block"
          />
          <Image
            src="/assets/images/logo_white.png"
            alt="hero"
            width={150}
            height={150}
            className="object-contain object-center mx-auto invert dark:invert-0 md:hidden block"
          />
        </div>

        <div className="flex-col justify-center gap-8 mt-16 hidden lg:flex">
          <h2 className="h2-bold text-gray-800 dark:text-white text-start">
            About Us
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 text-start">
            Welcome to Valsalva, your premium destination for customizable
            snorkel fins tailored to meet your exact preferences and needs. At
            Valsalva, we are passionate about providing snorkel enthusiasts with
            the ultimate experience in comfort, performance, and style.
          </p>
          <Button
            size="lg"
            asChild
            className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg mt-5"
          >
            <Link href="/product/65e9d07d684eaf43ce92ee67/custom">
              Customize Now
            </Link>
          </Button>
        </div>
      </div>

      <div className="wrapper flex flex-wrap justify-center mx-auto text-center gap-20 mt-10">
        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Revolutionize snorkeling with fully customizable fins, enhancing
            adventure and performance.
          </p>
        </div>
        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            What Sets Us Apart
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Our state-of-the-art fin customizer lets you design the perfect
            fins, reflecting your style.
          </p>
        </div>

        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            Quality and Innovation
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Crafted with advanced materials for durability, comfort, and
            unmatched performance.
          </p>
        </div>

        <div className="max-w-xl">
          <h2 className="h2-bold text-gray-800 dark:text-white">
            Expert Craftsmanship
          </h2>
          <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
            Handcrafted by skilled artisans, ensuring excellence in every
            detail.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
