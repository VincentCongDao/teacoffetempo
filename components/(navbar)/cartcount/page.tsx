"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <ShoppingCartTwoToneIcon />
      </div>
      <span
        className="absolute top-[-10px]
      left-[-5px]
      bg-slate-700/20
      text-white;
      h-6
      w-6
      rounded-full
      flex
      items-center
      justify-center
      text-sm
      "
      >
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
