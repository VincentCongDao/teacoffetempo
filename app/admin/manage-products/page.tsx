import Container from "@/components/container";
import ManageProductsClient from "../manage-products/manageproductsclient";
import getProducts from "@/action/getProducts";
import { getCurrentUser } from "@/action/getCurrentUser";
import NullData from "@/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="You have no access to this order" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
