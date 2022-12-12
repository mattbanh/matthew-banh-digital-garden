// HOMEPAGE
// Hydrogen allows building templates that can be added as a Shopify app
// because this is a one-off project, this project will not query for everything
// from the Shopify backend but rather be treated as a custom React project

import {Suspense} from 'react';
import {
  Link,
  // CacheLong,
  gql,
  // Seo,
  // ShopifyAnalyticsConstants,
  // useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';
import {FeaturedCollections} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';

import {Section} from '../components/index';

import map from '../assets/images/map-of-japan.png';

export default function Homepage() {
  return (
    <Layout>
      <Section>
        <h1 className="text-center h-[50vh]">HERO</h1>
        {/* <Suspense> */}
        {/* <SeoForHomepage /> */}
        {/* </Suspense> */}
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
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });
  const {featuredProducts, featuredCollections} = data;
  return (
    <>
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
              largest city, as well as other major cities like Osaka and
              Yokohama.
            </p>
            <p className="text-sm leading-7 mb-4">
              Click on the map to shop by region.
            </p>
          </div>
          <div className="relative shrink-0 md:w-1/2">
            <img
              className="cursor-pointer w-full"
              src={map}
              alt="interactive map of Japan"
            />
            <Link to="/collections/hokkaido">
              <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[16%] left-[69%] hover:bg-white">
                <span className="absolute top-3 -left-7 invisible group-hover:visible">
                  Hokkaido
                </span>
              </div>
            </Link>
            <Link to="/collections/gifu">
              <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[62.5%] left-[49%] hover:bg-white">
                <span className="absolute top-3 -left-7 invisible group-hover:visible">
                  Gifu
                </span>
              </div>
            </Link>
            <Link to="/collections/hiroshima">
              <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[72%] left-[28.5%] hover:bg-white">
                <span className="absolute top-3 -left-7 invisible group-hover:visible">
                  Hiroshima
                </span>
              </div>
            </Link>
            <Link to="/collections/aomori">
              <div className=" group cursor-pointer rounded-full bg-blue-400 w-3 h-3 absolute top-[33%] left-[63%] hover:bg-white">
                <span className="absolute top-3 -left-7 invisible group-hover:visible">
                  Aomori
                </span>
              </div>
            </Link>
          </div>
        </section>
      </Section>
      <ProductSwimlane
        data={featuredProducts.nodes}
        title="Featured Products"
        divider="bottom"
      />
      <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      />
    </>
  );
}

// function HomepageContent() {
//   const {
//     language: {isoCode: languageCode},
//     country: {isoCode: countryCode},
//   } = useLocalization();

//   const {data} = useShopQuery({
//     query: HOMEPAGE_CONTENT_QUERY,
//     variables: {
//       language: languageCode,
//       country: countryCode,
//     },
//     preload: true,
//   });

//   const {heroBanners, featuredCollections, featuredProducts} = data;

//   // fill in the hero banners with placeholders if they're missing
//   const [primaryHero, secondaryHero, tertiaryHero] = getHeroPlaceholder(
//     heroBanners.nodes,
//   );

//   return (
//     <>
//       {primaryHero && (
//         <Hero {...primaryHero} height="full" top loading="eager" />
//       )}

//       <ProductSwimlane
//         data={featuredProducts.nodes}
//         title="Featured Products"
//         divider="bottom"
//       />
//       {secondaryHero && <Hero {...secondaryHero} />}
//       <FeaturedCollections
//         data={featuredCollections.nodes}
//         title="Collections"
//       />
//       {tertiaryHero && <Hero {...tertiaryHero} />}
//     </>
//   );
// }

// function SeoForHomepage() {
//   const {
//     data: {
//       shop: {name, description},
//     },
//   } = useShopQuery({
//     query: HOMEPAGE_SEO_QUERY,
//     cache: CacheLong(),
//     preload: true,
//   });

//   return (
//     <Seo
//       type="homepage"
//       data={{
//         title: name,
//         description,
//         titleTemplate: '%s · Powered by Hydrogen',
//       }}
//     />
//   );
// }

// /**
//  * The homepage content query includes a request for custom metafields inside the alias
//  * `heroBanners`. The template loads placeholder content if these metafields don't
//  * exist. Define the following five custom metafields on your Shopify store to override placeholders:
//  * - hero.title             Single line text
//  * - hero.byline            Single line text
//  * - hero.cta               Single line text
//  * - hero.spread            File
//  * - hero.spread_secondary  File
//  *
//  * @see https://help.shopify.com/manual/metafields/metafield-definitions/creating-custom-metafield-definitions
//  * @see https://github.com/Shopify/hydrogen/discussions/1790
//  */

const HOMEPAGE_CONTENT_QUERY = gql`
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    featuredCollections: collections(
      first: 4

      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 8) {
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

// const HOMEPAGE_SEO_QUERY = gql`
//   query shopInfo {
//     shop {
//       name
//       description
//     }
//   }
// `;
