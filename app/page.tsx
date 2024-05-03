export const revalidate = 0;
import getProducts, { IProductParams } from "@/action/getProducts";
import ProductCard from "@/components/(productcard)/page";
import NullData from "@/components/NullData";
import BannerContainer from "@/components/bannerContainer";
import Container from "@/components/container";
interface HomeProps {
  searchParams: IProductParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  if (products.length === 0) {
    return (
      <NullData title="Hm... look like the product is not being found. Click 'All' to clear the filter" />
    );
  }
  // Shuffle
  const shuffleRandom = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const shuffledProduct = shuffleRandom(products);
  return (
    <div>
      <Container>
        <div className="">
          <h1>Recommend List</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-8">
          {shuffledProduct.map((product: any) => {
            return <ProductCard key={product.name} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
