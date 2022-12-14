// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project
// import clsx from 'clsx';
import {Suspense} from 'react';
import {
  Link,
  CacheLong,
  gql,
  Image,
  Seo,
  // ShopifyAnalyticsConstants,
  // useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';

import {Layout} from '~/components/index.server';

import {
  Section,
  ShopByRegion,
  FeaturedProducts,
  HomepageAbout,
} from '../components/index';

export default function Homepage() {
  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Section className="bg-garden-cream">
        <h1 className="text-center h-screen">HERO</h1>
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
      <Section className="bg-garden-teal min-h-[75vh]">
        <ShopByRegion />
      </Section>
      <Section className="bg-garden-cream min-h-[75vh] flex items-center md:py-64 rounded-tl-[60px] md:rounded-tl-[120px] lg:rounded-tl-[160px] xl:rounded-tl-[200px]-mt-[200px] md:min-h-[1440px] -mt-[240px] ">
        <FeaturedProducts products={products.nodes} />
      </Section>
      <Section className="bg-garden-green lg:min-h-[2160px]  pb-[200px] md:pb-[240px] lg:pb-[320px] rounded-tr-[60px] md:rounded-tr-[120px] lg:rounded-tr-[160px] xl:rounded-tr-[200px] -mt-[240px] ">
        <HomepageAbout />
      </Section>
      <HomepageCommunity />

      {/* <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      /> */}
    </>
  );
}

import bottom from '../assets/images/about-bottom.png';
import middle from '../assets/images/about-mid.png';
import top from '../assets/images/about-top.png';

function HomepageCommunity() {
  return (
    <section className="-mt-[240px] -mb-[240px] ">
      <div className="bg-garden-blue relative min-h-[1080px] rounded-[60px] md:min-h-[1920px]  md:rounded-[120px] lg:min-h-[2160px] lg:rounded-[160px] xl:min-h-[2560px] xl:rounded-[200px] flex items-center overflow-hidden">
        <Image
          className="absolute top-0"
          height={1440}
          width={2560}
          src={top}
          alt="community graphic"
        />
        <Section className="lg:mb-[240px]">
          <div className="flex flex-col-reverse md:flex-col lg:flex-row lg:justify-between md:gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl text-garden-turquoise font-bold mb-8 md:text-7xl">
                OUR COMMUNITY
              </h3>
              <p className="text-md text-garden-turquoise leading-7 mb-4">
                We believe to have communities is essential for human being.
                That’s why we care about our community, and trying to make it a
                place for everyone.
              </p>
              <p className="text-md text-garden-turquoise leading-7 mb-4">
                Our partners always have very inclusive and welcoming events
                everywhere in Japan.
              </p>
              <p className="text-md text-garden-turquoise leading-7 mb-20">
                Feel free to join any of our gathering. We are excited to see
                you there!
              </p>
              <div className="flex justify-center items-end md:min-w-[25%] md:items-center">
                <Link
                  className="relative group overflow-hidden rounded-full box-content border-2 border-garden-turquoise h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
                  to="/products"
                >
                  <div className="bg-garden-turquoise rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
                  <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-turquoise group-hover:text-garden-blue transition ease-in-out duration-500">
                    SEE EVENTS
                  </span>
                </Link>
              </div>
            </div>
            <div className="p-12">
              <Image
                height={480}
                width={480}
                src={middle}
                alt="community graphic"
              />
            </div>
          </div>
        </Section>
        <Image
          className="absolute bottom-0"
          height={1440}
          width={2560}
          src={bottom}
          alt="community graphic"
        />
      </div>
    </section>
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

// ABOUT GRAPHQL QUERIES
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
