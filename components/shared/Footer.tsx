import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <h2 className="font-bold text-3xl">Valsalva</h2>
        </Link>

        <p>@2024 Valsalva. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
