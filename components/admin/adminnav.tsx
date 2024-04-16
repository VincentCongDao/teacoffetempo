"use client";
import Link from "next/link";
import Container from "../container";
import AdminNavItem from "./adminnavitem";
import { RiDashboardFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div
      className="
            w-full shadow-sm top-20 border-b-[1px] pt-4"
    >
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link
            href="
          /admin"
          >
            <AdminNavItem
              label="Summary"
              icon={RiDashboardFill}
              selected={pathname === "/admin"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
