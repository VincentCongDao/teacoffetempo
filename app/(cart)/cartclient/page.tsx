"use client";
import Heading from "@/components/Heading";
import Button from "@/components/button";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "../itemcontent/page";
import formatPrice from "@/components/(formatPrice)/page";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="
          text-slate-500 flex items-center gap-1 mt-2
          "
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-center`">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-center">TOTAL</div>
      </div>
      <div className="">
        {cartProducts &&
          cartProducts.map((i) => {
            return <ItemContent key={i.id} item={i} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 justify-between gap-4 flex">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small="small"
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between text-base font-semibold w-full">
            <span>SubTotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping calculate at checkout
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <div className="">
            <Link
              href={"/"}
              className="
          text-slate-500 flex items-center gap-1 mt-2
          "
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
