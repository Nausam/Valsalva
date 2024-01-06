import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/valsalva-line.png"
            width={200}
            height={20}
            alt="Evently logo"
            quality={100}
          />
        </Link>

        <p>© 2024 Valsalva. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
