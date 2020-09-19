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

// all routes are in here
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Sample Code for connecting directly
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<user>:<password>@cluster0.ifyh6.mongodb.net/GoogleBookShelf?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Was able to connect.");
//   console.log("IF there was an error it was this: ", err);
//   client.close();
// });



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
