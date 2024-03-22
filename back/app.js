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

function startServer(port) {
  app
    .listen(port, () => {
      console.log(`App running on port ${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(
          `El puerto ${port} está ocupado, intentando otro puerto...`
        );
        startServer(port + 1);
      } else {
        console.error(err);
      }
    });
}

startServer(port)
