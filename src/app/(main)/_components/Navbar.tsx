"use client"
import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {dark} from "@clerk/themes"
import { useTheme } from "next-themes";

const Navbar = () => {
  const {theme} = useTheme();
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
        <Link href="/resumes" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={45} height={45} />
          <span className="text-md font-bold tracking-tight">
            Resume Builder
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <ModeToggle/>
          <UserButton
            appearance={{
              baseTheme : theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                href="/billing"
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
