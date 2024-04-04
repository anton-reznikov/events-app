"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

type NavbarProps = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
};
const Navbar = ({ setOpen }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <nav className="w-full">
      <ul className="flex w-full flex-col items-start gap-5 md:flex-row md:flex-between">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`${
                isActive && "text-primary-500"
              }  whitespace-nowrap text-base`}
            >
              <Link
                onClick={() => {
                  if (setOpen) {
                    setOpen(false);
                  }
                }}
                href={link.route}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
