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
    const wishlistCollection = client.db("eShop").collection("cart");
    const cartCollection = client.db("eShop").collection("wishlist");

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

    // wishlist products
    app.post("/post-wishlist", async (req, res) => {
      const wishlist = req.body;
      const wishlistRresult = await wishlistCollection.insertOne(wishlist);
      res.send(wishlistRresult);
    });
    app.get("/get-allWishlistdata", async (req, res) => {
      const cartRresult = await wishlistCollection.find({}).toArray();
      res.send(cartRresult);
    });
    app.delete("/delete-items/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await wishlistCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/cart-details/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: ObjectId(id) };
      const cartRresult = await wishlistCollection.find(filter).toArray();
      res.send(cartRresult);
    });

    // cart
    app.post("/post-cart", async (req, res) => {
      const cart = req.body;
      const cartRresult = await cartCollection.insertOne(cart);
      res.send(cartRresult);
    });
    app.get("/get-allcart", async (req, res) => {
      const result = await cartCollection.find({}).toArray();

      res.send(result);
    });
    app.delete("/delete-cartdata/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });
    app.delete("/delete-cartdata2/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });
    app.delete("/removeAllItems/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });

    // end point for shop page

    app.get("/get-product", async (req, res) => {
      const prodcut = await prodcutCollection.find({}).toArray();
      res.send(prodcut);
    });
    // app.get("/get-all", async (req, res) => {
    //   const title = req.query.title;
    //   const filter = { title };
    //   const result = await prodcutCollection.find(filter).toArray();
    //   console.log(result);
    //   res.send(result);
    // });

    app.get("/search", async (req, res) => {
      const bal = req.params.title;
      prodcutCollection
        .find({ title: { $regex: bal, $options: "i" } })
        .then((data) => {
          res.send(data);
        });
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
