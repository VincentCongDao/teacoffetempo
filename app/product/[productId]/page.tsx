import Container from "@/components/container";
import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListingRating";
import getProductById from "@/action/getProductById";
import NullData from "@/components/NullData";

interface IParam {
  productId?: string;
}
const Product = async ({ params }: { params: IParam }) => {
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="Do not have that specific ID" />;
  }
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div className="">Add Rating</div>
          <div className="">
            <ListRating product={product} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
