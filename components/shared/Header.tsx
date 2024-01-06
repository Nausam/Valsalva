import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { adminLinks } from "@/constants";
import Image from "next/image";

const Header = async () => {
  const admins = process.env.ADMIN1 || process.env.ADMIN2;

  const user = auth();

  return (
    <header className="w-full z-50">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex gap-2">
          <Image
            src="/assets/images/logo.png"
            width={20}
            height={20}
            alt="valsalva logo"
          />

          <Image
            src="/assets/images/valsalva.png"
            width={200}
            height={20}
            alt="valsalva typography"
          />
        </Link>

        <nav className="md:flex-between mx-auto hidden w-full max-w-xs">
          <NavItems />

          {user.userId === admins && (
            <SignedIn>
              {adminLinks.map((link) => {
                return (
                  <li
                    key={link.route}
                    className="flex-center p-medium-16 whitespace-nowrap ml-5  hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <Link href={link.route}>{link.label}</Link>
                  </li>
                );
              })}
            </SignedIn>
          )}
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="rounded-md bg-black hover:bg-slate-800"
              size="lg"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
