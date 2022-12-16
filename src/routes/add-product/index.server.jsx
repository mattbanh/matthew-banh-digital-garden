// add-product page only accessed by logged-in users.
// TO-DO: Add authentication and authorization for VENDORS

import {CacheNone, useSession, useShopQuery, gql} from '@shopify/hydrogen';

import {Layout} from '../../components/index.server';
import {Section} from '../../components/index';
import {AddProductForm} from '../../components/sections/AddProductForm.client';

export default function AddProduct({response}) {
  response.cache(CacheNone());
  return (
    <Layout>
      <div className="bg-garden-cream md:min-h-[1080px]">
        <Section>
          <h1 className="font-bold text-4xl">Add Product</h1>
          <AddProductFormComp response={response} />
        </Section>
      </div>
    </Layout>
  );
}

function AddProductFormComp({response}) {
  // useSession is a hook that grants access to customerAccessToken
  const {customerAccessToken} = useSession();
  // redirect if customerAccessToken doesn't exist
  if (!customerAccessToken) return response.redirect('/account/login');

  const {data} = useShopQuery({
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken,
    },
    cache: CacheNone(),
  });

  return <AddProductForm data={data} />;
}

// query customer to access firstName and lastName meant to be used in place of
// vendor name
// TO DO: Users currently have to manually enter their name. It should be added on signup
const CUSTOMER_QUERY = gql`
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
    }
  }
`;
