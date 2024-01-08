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
            href={link.route}
            className={`${
              isActive && "bg-slate-500 px-2 bg-opacity-20 rounded-md"
            }`}
          >
            <AnimatedLink title={link.label} />
          </Link>
        );
      })}
    </ul>
  );
};

export default NavItems;

// <li
//   key={link.route}
//   className={`${
//     isActive && "text-blue-700"
//   } flex-center p-medium-16 whitespace-nowrap hover:scale-105 hover:text-blue-600 transition-all duration-300 ease-in-out text-white`}
// >
//   <Link href={link.route}>{link.label}</Link>
// </li>
