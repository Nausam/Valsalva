import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { SignedIn, auth } from "@clerk/nextjs";
import { adminLinks } from "@/constants";
import Link from "next/link";
import MobileNavItems from "./MobileNavItems";

const MobileNav = () => {
  const user = auth();

  const admins = [process.env.ADMIN1, process.env.ADMIN2];
  const isAdmin = user.userId !== null && admins.includes(user.userId);

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer dark:invert"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white dark:bg-[#191919] dark:text-white md:hidden border-none items-center">
          <Image
            src="/assets/images/valsalva.png"
            width={200}
            height={20}
            alt="valsalva typography"
            className="dark:invert invert-0"
          />
          <Separator />
          <MobileNavItems />

          {isAdmin && (
            <SignedIn>
              {adminLinks.map((link) => {
                return (
                  <li
                    key={link.route}
                    className="flex-center p-medium-16 whitespace-nowrap py-3 rounded-md bg-sky-600 hover:bg-sky-500 text-white w-full mt-3"
                  >
                    <SheetClose asChild>
                      <Link href={link.route}>{link.label}</Link>
                    </SheetClose>
                  </li>
                );
              })}
            </SignedIn>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
