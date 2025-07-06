// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");


require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/googlebooks', createProxyMiddleware({
  target: 'http://localhost:8001',
  changeOrigin: true,
}));


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



const PORT = 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


