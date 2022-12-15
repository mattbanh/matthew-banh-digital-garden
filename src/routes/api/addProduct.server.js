import axios from 'axios';

export async function api(request, {_params}) {
  const jsonBody = await request.json();

  AddProduct(jsonBody);
  //   if (response) {
  return new Response(jsonBody.name, {
    status: 200,
  });
  //   } else {
  //     return new Response(null, {status: 404});
  //   }
}

function AddProduct(data) {
  // Get data from form on client side and fill in post request information
  const {name, description, price, vendor} = data;
  axios
    .post(
      `${Oxygen?.env?.PUBLIC_STORE_DOMAIN}/admin/api/2022-10/products.json`,
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
          `${Oxygen?.env?.PUBLIC_STORE_DOMAIN}/admin/api/2022-10/variants/${variantId}.json`,
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
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      return error;
    });
}
