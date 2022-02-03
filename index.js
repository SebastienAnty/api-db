const express = require("express");
const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./src/products");

const app = express();
app.use(express.json());

app.get("/products", getAllProducts);
app.get("/products/:id", getProductByID);
app.delete("/products/:id", deleteProduct);
app.post("/products", createProduct);
app.patch("/products/:id", updateProduct);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000/");
});
