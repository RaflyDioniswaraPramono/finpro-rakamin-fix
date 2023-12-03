const router = require("express").Router();
const SuppliersController = require("../../controller/SuppliersController");

router.post("/suppliers", SuppliersController.addSupplier);
router.get("/suppliers", SuppliersController.getSuppliers);
router.get("/suppliers/:id", SuppliersController.getSupplierById);
router.put("/suppliers", SuppliersController.updateSupplier);
router.delete("/suppliers/:id", SuppliersController.deleteSupplier);

module.exports = router;