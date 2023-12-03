const router = require("express").Router();
const StockTypesController = require("../../controller/StockTypesController");

router.post("/types", StockTypesController.addStockType);
router.get("/types", StockTypesController.getStockTypes);
router.get("/types/:id", StockTypesController.getStockTypeById);
router.put("/types", StockTypesController.updateStockType);
router.delete("/types/:id", StockTypesController.deleteStockType);

module.exports = router;