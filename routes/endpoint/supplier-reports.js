const router = require("express").Router();
const SupplierReportsController = require("../../controller/SupplierReportsController");

router.post("/reports/suppliers", SupplierReportsController.addSupplierReport);
router.get("/reports/suppliers", SupplierReportsController.getSupplierReports);
router.get("/reports/suppliers/:id", SupplierReportsController.getSupplierReportById);
router.delete("/reports/suppliers/:id", SupplierReportsController.deleteSupplierReport);

module.exports = router;