const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;

const uri = `"mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jycgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"`;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
            const database = client.db("ibnSinaMedical");
            const serviceCollection = database.collection("services");

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('This is IBN-sina Medical Server')
});

app.listen(port, () => {
    console.log('Server running at port ', port);
});
