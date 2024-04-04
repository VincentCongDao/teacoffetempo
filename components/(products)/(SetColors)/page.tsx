"use client";

/**
 * SetColor Component
 * A component for selecting product color from a list of available colors.
 * Renders color options as clickable circles with corresponding color code.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {selectedImgType[]} props.images - An array of objects containing color and colorCode properties.
 * @param {CartProduct} props.cartProduct - The currently selected product object.
 * @param {Function} props.handleColorSelect - A function to handle color selection.
 * @returns {JSX.Element} - The rendered component.
 */

import {
  CartProduct,
  selectedImgType,
} from "@/app/product/[productId]/ProductDetails";
interface SetColorProps {
  images: selectedImgType[];
  cartProduct: CartProduct;
  handleColorSelect: (value: selectedImgType) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex gap-4 items-center ">
      <span className="font-semibold">Color:</span>
      <div className="flex gap-1">
        {images.map((img) => {
          return (
            <div
              key={img.color}
              onClick={() => handleColorSelect(img)}
              className={`h-7 w-7 rounded-full border-teal-200 flex items-center justify-center ${
                cartProduct.selectedImg.color === img.color
                  ? "border-[1.5px] "
                  : "border-none"
              }`}
            >
              <div
                style={{ background: img.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetColor;
