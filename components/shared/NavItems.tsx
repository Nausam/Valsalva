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
              "border dark:border-white border-[#929292] px-2 bg-opacity-50 rounded-sm transition-all duration-300"
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
