"use client";

import { useCallback, useState } from "react";
import Avatar from "@/components/(avatar)/page";
import { TbArrowDownCircle } from "react-icons/tb";
import Link from "next/link";
import MenuItem from "../menuitem/menuitem";
import { signOut } from "next-auth/react";
import BackDrop from "../backdrop/backdrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-white-700/50 flex flex-row items-center gap-1 cursor-pointer rounded-full hover:shadow-md transition text-slate-600"
        >
          <Avatar />
          <TbArrowDownCircle />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Sign Out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Sign Up</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
