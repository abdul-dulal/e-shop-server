const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const prodcutCollection = client.db("eShop").collection("product");

    // get data by category

    app.get("/get-accessories", async (req, res) => {
      const category = req.query.category;
      const query = { category };
      const result = await prodcutCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/get-womenfashion", async (req, res) => {
      const category = req.query.category;
      const query = { category };
      const fashionResult = await prodcutCollection.find(query).toArray();
      res.send(fashionResult);
    });

    app.get("/get-food", async (req, res) => {
      const category = req.query.category;
      const query = { category };
      const foodResult = await prodcutCollection.find(query).toArray();
      res.send(foodResult);
    });
    app.get("/get-electronic", async (req, res) => {
      const category = req.query.category;
      const query = { category };
      const electronicResult = await prodcutCollection.find(query).toArray();
      res.send(electronicResult);
    });
    app.get("/get-mensFashion", async (req, res) => {
      const category = req.query.category;
      const query = { category };
      const electronicResult = await prodcutCollection.find(query).toArray();
      res.send(electronicResult);
    });

    // Heiglight product

    app.get("/get-bestSelling", async (req, res) => {
      const highlights = req.query.highlights;
      const query = { highlights };
      const highlightResult = await prodcutCollection.find(query).toArray();
      res.send(highlightResult);
    });
    app.get("/get-topRated", async (req, res) => {
      const highlights = req.query.highlights;
      const query = { highlights };
      const topRatedResult = await prodcutCollection.find(query).toArray();
      res.send(topRatedResult);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from eShop");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
