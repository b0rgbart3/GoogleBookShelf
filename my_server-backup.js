const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_DB_URI = process.env.MONGODB_URI;
const uri = "mongodb+srv://bart2:c0sm0s0nN0va@cluster0.7fjh875.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// Serve static files from the React build folder
// app.use(express.static(path.join(__dirname, "client/build")));


// Connect to the Mongo DB
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

// mongoose.connect(
//   "mongodb+srv://bart2:c0sm0s0nN0va@cluster0.7fjh875.mongodb.net/myDatabase?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// Catch-all: Send back React's index.html for any route not handled
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/ping", (req, res) => {
  console.log("✅ /api/ping was hit");
  res.json({ message: "pong" });
});


process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit:
  // process.exit(1);
});