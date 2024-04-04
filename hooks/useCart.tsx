import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import { toast } from "react-hot-toast";
// Here, it includes only one field: cartTotalQty, which tracks the total quantity of items in the cart.
type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProduct[] | null;
  handleAddProductToCart: (product: CartProduct) => void;
  handleRemoveProductFromCart: (product: CartProduct) => void;
  handleCartQtyIncrease: (product: CartProduct) => void;
  handleCartQtyDecrease: (product: CartProduct) => void;
  handleClearCart: () => void;
};
// Interface for the props that can be passed to the CartContextProvider component.
// This uses an index signature to allow for any property name with any value, making it flexible.
interface Props {
  [propName: string]: any;
}

// Create a Context for the cart with a default value of null.
// This context will later provide the cart's state to any component in the app that needs it.
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  // useState hook to manage the cart's total quantity state, initialized to 0.
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);

  useEffect(() => {
    //   Looking into the local storage for the eShopCartItems
    //   If there are JSON already exists then the cart will shows as already being added
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProduct[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      //     if the cart product exist
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            // Item total is item * qty
            const itemTotal = item.price * item.qty;
            acc.total += itemTotal;
            acc.qty += item.qty;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);
  const handleAddProductToCart = useCallback((product: CartProduct) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Have add to cart");
      //     Adding to the local storage
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);
  const handleRemoveProductFromCart = useCallback(
    (product: CartProduct) => {
      if (cartProducts) {
        const filterProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filterProducts);
        // Update the local storage here
        toast.success("Product have been removed");
        localStorage.setItem("eShopCartItems", JSON.stringify(filterProducts));
      }
    },
    [cartProducts]
  );
  const handleCartQtyIncrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.qty === 25) {
        return toast.error("Maximum stock have been reached for per customer");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (i) => i.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qty = ++updatedCart[existingIndex].qty;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;
      if (product.qty === 1) {
        return toast.error("Already minimum stock, you can remove the product");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (i) => i.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qty = --updatedCart[existingIndex].qty;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);
  // Preparing the value to be provided through the context, including any state or functions that need to be accessible globally.
  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  // Render the Provider component of CartContext, passing in the value and any props received by CartContextProvider.
  // This allows any child component to access the cart's state or functions provided here.
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  // useContext hook to access the CartContext.
  const context = useContext(CartContext);

  // Check if the context is null, which would mean this hook is used outside of a CartContextProvider.
  // If so, throw an error to indicate incorrect usage.
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  // Return the context so it can be used by the component that called this hook.
  return context;
};
