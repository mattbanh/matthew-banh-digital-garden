import {
  CacheNone,
  useSession,
  useShopQuery,
  useLocalization,
  gql,
} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';
import {Section} from '../../components/index';
import {AddProductForm} from '../../components/sections/AddProductForm.client';

export default function AddProduct() {
  return (
    <Layout>
      <div className="bg-garden-cream md:min-h-[1080px]">
        <Section>
          <h1 className="font-bold text-4xl">Add Product</h1>

          <AddProductFormComp />

          {/* <TestQuery /> */}
        </Section>
      </div>
    </Layout>
  );
}

function AddProductFormComp() {
  const {customerAccessToken} = useSession();

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {data} = useShopQuery({
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken,
      language: languageCode,
      country: countryCode,
    },
    cache: CacheNone(),
  });

  return <AddProductForm data={data} />;
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
    }
  }
`;
