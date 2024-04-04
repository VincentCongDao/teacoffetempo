import Container from "@/components/container";
import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListingRating";

interface IParam {
  productId?: string;
}
const Product = ({ params }: { params: IParam }) => {
  const selectedProduct = products.find((item) => item.id === params.productId);

  if (selectedProduct) {
    console.log(selectedProduct.id);
  } else {
    console.log("Product not found");
  }
  return (
    <div className="p-8">
      <Container>
        {selectedProduct && <ProductDetails product={selectedProduct} />}
        <div className="flex flex-col mt-20 gap-4">
          <div className="">Add Rating</div>
          <div className="">
            <ListRating product={selectedProduct} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
