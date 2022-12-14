import {Suspense} from 'react';
import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PageHeader, ProductGrid, Section, Text} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

const pageBy = 48;

export default function Collection({params}) {
  const {handle} = params;
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();

  const {
    data: {collection},
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });

  if (!collection) {
    return <NotFound type="collection" />;
  }

  useServerAnalytics({
    shopify: {
      canonicalPath: `/collections/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
      collectionHandle: handle,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <Section className="bg-garden-cream py-20 min-h-[600px]">
        <div className="max-w-[1440px] mx-auto ">
          <h1 className="text-3xl text-garden-grey font-bold my-8 md:text-4xl">
            {collection.title}
          </h1>
          <div className="flex flex-col-reverse md:flex-row md:gap-16">
            <div className="mb-12">
              {collection?.description && (
                <div className="w-full">
                  <div>
                    <p className="text-sm text-garden-grey leading-7 mb-4">
                      {collection.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-12 md:mb-0 md:w-[40%] flex-shrink-0">
              <img
                className="block w-full rounded-tr-[30px] "
                src={collection.image.url}
              ></img>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-garden-cream min-h-[720px] py-20 ">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-xl font-bold text-garden-grey mb-6 text-center md:text-left md:text-2xl">
            Shop from {collection.title}
          </h2>
          <ProductGrid
            key={collection.id}
            collection={collection}
            url={`/collections/${handle}?country=${country}`}
          />
        </div>
      </Section>
    </Layout>
  );
}

// API endpoint that returns paginated products for this collection
// @see templates/demo-store/src/components/product/ProductGrid.client.tsx
export async function api(request, {params, queryShop}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'POST'},
    });
  }
  const url = new URL(request.url);

  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const {handle} = params;

  return await queryShop({
    query: PAGINATE_COLLECTION_QUERY,
    variables: {
      handle,
      cursor,
      pageBy,
      country,
    },
  });
}

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
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
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const PAGINATE_COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionPage(
    $handle: String!
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
