import Container from "@/components/container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/action/getOrderById";
import NullData from "@/components/NullData";

interface IParam {
  orderId?: string;
}
const Order = async ({ params }: { params: IParam }) => {
  const order = await getOrderById(params);
  if (!order) return <NullData title="No order" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
