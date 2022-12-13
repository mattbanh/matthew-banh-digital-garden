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
        <div className="flex justify-center min-w-[18%] items-center">
          <Link
            className="overflow-hidden rounded-full h-24 w-24 bg-pink-400  mb-24 lg:h-32 lg:w-32 "
            to="/products"
          >
            <div className="bg-blue-700 w-full h-full flex justify-center items-center ">
              <span className="block text-xs">VIEW ALL</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
