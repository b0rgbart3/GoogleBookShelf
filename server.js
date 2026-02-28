// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');


require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

console.log('MONGO_URI: ', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.use(express.json());

const routes = require("./routes"); // adjust path if needed
app.use("/api", routes);


// Ping route
app.get("/api/ping", (req, res) => {
  console.log("✅ Received /api/ping");
  res.json({ message: "pong" });
});

// Serve the static React build
app.use(express.static(path.join(__dirname, 'client/build')));


// // Catch all to confirm fallback (should not trigger for /api/ping)
// app.use((req, res) => {
//   console.log("❌ Unmatched route:", req.url);
//   res.status(404).send("Not found");
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


