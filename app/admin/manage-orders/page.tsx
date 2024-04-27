import Container from "@/components/container";
import ManageProductsClient from "../manage-products/manageproductsclient";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/components/NullData";
import getOrders from "@/action/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="You have no access to this order" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
