"use client";

import { adminLinks, headerLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

const MobileNavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start justify-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "bg-gray-200 dark:bg-[#252525]"
            } flex-center p-medium-16 whitespace-nowrap hover:scale-105 hover:bg-gray-200 transition-all duration-300 ease-in-out text-black dark:text-white w-full py-3 rounded-lg dark:hover:bg-[#252525]`}
          >
            <SheetClose asChild>
              <Link href={link.route}>{link.label}</Link>
            </SheetClose>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileNavItems;
