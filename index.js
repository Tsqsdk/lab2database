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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log("Connected correctly to server");
    const db = client.db('test'); // Define 'db' here


    const pipeline = [
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  name: "Leslie Martinez",
                },
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
          
                {
                  
                  name: 1,
                  email: 1,
                  accounts: 1
                },
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "accounts",
                  localField: "accounts",
                  foreignField: "account_id",
                  as: "accounts",
                },
            },

    ];

    const orders = await client.db('lab2').collection('sample_analytics').aggregate(pipeline).toArray();
    console.log(orders);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
