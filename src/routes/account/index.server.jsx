// Account route handled by Shopify

import {Suspense} from 'react';
import {
  CacheNone,
  flattenConnection,
  gql,
  Seo,
  useSession,
  useLocalization,
  useShopQuery,
  useServerAnalytics,
  Link,
} from '@shopify/hydrogen';

// GraphQL query fragment (for repeated queries)
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getApiErrorMessage} from '~/lib/utils';
// Account components to build out account page after logging in
import {
  AccountAddressBook,
  AccountDetails,
  AccountOrderHistory,
  FeaturedCollections,
  LogoutButton,
  PageHeader,
} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import {Section} from '~/components/index';

export default function Account({response}) {
  response.cache(CacheNone());

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {customerAccessToken} = useSession();

  if (!customerAccessToken) return response.redirect('/account/login');

  const {data} = useShopQuery({
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken,
      language: languageCode,
      country: countryCode,
    },
    cache: CacheNone(),
  });

  const {customer, featuredCollections, featuredProducts} = data;

  if (!customer) return response.redirect('/account/login');

  // The logged-in analytics state.
  useServerAnalytics({
    shopify: {
      customerId: customer.id,
    },
  });

  const addresses = flattenConnection(customer.addresses).map((address) => ({
    ...address,
    id: address.id.substring(0, address.id.lastIndexOf('?')),
    originalId: address.id,
  }));

  const defaultAddress = customer?.defaultAddress?.id?.substring(
    0,
    customer.defaultAddress.id.lastIndexOf('?'),
  );

  return (
    <>
      <AuthenticatedAccount
        customer={customer}
        addresses={addresses}
        defaultAddress={defaultAddress}
        featuredCollections={flattenConnection(featuredCollections)}
        featuredProducts={flattenConnection(featuredProducts)}
      />
    </>
  );
}

function AuthenticatedAccount({
  customer,
  addresses,
  defaultAddress,
  featuredCollections,
  featuredProducts,
}) {
  const orders = flattenConnection(customer?.orders) || [];

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName} ${customer.lastName}.`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Account details'}} />
      </Suspense>
      <div className="bg-garden-cream">
        <PageHeader heading={heading}>
          <LogoutButton>Sign out</LogoutButton>
        </PageHeader>
        <Section>
          <h3 className="font-bold text-lead">Vendor Dashboard</h3>
          <div>
            <Link className="p-4 bg-garden-teal rounded-md" to="/add-product">
              <span className="text-garden-cream font-bold">Add Product</span>
            </Link>
          </div>
        </Section>
        <AccountDetails
          firstName={customer.firstName}
          lastName={customer.lastName}
          phone={customer.phone}
          email={customer.email}
        />
        <AccountAddressBook
          defaultAddress={defaultAddress}
          addresses={addresses}
        />
        {orders && <AccountOrderHistory orders={orders} />}
        {!orders && (
          <>
            <FeaturedCollections
              title="Popular Collections"
              data={featuredCollections}
            />
            <ProductSwimlane data={featuredProducts} />
          </>
        )}
      </div>
    </Layout>
  );
}

// The neat thing about Hydrogen + Remix is that APIs can exist in route server files
export async function api(request, {session, queryShop}) {
  if (request.method !== 'PATCH' && request.method !== 'DELETE') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'PATCH,DELETE',
      },
    });
  }

  if (!session) {
    return new Response('Session storage not available.', {
      status: 400,
    });
  }

  const {customerAccessToken} = await session.get();

  if (!customerAccessToken) return new Response(null, {status: 401});

  const {email, phone, firstName, lastName, newPassword} = await request.json();

  const customer = {};

  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (firstName) customer.firstName = firstName;
  if (lastName) customer.lastName = lastName;
  if (newPassword) customer.password = newPassword;

  const {data, errors} = await queryShop({
    query: CUSTOMER_UPDATE_MUTATION,
    variables: {
      customer,
      customerAccessToken,
    },
    // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
    cache: CacheNone(),
  });

  const error = getApiErrorMessage('customerUpdate', data, errors);

  if (error) return new Response(JSON.stringify({error}), {status: 400});

  return new Response(null);
}

// GraphQL queries
const CUSTOMER_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 2) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
      }
    }
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
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
  }
`;

const CUSTOMER_UPDATE_MUTATION = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
