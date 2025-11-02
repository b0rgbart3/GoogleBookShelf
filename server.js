// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');


require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

console.log('MONGO URI: ', process.env.MONGO_URI);
app.use(express.json());

// Serve the static React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Ping route
app.get("/api/ping", (req, res) => {
  console.log("✅ Received /api/ping");
  res.json({ message: "pong" });
});
const routes = require("./routes"); // adjust path if needed
app.use("/api", routes);


// Catch all to confirm fallback (should not trigger for /api/ping)
app.use((req, res) => {
  console.log("❌ Unmatched route:", req.url);
  res.status(404).send("Not found");
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


