import {MongoClient} from 'mongodb';

const uri = `mongodb+srv://${Oxygen?.env?.MONGO}@cluster0.z17g88r.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const dbname = 'countup';
const collection_name = 'scores';

const accountsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

// const doc = {
//   name: `Bill`,
// };

const get = async (doc) => {
  try {
    await connectToDatabase();
    const result = await accountsCollection.find(doc);
    let arr = [];
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    await result.forEach((doc) => arr.push(doc));
    return arr;
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

export async function api(_request) {
  // get json form data from client-side addproductform
  const doc = {
    score: {$gt: 499},
  };
  let response = get(doc);
  // const response = post(request);
  return new Response(response, {
    status: 200,
  });
}
