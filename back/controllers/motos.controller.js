const express = require("express");
const motosRouter = express.Router();
const {
  getMotos,
  getMoto,
  createMoto,
  updateMoto,
  leavingMoto,
  deleteMoto,
} = require("../services/moto.service");

// define the home page route
motosRouter.get("/", async (req, res) => {
  const data = await getMotos();
  res.json({ data: data });
});

motosRouter.post("/search", async (req, res) => {
  const data = await getMoto(req.body.searchString, req.body.type);
  res.json({ data: data });
})

motosRouter.post("/create", async (req, res) => {
  const newData = req.body;
  await createMoto(newData);
  res.json({ message: "Data created successfully!", data: newData });
});

motosRouter.post("/update", async (req, res) => {
  const data = await updateMoto(req.body);
  res.json({ message: "Data updated successfully!", data: data });
});
motosRouter.post("/leaving", async (req, res) => {
  const data = await leavingMoto(req.body.placa);
  res.json({ message: "Moto leaved successfully!", data: data });
});
motosRouter.post("/delete", async (req, res) => {
  const placa = req.body.placa;
  const data = await deleteMoto(placa);
  res.json({ message: "Data deleted successfully!", data: data });
});

module.exports = motosRouter;
