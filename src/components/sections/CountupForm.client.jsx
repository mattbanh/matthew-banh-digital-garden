export function CountUpForm() {
  //   const [values, setValues] = useState({val: []});

  //   function createInputs() {
  //     return values.val.map((el, i) => (
  //       <div key={i}>
  //         <input type="text" value={el || ''} onChange={handleChange.bind(i)} />
  //         <input
  //           type="button"
  //           value="remove"
  //           name={i}
  //           onClick={removeClick.bind(i)}
  //         />
  //       </div>
  //     ));
  //   }

  //   function handleChange(event) {
  //     let vals = [...values.val];
  //     vals[this] = event.target.value;
  //     setValues({val: vals});
  //   }

  //   const addClick = () => {
  //     setValues({val: [...values.val, '']});
  //   };

  //   const removeClick = (event) => {
  //     let vals = [...values.val];
  //     let index = Number(event.target.name);
  //     vals.splice(index, 1);
  //     setValues({val: vals});
  //   };
  async function sendFormData(event) {
    // Preparing API request using fetch
    let formDataObject = {
      name: event.target.name.value,
      score: event.target.score.value,
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

    // API written in routes -> api -> addProduct.server.js
    let res = await fetch(`/api/countupDB`, fetchOptions);
    if (!res.ok) {
      let error = await res.text();
      throw new Error(error);
    } else {
      return 'Success';
    }
  }

  const handleSubmit = (event) => {
    sendFormData(event);
  };

  return (
    <section className="m-4">
      <div className="mb-10">
        {/* <img className="w-48 mx-auto" src={vcdLogo}></img> */}
      </div>
      <h1 className="mb-4">Countup</h1>
      {/* <form className="flex gap-3 mb-4" onSubmit={handleSubmit}> */}
      <form className="flex gap-3 mb-4" onSubmit={handleSubmit}>
        <label>
          <input
            className="rounded-sm px-2 py-1 w-40 text-sm"
            type="input"
            name="name"
            placeholder="Name"
          ></input>
        </label>
        <label>
          <input
            className="rounded-sm px-2 py-1 w-20 text-sm"
            type="input"
            name="score"
            placeholder="Score"
          ></input>
        </label>
        <button
          className="text-sm bg-slate-600 rounded-sm py-1 px-2"
          //   onClick={addClick}
        >
          Add
        </button>
      </form>
    </section>
  );
}
