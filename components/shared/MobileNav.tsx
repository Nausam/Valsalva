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

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

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
              <Menubar className="dark:bg-[#222222] dark:border-none dark:hover:bg-[#323232]">
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
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
