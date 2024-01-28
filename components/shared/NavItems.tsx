"use client";

import { adminLinks, headerLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AnimatedLink from "./AnimatedLink";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            href={link.route}
            className={`${
              isActive &&
              "bg-slate-500 px-2 bg-opacity-20 text-black dark:text-white"
            }`}
          >
            <AnimatedLink key={link.label} title={link.label} />
          </Link>
        );
      })}
    </ul>
  );
};

export default NavItems;
