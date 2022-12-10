import axios from 'axios';
export function AddProductSuccess() {
  const test = 'test';

  return <h1>{test}</h1>;
}

// export async function api(request) {
//   const data = await request.formData();
//   const productName = data.get('name');
//   const productDescription = data.get('description');
//   const productPrice = data.get('price');

//   return (
//     <h1>
//       {productName} {productDescription} {productPrice}
//     </h1>
//   );
// }
