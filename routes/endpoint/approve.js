const router = require("express").Router();
const ApproveController = require("../../controller/ApproveController");

router.get("/approves", ApproveController.getApproveStages);
router.post("/approves/:id", ApproveController.acceptRequest);
router.delete("/approves/:id", ApproveController.declineRequest);

module.exports = router;
