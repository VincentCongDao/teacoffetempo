import getProducts from "@/action/getProducts";
import Summary from "./Summary";
import getOrders from "@/action/getOrders";
import getUsers from "@/action/getUser";
import Container from "@/components/container";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  return (
    <div className="mt-8">
      <Container>
        <Summary products={products} orders={orders} users={users}></Summary>
      </Container>
    </div>
  );
};

export default Admin;
