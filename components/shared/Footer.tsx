import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" dark:bg-[#191919]">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="flex flex-col">
          <Image
            src="/assets/images/valsalva.png"
            width={200}
            height={20}
            alt="valsalva typography"
            className="dark:invert invert-0 mx-auto"
          />
          <p className="dark:text-white font-medium p-5">
            © 2024 Valsalva. All Rights Reserved.
          </p>
        </Link>

        <div className="flex flex-col gap-3 justify-end">
          {/* <p className="font-medium">Socials</p> */}
          <Link
            href="https://www.facebook.com/profile.php?id=100086240568582"
            className="flex gap-2 items-center justify-center hover:underline"
            target="_blank"
          >
            <Image
              src="/assets/icons/facebook.png"
              width={25}
              height={10}
              alt="facebook"
              className="dark:invert invert-0"
            />
            {/* <p className="font-medium">Facebook</p> */}
          </Link>
          <Link
            href="https://www.instagram.com/valsalvamaldives"
            className="flex gap-2 items-center justify-center hover:underline"
            target="_blank"
          >
            <Image
              src="/assets/icons/instagram.png"
              width={25}
              height={10}
              alt="facebook"
              className="dark:invert invert-0"
            />
            {/* <p className="font-medium">Instagram</p> */}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
