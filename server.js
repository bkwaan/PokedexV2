const express = require("express");
const app = express();
const connectDB = require("./config/db");
const api = require("./api");
const path = require("path");

// Connecting Database
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "profilePics")));

// Using api folder
app.use("/api", api);

// Serve Staic Assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

console.log("test");

app.listen(PORT, () => console.log("this server started on port " + PORT));
