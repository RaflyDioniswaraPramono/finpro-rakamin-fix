const router = require("express").Router();
const DistributorReportsController = require("../../controller/DistributorReportsController");

router.post("/reports/distributors", DistributorReportsController.addDistributorReport);
router.get("/reports/distributors", DistributorReportsController.getDistributorReports);
router.get("/reports/distributors/:id", DistributorReportsController.getDistributorReportById);
router.delete("/reports/distributors/:id", DistributorReportsController.deleteDistributorReport);

module.exports = router;