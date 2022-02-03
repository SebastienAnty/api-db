const { connectDb } = require("./db");

const CLOTHES_COLLECTION = "clothes";
const db = connectDb();

exports.getAllProducts = (req, res) => {
  db.collection(CLOTHES_COLLECTION)
    .get()
    .then((collection) => {
      const products = collection.docs.map((doc) => {
        let product = doc.data();
        product.id = doc.id;
        return product;
      });
      res.send(products);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getProductByID = (req, res) => {
  const { id } = req.params;

  db.collection(CLOTHES_COLLECTION)
    .doc(id)
    .get()
    .then((doc) => {
      let product = doc.data();
      product.id = doc.id;
      res.send(product);
    })
    .catch((error) => res.status(500).send(err));
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;

  db.collection(CLOTHES_COLLECTION)
    .add(newProduct)
    .then((docRef) => {
      let product = req.body;
      product.id = docRef.id;
      res.send(product);
    });
};

exports.updateProduct = (req, res) => {
  const db = connectDb();
  let product = req.body;
  const { id } = req.params;
  db.collection(CLOTHES_COLLECTION)
    .doc(id)
    .update(product)
    .then(() => this.getProductByID(req, res))
    .catch((error) => res.status(500).send(error));
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.collection(CLOTHES_COLLECTION)
    .doc(id)
    .delete()
    .then((timeStamp) => {
      res.send(`Product ${id} nuked at ${timeStamp}`);
    })
    .catch((error) => res.status(500).send(error));
};
