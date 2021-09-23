const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
