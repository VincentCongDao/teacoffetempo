import ProductCard from "@/components/(productcard)/page";
import BannerContainer from "@/components/bannerContainer";
import Container from "@/components/container";
import { products } from "@/utils/products";
export default function Home() {
  return (
    <div>
      <Container>
        <div>
          <BannerContainer />
        </div>
        <div className="">
          <h1>Recommend List</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-8">
          {products.map((product: any) => {
            return <ProductCard key={product.name} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
