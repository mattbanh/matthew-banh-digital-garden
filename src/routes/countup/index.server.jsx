// import vcdLogo from './assets/vcd-logo.png';
import {CountUpForm} from '../../components/sections/CountupForm.client';

import {CountupEntries} from '../../components/sections/CountupEntries.client';

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
const doc = {
  score: {$gt: 499},
};

const main = async () => {
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
let test = await main();
console.log(test);

function CountUp() {
  return (
    <section>
      <div className="m-4">
        <h1 className="mb-2">Entries</h1>
        {test.map((entry) => (
          <div className="mb-1" key={entry._id}>
            <div className="flex items-center gap-4">
              <span className="text-xs">
                {`${entry.name} - ${entry.score}`}
              </span>
              <span className="text-xs"></span>
              <button className="text-xs rounded-sm">x</button>
            </div>
          </div>
        ))}
        <div className="">
          {/* <span >{`${test.name} - ${test.score}`}</span> */}
        </div>
      </div>
      <CountUpForm />
    </section>
  );
}

export default CountUp;
