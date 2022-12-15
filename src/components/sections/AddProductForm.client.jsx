export function AddProductForm({data}) {
  // Currently vendor name is the cusomter first and last name. Will need to add vendor name section
  const vendorName = `${data.customer.firstName} ${data.customer.lastName}`;

  // send form data to server end to make post request
  async function sendFormData(event) {
    console.log(event.target.image.value);
    let formDataObject = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      vendor: vendorName,
    };

    let formDataJsonString = JSON.stringify(formDataObject);
    let fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      body: formDataJsonString,
    };

    let res = await fetch(`/api/addProduct`, fetchOptions);

    if (!res.ok) {
      let error = await res.text();
      throw new Error(error);
    } else {
      return 'Success';
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(event);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-6xl">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            rows="4"
            placeholder=""
          />
        </div>
      </div>
      {/* TO DO: Add image upload */}
      {/* <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="image"
          >
            Product Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            rows="4"
            placeholder=""
          />
        </div>
      </div> */}
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-8">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="product-price"
          >
            Price
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="price"
            type="number"
            placeholder=""
          />
        </div>
      </div>
      <button
        className="appearance-none block bg-garden-indigo text-garden-cream border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
