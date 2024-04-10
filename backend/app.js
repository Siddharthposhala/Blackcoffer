const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080; 

const url =
  'mongodb+srv://siddharth:Siddhu2003@blackcoffer.ru2x88h.mongodb.net/?retryWrites=true&w=majority&appName=Blackcoffer';


const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

async function fetchDataFromMongoDB() {
  try {
    const database = client.db('BlackCoffer');
    const collection = database.collection('Josn data');
    const data = await collection.find({}).toArray();
    return data;
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    return [];
  }
}


app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchDataFromMongoDB();
    res.json(data);
  } catch (err) {
    console.error('Error handling API request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
