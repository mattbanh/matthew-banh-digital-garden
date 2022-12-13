import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {isDiscounted} from '~/lib/utils';

export function FeaturedProductCard({product}) {
  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(product?.variants)[0] || {};

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="mb-8 md:rounded-md md:hover:shadow-md ease-in-out duration-300 md:p-6 md:mb-0">
        <div className="card-image aspect-[4/5] bg-primary/5 mb-6">
          {image && (
            <Image
              className="aspect-[4/5] w-full object-cover fadeIn"
              widths={[320]}
              sizes="320px"
              loaderOptions={{
                crop: 'center',
                scale: 2,
                width: 320,
                height: 400,
              }}
              // @ts-ignore Stock type has `src` as optional
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              // loading={loading}
            />
          )}
        </div>
        <div className="grid gap-1">
          <h4 className="text-sm text-garden-grey uppercase">
            {product.title}
          </h4>
          <div className="flex gap-4">
            <span className="flex gap-4 text-sm text-slate-400">
              <Money data={price} />
              {isDiscounted(price, compareAtPrice) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
