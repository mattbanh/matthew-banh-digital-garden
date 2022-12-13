// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project
// import clsx from 'clsx';
import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  // ShopifyAnalyticsConstants,
  // useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';

import {Layout} from '~/components/index.server';

import {Section, ShopByRegion, FeaturedProducts} from '../components/index';

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
      <Section className="bg-garden-cream min-h-[75vh] flex items-center md:py-64 py">
        <FeaturedProducts products={products.nodes} />
      </Section>
      <Section className="bg-blue-300 min-h-[75vh]">
        <HomepageAbout />
      </Section>
      {/* <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      /> */}
    </>
  );
}

function HomepageAbout() {
  return (
    <>
      <div className="md:flex justify-between w-full h-screen">
        <div>
          <h3>WHY DIGITAL GARDEN</h3>
        </div>
        <div>
          <div className="md:sticky top-40">
            <span>TEST</span>
          </div>
        </div>
        <div>
          <h3>MORE ABOUT US</h3>
        </div>
      </div>
    </>
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
