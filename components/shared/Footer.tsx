import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-between p-5 container flex flex-col sm:flex-row gap-5 text-center">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={128} height={38} />
        </Link>
        <p>2024 Event</p>
      </div>
    </footer>
  );
};

export default Footer;
