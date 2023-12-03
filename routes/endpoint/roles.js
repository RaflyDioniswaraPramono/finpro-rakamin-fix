const router = require("express").Router();
const RolesController = require("../../controller/RolesController");

router.get("/roles", RolesController.getRoles);
router.get("/roles/:id", RolesController.getRoleById);
router.put("/roles", RolesController.updateRole);
router.delete("/roles/:id", RolesController.deleteRole);

module.exports = router;