"use client";

import {
  CartProduct,
  selectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProduct;
  product: any;
  handleColorSelect: (value: selectedImgType) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((img: selectedImgType) => {
          return (
            <div
              key={img.color}
              onClick={() => handleColorSelect(img)}
              className={`relative w-[80%] rounded border-teal-300 aspect-square ${
                cartProduct.selectedImg.color === img.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
            >
              <Image
                src={img.image}
                alt={img.color}
                fill
                className="object-contain w-auto"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square ">
        <Image
          fill
          className="object-contain w-auto h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] "
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
