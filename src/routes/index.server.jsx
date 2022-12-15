// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project

import {Suspense} from 'react';
import {CacheLong, gql, Seo, useShopQuery, Link} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';

import {
  Section,
  ShopByRegion,
  FeaturedProducts,
  HomepageAbout,
  HomepageCommunity,
} from '../components/index';

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

function HomepageContent() {
  return (
    <>
      <HomepageHero />

      <Section className="bg-garden-teal min-h-[75vh]">
        <ShopByRegion />
      </Section>
      <Section className="bg-garden-cream min-h-[75vh] flex justify-center items-center md:py-64 rounded-tl-[60px] md:rounded-tl-[120px] lg:rounded-tl-[160px] xl:rounded-tl-[200px]-mt-[200px] md:min-h-[1920px] -mt-[240px] ">
        <div className="pb-[240px] pt-16 lg:max-w-[1440px]">
          <h2 className="text-3xl flex justify-center items-center text-garden-grey font-bold md:mb-16 md:text-7xl">
            TRENDING THIS WEEK
          </h2>
          <FeaturedProductsTop />
          <FeaturedProductsBottom />
        </div>
      </Section>
      <Section className="bg-garden-green  pb-[200px] md:pb-[240px] lg:pb-[320px] rounded-tr-[60px] md:rounded-tr-[120px] lg:rounded-tr-[160px] xl:rounded-tr-[200px] -mt-[240px] ">
        <HomepageAbout />
      </Section>
      <HomepageCommunity />
    </>
  );
}

import heroImg from '../assets/images/homepage-hero.png';

function HomepageHero() {
  return (
    <div
      className="bg-fixed bg-cover min-h-[720px] md:min-h-[1280px] flex items-center"
      style={{backgroundImage: `url(${heroImg})`}}
    >
      <Section>
        <h2 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
          WELCOME TO DIGITAL GARDEN
        </h2>
        <h2 className="text-lg text-garden-cream font-bold mb-8 md:text-2xl">
          TOGETHER LET'S SUPPORT RURAL MAKERS AND PRODUCERS
        </h2>
        <Link
          className="relative group overflow-hidden rounded-full box-content border-2 border-garden-cream h-28 w-28 md:h-24 md:w-24 border-1 mb-16 lg:h-28 lg:w-28 xl:h-32 xl:w-32 "
          to="/products"
        >
          <div className="bg-garden-cream rounded-full w-full h-full flex justify-center items-center transition ease-in-out -translate-x-full group-hover:translate-x-0 duration-500"></div>
          <span className="absolute w-full text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-garden-cream group-hover:text-garden-grey transition ease-in-out duration-500">
            SHOP NOW
          </span>
        </Link>
      </Section>
    </div>
  );
}

function FeaturedProductsTop() {
  const featuredType = 'Produce';
  const featuredCollection = 'all';
  const {data} = useShopQuery({
    query: FEATURED_PRODUCTS,
    variables: {
      featuredType,
      featuredCollection,
    },
    preload: true,
  });
  const {products} = data.collection;

  return (
    <FeaturedProducts products={products.nodes} featuredType={featuredType} />
  );
}

function FeaturedProductsBottom() {
  const featuredType = 'Kitchenware';
  const featuredCollection = 'all';
  const {data} = useShopQuery({
    query: FEATURED_PRODUCTS,
    variables: {
      featuredType,
      featuredCollection,
    },
    preload: true,
  });
  const {products} = data.collection;

  return (
    <FeaturedProducts products={products.nodes} featuredType={featuredType} />
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
  query featuredProducts($featuredCollection: String!, $featuredType: String!) {
    collection(handle: $featuredCollection) {
      products(first: 3, filters: {productType: $featuredType}) {
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
