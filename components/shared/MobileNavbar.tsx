import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Navbar from "./Navbar";

const MobileNavbar = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            width={24}
            height={24}
            src="/icons/menu.svg"
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src="/images/logo.svg" alt="logo" width={128} height={38} />
          <Separator className="border border-gray-50" />
          <Navbar />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavbar;
