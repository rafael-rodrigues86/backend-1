const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", (req, res) => {
  categoryController
    .getCategories()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send("Erro ao obter as categorias"));

  console.log("camada de roteamento");
});

router.post("/", (req, res) => {
  const newCategory = req.body;
  // console.log(newCategory);
  categoryController
    .createCategories(newCategory)
    .then(() => res.status(201).send("Category created"))
    .catch((error) =>
      res.status(500).send("Erro interno - não criou categoria")
    );
});

module.exports = router;
