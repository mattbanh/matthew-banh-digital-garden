// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project

// Suspense is a feature from React 18 which improves performance of server-side rendering
// (SSR). As can be seen in the code below, we use JSX on the server side! This allows
// the GraphQL queries and any other API requests to be separated from the client-side,
// protecting the data.
import {Suspense} from 'react';
import {CacheLong, gql, Seo, useShopQuery} from '@shopify/hydrogen';

// Components brought in from components folder
import {Layout} from '~/components/index.server';
import {
  Section,
  ShopByRegion,
  HomepageAbout,
  HomepageCommunity,
  HomepageHero,
  HomepageFeaturedProducts,
} from '../components/index';

// Written to keep elements as componentized as possible.
export default function Homepage() {
  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}

// Homepage content
function HomepageContent() {
  const featuredTop = 'Produce';
  const featuredBottom = 'Kitchenware';
  const featuredCollection = 'all';
  const {data} = useShopQuery({
    query: FEATURED_PRODUCTS,
    variables: {
      featuredTop,
      featuredBottom,
      featuredCollection,
    },
    preload: true,
  });

  return (
    <>
      <HomepageHero />
      <Section className="bg-garden-teal min-h-[75vh]">
        <ShopByRegion />
      </Section>
      <Section className="bg-garden-cream min-h-[75vh] flex justify-center items-center md:py-64 rounded-tl-[60px] md:rounded-tl-[120px] lg:rounded-tl-[160px] xl:rounded-tl-[200px]-mt-[200px] md:min-h-[1920px] -mt-[240px] ">
        <HomepageFeaturedProducts
          data={data}
          featuredTop={featuredTop}
          featuredBottom={featuredBottom}
        />
      </Section>
      <Section className="bg-garden-green  pb-[200px] md:pb-[240px] lg:pb-[320px] rounded-tr-[60px] md:rounded-tr-[120px] lg:rounded-tr-[160px] xl:rounded-tr-[200px] -mt-[240px] ">
        <HomepageAbout />
      </Section>
      <HomepageCommunity />
    </>
  );
}

// SEO provided by Shopify
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
  query featuredProducts(
    $featuredCollection: String!
    $featuredTop: String!
    $featuredBottom: String!
  ) {
    topFeature: collection(handle: $featuredCollection) {
      products(first: 3, filters: {productType: $featuredTop}) {
        nodes {
          id
          title
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
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
    bottomFeature: collection(handle: $featuredCollection) {
      products(first: 3, filters: {productType: $featuredBottom}) {
        nodes {
          id
          title
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
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
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
