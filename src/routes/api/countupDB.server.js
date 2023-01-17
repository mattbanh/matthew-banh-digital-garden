import {MongoClient} from 'mongodb';

const uri =
  'mongodb+srv://admin:test@cluster0.z17g88r.mongodb.net/?retryWrites=true&w=majority';

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
const doc = {
  name: `John`,
  score: 567,
};

const post = async (request) => {
  const {name, score} = request;
  const numScore = Number(score);
  try {
    await connectToDatabase();
    const result = await accountsCollection.insertOne({name, score: numScore});
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    console.log(result);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};
export async function api(request) {
  const jsonBody = await request.json();
  // get json form data from client-side addproductform
  post(jsonBody);
  // const response = post(request);
  return new Response({
    status: 200,
  });
}
// export async function api(request) {
//   const resp = main();

//   return new Response(resp, {
//     status: 200,
//   });
// }
