import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { SignedIn, auth } from "@clerk/nextjs";
import { adminLinks } from "@/constants";
import Link from "next/link";

const MobileNav = () => {
  const admins = process.env.ADMIN1 || process.env.ADMIN2;

  const user = auth();

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <h2 className="font-bold text-2xl">Valsalva</h2>
          <Separator />
          <NavItems />

          {user.userId === admins && (
            <SignedIn>
              {adminLinks.map((link) => {
                return (
                  <li
                    key={link.route}
                    className="flex-center p-medium-16 whitespace-nowrap border-2 py-3 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
                  >
                    <Link href={link.route}>{link.label}</Link>
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
