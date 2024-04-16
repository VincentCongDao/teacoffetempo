"use client";
import Link from "next/link";
import Container from "../container";
import AdminNavItem from "./adminnavitem";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbShoppingCartCog } from "react-icons/tb";
import { TbShoppingCartPin } from "react-icons/tb";
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
          <Link
            href="
          /admin/add-product"
          >
            <AdminNavItem
              label="Add Product(s)"
              icon={MdOutlineLibraryBooks}
              selected={pathname === "/admin/add-product"}
            />
          </Link>
          <Link
            href="
          /admin/manage-products"
          >
            <AdminNavItem
              label="Manage Product(s)"
              icon={TbShoppingCartPin}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>{" "}
          <Link
            href="
          /admin/manage-orders"
          >
            <AdminNavItem
              label="Manage Order(s)"
              icon={TbShoppingCartCog}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
