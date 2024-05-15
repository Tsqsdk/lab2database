/*
const express = require('express') 
const app = express() 
const port = process.env.PORT || 3000; 

app.use(express.json()) 

app.get('/', (req, res) => { 
   res.send('Hello World!') 
}) 


app.listen(port, () => { 

   console.log(`Example app listening on port ${port}`) 

}) 
*/

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://teeshihqun:k2SYenFKdA9Z0AU6@cluster0.vtxgh1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      const db = client.db('sample_analytics').collection('customers').aggregate([
        {
          $match: {
            name: "Leslie Martinez",
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            email: 1,
            accounts: 1,
          },
        },
      ]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        console.log(db);
        client.close(); // Close the client here
      });
  
    } catch (err) {
      console.log(err.stack);
    }
  }
  
  run().catch(console.dir);