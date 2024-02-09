import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" dark:bg-[#191919]">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/valsalva.png"
            width={200}
            height={20}
            alt="valsalva typography"
            className="dark:invert invert-0"
          />
          {/* <p className="text-2xl font-bold">Valsalva</p> */}
        </Link>

        <p className="dark:text-white font-medium">
          © 2024 Valsalva. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
