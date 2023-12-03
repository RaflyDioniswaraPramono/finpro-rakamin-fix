const router = require("express").Router();
const DistributorsController = require("../../controller/DistributorsController");

router.post("/distributors", DistributorsController.addDistributor);
router.get("/distributors", DistributorsController.getDistributors);
router.get("/distributors/:id", DistributorsController.getDistributorById);
router.put("/distributors", DistributorsController.updateDistributor);
router.delete("/distributors/:id", DistributorsController.deleteDistributor);

module.exports = router;