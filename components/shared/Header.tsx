import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { adminLinks } from "@/constants";
import Image from "next/image";
import ThemeButton from "@/components/shared/ThemeButton";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Header = async () => {
  const user = auth();

  const admins = [process.env.ADMIN1, process.env.ADMIN2];
  const isAdmin = user.userId !== null && admins.includes(user.userId);

  return (
    <header className="w-full z-50 bg-opacity-10 md:bg-opacity-20 dark:bg-opacity-20 fixed top-0 backdrop-blur-md">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex gap-2">
          <Image
            src="/assets/images/logo_white.png"
            width={20}
            height={20}
            alt="valsalva logo"
            className="invert dark:invert-0"
          />
        </Link>

        <nav className="md:flex-between mx-auto hidden w-full max-w-xs">
          <NavItems />

          {isAdmin && (
            <SignedIn>
              <Menubar className="ml-10 dark:bg-[#222222] dark:border-none dark:hover:bg-[#323232]">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    Admin
                  </MenubarTrigger>
                  <MenubarContent className="dark:bg-[#222222] dark:border-none">
                    <Link href="/admin">
                      <MenubarItem className="dark:hover:bg-[#323232] hover:bg-primary-50 cursor-pointer">
                        Dashboard
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator className="dark:bg-[#151515]" />

                    <Link href="/product/65e9d07d684eaf43ce92ee67/custom">
                      <MenubarItem className="dark:hover:bg-[#323232] hover:bg-primary-50 cursor-pointer">
                        Custom
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </SignedIn>
          )}
        </nav>

        <div className="flex justify-end gap-3 items-center">
          <ThemeButton />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="rounded-md bg-white border hover:bg-transparent hover:text-white hover:border-white font-bold text-black shadow-lg transition-all duration-300 ease-in-out"
              size="lg"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <MobileNav />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
