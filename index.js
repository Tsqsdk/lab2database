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
      await client.connect();
      console.log("Connected correctly to server");

      const pipeline_A = [
        {$match:{name: {$eq: "Leslie Martinez",},},},
        {$project:{_id: 0,name: 1,email: 1,accounts: 1,},},
      ];
     
      console.log("Pipeline A:");
      const result_A = await client.db('sample_analytics').collection('customers').aggregate(pipeline_A).toArray();
      console.log(result_A);

      const pipeline_b = [
        {$match:{name: "Leslie Martinez",},},
        {$lookup:{
              from: "accounts",
              localField: "accounts",
              foreignField: "account_id",
              as: "accounts",
            },
        },
      ]
      
      console.log("Pipeline B:");
      const result_b = await client.db('sample_analytics').collection('customers').aggregate(pipeline_b).toArray();
      console.log(result_b);
      //console.log(JSON.stringify(result_b, 2));
  } catch (err) {
      console.log(err.stack);
  } finally {
      await client.close();
  }
}

run().catch(console.dir);
