import {Link} from '@shopify/hydrogen';
import {FeaturedProductCard} from '../index';

export function FeaturedProducts({products}) {
  return (
    <>
      <h2 className="text-center text-xl font-bold mb-8 md:text-4xl md:mb-12">
        Featured Products
      </h2>
      <div className="md:flex md:gap-6">
        <div className="md:flex md:gap-6">
          {products.map((product) => (
            <FeaturedProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex justify-end min-w-[18%] items-center">
          <Link
            className="relative group overflow-hidden rounded-full box-content border-2 border-blue-300 h-24 w-24 border-1  mb-24 lg:h-32 lg:w-32 "
            to="/products"
          >
            <div className="bg-blue-300 rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-blue-300 group-hover:text-white transition ease-in-out duration-500">
              VIEW ALL
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
