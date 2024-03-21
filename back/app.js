const express = require("express");
const motosRouter = require("./controllers/motos.controller.js");
const cors = require("cors");
const config = require("./config");

//Initialize express app
const app = express();
const port = config.port ?? 3000;
app.use(cors());

app.use(express.json());

app.use("/", motosRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
