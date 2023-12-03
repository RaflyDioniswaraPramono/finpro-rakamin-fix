const router = require("express").Router();
const adminRoutes = require("./endpoint/admins");
const productRoutes = require("./endpoint/products");
const supplierRoutes = require("./endpoint/suppliers");
const distributorRoutes = require("./endpoint/distributors");
const categoryRoutes = require("./endpoint/categories");
const stockTypeRoutes = require("./endpoint/stock-types");
const supplierReportRoutes = require("./endpoint/supplier-reports");
const distributorReportRoutes = require("./endpoint/distributor-reports");
const roleRoutes = require("./endpoint/roles");
const searchRoutes = require("./endpoint/search");
const approveRoutes = require("./endpoint/approve");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Api is working!"
  })
})

router.get("/api", (req, res) => {
  res.status(200).json({
    message: "Api is working!"
  })
})

router.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Api is working!"
  })
})

router.use("/api/v1", adminRoutes);
router.use("/api/v1", productRoutes);
router.use("/api/v1", supplierRoutes);
router.use("/api/v1", distributorRoutes);
router.use("/api/v1", categoryRoutes);
router.use("/api/v1", stockTypeRoutes);
router.use("/api/v1", supplierReportRoutes);
router.use("/api/v1", distributorReportRoutes);
router.use("/api/v1", roleRoutes);
router.use("/api/v1", searchRoutes);
router.use("/api/v1", approveRoutes);

module.exports = router;