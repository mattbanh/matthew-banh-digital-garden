// import React, {useState} from 'react';
import axios from 'axios';
export function AddProductForm({data}) {
  // // const [isError, setIsError] = useState(false);
  // const formValidation = (event) => {
  //   const {name, description, price} = event.target;

  //   if (!name || !description || !price) {
  //     return false;
  //   }
  //   return true;
  // };
  // function addProduct() {

  return (
    <form action="/add-product" className="w-full max-w-6xl">
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
          {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
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
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="image"
          >
            Product Image
          </label>
          <input
            // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            rows="4"
            placeholder=""
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="vendor"
            type="hidden"
            value={data.customer.id}
          />
        </div>
      </div>
      <button type="submit">Click Me</button>
    </form>
  );
}
