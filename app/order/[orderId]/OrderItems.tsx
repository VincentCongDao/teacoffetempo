import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import formatPrice from "@/components/(formatPrice)/page";
import { truncateText } from "@/utils/truncateText";

interface OrderItemsProps {
  item: CartProduct;
}
const OrderItems: React.FC<OrderItemsProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        {truncateText(item.name)}
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.qty}</div>
      <div className="justify-self-end font-semibold">
        {(item.price * item.qty).toFixed(2)}
      </div>
    </div>
  );
};
export default OrderItems;
