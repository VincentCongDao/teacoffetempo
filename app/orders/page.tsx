import Container from "@/components/container";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/components/NullData";
import getOrders from "@/action/getOrders";
import getOrdersByUserId from "@/action/getOrdersByUserId";
import OrderClient from "./OrderClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Sorry, not yet" />;
  }
  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="No orders" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
