// import axios from 'axios';
import {useLocation} from '@shopify/hydrogen';
export default function Submit() {
  let {pathname} = useLocation();

  // const {id, color} = state;

  // const AddProduct = () => {
  //   axios.post(
  //     'https://hydrogenappyo.myshopify.com/admin/api/2022-10/products.json',
  //     {
  //       product: {
  //         title: 'Toy7',
  //         body_html: 'The best best product',
  //         vendor: 'Matt',
  //       },
  //     },
  //     {
  //       headers: {
  //         'X-Shopify-Access-Token': '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',
  //       },
  //     },
  //   );
  // };
  // AddProduct();
  return <h1>{pathname ? {pathname} : 'none'}</h1>;
}
// import axios from 'axios';

// export async function api(request) {
// const data = await request.formData();
// const productName = data.get('name');
// const productDescription = data.get('description');
// const productPrice = data.get('price');

// return (
//   <h1>hi</h1>
// <h1>
//   {productName} {productDescription} {productPrice}
// </h1>
// );

// }
// export function api(request, {params}) {
//   return new Response('Hello world!');
// }
