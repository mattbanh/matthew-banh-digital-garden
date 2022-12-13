import {Link} from '@shopify/hydrogen';
import {FeaturedProductCard} from '../index';

export function FeaturedProducts({products}) {
  return (
    <section className="align-middle  max-w-[1440px] md:mx-auto">
      <h2 className="text-xl text-garden-rose font-bold mb-8 md:text-4xl md:mb-12">
        Featured Products
      </h2>
      <div className="md:flex md:gap-6">
        <div className="md:flex md:gap-6">
          {products.map((product) => (
            <FeaturedProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex justify-center items-end md:min-w-[25%] md:items-center">
          <Link
            className="relative group overflow-hidden rounded-full box-content border-2 border-dashed border-garden-rose h-24 w-24 border-1  mb-24 lg:h-32 lg:w-32 "
            to="/products"
          >
            <div className="bg-garden-rose rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
            <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-rose group-hover:text-white transition ease-in-out duration-500">
              VIEW ALL
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
