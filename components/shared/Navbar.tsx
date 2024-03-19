"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`${
                isActive && "text-primary-500"
              } flex-center whitespace-nowrap text-base`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
