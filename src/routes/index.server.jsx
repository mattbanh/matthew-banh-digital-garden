// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project
import clsx from 'clsx';
import {Suspense} from 'react';
import {
  Image,
  Link,
  CacheLong,
  gql,
  Seo,
  // ShopifyAnalyticsConstants,
  // useServerAnalytics,
  useLocalization,
  flattenConnection,
  useShopQuery,
  useMoney,
  Money,
} from '@shopify/hydrogen';
import {isDiscounted} from '~/lib/utils';
// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';
import {FeaturedCollections, Text} from '~/components';
import {Layout} from '~/components/index.server';

import {Section} from '../components/index';

import map from '../assets/images/map-of-japan.png';

export default function Homepage() {
  return (
    <Layout>
      <Section>
        <h1 className="text-center h-[50vh]">HERO</h1>
        <Suspense>
          <SeoForHomepage />
        </Suspense>
      </Section>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}
function HomepageContent() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: FEATURED_PRODUCTS,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });
  const {products} = data;

  return (
    <>
      <ShopByRegion />
      <FeaturedProducts products={products.nodes} />
      {/* <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      /> */}
    </>
  );
}

// SHOPBYREGION SECTION
function ShopByRegion() {
  return (
    <Section>
      <section className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-center text-xl font-bold mb-8 md:text-4xl md:mb-12">
            Shop by Region
          </h2>
          <p className="text-sm leading-7 mb-4">
            Japan is made up of four main islands and over 6,800 smaller
            islands. The four main islands are Hokkaido, Honshu, Shikoku, and
            Kyushu. Each of these islands has its own distinct regions and
            prefectures, which are similar to states or provinces. Some of the
            major regions in Japan include Tokyo, which is the capital and
            largest city, as well as other major cities like Osaka and Yokohama.
          </p>
          <p className="text-sm leading-7 mb-4">
            Click on the map to shop by region.
          </p>
        </div>
        <div className="relative shrink-0 md:w-1/2 flex align-middle">
          <Image
            className="cursor-pointer w-full"
            src={map}
            height={720}
            width={720}
            alt="interactive map of Japan"
          />
          <Link to="/regions/hokkaido">
            <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[16%] left-[69%] hover:bg-white">
              <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
                Hokkaido
              </span>
            </div>
          </Link>
          <Link to="/regions/gifu">
            <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[62.5%] left-[49%] hover:bg-white">
              <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
                Gifu
              </span>
            </div>
          </Link>
          <Link to="/regions/hiroshima">
            <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[72%] left-[28.5%] hover:bg-white">
              <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
                Hiroshima
              </span>
            </div>
          </Link>
          <Link to="/regions/aomori">
            <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[33%] left-[63%] hover:bg-white">
              <span className="absolute -top-1 left-[1.125rem] text-sm font-bold invisible group-hover:visible">
                Aomori
              </span>
            </div>
          </Link>
        </div>
      </section>
    </Section>
  );
}

function FeaturedProducts({products}) {
  return (
    <Section>
      <h2 className="text-center text-xl font-bold mb-8 md:text-4xl md:mb-12">
        Featured Products
      </h2>
      <div className="md:flex md:gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({product}) {
  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(product?.variants)[0] || {};

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="mb-8">
        <div className="card-image aspect-[4/5] bg-primary/5 mb-2">
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
          <h4 className="text-sm uppercase">{product.title}</h4>
          <div className="flex gap-4">
            <span className="flex gap-4 text-sm text-slate-500">
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

function SeoForHomepage() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: name,
        description,
        titleTemplate: '%s · Powered by Hydrogen',
      }}
    />
  );
}

// GRAPHQL QUERIES
// gql is a utility that adds syntax highlighting to GraphQL queries
// following is {operation type} {operation name}
// operation type is any of the following:
// - query(read), mutation(create, update, delete), or subscription (long-lasting read which allows real time updates)
// operation name is not required unless there are multiple operations, however it is best practice to include it
const FEATURED_PRODUCTS = gql`
  query featuredProducts {
    products(first: 3) {
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// featuredCollections: collections(
//   first: 4

//   sortKey: UPDATED_AT
// ) {
//   nodes {
//     id
//     title
//     handle
//     image {
//       altText
//       width
//       height
//       url
//     }
//   }
// }

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
