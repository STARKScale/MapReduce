const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const jobStatusTracker = require('./jobStatusTracker');
const { MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://liwen:hello@cluster0.8hfso.mongodb.net/?retryWrites=true&w=majority";
let statusTracker = null;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

app.get('/', (req, res) =>{
    res.send("hello!");
})

app.post('/api/create', async (req,res) => {
  try{
    statusTracker = new jobStatusTracker(req.body);
    statusTracker.init();
    res.send("success");
  }
  catch(e){
    res.send("failed to init a mapreduce task");
    console.log(e);
  }
})

app.get('/api/mapperJob', async (req,res) => {
  if (statusTracker === null){
    res.send("create a map reduce job first");
  }
  else{
    try {
      const job = statusTracker.takeMapperJob();
      console.log(job);
      res.send(job);
    }
    catch(e){
      console.log(e);
      res.send(e.message);
    }
  }
})


app.get('/api/reducerJob', async (req,res) => {
  if (statusTracker === null){
    res.send("create a map reduce job first");
  }
  else{
    try{
      res.send(statusTracker.takeReducerJob());
    }
    catch(e){
      console.log(e);
      res.send(e.message);
    }
  }
})

app.post('/api/mapperResult', async (req,res) => {
  try{
    statusTracker.postMapperJob(req.body);
    res.send("success");
  }
  catch(e){
    res.send(e.message);
  }
})

app.post('/api/reducerResult', async (req,res) => {
  try{
    statusTracker.postReducerJob(req.body);
    res.send("success");
  }
  catch(e){
    res.send(e.message);
  }
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