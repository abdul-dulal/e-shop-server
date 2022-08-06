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
    const vendorCollection = client.db("eShop").collection("vendor");

    const userCollection = client.db("eShop").collection("userinfo");
    const reviewCollection = client.db("eShop").collection("review");

    // get data by category

    app.post("/post-product", async (req, res) => {
      const product = req.body;

      const prodcutRresult = await prodcutCollection.insertOne(product);
      res.send(prodcutRresult);
    });

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
      const query = {
        name: wishlist.name,
        user: wishlist.user,
      };
      const exist = await wishlistCollection.findOne(query);
      if (exist) {
        return res.send({ success: false });
      } else {
        const wishlistRresult = await wishlistCollection.insertOne(wishlist);
        res.send({ success: true, wishlistRresult });
      }
    });
    app.get("/get-allWishlistdata", async (req, res) => {
      const user = req.query.user;

      const query = { user };
      const cartRresult = await wishlistCollection.find(query).toArray();
      res.send(cartRresult.reverse());
    });
    app.delete("/delete-items/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await wishlistCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/cart-details/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const cartRresult = await wishlistCollection.find(filter).toArray();
      res.send(cartRresult);
    });
    app.get("/vendorInfo/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const cartRresult = await prodcutCollection.find(filter).toArray();
      res.send(cartRresult);
    });

    // cart
    app.post("/post-cart", async (req, res) => {
      const cart = req.body;

      const query = {
        name: cart.name,
        user: cart.user,
      };
      const exist = await cartCollection.findOne(query);
      if (exist) {
        return res.send({ success: false, exist });
      } else {
        const cartRresult = await cartCollection.insertOne(cart);
        res.send({ success: true, cartRresult });
      }
    });
    app.get("/get-allcart", async (req, res) => {
      const user = req.query.user;
      const query = { user };
      const result = await cartCollection.find(query).toArray();
      res.send(result.reverse());
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
    // app.delete("/removeAllItems/:id", async (req, res) => {
    //   const id = req.params.id;

    //   const filter = { _id: ObjectId(id) };
    //   const result = await cartCollection.deleteOne(filter);
    //   res.send(result);
    // });

    // end point for shop page

    app.get("/get-product", async (req, res) => {
      const prodcut = await prodcutCollection.find({}).toArray();
      res.send(prodcut);
    });

    //  vendor information
    app.get("/vendors", async (req, res) => {
      const vendorResult = await vendorCollection.find({}).toArray();
      res.send(vendorResult);
    });

    app.get("/vendor/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const vendor = await vendorCollection.findOne(filter);
      res.send(vendor);
    });

    app.put("/followers/:id", async (req, res) => {
      const id = req.params.id;
      const vendor = req.body;

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          follower: vendor.follower,
        },
      };
      const result = await vendorCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(result);
    });

    // reviews
    app.post("/client-Review", async (req, res) => {
      const review = req.body;
      const reviewResult = await reviewCollection.insertOne(review);
      res.send(reviewResult);
    });
    app.get("/client-Review", async (req, res) => {
      const review = await reviewCollection.find({}).toArray();
      res.send(review);
    });
    app.get("/vendorName", async (req, res) => {
      const reviewName = req.query.reviewName;
      const query = { reviewName };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result);
    });

    //   as a customer or as a vendor

    app.post("/customer", async (req, res) => {
      const customer = req.body;
      const customerResult = await vendorCollection.insertOne(customer);
      res.send(customerResult);
    });

    // specific vendor

    app.get("/get-vendorProduct", async (req, res) => {
      const user = req.query.user;
      const query = { user };
      const result = await prodcutCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-uploadProduct", async (req, res) => {
      const user = req.query.user;
      const query = { user };
      const result = await prodcutCollection.find(query).toArray();
      res.send(result);
    });
    app.delete("/delete-product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await prodcutCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/get-vendorByUser/:email", async (req, res) => {
      const user = req.params.email;

      const filter = { user };
      const result = await vendorCollection.findOne(filter);
      res.send(result);
    });
    // update vendor image
    app.put("/update-vendorInfo/:id", async (req, res) => {
      const store = req.body;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: store.name,
          img: store.img,
        },
      };
      const result = await vendorCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/edit-product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await prodcutCollection.findOne(filter);
      res.send(result);
    });
    app.get("/collectVendor/:user", async (req, res) => {
      const user = req.params.user;
      const filter = { user };
      const result = await vendorCollection.findOne(filter);

      res.send(result);
    });

    app.post("/post-userInfo", async (req, res) => {
      const user = req.body;

      const userResult = await userCollection.insertOne(user);
      res.send(userResult);
    });
    app.put("/put-userInfo/:id", async (req, res) => {
      const user = req.body;
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          zip: user.zip,
          address: user.address,
          country: user.country,
          state: user.state,
          city: user.city,
          user: user.user,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    app.get("/get-user/:email", async (req, res) => {
      const user = req.params.email;
      const filter = { user };
      const userResult = await userCollection.findOne(filter);
      res.send(userResult);
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
