const router = require("express").Router();
const ProductsController = require("../../controller/ProductsController");

router.post("/products", ProductsController.addProduct);
router.get("/onstock", ProductsController.getTotalStock);
router.get("/products", ProductsController.getProducts);
router.get("/products/:id", ProductsController.getProductById);
router.put("/products", ProductsController.updateProduct);
router.delete("/products/:id", ProductsController.deleteProduct);

module.exports = router;