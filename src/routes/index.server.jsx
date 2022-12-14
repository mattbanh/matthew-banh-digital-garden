// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project
// import clsx from 'clsx';
import {Suspense} from 'react';
import {
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
      <Section className="bg-garden-cream min-h-[75vh] flex items-center md:py-64 rounded-tl-[10%] -mt-[200px]">
        <FeaturedProducts products={products.nodes} />
      </Section>
      <Section className="bg-garden-green lg:min-h-[2160px]  pb-[200px] md:pb-[240px] lg:pb-[320px]">
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
      <div className="bg-garden-blue relative min-h-[1080px] rounded-[60px] md:min-h-[1920px]  md:rounded-[120px] lg:min-h-[2560px] lg:rounded-[160px] xl:rounded-[200px] flex items-center overflow-hidden">
        <Image
          className="absolute top-0"
          height={1440}
          width={2560}
          src={top}
          alt="community graphic"
        />
        <Section className="">
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
              <p className="text-md text-garden-turquoise leading-7 mb-4">
                Feel free to join any of our gathering. We are excited to see
                you there!
              </p>
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

function HomepageAbout() {
  return (
    <>
      <div className="w-full py-16 min-h-full md:py-48 lg:flex lg:justify-between lg:py-72 lg:max-w-[1440px] lg:mx-auto">
        <div className="lg:w-1/3 md:flex md:flex-col md:justify-between">
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              WHY DIGITAL GARDEN
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Visiting Digital Garden is a great way to shop for unique and
              high-quality products. All of the items are carefully selected and
              are of the highest standards. In addition, by supporting my store,
              you are helping to support small business and the local economy.
            </p>
          </div>
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              WHAT DO WE DO
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Digital Garden is a unique platform that offers curated products
              produced by local farmers and makers in rural regions of Japan. By
              offering a direct-to-consumer sales platform, Digital Garden is
              helping to support the rural revitalization of Japan by providing
              a way for rural producers to sell their goods. This is a great way
              to support small local farmers and to help preserve the
              traditional agricultural practices of Japan. Our focus on
              sustainability and supporting rural communities makes it a
              valuable resource for anyone looking to purchase high-quality,
              locally-sourced products.
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="md:sticky top-40 text-center">
            <h3 className="text-5xl text-garden-yellow font-bold invisible lg:visible">
              LOVE LOCAL
            </h3>
          </div>
        </div>
        <div className="lg:w-1/3 md:flex md:flex-col md:justify-center">
          <div className="mb-24 lg:mb-0">
            <h3 className="text-3xl text-garden-cream font-bold mb-8 md:text-7xl">
              MORE ABOUT US
            </h3>
            <p className="text-md text-garden-cream leading-7 mb-4">
              Eating organic can have numerous health benefits. Organic foods
              are grown without the use of synthetic pesticides and fertilizers,
              which can be harmful to our bodies. In addition, organic farming
              practices are better for the environment, as they rely on
              sustainable methods to produce food. As a result, organic foods
              are often more nutritious and taste better than conventionally
              grown foods. Furthermore, by choosing organic, you can support
              small local farmers and help to build a more sustainable food
              system. Overall, there are many good reasons to incorporate
              organic foods into your diet.
            </p>
          </div>
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
