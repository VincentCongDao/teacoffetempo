import Link from "next/link";
import Container from "../container";
import Image from "next/image";
import CartCount from "./cartcount/page";
import Register from "@/app/(register)/register/page";
import UserMenu from "./usermenu/usermenu";
import { getCurrentUser } from "@/action/getCurrentUser";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  console.log("user<<<<", currentUser);
  return (
    <div className="nav-wrapper sticky top-0 w-full bg-primary z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className="font-bold text-2xl flex justify-center items-center"
            >
              <Image
                className="mr-2"
                src="/TeaTempo-logo.png"
                alt="TeaTempo Logo"
                width={70}
                height={100}
              />
              TeaTempo
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>
                <Link href="/cart">
                  <CartCount />
                </Link>
              </div>
              <div>
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
