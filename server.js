const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://liwen:hello@cluster0.8hfso.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

app.get('/', (req, res) =>{
    res.send("hello!");
})


app.get('/api/mapperJob', async (req,res) => {
  //TODO
})


app.get('/api/reducerJob', async (req,res) => {
  //TODO
})

app.post('/api/mapperResult', async (req,res) => {

})

app.post('/api/reducerResult', async (req,res) => {

})


app.post('/api/getUser', async (req, res) => {
    console.log(req.body);
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      try {
        await client.connect();
        const test = await client.db("web3").collection("users").findOne({PK:req.body.PK})
        res.send(test);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
})