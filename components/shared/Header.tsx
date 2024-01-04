import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  const { sessionClaims } = auth();
  const admin = sessionClaims?.userId as string;

  return (
    <header className="w-full borber-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h2 className="font-bold text-3xl">Valsalva</h2>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

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
