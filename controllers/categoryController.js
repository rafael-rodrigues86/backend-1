const filesystem = require("fs").promises;
const { error } = require("console");
const path = require("path");

const categoriesFilePath = path.join(__dirname, "../data/categories.json");

const getCategories = () => {
  return filesystem
    .readFile(categoriesFilePath, "utf-8")
    .then((categoriesData) => JSON.parse(categoriesData))
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo");
    });
};

const createCategories = (newCategory) => {
  return getCategories()
    .then((categoriesData) => {
      categoriesData.push({ name: newCategory.name });
      return filesystem.writeFile(
        categoriesFilePath,
        JSON.stringify(categoriesData),
        "utf-8"
      );
    })
    .catch((error) => {
      throw new Error("Categoria não foi criada");
    });
};

module.exports = {
  getCategories,
  createCategories,
};
