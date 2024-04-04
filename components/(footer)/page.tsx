import FooterContainer from "../footerContainer";
import Container from "../container";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { PiInstagramLogo } from "react-icons/pi";
const Footer = () => {
  return (
    <footer className="bg-primary text-light">
      <Container>
        <div className="w-full text-center flex justify-center mb-2 mt-6">
          <div className="w-4/5">
            <h1 className="text-2xl font-bold mb-2">TeaTempo</h1>
            <p>
              Welcome to TeaTempo, where indulgence knows no bounds, and every
              cup tells a story of unparalleled flavor and sophistication. Here,
              amidst the whispers of steam and the gentle clinks of porcelain,
              tea and coffee engage in a delightful dance of flavors, each vying
              to steal the spotlight with their finest brews. From the serene
              tranquility of a jasmine-infused green tea to the bold, robust
              notes of an espresso shot, TeaTempo curates only the most
              exquisite offerings, ensuring every moment is steeped in pure
              delight.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-4">
          <FooterContainer>
            <h3 className="text-xl font-bold mb-2">Shop Categories</h3>
            <Link href="#">Coffee</Link>
            <Link href="#">Tea</Link>
          </FooterContainer>
          <FooterContainer>
            <h3 className="text-xl font-bold mb-2">Customer Services</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">FAQs</Link>
          </FooterContainer>
          <FooterContainer>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#">
                <FaSquareFacebook className="text-2xl" />
              </Link>
              <Link href="#">
                <FaTiktok className="text-2xl" />
              </Link>
              <Link href="#">
                <PiInstagramLogo className="text-2xl" />
              </Link>
            </div>
          </FooterContainer>
        </div>
      </Container>
      <div className="w-full flex justify-center">
        &copy; {new Date().getFullYear()} TeaTempo. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
