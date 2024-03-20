const express = require("express");
const motosRouter = require('./controllers/motos.controller.js')

//Initialize express app
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', motosRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
