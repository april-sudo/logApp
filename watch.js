import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://127.0.0.1:27017/logtailing";
const uri =
  "mongodb+srv://test:ignPruNwhLiRau8p@cluster0.9kvpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const simulateAsyncPause = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;

const makeConnStream = (ws) => {
  run(ws).catch(console.dir);
};

async function run(ws) {
  try {
    await client.connect();
    const database = client.db("insertDB");
    const collection = database.collection("haikus");
    // open a Change Stream on the "haikus" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", (next) => {
      // process any change event
      console.log("received a change to the collection: \t", next);
      ws.send(next.fullDocument.content);
    });
    await simulateAsyncPause();
    await collection.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });
    await simulateAsyncPause();
    //await changeStream.close();

    console.log("closed the change stream");
  } finally {
    //닫지말고, 계속 오픈해서 결과를 보자.
    // await changeStream.close();
    // await client.close();
  }
}

export default makeConnStream;
