const router = require("express").Router();
const SearchController = require("../../controller/SearchController");

router.post("/search/products", SearchController.SearchProducts);
router.post("/search/suppliers", SearchController.SearchSuppliers);
router.post("/search/distributors", SearchController.SearchDistributors);
router.post("/search/reports/suppliers", SearchController.ShortSupplierReports);
router.post("/search/reports/distributors", SearchController.ShortDistributorReports);
router.post("/search/categories", SearchController.SearchCategories);
router.post("/search/types", SearchController.SearchStockTypes);
router.post("/search/admins", SearchController.SearchAdmins);

module.exports = router;