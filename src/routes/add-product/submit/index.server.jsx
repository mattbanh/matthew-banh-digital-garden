import axios from 'axios';

export async function api(request, {session}) {
  axios.post(
    'https://hydrogenappyo.myshopify.com/admin/api/2022-10/products.json',
    {
      product: {
        title: 'Toy4',
        body_html: 'The best best product',
        vendor: 'Matt',
      },
    },
    {
      headers: {
        'X-Shopify-Access-Token': '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',
      },
    },
  );
}
// export function api(request, {params}) {
//   return new Response('Hello world!');
// }
