// Server-side API to receive data from add-product form and make a POST request
// to Shopify Admin API to add a product
// Unsure why using Oxygen is necessary for .env variables
import axios from 'axios';

const storeURL = `https://${Oxygen?.env?.PUBLIC_STORE_DOMAIN}`;

export async function api(request) {
  // get json form data from client-side addproductform
  const jsonBody = await request.json();
  AddProduct(jsonBody);
  return new Response(jsonBody.name, {
    status: 200,
  });
}

function AddProduct(data) {
  // Get data from form on client side and fill in post request information
  const {name, description, price, vendor} = data;
  axios
    .post(
      `${storeURL}/admin/api/2022-10/products.json`,
      {
        product: {
          title: name,
          body_html: description,
          vendor,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': Oxygen?.env?.ADMIN_API,
        },
      },
    )
    .then(function (response) {
      // Required to make another request to update price of variant because price not added directly to product
      const variantId = response.data.product.variants[0].id;
      axios
        .put(
          `${storeURL}/admin/api/2022-10/variants/${variantId}.json`,
          {
            variant: {
              price,
            },
          },
          {
            headers: {
              'X-Shopify-Access-Token': Oxygen?.env?.ADMIN_API,
            },
          },
        )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    })
    .catch(function (error) {
      return error;
    });
}
