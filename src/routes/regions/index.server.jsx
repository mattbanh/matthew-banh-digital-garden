// View all regions

import {Suspense} from 'react';
import {
  useShopQuery,
  useLocalization,
  gql,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';

import {PageHeader, Section, Grid} from '~/components';
import {Layout, CollectionCard} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

export default function Collections() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'All Collections'}} />
      <div className="bg-garden-cream">
        <PageHeader heading="Regions" />
        <Section>
          <Suspense>
            <CollectionGrid />
          </Suspense>
        </Section>
      </div>
    </Layout>
  );
}

function CollectionGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: PAGINATION_SIZE,
      country: countryCode,
      language: languageCode,
    },
    preload: true,
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: '/regions',
      pageType: ShopifyAnalyticsConstants.pageType.listCollections,
    },
  });

  // an "All" collection was created on Shopify Storefront to allow filtering
  // products by tag. To prevent the "All" collection from being shown, it was filtered
  // out of the graphQL query result
  const collections = data.collections.nodes;
  const regions = collections.filter(
    (collection) => collection.title !== 'All',
  );

  return (
    <Grid items={regions.length === 3 ? 3 : 2}>
      {regions.map((region, i) => (
        <CollectionCard
          collection={region}
          key={region.id}
          loading={getImageLoadingPriority(i, 2)}
        />
      ))}
    </Grid>
  );
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`;
