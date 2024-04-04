import Image from "next/image";

interface ContainerProps {
  children: React.ReactNode;
}
const BannerContainer = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-emerald-200 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer Sale
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy The Discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-300 font-bold">
            Get 20% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            fill
            src="/teaandcoffee.jpg"
            alt="Tea Banner"
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
