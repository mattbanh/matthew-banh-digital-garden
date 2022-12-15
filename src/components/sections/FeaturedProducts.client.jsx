import {Link} from '@shopify/hydrogen';
import {FeaturedProductCard} from '../index';

export function FeaturedProducts({products, featuredType}) {
  return (
    <section className="align-middle  max-w-[1440px] pt-16 md:mx-auto md:pt-0 md:mb-16">
      <h3 className="text-xl text-garden-grey font-bold mb-8 md:text-4xl md:mb-12">
        Popular in {featuredType}
      </h3>
      <div className="md:flex">
        <div className="md:flex md:gap-1 lg:gap-2 xl:gap-3">
          {products.map((product) => (
            <FeaturedProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex justify-center items-end md:min-w-[25%] md:items-center">
          <Link
            className="relative group overflow-hidden rounded-full box-content border-2 border-garden-grey h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
            to="/products"
          >
            <div className="bg-garden-grey rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
            <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-grey group-hover:text-garden-cream transition ease-in-out duration-500">
              VIEW ALL
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
