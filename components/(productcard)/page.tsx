"use client";

import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import formatPrice from "../(formatPrice)/page";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  // Initialize the useRouter hook to handle navigation
  const router = useRouter();

  // Calculate the average product rating by summing up all ratings and dividing by the number of reviews
  const productReview =
    data.reviews.reduce((acc: number, items: any) => items.rating + acc, 0) /
    data.reviews.length;
  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-200/50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full"></div>
        <div className="mt-4">
          <h3 className="text-lg">{truncateText(data.name)}</h3>
        </div>
        <div className="">
          <Rating value={productReview} readOnly />
        </div>
        <div className="">{data.reviews.length} review</div>
        <div className=""> </div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
