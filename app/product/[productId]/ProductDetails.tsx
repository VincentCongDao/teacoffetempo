"use client";

import ProductImage from "@/components/(products)/(ProductImage)/page";
import SetColor from "@/components/(products)/(SetColors)/page";
import SetQuantity from "@/components/(products)/(SetQuantity)/page";
import Button from "@/components/button";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
interface ProductDetailsProp {
  product: any;
}
// define type for cart product
export type CartProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  qty: number;
  price: number;
};

// define types for selected image type
export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

// creating a horizontal seperation
const Horizontal = () => {
  return <hr className="w-[30% my-2]" />;
};

const ProductDetails: React.FC<ProductDetailsProp> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  // Initialize the cart product state using the product data
  const [cartProduct, setCartProduct] = useState<CartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    // Selects the first image as the default, or an empty object if no images exist
    qty: 1,
    price: product.price,
  });

  const router = useRouter();
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((i) => i.id === product.id);

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  // Check if product.reviews exists and has at least one review
  // Set default rating to 0 if reviews array is empty or undefined
  const productRating = product.reviews?.length
    ? product.reviews.reduce(
        (acc: number, items: any) => items.rating + acc,
        0
      ) / product.reviews.length
    : 0;

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.qty > 1) {
      setCartProduct((prev) => ({ ...prev, qty: prev.qty - 1 }));
    }
  }, [cartProduct]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.qty < 99) {
      setCartProduct((prev) => ({ ...prev, qty: prev.qty + 1 }));
    }
  }, [cartProduct]);
  //   const handleColorSelect = useCallback(
  //     (value: selectedImgType) => {
  //       setCartProduct((prev) => {
  //         return { ...prev, selectedImg: value };
  //       });
  //     },
  //     [cartProduct.selectedImg]
  //   );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="">
        {/* <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        /> */}
      </div>
      <div className="flex flex-col gap-1 text-state- text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div className="">{product.reviews?.length || 0}</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div className="">
          <span className="font-semibold">CATEGORY:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500/80 flex items-center gap-1">
              <span>Product Added To Cart</span>
            </p>
            <div>
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            {/* <div className="">
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
            </div> */}
            <Horizontal />
            <div className="">
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
                outline
              ></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
